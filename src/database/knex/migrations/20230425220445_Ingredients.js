exports.up = knex =>
  knex.schema.createTable('Ingredients', function (table) {
    table.increments('id').primary()
    table.string('Name', 255).notNullable()
    table.bigInteger('Id_Dishes').unsigned().notNullable()
    table.foreign('Id_Dishes').references('id').inTable('Dishes')
    table.index('Name')
  })

exports.down = knex => knex.schema.dropTable('Ingredients')
