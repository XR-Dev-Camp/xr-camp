// auth.js: everything this project knows about turning a secret (a
// password, or a one-time recovery code) into something safe to store, and
// checking a secret against what was stored. Nothing here is invented: the
// parameters and functions come straight from Node's built-in node:crypto
// (https://nodejs.org/api/crypto.html) and the OWASP Password Storage
// Cheat Sheet. No password or recovery code is ever stored, logged, or sent
// back to a client in plain text after this point.

import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

// The OWASP Password Storage Cheat Sheet's primary scrypt recommendation
// (checked against the cheat sheet directly, 2026): N=2**17, r=8, p=1. That
// costs about r * 128 * N bytes of memory per hash — 128 MiB here — so
// scrypt's own default `maxmem` (32 MiB) is too small: Node throws
// "Invalid options: memory limit exceeded" unless maxmem is raised to at
// least that much. On a slow or shared classroom machine, hashing at this
// cost can take around half a second; that is the point, not a bug — it is
// exactly as slow for an attacker trying every password in a stolen file.
export const SCRYPT_PARAMS = { N: 2 ** 17, r: 8, p: 1 };
const KEY_LENGTH = 64;
const SALT_LENGTH = 16; // 128 bits, Node's own crypto examples use the same size

function memoryFor({ N, r }) {
  return r * 128 * N + 1024 * 1024; // + 1 MiB headroom
}

// Hashes a password (or a recovery code — the same function serves both,
// since both are "a secret only this account's owner should know").
// Returns one self-describing string: "scrypt$N$r$p$saltHex$hashHex". The
// cost parameters travel with the hash, so a later change to SCRYPT_PARAMS
// (Course 5.5 discusses when and how) never breaks a password hashed under
// the old settings — verifySecret() below always uses the parameters
// stored with that particular hash, not today's constant.
export async function hashSecret(secret) {
  const salt = randomBytes(SALT_LENGTH);
  const derivedKey = await scrypt(secret, salt, KEY_LENGTH, {
    ...SCRYPT_PARAMS,
    maxmem: memoryFor(SCRYPT_PARAMS),
  });
  return `scrypt$${SCRYPT_PARAMS.N}$${SCRYPT_PARAMS.r}$${SCRYPT_PARAMS.p}$${salt.toString('hex')}$${derivedKey.toString('hex')}`;
}

// Recomputes the hash with the same salt and cost parameters that were
// stored, then compares the two hashes with crypto.timingSafeEqual instead
// of `===`. A plain `===` on a hash compares left to right and returns as
// soon as it finds a mismatched byte, so how long the comparison takes
// leaks how many leading bytes were correct — a timing side channel an
// attacker can use to guess a hash one byte at a time.
// timingSafeEqual always takes the same time for two buffers of the same
// length, and throws if the lengths differ, so both buffers here are built
// to the same length (KEY_LENGTH, recovered from the stored hash's own
// length) before it is ever called.
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

// A recovery code a learner writes down once, at registration (Step 6):
// 10 random bytes as hex, split into groups for readability, e.g.
// "a1b2-c3d4-e5f6-a1b2-c3d4". It is stored the same way a password is —
// hashed with hashSecret(), never in plain text — and is single-use: Step
// 6's recovery route replaces it with a new one every time it is spent.
export function generateRecoveryCode() {
  return randomBytes(10).toString('hex').match(/.{1,4}/g).join('-');
}
