const { StateTypes } = require("../src/constants/stateTypes");
const { TableNames } = require("../src/constants/tablesNames");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable(TableNames.USERS, (table) => {
        table.increments('id').unsigned()
        table.string('name',60).notNullable()
        table.string('lastName',60).notNullable()
        table.string('email',60).notNullable()
        table.string('password',60).notNullable()
        table.enu('state', StateTypes).defaultTo('ACTIVE')
        table.timestamp('createdAt').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(TableNames.USERS)
};
