import { db } from "../database/database.js";

export function Classes(
  classId,
  classDateTime,
  locationId,
  activityId,
  userId
) {
  return {
    classId,
    classDateTime,
    locationId,
    activityId,
    userId,
  };
}

export async function getAll() {
  const query = `
      SELECT
          c.classId,
          c.classDateTime,
          a.activityName,
          a.activityDur,
          l.locationName,
          u.firstName, 
          u.lastName
      FROM
          classes c
      INNER JOIN
          activities a ON c.activityId = a.activityId
      INNER JOIN
          location l ON c.locationId = l.locationId
      INNER JOIN
          users u ON c.userId = u.userId
          WHERE c.classDateTime > NOW();
    `;

  try {
    const [results] = await db.query(query);

    if (results.length > 0) {
      return Promise.resolve(results);
    } else {
      return Promise.reject("No classes found");
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function create(gymClass) {
  return db
    .query(
      "INSERT INTO classes (classDateTime, locationId, activityId, userId) " +
        "VALUES (?, ?, ?, ?)",
      [
        gymClass.classDateTime,
        gymClass.locationId,
        gymClass.activityId,
        gymClass.userId,
      ]
    )
    .then(([result]) => {
      return { ...gymClass, classId: result.insertId };
    });
}

export async function update(gymClass) {
  return db
    .query(
      "UPDATE classes SET locationId = ?, activityId = ?, userId = ? WHERE classId = ?",
      [
        gymClass.classId,
        gymClass.classDateTime,
        gymClass.locationId,
        gymClass.activityId,
        gymClass.userId,
      ]
    )
    .then(([result]) => {
      return { ...gymClass, classId: result.insertId };
    });
}

export async function deleteById(classId) {
  return db.query("DELETE FROM classes WHERE classId = ?", classId);
}
