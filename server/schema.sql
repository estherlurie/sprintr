CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  taskName TEXT,
  startDate DATE,
  endDate DATE,
  category TEXT,
  energy INTEGER,
  complete INTEGER
)