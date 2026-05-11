import { createHmac, randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error(
    "La variable de entorno ADMIN_SESSION_SECRET no está definida. " +
      "Configúrala antes de iniciar el servidor."
  );
}
const VERIFIED_SECRET: string = SESSION_SECRET;
const COOKIE_NAME = "dunes-admin-session";
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 horas (segundos)
const SESSION_REMEMBER_AGE = 7 * 24 * 60 * 60; // 7 días

// ── Password hashing ─────────────────────────────────────────

/**
 * Genera un hash seguro de la contraseña usando scrypt.
 * Formato: salt:hash (hex)
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verifica una contraseña contra su hash. Usa comparación en tiempo constante
 * para prevenir timing attacks.
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  const storedBuffer = Buffer.from(hash, "hex");
  if (derivedKey.length !== storedBuffer.length) return false;
  return timingSafeEqual(derivedKey, storedBuffer);
}

// ── Session tokens ────────────────────────────────────────────

/**
 * Firma un token de sesión: `payload.hmac`
 * El payload es base64url de `userId:expiry`
 */
export function signSession(userId: string, remember = false): string {
  const maxAge = remember ? SESSION_REMEMBER_AGE : SESSION_MAX_AGE;
  const expiry = Math.floor(Date.now() / 1000) + maxAge;
  const payload = Buffer.from(`${userId}:${expiry}`).toString("base64url");
  const hmac = createHmac("sha256", VERIFIED_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${hmac}`;
}

/**
 * Verifica un token de sesión. Retorna el userId si es válido, null si no.
 */
export function verifySession(token: string): string | null {
  if (!token || !VERIFIED_SECRET) return null;
  const [payload, hmac] = token.split(".");
  if (!payload || !hmac) return null;

  const expectedHmac = createHmac("sha256", VERIFIED_SECRET)
    .update(payload)
    .digest("base64url");

  const expected = Buffer.from(expectedHmac);
  const received = Buffer.from(hmac);
  if (expected.length !== received.length) return null;
  if (!timingSafeEqual(expected, received)) return null;

  const decoded = Buffer.from(payload, "base64url").toString("utf8");
  const [userId, expiryStr] = decoded.split(":");
  const expiry = Number(expiryStr);
  if (!userId || isNaN(expiry) || expiry < Math.floor(Date.now() / 1000)) {
    return null;
  }
  return userId;
}

export { COOKIE_NAME, SESSION_MAX_AGE, SESSION_REMEMBER_AGE };
