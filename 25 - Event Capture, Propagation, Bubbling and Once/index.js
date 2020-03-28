const divs = document.querySelectorAll('div');

divs.forEach(div => div.addEventListener('click', getLogText, {
  capture: false,
  once: true // Only click once and remove enent listener.
}));

function getLogText(e) {
  e.stopPropagation();
  console.log(this.classList.value);
}