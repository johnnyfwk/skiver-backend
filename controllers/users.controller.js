const {
    getAllUsers,
    getAUserById,
    addAUser,
    deleteAUserById
} = require('../models/users.model');

function getUsers(request, response, next) {
    getAllUsers()
        .then((users) => {
            response.status(200).send( { users });
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })    
}

function getUserById(request, response, next) {
    getAUserById(request.params.user_id)
        .then((user) => {
            console.log(user)
            response.status(200).send( { user } );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function addUser(request, response, next) {
    addAUser(request.body)
        .then((user) => {
            response.status(201).send( { user} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

function deleteUserById(request, response, next) {
    deleteAUserById(request.params.user_id)
        .then((user) => {
            response.status(204).send( {user} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUserById
};