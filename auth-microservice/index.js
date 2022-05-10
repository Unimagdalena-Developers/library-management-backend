require('dotenv').config();
const { Model } = require('objection');
const { knex } = require('./src/database/connection');
const server = require("./src/server")
const {PORT} = process.env

async function startServer() {
    try {
        Model.knex(knex)
        server.listen(PORT, ()=>{
            console.log(`Server listening in http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error(error)
    }

}

startServer()