const db = require('../../connection.js');

function createTablePosts() {
  const createTablePostsQueryString = `
      CREATE TABLE posts (
          post_id SERIAL PRIMARY KEY,
          username VARCHAR(20),
          body VARCHAR(300),
          likes INT,
          timestamp BIGINT
      );
  `    
  return db        
      .query(createTablePostsQueryString)
      .then((response) => {
          return response;
      })
}

const runCreateTablePosts = () => {
  return createTablePosts()
    .then(() => {
      db.end()
    });
};

runCreateTablePosts();