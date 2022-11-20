"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
const sequelize = (0, index_1.initOrGetSequelize)();
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: sequelize_1.DataTypes.STRING,
    login: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
}, {
    sequelize,
});
User.sync({ alter: true }).then(r => console.log("success")).catch(() => console.log('failed'));
