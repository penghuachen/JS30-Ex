const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));

function handleEnter(e) {
  this.classList.add('trigger-enter');
  setTimeout(() => {this.classList.add('trigger-enter-active');}, 150);
  background.classList.add('open');
  
  const dropdown = this.querySelector('.dropdown');
  
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();
  const coordsObj = {
    width: dropdownCoords.width,
    height: dropdownCoords.height,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };
  
  background.style.width = `${ coordsObj.width }px`;
  background.style.height = `${ coordsObj.height }px`;
  background.style.transform 
    = `translate(${coordsObj.left}px, ${coordsObj.top}px)`;
}

function handleLeave(e) {
  this.classList.remove('trigger-enter');
  setTimeout(() => {this.classList.remove('trigger-enter-active');}, 150);
  background.classList.remove('open'); 
}