import { lucia } from 'lucia';
import { astro } from 'lucia/middleware';

export const auth = lucia({
  env: import.meta.env.DEV ? 'DEV' : 'PROD',
  middleware: astro(),
});

export type Auth = typeof auth;
