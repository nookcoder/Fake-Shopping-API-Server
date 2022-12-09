export const JwtConfig = {
  secretKey: "YoUrSeCrEtKeY", // 원하는 시크릿 ㅍ키
  option: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "30m", // 토큰 유효 기간
    issuer: "hyeonuk", // 발행자
  },
};

export const TOKEN_EXPIRED = -3;
export const TOKEN_INVALID = -2;
