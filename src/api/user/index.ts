import express from "express";
import {User} from "../../lib/sequelize/model/user.model";
import {CreateNewUser} from "./user.dto";
import {CHECK_KEY, checkKeyOfRequestBody} from "../../lib/validation";

const userRouter = express.Router();

userRouter.route('/')
    .get(async (req,res) => {
        try{
            const users = await User.findAll();
            res.send(JSON.stringify(users));
        } catch (e) {
            console.log(e);
        }
    })

/**
 * 회원가입
 */
userRouter.post('/new', async(req, res) => {
    try {
        const createNewUserInput  = new CreateNewUser(req.body);
        if(checkKeyOfRequestBody(Object.keys(createNewUserInput), Object.keys(req.body)) === CHECK_KEY.NOT_ALLOW) {
            res.send({
                status: 400,
                error: "Bad Request",
                message: `Invalid key value included, You can include only ${Object.keys(await User.describe())})`
            })
            return;
        }

        const user = await User.build(createNewUserInput);
        const savedUser = await user.save();
        console.log(savedUser);
        res.send({
            status: 201,
            message: "Created Successfully",
        })
    } catch (e){
        res.send({
            status: 500,
            error: "Internal Server Error",
            message: e
        })
    }

})

export default userRouter;
