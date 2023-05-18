exports.up = function (knex) {
  return knex.schema.createTable('dishes', function (table) {
    table.increments('id').primary()
    table.integer('price').notNullable()
    table.string('name', 255).notNullable()
    table.string('image', 255).notNullable()
    table.enum('category', ['meal', 'dessert', 'beverage']).notNullable()
    table.string('description', 255).notNullable()
    table.integer('id_Ingredients').unsigned().notNullable()
    table
      .foreign('id_Ingredients')
      .references('id')
      .inTable('ingredients')
      .onDelete('CASCADE')
  })
}
exports.down = knex => knex.schema.dropTable('dishes')
