import { describe, expect, it, beforeAll } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSessionToken, verifySessionToken } from "@/lib/auth/session";

// AUTH_SECRET is required by lib/auth/session.ts at request time.
// Set a test-only value before any test runs — never a real secret.
beforeAll(() => {
  process.env.AUTH_SECRET = "test-only-secret-do-not-use-in-production-32ch";
});

describe("Authentication Utilities", () => {
  it("hashes password and verifies correctly", async () => {
    const raw = "superSecurePass123";
    const hashed = await hashPassword(raw);

    expect(hashed).not.toBe(raw);
    expect(hashed.length).toBeGreaterThan(20);

    const isMatch = await verifyPassword(raw, hashed);
    expect(isMatch).toBe(true);

    const isWrong = await verifyPassword("wrongPass", hashed);
    expect(isWrong).toBe(false);
  });

  it("creates and verifies JWT session tokens", async () => {
    const payload = {
      userId: "user_test_123",
      email: "test@ktu.edu.in",
      username: "testuser",
    };

    const token = await createSessionToken(payload);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);

    const verified = await verifySessionToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.userId).toBe("user_test_123");
    expect(verified?.email).toBe("test@ktu.edu.in");
    expect(verified?.username).toBe("testuser");
  });

  it("returns null for invalid JWT tokens", async () => {
    const invalid = "invalid.jwt.token";
    const verified = await verifySessionToken(invalid);
    expect(verified).toBeNull();
  });
});
