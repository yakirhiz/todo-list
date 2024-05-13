DROP DATABASE IF EXISTS todolist;
CREATE DATABASE todolist;

\c todolist

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) PRIMARY KEY /* NOT NULL & UNIQUE */,
    hashed_password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS todos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) REFERENCES users(username),
    title VARCHAR(255),
    progress INT CHECK (progress BETWEEN 0 AND 100)
);

/*
SELECT * FROM users WHERE username = 'user';
INSERT INTO users (username, hashed_password) VALUES ('user', 'hashed_pass');

SELECT * FROM todos WHERE username = 'user' ORDER BY id ASC;
INSERT INTO todos (username, title, progress) VALUES ('user', 'Eat breakfast', 50);
UPDATE todos SET (title, progress) = ('Eat lunch', 75) WHERE id = 1;
DELETE FROM todos WHERE id = 1;

DROP TABLE users;
DROP TABLE todos;
DROP DATABASE todolist;
*/