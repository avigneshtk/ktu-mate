import { google } from "googleapis";

function createOAuthClient() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  if (!clientId) {
    throw new Error("GMAIL_CLIENT_ID is not configured.");
  }

  if (!clientSecret) {
    throw new Error("GMAIL_CLIENT_SECRET is not configured.");
  }

  if (!refreshToken) {
    throw new Error("GMAIL_REFRESH_TOKEN is not configured.");
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return oauth2Client;
}

function createRawEmail(
  to: string,
  subject: string,
  text: string
) {
  const sender = process.env.GMAIL_SENDER_EMAIL;

  if (!sender) {
    throw new Error("GMAIL_SENDER_EMAIL is not configured.");
  }

  const message = [
    `From: KTU Mate <${sender}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    text,
  ].join("\r\n");

  return Buffer.from(message).toString("base64url");
}

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const auth = createOAuthClient();

  const gmail = google.gmail({
    version: "v1",
    auth,
  });

  const raw = createRawEmail(
    to,
    subject,
    text
  );

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });

  return response.data;
}