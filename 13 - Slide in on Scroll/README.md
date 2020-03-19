# Slide in on scroll 

## 本題重點

1. 透過下列語法實現滾軸滾至圖片範圍內時，搭配 `class` 顯示圖片。
    - `scroll` event
    - `window.innerHeight`
    - `window.scrollTop`, `window.pageYOffset`
    - `el.offsetTop`
    - `el.height`
2. 使用 debounce 函式處理連續多次觸發事件時的情況。

## 語法使用與學習

### `scroll` event

應用於**滾軸滑動時可以取得對應的事件參數**。

```javascript=
window.addEventListener('scroll', e => console.log(e));
```

### `window.scrollY`, `window.pageYOffset`

1. 取得在垂直方向已經滾動時的距離值，以 px 為單位。
2. 而 `pageYOffset` 則是`scrollY` 的別名。



### `window.innerHeight`

viewport 的高度(包含滾動軸)

### `element.offsetParent`,`element.offsetTop`, `element.offsetWidth`, `element.clientTop`, `element.clientWidth` 理解

這裡需要注意的是這些特性是**元素自身**就有的特性。

且與 **`offsetX`**, **`clientX`** 等定義不同。

#### `element.offsetParent`

1. Read-only
2. 回傳目標元素作為偏移基準的父層元素。

#### `element.offsetTop`

1. Read-only
2. 取得相對於其 offsetParent 元素的頂部內邊距距離。
3. (比較): **`offsetX`是依據元素與整個 page 的距離。**

#### `element.offsetWidth`,

1. Read-only
2. 包含的範圍為包含元素的:
    - **邊框(border)**
    - **水平線上的內邊距(padding)**
    - **豎直方向滾動條(scrollbar)（如果存在的話）**
    - **CSS設置的寬度(width)的值。**
4. 各瀏覽器的 `offsetWidth` 可能有所不同
5. 會四捨五入為一個整數，如果需要有小數值，則需要使用 `element.getBoundingClientRect()`。

![](https://i.imgur.com/ocvaNGg.png)

#### `element.clientTop`

1. Read-only
2. 元素上方邊框的寬度
3. (比較): **`clientX`是依據元素與 viewport 的距離**

#### `element.clientWidth`

1. Read-only
2. 範圍為**元素但不包含邊框、外邊距及垂直滾軸**


#### 圖像化

![](https://i.imgur.com/1PUG918.png)



#### `Element.getBoundingClientRect()`

1. 取得元素**相對**於 viewport 的位置與元素自身的大小。

```javascript=
rectObject = object.getBoundingClientRect();
```
2. 如果要取得相對於左上角定位的屬性值，則需要透過 `scroll` 事件將值給予 `left`, `top`。

![](https://i.imgur.com/PBDcNWX.png)


#### 表格比較

| 語法           | 從哪取得此參數     | 用途 | 連結                                                                           |
|--------------|-------------|----|------------------------------------------------------------------------------|
| clientX      | Mouse event |    | https://developer\.mozilla\.org/en\-US/docs/Web/API/MouseEvent/clientX                                     |
| clientY      | Mouse event |    | https://developer\.mozilla\.org/en\-US/docs/Web/API/MouseEvent/clientY       |
| offsetX      | Mouse event |    | https://developer\.mozilla\.org/en\-US/docs/Web/API/MouseEvent/offsetX       |
| offsetY      | Mouse event |    | https://developer\.mozilla\.org/en\-US/docs/Web/API/MouseEvent/offsetY       |
| pageX        | Mouse event |    | https://developer\.mozilla\.org/en\-US/docs/Web/API/MouseEvent/pageX         |
| pageY        | Mouse event |    | https://developer\.mozilla\.org/en\-US/docs/Web/API/MouseEvent/pageY         |
| screenX      | Mouse event |    | https://developer\.mozilla\.org/en\-US/docs/Web/API/MouseEvent/screenX       |
| screenY      | Mouse event |    | https://developer\.mozilla\.org/en\-US/docs/Web/API/MouseEvent/screenY       |
| offsetTop    | Dom element |    | https://developer\.mozilla\.org/zh\-CN/docs/Web/API/HTMLElement/offsetTop    |
| offsetLeft   | Dom element |    | https://developer\.mozilla\.org/zh\-CN/docs/Web/API/HTMLElement/offsetLeft   |
| offsetParent | Dom element |    | https://developer\.mozilla\.org/zh\-CN/docs/Web/API/HTMLElement/offsetParent |
| offsetWidth  | Dom element |    | https://developer\.mozilla\.org/zh\-CN/docs/Web/API/HTMLElement/offsetWidth  |
| offsetHeight | Dom element |    | https://developer\.mozilla\.org/zh\-CN/docs/Web/API/HTMLElement/offsetHeight |
| clientTop    | Dom element |    | https://developer\.mozilla\.org/zh\-CN/docs/Web/API/Element/clientTop        |
| clientLeft   | Dom element |    | https://developer\.mozilla\.org/zh\-CN/docs/Web/API/Element/clientLeft       |
| clientWidth  | Dom element |    | https://developer\.mozilla\.org/zh\-CN/docs/Web/API/Element/clientWidth      |
| clientHeight | Dom element |    | https://developer\.mozilla\.org/zh\-CN/docs/Web/API/Element/clientHeight     |
|              |             |    |                                                                              |


## debounce 與 throttle

### 緣由

在瀏覽器中有一些事件會被連續多次的觸發，例如 `scroll` 事件等，而這些事件會因為不斷在操作 DOM 而耗費很大的效能，導致頁面可能會有緩慢等情況發生。

### debounce 與 throttle 的意義

兩者都是用來要**控制事件會被連續多次觸發**而開發出來的解決之道。

在使用上會依據情境不同而選擇不同。

### debounce

概念是**運用開關的觀念，當符合某段時間時，延遲設定秒數後才觸發對應需求的函式，否則不予理會。**

```javascript=
// 課程提供的範例程式碼
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
```

### throttle

概念是**透過控制需求函式執行的頻率，達到降低不斷呼叫函式的目的**



## 參考來源

- [Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)
- [Element.getBoundingClientRect（）](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
- [網頁 DOM 事件的效能優化：Debounce 和 Throttle](https://mropengate.blogspot.com/2017/12/dom-debounce-throttle.html)
