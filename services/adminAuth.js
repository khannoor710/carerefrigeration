import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

const sessions = new Map();
const loginAttempts = new Map();
const SESSION_MS = 12 * 60 * 60 * 1000;
const COOKIE = 'care_admin';

function hash(value) {
  return createHash('sha256').update(value).digest();
}

function cookieValue(req) {
  const entry = (req.headers.cookie || '').split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE}=`));
  return entry?.slice(COOKIE.length + 1);
}

function cookieOptions() {
  return { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/' };
}

export function adminSession(req) {
  const token = cookieValue(req);
  if (!token) return false;
  const expiry = sessions.get(token);
  if (!expiry || expiry < Date.now()) {
    sessions.delete(token);
    return false;
  }
  return true;
}

export function requireAdmin(req, res, next) {
  if (!adminSession(req)) return res.status(401).json({ error: 'Admin sign-in required' });
  next();
}

export function loginAdmin(req, res) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return res.status(503).json({ error: 'Admin access is not configured' });

  const key = req.ip || 'unknown';
  const attempt = loginAttempts.get(key) || { count: 0, reset: Date.now() + 15 * 60 * 1000 };
  if (Date.now() > attempt.reset) { attempt.count = 0; attempt.reset = Date.now() + 15 * 60 * 1000; }
  if (attempt.count >= 5) return res.status(429).json({ error: 'Too many sign-in attempts. Try again later.' });

  const suppliedUser = String(req.body?.username || '');
  const suppliedPassword = String(req.body?.password || '');
  const userMatch = timingSafeEqual(hash(suppliedUser), hash(username));
  const passwordMatch = timingSafeEqual(hash(suppliedPassword), hash(password));
  if (!userMatch || !passwordMatch) {
    attempt.count += 1;
    loginAttempts.set(key, attempt);
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  loginAttempts.delete(key);
  const token = randomBytes(32).toString('hex');
  sessions.set(token, Date.now() + SESSION_MS);
  res.cookie(COOKIE, token, { ...cookieOptions(), maxAge: SESSION_MS });
  return res.json({ authenticated: true });
}

export function logoutAdmin(req, res) {
  const token = cookieValue(req);
  if (token) sessions.delete(token);
  res.clearCookie(COOKIE, cookieOptions());
  res.json({ authenticated: false });
}
