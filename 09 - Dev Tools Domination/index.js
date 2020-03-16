const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('Hell World!');

// Interpolated
console.log("I'm %s engineer!", 'Front-End');

// Styled
console.log("%c I'm Front-End engineer!", "font-size: 30px; color: #ff0;");

// warning!
console.warn('Watch out!');

// Error :|
console.error('Something wrong...');

// Info
console.info('Crocodiles eat 3-4 people per year');

// Testing
console.assert(1 == 2, 'That is wrong');

// clearing
console.clear();

// Viewing DOM Elements
const p = document.querySelector('p');
console.log(p);
console.dir(p);
console.clear();

// Grouping together
dogs.forEach(dog => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

// counting
console.count('Hey');
console.count('Hey');
console.count('Hey');

// timing
console.time('Wainting for result');
setTimeout(() => {
  console.log('Some value');
  console.trace()

  console.timeEnd('Wainting for result');
}, 1000);


// table
console.table(dogs);
