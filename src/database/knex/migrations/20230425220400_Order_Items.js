exports.up = knex =>
  knex.schema.createTable('order_items', function (table) {
    table.increments('id').primary()
    table.bigInteger('id_Dish').unsigned().notNullable()
    table.bigInteger('id_Order').unsigned().notNullable()
    table.bigInteger('quantity').notNullable()
    table.bigInteger('item_Price_at_time').notNullable()
    table.foreign('id_Dish').references('id').inTable('Dishes')
    table.foreign('id_Order').references('id').inTable('Orders')
    table.index('id_Dish')
    table.index('id_Order')
  })

exports.down = knex => knex.schema.dropTable('order_Items')
