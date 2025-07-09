const sequelize = require('../config/dbConfig.js');
const {DataTypes} = require('sequelize');


const User = sequelize.define('User',{
    user_id : {
        type : DataTypes.UUID,
        unique : true,
        allowNull : false,
        primaryKey : true
    },
    username : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    not_revoked : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    }
},{timestamps : true})

module.exports = User;