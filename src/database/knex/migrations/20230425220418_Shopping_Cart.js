exports.up = knex =>
  knex.schema.createTable('shopping_cart', function (table) {
    table.increments('id').primary()
    table.bigInteger('id_User').unsigned().notNullable()
    table.bigInteger('id_Dish').unsigned().notNullable()
    table.integer('quantity').notNullable()
    table.foreign('id_user').references('id').inTable('users')
    table.foreign('id_dish').references('id').inTable('dishes')
    table.index('id_user')
    table.index('id_dish')
  })

exports.down = knex => knex.schema.dropTable('shopping_Cart')
