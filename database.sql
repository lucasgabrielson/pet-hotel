CREATE TABLE owners (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80)
);

CREATE TABLE pets (
	"id" SERIAL PRIMARY KEY,
	"owner_id" INT NOT NULL,
	FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE,
	"name" VARCHAR (80),
	"breed" VARCHAR (80),
	"color" VARCHAR (80),
	"checkin_status" BOOLEAN DEFAULT false
);