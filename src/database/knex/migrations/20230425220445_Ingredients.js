exports.up = knex =>
  knex.schema.createTable('ingredients', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.bigInteger('id_Dishes').unsigned().notNullable()
    table.foreign('id_Dishes').references('id').inTable('dishes')
    table.index('name')
  })

exports.down = knex => knex.schema.dropTable('ingredients')
