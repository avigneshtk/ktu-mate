import { test, expect } from "@playwright/test";

test("Avigu primary chat flow", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    const body = [
      `data: ${JSON.stringify({
        type: "start",
        messageId: "mock-assistant-1",
      })}\n\n`,

      `data: ${JSON.stringify({
        type: "text-start",
        id: "mock-text-1",
      })}\n\n`,

      `data: ${JSON.stringify({
        type: "text-delta",
        id: "mock-text-1",
        delta: "Hello! This is a mocked Avigu response.",
      })}\n\n`,

      `data: ${JSON.stringify({
        type: "text-end",
        id: "mock-text-1",
      })}\n\n`,

      `data: ${JSON.stringify({
        type: "finish",
      })}\n\n`,

      `data: [DONE]\n\n`,
    ].join("");

    await route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      headers: {
        "x-vercel-ai-ui-message-stream": "v1",
      },
      body,
    });
  });

  await page.goto("/avigu");

  await expect(
    page.getByRole("heading", {
      name: "Hi! I'm Avigu",
    })
  ).toBeVisible();

  const input = page.getByPlaceholder(
    "Ask Avigu something..."
  );

  await input.fill("Explain binary search");

  await expect(input).toHaveValue(
    "Explain binary search"
  );

  const sendButton = page.getByRole("button", {
    name: "Send",
  });

  await expect(sendButton).toBeEnabled();

  await sendButton.click();

  await expect(
    page.getByText("Explain binary search")
  ).toBeVisible();

  await expect(
    page.getByText(
      "Hello! This is a mocked Avigu response."
    )
  ).toBeVisible();
});