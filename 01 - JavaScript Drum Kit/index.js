
let keyboardElements = keyboardElementsGenerator();
addKeydownEvent();
addKeyupEvent();
renderView();

function keyboardElementsGenerator() {
  const matchObj = {
    'A': 'clap',
    'S': 'hihat',
    'D': 'kick',
    'F': 'openhat',
    'G': 'boom',
    'H': 'ride',
    'J': 'snare',
    'K': 'tom',
    'L': 'tink',
  };
  const letters = Object.keys(matchObj);

  return letters.map(letter => ({
    letter,
    isPlaying: false,
    musicalInstrument: matchObj[letter],
    keyCode() {
      return this.letter.charCodeAt();
    },
  }));
};

function addKeydownEvent() {
  document
    .querySelector('body')
    .addEventListener('keydown', highlightElements);

  document
    .querySelector('body')    
    .addEventListener('keydown', playElementsAudio);
}

function addKeyupEvent() {
  document
    .querySelector('body')
    .addEventListener('keyup', highlightElements);

  document
    .querySelector('body')  
    .addEventListener('keyup', playElementsAudio);
}

function playElementsAudio(e) {
  let keyCodeNumber = e.keyCode;
  let audio = document
                .querySelector(`audio[data-key="${ keyCodeNumber }"]`);
  if(e.type != 'keydown') return;
  audio.play();
  audio.currentTime = 0;
}

function highlightElements(e) {
  let keyCodeNumber = e.keyCode;
  let isKeyboardObj = keyboardElements
                        .find(data => data.keyCode() == keyCodeNumber);

  if(!isKeyboardObj) return;

  e.type == 'keydown' 
              ? isKeyboardObj.isPlaying = true
              : isKeyboardObj.isPlaying = false; 

  renderView();  
}

function keyCodeDomGenerator(elements) {
  return `
    <div 
      data-key="${ elements.keyCode() }" 
      class="key ${ elements.isPlaying ? 'playing' : '' }"
      >
      <kbd>${ elements.letter }</kbd>
      <span class="sound">${ elements.musicalInstrument }</span>
    </div>`; 
}

function renderView () {
  const keys = document.querySelector('.keys');
  keys.innerHTML = keyboardElements
                    .map(elements => keyCodeDomGenerator(elements))
                    .join('');
}





