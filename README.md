#### Stripe  - Payment
#### env功能
#### ejs 复习

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