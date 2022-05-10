require('dotenv').config()
const UserRepository = require("../repositories/UserRepository")
const  {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {JWT_SECRET_KEY} = process.env
const AuthController = {}

AuthController.loginUser = async (request, response) => {
    let {
        name,
        lastName,
        email,
        password
    } = request.body
    try {

        const user = await UserRepository.findByEmail(email)
        if(!user) return response.status(StatusCodes.NOT_FOUND).json({
            message:'User not found'
        })
        const isCorrectPassword = await bcrypt.compare(password,user.password)

        if(!isCorrectPassword) return response.status(StatusCodes.BAD_REQUEST).json({
            message: 'Invalid password'
        })
      
        const token = jwt.sign({id:user.id}, JWT_SECRET_KEY)
        return response.status(StatusCodes.CREATED).json({
            user,
            token
        });
    } catch (error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            error:error.message
        })
    }
}

AuthController.registerUser = async (request, response) => {
    let {
        name,
        lastName,
        email,
        password
    } = request.body
    try {
        password = await bcrypt.hash(password,10)

        const user = await UserRepository.create({
            name,
            lastName,
            email,
            password
        })
        const token = jwt.sign({id:user.id}, JWT_SECRET_KEY)
        return response.status(StatusCodes.CREATED).json({
            user,
            token
        });
    } catch (error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            error:error.message
        })
    }
}
AuthController.verifyToken = async (request, response) => {
    const {token} = request.body
    if(!token) return response.status(StatusCodes.BAD_REQUEST).json({
        message:'Token not provided'
    })
    try {
        const {id} = jwt.verify(token, JWT_SECRET_KEY)
        const user = await UserRepository.findById(id)
        if(!user) return response.status(StatusCodes.UNAUTHORIZED).json({
            message:'User not authorized'
        })
        return response.status(StatusCodes.OK).json({
            message:'Authorized user'
        })
    } catch (error) {
        if(error.name === jwt.JsonWebTokenError.name){
            return response.status(StatusCodes.BAD_REQUEST).json({ 
                error: 'Invalid token'
            })
        }
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            error: error.message
        })
    }
}

module.exports = AuthController