
# Custom HTML 5 video player

## 本題重點

透過 JS 操作 HTML 5 的 `<video>` 標籤以及其提供的特性與方法

## 思維重點

1. 點擊進度條調整時間時，需要透過**當前播放器的寬度與當前點擊的位置換算成百分比後，取得當前對應的影片秒數。**
  2. 透過 `timeupdate` 事件取得當前影片秒數，並換算為百分比，更新進度條的 `flex-basis` 值。

## 語法使用與學習

### 支援度

![](https://i.imgur.com/Hd7B8No.png)

### `<video>` 基本使用

在 HTML 中設定 `<video>` 標籤，在現代的瀏覽器中，透過以下設定就可以使用。

```htmlmixed=
<video class="player__video viewer" src="example.mp4"></video>
```

但如果瀏覽器並不支持 `<video>` 標籤的話，則需要額外處理:

瀏覽器會自動尋找可支援的第一個來源。

```htmlmixed=
<!-- MDN example -->
<video controls>
  <source src="myVideo.mp4" type="video/mp4">
  <source src="myVideo.webm" type="video/webm">
  <p>Your browser doesn't support HTML5 video. Here is
     a <a href="myVideo.mp4">link to the video</a> instead.</p>
</video>
```

#### 注意事項

1. 如果需要 `<video>` 原生影片控制面板，則==需要提供 `controls` 屬性。==
2. 如果需要影片有自動播放的功能，則==需要設定 `autoplay` 屬性。==

#### 客製化影片控制面板

如果不使用原生提供的控制面板時，可以透過 [HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) 中所提供的特性與方法來客製化控制面板。

以下列舉本次使用到的特性與方法。

#### 方法

##### `play()`

用於播放影片

```javascript=
const video = document.querySelector('.video');
video.play();
```

##### `pause()`

用於暫停影片

```javascript=
const video = document.querySelector('.video');
video.pause();
```

##### `timeupdate()`

==當 `currentTime` 更新時會觸發此事件==


```javascript=
const video = document.querySelector('.video');
video.addEventListener('timeupdate', e => {
  console.log(video.currentTime);
})
```

#### 特性

##### `currentTime`

取得影片當前播放時間

```javascript=
const video = document.querySelector('.video');
video.currentTime = 5;
```

##### `duration`

以秒為單位，代表的是影片的總長度。

```javascript=
const video = document.querySelector('.video');
console.log(video.duration);
```

##### `volume`

控制影片的音量，預設值為 1.0。

其中音量的控制設定如下:

|數值|音量|
|-|-|
|1.0|highest volume (100%. This is default)|
|0.5|half volume (50%)|
|0.0|silent (same as mute)|


```javascript=
const video = document.querySelector('.video');
video.volume = 5;
```

##### `playbackRate`

控制影片的播放速率，預設值為 1.0。

其中速率的控制設定如下:

|數值|速率|
|-|-|
|1.0|normal speed|
|0.5|half speed (slower)|
|2.0|double speed (faster)|
|-1.0|backwards, normal speed|
|-0.5|backwards, half speed|


```javascript=
const video = document.querySelector('.video');
video.playbackRate = 1;
```

### `offsetWidth`, `offsetWidth`

1. Read-only
2. 包含的範圍為包含元素的:
    - ==邊框(border)==
    - ==水平線上的內邊距(padding)==
    - ==豎直方向滾動條(scrollbar)（如果存在的話）==
    - ==CSS設置的寬度(width)的值。==
4. 各瀏覽器的 `offsetWidth` 可能有所不同
5. 會四捨五入為一個整數，如果需要有小數值，則需要使用 `element.getBoundingClientRect()`。

![](https://i.imgur.com/ocvaNGg.png)

### `clientX`, `offsetX`, `pageX`, `screenX` 比較

首先先看看各自的定義，如下：

#### `clientX`, `clientY`

1. Read-only
2. 提供的==座標範圍為 viewport 範圍內的座標==(不包含滾動軸)。


#### `offsetX`, `offsetY`

滑鼠==點擊位置與觸發該事件元素==之間的 X 或 Y 的偏移量。

##### 支援度

![](https://i.imgur.com/po2IOK0.png)

#### `pageX`, `pageY`

1. 座標範圍為==整個文檔(包含滾動軸可以滾到的範圍)==
2. Read-only，座標以 px 為單位。

#### `screenX`, `screenY`

座標範圍為整個裝置的尺寸大小。

[Demo](https://codepen.io/kids5346/pen/poJVXXL)


## 參考來源

- [video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)
- [HTMLElement.offsetWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth)
- [MouseEvent.offsetX](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/offsetX)
- [MouseEvent.clientX](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/clientX)
- [MouseEvent.pageX](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageX)
- [MouseEvent.screenX](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/screenX)