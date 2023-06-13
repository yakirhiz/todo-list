CREATE DATABASE todo;

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY /* NOT NULL & UNIQUE */,
    hashed_password VARCHAR(255)
);
DROP TABLE users;

CREATE TABLE todos (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) REFERENCES users(username), /* Maybe add foreign key */
    title VARCHAR(30),
    progress INT
);
DROP TABLE todos;

INSERT INTO users (username, hashed_password) VALUES ('yakir', '123'), ('john', '333');
DELETE FROM todos WHERE username='username';

SELECT * FROM todos;
INSERT INTO todos (id, username, title, progress) VALUES ('yakir', 'title', 50);
UPDATE todos SET title = 'title1' WHERE id=id;
DELETE FROM todos WHERE id=id;