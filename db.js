import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const attendance_tracker_db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
});

// Get data from the attendance database
async function getAttendanceData() {
  const result = await attendance_tracker_db.query("SELECT * FROM attendance");
  return result.rows;
}
async function getUsersData() {
  const result = await attendance_tracker_db.query("SELECT * FROM users");
  return result.rows;
}
async function getMembersData() {
  const result = await attendance_tracker_db.query("SELECT * FROM members");
  return result.rows;
}

// Insert data into the attendance database
async function insertAttendanceData(data) {
  const { person_id, attendance_date, attendance_time, recorded_by } = data;
  const result = await attendance_tracker_db.query(
    "INSERT INTO attendance (person_id, attendance_date, attendance_time, recorded_by) VALUES ($1, $2, $3, $4)",
    [person_id, attendance_date, attendance_time, recorded_by],
  );
  return result;
}

async function insertMembersData(data) {
  const { first_name, last_name, date_of_birth, start_date } = data;
  const result = await attendance_tracker_db.query(
    "INSERT INTO members (first_name, last_name, date_of_birth, start_date) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, date_of_birth, start_date],
  );
  return result;
}

async function insertUsersData(data) {
  const { person_id, email, password, role } = data;
  const result = await attendance_tracker_db.query(
    "INSERT INTO users (person_id, email, password, role) VALUES ($1, $2, $3, $4)",
    [person_id, email, password, role],
  );
  return result;
}

// Export the functions for use in other modules
export {
  getAttendanceData,
  getUsersData,
  getMembersData,
  insertAttendanceData,
  insertMembersData,
  insertUsersData,
};
