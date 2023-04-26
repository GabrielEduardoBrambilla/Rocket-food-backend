exports.up = knex =>
  knex.schema.createTable('Orders', function (table) {
    table.increments('id').primary()
    table
      .enu('Status', ['received', 'preparing', 'delivering', 'delivered'])
      .notNullable()
      .defaultTo('received')
    table.bigInteger('Id_User').unsigned().notNullable()
    table.integer('Total_Price').notNullable()
    table.dateTime('Created_at').notNullable()
    table.foreign('Id_User').references('id').inTable('Users')
    table.index('Id_User')
  })

exports.down = knex => knex.schema.dropTable('Orders')
