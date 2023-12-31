import { env } from './env';
import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './src/**/*.model.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
};

export default config;
