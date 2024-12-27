const category = require("../models/categorySchema")
const fs = require('fs')

module.exports.productCategoryPage = (req, res) => {
    return res.render('./pages/add-product-category')
}

module.exports.viewProductCategoryPage = async (req, res) => {
    try {
        let categorys = await category.find({})
        return res.render('./pages/view-product-category', { categorys })
    } catch (error) {
        console.log(error);
        return res.render('./pages/add-product-category')
    }
}

module.exports.addProductCategoryPage = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path
        }
        await category.create(req.body)
        return res.redirect('/product/view-product-category')
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer') || '/')
    }
}

module.exports.productDeleteCategoryPage = async (req, res) => {
    try {
        let { id } = req.params
        let categorys = await category.findByIdAndDelete(id)
        fs.unlinkSync(categorys.image)
        return res.redirect('/product/view-product-category')
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer') || '/')
    }
}

module.exports.updateProductCategoryPage = async (req, res) => {
    try {
        let { id } = req.params;
        let updateCategory = await category.findById(id)
        console.log(updateCategory);

        return res.render('./pages/edit-product-category', { updateCategory })
    } catch (error) {
        console.log(error);
        return res.render('./pages/view-product-category')
    }
}

module.exports.updatedProductCategoryPage = async (req, res) => {
    try {
        let { id } = req.params;
        if (req.file) {
            req.body.image = req.file.path
            fs.unlinkSync(req.body.oldImage)
        } else {
            req.body.image = req.body.oldImage;
        }
        await category.findByIdAndUpdate(id,req.body)
        return res.redirect('/product/view-product-category')
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer') || '/')
    }
}