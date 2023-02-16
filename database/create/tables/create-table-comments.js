const db = require('../../connection.js');

function createTableComments() {
  const createTableCommentsQueryString = `
      CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          post_id INT,
          owner VARCHAR(20),
          body VARCHAR(300)
      );
  `    
  return db        
      .query(createTableCommentsQueryString)
      .then((response) => {
          return response;
      })
}

const runCreateTableComments = () => {
  return createTableComments()
    .then(() => {
      db.end()
    });
};

runCreateTableComments();