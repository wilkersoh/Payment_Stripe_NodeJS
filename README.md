#### Stripe  - Payment
#### env功能
#### ejs 复习
#### 做个shop的数据data
#### fetch('url', someInit)


#### Stripe  - Payment
<p>quite pick</p>
<p>stripePublicKey从后端利用render</p>
<p>stripePublicKey也在点击Purchase是也被调用，把他写在function里</p>

``` html
<!-- store.ejs, checkout api -->
<script src="https://checkout.stripe.com/checkout.js" defer></script>
```
<p>必须要在ejs里写上这个，下面的才能去打开密齿</p>

``` javascript
  <script>
      var stripePublicKey = '<%= stripePublicKey %>'
  </script>
```

``` javascript
// 输入资料, token是输入的转换取得token
let stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    auto: 'en',
    token: function(token){
        console.log(token)
        let items = [];
        // 买的资料，如哪样东西 多少个
        let cartItemContainer = document.getElementsByClassName('cart-items')[0];
        let cartRows = cartItemContainer.getElementsByClassName('cart-row');
        for( let i = 0; i < cartRows.length; i++){
            let cartRow = cartRows[i];
            // 要多少item个的tag
            let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
            let quantity = quantityElement.value;
            let id = cartRow.dataset.itemId;
            items.push({
                id,
                quantity,
            })
        }
        // send the token to server!! using fetch
        // post to url purchase server
        fetch('/purchase', {
            // send to server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                // 把上面收集到的资料 post去 server
                stripeTokenId: token.id,
                items,
            })
        })
    }
})
```
<p>secketkey 是最后结账的时候去调用他,是server side来做最后处理，就是说他会做结账付款。</p>
<p>在 post /purchase那里</p>

``` javascript
// server side
const stripe = require('stripe')(stripeSecretKey);
```



#### env功能
<p>放一些TOKEN和比较机密的东西</p>

``` javascript
if(process.env.NODE_ENV !== 'production'){
  // 不是production才可以 去读机密dotenv
  require('dotenv').config()
}
```


#### ejs 复习
<p><% 这里的code会先执行才会送去front end %></p>
<p><%= 输出数据到模板，输出后是html标签 %></p>