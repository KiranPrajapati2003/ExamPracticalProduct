const category = require("../models/categorySchema")
const product = require("../models/productSchema")

const fs = require('fs')
module.exports.productPage = async(req, res) => {
        let categorys = await category.find({})
        return res.render('./pages/addProduct',{categorys})
    
}

module.exports.addProductPage = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
        await product.create(req.body)
        return res.redirect('/product/viewProduct')
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer') || '/')
    }
}

module.exports.viewProductPage = async (req, res) => {
    try {
        let products = await product.find({}).populate('categoryId')
        console.log(products);
        return res.render('./pages/viewProduct', { products })
    } catch (error) {
        console.log(error);
        return res.render('./pages/viewProduct')
    }
}

module.exports.deleteProductPage = async (req, res) => {
    try {
        let { id } = req.params;
        let products = await product.findByIdAndDelete(id)
        fs.unlinkSync(products.image)
        return res.redirect('/product/viewProduct')
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer') || '/')
    }
}

module.exports.editProductPage = async (req, res) => {
    try {
        let { id } = req.params;
        let products = await product.findById(id)
        return res.render('./pages/editProduct', { products })
    } catch (error) {
        console.log(error);
        return res.render('./pages/viewProduct')
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        let { id } = req.params;

        if (req.file) {
            req.body.image = req.file.path
            fs.unlinkSync(req.body.oldImage)
        } else {
            req.body.image = req.body.oldImage;
        }

        await product.findByIdAndUpdate(id, req.body)
        return res.redirect('/product/viewProduct')
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer') || '/')
    }
}