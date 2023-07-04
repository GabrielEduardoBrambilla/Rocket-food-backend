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

      const dishExists = await knex('order_items')
        .select()
        .where({
          id_dish,
          id_order: orderId,
          item_price_at_time: dishPrice
        })
        .first()
      if (dishExists) {
        await knex('order_items')
          .update({
            quantity: selectedQuantity
          })
          .where({
            id_dish,
            id_order: orderId,
            // quantity: dishExists,
            item_price_at_time: dishPrice
          })
      } else {
        await knex('order_items').insert({
          id_dish,
          id_order: orderId,
          quantity: selectedQuantity,
          item_price_at_time: dishPrice
        })
      }

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
  async update(request, response) {
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
          return response.status(500).json('Order not found')
        }
      })

      const dishExists = await knex('order_items')
        .select()
        .where({
          id_dish: id_dish,
          id_order: orderId
        })
        .first()
      if (dishExists) {
        await knex('order_items')
          .update({
            quantity: selectedQuantity
          })
          .where({
            id_dish: id_dish,
            id_order: orderId,
            item_price_at_time: dishPrice
          })
      } else {
        return response.status(500).json('Dish not found')
      }

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
  async delete(request, response) {
    const { id_user, id_dish } = request.body
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
          return response.status(500).json('Order not found')
        }
      })
      const dishExists = await knex('order_items')
        .select()
        .where({
          id_dish: id_dish,
          id_order: orderId
        })
        .first()
      if (dishExists) {
        await knex('order_items')
          .where({ id_dish: id_dish, id_order: orderId })
          .delete()
      } else {
        return response.status(500).json('Dish not found')
      }
      return response.status(200).json()
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'An error occurred' })
    }
  }
  async index(request, response) {
    const id_user = request.params.id

    const orderId = await knex('orders')
      .select('id')
      .where({
        id_user,
        status: 'received'
      })
      .first()

    if (!orderId) {
      return response.status(200).json([])
    }

    const orderItems = await knex('order_items')
      .select('quantity', 'item_price_at_time', 'id_dish')
      .where({
        id_order: orderId.id
      })

    const dishIds = orderItems.map(item => item.id_dish)

    const dishes = await knex('dishes')
      .select('id', 'name', 'image')
      .whereIn('id', dishIds)

    const result = orderItems.map(item => {
      const dish = dishes.find(dish => dish.id === item.id_dish)
      return {
        dish_id: item.id_dish,
        dish_img: dish.image,
        dish_name: dish.name,
        quantity: item.quantity,
        item_price_at_time: item.item_price_at_time
      }
    })

    return response.status(200).json(result)
  }
}

module.exports = OrdersController
