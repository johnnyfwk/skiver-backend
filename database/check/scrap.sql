\c skiver

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM comments;



-- DELETE FROM comments
-- WHERE comment_id IN
-- (SELECT comment_id FROM comments WHERE post_id = 33)
-- RETURNING *;

-- DELETE FROM comments
-- WHERE comment_id IN
-- (SELECT comment_id FROM comments WHERE owner = 'johnny')
-- RETURNING *;

-- DELETE FROM posts
-- WHERE post_id IN
-- (SELECT post_id FROM posts WHERE username = 'ian')
-- RETURNING *;

-- DELETE FROM users
-- WHERE user_id IN
-- (SELECT user_id FROM users WHERE username = 'fongster')
-- RETURNING *;