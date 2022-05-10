const { Model } = require("objection");
const { TableNames } = require("../constants/tablesNames");
const visibilityPlugin = require('objection-visibility').default;

class User extends visibilityPlugin(Model) {
    static get hidden() {
        return ['password'];
    }

    static get tableName() {
        return TableNames.USERS;
    }

}

module.exports = User