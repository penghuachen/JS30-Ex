
const styleAccessor = new StyleObjAccessor();
initEvents();

function StyleObjAccessor() {
  const styleObj = {
    space: 10,
    blur: 1,
    color: "#ffc600",
    current: null,
  };
  this.setStyleValue = (name, value) => {
    styleObj['current'] = name;
    styleObj[name] = value;
  };
  this.getStyle = fn => fn(styleObj);
}

function initEvents() {
  document
    .querySelector('.controls')
    .addEventListener('input',setObjValue);
}

function setObjValue(e) {
  if(e.target.nodeName !== 'INPUT') return;
  let idName = e.target.id;
  let inputValue = e.target.value;
  styleAccessor.setStyleValue(idName, inputValue);
  styleAccessor.getStyle(changeCssStyle);
}

function changeCssStyle(styleObj) {
  if(styleObj.current !== 'color') {
    document.documentElement.style
      .setProperty(`--${ styleObj.current }`, `${ styleObj[styleObj.current] }px`);
    return;
  }
  document.documentElement.style
    .setProperty(`--${ styleObj.current }`, `${ styleObj[styleObj.current] }`);    
}