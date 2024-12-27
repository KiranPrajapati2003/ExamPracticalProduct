const { Router } = require("express");
const productCtrl = require('../controllers/productController');
const { uploadImage } = require("../middlewares/imageMiddleware");


const productRouter = Router();
productRouter.get('/addProduct',productCtrl.productPage)
productRouter.post('/addProduct',uploadImage,productCtrl.addProductPage)

productRouter.get('/viewProduct',productCtrl.viewProductPage)
productRouter.get('/delete/:id',productCtrl.deleteProductPage)

productRouter.get('/edit/:id',productCtrl.editProductPage)
productRouter.post('/edit/:id',uploadImage,productCtrl.editProduct)
module.exports = productRouter;  