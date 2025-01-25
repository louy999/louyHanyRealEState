/* Replace with your SQL commands */
/* Replace with your SQL commands */
CREATE TABLE video_dev(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    developer_id uuid REFERENCES developer(id),
    title_video TEXT,
    video TEXT
);