/* WRITE QUERIES HERE */
CREATE TABLE IF NOT EXISTS books(
    id INT AUTO_INCREMENT NOT NULL,
    author VARCHAR(50) NOT NULL,
    title VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);