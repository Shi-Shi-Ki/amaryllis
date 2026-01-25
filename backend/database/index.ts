import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import * as schema from "./schema.js"
import * as dotenv from "dotenv"

dotenv.config()

const { DB_USER, DB_USER_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env
const databaseUrl = `mysql://${DB_USER}:${DB_USER_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

// 接続プールを作成
const connection = await mysql.createConnection(databaseUrl)

export const db = drizzle(connection, { schema, mode: "default" })
