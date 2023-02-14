const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');

const {
    getUsers,
    getUserById,
    addUser,
    deleteUserById,
    patchUserById
} = require('./controllers/users.controller');

const {
    handle404Errors,
    handleCustomErrors,
    handle500Errors
} = require('./controllers/errors.controller');

app.use(cors());

app.get('/api/users', getUsers);
app.get('/api/users/:user_id', getUserById);
app.post('/api/users', addUser);
app.patch('/api/users/:user_id', patchUserById);
app.delete('/api/users/:user_id', deleteUserById);

app.all('*', handle404Errors);

app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;