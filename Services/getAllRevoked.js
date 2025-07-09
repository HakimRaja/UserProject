const { sequelize } = require("../Model/modelsConfig");

const blackListedArray = async () => {
  try {
    const users = await sequelize.query(
      'SELECT * FROM "Users" WHERE not_revoked = :notRevoked',
      {
        replacements: { notRevoked: false },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return users.map(user => user.username); // returns array of usernames
  } catch (error) {
    console.error("Failed to fetch users:", error.message);
    return []; // return empty list on failure
  }
};

module.exports = blackListedArray;