/**
 * Request Key 값과 Database Model 키값 비교
 * @param keyExpected
 * @param keyRequested
 */
import { IInitOrGetSequelize } from '../../modules/sequelize/sequelize.interface'
import { AbstractDialect } from 'sequelize/types/dialects/abstract'

export function checkKeyOfRequestBody(
  keyExpected: string[],
  keyRequested: string[]
): boolean {
  return (
    keyRequested.filter((key) => {
      return !keyExpected.includes(key)
    }).length === 0
  )
}

export function checkSequelizeInput(input: IInitOrGetSequelize) {
  if (!input.database) {
    throw new Error('You need name of database')
  }

  if (!input.username) {
    throw new Error('You need username of database')
  }

  if (input.password === null) {
    throw new Error('You need password of database')
  }

  if (!input.dialect) {
    throw new Error(
      `You need dialect. dialect can be 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'`
    )
  }

  if (!input.host) {
    throw new Error('You need host of database')
  }

  if (!input.port) {
    throw new Error('You need port of database')
  }
}
