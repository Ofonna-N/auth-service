import prisma from "@/src/services/prisma/client";
import { argon2id, hash, verify } from "argon2";
/**
 * Creates a new user in the database with a securely hashed password.
 * @param options An object containing the username and password.
 * @returns The newly created user object.
 */
export async function createUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const passwordHashRaw = await hash(password, {
    type: argon2id,
  });

  const passwordHash =
    typeof passwordHashRaw === "string"
      ? passwordHashRaw
      : passwordHashRaw.toString("base64");

  const user = await prisma.user.create({
    data: {
      username,
      password: {
        create: {
          hash: passwordHash,
        },
      },
    },
  });

  return user;
}

/**
 * Verifies a user's credentials.
 * @param options An object containing the username and password.
 * @returns The user object if credentials are valid, otherwise null.
 */
export async function verifyUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { password: true },
  });

  if (!user || !user.password) return null;

  const isValid = await verify(user.password.hash, password);
  if (!isValid) return null;

  return user;
}
