import { DataTypes, Model } from 'sequelize'
import { initOrGetSequelize } from '../index'
import { Product } from './product.model'
import { User } from './user.model'

const sequelize = initOrGetSequelize()

export const ORDER_STATUS = {
  PENDING: 'pending',
  SHIPPING: 'shipping',
  COMPLETE: 'complete',
  CANCELED: 'canceled',
  CANCEL_REQUEST: 'cancel_request',
}

export class Order extends Model {}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal(`NOW()`),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal(`NOW()`),
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
    sequelize,
    tableName: 'orders',
    hooks: {
      beforeUpdate(product: Product, options: any) {
        product.dataValues.updated_at = sequelize.literal('NOW()')
      },
    },
  }
)
