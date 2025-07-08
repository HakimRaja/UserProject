const userRouter = require('express').Router();
const userController = require('../Controllers/userController.js')
const checkRequestBody = require('../Middlewares/userMiddlewares.js')

userRouter.use();
userRouter.post('/login',userController.logInUser);
userRouter.post('/signup',userController.signUpUser);

module.exports = userRouter;
