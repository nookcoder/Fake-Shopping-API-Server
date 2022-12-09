import express from 'express'
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from './product.service'

const productRouter = express.Router()

productRouter
  .route('/')
  .get(getAllProduct) // get all products
  .post(createProduct) // create new product

/**
 * update product
 */
productRouter
  .route('/:id')
  .get(getProductById) // get a product by id
  .post(updateProduct) // update a product by id
  .delete(deleteProduct) // delete a product by id

export default productRouter
