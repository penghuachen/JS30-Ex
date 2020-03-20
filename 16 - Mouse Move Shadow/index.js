const hero = document.querySelector('.hero');
const title = document.querySelector('h1');
const walk = 500;

hero.addEventListener('mousemove', shadow);

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  // 當 this 指向 h1 時，會導致座標變為 (0,0)
  // 所以需要取得此時 h1 與父元素之間的距離
  if(this != e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  // 取得當前 x/y 座標在 hero 中的比例，再乘於自訂偏移量(500px)，並扣掉一半最大偏移量的值。
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  // 使文字陰影可以在不同方向呈現
  title.style.textShadow = `
    ${ xWalk }px ${ yWalk }px 0 rgba(255,0,255,0.7),
    ${ xWalk * -1 }px ${ yWalk }px 0 rgba(0,255,255,0.7),
    ${ yWalk }px ${ xWalk * -1 }px 0 rgba(0,255,0,0.7),
    ${ yWalk * -1 }px ${ xWalk }px 0 rgba(0,0,255,0.7)
  `;
}