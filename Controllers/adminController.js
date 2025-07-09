
const { sequelize } = require("../Model/modelsConfig");
const blackListedArray = require("../Services/getAllRevoked");



const addUserToBlackList = async(req,res)=>{
    try {
        const {username} =req.body;
    // console.log(username);
    const [user] = await sequelize.query('SELECT * FROM "Users" WHERE username= :username',{
        replacements : {username},
        type : sequelize.QueryTypes.SELECT
    });
    // console.log(user)
    if (!user) {
        return res.status(404).send('Please provide correct username!');
    }
    let arr = await blackListedArray();
    if (arr.includes(username)) {
        return res.status(400).send('username already in list!');
    }
    // here update the DB
    const result = await sequelize.query('UPDATE "Users" SET not_revoked = :notRevoked WHERE username = :username',{
        replacements : {notRevoked : false , username},
        type : sequelize.QueryTypes.UPDATE
    })
    arr.push(username);
    return res.status(200).send({blackListedUsernames : arr});
    } catch (error) {
        return res.status(500).send({error : error.message});
    }
    
}

const removeFromBlackList = async(req,res)=>{
    try {
        const {username} =req.body;
        const [user] = await sequelize.query('SELECT * FROM "Users" WHERE username = :username', {
            replacements : {username},
            type : sequelize.QueryTypes.SELECT
        });
        if (!user) {
            return res.status(404).send('Please provide correct username!');
        }
        
        let arr = await blackListedArray();
        if (!arr.includes(username)) {
            return res.status(400).send('username is not it the black list!');
        }
        //here we have to implement the functionality of update
        const result = await sequelize.query('UPDATE "Users" SET not_revoked = :notRevoked WHERE username = :username',{
            replacements : {notRevoked : true , username},
            type : sequelize.QueryTypes.UPDATE
        })
        arr.splice(arr.indexOf(username),1);
        return res.status(200).send({blackListedArray : arr, message : "success"});
    } catch (error) {
        return res.status(500).send({error : error.message});
    }
}

module.exports = {addUserToBlackList , removeFromBlackList }