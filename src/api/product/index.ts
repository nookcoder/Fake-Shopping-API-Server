import express from 'express'
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from './product.service'
import { authMiddlewareByJwt } from '../../modules/jwt/jwt.service'

const productRouter = express.Router()

productRouter
  .route('/')
  .get(getAllProduct) // get all products
  .post(createProduct) // create new product

productRouter // with access token
  .route('/certificated')
  .get(authMiddlewareByJwt, getAllProduct) // get all products
  .post(createProduct) // create new product

productRouter // with access token
  .route('/certificated/:id')
  .get(authMiddlewareByJwt, getProductById) // get a product by id
  .post(authMiddlewareByJwt, updateProduct) // update a product by id
  .delete(authMiddlewareByJwt, deleteProduct) // delete a product by id

productRouter
  .route('/:id')
  .get(getProductById) // get a product by id
  .post(updateProduct) // update a product by id
  .delete(deleteProduct) // delete a product by id

export default productRouter
