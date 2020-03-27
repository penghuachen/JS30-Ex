
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const inputOptions = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  msg.text = document.querySelector('[name="text"]').value;

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  inputOptions.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));

  function populateVoices(e) {
    voices = this.getVoices();
    const voicesOptions = 
      voices.map(voice => {
        return `<option value="${ voice.name }">${ voice.name } ${ voice.lang }</option>`;
      })
      .join('');
    voicesDropdown.innerHTML = voicesOptions;
  }
  

  function setVoice(e) {
    msg.voice = voices.find(voice => voice.name == this.value);
    toggle();
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if(startOver) {
      speechSynthesis.speak(msg);
    }
  }

  function setOption(e) {
    msg[this.name] = this.value;
    toggle();
  }
