const express = require('express');
const server = express();
require('dotenv').config()
const cors = require('cors');
server.use(cors({
    origin:process.env.CORS_ORIGIN_URL
}))
server.listen(process.env.PORT || 8080);