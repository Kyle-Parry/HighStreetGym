import { db } from "../database/database";

export function User(
  userId,
  email,
  password,
  role,
  firstName,
  lastName,
  authKey
) {
  return {
    userId,
    email,
    password,
    role,
    firstName,
    lastName,
    authKey,
  };
}
