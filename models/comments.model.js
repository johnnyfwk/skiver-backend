const db = require('../database/connection');

function getAllComments() {
    const queryString = `
        SELECT *
        FROM comments
        ORDER BY timestamp DESC;
    `
    return db
        .query(queryString)
        .then((response) => {
            return response.rows;
        })
}

function getACommentById(commentId) {
    const queryString = `
        SELECT *
        FROM comments
        WHERE comment_id = $1;
    `
    const queryValue = [commentId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( { "status": 404, "msg": "Comment does not exist." } );
            }
            return response.rows[0];
        })
}

function getAllCommentsByPostId(postId) {
    const queryString = `
        SELECT *
        FROM comments
        WHERE post_id = $1
        ORDER BY timestamp DESC;
    `
    const queryValue = [postId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows;
        })
}

function getAllCommentsByUserId(username) {
    const queryString = `
        SELECT *
        FROM comments
        WHERE owner = $1
        ORDER BY timestamp DESC;
    `
    const queryValue = [username];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows;
        })
}

function postAComment(comment) {
    const queryString = `
        INSERT INTO comments
            ( post_id, owner, body, timestamp )
        VALUES
            ( $1, $2, $3, $4 )
        RETURNING *;
    `
    const queryValues = [comment.post_id, comment.owner, comment.body, comment.timestamp];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            return response.rows[0];
        })
}

function editACommentById(comment, commentId) {
    const queryString = `
        UPDATE comments
        SET body = $1
        WHERE comment_id = $2
        RETURNING *;
    `
    const queryValues = [comment.body, commentId];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( { "status": 404, "msg": "Comment does not exist." } );
            }
            return response.rows[0];
        })
}

function deleteACommentById(commentId) {
    const queryString = `
        DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *;
    `
    const queryValue = [commentId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject( {"status": 404, "msg": "Comment does not exist."} );
            }
            return response.rows[0];
        })
}

module.exports = {
    getAllComments,
    getACommentById,
    getAllCommentsByPostId,
    getAllCommentsByUserId,
    postAComment,
    editACommentById,
    deleteACommentById
}