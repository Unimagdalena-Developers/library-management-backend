const {Router} = require('express');
const AuthController = require('../controllers/AuthController');
const authRouter = Router();

authRouter.post('/login', AuthController.loginUser)
authRouter.post('/register', AuthController.registerUser)
authRouter.post('/verify-token', AuthController.verifyToken)


module.exports = authRouter;