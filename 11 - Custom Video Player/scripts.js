const togglePlayBtn = document.querySelector('.toggle');
const progressBar = document.querySelector('.progress__filled');
const player = document.querySelector('.player');
const video  = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const controlTimeBtn = document.querySelectorAll('button[data-skip]');
const volume = document.getElementsByName('volume');
const playbackRate = document.getElementsByName('playbackRate');

const videoAccessor = new Accessor();
initInputEvents();
initClickEvents();
initVideoEvent();

function initInputEvents() {
  volume[0].addEventListener('input', updateVolume);
  playbackRate[0].addEventListener('input', updatePlaybackRate);
}

function initClickEvents() {
  player.addEventListener('click', togglePlayVideo);
  progress.addEventListener('click', handlerSkip);
  controlTimeBtn.forEach(btn => btn.addEventListener('click', updateVideoTimes));
}

function initVideoEvent() {
  video.addEventListener('timeupdate', handlerProgress);
}

function Accessor() {
  let isPlay = true;
  let times = 0;

  this.updatePlayValue = value => isPlay = !value;
  this.getPlayValue = () => isPlay;

  this.updateTimes = time => times += time;
  this.getTimes = () => times;
}

function isClassName(e, [str, str2]) {
  let className = e.target.className.split(' ');
  return className.find(name => name == str || name == str2);
}

function togglePlayVideo(e) {
  e.stopPropagation();

  if(!isClassName(e, ['toggle', 'viewer'])) return;

  videoAccessor.getPlayValue() ? video.play() : video.pause();  
  videoAccessor.getPlayValue()
    ? togglePlayBtn.textContent = '❚ ❚'
    : togglePlayBtn.textContent = '►';

  videoAccessor.updatePlayValue(videoAccessor.getPlayValue()); 
}

function updateVideoTimes(e) {
  let updateVideoTime = Number(this.getAttribute('data-skip'));
  videoAccessor.updateTimes(updateVideoTime);
  video.currentTime = videoAccessor.getTimes();
}

function handlerProgress(e) {
  let percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = percent + '%'; 
}

function handlerSkip(e) {
  const progressWidth = progress.offsetWidth;
  // 當前位置 ÷ 總長度 * 影片總長度 = 對應的影片秒數
  let skipTime = (e.offsetX / progressWidth) * video.duration;
  video.currentTime = skipTime;
}

function updateVolume(e) {
  video.volume = e.target.value;
}

function updatePlaybackRate(e) {
  video.playbackRate = e.target.value;
}