import express from 'express'
import {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from './product.service'

const productRouter = express.Router()
/**
 * create new product
 */
productRouter.post('/new', createProduct)

/**
 * update product
 */
productRouter.post('/update/:id', updateProduct)

/**
 * get all of products
 */
productRouter.get('/', getAllProduct)

/**
 * get a product
 */
productRouter.get('/:id', getProductById)
export default productRouter
