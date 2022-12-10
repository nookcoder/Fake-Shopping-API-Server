import { User } from './user.model'
import { Product } from './product.model'
import { Order } from './order.model'

User.hasMany(Order, {
  as: 'orders',
  onDelete: 'cascade',
  hooks: true,
})
Order.belongsTo(User, {
  as: 'user',
  onDelete: 'cascade',
  hooks: true,
})

export { User, Product, Order }
