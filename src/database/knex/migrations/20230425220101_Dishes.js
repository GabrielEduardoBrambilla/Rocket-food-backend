exports.up = function (knex) {
  return knex.schema.createTable('dishes', function (table) {
    table.increments('id').primary()
    table.integer('price').notNullable()
    table.string('name', 255).notNullable()
    table.string('image', 255).notNullable()
    table.enum('category', ['Meal', 'Dessert', 'Beverage']).notNullable()
    table.string('description', 255).notNullable()
  })
}
exports.down = knex => knex.schema.dropTable('dishes')
