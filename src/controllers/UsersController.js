const sqliteConnection = require('../database/sqlite')
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')

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
      throw new AppError('Este email já foi registrado')
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (Is_Admin, email, password) VALUES (?,?,?)',
      [Is_Admin, email, hashedPassword]
    )

    return response.status(201).json()
  }
}

module.exports = UsersController
