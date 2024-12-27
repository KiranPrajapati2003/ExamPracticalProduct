const { Router } = require("express");
const productRouter = require('./productRouter')
const userRouter = require('./userRouter');
const categoryRouter = require("./categoryRouter");

const router = Router();

router.use('/',userRouter)
router.use('/product',productRouter)
router.use('/product',categoryRouter)

module.exports = router;