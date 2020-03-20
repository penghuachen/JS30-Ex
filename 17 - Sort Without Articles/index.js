const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
const sortBands = bands.sort((a, b) => removeBlankSpace(a) > removeBlankSpace(b) ? 1 : -1);
// console.log("Output: sortBands", sortBands);

renderView();

function removeBlankSpace(bandName) {
  return bandName.replace(/^(a |the |an )/i, '').trim();
}

function renderView() {
  document.querySelector('#bands').innerHTML = 
    sortBands
      .map(band => `<li>${ band }</li>`)
      .join('');
}

