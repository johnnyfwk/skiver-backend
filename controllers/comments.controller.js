const {
    getAllComments,
    getACommentById,
    getAllCommentsByPostId,
    getAllCommentsByUserId,
    postAComment,
    editACommentById,
    deleteACommentById,
    deleteAllCommentsByPostId,
    deleteAllCommentsByUsername
} = require('../models/comments.model');

function getComments(request, response, next) {
    getAllComments()
        .then((comments) => {
            response.status(200).send( {comments} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function getCommentById(request, response, next) {
    getACommentById(request.params.comment_id)
        .then((comment) => {
            response.status(200).send( {comment} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function getCommentsByPostId(request, response, next) {
    getAllCommentsByPostId(request.params.post_id)
        .then((comments) => {
            response.status(200).send( {comments} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function getCommentsByUsername(request, response, next) {
    getAllCommentsByUserId(request.params.username)
        .then((comments) => {
            response.status(200).send( {comments} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function postComment(request, response, next) {
    postAComment(request.body)
        .then((comment) => {
            response.status(201).send( {comment} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function editCommentById(request, response, next) {
    editACommentById(request.body, request.params.comment_id)
        .then((comment) => {
            response.status(200).send( {comment} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function deleteCommentById(request, response, next) {
    deleteACommentById(request.params.comment_id)
        .then((comment) => {
            response.status(204).send( {comment} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function deleteCommentsByPostId(request, response, next) {
    deleteAllCommentsByPostId(request.params.post_id)
        .then((comments) => {
            response.status(204).send( {comments} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function deleteCommentsByUsername(request, response, next) {
    deleteAllCommentsByUsername(request.params.username)
        .then((comments) => {
            response.status(204).send( {comments} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

module.exports = {
    getComments,
    getCommentById,
    getCommentsByPostId,
    getCommentsByUsername,
    postComment,
    editCommentById,
    deleteCommentById,
    deleteCommentsByPostId,
    deleteCommentsByUsername
}