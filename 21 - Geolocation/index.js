const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const latitude = document.querySelector('.latitude');
const longitude = document.querySelector('.longitude');

navigator.geolocation.watchPosition(data => {
  console.log(data)
  speed.textContent = Math.round(data.coords.speed) || 0;
  latitude.textContent = data.coords.latitude;
  longitude.textContent = data.coords.longitude;
  arrow.style.transform = `rotate(${ data.coords.heading })deg`;
}, err => {
  console.err(err);
  alert('Something wrong...');
})