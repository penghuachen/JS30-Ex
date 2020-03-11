const styleObj = {
  space: 0,
  blur: 0,
  color: "#ffc600"
};

initMouseEvent();
initChangeEvent();
changeCssVariableBlurValue();
changeCssVariableSpaceValue();
changeCssVariableColorValue();

function initMouseEvent() {
  const spacing = document
                    .querySelector('#spacing')
                    .addEventListener('mousemove', setObjSpaceValue);
  const blur = document
                    .querySelector('#blur')
                    .addEventListener('mousemove', setObjBlurValue);
}

function initChangeEvent() {
  const color = document
                  .querySelector('#color')
                  .addEventListener('change', setObjColorValue);
}

function setObjSpaceValue(e) {
  let nodeName = e.target.nodeName;
  if(nodeName !== 'INPUT') return;
  styleObj['space'] = e.target.value;
  changeCssVariableSpaceValue()
}

function setObjBlurValue(e) {
  let nodeName = e.target.nodeName;
  if(nodeName !== 'INPUT') return;
  styleObj['blur'] = e.target.value;
  changeCssVariableBlurValue()
}

function setObjColorValue(e) {
  let nodeName = e.target.nodeName;
  if(nodeName !== 'INPUT') return;
  styleObj['color'] = e.target.value;
  changeCssVariableColorValue();
}

function changeCssVariableSpaceValue() {
  document
    .documentElement
    .style
    .setProperty('--spacing', `${ styleObj['space'] }px`);
}

function changeCssVariableBlurValue() {
  document
    .documentElement
    .style
    .setProperty('--blur', `${ styleObj['blur'] }px`);
}

function changeCssVariableColorValue() {
  document
    .documentElement
    .style
    .setProperty('--color', `${ styleObj['color'] }`); 
}