export const JwtConfig = {
  secretKey: 'YoUrSeCrEtKeY', // 원하는 시크릿 키
  option: {
    algorithm: 'HS256', // 해싱 알고리즘
    expiresIn: '1d', // 토큰 유효 기간
    issuer: 'hyeonuk', // 발행자
  },
}

export const TOKEN_ERROR = {
  EXPIRED: 'jwt expired',
  INVALID: 'invalid signature',
  SERVER_ERROR: 'Internal server error',
}
