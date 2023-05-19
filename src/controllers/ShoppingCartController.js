const knex = require('../database/knex')

class Shopping_cartController {
  async create(request, response) {
    const { id_user, id_dish, quantity } = request.body

    const checkDishExists = await knex('shopping_cart')
      .select('id')
      .where({ id_user, id_dish })
      .first()

    if (checkDishExists) {
      const itemCart = await knex('shopping_cart')
        .select()
        .where({ id_user, id_dish })
        .first()
      await knex('shopping_cart')
        .update({ quantity: quantity })
        .where({ id: itemCart.id })
      const updatedItemCart = await knex('shopping_cart')
        .select()
        .where({ id: itemCart.id })
        .first()
      return response.json({
        Message: `Dish quantity updated to cart | Quant= ${updatedItemCart.quantity}`
      })
    }

    const [id_shopping_cart] = await knex('shopping_cart').insert({
      id_user,
      id_dish,
      quantity
    })

    return response.json({
      Message: `Dish add to cart | Quant2= ${quantity}`,
      Component: id_shopping_cart
    })
  }
  async index(request, response) {
    const { id_user } = request.body

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
  async show(request, response) {
    const { id_user, id_dish } = request.body
    const checkDishIsFavorite = await knex('favorite_list')
      .select()
      .where({ id_user, id_dish })
      .first()
    if (checkDishIsFavorite) {
      const dish = await knex('dishes').where({ id: id_dish }).first()
      const ingredients = await knex('ingredients')
        .where({ id_dishes: id_dish })
        .orderBy('name')

      return response.json({
        ...dish,
        ingredients
      })
    } else {
      return response.status(400).json('Dish is not favorite')
    }
  }
  async update(request, response) {
    const { id, quantity } = request.body

    if (typeof quantity !== 'number') quantity = parseInt(quantity)

    if (quantity === 0) {
      await knex('shopping_cart').where({ id }).delete()
      return response.json('Removed from cart')
    }

    await knex('shopping_cart').update({ quantity }).where({ id })

    const updatedItemCart = await knex('shopping_cart')
      .select()
      .where({ id })
      .first()
    return response.json({
      Message: `Dish quantity updated to cart | Quant= ${updatedItemCart.quantity}`
    })
  }
  async delete(request, response) {
    const { id } = request.body

    await knex('shopping_cart').where({ id }).delete()

    return response.json('removed from cart by delete argument')
  }
}

module.exports = Shopping_cartController
