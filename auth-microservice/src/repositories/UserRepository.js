const User = require("../models/User")
const UserRepository = {}

UserRepository.create = (userData) => {
    return User.query().insertAndFetch(userData)
}

UserRepository.findByEmail = (email) => {
    return User.query().where({email}).first()
}
UserRepository.findById = (id) => {
    return User.query().findById(id)
}
module.exports = UserRepository