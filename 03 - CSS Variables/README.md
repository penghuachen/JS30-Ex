# CSS Variables

## 此題重點

1. 使用 input 事件或者 change 事件搭配 mousemove 事件即時取得輸入的值。
2. css 變數的使用
3. 透過 JavaSript 動態修改 css 變數的值
4. 操作根元素的語法 
5. css filter(濾鏡)


## 語法使用意義與學習

### input 事件 與 change 搭配 mousemove 事件

本題的需求是**使用者透過 input 元素中的值，藉此改變 css 樣式的設定。**

而其中可以透過兩種方式達成同一個目的:

1. 直接透過 input 事件可以即時取得 input 元素中的值。
2. 透過 change 事件 搭配 mousemove 事件。

而之所以 change 事件需要和 mousemove 事件搭配。

原因在於 **change 事件會在使用者輸入值後，需要失去焦點才能觸發該事件**

所以需要**搭配 mousemove 事件在滑鼠每次移動時即時取得值**才行。

### css 變數

#### 支援度

需要特別注意**IE 瀏覽器是全部不支援的**。

但整題的支援度截至 2020.03 已經高達 94% 。

![](https://i.imgur.com/etroGdG.png)

### 如何使用

#### 基本使用方式

在預處理器(pre-processor)中我們透過 $ 來進行變數的設定，在使用 css 變數時的概念也是相同的。

只是宣告變數的方式則是透過 **`--`** 的方式來宣告。

來看看底下這段在影片中提到的 code，簡化如下:

```css=
:root {
  --base: #ffc600;
}

.hl {
  color: var(--base);
}
```

1. 在 `:root` 中定義了變數 `--base`，值為 `#ffc600`
2. 在 `.hl` 中透過 `var(--base)` 取用該變數的值。

當然我們也可以在任意的選擇器中進行設定:

```css=
h3 {
  --base: #ffc600;
}
```

這樣一來就會設定在只有 `h3` 元素下才可以使用。

而如果使用情境允許的話，其實在 RWD 中我們可以透過變更 css 變數的值，來達到在符合螢幕尺寸時需要呈現的樣式。

```css=
h3 {
  --base: #ffc600;
}

@media (min-width: 768px) {
  h3 {
    --base: #f00;
  }
}
```

#### css 變數使用限制

css 變數在使用上需要注意幾點:

1. 不能用來當作 css 特性的變數名稱。
2. 透過「組合」的方式使用需要搭配 `calc` 語法

下述例子描述的是不能用來當作 css 特性的變數名稱。

```css=
.foo {
  --side: margin-top;
  var(--side): 20px;
}
```

而這個例子描述的是如果透過「組合」的方式使用需要搭配 `calc` 語法

無效行為:
```css=
.foo {
  --gap: 20;
  margin-top: var(--gap)px;
}
```


有效行為:
```css=
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```

#### 多次宣告 css 變數時的使用規則

在 [2.1. Custom Property Value Syntax](https://www.w3.org/TR/css-variables-1/#syntax) 中的 EXAMPLE 5 提到，如果 css 變數被多次宣告時，則**採用css層級的規則作為判斷使用何者的依據**
 
```css=
:root { 
  --color: blue; 
}
div { 
--color: green; }
#alert { --color: red; }
* { color: var(--color); }
```

```css=
:root { 
  --color: blue; 
}
div { 
  --color: green; 
}
#alert { 
  --color: red; 
}
* { 
  color: var(--color);
}
```
```htmlmixed=
<p>I inherited blue from the root element!</p>
<div>I got green set directly on me!</div>
<div id='alert'>
  While I got red set directly on me!
  <p>I’m red too, because of inheritance!</p>
</div>
```

以 `div` 元素為例， `id` 為 `alert` 的元素，裡面的文字內容會是紅色，原因在於依據 css 層級的規則， 在此 `id` 的優先層級最高，所以才會是紅色。

#### var() function

依據 [Using Cascading Variables: the var() notation](https://www.w3.org/TR/css-variables-1/#funcdef-var) 中對於 `var()` 的變數定義:

```bash=
var() = var( <custom-property-name> [, <declaration-value> ]? )
```

預設必須提供一個**自定義的變數名稱**，然後可以**選擇性的提供額外宣告的值**。

提供額外宣告的值的意義，在於**當自定義的變數名稱如果無效時，就可以使用這額外宣告的值。**：


```css=

:root {
  --header-color: #f00;
  --color: #aad;
}

.component .header {
  color: var(--header-color, blue);
}
.component .text {
  color: var(--text-color, black);
}
```

上述程式碼提供了以下的訊息:
1. `--header-color` 是有效變數，所以使用的值為 `#f00`
2. `--text-color` 是無效變數，所以使用的值為 `black` 

## 透過 JS 動態讀取、修改 css 變數

JS 提供以下語法讓我們可以動態讀取、修改樣式的值，而這也適用於 css 變數:

- 讀取:
  ```bash
    var value = style.getPropertyValue(property);
  ```

- 修改:
  ```bash
    style.setProperty(propertyName, value, priority);
  ```

在範例中使用於 css 變數的部分程式碼:

```javascript=
 function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  }
```

## 操作根元素的語法

透過以下語法，可以選取到 `root` 元素：

```javascript=
  var element = document.documentElement;
```

## css filter 濾鏡基礎使用

filter(濾鏡) 可以將一些圖片效果應用在元素上。

### 可設定的參數

1. `blur()`: 設置模糊度，預設為 0，不接受百分比值。
2. `brightness()`: 設置明亮度，預設為 1，代表 100% 亮度，0% 則全黑。
3. `contrast()`: 設置對比度，預設為 1，代表 100% 亮度，0% 則全黑。
4. `drop-shadow()`: 設置圖像下面的陰影效果，使用方式與 `box-shadow` 相似，但不支援 `inset` 內陰影語法。[參考連結](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
5. `grayscale()`: 設置灰階度，預設為 0， 100% 轉為全灰圖像。
6. `hue-rotate()`:設置色相旋轉角度，預設為 0 deg。
7. `invert()`: 設置負片轉換比例，預設為 0。
8. `opacity()`: 設置透明度，預設為 0。
9. `saturate()`: 設置飽和度，預設為 1，代表飽和。
10. `sepia()`: 設置深褐顏色的程度，預設為 0。

##  參考依據

- [w3 org css variable](https://www.w3.org/TR/css-variables-1/)
- [css variable](https://muki.tw/tech/native-css-variables/)
- [setProperty](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)
- [getPropertyPriority()](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyPriority)








