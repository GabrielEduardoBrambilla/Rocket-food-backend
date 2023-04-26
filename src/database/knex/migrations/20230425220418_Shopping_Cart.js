exports.up = knex =>
  knex.schema.createTable('Shopping_Cart', function (table) {
    table.increments('id').primary()
    table.bigInteger('Id_User').unsigned().notNullable()
    table.bigInteger('Id_Dish').unsigned().notNullable()
    table.integer('Quantity').notNullable()
    table.foreign('Id_User').references('id').inTable('Users')
    table.foreign('Id_Dish').references('id').inTable('Dishes')
    table.index('Id_User')
    table.index('Id_Dish')
  })

exports.down = knex => knex.schema.dropTable('Shopping_Cart')
