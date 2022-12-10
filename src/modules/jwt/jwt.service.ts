import * as jwt from 'jsonwebtoken'
import { JwtConfig, TOKEN_ERROR } from './jwt.config'
import * as randToken from 'rand-token'
import { IJwtVerified, ISignedJwt } from './jwt.interface'
import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

const secretKey = JwtConfig.secretKey

export const jwtService = {
  sign: (user: any): ISignedJwt => {
    const payloads = {
      id: user.id,
      account: user.account,
      role: user.role,
    }
    const result = {
      access_token: jwt.sign(payloads, secretKey, {
        expiresIn: JwtConfig.option.expiresIn,
      }),
    }
    return result
  },

  verify: (token: string): IJwtVerified => {
    try {
      const decode: any = jwt.verify(token, JwtConfig.secretKey)
      return {
        ok: true,
        id: decode.id,
        account: decode.account,
        role: decode.role,
      }
    } catch (e: any) {
      console.log(e)
      switch (e.message) {
        case TOKEN_ERROR.EXPIRED:
          return {
            ok: false,
            message: TOKEN_ERROR.EXPIRED,
          }
        case 'invalid signature':
          return {
            ok: false,
            message: TOKEN_ERROR.INVALID,
          }
        default:
          return {
            ok: false,
            message: TOKEN_ERROR.SERVER_ERROR,
          }
      }
    }
  },
}

export const authMiddlewareByJwt = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const accessToken = req.headers.authorization.split('Bearer ')[1]
    const result: IJwtVerified = jwtService.verify(accessToken)
    if (result.ok) {
      req.id = result.id
      req.role = result.role
      req.account = result.account
      next()
      return
    }

    return res.status(401).send({
      error: 'Forbidden',
      message: result.message,
    })
  }
}
