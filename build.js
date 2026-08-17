// Ce script s'execute automatiquement a chaque deploiement Vercel.
// Il deballe site.zip dans le dossier public/, qui est ensuite servi tel quel.
const AdmZip = require('adm-zip');
const fs = require('fs');

const outDir = 'public';

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir);

const zip = new AdmZip('site.zip');
zip.extractAllTo(outDir, true);

console.log('Build OK : site.zip deballe dans public/');
