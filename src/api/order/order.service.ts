import { Request, Response } from 'express'
import { Order, Product, User } from '../../modules/sequelize/model'

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

export const getAOrder = async (req: Request, res: Response) => {}

export const cancelOrder = async (rqe: Request, res: Response) => {}

export const deleteOrder = async (req: Request, res: Response) => {}
