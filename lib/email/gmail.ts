import fs from "fs";
import path from "path";
import { google } from "googleapis";

const CLIENT_FILE = path.join(
  process.cwd(),
  "gmail-oauth-client.json"
);

const TOKEN_FILE = path.join(
  process.cwd(),
  "gmail-token.json"
);

function createOAuthClient() {
  if (!fs.existsSync(CLIENT_FILE)) {
    throw new Error("gmail-oauth-client.json not found.");
  }

  if (!fs.existsSync(TOKEN_FILE)) {
    throw new Error("gmail-token.json not found.");
  }

  const credentials = JSON.parse(
    fs.readFileSync(CLIENT_FILE, "utf8")
  );

  const tokens = JSON.parse(
    fs.readFileSync(TOKEN_FILE, "utf8")
  );

  const { client_id, client_secret } = credentials.installed;

  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret
  );

  oauth2Client.setCredentials(tokens);

  return oauth2Client;
}

function createRawEmail(
  to: string,
  subject: string,
  text: string
) {
  const sender = process.env.GMAIL_SENDER_EMAIL;

  if (!sender) {
    throw new Error(
      "GMAIL_SENDER_EMAIL is not configured."
    );
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

  return Buffer.from(message)
    .toString("base64url");
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