#  JavaScript Drum Kit 

## 自己的寫法

### 此題重點

1. 透過 keyboard 事件將 dom 新增一個 `playing` 的 class name。
2. 透過 `audio.play()`, `audio.currentTime` 執行 `<audio>` 並控制播放時間

### 改寫此題

透過資料驅動的概念改寫此題。

### 實作方式

#### 實作思維圖像化

核心部分：

![](https://i.imgur.com/PGBEsaz.gif)


#### 資料結構訂定

定義一組資料結構為:

```javascript=
const obj = {
  letter,
  isPlaying: false,
  musicalInstrument: matchObj[letter],
  keyCode() {
    return this.letter.charCodeAt();
  },
}
```

**透過更改物件中 `isPlaying` 的狀態並重新渲染畫面。**