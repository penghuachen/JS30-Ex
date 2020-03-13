const responseAccessor = new Accessor();
initInputEvent();
fetchEvent();

function fetchEvent() {
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  fetch(endpoint)
    .then(blob => blob.json())
    .then(datas => responseAccessor.setRes(datas))
    .catch(e => console.log(e));
}

function Accessor() {
  let initRes;
  let newRes;
  let searchText;

  this.getRes = () => initRes;
  this.setRes = res => initRes = res;

  this.getSearchText = () => searchText;
  this.setSearchText = text => searchText = text;

  this.getNewRes = () => newRes;
  this.setNewRes = newVal => newRes = newVal;
}

function initInputEvent() {
  const searchText = document.querySelector('.search');
  searchText.addEventListener('input', filterMatches);
}

function listItemsGenerator(res) {
  let searchText = responseAccessor.getSearchText();
  const regex = new RegExp(searchText, 'gi');
  return res.map(country => {
    let city = country.city.replace(regex, `<span class="hl">${ searchText }</span>`);
    let state = country.state.replace(regex, `<span class="hl">${ searchText }</span>`);
    return `
      <li>
        <span class="name">${ city }, ${ state }</span>
        <span class="population">${ addCommasToNumber(country.population) }</span>
      </li>`;
  })
  .join('');
}

function addCommasToNumber(population) {
  // method1: Use number.toLocaleString()
  return Number(population).toLocaleString({ useGrouping: true });

  // method2: Use regex
  // return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function filterMatches(e) {
  responseAccessor.setSearchText(e.target.value);
  const searchText = responseAccessor.getSearchText();
  const regex = new RegExp(searchText, 'gi');
  responseAccessor.setNewRes(
    [...responseAccessor.getRes()]
      .filter(data => data.city.match(regex) || data.state.match(regex))
  );
  
  renderView();
}

function renderView() {
  const suggestions = document.querySelector('.suggestions');
  suggestions.innerHTML = listItemsGenerator(responseAccessor.getNewRes());
}
