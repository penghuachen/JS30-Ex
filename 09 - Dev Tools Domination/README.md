# Dev Tools Domination

## 本題重點

- 如何在 GOOGLE 瀏覽器中對於 dom 元素下中斷點，並查看是觸發哪一個事件被。
- GOOGLE 開發者工具中控制台相關可使用的 `console` 技巧。

## 語法使用意義與學習

### 對於 dom 元素下中斷點

要在 Google 瀏覽器中查看 dom 元素目前正觸發哪些事件的話是有辦法的，步驟如下:

![](https://i.imgur.com/5qLvw8P.png)

1. 選取瀏覽器中要查看的 dom 元素
2. 點擊右鍵，選擇 break
3. 依據要查看的情境選擇
   -  Subtree modifications 
   -  Attribute modifications
   -  Node removal。

其中:

- Subtree modifications: 
  - 在移除或添加當前所選節點的子級，或更改子級內容時觸發這類斷點。
  - 在子級節點屬性發生變化或對當前所選節點進行任何更改時不會觸發這類斷點。
- Attribute modifications:
  - 在當前所選節點上添加或移除屬性，或屬性值發生變化時觸發這類斷點。
- Node removal: 
  - 在移除當前選定的節點時會觸發


### Google dev tool 中提供的 console 技巧

#### `console.assert()`

斷言，應用於簡單的測試行為。

當第一個參數為 `false` 時，才會顯示第二個參數的值。

```javascript=
console.assert(1==2, "That's wrong")
```

#### `console.clear()`

清除控制台的所有訊息

#### `console.count()`

用於計數相關重複的值出現的次數。

```javascript=
console.count('dog');
console.count('dog');
console.count('dog');
console.count('dog');
```

#### `console.dir(object)`

可用於顯示特定物件的相關訊息。

```htmlmixed=
<p>This is a text.</p>
```

```javascript=
const p = document.querySelector('p');
console.dir(p);
```

#### `console.error()`

用於提供錯誤訊息。

#### `console.group()`,`console.groupEnd()` `console.groupCollapse()`

用於將相關聯的訊息分為一組。

```javascript=
const label = 'Person';
console.group(label);
console.info('Leo');
console.info('Mike');
console.info('Don');
console.info('Raph');
console.groupEnd(label);
```

#### `console.info()`

用於顯示資訊

#### `console.table()`

透過表格方式呈現資訊

#### `console.time()`, `console.timeEnd()`

應用於查看特定目標的執行時間。

```javascript=
console.time('Wainting for result');
setTimeout(() => {
  console.log('Some value');
  console.timeEnd('Wainting for result');
}, 1000);
```

#### `console.trace()`

應用於查看 stack 中的相關訊息
```javascript=
console.time('Wainting for result');
setTimeout(() => {
  console.log('Some value');
  console.trace();
  console.timeEnd('Wainting for result');
}, 1000);
```

#### `console.error()`

用於顯示錯誤訊息

#### `console.log()`

用於查看資訊，其中提供[以下設定](https://developers.google.com/web/tools/chrome-devtools/console/console-write#%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%9B%BF%E4%BB%A3%E5%92%8C%E6%A0%BC%E5%BC%8F%E8%A8%AD%E7%BD%AE)用來替代字串:

列舉幾個例子如下:

```javascript=

console.log('Hell World!');

console.log("I'm %s engineer!", 'Front-End');

console.log("%c I'm Front-End engineer!", "font-size: 30px; color: #ff0;");

```


## 參考

- [Chrome Devtools - DOM 更改斷點](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints?hl=zh-cn#dom)
- [Chrome Devtools - API Refference](https://developers.google.com/web/tools/chrome-devtools/console/console-write#string_substitution_and_formatting)
