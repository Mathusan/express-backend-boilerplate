const express = require('express')

const  router = express.Router()

//import controllers and middle ware


router.route('/order').post(auth,shoppingController.placeOrder)
router.route('/orders').get(auth,shoppingController.getShoppingDetails)
router.route('/cart').get(auth,shoppingController.getShoppingDetails)



module.exports = router