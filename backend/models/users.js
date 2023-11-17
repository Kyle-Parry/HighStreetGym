import { db } from "../database/database.js";

export function Users(
  userId,
  email,
  password,
  role,
  phone,
  firstName,
  lastName,
  address,
  addressTwo,
  state,
  postCode,
  authKey
) {
  return {
    userId,
    email,
    password,
    role,
    phone,
    firstName,
    lastName,
    address,
    addressTwo,
    state,
    postCode,
    authKey,
  };
}

export async function getByID(userId) {
  const [userResults] = await db.query(
    "SELECT * FROM users WHERE userId = ?",
    userId
  );

  if (userResults.length > 0) {
    const userResult = userResults[0];
    return Promise.resolve(
      Users(
        userResult.userId.toString(),
        userResult.email,
        userResult.password,
        userResult.role,
        userResult.phone,
        userResult.firstName,
        userResult.lastName,
        userResult.address,
        userResult.addressTwo,
        userResult.state,
        userResult.postCode,
        userResult.authKey
      )
    );
  } else {
    return Promise.reject("no results found");
  }
}

export async function getByEmail(email) {
  const [userResults] = await db.query(
    "SELECT userId, email, password FROM users WHERE email = ?",
    [email]
  );

  if (userResults.length > 0) {
    const userResult = userResults[0];

    return new Users(
      userResult.userId,
      userResult.email,
      userResult.password,
      userResult.role,
      userResult.phone,
      userResult.firstName,
      userResult.lastName,
      userResult.address,
      userResult.addressTwo,
      userResult.state,
      userResult.postCode,
      userResult.authKey
    );
  } else {
    return Promise.reject("no results found");
  }
}

export async function getByAuthKey(authKey) {
  const [userResults] = await db.query(
    "SELECT * FROM users WHERE authKey = ?",
    authKey
  );

  if (userResults.length > 0) {
    const userResult = userResults[0];
    return Promise.resolve(
      Users(
        userResult.userId.toString(),
        userResult.email,
        userResult.password,
        userResult.role,
        userResult.phone,
        userResult.firstName,
        userResult.lastName,
        userResult.address,
        userResult.addressTwo,
        userResult.state,
        userResult.postCode,
        userResult.authKey
      )
    );
  } else {
    return Promise.reject("no results found");
  }
}

export async function create(user) {
  return db
    .query(
      "INSERT INTO users (email, password, role, phone, firstName, lastName, address, addressTwo, state, postCode) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.email,
        user.password,
        user.role,
        user.phone,
        user.firstName,
        user.lastName,
        user.address,
        user.addressTwo,
        user.state,
        user.postCode,
      ]
    )
    .then(([result]) => {
      return { ...user, userId: result.insertId };
    });
}

export async function update(user) {
  return db
    .query(
      "UPDATE users SET email = ?, password = ?, phone = ?, firstName = ?, lastName = ?, address = ?, addressTwo = ?, state = ?, postCode = ? WHERE userId = ?",
      [
        user.email,
        user.password,
        user.phone,
        user.firstName,
        user.lastName,
        user.address,
        user.addressTwo,
        user.state,
        user.postCode,
        user.userId,
      ]
    )
    .then(([result]) => {
      return { ...user, userId: result.insertId };
    });
}

export async function updateAuth(user) {
  // Update user record with the new authKey using an SQL UPDATE statement
  const updateSql = "UPDATE users SET authKey = ? WHERE email = ?";
  const values = [user.authKey, user.email];

  try {
    await db.query(updateSql, values);
    console.log(values);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: " + error.message);
  }
}

export async function deleteById(userId) {
  return db.query("DELETE FROM users WHERE userId = ?", userId);
}
