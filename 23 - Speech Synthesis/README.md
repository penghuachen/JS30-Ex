# Speech Synthesis # 23

## 本題重點

透過 WEB API 提供的 `window.speechSynthesis()` ，將輸入的文字透過各國的語音呈現。

## 支援度

![](https://i.imgur.com/Ug5pQ1a.png)


## 語法學習與使用

### 特性

#### `SpeechSynthesis.paused()`

用來判斷當前的語音是否處於暫停狀態，如果是就回傳布林值 `true`。

```javascript=
var amIPaused = speechSynthesisInstance.paused;
```

#### `SpeechSynthesis.pending()`

判斷當前的語音是否處於不發話的狀態，如果是就回傳布林值 `true`。

```javascript=
var amIPending = speechSynthesisInstance.pending;
```

#### `SpeechSynthesis.speaking()`

判斷當前的語音是否處於發話的狀態，如果是就回傳 `true`。

需要注意的是如果若發話時被暫停，也一樣會回傳 `true`。

```javascript=
var amISpeaking = speechSynthesisInstance.speaking;
```

### 方法

#### `SpeechSynthesis.cancel()`
 
可以刪除所有的語音。

如果當發話進行中，則會被立即停止。

```javascript=
speechSynthesisInstance.cancel();
```
 
#### `SpeechSynthesis.pause()`

使發話處於暫停的狀態。

```javascript=
speechSynthesisInstance.pause();
```

#### `SpeechSynthesis.resume()`

讓不是處於發話狀態的語音繼續發話。

```javascript=
speechSynthesisInstance.resume();
```

#### `SpeechSynthesis.speak()`

將一個語音的物件傳入，並於解析後依據物件中的 `text` 值，進行發話。

```javascript=
speechSynthesisInstance.speak(utterance);
```

#### `SpeechSynthesis.getVoices()`

取得當前裝置可以使用的所有語音(各國語系)。

```javascript=
var voices = speechSynthesisInstance.getVoices();
```

## 實務運用

```javascript=
var synth = window.speechSynthesis;

var utterance1 = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');
var utterance2 = new SpeechSynthesisUtterance();

// 此種方法也可以，重點在於讓 text  特性取得要轉成語音的文字
utterance2.text = 'We should say another sentence too, just to be on the safe side.';

synth.speak(utterance1);
synth.speak(utterance2);
```

## 參考來源

- [SpeechSynthesis.paused](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/paused)
- [SpeechSynthesis.pending](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pending)
- [SpeechSynthesis.cancel()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel)
- [SpeechSynthesis.pause()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause)
- [SpeechSynthesis.resume()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/resume)
- [SpeechSynthesis.speak()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak)
- [SpeechSynthesis.getVoices()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)
