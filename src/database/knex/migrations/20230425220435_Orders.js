exports.up = knex =>
  knex.schema.createTable('orders', function (table) {
    table.increments('id').primary()
    table
      .enu('status', ['received', 'preparing', 'delivering', 'delivered'])
      .notNullable()
      .defaultTo('received')
    table.bigInteger('id_User').unsigned().notNullable()
    table.integer('total_Price').notNullable()
    table.dateTime('created_at').notNullable()
    table.foreign('id_User').references('id').inTable('users')
    table.index('id_User')
  })

exports.down = knex => knex.schema.dropTable('orders')
