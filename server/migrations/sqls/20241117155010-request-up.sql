/* Replace with your SQL commands */
CREATE TABLE request(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id uuid REFERENCES users(id),
    request TEXT
);