const db = require('../../connection.js');

function createTableUsers() {
  const createTableUsersQueryString = `
      CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(20),
          password VARCHAR(20),
          profile_image_url TEXT
      );
  `    
  return db        
      .query(createTableUsersQueryString)
      .then((response) => {
          return response;
      })
}

const runCreateTableUsers = () => {
  return createTableUsers()
    .then(() => {
      db.end()
    });
};

runCreateTableUsers();