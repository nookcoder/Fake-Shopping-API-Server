"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = require("./user.service");
const userRouter = express_1.default.Router();
/**
 * 회원가입
 * request.body = {
 *    address: string | undefined;
 *    name: string | undefined;
 *    account: string;
 *    password: string;
 *    phone: string | undefined;
 *    email: string | undefined;
 * }
 */
userRouter.post("/new", user_service_1.signUp);
/**
 * 로그인
 * req.body = {
 *     account: string,
 *     password: string,
 * }
 */
userRouter.post("/login", user_service_1.login);
exports.default = userRouter;
