class UsersController {
  // Um controller tem no máximo 5 metodos
  // Index - GET listar varios registros
  // show - GET listar registro especifico
  // create - POST para criar um registro
  // update - PUT para atualizar um registro
  // delete - DELETE para deletar um registro

  create(request, response) {
    const { name, email, password } = request.body

    response.json({ name })
  }
}

module.exports = UsersController
