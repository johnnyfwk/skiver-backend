const db = require('../../connection.js');

function dropTablePosts() {
  return db        
      .query("DROP TABLE IF EXISTS posts;")
      .then((response) => {
          return response;
      })
}

const runDropTablePosts = () => {
  return dropTablePosts()
    .then(() => {
      db.end()
    });
};

runDropTablePosts();