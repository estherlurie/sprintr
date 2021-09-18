import os 
from flask import Flask, request, g
import sqlite3 as sql
from contextlib import closing

DATABASE = "./tasks.db"

app = Flask(__name__)
app.config["DATABASE"] = os.path.join(app.instance_path, DATABASE)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sql.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route("/initdb")
def init_db():
  cur = get_db().cursor()
  with open("schema.sql") as f:
    cur.executescript(f.read())

@app.route("/tasks/get")
def get_tasks():
  with closing(get_db().cursor()) as cur:
    cur.execute("SELECT * FROM tasks")
    tasks = cur.fetchall()
  formatted_tasks = []
  for task in tasks:
    formatted_tasks.append({
      "text": task[1],
      "startDate": task[2],
      "endDate": task[3],
      "category": task[4],
      "energy": task[5]
    })
  return {'tasks': formatted_tasks}

@app.route("/tasks/post", methods=["POST"])
def create_task():
  task = request.json
  print(task)
  with closing(get_db()) as conn:
    with closing(conn.cursor()) as cur:
      params = (
          task["text"],
          task["startDate"],
          task["endDate"],
          task["category"],
          int(task["energy"]))
      cur.execute("""INSERT INTO tasks 
        (taskName, startDate, endDate, category, energy)
        VALUES (?, ?, ?, ?, ?)""", params)
    conn.commit()
  return {}