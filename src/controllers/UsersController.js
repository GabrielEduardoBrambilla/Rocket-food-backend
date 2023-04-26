const sqliteConnection = require('../database/sqlite')
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')

class UsersController {
  // Um controller tem no máximo 5 metodos
  // Index - GET listar varios registros
  // show - GET listar registro especifico
  // create - POST para criar um registro
  // update - PUT para atualizar um registro
  // delete - DELETE para deletar um registro

  async create(request, response) {
    const { Is_Admin, email, password } = request.body

    const database = await sqliteConnection()
    const checkUserExist = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUserExist) {
      throw new AppError('Este email já foi registrado').statusCode(500)
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (is_Admin, email, password) VALUES (?,?,?)',
      [Is_Admin, email, hashedPassword]
    )

    return response.status(201).json()
  }

  async delete(request, response) {
    const { id } = request.body
    await knex('users').where({ id }).delete()

    return response.json()
  }
}

module.exports = UsersController
