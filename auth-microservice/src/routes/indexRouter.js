const {Router} = require('express');
const authRouter = require('./authRouter');
const indexRouter = Router();

indexRouter.use(authRouter)

module.exports = indexRouter;