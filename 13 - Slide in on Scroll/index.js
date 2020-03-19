function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

window.addEventListener('scroll', debounce(slideElements));

function slideElements(e) {
  console.log(123);
  let slideImages = document.querySelectorAll('.slide-in');
  slideImages.forEach(slideImage => { 
    let slideAt = (window.pageYOffset + window.innerHeight) - slideImage.height;
    let slideImageBottom = slideImage.offsetTop + slideImage.height;
    const isHalfShown = slideAt > slideImage.offsetTop;
    const isNotScrollPast = slideAt < slideImageBottom;
    const isSlideIn = isHalfShown && isNotScrollPast;
    if(isSlideIn) {
      slideImage.classList.add('active');
    }
  })
}
