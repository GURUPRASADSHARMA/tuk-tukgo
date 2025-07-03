import mysql from "mysql2/promise.js"


export const db = await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Guru@1027',
    database:'location'
})

