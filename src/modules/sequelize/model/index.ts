import { initUserModel, User } from './user.model'
import { initProductModel, Product } from './product.model'
import { initOrderModel, Order } from './order.model'

export function initModel() {
  initUserModel()
  initProductModel()
  initOrderModel()

  User.hasMany(Order, {
    as: 'orders',
    onDelete: 'cascade',
    hooks: true,
  })
  Product.hasMany(Order, {
    as: 'orders',
    onDelete: 'cascade',
    hooks: true,
  })
  Order.belongsTo(User, {
    as: 'owner',
    onDelete: 'cascade',
    hooks: true,
  })
  Order.belongsTo(Product, {
    as: 'product_ordered',
    onDelete: 'cascade',
    hooks: true,
  })
}

export { User, Product, Order }
