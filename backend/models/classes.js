import { db } from "../database/database.js";

export function Classes(classId, locationId, activityId, userId) {
  return {
    classId,
    locationId,
    activityId,
    userId,
  };
}

export async function getAll() {
  const query = `
      SELECT
          c.classId,
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
          classes u ON c.userId = u.userId;
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
      "INSERT INTO classes (locationId, activityId, userId) " +
        "VALUES (?, ?, ?)",
      [gymClass.locationId, gymClass.activityId, gymClass.userId]
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
        gymClass.locationId,
        gymClass.activityId,
        gymClass.userId,
      ]
    )
    .then(([result]) => {
      return { ...blog, blogId: result.insertId };
    });
}

export async function deleteById(classId) {
  return db.query("DELETE FROM classes WHERE classId = ?", classId);
}
