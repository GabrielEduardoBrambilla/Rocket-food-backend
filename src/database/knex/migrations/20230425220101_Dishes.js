exports.up = knex =>
  knex.schema.createTable('Dishes', table => {
    table.increments('id').primary()
    table.integer('Price').notNullable()
    table.string('Name', 255).notNullable()
    table.string('Image', 255).notNullable()
    table.enum('Category', ['refeição', 'sobremesa', 'bebida']).notNullable()
    table.string('Description', 255).notNullable()
    table.integer('id_Ingredients').unsigned().notNullable()
    table
      .foreign('id_Ingredients')
      .references('id')
      .inTable('Ingredients')
      .onDelete('CASCADE')
  })

exports.down = knex => knex.schema.dropTable('Dishes')
