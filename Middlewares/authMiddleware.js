const jwt = require('jsonwebtoken');

const verify = (req,res,next) =>{
    const authHeader  = req.headers.authorization;
    // console.log(authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).send({message : 'token missing or malformed'}); // unauthorized
    }
    const token = authHeader.split(" ")[1]
    // console.log(token);
    // console.log(process.env.JWT_SECRET_KEY);
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data;
        next();
    } catch (error) {
        return res.status(403).send({message : 'Invalid or expired token'});
    }
}

module.exports = verify;