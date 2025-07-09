const sequelize = require('../config/dbConfig.js');
const {hashPassword,comparePassword,generateToken} = require('../Services/userAuthServices.js')
const {v4 : uuidv4} = require('uuid')

const signUpUser = async(req,res)=>{
try {
    const {username,password} = req.body;
    const [existingUser] = await sequelize.query('SELECT * FROM "Users" WHERE username = :username',{
        replacements :{username},
        type : sequelize.QueryTypes.SELECT
    });
    // console.log(existingUser.user_id);
    if (existingUser) {
        return res.status(400).send({message : 'username already exists'})
    }
    if(password.length < 8){
        return res.status(400).send({message :'Please set up a strong password.'})
    }
    const hashedPass = await hashPassword(password);
    const userId = uuidv4();
    const [newUser] = await sequelize.query('INSERT INTO "Users"(user_id,username,password,"createdAt","updatedAt") VALUES(:user_id,:username, :password, NOW(), NOW()) RETURNING user_id',{
        replacements : {user_id:userId,username , password : hashedPass},
        type : sequelize.QueryTypes.INSERT
    });//returns [rows , metadata]
    return res.status(201).send({message : `user Created with user_id : ${newUser[0].user_id}`})
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

const logInUser = async(req,res) =>{
try {
    const {username,password} = req.body;
    const [user] = await sequelize.query('SELECT * FROM "Users" WHERE username = :username',{
        replacements : {username},
        type : sequelize.QueryTypes.SELECT
    });
    if(!user){
        return res.status(401).send({message : 'Invalid Username'})
    };
    const isMatch =await comparePassword(password,user.password);
    if(!isMatch){
        return res.status(401).send({message : 'Invalid Password'})
    }
    const token = generateToken({user_id : user.user_id , username : user.username})
    res.status(202).json(token);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

module.exports = {logInUser , signUpUser};