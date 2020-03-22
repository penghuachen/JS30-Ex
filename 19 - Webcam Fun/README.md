# Unreal Webcam Fun #19

## 此題重點

- 取得裝置鏡頭的取用權限。
- 將裝置鏡頭取得的影像透過 HTML5 `<video>` 標籤顯示出來
- 在 HTML `<canvas>` 標籤中即時繪製影像
- 在 canvas 中操控 image data 的 pixel 值。

## 在 HTML 中的基本配置

- video: 用來寫入鏡頭獲得的使用者影像。
- canvas: 用來將使用者影像放入到 canvas 畫布中即時顯示。
- photo: 用來將 canvas 中轉為圖片的影像顯示在此區域。

## 語法使用與學習

### WEB API: Navigator

標示了用戶代理(user agent)的狀態與身份，並允許 script 查詢或註冊，以進行一些事件。

簡單一點來說就是**讓我們可以存取使用者的瀏覽器資訊**

#### 本題用到的部分

##### `navigator.mediaDevices`
```javascript=
var mediaDevices = navigator.mediaDevices;
```

會回傳一個 mediaDevices 物件，**提供用來對於相機、麥克風等媒體輸入設備的訪問，而這也包含螢幕共享。**

這個物件中的方法與事件是另一個 WEB API: [MediaDevices 介面](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)所提供。

### WEB API: MediaDevices

提供了以下的方法與事件：

- 事件:
  - `devicechange`: 當媒體裝置被新增或移除時，會觸發該事件
  ```javascript=
    navigator.mediaDevices.addEventListener('devicechange', function(event) {
      updateDeviceList();
    });
  ```
- 方法:
  1. [enumerateDevices()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices)
  2. [getSupportedConstraints()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getSupportedConstraints)
  3. [getDisplayMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia)
  4. [getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

#### 本題用到的部分


##### `MediaDevices.getUserMedia()`

此方法**會讓瀏覽器提示使用者是否給予使用媒體設備的權限**。

當調用此方法時，**回傳 `promise` 物件，且在 `resolve` 時會回傳一個`MediaStream` 物件，若是使用者拒絕使用權限或媒體不可用，則會透過 `reject` 回傳錯誤訊息。**

需要注意的是，不一定會回傳 `promise` 物件，因為使用者可以不決定是否允許提供權限的使用。

而該 `MediaStream` 物件提供了相關的特性與方法，用來記錄與操作媒體內容

```javascript=
navigator.mediaDevices.getUserMedia(constraints)
  .then(stream =>  {
    /* 使用这个stream stream */
  })
  .catch(err => {
    /* 处理error */
  });
```
其中的 **`constraints` 參數為指定請求的媒體類型是 video 還是 audio，至少指定其一，且必須確定是提供該類型來源，否則就報錯。**


```javascript=
// constraints 要寫入的內容，此為寫入來源必須為 video 類型
{ audio: false, video: true};
```

當然，我們可以要求其他的設定，例如要求 video 的尺寸:

但需要注意的是**可能因為無法滿足或者使用者選擇其他形式覆蓋設定。**


以下為在裝置中可以設定尺寸的部分:

- 基本使用

```javascript=
{ 
  audio: false, 
  video: {
    width: 1280,
    height: 720
  }
};
```

- 設定最大、最小或理想的尺寸

  尺寸取用優先順序為 `ideal`，之後才會以最大、最小範圍內查找。

```javascript=
{ 
  audio: false, 
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 776, ideal: 720, max: 1080 }
  }
};
```

- 在手機裝置設定前置鏡頭、後置鏡頭

```javascript=
// 設定使用前置鏡頭
{ 
  audio: true, 
  video: { facingMode: "user" } 
}

// 設定使用後置鏡頭
{ 
  audio: true, 
  video: { 
    facingMode: { exact: "environment" } 
  } 
}
```

#### 實務運用

透過下面的方式，可以讓瀏覽器上顯示是否取用媒體設備的提示訊息並在允許時透過 `<video>` 顯示，如本題範例程式碼:

```javascript=
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(localMediaStream => {     
  
    // video.src = window.URL.createObjectURL(localMrdiaStream);
    
    video.srcObject = localMediaStream;
    video.play();
  })
  .catch(err => console.log("Something wrong!!", err))
```

這邊需要注意的是影片中提到了使用 `window.URL.createObjectURL(localMrdiaStream)` 方法，這個方法目前支援度很低，只有在 firefox 中支援度較高：

![](https://i.imgur.com/clEaXdd.png)

在 google chrome 瀏覽器則是直接報錯:

![](https://i.imgur.com/kegZ8ij.png)

取而代之的是使用 `video.srcObject = localMediaStream;` 將取得的 `MediaStream` 物件內容寫入 `video` 元素中並播放。


### 將 video 取得的影像寫入 canvas 畫布中

canvas 與鏡頭影像的尺寸需要一致，才不會造成 canvas 取得的影像在顯示時有不符合的情況。

而將取得的影響寫入 canvas 中的步驟有兩個：

1. 取得 `HTMLImageElement` 物件或其他畫布元素的參照(reference)作為來源，透過單純提供URL或圖片位置的方式是行不通的
2. 用 `drawImage()` 方法在畫布上畫影像.

#### 可作為影像來源的資料型態

-  `HTMLImageElement`: 透過 `new Image()` 方式建立或 `img` 元素。
```javascript=
var img = new Image();   // Create new img element
img.src = 'myImage.png'; // Set source path
```

- `HTMLVideoElement`: **抓取影片當前影像畫格作為影像使用。**
```javascript=
function getMyVideo() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
     
    // 回傳 video 影像物件作為 drawImage 的參數 
    return document.getElementById('myvideo');
  }
}
```

- 使用 `data:URL` 嵌入影像

  **透過 `data:URL` 可以直接將影像定義成 Base64 編碼的字串，寫入程式碼中。**
  但其有優缺:
  - 優點： 不用和伺服器再連線，可立即產生影像。
  - 缺點： 不會被快取，編碼後 URL 很長。

```javascript=
var img_src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
```

#### `canvas.toDataURL()`

透過此方法取得 **經由 base64編碼後特定格式的 URL，預設為 PNG，解析度為 96dpi**

```javascript=
canvas.toDataURL(type, encoderOptions);
```

- `type`: 預設為 `image/png`，圖像格式設定
- `encoderOptions`: 圖像品質， 0 ~ 1。

```javascript=
var fullQuality = canvas.toDataURL("image/jpeg", 1.0);
```

##### 實務運用

將 canvas 中的影像透過 `img` 元素呈現

```javascript=
// data 可以直接作為 img 的來源使用
const data = canvas.toDataURL('image/jpeg');
window.innerHTML = `<img src="${ data }" alt="snapshot"/>`;
```

#### `drawImage()`

用於將影像寫入 canvas 中。

```javascript=
drawImage(image, x, y, width, height)
```

- `image`: 需要是**影像物件的類型作為參數。**
- `x,y`: 影像座標位置。
- `width`: 影像呈現時的寬度。
- `height`: 影像呈現時的高度。

### 插入 DOM: `insertBefore()`

將一個節點安插在參考節點之前，作為某個特定父節點之子節點。

```javascript=
var insertedNode = parentNode.insertBefore(newNode, referenceNode);
```

### 操控 canvas 中 image data 的 pixels

#### `CanvasRenderingContext2D.getImageData()` 取得 imageData 物件

要操控 image data 的 pixels ，我們必須先取得 imageData 物件

可以設定要取得的範圍座標起點(sx, sy)，以及大小(sw, sh);

```javascript=
var imageData = ctx.getImageData(sx, sy, sw, sh);
```

imageData 物件中提供了以下特性:

1. `width`
2. `height`
3. `data`: **`Uint8ClampedArray` 代表一維陣列包含RGBA 格式。整數值介於0到255之間(包含255)。**

透過修改 `data` 中的 `Uint8ClampedArray` 中的值，達到改變 canvas 影像的目的。

`Uint8ClampedArray` 可以當作 pixel 的初始資料，且陣列中的值依序為**紅、綠、藍及透明值(alpha)**，執行順序為從左至右，由上至下：

以此題的程式碼為例:

```javascript=
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; 
    pixels.data[i + 1] = pixels.data[i + 1] - 50; 
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; 
  }
  return pixels;
}
```

其中陣列元素以四個為一組，依序為 R、G、B、Ａ，以此類推: 
- data[0]: Red
- data[1]: Green
- data[2]: Blue
- data[3]: Alpha

#### `CanvasRenderingContext2D.putImageData()` 將自訂 pixel 數據寫入 image data 中

透過 `putImageData()` 方法可以把修改過的 pixel data 寫入 image data 中，改寫原本的數據。

```javascript=
ctx.putImageData(myImageData, 0, 0);
```

### 其他

- `canplay` 事件： 當媒體(video, audio)可以播放時，觸發該事件。


### 參考來源

- [Navigator.mediaDevices](https://developer.mozilla.org/zh-TW/docs/Web/API/Navigator/mediaDevices)
- [MediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
- [MediaDevices.getUserMedia（）](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [使用影像](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial/Using_images)
- [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLCanvasElement/toDataURL)
- [HTMLMediaElement: canplay](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/canplay_event)
- [Node.insertBefore()](https://developer.mozilla.org/zh-TW/docs/Web/API/Node/insertBefore)
- [CanvasRenderingContext2D.getImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)
- [Pixel manipulation with canvas](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)