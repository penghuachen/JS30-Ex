# Object and Arrays - Reference VS Copy 

## 本題重點

了解基本型別值、物件與陣列在拷貝時的行為。

這邊不刻意強調 call by value, call by reference, call by sharing 等名詞的各方解釋，**僅強調在 JavaScript 中它們各自會有怎樣的行為會發生**。


## 基本型別值的拷貝

```javascript=
let a = 3;
let b = a;
b = 2;
console.log(a); // 3
console.log(b); // 2
```

可以觀察到 `b = a`，後再 `b = 2`，並不會影響 `a` 的值。

這代表基本型別值在以上的行為時，**並不會相互影響，為各自獨立。**

## 物件與陣列的拷貝


### 物件的拷貝

- 首先是第一個例子：

  可以發現當我們將 `person` 當作 `anotherPerson` 的值時，**修改 `anotherPerson` 的值也同時會修改到 `person` 的值。**
```javascript=
var person = {
  name: 'Penghua',
  age: 18
};

var anotherPerson = person;
anotherPerson.age = 25;
console.log('person', person);
console.log('anotherPerson', anotherPerson);
```

- 使用 `Object.assign()`

   1. **對於第一層結構可以不影響原物件。**
   2. **第二層結構後會影響原物件中的值。**

```javascript=
var person = {
  name: 'Penghua',
  age: 18,
  details: {
    habit: 'soccer'
  }
};

var anotherPerson = Object.assign({}, person);
anotherPerson.age = 25;
anotherPerson.details.habit = 'tennis';
console.log('person', person);
console.log('anotherPerson', anotherPerson);
```

- 那該如何避免修改到呢?

  **重新指定一個物件字面值給 `anotherPerson`**，程式碼如下

```javascript=
var person = {
  name: 'Penghua',
  age: 18
};

var anotherPerson = {
  name: 'Bill',
  age: person.age
};

console.log('person', person);
console.log('anotherPerson', anotherPerson);
```

### 陣列的拷貝

陣列的拷貝方式在行為上會有較多的情境，以下以此題運用到的為例。

- 陣列在拷貝時會有和物件一樣的情況，同樣會修改到原陣列。

```javascript=
var arr = [1, 2, 3, 4, 5];
var anotherArr = arr;
anotherArr[3] = 789;
console.log('arr', arr);
console.log('anotherArr', anotherArr);
```

- 陣列中的值為物件時，會有如前一個例子的情況

```javascript=
var arr = [{number: 123},{number: 456}];
var anotherArr = arr;
anotherArr[0].number = 789;
console.log('arr', arr);
console.log('anotherArr', anotherArr);
```

接下來測試幾個在此題中運用到的拷貝方式，可以避免修改到原陣列的值，**但需要注意的是如果為物件，則還是會有修改到的情況發生。**


- 在陣列中值為基本型別值，使用 `slice` 的情況

  可以發現並不會修改到原陣列

```javascript=
var arr = [1,2,3,4,5];
var anotherArr = arr.slice();
anotherArr[0] = 789;
console.log('arr', arr); // [1,2,3,4,5];
console.log('anotherArr', anotherArr); // [789, 2,3,4,5]
```

- 在陣列中值為物件，使用 `slice` 的情況

  可以發現還是會修改到原陣列中的值

```javascript=
var arr = [{number: 123},{number: 456}];
var anotherArr = arr.slice();
anotherArr[0].number = 789;
console.log('arr', arr);
console.log('anotherArr', anotherArr);
```

- 在陣列中值為基本型別值，使用 `concat()` 的情況

  可以發現並不會修改到原陣列

```javascript=
var arr = [1,2,3,4,5];
var anotherArr = [].concat(arr);
anotherArr[0] = 789;
console.log('arr', arr); // [1,2,3,4,5];
console.log('anotherArr', anotherArr); // [789, 2,3,4,5]
```

- 在陣列中值為基本型別值，使用 `concat` 的情況

  可以發現還是會修改到原陣列中的值

```javascript=
var arr = [{number: 123},{number: 456}];
var anotherArr = [].concat(arr);
anotherArr[0].number = 789;
console.log('arr', arr);
console.log('anotherArr', anotherArr);
```

- 在陣列中值為基本型別值，使用 `...` 的情況

  可以發現並不會修改到原陣列

```javascript=
var arr = [1,2,3,4,5];
var anotherArr = [...arr];
anotherArr[0] = 789;
console.log('arr', arr); // [1,2,3,4,5];
console.log('anotherArr', anotherArr); // [789, 2,3,4,5]
```

- 在陣列中值為基本型別值，使用 `...` 的情況

  可以發現還是會修改到原陣列中的值

```javascript=
var arr = [{number: 123},{number: 456}];
var anotherArr = [...arr];
anotherArr[0].number = 789;
console.log('arr', arr);
console.log('anotherArr', anotherArr);
```

- 在陣列中值為基本型別值，使用 `Array.from()` 的情況

  可以發現並不會修改到原陣列

```javascript=
var arr = [1,2,3,4,5];
var anotherArr = Array.from(arr);
anotherArr[0] = 789;
console.log('arr', arr); // [1,2,3,4,5];
console.log('anotherArr', anotherArr); // [789, 2,3,4,5]
```

- 在陣列中值為基本型別值，使用 `Array.from()` 的情況

  可以發現還是會修改到原陣列中的值

```javascript=
var arr = [{number: 123},{number: 456}];
var anotherArr = Array.from(arr);
anotherArr[0].number = 789;
console.log('arr', arr);
console.log('anotherArr', anotherArr);
```

- 如何完全拷貝出兩份不同資料?(無論是基本型別值、物件或陣列)

  使用 `JSON.stringify()` 與 `JSON.parse()` 可以達到此目的。

```javascript=
var arr = [{number: 123},{number: 456}];
var anotherArr = JSON.parse(JSON.stringify(arr));
anotherArr[0].number = 789;
console.log('arr', arr);
console.log('anotherArr', anotherArr);
```

## 小結論

原生寫法要能達成完全複製出不同資料的語法只能透過 `JSON.stringify()` 與 `JSON.parse()`，其他語法都會有修改到原本資料的可能性。

## 參考來源

- [深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？](https://blog.techbridge.cc/2018/06/23/javascript-call-by-value-or-reference/)
- [Array.prototype.slice（）](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)