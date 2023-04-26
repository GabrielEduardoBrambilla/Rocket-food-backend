exports.up = knex =>
  knex.schema.createTable('favorite_list', function (table) {
    table.increments('id').primary()
    table.bigInteger('id_User').unsigned().notNullable()
    table.foreign('id_User').references('id').inTable('users')
    table.bigInteger('id_Dish').unsigned().notNullable()
    table.foreign('id_Dish').references('id').inTable('dishes')
    table.index('id_User')
  })

exports.down = knex => knex.schema.dropTable('favorite_list')
