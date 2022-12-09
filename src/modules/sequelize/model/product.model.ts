import { initOrGetSequelize } from '../index'
import { DataTypes, Model } from 'sequelize'

const sequelize = initOrGetSequelize()

export class Product extends Model {}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal(`NOW()`),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal(`NOW()`),
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
    sequelize,
    tableName: 'product',
    hooks: {
      beforeUpdate(product: Product, options: any) {
        product.dataValues.updated_at = sequelize.literal('NOW()')
      },
    },
  }
)
