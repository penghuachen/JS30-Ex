# Type Ahead

## 此題重點

1. 透過 fetch 接取 api 資料
2. 此題正規表達式搭配 match, replace 的使用
3. 透過正規表達式 or `Nubmer.toLocaleString({ useGrouping: true })` 達成千分位顯示。

## 語法使用意義與學習

### fetch 的用途

相較於 `XMLHttpRequest` 而言，`fetch` 能夠用更簡潔的方式**取得非同步資料。**

### 特性

1. fetch 會回傳 `promise` 物件，其中 `resolve`, `reject` 的觸發時機需要注意:
    - `resolve`:  http 狀態碼為 **404**, **500** 時，會將 `reslove` 的值從 `true` 變成 `false`，而不是使用 `reject` 。
    - `reject`: 網路發生錯誤或者中斷網路請求時才會使用
2. 預設不傳送或接收任何 cookies，如果有需求則需要額外設定認證。

### 如何使用

以單純取得資料來說，用法簡單:

```javascript=

// wesbos #6 source link
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

fetch(endpoint)
  .then(response => response.json())
  .then(data => console.log(data))

```

搭配 ES6 的箭頭函式(arrow function)，讓取得非同步資料變的更簡潔。

其中 `response.json()` 可以將接收的結果**轉為 JSON 型別的 promise**

但其實 fetch 還可以設定額外的參數，以上方的範例來說可以改寫如下：

```javascript=
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

fetch(endpoint, {method:'GET'})
  .then(response => response.json())
  .then(data => console.log(data))
```

透過第二個選擇參數的物件，設定使用的方法為 `GET`，取得非同步資料。

除此之外，還提供其他參數可以做設定:

[MDN POST Request](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch) 提供的程式碼：

```javascript=
postData('http://example.com/answer', {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))
  
function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // 輸出成 json
}
```

底下為將用於上傳檔案的 `input` 元素作為要更新非同步資料而發送出去的程式碼:

```javascript=
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
```

### fetch 的 Response 物件

我們在使用 fetch 時，會取得一個 **Response物件**，然後透由這個物件提供的方法來執行後續的處理。 

例如可以透過 `status` 的狀態碼來執行對應的程式流程。

```javascript=
var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

fetch(endpoint, {method:'GET'})
  .then(response => console.log(response))
```
![](https://i.imgur.com/WG48Cb2.png)

## 正規表達式 搭配 match, replace 使用

建立正規表達式的方式有兩種：

1. 透過字面值:如果為固定值，在JS編譯時可以獲得較佳效能。

```javascript=
var re = /ab+c/;
```

2. 透過 RegExp 物件: 適合用於未知匹配模式

```javascript=
var re = new RegExp('ab+c');
```

以此題而言，匹配的值為每次輸入的值，所以使用 RegExp 物件較為適當(程式碼中 searchText 為輸入)。

```javascript=
const regex = new RegExp(searchText, 'gi')
```

而 `gi`，表示是要透過什麼方式進行匹配，其中:

1. `g`: 表示要全域搜尋
2. `i`: 表示搜尋時不區分大小寫。

所以完整的描述上述程式碼的用途: 建立一個 RegExp 物件，搜尋條件為使用 `searchText` 的值匹配全域且不分大小寫的搜尋。

### 正規表達式與 match 搭配

`match` 是 `string.prototype` 的方法。

```javascript=
str.match(regexp)
```

在 `match` 中需要寫入一個 regexp 物件，用來匹配是否有符合的值。

而且 `match` 會於匹配後回傳一個陣列，如同此例子中程式碼 [String.prototype.match()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/match)

```javascript=
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);

// logs [ 'see Chapter 3.4.5.1',
//        'Chapter 3.4.5.1',
//        '.1',
//        index: 22,
//        input: 'For more information, see Chapter 3.4.5.1' ]
```

此外，有幾點需要注意:

1. 如果沒有匹配到符合的結果時，**會回傳 `null`**
2. 如果沒有提供任何的 RegExp 物件的話，則**回傳空陣列**

#### 正規表達式與 replace 搭配

`match` 是 `string.prototype` 的方法。`replace` 是 `string.prototype` 的方法。

```javascript=
str.replace(regexp|substr, newSubstr|function)
```

其中 `regexp|substr` 的部分表示可以透過正規式匹配符合的字串或者透過單純使用字串匹配符合的結果。

但需要注意：

1. **單純使用字串(`substr`)只會替換第一次符合的結果，即使有多個符合的結果**。
2. **透過正規表達式匹配成功的結果都會被替換**

而 `newSubstr|function` 表示要替換成的字串。


## 透過正規表達式 or Nubmer.toLocaleString({ useGrouping: true }) 達成千分位顯示

此題中人口數量的呈現方式如下：

`1,234,567`

依據課程提供的程式碼，使用了此正規表達式達到需求：

```javascript=
population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
```

### 解析正規表達式

**查找規則是每一個字符會依據一整行規則進行匹配。**

1. 首先 `replace(/.../g, ',')`，表示在全域搜尋符合結果，並將其替換成 `,`
2. 每個字母的匹配規則為： 
    1. 當前在進行規則匹配的字母之前要有一個字母。
    2. 符合 (1.) 規則後往後連續匹配三個數字，並透過 `+` 匹配多個符合的結果(連續三個數字)。
    3. (2.)規則匹配後，最後匹配符合非數字的結果
    
    ![](https://i.imgur.com/t4UCMSU.png)
    
#### 規則意義

- `\B`: 匹配字母的文字邊界

```javascript=
// 匹配 java 之前需要有任意字符(字母、數字等)的結果
var regex = /\Bjava/g;
```

- `x(?=y)`: 正向前看斷言，匹配 x 後需要是 y 的值。

```javascript=
// 匹配 java 字串後符合 : 的結果
var regex = /java(?=:)/g;
```

- `x(?!y)`: 負向前看斷言，匹配 x 後不能是 y 的值。

```javascript=
// 匹配 java 字串後不為 : 的結果
var regex = /java(?!:)/g;
```

- `\d{3}`: 匹配連續三個數字的結果

```javascript=
var regex = /\d{3}/g;
```
   
## 參考來源

- [Using Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
- [String.prototype.match()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [String.prototype.replace()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [正規表達式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions)