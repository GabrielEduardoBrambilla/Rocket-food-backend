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

    const [Id_Dishes] = await knex('dishes').insert({
      price,
      name,
      image,
      category,
      description,
      ingredients
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        name,
        dish_id
      }
    })
    await knex('ingredients').insert(ingredientsInsert)

    return response.json()
  }

  async createe(req, res) {
    const { Price, Name, Image, Category, Description, Ingredients } = req.body

    const dish = {
      Price,
      Name,
      Image,
      Category,
      Description
    }

    const ingredients = Ingredients.map(name => {
      return {
        name
      }
    })

    try {
      const [dishId] = await knex('Dishes').insert(dish)
      const ingredientPromises = ingredients.map(ingredient => {
        return knex('Ingredients').insert({ ...ingredient, Id_Dishes: dishId })
      })
      await Promise.all(ingredientPromises)
      return res.status(201).json({ message: 'Dish created successfully' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Unable to create dish' })
    }
  }
}

module.exports = DishesController
