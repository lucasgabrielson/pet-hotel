CREATE TABLE owner (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80)
);

CREATE TABLE pets (
	"id" SERIAL PRIMARY KEY,
	"owner_id" INT NOT NULL,
	FOREIGN KEY (owner_id) REFERENCES owner(id),
	"pet_name" VARCHAR (80),
	"breed" VARCHAR (80),