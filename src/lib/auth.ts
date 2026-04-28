import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
const COOKIE_NAME = "bbm_admin_session";

export async function createSession(): Promise<string> {
    const token = await new SignJWT({ admin: true })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("8h")
        .sign(SECRET);
    return token;
}

export async function verifySession(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function getSessionToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value;
}

export async function isAuthenticated(): Promise<boolean> {
    const token = await getSessionToken();
    if (!token) return false;
    return verifySession(token);
}

export { COOKIE_NAME };
