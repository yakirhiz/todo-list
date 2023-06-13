CREATE DATABASE todo;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    hashed_password VARCHAR(255)
)

CREATE TABLE todos (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255), /* Maybe add foreign key */
    title VARCHAR(30),
    progress INT
)

INSERT INTO users (username) VALUES ('username');
DELETE FROM todos WHERE username='username';

SELECT * FROM todos;
INSERT INTO todos (id, username, title, progress) VALUES ('yakir', 'title', 50);
UPDATE todos SET title = 'title1' WHERE id=id;
DELETE FROM todos WHERE id=id;