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
            (username, password, profile_image_url)
        VALUES
            ($1, $2, $3)
        RETURNING *;
    `
    const queryValues = [body.username, body.password, body.profile_image_url];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            return response.rows[0];
        })
}

function editAUserById(userId, body) {
    const queryString = `
        UPDATE users
        SET profile_image_url = $1
        WHERE user_id = $2
        RETURNING *;
    `
    const queryValues = [body.profile_image_url, userId];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( { "status": 404, "msg": "User does not exist." } );
            }
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
    editAUserById,
    deleteAUserById
};