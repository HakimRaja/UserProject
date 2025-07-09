const { removeFromBlackList, addUserToBlackList } = require('../Controllers/adminController');
const bodyCheckMiddleware = require('../Middlewares/adminMiddleware');

const adminRouter = require('express').Router();
adminRouter.use(bodyCheckMiddleware);
adminRouter.post('/addtoblacklist',addUserToBlackList);
adminRouter.post('/removefromblacklist',removeFromBlackList);


module.exports = adminRouter;