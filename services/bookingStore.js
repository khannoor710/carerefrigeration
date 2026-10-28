import pg from 'pg';

let pool;
let tableReady;

function database() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  return pool;
}

export async function saveBooking(booking) {
  const db = database();
  if (!db) return false;
  if (!tableReady) {
    tableReady = db.query(`CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      customer_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      area TEXT NOT NULL,
      appliance TEXT NOT NULL,
      issue TEXT NOT NULL,
      business_email_sent BOOLEAN NOT NULL DEFAULT false
    )`).catch(error => { tableReady = null; throw error; });
  }
  await tableReady;
  await db.query(
    'INSERT INTO bookings (id, customer_name, email, phone, area, appliance, issue) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [booking.bookingRef, booking.name, booking.email || null, booking.phone || null, booking.area, booking.appliance, booking.issue]
  );
  return true;
}

export async function markBusinessEmailSent(bookingRef) {
  const db = database();
  if (db) await db.query('UPDATE bookings SET business_email_sent = true WHERE id = $1', [bookingRef]);
}
