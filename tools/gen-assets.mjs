/* ═══════════════════════════════════════════════════════════════════
   Vesper Atelier — générateur d'assets

   Produit, dans assets/img/ :
     favicon-16.png, favicon-32.png, favicon.ico, apple-touch-icon.png,
     og-image.png (1200×630, typographique)

   — favicon.svg (étoile à 4 branches) est la source des favicons ;
   — l'image OG est composée en SVG avec le texte converti en chemins
     (opentype.js) : aucune police système requise ;
   — les polices (OFL) sont téléchargées à la volée depuis google/fonts.

   Usage : npm install && node gen-assets.mjs
   ═══════════════════════════════════════════════════════════════════ */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import sharp from "sharp";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG = path.join(RACINE, "assets", "img");
const DOSSIER_POLICES = path.join(path.dirname(fileURLToPath(import.meta.url)), "fonts");

/* ── Étoile à 4 branches (même tracé que assets/img/favicon.svg) ── */
const TRAIT_ETOILE =
  "M12 0.8 C12.9 7.2 16.8 11.1 23.2 12 C16.8 12.9 12.9 16.8 12 23.2 " +
  "C11.1 16.8 7.2 12.9 0.8 12 C7.2 11.1 11.1 7.2 12 0.8 Z";

/* ── Téléchargement des polices (cache local) ───────────────────── */
async function telecharger(url, fichier) {
  const cible = path.join(DOSSIER_POLICES, fichier);
  try {
    await fs.access(cible);
    console.log(`  polices/${fichier} (cache)`);
    return cible;
  } catch {
    console.log(`  téléchargement ${fichier}…`);
    const reponse = await fetch(url);
    if (!reponse.ok) throw new Error(`HTTP ${reponse.status} — ${url}`);
    await fs.mkdir(DOSSIER_POLICES, { recursive: true });
    await fs.writeFile(cible, Buffer.from(await reponse.arrayBuffer()));
    return cible;
  }
}

/* ── Texte → chemin SVG (centré sur x, sommet posé à yHaut) ────────
   Retourne { d, largeur, hauteur }. La taille est réduite si le texte
   dépasse largeurMax (l'image OG fait 1200 px de large).
   Le placement passe par getPath(x, y) : aucun décalage manuel.      */
function texteEnChemin(police, texte, xCentre, yHaut, taille, largeurMax = 1040) {
  let p = police.getPath(texte, 0, 0, taille);
  let bb = p.getBoundingBox();
  const facteur = bb.x2 - bb.x1 > largeurMax ? largeurMax / (bb.x2 - bb.x1) : 1;
  if (facteur < 1) {
    p = police.getPath(texte, 0, 0, taille * facteur);
    bb = p.getBoundingBox();
  }
  const dx = xCentre - (bb.x1 + bb.x2) / 2;
  const ligneDeBase = yHaut - bb.y1; // bb.y1 < 0 : monte le texte sous yHaut
  const pFinal = police.getPath(texte, dx, ligneDeBase, taille);
  return { d: pFinal.toPathData(), largeur: bb.x2 - bb.x1, hauteur: bb.y2 - bb.y1 };
}

/* ── Favicons ────────────────────────────────────────────────────── */
async function genererFavicons() {
  const source = await fs.readFile(path.join(IMG, "favicon.svg"));

  const png16 = await sharp(source).resize(16, 16).png().toBuffer();
  const png32 = await sharp(source).resize(32, 32).png().toBuffer();
  await fs.writeFile(path.join(IMG, "favicon-16.png"), png16);
  await fs.writeFile(path.join(IMG, "favicon-32.png"), png32);
  console.log("  favicon-16.png, favicon-32.png");

  // apple-touch-icon : étoile sur fond nuit, 180×180
  const fond = await sharp({
    create: { width: 180, height: 180, channels: 4, background: { r: 10, g: 10, b: 26, alpha: 1 } },
  }).png().toBuffer();
  const icone = await sharp(source)
    .resize(112, 112)
    .png()
    .toBuffer();
  await sharp(fond)
    .composite([{ input: icone, left: 34, top: 34 }])
    .png()
    .toFile(path.join(IMG, "apple-touch-icon.png"));
  console.log("  apple-touch-icon.png");

  // favicon.ico : conteneur ICO (en-tête + entrées) embarquant les PNG 16/32
  const assemblerIco = (images) => {
    const enTete = Buffer.alloc(6);
    enTete.writeUInt16LE(0, 0); // réservé
    enTete.writeUInt16LE(1, 2); // type : icône
    enTete.writeUInt16LE(images.length, 4);
    const entrees = [];
    let offset = 6 + 16 * images.length;
    for (const { taille, data } of images) {
      const entree = Buffer.alloc(16);
      entree.writeUInt8(taille === 256 ? 0 : taille, 0);
      entree.writeUInt8(taille === 256 ? 0 : taille, 1);
      entree.writeUInt8(0, 2); // palette : aucune
      entree.writeUInt8(0, 3); // réservé
      entree.writeUInt16LE(1, 4); // plans
      entree.writeUInt16LE(32, 6); // bits par pixel
      entree.writeUInt32LE(data.length, 8);
      entree.writeUInt32LE(offset, 12);
      offset += data.length;
      entrees.push(entree);
    }
    return Buffer.concat([enTete, ...entrees, ...images.map((i) => i.data)]);
  };
  await fs.writeFile(
    path.join(IMG, "favicon.ico"),
    assemblerIco([
      { taille: 16, data: png16 },
      { taille: 32, data: png32 },
    ])
  );
  console.log("  favicon.ico");
}

/* ── Image OG 1200×630 (typographique) ───────────────────────────── */
async function genererOg(policeMono) {
  const L = 1200, H = 630;

  const etoile = `<g transform="translate(600 238) scale(2.1)"><path d="${TRAIT_ETOILE}" fill="#C9A227"/></g>`;

  // Titre — JetBrains Mono, graisse 700 (thème full terminal)
  let titres = policeMono;
  try {
    const variante = policeMono.getVariation({ wght: 700 });
    if (variante) titres = variante;
  } catch { /* instance par défaut : acceptable */ }
  const titre = texteEnChemin(titres, "Vesper Atelier", 600, 396, 92);

  // Règle d'or, fine
  const regle = `<rect x="552" y="442" width="96" height="1.6" fill="#C9A227" opacity="0.75"/>`;

  // Sous-titre — JetBrains Mono, graisse 400
  const sous = texteEnChemin(policeMono, "Eosphoros et Hesperos — la même étoile", 600, 512, 28);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${H}" viewBox="0 0 ${L} ${H}">
  <rect width="${L}" height="${H}" fill="#0A0A1A"/>
  <rect x="40" y="40" width="${L - 80}" height="${H - 80}" fill="none" stroke="#C9A227" stroke-opacity="0.30" stroke-width="1"/>
  ${etoile}
  <path d="${titre.d}" fill="#F5F0E8"/>
  ${regle}
  <path d="${sous.d}" fill="#D8D2C6"/>
</svg>`;

  await fs.writeFile(path.join(IMG, "og-image.svg"), svg);
  await sharp(Buffer.from(svg)).png().toFile(path.join(IMG, "og-image.png"));
  const meta = await sharp(path.join(IMG, "og-image.png")).metadata();
  console.log(`  og-image.png (${meta.width}×${meta.height})`);
}

/* ── Entrée ──────────────────────────────────────────────────────── */
async function main() {
  await fs.mkdir(IMG, { recursive: true });
  console.log("Polices (OFL, google/fonts) :");
  const jetbrains = await telecharger(
    "https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf",
    "JetBrainsMono.ttf"
  );

  console.log("Génération :");
  const policeMono = opentype.loadSync(jetbrains);
  await genererFavicons();
  await genererOg(policeMono);
  console.log("Terminé.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
