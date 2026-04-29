import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://dummy-url-for-build.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN || "dummy-token-for-build",
});

export async function initDb() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('image','audio','video','document')),
      url TEXT NOT NULL,
      r2_key TEXT NOT NULL,
      size INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sermons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      preacher TEXT NOT NULL,
      date TEXT NOT NULL,
      audio_url TEXT,
      audio_key TEXT,
      thumbnail_url TEXT,
      thumbnail_key TEXT,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT,
      location TEXT,
      flyer_url TEXT,
      flyer_key TEXT,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Migration: add time column if it doesn't exist on existing DBs
  try {
    await db.execute(`ALTER TABLE events ADD COLUMN time TEXT DEFAULT ''`);
  } catch {
    // Column already exists — safe to ignore
  }
}

/**
 * Helper for Server Components to safely query the database.
 * Ensures tables are created before returning the client.
 */
export async function getDb() {
  await initDb();
  return db;
}

export default db;
