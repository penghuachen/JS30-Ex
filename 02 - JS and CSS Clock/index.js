/*
  踩到的雷: transition 過渡效果觸發到一半時被 renderView 重新渲染畫面而中斷
*/
const accessor  = new DegreeAccessor();
renderView();

function DegreeAccessor() {
  let clockDegObj = {
    hour: 0, 
    minute: 0,
    second: 0,
  };
  this.getDegree = prop => clockDegObj[prop];
  this.setTimeValue = fn => fn(clockDegObj);
}



function degreeGenerator(clockDegObj) {
  const now = new Date();
  const SECONDDEGREE = 360 / 60;
  const MINUTESDEGREE = 360 / 60;
  const HOURSDEGREE = 360 / 12;
  clockDegObj.second = now.getSeconds() * SECONDDEGREE - 180;
  clockDegObj.minute = now.getMinutes() * MINUTESDEGREE + 
                       now.getSeconds() * 1/60 * SECONDDEGREE + 180;
  clockDegObj.hour = now.getHours() * HOURSDEGREE +
                     now.getMinutes() * 1/12 * MINUTESDEGREE - 90;
}

function hourHandGenerator() {
  return `
    <div 
      class="hand hour-hand" 
      style="transform: rotate(${ accessor.getDegree('hour') }deg);"
      >
      <img src="img/hour-hand.png" alt="hourhand" >
    </div>
    `;
}

function minuteHandGernerator() {
  return `
    <div 
      class="hand minute-hand"
      style="transform: rotate(${ accessor.getDegree('minute') }deg)" 
      >
      <img src="img/minute-hand.png" alt="minute hand" >
    </div>
  `;
}

function secondHandGernerator() {
  return `
    <div 
      class="hand second-hand"
      style="transform: rotate(${ accessor.getDegree('second') }deg);" 
      >
      <img src="img/second-hand.png" alt="second hand" >
    </div>
  `;
}

function initSecondHandAnimation() {
  const rotate = document.querySelector('.second-hand')
    .style.transform;
  
  console.log(rotate)
  document.querySelector('.second-hand')
    .style= `transform: rotate(${ clockDegObj.second + 30}deg)`;
  console.log(rotate) 
}



function circleDotsGenerator() { 
  const DEGREE = 6;
  let initArr = new Array(60).fill(1);
  return initArr.map((el, index) => {
    return `
      <div 
        class="dot"
        style="transform: rotate(${ DEGREE * index }deg)"  
        ></div>
    `; 
  })
  .join('');
}

function twelveTimeTrackGenerator() {
  const DEGREE = 30;
  let initArr = new Array(12).fill(1);
  return initArr.map((el, index) => {
    return `
      <div 
        class="twelve-time-track"
        style="transform: rotate(${ DEGREE * (index + 1) }deg);"  
        >
        <span
          style="transform: rotate(${ DEGREE * (-(index + 1) + 12) }deg);"
        >${ index + 1 }</span>
      </div>
    `
  })
  .join('');
}

function twentyFourTimeTrackGenerator() {
  const DEGREE = 30;
  let initArr = new Array(12).fill(1);
  return initArr.map((el, index) => {
    return `
      <div 
        class="twenty-four-time-track"
        style="transform: rotate(${ DEGREE * ((index + 1) + 12) }deg);"  
        >
        <span
          style="transform: rotate(${ DEGREE * (-(index + 1) + 12) }deg);"  
        >${ (index + 1) + 12 }</span>
      </div>
    `
  })
  .join('');
}

function renderView() {
  accessor.setTimeValue(degreeGenerator);
  const clock = document.querySelector('.clock');
  clock.innerHTML = `
    ${ circleDotsGenerator() }
    ${ twelveTimeTrackGenerator() }
    ${ twentyFourTimeTrackGenerator() } 
    ${ hourHandGenerator() }
    ${ minuteHandGernerator() }
    ${ secondHandGernerator() }
  `;

  setTimeout(() => {
    const secHand = document.querySelector('.second-hand');  
    secHand.style.transform = `rotate(${ accessor.getDegree('second') + 6 }deg)`;
    setTimeout(() => {
      renderView();
    },1000);
  },0)
}

