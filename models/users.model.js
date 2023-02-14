const db = require('../database/connection');

function getAllUsers() {
    return db
        .query("SELECT * FROM users;")
        .then((response) => {
            return response.rows;
        })
}

function getAUserById(userId) {
    const queryString = `
        SELECT *
        FROM users
        WHERE user_id = $1;
    `
    const queryValue = [userId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( {"status": 404, "msg": "User does not exist."} );
            }
            return response.rows[0];
        })
}

function addAUser(body) {
    const queryString = `
        INSERT INTO users
            (username)
        VALUES
            ($1)
        RETURNING *;
    `
    const queryValue = [body.username];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows[0];
        })
}

function deleteAUserById(userId) {
    const queryString = `
        DELETE FROM users
        WHERE user_id = $1
        RETURNING *;
    `
    const queryValue = [userId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( {"status": 404, "msg": "User does not exist."} );
            }
            return response.rows[0];
        })
}

module.exports = {
    getAllUsers,
    getAUserById,
    addAUser,
    deleteAUserById
};