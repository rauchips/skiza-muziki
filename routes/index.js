const { Router } = require('express');
const express = require('express');
const router = express.Router();
const request = require('postman-request');
// const fetch = require('node-fetch');


/**
 * An endpoint for user to activate premium
 */
router.route('/pay')
  .get((req, res) => {
    res.render('index', { title: 'Subscribe to Premium Content' })
  })
  .post((req, res) => {

const url = 'https://api.flutterwave.com/v3/payments';
const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer FLWSECK_TEST-b39f4a4c9a0fca73eb5733191edd7858-X',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tx_ref: Math.floor(Math.random() * 1000),
    amount:20,
    currency:"USD",
    redirect_url:"http://localhost:3000/users",
    payment_options:"card",
    payment_plan: 16314,
    meta:{
       consumer_id:23,
       consumer_mac:"92a3-912ba-1192a"
    },
    customer:{
      email:req.body.email,
      phone:req.body.phone,
      name:req.body.name
    },
    customizations:{
       title:"SKIZA MUZIKI",
    }
  })
};

request(url, options, (err, response) => {
  if (err) throw err;
  res.send(
    
    JSON.parse(response.body)

  )
})
  })

router.route('/transaction')
  .get((req, res) => {



  })

module.exports = router;
