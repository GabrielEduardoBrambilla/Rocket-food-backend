const knex = require('../database/knex')

const createDishWithIngredients = async dish => {
  try {
    const { Ingredients, ...dishData } = dish
    const trxResult = await knex.transaction(async trx => {
      // Insert the dish and get its ID
      const [dishId] = await trx('Dishes').insert(dishData)

      // Insert the ingredients
      const ingredientsData = Ingredients.map(ingredient => {
        return {
          Name: ingredient.Name,
          Id_Dishes: dishId
        }
      })
      await trx('Ingredients').insert(ingredientsData)

      return dishId
    })

    return { dishId: trxResult }
  } catch (error) {
    console.error(error)
    throw new Error('Error creating dish with ingredients')
  }
}

class DishesController {
  // Um controller tem no máximo 5 metodos
  // Index - GET listar varios registros
  // show - GET listar registro especifico
  // create - POST para criar um registro
  // update - PUT para atualizar um registro
  // delete - DELETE para deletar um registro

  async create(request, response) {
    const { price, name, image, category, description, ingredients } =
      request.body

    const checkDishExists = await knex('dishes').where({ name }).first()

    if (checkDishExists) {
      return response
        .status(400)
        .json('Dish with name ' + name + ' already exists')
    }
    const [id_Dishes] = await knex('dishes').insert({
      price,
      name,
      image,
      category,
      description
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        name,
        id_Dishes
      }
    })
    await knex('ingredients').insert(ingredientsInsert)

    return response.json()
  }

  async show(request, response) {
    const { id } = request.body

    const dish = await knex('dishes').where({ id }).first()
    const ingredients = await knex('ingredients')
      .where({ id_Dishes: id })
      .orderBy('name')

    return response.json({
      ...dish,
      ingredients
    })
  }
  async delete(request, response) {
    const { id } = request.body
    await knex('dishes').where({ id }).delete()

    return response.json()
  }
}

module.exports = DishesController
