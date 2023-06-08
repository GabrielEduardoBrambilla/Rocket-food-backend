const knex = require('../database/knex')

class DishesController {
  async create(request, response) {
    const { price, name, category, description, ingredients } = request.body
    const dishImage = request.file.filename

    const checkDishExists = await knex('dishes').where({ name }).first()
    if (checkDishExists) {
      return response
        .status(400)
        .json('Dish with name ' + name + ' already exists')
    }

    try {
      await knex.transaction(async transaction => {
        const [idDishes] = await transaction('dishes').insert({
          price,
          name,
          image: dishImage,
          category,
          description
        })
        console.log(ingredients.all)
        const ingredientsInsert = ingredients.map(ingredientName => {
          return {
            name: ingredientName,
            id_dishes: idDishes
          }
        })

        await transaction('ingredients').insert(ingredientsInsert)
      })

      return response.json()
    } catch (error) {
      // Handle any errors that occur during the transaction
      console.log(error)
      return response.status(500).json('Error creating dish')
    }
  }

  async show(request, response) {
    const { id } = request.body

    const dish = await knex('dishes').where({ id }).first()
    const ingredients = await knex('ingredients')
      .where({ id_dishes: id })
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
    const { q } = request.query

    try {
      let dishes = await knex('dishes')

      if (q) {
        dishes = await knex('dishes')
          .where('name', 'like', `%${q}%`)
          .orWhere('description', 'like', `%${q}%`)
      }

      const dishesWithIngredients = await Promise.all(
        dishes.map(async dish => {
          const ingredients = await knex('dishes_ingredients')
            .select('ingredients.name')
            .join(
              'ingredients',
              'dishes_ingredients.ingredient_id',
              'ingredients.id'
            )
            .where('dishes_ingredients.dish_id', dish.id)

          return {
            ...dish,
            ingredients
          }
        })
      )

      return response.json(dishesWithIngredients)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = DishesController
