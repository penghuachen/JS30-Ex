
initClickEvent();
function initClickEvent() {
  const panel = document.querySelectorAll('.panel');
  panel
    .forEach(panel => panel.addEventListener('click', toggleSlide));
  panel
    .forEach(panel => panel.addEventListener('transitionend', toggleActive))
}

function toggleSlide(e) {
  this.classList.toggle('open');
}

function toggleActive(e) {
  // transitionend 會依據被觸發的 property 而執行
  // 此次觸發的 property: font-size, flex-grow，所以每次會觸發兩次 toggleActive 事件
  // 造成 show-acitve 開啟後又關閉
  if(e.propertyName.includes('flex')) {
    this.classList.toggle('show-active');
  }
}
