// auth.js: everything this project knows about turning a secret (a
// password, or a one-time recovery code) into something safe to store, and
// checking a secret against what was stored. Everything here comes
// straight from Node's built-in node:crypto
// (https://nodejs.org/api/crypto.html) and the OWASP Password Storage
// Cheat Sheet. No password or recovery code should ever be stored, logged,
// or sent back to a client in plain text.

import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

// The OWASP Password Storage Cheat Sheet's primary scrypt recommendation:
// N=2**17, r=8, p=1. That costs about r * 128 * N bytes of memory per hash
// (128 MiB here), so scrypt's own default `maxmem` (32 MiB) is too small —
// Node throws "Invalid options: memory limit exceeded" unless maxmem is
// raised. Finished: nothing to do with these two.
export const SCRYPT_PARAMS = { N: 2 ** 17, r: 8, p: 1 };
const KEY_LENGTH = 64;
const SALT_LENGTH = 16; // 128 bits

function memoryFor({ N, r }) {
  return r * 128 * N + 1024 * 1024; // + 1 MiB headroom
}

// TODO 1: finish hashSecret(secret) and verifySecret(secret, stored).
//
// hashSecret(secret) should:
//   1. Generate a random salt: randomBytes(SALT_LENGTH).
//   2. Derive a key: await scrypt(secret, salt, KEY_LENGTH, { ...SCRYPT_PARAMS,
//      maxmem: memoryFor(SCRYPT_PARAMS) }).
//   3. Return one string that carries its own parameters, so a later change
//      to SCRYPT_PARAMS never breaks a hash made under the old settings:
//      `scrypt$${SCRYPT_PARAMS.N}$${SCRYPT_PARAMS.r}$${SCRYPT_PARAMS.p}$${salt.toString('hex')}$${derivedKey.toString('hex')}`.
//
// verifySecret(secret, stored) should:
//   1. Split `stored` on "$"; if it does not have exactly 6 parts starting
//      with "scrypt", return false.
//   2. Read N, r, p, the salt (Buffer.from(saltHex, 'hex')), and the
//      expected hash (Buffer.from(hashHex, 'hex')) back out of it.
//   3. Recompute the hash with the SAME salt and parameters (not today's
//      SCRYPT_PARAMS): await scrypt(secret, salt, expected.length, { N, r,
//      p, maxmem: memoryFor({ N, r }) }).
//   4. Compare the result to `expected` with crypto.timingSafeEqual(actual,
//      expected) — never with `===`, which returns as soon as it finds a
//      mismatched byte, leaking how many leading bytes were already
//      correct (a timing side channel). Return the boolean it gives you.
export async function hashSecret(secret) {
  throw new Error('TODO 1: hashSecret is not implemented yet');
}

export async function verifySecret(secret, stored) {
  throw new Error('TODO 1: verifySecret is not implemented yet');
}

// TODO 2: finish generateRecoveryCode(). Return randomBytes(10) as a hex
// string, split into readable groups of 4 characters joined with "-" (for
// example "a1b2-c3d4-e5f6-a1b2-c3d4"). Hint: "abcdef".match(/.{1,4}/g)
// returns an array of chunks; join it with '-'.
export function generateRecoveryCode() {
  throw new Error('TODO 2: generateRecoveryCode is not implemented yet');
}
