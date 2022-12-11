import express, { Request } from 'express'
import { authMiddlewareByJwt, jwtService } from '../../modules/jwt/jwt.service'
import {
  cancelOrder,
  changeStatusToComplete,
  changeStatusToShipping,
  createOrder,
  deleteOrder,
  getAllOrder,
  getAOrder,
} from './order.service'

const orderRouter = express.Router()

orderRouter
  .route('/')
  .get(getAllOrder) // 모든 주문 조회
  .patch(cancelOrder) // 주문 상태 취소 ORDER_STATUS.CANCELED
  .delete(deleteOrder) // 주문 삭제

orderRouter
  .route('/certificated')
  .get(authMiddlewareByJwt, getAllOrder)
  .post(authMiddlewareByJwt, createOrder)

orderRouter
  .route('/certificated/:id')
  .get(authMiddlewareByJwt, getAOrder)
  .delete(authMiddlewareByJwt, deleteOrder)

orderRouter.route('/:id').get(getAOrder).delete(deleteOrder)

orderRouter.patch('/:id/cancel', cancelOrder) // change status to cancel
orderRouter.patch('/:id/completed', changeStatusToComplete) // change status to complete
orderRouter.patch('/:id/shipping', changeStatusToShipping) // change status to shipping
export default orderRouter
