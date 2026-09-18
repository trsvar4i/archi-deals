CREATE TABLE IF NOT EXISTS sessions (
  user_id INTEGER PRIMARY KEY,
  chat_id INTEGER NOT NULL,
  step TEXT NOT NULL,
  data TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS sessions_updated_at_idx ON sessions(updated_at);

