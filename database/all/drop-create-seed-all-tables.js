const db = require('../connection');
const { users, posts, comments } = require('../data/development/index.js');
const format = require('pg-format');

/////////////////////////////// Drop Tables
function dropTableUsers() {
    return db        
        .query("DROP TABLE IF EXISTS users;")
        .then((response) => {
            return response;
        })
}

function dropTablePosts() {
    return db        
        .query("DROP TABLE IF EXISTS posts;")
        .then((response) => {
            return response;
        })
}

function dropTableComments() {
    return db        
        .query("DROP TABLE IF EXISTS comments;")
        .then((response) => {
            return response;
        })
}
/////////////////////////////// Drop Tables





/////////////////////////////// Create Tables
function createTableUsers() {
    const createTableUsersQueryString = `
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(20),
            password VARCHAR(20),
            profile_image_url TEXT
        );
    `    
    return db        
        .query(createTableUsersQueryString)
        .then((response) => {
            return response;
        })
}

function createTablePosts() {
    const createTablePostsQueryString = `
        CREATE TABLE posts (
            post_id SERIAL PRIMARY KEY,
            username VARCHAR(20),
            body VARCHAR(300),
            likes INT,
            image_url TEXT,
            timestamp BIGINT
        );
    `    
    return db        
        .query(createTablePostsQueryString)
        .then((response) => {
            return response;
        })
}

function createTableComments() {
    const createTableCommentsQueryString = `
        CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            post_id INT,
            owner VARCHAR(20),
            body VARCHAR(300),
            timestamp BIGINT
        );
    `    
    return db        
        .query(createTableCommentsQueryString)
        .then((response) => {
            return response;
        })
}
/////////////////////////////// Create Tables






/////////////////////////////// Seed Tables
function seedTableUsers( users ) {
    const usersQueryValues = users.map((user) => {
        const userArray = [user.username, user.password, user.profile_image_url];
        return userArray;
    });

    const usersQueryStringAndValues = format(`
        INSERT INTO users
            ( username, password, profile_image_url )
        VALUES
            %L
        RETURNING *;`, usersQueryValues 
    );    

    return db
        .query(usersQueryStringAndValues)
        .then((response) => {
            return response;
        })
}

function seedTablePosts( posts ) {
    const postsQueryValues = posts.map((post) => {
        const postArray = [post.username, post.body, post.likes, post.image_url, post.timestamp];
        return postArray;
    });

    const postsQueryStringAndValues = format(`
        INSERT INTO posts
            ( username, body, likes, image_url, timestamp )
        VALUES
            %L
        RETURNING *;`, postsQueryValues 
    );    

    return db
        .query(postsQueryStringAndValues)
        .then((response) => {
            return response;
        })
}

function seedTableComments( comments ) {
    const commentsQueryValues = comments.map((comment) => {
        const commentArray = [comment.post_id, comment.owner, comment.body, comment.timestamp];
        return commentArray;
    });

    const commentsQueryStringAndValues = format(`
        INSERT INTO comments
            ( post_id, owner, body, timestamp )
        VALUES
            %L
        RETURNING *;`, commentsQueryValues 
    );    

    return db
        .query(commentsQueryStringAndValues)
        .then((response) => {
            return response;
        })
}
/////////////////////////////// Seed Tables






/////// Run all
const dropCreateAndSeedAllTables = () => {
    return dropTableUsers()
        .then(() => {
            return dropTablePosts();
        })
        .then(() => {
            return dropTableComments();
        })
        .then(() => {
            return createTableUsers();
        })
        .then(() => {
            return createTablePosts();
        })
        .then(() => {
            return createTableComments();
        })
        .then(() => {
            return seedTableUsers(users);
        })
        .then(() => {
            return seedTablePosts(posts);
        })
        .then(() => {
            return seedTableComments(comments);
        })
        .then(() => {
            db.end();
        });
}

dropCreateAndSeedAllTables();
/////// Run all