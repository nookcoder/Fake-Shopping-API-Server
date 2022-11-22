import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
    Sequelize
} from "sequelize";
import {initOrGetSequelize} from "../index";
import * as bcrypt from 'bcrypt';

const sequelize = initOrGetSequelize();

/**
 * 유저 태이블
 */

/**
 * Attributes of User Model
 */
export type UserAttributes = {
    id: number; // 인덱스 값
    name: string; // 이름
    phone: string; // 비밀번호
    email: string; // 이메일
    address: string; // 주소
    account: string; // 로그인 계정
    password: string; // 비밀번호
    createdAt: Date; // 생성날짜
    updatedAt: Date; // 수정 날짜
}


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare name: CreationOptional<string>;
    declare phone: CreationOptional<string>;
    declare email: CreationOptional<string>;
    declare address: CreationOptional<string>;
    declare account: CreationOptional<string>;
    declare password: CreationOptional<string>;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING, // 이름
    phone: DataTypes.STRING, // 핸드폰 번호
    email: DataTypes.STRING, // 이메일
    address: DataTypes.STRING, // 주소
    account: DataTypes.STRING, // 로그인 아이디
    password: {
        type: DataTypes.STRING,
    }, // 비밀번호, Hash 를 적용한 값이 들어갑니다
    createdAt: DataTypes.DATE, // 생성 날짜
    updatedAt: DataTypes.DATE // 수정 날짜
}, {
    sequelize,
    tableName: "user",
    defaultScope:{
      attributes:{
          exclude: ['password'],
      }
    },
    scopes:{
        withPassword: {
            attributes:{
                include:['password']
            }
        }
    },
    hooks:{
        async beforeCreate(user, options) {
            if(user.password){
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        },

        async beforeUpdate(user,options) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }
    }
});

User.sync({alter: true}).then(r => console.log("success")).catch(() => console.log('failed'))
