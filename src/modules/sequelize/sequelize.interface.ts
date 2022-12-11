import { Dialect } from 'sequelize'

export interface IInitOrGetSequelize {
  database: string
  username: string
  password: string
  dialect: Dialect
  host: string
  port: number
  option?: any
}
