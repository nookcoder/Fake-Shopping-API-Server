import express, {Express, Request, Response} from "express";
import {initOrGetSequelize} from "./src/lib/sequelize";
import userRouter from "./src/api/user";
import bodyParser from 'body-parser';

const app: Express = express();
const port = 4000;

function initExpressApp(){
    app.use(bodyParser.json());
    app.use('/user', userRouter);
    app.get('/', (req: Request, res: Response) => {
        res.send("Hello world");
    });
    app.listen(port, () => {
        console.log(`${port}: Server is running`);
    });
}

export async function startFakeServer() {
    const sequelize = await initOrGetSequelize();
    try{
        await sequelize.authenticate();
        await sequelize.sync({force: true})
        console.log('Connection has been established successfully.');
        initExpressApp();
    }catch (error){
        console.error('Unable to connect to the database:', error);
    }

}

