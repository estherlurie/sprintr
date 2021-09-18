import sqlite3 as sql
from contextlib import closing
from flask import g

DATABASE = "./tasks.db"

def init_db():
  """
  CALL MANUALLY ONCE TO INITIALIZE USING localhost:5000/initdb
  """
  cur = get_db().cursor()
  with open("schema.sql") as f:
    cur.executescript(f.read())

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sql.connect(DATABASE)
    return db

def close_connection():
  db = getattr(g, '_database', None)
  if db is not None:
    db.close()

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

def create_task(task):
  print(task)
  with closing(get_db()) as conn:
    with closing(conn.cursor()) as cur:
      if task["complete"]:
        complete = 1
      else:
        complete = 0
      params = (
          task["text"],
          task["startDate"],
          task["endDate"],
          task["category"],
          int(task["energy"]),
          complete)
      cur.execute("""INSERT INTO tasks 
        (taskName, startDate, endDate, category, energy, complete)
        VALUES (?, ?, ?, ?, ?, ?)""", params)
    conn.commit()