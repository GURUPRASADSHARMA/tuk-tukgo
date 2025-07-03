import mysql from "mysql2/promise.js"


export const db = await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:process.env.db_password,
    database:process.env.database
})

