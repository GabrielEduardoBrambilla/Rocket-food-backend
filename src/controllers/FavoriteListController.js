const knex = require('../database/knex')

class DishesController {
  async create(request, response) {
    const { id_dish } = request.body
    const id_user = request.user.id

    const checkDishIsFavorite = await knex('favorite_list')
      .select()
      .where({ id_user, id_dish })
      .first()

    const dishName = await knex('dishes')
      .select('name')
      .where('dishes.id', id_dish)
      .first()

    if (checkDishIsFavorite) {
      return response
        .status(400)
        .json('Dish ' + dishName.name + ' already in favorites')
    }
    const [id_favorite_list] = await knex('favorite_list').insert({
      id_user,
      id_dish
    })

    return response.json({
      Message: 'Dish add to favorites',
      Component: id_favorite_list
    })
  }
  async show(request, response) {
    const { id_dish } = request.query
    const id_user = request.user.id

    const checkDishIsFavorite = await knex('favorite_list')
      .select()
      .where({ id_user: id_user, id_dish: id_dish })
      .first()

    if (checkDishIsFavorite) {
      return response.json({
        Message: 'Dish is favorite',
        favorite: true
      })
    } else {
      return response.json('Dish is not favorite')
    }
  }
  async delete(request, response) {
    const { id_dish } = request.body
    const id_user = request.user.id

    await knex('favorite_list').where({ id_dish, id_user }).delete()

    return response.json('removed from favorites')
  }
  async index(request, response) {
    const id_user = request.user.id

    const favoriteList = await knex('favorite_list')
      .select('id_dish')
      .where({ id_user })
      .first()

    if (favoriteList) {
      const dishIds = await knex('favorite_list')
        .select('id_dish')
        .where({ id_user })

      const dishes = await knex('dishes').whereIn(
        'id',
        dishIds.map(dish => dish.id_dish)
      )

      const ingredients = await knex('ingredients')
        .whereIn(
          'id_dishes',
          dishIds.map(dish => dish.id_dish)
        )
        .orderBy(['id_dishes', 'name'])

      const meals = dishes.map(dish => ({
        ...dish,
        ingredients: ingredients.filter(
          ingredient => ingredient.id_dishes === dish.id
        )
      }))

      return response.json(meals)
    } else {
      return response.status(400).json('User does not have a favorite list')
    }
  }
}

module.exports = DishesController
