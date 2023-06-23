const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')

class DishesController {
  async create(request, response) {
    try {
      const { price, name, category, description, ingredients } = request.body
      const ingredientsArray = JSON.parse(ingredients)
      const dishImage = request.file.filename

      const diskStorage = new DiskStorage()

      const checkDishExists = await knex('dishes').where({ name }).first()
      if (checkDishExists) {
        return response
          .status(400)
          .json('Dish with name ' + name + ' already exists')
      }

      await knex.transaction(async transaction => {
        const [idDishes] = await transaction('dishes').insert({
          price,
          name,
          image: dishImage,
          category,
          description
        })

        const ingredientsInsert = ingredientsArray.map(ingredientName => ({
          name: ingredientName,
          id_dishes: idDishes
        }))

        await transaction('ingredients').insert(ingredientsInsert)
      })
      diskStorage.saveFile(dishImage)

      return response.json()
    } catch (error) {
      // Handle any errors that occur during the transaction
      console.log(error)
      return response.status(500).json('Error creating dish')
    }
  }
  async show(request, response) {
    const { id } = request.params

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
    const { id } = request.params

    try {
      await knex('dishes').where({ id }).delete()

      return response.status(200).json({ message: 'Successfully deleted dish' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Error deleting dish' })
    }
  }
  async index(request, response) {
    try {
      const dishes = await knex('dishes').select('*')

      const dishesWithIngredients = await Promise.all(
        dishes.map(async dish => {
          const ingredients = await knex('ingredients')
            .select('name')
            .where('id_dishes', dish.id)

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

  async patch(request, response) {
    const { id } = request.params
    const { price, name, category, description, ingredients } = request.body
    const dishImage = request.file ? request.file.filename : null // Updated image filename

    try {
      // Create an object with the updated dish details
      const updatedDish = {
        price,
        name,
        category,
        description
      }

      // Add the dish image field only if an image is provided
      if (dishImage) {
        updatedDish.image = dishImage
      }

      // Update the dish details
      await knex('dishes').where({ id }).update(updatedDish)

      // Delete existing dish ingredients
      await knex('ingredients').where('id_dishes', id).del()

      // Insert updated dish ingredients
      const ingredientsArray = JSON.parse(ingredients)
      const ingredientsInsert = ingredientsArray.map(ingredientName => ({
        name: ingredientName,
        id_dishes: id
      }))
      await knex('ingredients').insert(ingredientsInsert)

      return response.json({ message: 'thanks god' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Error updating dish' })
    }
  }
}

module.exports = DishesController
