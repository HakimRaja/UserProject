const sequelize = require('../config/dbConfig.js');
const User = require('./usersModel.js');

const db = {
    sequelize,
    User
};

module.exports = db;