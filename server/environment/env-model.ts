export interface IEnvironment {
  environmentName: string,
  SECRET_TOKEN_KEY: string,
  BCRYPT_ROUND: number,
  PASSWORD_MIN_LENGHT: number,
  JWT_EXPIRE: number,
  USERS_FILE: string
  GROUPS_FILE: string
  PORT: number,
  MAILER: any
}