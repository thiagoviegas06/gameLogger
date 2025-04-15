CREATE DATABASE gameLogger;
\c gameLogger;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50),
	email VARCHAR(75),
	password_hash TEXT
);
INSERT INTO users (username, email, password_hash) VALUES ('Test', 'test@gmail.com', 'test1234');
