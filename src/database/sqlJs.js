import sqlite3 from 'sqlite3'
sqlite3.verbose()
let sql;

const db = new sqlite3.Database("./users.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.log(err);
})

sql = `SELECT username,password, messages.title, messages.content FROM messages
JOIN users ON messages.user_id = users.user_id `

export const result = db.all(sql, [], (err,rows)=>{
    if(err) console.log(err);
    rows.forEach(row=>{
        console.log(row);
    })
})