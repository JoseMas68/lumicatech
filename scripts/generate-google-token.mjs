/**
 * Script para generar un refresh_token de Google Calendar permanente.
 *
 * Uso:
 *   node scripts/generate-google-token.mjs
 *
 * Pasos:
 *   1. Asegúrate de añadir "http://localhost:3000" como URI de redireccionamiento
 *      autorizado en Google Cloud Console → Credenciales → tu cliente OAuth.
 *   2. Crea un archivo .env.local con GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET.
 *   3. Ejecuta este script.
 *   4. Abre la URL que aparece en la terminal.
 *   5. Autoriza el acceso y copia el código de la URL de retorno (?code=...).
 *   6. Pégalo cuando el script lo pida.
 *   7. Copia el refresh_token que aparece y actualiza GOOGLE_REFRESH_TOKEN en .env.local
 */

import { createInterface } from "readline";
import { google } from "googleapis";
import { readFileSync } from "fs";
import { resolve } from "path";

// Leer variables desde .env.local
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    const env = {};
    for (const line of lines) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) env[key.trim()] = rest.join("=").trim();
    }
    return env;
  } catch {
    return {};
  }
}

const env = loadEnv();
const CLIENT_ID = env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ Faltan GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET en .env.local");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/calendar"],
});

console.log("\n=== Generador de Google OAuth Token ===\n");
console.log("1. Abre esta URL en tu navegador:\n");
console.log(authUrl);
console.log(`\n2. Autoriza el acceso y serás redirigido a ${REDIRECT_URI}/?code=...`);
console.log("   (Da error de conexión es normal, copia el 'code' de la URL)\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("3. Pega aquí el 'code' de la URL: ", async (code) => {
  rl.close();
  try {
    const { tokens } = await oauth2Client.getToken(decodeURIComponent(code.trim()));
    console.log("\n✅ Token generado correctamente:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log("\nActualiza tu .env.local con este valor.");
    if (!tokens.refresh_token) {
      console.log("\n⚠️  No se recibió refresh_token. Revoca el acceso en myaccount.google.com/permissions y vuelve a ejecutar.");
    }
  } catch (err) {
    console.error("\n❌ Error al intercambiar el código:", err.message);
  }
});


const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent", // fuerza que Google devuelva siempre el refresh_token
  scope: ["https://www.googleapis.com/auth/calendar"],
});

console.log("\n=== Generador de Google OAuth Token ===\n");
console.log("1. Abre esta URL en tu navegador:\n");
console.log(authUrl);
console.log("\n2. Autoriza el acceso y serás redirigido a http://localhost:3000/?code=...");
console.log("   (Da error de conexión es normal, copia el 'code' de la URL)\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("3. Pega aquí el 'code' de la URL: ", async (code) => {
  rl.close();
  try {
    const { tokens } = await oauth2Client.getToken(decodeURIComponent(code.trim()));
    console.log("\n✅ Token generado correctamente:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log("\nActualiza tu .env.local con este valor.");
    if (!tokens.refresh_token) {
      console.log("\n⚠️  No se recibió refresh_token. Asegúrate de que prompt=consent esté activo.");
      console.log("   Si ya autorizaste antes esta app, revoca el acceso en myaccount.google.com/permissions y vuelve a ejecutar.");
    }
  } catch (err) {
    console.error("\n❌ Error al intercambiar el código:", err.message);
  }
});
