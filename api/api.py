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



@app.route("/api/pets", methods=["POST"])
def get_pets():
    print("this is the request:", request.json)
    print("as a form", request.form)
    pet = request.json
    try:
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        print(pet)
        insertQuery = "INSERT INTO pets (name, breed, color, checkInStatus) VALUES (%s, %s, %s, %s)"
        cursor.execute(insertQuery, (pet["name"], pet["breed"], pet["color"], pet["checkInStatus"]))
        connection.commit()
        count = cursor.rowcount
        print(count, "pet inserted")
        return 201
    except (Exception, psycopg2.Error) as error:
        # there was a problem 
        print("Failed to insert pet", error)
        # respond with error
        return 500
    finally:
        if(cursor):
            cursor.close()



@app.route('/api/pets', methods=['GET'])
def list_pets():
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    postgreSQL_select_Query = "SELECT * FROM pets"
    cursor.execute(postgreSQL_select_Query)
    pets = cursor.fetchall()
    return pets
