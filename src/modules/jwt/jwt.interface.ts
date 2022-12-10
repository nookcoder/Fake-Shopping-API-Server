/**
 * 발행된 토큰 Return Value
 */
export interface ISignedJwt {
  access_token: string
}

export interface IJwtVerified {
  ok: boolean
  id?: number
  account?: string | null
  role?: string | null
  message?: string | null
}
