const knex = require('../database/knex')

class OrdersController {
  async create(request, response) {
    const { id_user, total_price, id_dish, selectedQuantity, dishPrice } =
      request.body

    const openedOrder = await knex('orders')
      .select()
      .where({
        id_user: id_user, // Replace userId with the actual user ID
        status: 'received'
      })
      .first()
      .returning('id')
    const id = openedOrder
      ? openedOrder.id
      : await knex('orders')
          .insert({
            status: 'received',
            id_user: id_user, // replace userId with the actual user ID
            total_price: 0, // Assuming the total price will be calculated later
            created_at: new Date()
          })
          .returning('id')

    console.log(id)
    await knex('order_items').insert({
      id_dish,
      id_order: id,
      quantity: selectedQuantity,
      item_price_at_time: dishPrice
    })

    return response.status(200).json()
  }
  async show(request, response) {
    const { id_user, id_dish } = request.body
  }
  async delete(request, response) {
    const { id_user, id_dish } = request.body

    await knex('favorite_list').where({ id_dish, id_user }).delete()

    return response.json('removed from favorites')
  }
  async index(request, response) {
    const { id_user } = request.body

    return response.status(400).json('User does not have a favorite list')
  }
}

module.exports = OrdersController
