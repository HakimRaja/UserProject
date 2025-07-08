const userRouter = require('express').Router();
const userController = require('../Controllers/userController.js')
userRouter.use((req,res,next)=>{
    if(!req.body || !req.body.username || !req.body.password){
        res.status(400).send({error : 'Please Provide complete information!'})
    }
    next();
})
userRouter.post('/login',userController.logInUser);
userRouter.post('/signup',userController.signUpUser);

module.exports = userRouter;
