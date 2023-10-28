import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const libsqlClient = createClient({
  url: import.meta.env.TURSO_DB_URL,
  authToken: import.meta.env.TURSO_DB_AUTH_TOKEN,
});

const db = drizzle(libsqlClient);

const listOfUsers = await db.select().from(users).all();
