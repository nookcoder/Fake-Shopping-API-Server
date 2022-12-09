import { ICreateNewUser } from '../user/user.interface'
import { ICreateProduct } from './product.interface'

export class CreateProduct {
  name: string | undefined
  brand: string | undefined
  price: string | undefined
  count: string | undefined
  product_detail: string | undefined

  constructor(input: ICreateProduct) {
    this.name = input.name
    this.brand = input.brand
    this.price = input.price
    this.count = input.count
    this.product_detail = input.product_detail
  }
}
