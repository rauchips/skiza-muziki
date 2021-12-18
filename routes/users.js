const express = require('express');
const router = express.Router();
const request = require('postman-request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const tx_ref = JSON.parse(req.query.tx_ref)
  const url = `https://api.flutterwave.com/v3/transactions?tx_ref=${tx_ref}`;
  const options = {
    url: url,
    method: 'GET',
    json: true,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer FLWSECK_TEST-b39f4a4c9a0fca73eb5733191edd7858-X',
      'Content-Type': 'application/json'
    }
  };
  
  request(options, (err, response) => {
    if (err) throw err;
    
    res.render('plan', {
      title: 'Subscribe to Premium Content',
      transactionId: tx_ref,
      status: response.body.data[0].status,
      paymentType: response.body.data[0].payment_type,
      amount_settled: response.body.data[0].amount_settled,
      email: response.body.data[0].customer.email,
      name: response.body.data[0].customer.name,
    
    })

})

});

module.exports = router;
