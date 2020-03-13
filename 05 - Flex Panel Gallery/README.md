# Flex Panel Gallery

## 此題重點

- `transitionend` 事件的使用注意

## transitionend 事件

會於 css transition 結束後觸發，但在以下情況時，並不會觸發該事件:

1. 在完成 css transition 前被移除 transition
2. 在完成 css transition 前被設定 `display: none`
3. 觸發 `transitioncancel` 事件時

## 本題需要注意的事情

1. 透過點擊時新增 class 至 dom 上遇到因為觸發該 `transitionend` 事件的 css 剛好為兩個(`font-size`, `flex`)，導致新增 `open-active` 時因為觸發兩次 `transitionend` 事件，而在新增 `open-active` 後就被移除。
2. 基於各家瀏覽器對於觸發 `transitionend` 事件時的 `propertyName` 的名稱不一定都相同，所以只要有包含 `flex` 字串即可執行後續的程式流程。


## 參考來源

- [MDN transitionend](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend)