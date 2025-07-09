const checkRequestBody = (req,res,next)=>{
    if(!req.body || !req.body.username || !req.body.password){
        return res.status(400).send({error : 'Please Provide complete information!'})
    }
    next();
}

module.exports = checkRequestBody;