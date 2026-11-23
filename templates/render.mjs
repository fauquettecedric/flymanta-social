// Usage : node render.mjs <fichier.html> <dossier-sortie>
// Chaque élément .s avec un id devient <id>.png (1080 × 1350, deviceScaleFactor 2).
import { chromium } from "playwright";
import path from "path";
const [html, out] = process.argv.slice(2);
const b = await chromium.launch({ args: ["--no-sandbox", "--allow-file-access-from-files"] });
const p = await b.newPage({ viewport: { width: 1800, height: 1500 }, deviceScaleFactor: 2 });
await p.goto("file://" + path.resolve(html)); await p.waitForTimeout(800);
for (const el of await p.locator(".s[id]").all()) {
  const id = await el.getAttribute("id");
  await el.screenshot({ path: path.join(out, id + ".png") });
}
await b.close();
