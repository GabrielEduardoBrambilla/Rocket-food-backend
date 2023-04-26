exports.up = knex =>
  knex.schema.createTable('Order_Items', function (table) {
    table.increments('id').primary()
    table.bigInteger('Id_Dish').unsigned().notNullable()
    table.bigInteger('Id_Order').unsigned().notNullable()
    table.bigInteger('Quantity').notNullable()
    table.bigInteger('Item_Price_at_time').notNullable()
    table.foreign('Id_Dish').references('id').inTable('Dishes')
    table.foreign('Id_Order').references('id').inTable('Orders')
    table.index('Id_Dish')
    table.index('Id_Order')
  })

exports.down = knex => knex.schema.dropTable('Order_Items')
