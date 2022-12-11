import { Sequelize } from 'sequelize'
import { IInitOrGetSequelize } from './sequelize.interface'

let sequelize: Sequelize
export const initOrGetSequelize = (input: IInitOrGetSequelize): Sequelize => {
  sequelize = new Sequelize(input.database, input.username, input.password, {
    dialect: input.dialect ?? 'mysql',
    host: input.host ?? 'localhost',
    port: input.port ?? 3306,
    ...input.option,
  })
  return sequelize
}

export function getSequelize() {
  return sequelize
}
