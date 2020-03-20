# CSS Text Shadow Mouse Move Effect

## 本題重點

1. 取得元素座標值，計算文字陰影需要的偏移量。
2. 物件解構賦值。
3. 文字陰影(text-shadow)

### 取得元素座標值

需要注意的是 mousemove 事件觸發時，當觸發元素從父元素移到子元素時，會導致 `offsetX`, `offsetY` 為 0，所以需要額外計算子元素與父元素的距離，如 [Demo](https://codepen.io/kids5346/pen/poJVXXL)。

### 物件解構賦值

物件解構賦值是 ES6 的新技巧，可以讓我們更快速取得物件中的值。

- 基本使用

```javascript=
var person = {
  name: 'Penghua',
  age: 25
};

const { name, age } = person;
console.log('name', name);
console.log('age', age);
```

- 指定新變數名稱

```javascript=
var person = {
  name: 'Penghua',
  age: 25
};

const { name: anotherName, age: anotherAge } = person;

console.log('anotherName', anotherName);
console.log('anotherAge', anotherAge);
```

- 設定預設值

  當物件中沒有該 key 時， `name` 會使用預設值 `Bill`:

```javascript=
var person = {
  age: 25
};

const { name = "Bill", age } = person;
console.log('name', name);
```

- 從函式參數解構物件

```javascript=
function getPersonInfo({name, age}) {
  console.log(`My name is ${ name }, ${ age } years old.`);
}

getPersonInfo({
  name: 'Penghua',
  age: 25,
  habbit: 'soccer'
})
```

- 巢狀物件解構

```javascript=
var person = {
  name: 'Penghua',
  subject: {
    math: 90,
    English: 85
  }
};

const { 
  subject: {
    math,
    English
  } 
} = person;
console.log('math', math);
console.log('English', English);
```

- 循環取出物件解構的值

  先看看 `for...of` 用法

```javascript=
var arr = [1,2,3];

for(const num of arr) {
  console.log('num', num);
}
```

  將 `for...of` 搭配物件解構技巧
  
```javascript=
var person = [
  {
    name: 'Penghua',
    subject: {
      math: 90,
      English: 85
    }
  },
  {
    name: 'Bill',
    subject: {
      math: 50,
      English: 55
    }
  },
];

for(const { 
  name, 
  subject: { 
    math, 
    English 
  }
} of person) {
  console.log(`${name}'s math is ${math}`);
}
```

### 文字陰影(text-shadow)

#### 用來替文字增加陰影效果

#### 如何使用

- 基本使用

```css=
/* 順序可以任意顛倒 */
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black;
```

- 多個文字陰影

```css=
/* 多個陰影需要用 , 隔開 */
text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue;
```

#### 參數

1. `offset-x`: 以文字中心為原點，在 x 軸的偏移量。
2. `offset-y`: 以文字中心為原點，在 y 軸的偏移量。
3. `blur-radius`: 模糊半徑，預設為 0，值越大越模糊。
4. `color`: 設定陰影顏色

#### 注意事項

1. 多個陰影時，影子順序由前到後。
2. 也適用於 `::first-line`, `::first-letter`

#### DEMO

[DEMO](https://codepen.io/kids5346/pen/eYNjEgj)


## 參考來源

- [解構賦值](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [text-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)