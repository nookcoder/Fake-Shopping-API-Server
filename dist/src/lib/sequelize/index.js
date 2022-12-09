"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOrGetSequelize = void 0;
const sequelize_1 = require("sequelize");
let sequelize;
function initOrGetSequelize() {
  if (sequelize) {
    return sequelize;
  }
  sequelize = new sequelize_1.Sequelize("test", "root", "", {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    sync: { alter: true, force: true },
  });
  return sequelize;
}
exports.initOrGetSequelize = initOrGetSequelize;
