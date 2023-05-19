exports.up = knex =>
  knex.schema.createTable('ingredients', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.bigInteger('id_dishes').unsigned().notNullable()
    table
      .foreign('id_dishes')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')
    table.index('name')
  })

exports.down = knex => knex.schema.dropTable('ingredients')
