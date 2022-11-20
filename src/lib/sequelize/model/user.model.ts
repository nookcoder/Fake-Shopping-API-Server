import {DataTypes, Model, Sequelize} from "sequelize";
import {initOrGetSequelize} from "../index";

const sequelize = initOrGetSequelize();

export class User extends Model{}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    sequelize,
});

User.sync({alter: true}).then(r => console.log("success")).catch(() => console.log('failed'))
