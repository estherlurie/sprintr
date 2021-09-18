import os 
from flask import Flask, request, g
import sqlite3 as sql
from contextlib import closing
import data_accessor as da

app = Flask(__name__)
app.config["DATABASE"] = os.path.join(app.instance_path, DATABASE)

@app.teardown_appcontext
def close_connection(exception):
  da.close_connection()

@app.route("/initdb")
def init_db():
  da.init_db()

@app.route("/tasks/get")
def get_tasks():
  return da.get_tasks()

@app.route("/tasks/post", methods=["POST"])
def create_task():
  task = request.json
  return da.create_task(task)