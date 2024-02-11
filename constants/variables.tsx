type VARIABLES = {
  NEXT_AUTH_URL: string
  AUTH_SECRET: string
  MONGO_DB_URL: string
  HASH: number
}

const MONGO_DB_URL = process.env.MONGO_DB_URL as string ?? "";
const AUTH_SECRET = process.env.NEXTAUTH_SECRET as string ?? "";
const NODE_ENV = process.env.NODE_ENV as string ?? "";
const NEXT_AUTH_URL = process.env.NEXTAUTH_URL as string ?? "";
const HASH = process.env.HASH as string ?? "3";

const LIVE: VARIABLES = {
  MONGO_DB_URL,
  AUTH_SECRET,
  NEXT_AUTH_URL,
  HASH: parseInt(HASH)
}

const LOCAL: VARIABLES = {
  AUTH_SECRET,
  MONGO_DB_URL,
  NEXT_AUTH_URL,
  HASH: parseInt(HASH)
}

const ENV = NODE_ENV === "development" ? LOCAL : LIVE;
export { ENV, NODE_ENV }

