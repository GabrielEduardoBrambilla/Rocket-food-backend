exports.up = knex =>
  knex.schema.createTable('favorite_list', function (table) {
    table.increments('id').primary()
    table.bigInteger('id_user').unsigned().notNullable()
    table.foreign('id_user').references('id').inTable('users')
    table.bigInteger('id_dish').unsigned().notNullable()
    table.foreign('id_dish').references('id').inTable('dishes')
    table.index('id_user')
  })

exports.down = knex => knex.schema.dropTable('favorite_list')
