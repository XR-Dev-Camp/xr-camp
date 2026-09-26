// env.js: loads server/.env into process.env, before anything else in this
// project reads it. server.js imports this file first, and only for its
// side effect -- ES modules evaluate every static import in the order
// listed, and a module with no dependencies of its own (like this one)
// finishes evaluating completely before the next sibling import even
// starts. That ordering is what lets config.js and db.js read
// process.env.APP_SECRET / DB_FILE correctly: without an env.js imported
// first, those modules -- reached only transitively, through routes.js --
// would already have been evaluated by the time server.js's own top-level
// code got a chance to load .env, too late to see a value it sets.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
try {
  process.loadEnvFile(join(HERE, '.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
