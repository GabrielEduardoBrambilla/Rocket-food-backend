exports.up = knex =>
  knex.schema.createTable('orders', function (table) {
    table.increments('id').primary()
    table
      .enum('status', ['received', 'preparing', 'delivered'])
      .notNullable()
      .defaultTo('received')
    table.bigInteger('id_user').unsigned().notNullable()
    table.integer('total_price').notNullable()
    table.string('paymentIntent_id')
    table.dateTime('created_at').notNullable()
    table.foreign('id_user').references('id').inTable('users')
    table.index('id_user')
  })

exports.down = knex => knex.schema.dropTable('orders')
