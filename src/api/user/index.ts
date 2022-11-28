import express from "express";
import {User} from "../../modules/sequelize/model/user.model";
import {CreateNewUser, LoginInput} from "./user.dto";
import {CHECK_KEY, checkKeyOfRequestBody} from "../../utils/validation";
import {createErrorMessage} from "../../utils/error";
import {ERROR_STATUS} from "../../utils/error/error.constants";
import * as bcrypt from 'bcrypt';
import {jwtService} from "../../modules/jwt/jwt.service";

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
userRouter.post('/new', async(req, res) => {
    try {
        const createNewUserInput  = new CreateNewUser(req.body);
        const keyOfRequestBody = Object.keys(req.body);
        if(checkKeyOfRequestBody(Object.keys(createNewUserInput), keyOfRequestBody) === CHECK_KEY.NOT_ALLOW || !keyOfRequestBody.includes("account") || !keyOfRequestBody.includes("password")) {
            res.send({
                status: 400,
                error: "Bad Request",
                message: `Invalid key value included, You can include only ${Object.keys(await User.describe())}) or you must include {account: string, password: string}`,
            })
            return;
        }

        if(createNewUserInput.password){
            createNewUserInput.password = await bcrypt.hash(createNewUserInput.password.toString(), 10);
        }
        const user = await User.build(createNewUserInput);
        const savedUser = await user.save();
        res.send({
            status: 201,
            message: "Created Successfully",
        })
    } catch (e){
        res.send(createErrorMessage(ERROR_STATUS.INTERNAL_SERVER_ERROR, e))
    }

});

/**
 * 로그인
 * req.body = {
 *     account: string,
 *     password: string,
 * }
 */
userRouter.post('/login', async (req, res) => {
    try {
        const loginInput = new LoginInput(req.body);
        // Request Body 키 값 확인
        const keyOfLoginInput = Object.keys(loginInput);
        if(keyOfLoginInput.length !== 2) {
            res.send(createErrorMessage(ERROR_STATUS.BAD_REQUEST, "BAD REQUEST","request body must be {address: string, password: string}"));
            return;
        }

        // account 로 User Select
        const user = await User.scope('withPassword').findOne({where : {account : loginInput.account}});
        if(!user){
            return res.send({
                status: 404,
                message: "Not Found This User",
                error: "Not Found"
            })
        }

        // 로그인 성공
        if(user && await bcrypt.compare(loginInput.password, user.password)) {
            // 토큰 발급
            const {access_token, refresh_token} = jwtService.sign(user);
            // 갱신 토큰 저장
            await user.update({
                rt: refresh_token
            });
            return res.send({
                status: 200,
                access_token,
                refresh_token
            })
        }

        return res.send({
            status: 401,
            error: "Unauthorized",
            message: "Not Match password with account",
        })
    } catch (e){
        res.send(createErrorMessage(ERROR_STATUS.INTERNAL_SERVER_ERROR, e))
    }
})


export default userRouter;
