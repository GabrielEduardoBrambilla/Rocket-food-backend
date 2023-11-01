const sqliteConnection = require('../database/sqlite')
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')

class UsersController {
  async create(request, response) {
    const { is_Adm, name, email, password } = request.body

    const is_Admin = is_Adm === undefined ? 0 : 1

    const database = await sqliteConnection()
    const checkUserExist = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUserExist) {
      throw new AppError('Este email já foi registrado').statusCode(400)
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (is_Admin, name, email, password) VALUES (?,?,?,?)',
      [is_Admin, name, email, hashedPassword]
    )

    return response.status(201).json()
  }

  async delete(request, response) {
    const user_id = request.user.id
    await knex('users').where({ user_id }).delete()

    return response.json()
  }
}

module.exports = UsersController
