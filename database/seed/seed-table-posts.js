const { posts } = require('../data/development/index.js');
const db = require('../connection.js');
const format = require('pg-format');

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

const runSeedTablePosts = () => {
  return seedTablePosts(posts)
    .then(() => {
      db.end()
    });
};

runSeedTablePosts();