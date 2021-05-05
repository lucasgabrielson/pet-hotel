import time
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

@app.route('/time')
def get_current_time():
    return {'time': time.time()}