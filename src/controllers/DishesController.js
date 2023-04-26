const knex = require('../database/knex')

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

  async index(request, response) {
    const { name, ingredients } = request.query

    // const user_id = request.user.id

    let dishes

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map(ingredients => ingredients)

      dishes = await knex('ingredients')
        .select(['id_Dishes', 'ingredients.name'])
        .whereLike('ingredients.name', `%${name}%`)
        .whereIn('ingredients.name', filterIngredients)
        .innerJoin('dishes', 'dishes.id', 'ingredients.id_Dishes')
        .groupBy('ingredients.id')
        .orderBy('ingredients.name')
    } else {
      dishes = await knex('dishes')
        .whereLike('name', `%${name}%`)
        .orderBy('name')
    }
    console.log(dishes)
    return response.json(dishes)

    const allDishes = await knex('dishes')

    const dishesWithIngredients = dishes.map(dishes => {
      const dishesIngredients = allDishes.filter(
        ingredients => ingredients.id_Dishes === dishes.id
      )

      return {
        ...dishes,
        ingredients: dishesIngredients
      }
    })

    return response.json(dishes)
  }
}

module.exports = DishesController
