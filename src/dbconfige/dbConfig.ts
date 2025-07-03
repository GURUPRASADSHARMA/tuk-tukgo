import mysql from "mysql2/promise.js"


export const db = await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE
})

