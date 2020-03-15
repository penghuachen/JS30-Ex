# Fun with HTML 5 Canvas

## 此題重點

- 使用 `<canvas>` 實作簡單在網頁上繪畫的功能。

## 支援度

![](https://i.imgur.com/pKyDfAR.png)

## `<canvas>` 基礎使用

### 標籤介紹

`<canvas>` 預設有寬度及高度：

1. 寬度: 300px
2. 高度: 150px

但也可以透過設定 `width`,`height` 屬性提供。

```htmlmixed=
<canvas id="draw" width="800px" height="800px"></canvas>
```

此外，同樣也可以設定如下的樣式:

- `margin`
- `border`
- `background`

### 本題使用的語法

- 語法:
  - `getContext()`
  - `beginPath()`
  - `stroke()`
  - `strokeStyle`
  - `lineJoin`
  - `lineCap`
  - `lineWidth`
  - `moveTo()`
  - `lineTo()`

#### 渲染環境(rendering context)

要在 `<canvas>` 中顯示影像，必須讓**程式在編譯時先存取渲染環境，才可以在繪圖時得到要顯示的內容**。

而其提供了 `getContext()` 方法用來存取渲染環境，並且同時提供了用於繪圖的相關方法。

下方的程式碼顯示的是==在 2D 渲染環境中，可以使用的相關的繪圖方法==。

```htmlmixed=
<canvas id="draw" width="800" height="800"></canvas>
```

```javascript=
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
console.log("Output: ctx", ctx)
```

#### beginPath()

在路徑繪製時會經過以下步驟:

1. 產生路徑
2. 繪圖指令畫出路徑
3. 結束路徑

路徑繪製完成後，就可以透過畫筆或者填滿的方式渲染。

`beginPath()` 則用來產生一個新路徑。

#### stroke()

繪製圖形的邊框。

#### strokeStyle

當透過 `stroke` 繪製出圖形的邊框後，透過 `strokeStyle` 可以替其設定色彩。

#### lineJoin

用於在兩條線交匯時，對於相連接處的樣式設定。

有三個值可以做設定:

- round: 填充一個額外的扇形，藉此繪製拐角的形狀
- bevel: 填充一個額外的三角形，繪製矩形拐角
- miter: 預設值，透過延伸相連的部分，使其相交於一點，形成一個額外的菱形區域。

```javascript=
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.lineWidth = 10;
ctx.lineJoin = "round";
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(200, 100);
ctx.lineTo(300,0);
ctx.stroke();
```

#### lineCap

定義每一條線的末端樣式，有三個屬性可以設定:

1. butt: 預設值，末端以方形結束
2. round: 末端以圓形結束
3. suare: 末端以方形結束，但增加了一小塊寬與線寬相同，高度則是線厚度一半的矩形區域。


```javascript=
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineWidth = 15;
ctx.lineCap = "square";
ctx.lineTo(100, 100);
ctx.stroke();
```

#### lineWidth

定義線段的厚度。

#### moveTo()

可以定義一個新的子路徑的起始點。

```javascript=
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(200, 50);
ctx.stroke();
```

#### lineTo()

使用直線連接子路徑的終點與起始點，需要注意的是並不會繪製真正的直線。

```javascript=
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(100, 100);
ctx.stroke();
```

#### 練習範例

- [demo](https://codepen.io/kids5346/pen/LYVmpNq?editors=1010)

## 參考來源

- [Canvas 教學文件](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial)
- [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)
