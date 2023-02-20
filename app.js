const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');

const {
    getUsers,
    getUserById,
    addUser,
    // editUserById,
    editUserByUsername,
    // deleteUserById,
    deleteUserByUsername
} = require('./controllers/users.controller');

const {
    getPosts,
    getPostById,
    getPostsByUsername,
    addPost,
    editPostById,
    deletePostById,
    deletePostsByUsername
} = require('./controllers/posts.controller');

const {
    getComments,
    getCommentById,
    getCommentsByPostId,
    getCommentsByUsername,
    postComment,
    editCommentById,
    deleteCommentById,
    deleteCommentsByPostId,
    deleteCommentsByUsername
} = require('./controllers/comments.controller');

const {
    handle404Errors,
    handleCustomErrors,
    handle500Errors
} = require('./controllers/errors.controller');

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Users
app.get('/api/users', getUsers);
app.get('/api/users/:user_id', getUserById);
app.post('/api/users', addUser);
// app.patch('/api/users/:user_id', editUserById);
app.patch('/api/users/:username', editUserByUsername);
// app.delete('/api/users/:user_id', deleteUserById);
app.delete('/api/users/:username', deleteUserByUsername);

// Posts
app.get('/api/posts', getPosts);
app.get('/api/posts/:post_id', getPostById);
app.get('/api/users/:username/posts', getPostsByUsername);
app.post('/api/posts', addPost);
app.patch('/api/posts/:post_id', editPostById);
app.delete('/api/posts/:post_id', deletePostById);
app.delete('/api/users/:username/posts', deletePostsByUsername);

// Comments
app.get('/api/comments', getComments);
app.get('/api/comments/:comment_id', getCommentById);
app.get('/api/posts/:post_id/comments', getCommentsByPostId);
app.get('/api/users/:username/comments', getCommentsByUsername);
app.post('/api/comments', postComment);
app.patch('/api/comments/:comment_id', editCommentById);
app.delete('/api/comments/:comment_id', deleteCommentById);
app.delete('/api/posts/:post_id/comments', deleteCommentsByPostId);
app.delete('/api/users/:username/comments', deleteCommentsByUsername);

app.all('*', handle404Errors);

app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;