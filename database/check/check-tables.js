const db = require('../connection.js');

function checkTables() {
    return db        
        .query("SELECT * FROM users;")
        .then((response) => {
            console.log(response.rows, "<------ users");
            return response.rows;
        })
        .then(() => {
            return db.query("SELECT * FROM posts;");
        })
        .then((response) => {
            console.log(response.rows, "<------ posts");
            return response.rows
        })
        .then((response) => {
            return db.query("SELECT * FROM comments;");
        })
        .then((response) => {
            console.log(response.rows, "<------ comments");
            return response.rows
        })
        .then(() => {
            db.end();
        })
}

checkTables();
