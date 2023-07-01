const knex = require('../database/knex')

class OrdersController {
  async create(request, response) {
    const { id_user, id_dish, selectedQuantity, dishPrice } = request.body

    try {
      const orderId = await knex.transaction(async trx => {
        const openedOrder = await trx('orders')
          .select('id')
          .where({
            id_user: id_user,
            status: 'received'
          })
          .first()

        if (openedOrder) {
          return openedOrder.id
        } else {
          const insertedOrder = await trx('orders')
            .insert({
              status: 'received',
              id_user: id_user,
              total_price: 0,
              created_at: new Date()
            })
            .returning('id')

          return insertedOrder[0]
        }
      })

      await knex('order_items').insert({
        id_dish,
        id_order: orderId,
        quantity: selectedQuantity,
        item_price_at_time: dishPrice
      })

      const currentOrderItems = await knex('order_items')
        .select()
        .where({ id_order: orderId })

      const orderTotalPrice = currentOrderItems.reduce(
        (accumulator, item) =>
          accumulator + item.quantity * item.item_price_at_time,
        0
      )

      await knex('orders').where('id', orderId).update({
        total_price: orderTotalPrice
      })

      return response.status(200).json()
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'An error occurred' })
    }
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
