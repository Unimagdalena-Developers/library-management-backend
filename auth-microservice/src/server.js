require('dotenv').config()
const express = require('express');
const server = express();
const cors = require('cors');
const indexRouter = require('./routes/indexRouter');
const {CORS_ORIGIN_URL} = process.env

server.use(cors({
    origin:CORS_ORIGIN_URL
})); 
server.use(express.json())
server.use('/auth', indexRouter)

server.get('/',(request, response)=> {
    return response.status(200).json({
        message:'Auth Microservice Working',

    })
})

module.exports = server;