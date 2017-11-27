CREATE DATABASE tasks;

CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
name VARCHAR (100) NOT NULL,
is_complete BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO tasks (name)
VALUES ('complete this live solve');