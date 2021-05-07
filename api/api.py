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
    print("in /api/pets GET")
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    postgreSQL_select_Query = "SELECT pets.name, pets.breed, pets.color, pets.checkin_status, owners.name AS owner_name, pets.owner_id, pets.id FROM pets JOIN owners on owners.id = pets.owner_id;"
    cursor.execute(postgreSQL_select_Query)
    pets = cursor.fetchall()
    return jsonify(pets)

@app.route("/api/pets", methods=["POST"])
def add_pet():
    print("in /api/pets POST with request:", request.json)
    print("as a form", request.form)
    owner = request.json["owner_id"]
    try:
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        insertQuery = "INSERT INTO pets (owner_id, name, breed, color, checkin_status) VALUES (%s, %s, %s, %s, %s);"
        cursor.execute(insertQuery, (owner, request.json["name"], request.json["color"], request.json["breed"], request.json["checkin_status"]))
        connection.commit()
        count = cursor.rowcount
        print(count, "pet inserted")
        return "201"
    except (Exception, psycopg2.Error) as error:
        print("Failed to insert pet", error)
        return "500"
    finally:
        if(cursor):
            cursor.close()

@app.route('/api/pets', methods=['PUT'])
def update_pets():
    print("in /api/pets PUT with request:", request.json)
    pet = request.json["pet"]
    if (pet["checkInStatus"] == true):
        pet["checkInStatus"] = false
    else:
        pet["checkInStatus"] = true
    try:
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        print(pet)
        insertQuery = "UPDATE pets SET checkin_status =" + pet["checkInStatus"] + "WHERE id = (%s)"
        cursor.execute(insertQuery, (pet["id"],))
        connection.commit()
        count = cursor.rowcount
        print(count, "pet updated")
        return 201
    except (Exception, psycopg2.Error) as error:
        print("Failed to update pet", error)
        return 500
    finally:
        if(cursor):
            cursor.close()


# OWNERS ROUTES
@app.route('/api/owners', methods=['GET'])
def list_owners():
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    postgreSQL_select_Query = "SELECT owners.name, owners.id, COUNT (pets.name) FROM owners LEFT JOIN pets ON owners.id = pets.owner_id GROUP BY owners.name, owners.id"
    cursor.execute(postgreSQL_select_Query)
    users = cursor.fetchall()
    print(users)
    return jsonify(users)

@app.route( '/api/owners/', methods=['POST'] )
def create_owner():
    print('request.json is a dict!', request.json)
    print('if you\'re using multipart/form data, use request.form instead!', request.form)
    print(request.json)
    name = request.json['name']
    try:
        # Avoid getting arrays of arrays!
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        print( 'owner:', name )
        insertQuery = "INSERT INTO owners ( name ) VALUES ( %s )"
        # if only only one param, still needs to be a tuple --> cursor.execute(insertQuery, (title,)) <-- comma matters!
        cursor.execute(insertQuery, ( name, ))
        # really for sure commit the query
        connection.commit()
        count = cursor.rowcount
        print(count, "Owner added")
        # respond nicely
        result = {'status': 'CREATED'}
        return jsonify(result), 201
    except (Exception, psycopg2.Error) as error:
        # there was a problem
        print("Failed to add owner", error)
        # respond with error
        result = {'status': 'ERROR'}
        return jsonify(result), 500
    finally:
        # clean up our cursor
        if(cursor):
            cursor.close()

@app.route( '/api/owners/', methods=['DELETE'] )
def delete_owner():
    print('request.json is a dict!', request.json)
    print('if you\'re using multipart/form data, use request.form instead!', request.form)
    print(request.json)
    name = request.json['name']
    id = request.json['id']
    try:
        # Avoid getting arrays of arrays!
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        print( 'owner:', name )
        print( 'id:', id)
        insertQuery = "DELETE FROM owners WHERE name = ( %s ) AND id = ( %s )"
        # if only only one param, still needs to be a tuple --> cursor.execute(insertQuery, (title,)) <-- comma matters!
        cursor.execute(insertQuery, ( name, id))
        # really for sure commit the query
        connection.commit()
        count = cursor.rowcount
        print(count, "Owner deleted")
        # respond nicely
        result = {'status': 'DELETED'}
        return jsonify(result), 200
    except (Exception, psycopg2.Error) as error:
        # there was a problem
        print("Failed to delete owner", error)
        # respond with error
        result = {'status': 'ERROR'}
        return jsonify(result), 500
    finally:
        # clean up our cursor
        if(cursor):
            cursor.close()

