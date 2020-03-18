const pressed = [];
const secretCode = 'penghua';

window.addEventListener('keyup', seekResult);

function seekResult(e) {
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  if (isInclude(secretCode)) {
    cornify_add();
  }
}

function isInclude(code) {
  return pressed.join('').includes(code);
}