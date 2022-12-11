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
exports.startFakeServer = void 0;
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("./src/modules/sequelize");
const body_parser_1 = __importDefault(require("body-parser"));
const api_1 = require("./src/api");
const model_1 = require("./src/modules/sequelize/model");
const validation_function_1 = require("./src/utils/validation/validation.function");
const app = (0, express_1.default)();
const port = 4000;
/**
 * Express 초기화
 */
function initExpressApp() {
    app.use(body_parser_1.default.json());
    app.use('/user', api_1.userRouter);
    app.use('/product', api_1.productRouter);
    app.use('/order', api_1.orderRouter);
    app.get('/', (req, res) => {
        res.send('Hello world');
    });
    app.listen(port, () => {
        console.log(`${port}: Server is running`);
    });
}
/**
 * API 서버 실행
 */
function startFakeServer(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, validation_function_1.checkSequelizeInput)(input);
            const sequelize = yield (0, sequelize_1.initOrGetSequelize)(input);
            (0, model_1.initModel)();
            yield sequelize.authenticate();
            yield sequelize.sync();
            console.log('Connection has been established successfully.');
            initExpressApp();
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
exports.startFakeServer = startFakeServer;
