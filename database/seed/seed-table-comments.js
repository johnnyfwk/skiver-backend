const { comments } = require('../data/development/index.js');
const db = require('../connection.js');
const format = require('pg-format');

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

const runSeedTableComments = () => {
  return seedTableComments(comments)
    .then(() => {
      db.end()
    });
};

runSeedTableComments();