let clockDegObj = {
  hour: 0, 
  minute: 0,
  second: 0,
};
setInterval(calculateTime, 1000);

function calculateTime() {
  const now = new Date();
  const SECONDDEGREE = 360 / 60;
  const MINUTESDEGREE = 360 / 60;
  const HOURSDEGREE = 360 / 12;
  clockDegObj.second = now.getSeconds() * SECONDDEGREE - 180;
  clockDegObj.minute = now.getMinutes() * MINUTESDEGREE + 
                       now.getSeconds() * 1/60 * SECONDDEGREE + 180;
  clockDegObj.hour = now.getHours() * HOURSDEGREE +
                     now.getMinutes() * 1/12 * MINUTESDEGREE - 90;

  renderView();
}

function hourHandGenerator() {
  return `
    <div 
      class="hand hour-hand" 
      style="transform: rotate(${ clockDegObj.hour }deg);"
      >
      <img src="img/hour-hand.png" alt="hourhand" >
    </div>
    `;
}

function minuteHandGernerator() {
  return `
    <div 
      class="hand minute-hand"
      style="transform: rotate(${ clockDegObj.minute }deg)" 
      >
      <img src="img/minute-hand.png" alt="minute hand" >
    </div>
  `;
}

function secondHandGernerator() {
  return `
    <div 
      class="hand second-hand"
      style="transform: rotate(${ clockDegObj.second }deg);" 
      >
      <img src="img/second-hand.png" alt="second hand" >
    </div>
  `;
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
  const clock = document.querySelector('.clock');
  clock.innerHTML = `
    ${ circleDotsGenerator() }
    ${ twelveTimeTrackGenerator() }
    ${ twentyFourTimeTrackGenerator() } 
    ${ hourHandGenerator() }
    ${ minuteHandGernerator() }
    ${ secondHandGernerator() }
  `;
}

