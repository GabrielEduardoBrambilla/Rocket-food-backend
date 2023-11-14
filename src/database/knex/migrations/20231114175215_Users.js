exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments('id').primary()
    table.boolean('is_Admin').defaultTo(false)
    table.string('email', 255).notNullable()
    table.string('name', 255).notNullable()
    table.string('password', 255).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}
