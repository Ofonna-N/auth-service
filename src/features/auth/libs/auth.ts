import prisma from "@/src/services/prisma/client";
import { argon2d } from "argon2";

// Session expiry constants
const SESSION_EXPIRY_DAYS = 7;
const SESSION_EXPIRY_MS = 1000 * 60 * 60 * 24 * SESSION_EXPIRY_DAYS;

/**
 * Generates a cryptographically-secure random string.
 * Uses a human-readable alphabet to avoid confusion between characters like 'l', '1', 'o', '0'.
 * @returns A secure random string.
 */
export function generateSecureRandomString({
  length = 32,
}: { length?: number } = {}): string {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  // Use rejection sampling to avoid modulo bias
  let result = "";
  const maxMultiple = Math.floor(256 / alphabet.length) * alphabet.length;
  let i = 0;
  while (result.length < length) {
    if (i >= array.length) {
      // refill array if needed
      crypto.getRandomValues(array);
      i = 0;
    }
    const byte = array[i++];
    if (byte < maxMultiple) {
      result += alphabet[byte % alphabet.length];
    }
  }
  return result;
}

/**
 * Hashes a session secret using the SHA-256 algorithm.
 * @param secret The secret string to hash.
 * @returns A Uint8Array containing the hash.
 */
export async function hashSecret({
  secret,
}: {
  secret: string;
}): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(secret);
  const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
  return new Uint8Array(secretHashBuffer);
}

/**
 * Compares two Uint8Arrays in constant time to prevent timing attacks.
 * @param a The first byte array.
 * @param b The second byte array.
 * @returns True if the arrays are equal, false otherwise.
 */
export function constantTimeEqual({
  a,
  b,
}: {
  a: Uint8Array;
  b: Uint8Array;
}): boolean {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  let c = 0;
  for (let i = 0; i < a.byteLength; i++) {
    c |= a[i] ^ b[i]; // bitwise XOR
  }
  return c === 0;
}

/**
 * Creates a new session for a given user.
 * @param userId The ID of the user to create a session for.
 * @returns The session token string (id.secret) to be sent to the client.
 */
export async function createSession({ userId }: { userId: string }) {
  const id = generateSecureRandomString();
  const secret = generateSecureRandomString();
  const secretHash = await hashSecret({ secret });
  const token = `${id}.${secret}`;

  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_MS);

  await prisma.session.create({
    data: {
      id,
      userId,
      secretHash: Buffer.from(secretHash), // Convert Uint8Array to Buffer for Prisma's Bytes type
      expiresAt,
    },
  });

  return token;
}

/**
 * Validates a session token from a client.
 * @param token The session token string (id.secret).
 * @returns The user object if the session is valid, otherwise null.
 */
export async function validateSessionToken(token: string) {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const sessionId = parts[0];
  const sessionSecret = parts[1];

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;

  // Check for expiration
  if (session.expiresAt.getTime() <= Date.now()) {
    // Clean up expired session from the database
    await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }

  const tokenSecretHash = await hashSecret({ secret: sessionSecret });
  const validSecret = constantTimeEqual({
    a: tokenSecretHash,
    b: new Uint8Array(session.secretHash),
  });

  if (!validSecret) {
    // Invalid secret - potential security issue. You could log this event.
    return null;
  }
  return session.user;
}

/**
 * Deletes a session from the database, effectively logging the user out.
 * @param token The session token string (id.secret).
 */
export async function deleteSession({ token }: { token: string }) {
  const sessionId = token.split(".")[0];
  if (!sessionId) return;

  // Use a try-catch block to handle cases where the session might already be deleted.
  try {
    await prisma.session.delete({ where: { id: sessionId } });
  } catch (error) {
    // Error deleting session is ignored during logout.
    console.error("Error deleting session:", error);
  }
}
