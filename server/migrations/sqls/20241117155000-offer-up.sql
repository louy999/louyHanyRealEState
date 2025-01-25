/* Replace with your SQL commands */
CREATE TABLE offer(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    developer_id uuid REFERENCES developer(id),
    image_offer TEXT NOT NULL,
    furniture VARCHAR(250),
    bed VARCHAR(250),
    bath VARCHAR(250),
    down_payment VARCHAR(250) NOT NULL,
    types VARCHAR(250) NOT NULL,
    location VARCHAR(250) NOT NULL,
    installment VARCHAR(250) NOT NULL,
    areas VARCHAR(250) NOT NULL,
    status BOOLEAN NOT NULL,
    cat VARCHAR(250) NOT NULL,
    title Text,
    unit_type Text,
    developer_name VARCHAR(250)
);