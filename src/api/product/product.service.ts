import { ICreateProduct } from './product.interface'
import { CreateProduct } from './product.dto'
import { Request, Response } from 'express'
import { CHECK_KEY, checkKeyOfRequestBody } from '../../utils/validation'
import { Product } from '../../modules/sequelize/model/product.model'
import { createErrorMessage } from '../../utils/error'
import { ERROR_STATUS } from '../../utils/error/error.constants'

/**
 * create new Product
 * @param req
 * @param res
 */
// todo : 이미지 추가
export async function createProduct(req: Request, res: Response) {
  try {
    const createProductInput = new CreateProduct(req.body)
    const keyOfRequestBody = Object.keys(req.body)
    if (
      checkKeyOfRequestBody(
        Object.keys(createProductInput),
        keyOfRequestBody
      ) === CHECK_KEY.NOT_ALLOW
    ) {
      res.send({
        status: 400,
        error: 'Bad Request',
        message: `Invalid key value included, You can include only ${Object.keys(
          await Product.describe()
        )}`,
      })

      return
    }

    const productNewNumber = Date.now().toString(16).toUpperCase()
    const product = await Product.build({
      ...createProductInput,
      product_number: productNewNumber,
    })
    await product.save()
    res.send({
      status: 201,
      message: `Created Product Successfully ${JSON.stringify(
        createProductInput
      )}`,
    })
    return
  } catch (e) {
    res.send(createErrorMessage(ERROR_STATUS.INTERNAL_SERVER_ERROR, e))
  }
}

/**
 * 상품 정보 업데이트
 * @param req
 * @param res
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      where: {
        product_id: req.params.id,
      },
    })

    if (!product) {
      return res.send({
        status: 404,
        error: 'Not Found',
        message: `Not Found id = ${req.params.id}`,
      })
    }

    const { ...result } = req.body
    await product.update(result)
    return res.send({
      status: 200,
    })
  } catch (e) {
    return res.send(createErrorMessage(ERROR_STATUS.INTERNAL_SERVER_ERROR, e))
  }
}

/**
 * 모든 상품 정보 가져오기
 * @param req
 * @param res
 */
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll()
    return res.send({
      status: 200,
      data: products,
    })
  } catch (e) {
    res.send(createErrorMessage(ERROR_STATUS.INTERNAL_SERVER_ERROR, e))
  }
}

/**
 * get product by id
 * @param req
 * @param res
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      where: {
        product_id: req.params.id,
      },
    })

    if (!product) {
      return res.send({
        status: 404,
        message: `Not Found Product id=${req.params.id}`,
      })
    }

    return res.send({
      status: 200,
      data: product,
    })
  } catch (e) {
    res.send(createErrorMessage(ERROR_STATUS.INTERNAL_SERVER_ERROR, e))
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      where: {
        product_id: req.params.id,
      },
    })

    if (!product) {
      return res.send({
        status: 404,
        error: 'Not Found',
        message: `Not Found A Product id=${req.params.id}`,
      })
    }

    await product.destroy()
    return res.send({
      status: 200,
    })
  } catch (e) {
    return res.send(createErrorMessage(ERROR_STATUS.INTERNAL_SERVER_ERROR, e))
  }
}
