const store = new StoreAccessor();

function StoreAccessor() {
  let storeArray = [];

  this.getStoreArray = () => storeArray;
  this.updateStoreArray = (storeArray ,index) => {
    storeArray.length >= 2 
      ? storeArray.pop() 
      : null
    storeArray.push(index);
  };
}

const checkboxs = document.querySelectorAll('input[type="checkbox"]');

checkboxs
  .forEach(checkbox => checkbox.addEventListener('click', clickHandler));

function clickHandler(e) {
  let isShift = e.shiftKey;
  let index = [...checkboxs].indexOf(this);
  store.updateStoreArray(store.getStoreArray(), index);

  updateCheckedStatus(isShift);
}

function updateCheckedStatus(isShift) {
  let checkLength = store.getStoreArray().length;
  if(checkLength == 2 && isShift) {
    store.getStoreArray().sort((a, b) => a - b);
    const [startIndex, endIndex] = store.getStoreArray();
    const targetElements = [...checkboxs].slice(startIndex, endIndex + 1);
    targetElements.forEach(element => element.checked = true);    
  }
}
