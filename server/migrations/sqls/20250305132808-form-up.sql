CREATE TABLE form(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    number TEXT,
    des TEXT
);