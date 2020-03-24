const triggers = document.querySelectorAll('a');
const highlightEl = document.createElement('span');
highlightEl.classList.add('highlight');
document.body.appendChild(highlightEl);

triggers.forEach(link => {
  link.addEventListener('mouseenter', highlightLinks);
});

function highlightLinks(e) {  
  const coords = e.currentTarget.getBoundingClientRect();
  const obj = {
    width: coords.width,
    height: coords.height,
    top: coords.top + window.pageYOffset,
    left: coords.left + window.pageXOffset
  };
  highlightEl.style.width = `${ obj.width }px`;
  highlightEl.style.height = `${ obj.height }px`;
  highlightEl.style.transform = `translate(${ obj.left }px, ${ obj.top }px)`;

}