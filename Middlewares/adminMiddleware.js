const bodyCheckMiddleware = (req,res,next)=>{
    if(!req.body || !req.body.username){
        return res.status(400).send({message : 'Please enter the username of the user!'});
    }
    next();
}

module.exports = bodyCheckMiddleware;