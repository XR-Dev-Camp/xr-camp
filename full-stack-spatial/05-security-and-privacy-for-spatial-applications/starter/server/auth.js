// auth.js: carried over unchanged from Courses 5.2-5.4. Nothing here is
// invented: the parameters come straight from Node's built-in node:crypto
// (https://nodejs.org/api/crypto.html) and the OWASP Password Storage
// Cheat Sheet's primary scrypt recommendation (checked against the cheat
// sheet directly, 2026). No password is ever stored, logged, or sent back
// to a client in plain text after this point.
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

export const SCRYPT_PARAMS = { N: 2 ** 17, r: 8, p: 1 };
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

function memoryFor({ N, r }) {
  return r * 128 * N + 1024 * 1024;
}

// Returns one self-describing string: "scrypt$N$r$p$saltHex$hashHex".
export async function hashSecret(secret) {
  const salt = randomBytes(SALT_LENGTH);
  const derivedKey = await scrypt(secret, salt, KEY_LENGTH, {
    ...SCRYPT_PARAMS,
    maxmem: memoryFor(SCRYPT_PARAMS),
  });
  return `scrypt$${SCRYPT_PARAMS.N}$${SCRYPT_PARAMS.r}$${SCRYPT_PARAMS.p}$${salt.toString('hex')}$${derivedKey.toString('hex')}`;
}

// Recomputes the hash with the stored salt and cost parameters, then
// compares with crypto.timingSafeEqual instead of `===`, so how long the
// comparison takes never leaks how many leading bytes matched.
export async function verifySecret(secret, stored) {
  if (typeof stored !== 'string') return false;
  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;

  const [, nText, rText, pText, saltHex, hashHex] = parts;
  const params = { N: Number(nText), r: Number(rText), p: Number(pText) };
  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');

  const actual = await scrypt(secret, salt, expected.length, {
    ...params,
    maxmem: memoryFor(params),
  });
  return timingSafeEqual(actual, expected);
}
