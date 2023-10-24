import { db } from "../database/database.js";

export function Bookings(bookingId, userId, classId) {
  return {
    bookingId,
    userId,
    classId,
  };
}

export async function getByID(userId) {
  const query = `
      SELECT
          b.bookingId,
          a.activityName,
          l.locationName,
          c.classDateTime
      FROM
          bookings b
      INNER JOIN
          classes c ON b.classId = c.classId
      INNER JOIN
          activities a ON c.activityId = a.activityId
      INNER JOIN
          location l ON c.locationId = l.locationId
      WHERE
          b.userId = ?
      ORDER BY c.classDateTime;
    `;

  try {
    const [results] = await db.query(query, [userId]);

    if (results.length > 0) {
      return Promise.resolve(results);
    } else {
      return Promise.reject("No bookings found for the user.");
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function create(booking) {
  return db
    .query("INSERT INTO bookings (userId, classId) " + "VALUES (?, ?)", [
      booking.userId,
      booking.classId,
    ])
    .then(([result]) => {
      return { ...booking, bookingId: result.insertId };
    });
}

export async function deleteById(bookingId) {
  return db.query("DELETE FROM bookings WHERE bookingId = ?", bookingId);
}
