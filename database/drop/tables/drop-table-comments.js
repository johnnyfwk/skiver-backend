const db = require('../../connection.js');

function dropTableComments() {
  return db        
      .query("DROP TABLE IF EXISTS comments;")
      .then((response) => {
          return response;
      })
}

const runDropTableComments = () => {
  return dropTableComments()
    .then(() => {
      db.end()
    });
};

runDropTableComments();