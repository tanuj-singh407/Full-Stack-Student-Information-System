let mysql = require("mysql");

let conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database:"college"
});

conn.connect((err) => {
    if(err){console.warn("thereis some error", err)}
    else console.warn("connected successfully");
})

module.exports = conn;