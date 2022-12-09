import * as jwt from "jsonwebtoken";
import { JwtConfig, TOKEN_EXPIRED, TOKEN_INVALID } from "./jwt.config";
import * as randToken from "rand-token";
import { ISignedJwt } from "./jwt.interface";

const secretKey = JwtConfig.secretKey;

export const jwtService = {
  sign: (user: any): ISignedJwt => {
    const payloads = {
      idx: user.id,
      account: user.account,
    };
    const result = {
      access_token: jwt.sign(payloads, secretKey),
      refresh_token: randToken.uid(16),
    };
    return result;
  },

  verify: (token: string) => {
    try {
      const decode = jwt.verify(token, JwtConfig.secretKey);
    } catch (e: any) {
      switch (e.message) {
        case "jwt expired":
          return TOKEN_EXPIRED;
        case "invalid token":
          return TOKEN_INVALID;
        default:
          return TOKEN_INVALID;
      }
    }
  },
};
