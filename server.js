if(process.env.NODE_ENV !== 'production'){
  // 不是production才可以 去读机密dotenv
  require('dotenv').config()
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express');
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);
const app = express();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static('public'));

app.get('/store', (req, res) => {
  fs.readFile('items.json', (error, data) => {
      if(error){
          res.status(500).end();
      } else {
          res.render('store', {
              stripePublicKey: stripePublicKey,
              items: JSON.parse(data)
          });
      }
  })
})

app.post('/purchase', (req, res) => {
  fs.readFile('items.json', (error, data) => {
      if(error){
        res.status(500).end();
      } else {
        // item.json
        const itemsJson = JSON.parse(data); 
        const itemsArray = itemsJson.music.concat(itemsJson.merch)
        let total = 0;
        // body.items 是 store哪里 fetch转来的资料
        req.body.items.forEach((item) => {
          const itemJson = itemsArray.find(i => {
            // find 是 return 目标 而不是 boonlean
            return i.id == item.id;
          })
          total = total + itemJson.price * item.quantity
        })

        stripe.charges.create({
          amount: total,
          source: req.body.stripeTokenId,
          currency: 'usd'
        }).then(function(){
          console.log('ChargeSucceessful')
          res.json({ message: 'Successfully purchage items' })
        }).catch(function(){
          console.log('Charge failed')
          res.status(500).end();
        })
      }
  })
})


app.listen(process.env.PORT || 3000, console.log('watching'));