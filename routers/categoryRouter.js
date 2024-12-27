const { Router } = require("express");
const categoryCtrl = require('../controllers/categoryController');
const { uploadImage } = require("../middlewares/imageMiddleware");

const categoryRouter = Router();

categoryRouter.get('/add-product-category',categoryCtrl.productCategoryPage)
categoryRouter.get('/view-product-category',categoryCtrl.viewProductCategoryPage)
categoryRouter.post('/add-product-category',uploadImage,categoryCtrl.addProductCategoryPage)
categoryRouter.get('/delete-category/:id',categoryCtrl.productDeleteCategoryPage)

categoryRouter.get('/edit-category/:id',categoryCtrl.updateProductCategoryPage)
categoryRouter.post('/edit-category/:id',uploadImage,categoryCtrl.updatedProductCategoryPage)
module.exports = categoryRouter;