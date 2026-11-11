
import { test, expect } from "@playwright/test";
import { SignJWT } from "jose";

async function createTestToken() {
  const secret = new TextEncoder().encode(
    process.env.AUTH_SECRET!
  );

  return new SignJWT({
    userId: "playwright-test-user",
    email: "playwright@example.com",
    username: "playwright",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

test.describe("Authentication Route Protection", () => {
  test("redirects unauthenticated users from dashboard to login", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(
      /\/login\?redirect=%2Fdashboard/
    );
  });

  test("redirects unauthenticated users from profile to login", async ({
    page,
  }) => {
    await page.goto("/profile");

    await expect(page).toHaveURL(
      /\/login\?redirect=%2Fprofile/
    );
  });

  test("redirects users with an invalid JWT from dashboard to login", async ({
    page,
  }) => {
    await page.context().addCookies([
      {
        name: "ktu_session",
        value: "invalid.jwt.token",
        url: "http://localhost:3000",
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);

    await page.goto("/dashboard");

    await expect(page).toHaveURL(
      /\/login\?redirect=%2Fdashboard/
    );
  });

  test("redirects authenticated users from login to dashboard", async ({
    page,
  }) => {
    const token = await createTestToken();

    await page.context().addCookies([
      {
        name: "ktu_session",
        value: token,
        url: "http://localhost:3000",
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);

    const response = await page.request.get("/login", {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(307);
    expect(response.headers()["location"]).toContain("/dashboard");
  });

  test("redirects unauthenticated users from Avigu to login", async ({
    page,
  }) => {
    await page.goto("/avigu");

    await expect(page).toHaveURL(/\/login/);
  });
});
