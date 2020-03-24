# Geolocation based Speedometer and Compass 

## 此題重點

透過 `navigator.geolocation` Web API 取得使用者的地理位置(座標位置)。

## 語法使用與學習

### Geolocation 介面

此介面定義了讓網頁**可以取得裝置位置**並將資訊以物件的方式回傳。

然後 `navigator` 實作 `navigator.geolocation` 介面。

這代表我們要透過 `navigator` 中的方法來取得裝置的位置。

### 方法

- `Geolocation.getCurrentPosition()`
- `Geolocation.watchPosition()`
- `Geolocation.clearWatch()`

#### `Geolocation.getCurrentPosition()`

可以用來取得**一次裝置的當前位置。**

```javascript=
navigator.geolocation.getCurrentPosition(success[, error[, options]])
```

```javascript=
navigator.geolocation.getCurrentPosition(success => {
  // dosomething...
}, err => {
  // do something when error happen.
}
```

#### `Geolocation.watchPosition()`

用來**不斷取得**裝置的當前位置。

用法大致與 `Geolocation.getCurrentPosition()` 相同。 

但需要注意的是多了一個 `id` 編號，可以搭配 `Geolocation.clearWatch(id)` 用來停止繼續更新使用者當前位置。

```javascript=
id = navigator.geolocation.watchPosition(success[, error[, options]])
```

#### `Geolocation.clearWatch()`

```javascript=
Geolocation.clearWatch(id)
```