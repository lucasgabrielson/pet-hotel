import flask
import psycopg2
from flask import request, jsonify
from psycopg2.extras import RealDictCursor

app = flask.Flask(__name__)
app.config["DEBUG"] = True


connection = psycopg2.connect(
    host="127.0.0.1",
    port="5432",
    database="pet_cemetery"
)

# PETS ROUTES
@app.route('/api/pets', methods=['GET'])
def list_pets():
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    postgreSQL_select_Query = "SELECT * FROM pets"
    cursor.execute(postgreSQL_select_Query)
    pets = cursor.fetchall()
    return pets

@app.route("/api/pets", methods=["POST"])
def add_pet():
    print("this is the request:", request.json)
    print("as a form", request.form)
    owner = request.json["owner"]
    pet = request.json["pet"]
    try:
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        print(pet)
        insertQuery = "INSERT INTO pets (owner_id, name, breed, color, checkin_status) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(insertQuery, (owner["id"], pet["name"], pet["breed"], pet["color"], pet["checkInStatus"]))
        connection.commit()
        count = cursor.rowcount
        print(count, "pet inserted")
        return 201
    except (Exception, psycopg2.Error) as error:
        print("Failed to insert pet", error)
        return 500
    finally:
        if(cursor):
            cursor.close()

# USERS ROUTES
@app.route('/api/owners', methods=['GET'])
def list_owners():
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    postgreSQL_select_Query = "SELECT owners.name, COUNT pets.name FROM owners JOIN pets on owners.id = pets.owner_id"
    cursor.execute(postgreSQL_select_Query)
    users = cursor.fetchall()
    return users

@app.route("/api/owners", methods=["POST"])
def add_owner():
    print("this is the request:", request.json)
    print("as a form", request.form)
    owner = request.json["owner"]
    try:
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        print(owner)
        insertQuery = "INSERT INTO owners (name) VALUES (%s)"
        cursor.execute(insertQuery, (owner["name"],))
        connection.commit()
        count = cursor.rowcount
        print(count, "owner inserted")
        return 201
    except (Exception, psycopg2.Error) as error:
        print("Failed to insert owner", error)
        return 500
    finally:
        if(cursor):
            cursor.close()