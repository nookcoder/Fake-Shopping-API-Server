"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../../lib/sequelize/model/user.model");
const user_dto_1 = require("./user.dto");
const validation_1 = require("../../lib/validation");
const userRouter = express_1.default.Router();
userRouter.route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.findAll();
        res.send(JSON.stringify(users));
    }
    catch (e) {
        console.log(e);
    }
}));
/**
 * 회원가입
 */
userRouter.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createNewUserInput = new user_dto_1.CreateNewUser(req.body);
        if ((0, validation_1.checkKeyOfRequestBody)(Object.keys(createNewUserInput), Object.keys(req.body)) === validation_1.CHECK_KEY.NOT_ALLOW) {
            res.send({
                status: 400,
                error: "Bad Request",
                message: `Invalid key value included, You can include only ${Object.keys(yield user_model_1.User.describe())})`
            });
            return;
        }
        const user = yield user_model_1.User.build(createNewUserInput);
        const savedUser = yield user.save();
        console.log(savedUser);
        res.send({
            status: 201,
            message: "Created Successfully",
        });
    }
    catch (e) {
        res.send({
            status: 500,
            error: "Internal Server Error",
            message: e
        });
    }
}));
exports.default = userRouter;
