const db = require('../../connection.js');

function dropTableUsers() {
  return db        
      .query("DROP TABLE IF EXISTS users;")
      .then((response) => {
          return response;
      })
}

const runDropTableUsers = () => {
  return dropTableUsers()
    .then(() => {
      db.end()
    });
};

runDropTableUsers();