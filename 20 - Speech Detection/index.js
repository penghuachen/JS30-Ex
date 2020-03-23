window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.start();

// recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', speechConvertor);
recognition.addEventListener('end', restartSpeechService);

function speechConvertor(e) {
  const transcript = 
    [...e.results]
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      
  p.textContent = transcript;
  if(e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }

  if(transcript.includes('玩遊戲')) {
    const key = document.querySelector('.need-a-key');
    key.textContent = 'You find it!';
  }
}

function restartSpeechService(e) {
  recognition.start();
}
