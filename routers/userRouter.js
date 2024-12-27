const { Router } = require("express");
const userCtl = require('../controllers/userController');
const userAuth = require("../middlewares/jwtMiddleware");

const userRouter = Router();
userRouter.get('/',userAuth,userCtl.indexPage)

userRouter.get('/signup',userCtl.signupPage)
userRouter.post('/signup',userCtl.signup)
userRouter.get('/login',userCtl.loginPage)
userRouter.post('/login',userCtl.createLoginPage)
userRouter.get('/logout',userCtl.logoutPage)

module.exports = userRouter;