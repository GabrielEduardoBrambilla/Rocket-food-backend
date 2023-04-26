exports.up = knex =>
  knex.schema.createTable('Favorite_list', function (table) {
    table.increments('id').primary()
    table.bigInteger('Id_User').unsigned().notNullable()
    table.foreign('Id_User').references('id').inTable('Users')
    table.bigInteger('Id_Dish').unsigned().notNullable()
    table.foreign('Id_Dish').references('id').inTable('Dishes')
    table.index('Id_User')
  })

exports.down = knex => knex.schema.dropTable('Favorite_list')
