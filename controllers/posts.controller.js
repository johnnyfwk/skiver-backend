const {
    getAllPosts,
    getAPostById,
    getAllPostsByUsername,
    addAPost,
    editAPostById,
    deleteAPostById,
    deleteAllPostsByUsername
} = require('../models/posts.model');

function getPosts(request, response, next) {
    getAllPosts()
        .then((posts) => {
            response.status(200).send( {posts} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function getPostById(request, response, next) {
    getAPostById(request.params.post_id)
        .then((post) => {
            response.status(200).send( {post} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function getPostsByUsername(request, response, next) {
    getAllPostsByUsername(request.params.username)
        .then((posts) => {
            response.status(200).send( {posts} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function addPost(request, response, next) {
    addAPost(request.body)
        .then((post) => {
            response.status(201).send( {post} )
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function editPostById(request, response, next) {
    editAPostById(request.params.post_id, request.body)
        .then((post) => {
            response.status(200).send( {post} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function deletePostById(request, response, next) {
    deleteAPostById(request.params.post_id)
        .then((post) => {
            response.status(204).send( {post} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function deletePostsByUsername(request, response, next) {
    deleteAllPostsByUsername(request.params.username)
        .then((comments) => {
            response.status(204).send( {comments} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

module.exports = {
    getPosts,
    getPostById,
    getPostsByUsername,
    addPost,
    editPostById,
    deletePostById,
    deletePostsByUsername
}