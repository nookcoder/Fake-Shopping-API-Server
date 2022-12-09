import express from "express";
import { login, signUp } from "./user.service";

const userRouter = express.Router();

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
userRouter.post("/new", signUp);

/**
 * 로그인
 * req.body = {
 *     account: string,
 *     password: string,
 * }
 */
userRouter.post("/login", login);

export default userRouter;
