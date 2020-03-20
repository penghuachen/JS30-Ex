// 可以將處理步驟拆分多個 array methods 處理
const timeNodes = document.querySelectorAll('[data-time]');

let totalSeconds = 
  [...timeNodes]
    .map(node => node.dataset.time)
    .map(timeNode => {
      const [ mins, secs ] = timeNode.split(':');
      return Number(mins) * 60 + Number(secs);
    })
    .reduce((total, time) => total += time );

timeConvertor(totalSeconds)

function timeConvertor(totalSeconds) { 
  let secondsLeft = totalSeconds;
  const hours = Math.floor(secondsLeft / 60 / 60);
  secondsLeft = secondsLeft % 3600;

  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  const seconds = secondsLeft;
  console.log(`Videos total times: ${ hours }:${ minutes }:${ seconds }`)
}