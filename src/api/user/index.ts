import express from "express";
import {User} from "../../lib/sequelize/model/user.model";

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
    const newUser = await User.create({name: req.body.name});
    res.send("create New User");
});

userRouter.get('/',async (req, res) => {
    const users = await User.findAll();
    res.send(users);
})

export default userRouter;
