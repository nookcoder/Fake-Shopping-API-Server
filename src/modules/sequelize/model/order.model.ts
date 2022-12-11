import { DataTypes, Model } from 'sequelize'
import { initOrGetSequelize, getSequelize } from '../index'
import { Product } from './product.model'

export const ORDER_STATUS = {
  PENDING: 'pending',
  SHIPPING: 'shipping',
  COMPLETE: 'complete',
  CANCELED: 'canceled',
  CANCEL_REQUEST: 'cancel_request',
}

export class Order extends Model {}

export function initOrderModel() {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: getSequelize().literal(`NOW()`),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: getSequelize().literal(`NOW()`),
      },
      order_code: {
        type: DataTypes.STRING,
        unique: true,
      },
      order_status: {
        type: DataTypes.STRING,
        defaultValue: ORDER_STATUS.PENDING,
      },
    },
    {
      sequelize: getSequelize(),
      tableName: 'orders',
      hooks: {
        beforeUpdate(product: Product, options: any) {
          product.dataValues.updated_at = getSequelize().literal('NOW()')
        },
      },
    }
  )
}
