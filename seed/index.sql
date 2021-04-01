DROP DATABASE IF EXISTS vinyl_db;

CREATE DATABASE vinyl_db;

USE vinyl_db;

CREATE TABLE user (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL
);

CREATE TABLE album (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    content TEXT NOT NULL,
    artist VARCHAR(40) NOT NULL,
    lp VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL
);

USE vinyl_db;
INSERT INTO album (title, content, artist, lp, year)
VALUES ('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', "Marvin Gaye", "What's Going On", 1971),
('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', 'Beach Boys', 'Pet Sounds', 1966),
('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', 'Nirvana', 'Nevermind', 1991),
('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', 'Fleetwood Mac', 'Rumours', 1977),
('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', 'Michael Jackson', 'Thriller', 1982),
('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', 'Aretha Franklin', 'I Never Loved a Man the Way I Love You', 1967),
('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', 'Public Enemy', 'It Takes a Nation of Millions to Hold Us Back', 1988),
('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', 'The Clash', 'London Calling', 1979),
('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', 'Carole King', 'Tapestry', 1971),
('Look what I just got!', 'dshpfindvnadfipugnrpgvuiandfvoianrvornrvpu', 'Miles Davis', 'Kind of Blue', 1959);

USE vinyl_db;
SELECT * FROM album;