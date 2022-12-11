import express, { Express, Request, Response } from 'express'
import { initOrGetSequelize } from './src/modules/sequelize'
import bodyParser from 'body-parser'
import { orderRouter, productRouter, userRouter } from './src/api'
import { IInitOrGetSequelize } from './src/modules/sequelize/sequelize.interface'
import { initModel } from './src/modules/sequelize/model'
import { checkSequelizeInput } from './src/utils/validation/validation.function'

const app: Express = express()
const port = 4000

/**
 * Express 초기화
 */
function initExpressApp() {
  app.use(bodyParser.json())
  app.use('/user', userRouter)
  app.use('/product', productRouter)
  app.use('/order', orderRouter)
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello world')
  })
  app.listen(port, () => {
    console.log(`${port}: Server is running`)
  })
}

/**
 * API 서버 실행
 */
export async function startFakeServer(input: IInitOrGetSequelize) {
  try {
    checkSequelizeInput(input)
    const sequelize = await initOrGetSequelize(input)
    initModel()
    await sequelize.authenticate()
    await sequelize.sync()

    console.log('Connection has been established successfully.')
    initExpressApp()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
