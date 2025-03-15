
var rafID = null;
var rafID2 = null;
var rafCurrent = null;
var c = null;
var cDraw = null;
var ctx = null;
var ctxDraw = null;

var loader;
var hasSetupUserMedia = false;
var isAudioS0Initial = false;
var isMainAudioInitial = false;
var audio_S0 = null;
var mainAudio = null;
var soundBtn = null;
var soundBtnControl = null;
var isSoundPaused = false;
var isMainAudioPlaying = false;
var isAudioS0Playing = false;
var isAudioS0PlayArea = false; // 在 Audio_S0 播放區域內
var isUserAccepted = false; // 使用者同意播放音訊

//handle different prefix of the audio context
var AudioContext = AudioContext || webkitAudioContext;
var audioS0Context;
var mainAudioContext;
var audioS0Analyser = null;
var mainAudioAnalyser = null;

var mediaConfig = [
	{ id: 'S1', videoSrc: 'assets/videos/S1.mp4', audioSrc: 'assets/sounds/S1.mp3', isVideoCreated: false, isPlaying: false },
	{ id: 'S2', videoSrc: 'assets/videos/S2.mp4', audioSrc: 'assets/sounds/S2.mp3', isVideoCreated: false, isPlaying: false },
	{ id: 'S3', videoSrc: 'assets/videos/S3.mp4', audioSrc: 'assets/sounds/S3.mp3', isVideoCreated: false, isPlaying: false },
	{ id: 'S4', videoSrc: 'assets/videos/S4.mp4', audioSrc: 'assets/sounds/S4.mp3', isVideoCreated: false, isPlaying: false },
	{ id: 'S5', videoSrc: 'assets/videos/S5.mp4', audioSrc: 'assets/sounds/S5.mp3', isVideoCreated: false, isPlaying: false },
];


window.scrollTo(0, 0);
window.addEventListener('load', function() {
	soundBtn = document.getElementById('soundBtn');
	soundBtnControl = document.querySelector('.soundBtn--control');
	audio_S0 = document.getElementById('audio_S0');
	mainAudio = document.getElementById('main_audio');

	soundBtn.addEventListener('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		setSoundBtn(true);
	});
	audio_S0.addEventListener('play', function() {
		isAudioS0Playing = true;
		isSoundPaused = false;
		setSoundBtn();
	});
	audio_S0.addEventListener('pause', function() {
		isAudioS0Playing = false;
		isSoundPaused = true;
		setSoundBtn();
	});
	mainAudio.addEventListener('play', function() {
		isMainAudioPlaying = true;
		isSoundPaused = false;
		setSoundBtn();
	});
	mainAudio.addEventListener('pause', function() {
		isMainAudioPlaying = false;
		isSoundPaused = true;
		setSoundBtn();
	});
	onScroll();
	onClickSoundOpen();
}, false);

// ios fix
if (AudioContext.state === 'suspended' && 'ontouchstart' in window) {
	var unlockAudio = function() {
		AudioContext.resume();
	};
	document.body.addEventListener('touchstart', unlockAudio, false);
}
// using requestAnimationFrame instead of timeout...
if (!window.requestAnimationFrame)
	window.requestAnimationFrame = window.webkitRequestAnimationFrame;
if (!window.cancelAnimationFrame)
	window.cancelAnimationFrame = window.mozCancelAnimationFrame;

function initAudioVisualisierung(audioType) {
	if (!isAudioS0Initial && audioType === 'S0') {
		isAudioS0Initial = true;
		setupAudioS0Nodes();
	}
	if (!isMainAudioInitial && audioType === 'main') {
		isMainAudioInitial = true;
		setupMainAudioNodes();
	}
	if (audioType === 'S0' && rafCurrent !== 'S0') {
		rafCurrent = 'S0';
		rafID = window.cancelAnimationFrame(updateMainAudioVisualization);
		rafID2 = window.requestAnimationFrame(updateAudioS0Visualization);
	}
	if (audioType === 'main' && rafCurrent !== 'main') {
		rafCurrent = 'main';
		rafID2 = window.cancelAnimationFrame(updateAudioS0Visualization);
		rafID = window.requestAnimationFrame(updateMainAudioVisualization);
	}
}

$(function () {
	"use strict";
	loader = new BufferLoader();
	initBinCanvas();	
});

function initBinCanvas() {
	//add new canvas
	"use strict";
	c = document.getElementById("freq");
	// c.width = window.innerWidth;
	// c.height = window.innerHeight;
	c.width = 937;
	c.height = 937;
	//get context from canvas for drawing
	ctx = c.getContext("2d");
	
	// ctx.canvas.width  = window.innerWidth;
	// ctx.canvas.height = window.innerHeight;
	ctx.canvas.width = 937;
	ctx.canvas.height = 937;
	
	// window.addEventListener('resize', onWindowResize, false);
	
	//create gradient for the bins
	var gradient = ctx.createLinearGradient(0, c.height - 300,0,window.innerHeight - 25);
	gradient.addColorStop(1,'#00f'); //black
	gradient.addColorStop(0.75,'#f00'); //red
	gradient.addColorStop(0.25,'#f00'); //yellow
	gradient.addColorStop(0,'#ffff00'); //white

	ctx.fillStyle = "#ACFFAA";
}

var audioS0SourceNode;
function setupAudioS0Nodes() {
	audioS0Context = new AudioContext();

	// setup a analyser
	audioS0Analyser = audioS0Context.createAnalyser();
	// create a buffer source node
	audioS0SourceNode = audioS0Context.createMediaElementSource(audio_S0);
	//connect source to analyser as link
	audioS0SourceNode.connect(audioS0Analyser);
	// and connect source to destination
	audioS0SourceNode.connect(audioS0Context.destination);
	//start updating
	// rafID2 = window.requestAnimationFrame(updateAudioS0Visualization);
}

var mainAudioSourceNode;
function setupMainAudioNodes() {
	mainAudioContext = new AudioContext();
	// ios fix
	if (mainAudioContext.state === 'suspended' && 'ontouchstart' in window) {
		var unlockMainAudio = function() {
			mainAudioContext.resume();
		};
		document.body.addEventListener('touchstart', unlockMainAudio, false);
	}
	mainAudioAnalyser = mainAudioContext.createAnalyser();
	mainAudioSourceNode = mainAudioContext.createMediaElementSource(mainAudio);
	mainAudioSourceNode.connect(mainAudioAnalyser);
	mainAudioSourceNode.connect(mainAudioContext.destination);
	// rafID = window.requestAnimationFrame(updateMainAudioVisualization);
}

function updateAudioS0Visualization() {
	// get the average, bincount is fftsize / 2
	// if (isPlaying) {
	var array = new Uint8Array(audioS0Analyser.frequencyBinCount);
	audioS0Analyser.getByteFrequencyData(array);

	drawBars(array);

	rafID2 = window.requestAnimationFrame(updateAudioS0Visualization);
}

function updateMainAudioVisualization() {
	// get the average, bincount is fftsize / 2
	// if (isPlaying) {
	var array = new Uint8Array(mainAudioAnalyser.frequencyBinCount);
	mainAudioAnalyser.getByteFrequencyData(array);

	drawBars(array);

	rafID = window.requestAnimationFrame(updateMainAudioVisualization);
}

function drawBars(array) {
	//just show bins with a value over the treshold
	var threshold = 0;
	// clear the current state
	ctx.clearRect(0, 0, c.width, c.height);
	//the max count of bins for the visualization
	var maxBinCount = array.length;
	ctx.save();

	ctx.globalCompositeOperation='source-over';

	//console.log(maxBinCount); //--> 1024
	ctx.scale(0.5, 0.5);
	// ctx.translate(window.innerWidth, window.innerHeight);
	ctx.translate(937, 937);
	ctx.fillStyle = '#ACFFAA';

	var bass = Math.floor(array[1]); //1Hz Frequenz
	// var radius = 0.45 * $(window).width() <= 768 ? -(bass * 0.25 + 0.45 * $(window).width()) : -(bass * 0.25 + 768);
	var radius = 0.45 * ($(window).width() <= 768 ? -(bass * 0.25 + 0.45 * 937) : -(bass * 0.25 + 768));

	var bar_length_factor = 1;
	if ($(window).width() >= 785) {
		bar_length_factor = 0.6;
	}
	else if ($(window).width() < 785) {
		bar_length_factor = 1.5;
	}
	else if ($(window).width() < 500) {
		bar_length_factor = 10.0;
	}
	// go over each bin
	var rotateDegree = 0;
	var binCount = $(window).width() <= 768 ? 32 : 64;
	for ( var i = 0; i < maxBinCount; i++ ) {
		var value = array[i];
		if (value >= threshold) {			
			//draw bin
			rotateDegree += (180 / binCount);
			ctx.fillRect(0, radius, $(window).width() <= 768 ? 5 : 10, -value / bar_length_factor);
			ctx.rotate((180 / binCount) * Math.PI/180);
		}
	}
	for ( var i = 0; i < maxBinCount; i++ ) {
		var value = array[i];
		if (value >= threshold) {				
			//draw bin
			ctx.rotate(-(180 / binCount) * Math.PI/180);
			ctx.fillRect(0, radius, $(window).width() <= 768 ? 5 : 10, -value / bar_length_factor);
		}
	} 
	for ( var i = 0; i < maxBinCount; i++ ) {
		var value = array[i];
		if (value >= threshold) {				
			//draw bin
			ctx.rotate((180 / binCount) * Math.PI/180);
			ctx.fillRect(0, radius, $(window).width() <= 768 ? 5 : 10, -value / bar_length_factor);
		}
	} 
	ctx.restore();
}

function updateMediaConfig() {
	mediaConfig.map(function(config) {
		if (config.isVideoCreated) {
			const video = document.querySelector('#video_player_' + config.id);
			video.pause();
			config.isPlaying = false;
		}
	});
	isAudioS0PlayArea = false;
}

function setSoundBtn(isClickControl) {
	const isPlayingS1ToS5 = mediaConfig.some(function(config) {
		return config.isPlaying;
	});
	soundBtnControl.innerText = isSoundPaused ? 'play_arrow' : 'pause';
	if (isClickControl && isAudioS0Playing) {
		audio_S0.pause();
	}
	if (isClickControl && !isAudioS0Playing && isAudioS0PlayArea) {
		audio_S0.play();
	}
	if (isClickControl && isPlayingS1ToS5 && isMainAudioPlaying) {
		mainAudio.pause();
	}
	if (isClickControl && isPlayingS1ToS5 && !isAudioS0PlayArea && !isMainAudioPlaying) {
		mainAudio.play();
	}
}

function setMedia() {
	const soundBtn = document.getElementById('soundBtn');
	const windowHeight = window.innerHeight;
	const scrollTop = window.scrollY;

	mediaConfig.map(function(config) {
		const videoBlock = document.querySelector('#video_' + config.id);
		const videoBlockClientRect = videoBlock.getBoundingClientRect();
		const shouldCreate = videoBlockClientRect.top < (windowHeight * 3);
		const shouldPlay = (Math.abs(videoBlockClientRect.top) < (windowHeight / 2)) &&
							!config.isPlaying; // 滑進畫面一半高度時播放
		const shouldPlayAudioS0 = (scrollTop <= 500 && isUserAccepted); // 滑到頂端播放開場音訊

		if (!config.isVideoCreated && shouldCreate) {
			const video = document.createElement('video');
			video.setAttribute('id', 'video_player_' + config.id);
			video.setAttribute('width', '100%');
			video.setAttribute('loop', true);
			video.setAttribute('playsinline', true);
			video.setAttribute('src', config.videoSrc);
			videoBlock.appendChild(video);
			config.isVideoCreated = true;
			console.log(`video_${config.id} is loaded.`);
		}
		if (config.isVideoCreated && shouldPlay) {
			const video_player = document.querySelector('#video_player_' + config.id);
			soundBtn.classList.remove('soundBtn-hide');
			updateMediaConfig();
			audio_S0.pause();
			audio_S0.currentTime = 0;
			config.isPlaying = true;
			mainAudio.src = config.audioSrc;
			video_player.play();
			mainAudio.play();
			initAudioVisualisierung('main');
		}
		if (shouldPlayAudioS0) {
			updateMediaConfig();
			mainAudio.pause();
			mainAudio.currentTime = 0;
			audio_S0.play();
			isAudioS0PlayArea = true;
			initAudioVisualisierung('S0');
		}
	});
}

/** 「開啟音訊」按鈕 */
function onClickSoundOpen() {
	const soundOpenBtn = document.querySelector('.l-intro__btn');
	const handleClick = function() {
		soundOpenBtn.innerHTML = '<span class="material-symbols-outlined pr-1">volume_up</span>已開啟音訊';
		isUserAccepted = true;
		updateMediaConfig();
		mainAudio.pause();
		mainAudio.currentTime = 0;
		audio_S0.play();
		soundOpenBtn.removeEventListener('click', handleClick);
	}
	shouldPlayAudioS0 = false;
	soundOpenBtn.addEventListener('click', handleClick);
}

/** 監聽畫面捲動 */
function onScroll() {
	window.addEventListener('scroll', function() {
		setMedia();
	});
}