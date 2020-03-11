const styleObj = {
  space: 10,
  blur: 1,
  color: "#ffc600",
  current: null,
};


initEvents();
function initEvents() {
  document
    .querySelector('.controls')
    .addEventListener('mousemove',setObjValue);
  document
    .querySelector('.controls')
    .addEventListener('change',setObjValue);
}

function setObjValue(e) {
  if(e.target.nodeName !== 'INPUT') return;
  let idName = e.target.id;
  let inputValue = e.target.value;
  styleObj['current'] = idName;
  styleObj[idName] = inputValue;
  changeCssVariablesValues();
}

function changeCssVariablesValues() {
  if(styleObj.current !== 'color') {
    document
      .documentElement
      .style
      .setProperty(`--${ styleObj.current }`, `${ styleObj[styleObj.current] }px`);
    return;
  }
  document
    .documentElement
    .style
    .setProperty(`--${ styleObj.current }`, `${ styleObj[styleObj.current] }`);    
}