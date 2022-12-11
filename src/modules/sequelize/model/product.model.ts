import { getSequelize, initOrGetSequelize } from '../index'
import { DataTypes, Model } from 'sequelize'

export class Product extends Model {}

export function initProductModel() {
  return Product.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: getSequelize().literal(`NOW()`),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: getSequelize().literal(`NOW()`),
      },
      product_number: {
        type: DataTypes.STRING,
        unique: true,
      }, // 상품 고유 정보
      brand: {
        type: DataTypes.STRING,
        allowNull: true,
      }, // 상품 회사
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      }, // 상품 이름
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }, // 상품 가격
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }, // 상품 갯수
      product_detail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: getSequelize(),
      tableName: 'product',
      hooks: {
        beforeUpdate(product: Product, options: any) {
          product.dataValues.updated_at = getSequelize().literal('NOW()')
        },
      },
    }
  )
}
