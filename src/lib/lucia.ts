import { lucia } from 'lucia';
import { astro } from 'lucia/middleware';
import { libsqlClient } from './db.js';
import { libsql } from '@lucia-auth/adapter-sqlite';

export const auth = lucia({
  env: import.meta.env.DEV ? 'DEV' : 'PROD',
  middleware: astro(),
  adapter: libsql(libsqlClient, {
    user: 'user',
    session: 'user_session',
    key: 'user_key',
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;
