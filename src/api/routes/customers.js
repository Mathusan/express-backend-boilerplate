const express = require('express')
const auth = require('../middlewares/userAuth')
const  router = express.Router()

//import controllers and middle ware
const customerController = require('../controllers/customerController')

router.route('/signup').post(customerController.signUp)
router.route('/login').post(customerController.login)
// router.route('/profile').get(auth,customerController.getProfile)
// router.route('/address').post(auth,customerController.addAddress)
// router.route('/shopping-details').post(auth,customerController.signUp)


module.exports = router