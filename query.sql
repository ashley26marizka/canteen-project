CREATE TABLE IF NOT EXISTS appuser (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    mobileno VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password TEXT
);


CREATE TABLE juicespot_stock(
	id SERIAL PRIMARY KEY,
	image TEXT,
	item_name TEXT,
	quantity INT,
	price INT
);



