type VARIABLES = {
  NEXT_AUTH_URL: string
  AUTH_SECRET: string
  MONGO_DB_URL: string
  APP_EMAIL: string
  APP_EMAIL_NAME: string
  HASH: number
  EMAIL_SECRET: string
}

const MONGO_DB_URL = process.env.MONGO_DB_URL as string ?? "";
const AUTH_SECRET = process.env.NEXTAUTH_SECRET as string ?? "";
const NODE_ENV = process.env.NODE_ENV as string ?? "";
const NEXT_AUTH_URL = process.env.NEXTAUTH_URL as string ?? "";
const HASH = process.env.HASH as string ?? "3";
const BREVO_SECRET = process.env.BREVO_SECRET as string ?? "";
const APP_EMAIL = process.env.APP_EMAIL as string ?? "";
const APP_NAME = process.env.APP_NAME as string ?? ""

const LIVE: VARIABLES = {
  MONGO_DB_URL,
  AUTH_SECRET,
  NEXT_AUTH_URL,
  APP_EMAIL,
  APP_EMAIL_NAME: APP_NAME,
  EMAIL_SECRET: BREVO_SECRET,
  HASH: parseInt(HASH)
}

const LOCAL: VARIABLES = {
  MONGO_DB_URL,
  APP_EMAIL,
  APP_EMAIL_NAME: APP_NAME,
  AUTH_SECRET,
  NEXT_AUTH_URL,
  EMAIL_SECRET: BREVO_SECRET,
  HASH: parseInt(HASH)
}

const ENV = NODE_ENV === "development" ? LOCAL : LIVE;
export { ENV, NODE_ENV }

