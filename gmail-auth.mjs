import fs from "fs";
import http from "http";
import { google } from "googleapis";

const CLIENT_FILE = "./gmail-oauth-client.json";
const TOKEN_FILE = "./gmail-token.json";
const PORT = 3001;
const REDIRECT_URI = `http://127.0.0.1:${PORT}`;

console.log("\n📧 KTU Mate Gmail Authorization\n");

if (!fs.existsSync(CLIENT_FILE)) {
  console.error("❌ gmail-oauth-client.json not found.");
  console.error("Make sure it is in the project root.");
  process.exit(1);
}

const credentials = JSON.parse(
  fs.readFileSync(CLIENT_FILE, "utf8")
);

const { client_id, client_secret } = credentials.installed;

if (!client_id || !client_secret) {
  console.error("❌ Invalid Google OAuth client file.");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  REDIRECT_URI
);

const scopes = [
  "https://www.googleapis.com/auth/gmail.send",
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  prompt: "consent",
});

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, REDIRECT_URI);

    if (url.pathname !== "/") {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });

      res.end("Not found.");
      return;
    }

    const error = url.searchParams.get("error");

    if (error) {
      console.error(`\n❌ Google authorization failed: ${error}`);

      res.writeHead(400, {
        "Content-Type": "text/html",
      });

      res.end(`
        <h1>Authorization failed</h1>
        <p>Google returned: ${error}</p>
        <p>You can close this tab.</p>
      `);

      setTimeout(() => server.close(), 1000);
      return;
    }

    const code = url.searchParams.get("code");

    if (!code) {
      console.error("\n❌ Authorization code missing.");

      res.writeHead(400, {
        "Content-Type": "text/html",
      });

      res.end(`
        <h1>Authorization code missing</h1>
        <p>You can close this tab.</p>
      `);

      return;
    }

    console.log("\n🔄 Exchanging authorization code...");

    const { tokens } = await oauth2Client.getToken(code);

    fs.writeFileSync(
      TOKEN_FILE,
      JSON.stringify(tokens, null, 2),
      "utf8"
    );

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`
      <html>
        <head>
          <title>KTU Mate Gmail Authorization</title>
        </head>

        <body>
          <h1>✅ Authorization Successful!</h1>
          <p>KTU Mate is now authorized to send emails.</p>
          <p>You can safely close this tab.</p>
        </body>
      </html>
    `);

    console.log("\n✅ Gmail authorization successful!");
    console.log(`✅ Token saved to ${TOKEN_FILE}`);
    console.log("\n🔐 Keep gmail-token.json private.");
    console.log("🚀 You can now close this terminal.");

    setTimeout(() => {
      server.close();
    }, 1000);

  } catch (error) {
    console.error("\n❌ Authorization failed.");
    console.error(error.message);

    res.writeHead(500, {
      "Content-Type": "text/html",
    });

    res.end(`
      <h1>❌ Authorization Failed</h1>
      <p>Check the terminal for details.</p>
    `);

    setTimeout(() => {
      server.close();
    }, 1000);
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("🚀 Local OAuth server started.");
  console.log(`📡 Listening on ${REDIRECT_URI}`);
  console.log("\n👉 Open this URL in your browser:\n");
  console.log(authUrl);
  console.log("\n");
});