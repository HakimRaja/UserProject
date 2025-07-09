const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword =async (pass) =>{
    return await bcrypt.hash(pass,10);
};

const comparePassword = async (pass,hashedPass) =>{
    return await bcrypt.compare(pass,hashedPass);
}

const generateToken = (payload) =>{
    return jwt.sign(payload,process.env.JWT_SECRET_KEY , {expiresIn : '3d'});
}

module.exports = {hashPassword , comparePassword , generateToken};