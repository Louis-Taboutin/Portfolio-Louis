// Ce script s'execute automatiquement a chaque deploiement Vercel.
// Il deballe site.zip dans le dossier public/, qui est ensuite servi tel quel.
const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

const root = __dirname;
const outDir = path.join(root, 'public');
const zipPath = path.join(root, 'site.zip');

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);

const zip = new AdmZip(zipPath);
zip.extractAllTo(outDir, true);

console.log('Build OK : site.zip deballe dans public/');
