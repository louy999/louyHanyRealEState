/* Replace with your SQL commands */
CREATE TABLE replay(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id uuid REFERENCES users(id),
    request_id uuid REFERENCES request(id),
    replay TEXT
);