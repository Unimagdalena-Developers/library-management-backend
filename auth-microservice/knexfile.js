require('dotenv').config()

const {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_PORT
} = process.env

module.exports = {
  client: 'pg',
  connection: {
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
    ssl:{
      rejectUnauthorized: false
    }
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}