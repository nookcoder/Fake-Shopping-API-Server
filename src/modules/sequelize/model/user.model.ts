import { DataTypes, Model } from 'sequelize'
import * as bcrypt from 'bcrypt'
import { getSequelize } from '../index'

/**
 * 유저 태이블
 */

export class User extends Model {
  declare password: string
}

export function initUserModel() {
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      }, // 이름
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      }, // 핸드폰 번호
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      }, // 이메일
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      }, // 주소
      account: {
        type: DataTypes.STRING,
        allowNull: true,
      }, // 로그인 아이디
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
      }, // 비밀번호, Hash 를 적용한 값이 들어갑니다
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: getSequelize().literal(`NOW()`),
      }, // 생성 날짜
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: getSequelize().literal(`NOW()`),
      }, // 수정 날짜,
      rt: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      }, // 갱신토큰
    },
    {
      sequelize: getSequelize(),
      tableName: 'user',
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ['password'],
          },
        },
      },
      hooks: {},
    }
  )
}
