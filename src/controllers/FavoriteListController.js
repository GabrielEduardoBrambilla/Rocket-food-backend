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
    const { id_User, id_Dish } = request.body

    const checkDishIsFavorite = await knex('favorite_list')
      .select()
      .where({ id_User, id_Dish })
      .first()

    const dishName = await knex('dishes')
      .select('name')
      .where('dishes.id', id_Dish)
      .first()

    if (checkDishIsFavorite) {
      return response
        .status(400)
        .json('Dish ' + dishName.name + ' already in favorites')
    }
    const [id_favorite_list] = await knex('favorite_list').insert({
      id_User,
      id_Dish
    })

    return response.json({
      Message: 'Dish add to favorites',
      Component: id_favorite_list
    })
  }

  async show(request, response) {
    const { id_User, id_Dish } = request.body
    const checkDishIsFavorite = await knex('favorite_list')
      .select()
      .where({ id_User, id_Dish })
      .first()
    if (checkDishIsFavorite) {
      const dish = await knex('dishes').where({ id: id_Dish }).first()
      const ingredients = await knex('ingredients')
        .where({ id_Dishes: id_Dish })
        .orderBy('name')

      return response.json({
        ...dish,
        ingredients
      })
    } else {
      return response.status(400).json('Dish is not favorite')
    }
  }
  async delete(request, response) {
    const { id_User, id_Dish } = request.body

    await knex('favorite_list').where({ id_Dish, id_User }).delete()

    return response.json('removed from favorites')
  }
  // async index(request, response) {
  //   const { id_User } = request.body
  //   const { id_Dish } = await knex('favorite_list')
  //     .where({ id_User: id_User })
  //     .first()
  //   console.log(id_Dish)
  //   const checkUserHaveFavorite = await knex('favorite_list')
  //     .select()
  //     .where({ id_User })
  //     .first()
  //   if (checkUserHaveFavorite) {
  //     const dish = await knex('dishes').select('*').where({ id: id_Dish })
  //     const ingredients = await knex('ingredients')
  //       .where({ id_Dishes: id_Dish })
  //       .orderBy('name')

  //     return response.json({
  //       ...dish,
  //       ingredients
  //     })
  //   } else {
  //     return response.status(400).json('User does not have a favorite list')
  //   }
  // }
  async index(request, response) {
    const { id_User } = request.body

    const favoriteList = await knex('favorite_list')
      .select('id_Dish')
      .where({ id_User })
      .first()

    if (favoriteList) {
      const dishIds = await knex('favorite_list')
        .select('id_Dish')
        .where({ id_User })

      const dishes = await knex('dishes').whereIn(
        'id',
        dishIds.map(dish => dish.id_Dish)
      )

      const ingredients = await knex('ingredients')
        .whereIn(
          'id_Dishes',
          dishIds.map(dish => dish.id_Dish)
        )
        .orderBy(['id_Dishes', 'name'])

      const meals = dishes.map(dish => ({
        ...dish,
        ingredients: ingredients.filter(
          ingredient => ingredient.id_Dishes === dish.id
        )
      }))

      return response.json(meals)
    } else {
      return response.status(400).json('User does not have a favorite list')
    }
  }
}

module.exports = DishesController
