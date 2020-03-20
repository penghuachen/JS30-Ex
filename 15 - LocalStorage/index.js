const itemsList = document.querySelector('.plates');
const todoAccessor = new Accessor();
initEvents();
renderView();


function Accessor() {
  const items = JSON.parse(localStorage.getItem('todoTasks')) || [];

  this.getItems = () => items;
  this.updateItems = item => {
    items.push(item);
    localStorage.setItem('todoTasks', JSON.stringify(items));
  }
}

function initEvents() {
  const addItems = document.querySelector('.add-items');

  addItems.addEventListener('submit', addItem);
  addItems.addEventListener('keydown', pressEnterToAddItem);
}

function pressEnterToAddItem(e) { 
  if(e.keyCode != 13) return;
  addItem(e);
}

function addItem(e) {
  e.preventDefault();
  const text = document.querySelector('input[type="text"]').value;
  const item = {
    text,
    done: false
  };
  todoAccessor.updateItems(item);
  renderView();
  document.querySelector('input[type="text"]').value = ''; 
}

function taskDomGenerator(item, index) {
  return `
    <li>
      <input 
        type="checkbox" 
        id="item${ index }" 
        ${ item.done ? 'checked' : '' } 
      />
      <label for="item${ index }">${ item.text }</label>
    </li>
  `;
}

function renderView() {
  console.log(todoAccessor.getItems());
  itemsList.innerHTML = todoAccessor.getItems()
                          .map((item, i) => taskDomGenerator(item, i))
                          .join('');
  
}