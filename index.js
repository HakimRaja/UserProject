require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const db = require('./Model/modelsConfig.js');
const userRouter = require('./Routes/userRoutes.js')
const app = express();
const verify = require('./Middlewares/authMiddleware.js')

app.use(express.json());//middleware that parses the incomming req body into json

app.use('/api/user',userRouter);
app.get('/',(req,res)=>{
    return res.status(200).send(`<h1>Hello World!</h1>`)
})
app.get('/api/check',verify,(req,res)=>{
    res.send(`Hello ggg, ${req.user.username}!!`);
})

db.sequelize.sync({alter:true})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Running! ${PORT}`);
    })
})
.catch((err)=> console.error('Failed to sync DB:', err));