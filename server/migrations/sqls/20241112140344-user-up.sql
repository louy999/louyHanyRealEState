/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(250) NOT NULL,
    phone VARCHAR(250) UNIQUE NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    access BOOLEAN NOT NULL,
    image_profile TEXT
);