const db = require('../database/connection');

function getAllPosts() {
    return db
        .query('SELECT * FROM posts ORDER BY timestamp DESC;')
        .then((response) => {
            return response.rows;
        })
}

function getAPostById(postId) {
    const queryString = `
        SELECT * FROM posts
        WHERE post_id = $1;
    `
    const queryValue = [postId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( { "status": 404, "msg": "Post does not exist." } );
            }
            return response.rows[0]
        })
}

function getAllPostsByUsername(username) {
    const queryString = `
        SELECT * FROM posts
        WHERE username = $1
        ORDER BY timestamp DESC;
    `
    const queryValue = [username];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( { "status": 404, "msg": "User does not exist." } );
            }
            return response.rows;
        })
}

function addAPost(post) {
    const queryString = `
        INSERT INTO posts
            (username, body, likes, image_url, timestamp)
        VALUES
            ($1, $2, $3, $4, $5)
        RETURNING *;
    `
    const queryValues = [post.username, post.body, post.likes, post.image_url, post.timestamp];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            return response.rows[0];
        })
}

function editAPostById(postId, post) {
    const queryString = `
        UPDATE posts
        SET
            body = $1,
            likes = $2,
            image_url = $3
        WHERE post_id = $4
        RETURNING *;
    `
    const queryValues = [post.body, post.likes, post.image_url, postId];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( { "status": 404, "msg": "Post does not exist." } );
            }
            return response.rows[0];
        })
}

function deleteAPostById(postId) {
    const queryString = `
        DELETE FROM posts
        WHERE post_id = $1
        RETURNING *;
    `
    const queryValue = [postId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( {"status": 404, "msg": "Post does not exist."} );
            }
            return response.rows[0];
        })
}

function deleteAllPostsByUsername(username) {
    const queryString = `
        DELETE FROM posts
        WHERE post_id IN
            (SELECT post_id FROM posts WHERE username = $1)
        RETURNING *;
    `
    const queryValue = [username];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( {"status": 404, "msg": "User does not exist."} );
            }
            return response.rows;
        })
}

module.exports = {
    getAllPosts,
    getAPostById,
    getAllPostsByUsername,
    addAPost,
    editAPostById,
    deleteAPostById,
    deleteAllPostsByUsername
}