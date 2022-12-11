import { raw, Request, Response } from 'express'
import { Order, Product, User } from '../../modules/sequelize/model'
import { ORDER_STATUS } from '../../modules/sequelize/model/order.model'

export const createOrder = async (req: any, res: Response) => {
  try {
    if (!req.body.product_id) {
      return res.status(404).send({
        error: 'You must include product_id in body',
      })
    }
    if (req.id) {
      const orderCode = Date.now().toString(16).toUpperCase()
      const order = await Order.create({
        order_code: orderCode,
        ownerId: req.id,
        productOrderedId: req.body.product_id,
      })

      await order.save()
      return res.status(201).send({
        data: order,
      })
    }
  } catch (e) {}
}

export const getAllOrder = async (req: Request, res: Response) => {
  const orders = await Order.findAll({
    include: ['owner', 'product_ordered'],
  })
  return res.send({
    orders: orders,
  })
}

export const getAOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: ['owner', 'product_ordered'],
    })

    if (!order) {
      return res.status(404).send({
        error: 'Not Found',
        message: `Not Found Order id=${req.params.id}`,
      })
    }

    return res.status(200).send({
      ok: true,
      data: order,
    })
  } catch (e) {
    return res.status(500).send({
      error: e,
    })
  }
}

export const changeStatusToShipping = async (req: Request, res: Response) => {
  const { ok } = await updateStatus(+req.params.id, 'shipping')
  if (ok) {
    return res.status(201).send({
      ok,
      message: 'Change Order Status to "shipping"',
    })
  }

  return res.status(404).send({
    ok,
    message: `Not Found Order id=${req.params.id}`,
  })
}

export const changeStatusToComplete = async (req: Request, res: Response) => {
  const { ok } = await updateStatus(+req.params.id, 'complete')
  if (ok) {
    return res.status(201).send({
      ok,
      message: 'Change Order Status to "complete"',
    })
  }

  return res.status(404).send({
    ok,
    message: `Not Found Order id=${req.params.id}`,
  })
}

export const cancelOrder = async (req: Request, res: Response) => {
  const { ok } = await updateStatus(+req.params.id, 'canceled')
  if (ok) {
    return res.status(201).send({
      ok,
      message: 'Change Order Status to "canceled"',
    })
  }

  return res.status(404).send({
    ok,
    message: `Not Found Order id=${req.params.id}`,
  })
}

export const deleteOrder = async (req: Request, res: Response) => {}

const updateStatus = async (
  id: number,
  type: 'shipping' | 'complete' | 'canceled'
): Promise<{ ok: boolean }> => {
  const order = await Order.findByPk(id)
  if (order) {
    await order.update({
      order_status: type,
    })
    return {
      ok: true,
    }
  }

  return {
    ok: false,
  }
}
