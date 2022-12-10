import express, { Request } from 'express'
import { authMiddlewareByJwt, jwtService } from '../../modules/jwt/jwt.service'
import {
  cancelOrder,
  createOrder,
  deleteOrder,
  getAllOrder,
} from './order.service'

const orderRouter = express.Router()

orderRouter
  .route('/')
  .get(authMiddlewareByJwt, getAllOrder) // 모든 주문 조회
  .post(authMiddlewareByJwt, createOrder) // 주문 생성
  .patch(authMiddlewareByJwt, cancelOrder) // 주문 상태 취소 ORDER_STATUS.CANCELED
  .delete(authMiddlewareByJwt, deleteOrder) // 주문 삭제

orderRouter
  .route('/certificated')
  .get(authMiddlewareByJwt, getAllOrder)
  .post(authMiddlewareByJwt, createOrder)
  .patch(authMiddlewareByJwt, cancelOrder)
  .delete(authMiddlewareByJwt, deleteOrder)

export default orderRouter
