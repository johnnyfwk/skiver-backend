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
            (username, password)
        VALUES
            ($1, $2)
        RETURNING *;
    `
    const queryValues = [body.username, body.password];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            return response.rows[0];
        })
}

function patchAUserById(body) {
    if (!body.hasOwnProperty("username")) {
        return Promise.reject( { "status": 400, "msg": "The request object does not include the 'username' property. Please include the 'username' property." } );
    }
    if (!body.hasOwnProperty("password")) {
        return Promise.reject( { "status": 400, "msg": "The request object does not include the 'password' property. Please include the 'password' property." } );
    }

    const queryString = `
        UPDATE users
        SET password = $1
        WHERE username = $2
        RETURNING *;
    `
    const queryValues = [body.password, body.username];

    return db
        .query(queryString, queryValues)
        .then((result) => {
            if (result.rowCount === 0) {
                return Promise.reject( { "status": 404, "msg": "User does not exist." } );
            }
            return result.rows[0];
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
    patchAUserById,
    deleteAUserById
};