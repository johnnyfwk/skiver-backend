const { users } = require('../data/development/index.js');
const db = require('../connection.js');
const format = require('pg-format');

function seedTableUsers( users ) {
    const usersQueryValues = users.map((user) => {
        const userArray = [user.username];
        return userArray;
    });

    const usersQueryStringAndValues = format(`
        INSERT INTO users
            ( username )
        VALUES
            %L
        RETURNING *;`, usersQueryValues 
    );    

    return db
        .query(usersQueryStringAndValues)
        .then((response) => {
            return response;
        })
}

const runSeedTableUsers = () => {
  return seedTableUsers(users)
    .then(() => {
      db.end()
    });
};

runSeedTableUsers();