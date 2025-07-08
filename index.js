require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const sequelize = require('./config/dbConfig.js');
const userRouter = require('./Routes/userRoutes.js')
const app = express();

app.use(express.json());//middleware that parses the incomming req body into json

app.use('/api/user',userRouter);
app.get('/',(req,res)=>{
    return res.status(200).send(`<h1>Hello World!</h1>`)
})
sequelize.sync({alter:true})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Running! ${PORT}`);
    })
})
.catch((err)=> console.error('Failed to sync DB:', err));