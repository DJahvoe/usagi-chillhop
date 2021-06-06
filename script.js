const pekoraAudio = document.getElementById('pekora-audio');
const pekoraVolume = document.getElementById('volume-slider-range');
const progressBar = document.getElementById('progress-bar');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const noise = document.querySelector('#noise feTurbulence');
const overlay = document.querySelector('.overlay');

window.addEventListener('load', () => {
	pekoraAudio.play();
	setVolume();
});
// GSAP
executeAnimation();

// Set Volume everytime user slide volume-slider
pekoraVolume.addEventListener('input', setVolume);

// Update handler
pekoraAudio.addEventListener('timeupdate', () => {
	// Set progress-bar width
	progressBar.style.width = `${
		(Math.floor(pekoraAudio.currentTime) / Math.floor(pekoraAudio.duration)) *
		100
	}%`;

	// Set timer
	const currentSecond = Math.floor(pekoraAudio.currentTime % 60);
	const currentMinute = Math.floor(pekoraAudio.currentTime / 60);
	seconds.innerText = currentSecond >= 10 ? currentSecond : '0' + currentSecond;
	minutes.innerText = '0' + currentMinute;
});

function setVolume() {
	pekoraAudio.volume = pekoraVolume.value / 100;
}

function executeAnimation() {
	const tl = gsap.timeline();
	tl.to('.overlay span', 1, {
		opacity: 0,
		y: -60,
		ease: Expo.easeInOut,
		stagger: 0.3,
	});
	tl.to(
		'.overlay',
		1,
		{
			y: '-100%',
			ease: Expo.easeInOut,
		},
		'-=0.5'
	);

	tl.eventCallback('onComplete', () => {
		overlay.style.display = 'none';
	});
}
