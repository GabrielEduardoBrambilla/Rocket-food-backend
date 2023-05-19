exports.up = knex =>
  knex.schema.createTable('order_items', function (table) {
    table.increments('id').primary()
    table.bigInteger('id_dish').unsigned().notNullable()
    table.bigInteger('id_order').unsigned().notNullable()
    table.bigInteger('quantity').notNullable()
    table.bigInteger('item_price_at_time').notNullable()
    table.foreign('id_dish').references('id').inTable('Dishes')
    table.foreign('id_order').references('id').inTable('Orders')
    table.index('id_dish')
    table.index('id_order')
  })

exports.down = knex => knex.schema.dropTable('order_items')
