CREATE TABLE IF NOT EXISTS sessions (
  user_id INTEGER PRIMARY KEY,
  chat_id INTEGER NOT NULL,
  step TEXT NOT NULL,
  data TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS sessions_updated_at_idx ON sessions(updated_at);

CREATE TABLE IF NOT EXISTS customer_contacts (
  user_id INTEGER PRIMARY KEY,
  phone_number TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

