import { User } from './user.model'
import { Product } from './product.model'
import { Order } from './order.model'

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

export { User, Product, Order }
