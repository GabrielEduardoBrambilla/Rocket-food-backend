exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          is_Admin: 1,
          email: 'admin@gmail.com',
          name: 'admin',
          password:
            '$2a$08$fwL9Zb9vSksie.j0Ara4mOWYDLi4WH.sq6s.GgxRdawh6K4TG0Pd.'
        },
        {
          is_Admin: 0,
          email: 'user@gmail.com',
          name: 'user',
          password:
            '$2a$08$wCOikiQ9GQtSWPwey8byQ.zrBrLSA76Fc2JET8ncRomCYMC5f8htm'
        }
      ])
    })
}
