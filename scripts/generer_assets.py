#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur d'assets images — Vesper Atelier (placeholders v1)
--------------------------------------------------------------
Produit, en pur Python (zlib + struct, zéro dépendance) :
  assets/img/favicon-16.png, favicon-32.png, favicon-192.png, favicon-512.png
  apple-touch-icon.png (180×180)
  assets/img/og-image.png (1200×630)
  favicon.ico (16 + 32 px, PNG encapsulé — supporté par tous les navigateurs)

Symboles : étoile à 4 branches (SPECS §1), rubis #E0115F + or #C9A227
sur fond nuit #0A0A1A. Dégradé violet #201050 pour l'image sociale.
"""
import struct
import zlib
import math
import os

# --- Palette (SPECS §2) -------------------------------------------------------
NUIT   = (10, 10, 26)        # #0A0A1A
VIOLET = (32, 16, 80)        # #201050
RUBY   = (224, 17, 95)       # #E0115F
OR     = (201, 162, 39)      # #C9A227

SS = 4  # sur-échantillonnage (anti-crénelage)

# ---------------------------------------------------------------------------
# Écriture PNG (RGBA 8 bits)
# ---------------------------------------------------------------------------
def ecrire_png(chemin, largeur, hauteur, pixels):
    """pixels : liste de tuples (r,g,b,a), ligne par ligne."""
    def entrelacs(ligne):
        return b"\x00" + b"".join(struct.pack("4B", *p) for p in ligne)

    brut = b"".join(entrelacs(pixels[y * largeur:(y + 1) * largeur])
                    for y in range(hauteur))
    def chunk(ty, donnees):
        c = struct.pack(">I", len(donnees)) + ty + donnees
        return c + struct.pack(">I", zlib.crc32(ty + donnees) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", largeur, hauteur, 8, 6, 0, 0, 0)
    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", ihdr)
           + chunk(b"IDAT", zlib.compress(brut, 9))
           + chunk(b"IEND", b""))
    with open(chemin, "wb") as f:
        f.write(png)

# ---------------------------------------------------------------------------
# Rayon de l'étoile à 4 branches en polaire :
#   r(θ) = creux + (pointe − creux) · |cos 2θ|
# pointes à 0°, 90°, 180°, 270° ; creux (taille) à 45°, 135°, …
# ---------------------------------------------------------------------------
def rayon_etoile(theta, pointe, creux):
    return creux + (pointe - creux) * abs(math.cos(2.0 * theta))

def dans_etoile(x, y, cx, cy, pointe, creux, rotation=0.0):
    """Test point (x,y) dans l'étoile centrée (cx,cy)."""
    dx, dy = x - cx, y - cy
    r = math.hypot(dx, dy)
    if r == 0:
        return True
    theta = math.atan2(dy, dx) + rotation
    return r <= rayon_etoile(theta, pointe, creux)

# ---------------------------------------------------------------------------
# Rendu générique avec sur-échantillonnage
# ---------------------------------------------------------------------------
def rendu(largeur, hauteur, shader):
    """shader(x, y) -> (r,g,b,a). Appelé en coordonnées cible."""
    px = [[None] * largeur for _ in range(hauteur)]
    for y in range(hauteur):
        for x in range(largeur):
            acc = [0.0, 0.0, 0.0, 0.0]
            for sy in range(SS):
                for sx in range(SS):
                    r, g, b, a = shader(x + (sx + 0.5) / SS,
                                        y + (sy + 0.5) / SS)
                    acc[0] += r * a
                    acc[1] += g * a
                    acc[2] += b * a
                    acc[3] += a
            n = SS * SS
            al = acc[3] / n
            if al <= 0:
                px[y][x] = (0, 0, 0, 0)
            else:
                px[y][x] = (int(acc[0] / acc[3] + 0.5),
                            int(acc[1] / acc[3] + 0.5),
                            int(acc[2] / acc[3] + 0.5),
                            int(al + 0.5))
    return [px[y][x] for y in range(hauteur) for x in range(largeur)]

def melange(avant, arriere):
    """Compose avant (r,g,b,a) sur arriere (r,g,b)."""
    a = avant[3] / 255.0
    return (int(avant[0] * a + arriere[0] * (1 - a) + 0.5),
            int(avant[1] * a + arriere[1] * (1 - a) + 0.5),
            int(avant[2] * a + arriere[2] * (1 - a) + 0.5))

# ---------------------------------------------------------------------------
# Favicon / icônes : fond nuit arrondi + étoile rubis + cœur or
# ---------------------------------------------------------------------------
def icone_fond(taille, rayon_coin):
    def shader(x, y):
        # Rectangle arrondi nuit
        dx = max(rayon_coin - x, x - (taille - rayon_coin), 0)
        dy = max(rayon_coin - y, y - (taille - rayon_coin), 0)
        couv = min(1.0, max(0.0, rayon_coin - math.hypot(dx, dy) + 0.5))
        if couv <= 0:
            return (0, 0, 0, 0)
        # Léger dégradé vertical subtil (haut légèrement plus clair)
        t = y / taille
        fond = (NUIT[0] + int(14 * (1 - t)), NUIT[1] + int(8 * (1 - t)),
                NUIT[2] + int(20 * (1 - t)))
        return (fond[0], fond[1], fond[2], int(255 * couv))
    return shader

def shader_favicon(taille):
    """Étoile rubis + cœur or sur fond nuit arrondi."""
    r_coin = taille * 0.21
    fond = icone_fond(taille, r_coin)
    cx = cy = taille / 2.0
    pointe = taille * 0.42
    creux  = pointe * 0.40
    pointe_or = pointe * 0.52
    creux_or  = creux * 0.52

    def shader(x, y):
        r, g, b, a = fond(x, y)
        # Étoile rubis (bords adoucis par sur-échantillonnage)
        if dans_etoile(x, y, cx, cy, pointe, creux):
            r, g, b = RUBY
        # Cœur or (par-dessus)
        if dans_etoile(x, y, cx, cy, pointe_or, creux_or):
            r, g, b = OR
        return (r, g, b, a)
    return shader

def generer_favicons(dossier_assets):
    for t in (16, 32, 192, 512):
        px = rendu(t, t, shader_favicon(t))
        ecrire_png(os.path.join(dossier_assets, f"favicon-{t}.png"), t, t, px)
        print(f"  favicon-{t}.png")

    # apple-touch-icon 180×180 — même composition, marge un peu plus large
    def shader_apple(x, y):
        t = 180
        cx = cy = t / 2.0
        pointe = t * 0.36
        creux = pointe * 0.40
        fond = icone_fond(t, t * 0.20)
        r, g, b, a = fond(x, y)
        if dans_etoile(x, y, cx, cy, pointe, creux):
            r, g, b = RUBY
        if dans_etoile(x, y, cx, cy, pointe * 0.52, creux * 0.52):
            r, g, b = OR
        return (r, g, b, a)
    px = rendu(180, 180, shader_apple)
    ecrire_png(os.path.join(dossier_assets, "apple-touch-icon.png"), 180, 180, px)
    print("  apple-touch-icon.png (180×180)")

# ---------------------------------------------------------------------------
# favicon.ico — conteneur ICO avec PNG encapsulés (16 et 32 px)
# ---------------------------------------------------------------------------
def generer_ico(racine, dossier_assets):
    images = []
    for t in (16, 32):
        px = rendu(t, t, shader_favicon(t))
        donnees = None
        # Réutilise ecrire_png via un tampon mémoire
        import io
        buf = io.BytesIO()
        # petite réécriture : on capture le flux PNG
        # (on duplique la logique pour rester lisible)
        def entrelacs(ligne):
            return b"\x00" + b"".join(struct.pack("4B", *p) for p in ligne)
        brut = b"".join(entrelacs(px[y * t:(y + 1) * t]) for y in range(t))
        def chunk(ty, donnees):
            c = struct.pack(">I", len(donnees)) + ty + donnees
            return c + struct.pack(">I", zlib.crc32(ty + donnees) & 0xFFFFFFFF)
        ihdr = struct.pack(">IIBBBBB", t, t, 8, 6, 0, 0, 0)
        buf.write(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
                  + chunk(b"IDAT", zlib.compress(brut, 9)) + chunk(b"IEND", b""))
        images.append((t, buf.getvalue()))

    en_tete = struct.pack("<HHH", 0, 1, len(images))
    entrees = b""
    decalage = 6 + 16 * len(images)
    blocs = b""
    for t, png in images:
        entrees += struct.pack("<BBBBHHII", t, t, 0, 0, 1, 32, len(png), decalage)
        blocs += png
        decalage += len(png)
    with open(os.path.join(racine, "favicon.ico"), "wb") as f:
        f.write(en_tete + entrees + blocs)
    print("  favicon.ico (16+32 px)")

# ---------------------------------------------------------------------------
# og-image 1200×630 — placeholder géométrique (pas de texte, pas de police
# système) : dégradé nuit → violet, grande étoile or, cœur rubis, ciel étoilé.
# À régénérer avec le logo définitif et la typographie finales (SPECS §8).
# ---------------------------------------------------------------------------
def generer_og_image(dossier_assets):
    W, H = 1200, 630
    cx, cy = W / 2.0, H * 0.46

    # Petites étoiles du ciel (positions fixes, déterminées pour l'ambiance)
    petites = [(150, 120, 3.0), (320, 200, 2.2), (880, 90, 3.4), (1050, 230, 2.0),
               (180, 470, 2.4), (1000, 470, 2.8), (700, 90, 1.8), (470, 60, 2.2),
               (60, 300, 1.8), (1140, 360, 2.0)]

    def shader(x, y):
        t = y / H
        # Dégradé nuit (haut) → violet profond (bas), SPECS §2
        fond = (int(NUIT[0] + (VIOLET[0] - NUIT[0]) * t ** 1.4),
                int(NUIT[1] + (VIOLET[1] - NUIT[1]) * t ** 1.4),
                int(NUIT[2] + (VIOLET[2] - NUIT[2]) * t ** 1.4))
        r, g, b = fond

        # Halo doux derrière l'étoile (rubis très diffus — ambiance, pas de fond massif)
        d = math.hypot(x - cx, y - cy)
        halo = max(0.0, 1.0 - d / 340.0) ** 2
        if halo > 0:
            r = int(r + (RUBY[0] - r) * halo * 0.16)
            g = int(g + (RUBY[1] - g) * halo * 0.16)
            b = int(b + (RUBY[2] - b) * halo * 0.16)

        # Petites étoiles du ciel (or, discrètes)
        for sx, sy, sr in petites:
            if math.hypot(x - sx, y - sy) <= sr:
                r, g, b = OR
                break

        # Grande étoile or
        if dans_etoile(x, y, cx, cy, 150, 58):
            r, g, b = OR
        # Cœur rubis
        if dans_etoile(x, y, cx, cy, 84, 32):
            r, g, b = RUBY
        # Éclat or central
        if dans_etoile(x, y, cx, cy, 40, 15):
            r, g, b = OR
        return (r, g, b, 255)

    px = rendu(W, H, shader)
    ecrire_png(os.path.join(dossier_assets, "og-image.png"), W, H, px)
    print("  og-image.png (1200×630)")

# ---------------------------------------------------------------------------
if __name__ == "__main__":
    racine = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    assets = os.path.join(racine, "assets", "img")
    os.makedirs(assets, exist_ok=True)
    print("Génération des images…")
    generer_favicons(assets)
    generer_ico(racine, assets)
    generer_og_image(assets)
    print("Terminé.")
