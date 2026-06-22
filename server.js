const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

loadEnvFile();

const PORT = Number(process.env.PORT || 8080);
const APP_BASE_URL = (process.env.APP_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, "");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${APP_BASE_URL}/api/auth/google/callback`;
const SHEET_NAME = "Trade Daily Backup";
const DATA_DIR = path.join(__dirname, ".data");
const USER_STORE = path.join(DATA_DIR, "users.json");
const SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/spreadsheets"
].join(" ");

const pendingStates = new Map();
let users = loadUsers();

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(USER_STORE, "utf8"));
  } catch {
    return {};
  }
}

function saveUsers() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(USER_STORE, JSON.stringify(users, null, 2));
}

function send(res, status, body, headers = {}) {
  const isObject = typeof body === "object" && body !== null;
  const payload = isObject ? JSON.stringify(body) : String(body || "");
  res.writeHead(status, {
    "Content-Type": isObject ? "application/json; charset=utf-8" : "text/plain; charset=utf-8",
    ...headers
  });
  res.end(payload);
}

function parseCookies(req) {
  return Object.fromEntries((req.headers.cookie || "")
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .map((cookie) => {
      const index = cookie.indexOf("=");
      return [cookie.slice(0, index), decodeURIComponent(cookie.slice(index + 1))];
    }));
}

function cookie(name, value, maxAge = 60 * 60 * 24 * 30) {
  const secure = APP_BASE_URL.startsWith("https://") ? "; Secure" : "";
  return `${name}=${encodeURIComponent(value)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`;
}

function sessionIdFromRequest(req) {
  const cookies = parseCookies(req);
  const id = cookies.td_session;
  return id && users[id] ? id : "";
}

function redirect(res, location, headers = {}) {
  res.writeHead(302, { Location: location, ...headers });
  res.end();
}

function randomId(bytes = 24) {
  return crypto.randomBytes(bytes).toString("base64url");
}

function requireGoogleConfig(res) {
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) return true;
  send(res, 500, {
    error: "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET on the server"
  });
  return false;
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function googleFetch(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error?.message || data.error || "Google request failed";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return data;
}

async function ensureAccessToken(user) {
  const now = Date.now();
  if (user.token.access_token && user.token.expires_at && user.token.expires_at - 60000 > now) {
    return user.token;
  }
  if (!user.token.refresh_token) {
    const error = new Error("Google reconnect required");
    error.status = 401;
    throw error;
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    refresh_token: user.token.refresh_token,
    grant_type: "refresh_token"
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error_description || data.error || "Token refresh failed");
    error.status = 401;
    throw error;
  }

  user.token = {
    ...user.token,
    access_token: data.access_token,
    expires_at: now + Number(data.expires_in || 3600) * 1000
  };
  saveUsers();
  return user.token;
}

async function exchangeCodeForToken(code) {
  const params = new URLSearchParams({
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code"
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || data.error || "OAuth token exchange failed");
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + Number(data.expires_in || 3600) * 1000
  };
}

async function getGoogleProfile(token) {
  const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${token.access_token}` }
  });
  if (!response.ok) return {};
  return response.json();
}

function rowsFromTrades(payload) {
  const trades = Array.isArray(payload.trades) ? payload.trades : [];
  return [
    ["Backup Time", "Date", "Asset", "Asset Type", "PnL", "Notes", "Trade ID"],
    ...trades.map((trade) => [
      payload.backedUpAt || new Date().toISOString(),
      trade.date || "",
      trade.asset || "",
      trade.type || "",
      Number(trade.pnl || 0),
      trade.notes || "",
      trade.id || ""
    ])
  ];
}

async function ensureSpreadsheet(user) {
  const token = await ensureAccessToken(user);
  if (user.spreadsheetId) return user.spreadsheetId;

  const spreadsheet = await googleFetch("https://sheets.googleapis.com/v4/spreadsheets", token, {
    method: "POST",
    body: JSON.stringify({
      properties: { title: "Trade Daily Backup" },
      sheets: [{ properties: { title: SHEET_NAME } }]
    })
  });

  user.spreadsheetId = spreadsheet.spreadsheetId;
  user.spreadsheetUrl = spreadsheet.spreadsheetUrl;
  saveUsers();
  return user.spreadsheetId;
}

async function backupTrades(user, payload) {
  const token = await ensureAccessToken(user);
  const spreadsheetId = await ensureSpreadsheet(user);
  const rows = rowsFromTrades(payload);
  const range = `'${SHEET_NAME}'!A1:G${rows.length}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  await googleFetch(url, token, {
    method: "PUT",
    body: JSON.stringify({ values: rows })
  });
  return {
    backedUpAt: payload.backedUpAt || new Date().toISOString(),
    rows: rows.length - 1,
    spreadsheetId,
    spreadsheetUrl: user.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
  };
}

async function importTrades(user) {
  const token = await ensureAccessToken(user);
  if (!user.spreadsheetId) return { trades: [] };
  const range = `'${SHEET_NAME}'!A2:G`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${user.spreadsheetId}/values/${encodeURIComponent(range)}`;
  const data = await googleFetch(url, token);
  const trades = (data.values || []).map((row) => ({
    date: row[1] || "",
    asset: row[2] || "",
    type: row[3] || "other",
    pnl: Number(row[4] || 0),
    notes: row[5] || "",
    id: row[6] || randomId(8)
  })).filter((trade) => trade.date && trade.asset);
  return { trades };
}

function serveStatic(req, res) {
  const url = new URL(req.url, APP_BASE_URL);
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(__dirname, requested));
  if (!filePath.startsWith(__dirname)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8"
    }[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
}

async function handleApi(req, res) {
  const url = new URL(req.url, APP_BASE_URL);
  const sessionId = sessionIdFromRequest(req);
  const user = sessionId ? users[sessionId] : null;

  if (req.method === "GET" && url.pathname === "/api/auth/status") {
    send(res, 200, user ? {
      connected: true,
      email: user.email || "",
      spreadsheetId: user.spreadsheetId || "",
      spreadsheetUrl: user.spreadsheetUrl || ""
    } : { connected: false });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/auth/google/start") {
    if (!requireGoogleConfig(res)) return;
    const state = randomId();
    pendingStates.set(state, Date.now());
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", SCOPES);
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("access_type", "offline");
    authUrl.searchParams.set("prompt", "consent");
    authUrl.searchParams.set("include_granted_scopes", "true");
    redirect(res, authUrl.toString());
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/auth/google/callback") {
    if (!requireGoogleConfig(res)) return;
    const state = url.searchParams.get("state") || "";
    const code = url.searchParams.get("code") || "";
    if (!state || !pendingStates.has(state) || !code) {
      send(res, 400, "Invalid Google OAuth callback");
      return;
    }
    pendingStates.delete(state);
    try {
      const token = await exchangeCodeForToken(code);
      const profile = await getGoogleProfile(token);
      const id = randomId();
      users[id] = {
        email: profile.email || "",
        name: profile.name || "",
        token
      };
      saveUsers();
      redirect(res, "/", { "Set-Cookie": cookie("td_session", id) });
    } catch (error) {
      send(res, 500, error.message);
    }
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/auth/logout") {
    redirect(res, "/", { "Set-Cookie": cookie("td_session", "", 0) });
    return;
  }

  if (!user) {
    send(res, 401, { error: "Google account is not connected" });
    return;
  }

  try {
    if (req.method === "POST" && url.pathname === "/api/sheets/backup") {
      const payload = await readJsonBody(req);
      send(res, 200, await backupTrades(user, payload));
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/sheets/import") {
      send(res, 200, await importTrades(user));
      return;
    }
  } catch (error) {
    send(res, error.status || 500, { error: error.message });
    return;
  }

  send(res, 404, { error: "Unknown API route" });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/")) {
    handleApi(req, res).catch((error) => send(res, 500, { error: error.message }));
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Trade Daily running at ${APP_BASE_URL}`);
  console.log(`Google redirect URI: ${REDIRECT_URI}`);
});
