import sqlite3 as sql
from contextlib import closing
from flask import g

DATABASE = "./tasks.db"

def extract_params(task):
  if task["complete"]:
    complete = 1
  else:
    complete = 0
  return (
      task["text"],
      task["startDate"],
      task["endDate"],
      task["category"],
      int(task["energy"]),
      complete)


def db_path():
  return DATABASE

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
    if task[6] == 1:
      complete = True
    else:
      complete = False
    formatted_tasks.append({
      "id": task[0],
      "text": task[1],
      "startDate": task[2],
      "endDate": task[3],
      "category": task[4],
      "energy": task[5],
      "complete": complete
    })
  return {'tasks': formatted_tasks}

def create_task(task):
  with closing(get_db()) as conn:
    with closing(conn.cursor()) as cur:
      params = extract_params(task)
      cur.execute("""INSERT INTO tasks 
        (taskName, startDate, endDate, category, energy, complete)
        VALUES (?, ?, ?, ?, ?, ?)""", params)
    conn.commit()
  return {}
  
def update_task(task):
  with closing(get_db()) as conn:
    with closing(conn.cursor()) as cur:
      params = (*extract_params(task), task["id"])
      cur.execute("""UPDATE tasks
      SET taskName = ?,
      startDate = ?,
      endDate = ?,
      category = ?,
      energy = ?,
      complete = ?
      WHERE id = ?""", params)
    conn.commit()
  return {}

def delete_task(task):
  with closing(get_db()) as conn:
    with closing(conn.cursor()) as cur:
      print(task)
      cur.execute("""DELETE FROM tasks
      WHERE id = ? """, (task["id"],))
    conn.commit()
  return {}