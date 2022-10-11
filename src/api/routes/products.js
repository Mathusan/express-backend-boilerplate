const express = require('express')

const  router = express.Router()

//import controllers and middle ware

router.route('/').get(productController.getProducts)
router.route('/create').post(prodcuctController.createProduct   )
router.route('/category/:type').get(productController.getProductsByCategory)
router.route('/:id').get(productController.getProductDescription)
router.route('/ids').post(productController.getSelectedProducts)
router.route('/cart').put(auth,productController.addCart)
router.route('/cart/:id').delete(auth,productController.deleteItem)

module.exports = router

