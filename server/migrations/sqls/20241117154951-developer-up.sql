/* Replace with your SQL commands */
CREATE TABLE developer(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(250) NOT NULL,
    image_developer TEXT NOT NULL,
    location TEXT [] NOT NULL
);