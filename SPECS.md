# SPECS.md — Vesper Atelier · Site vitrine

> Spécification unique encadrant l'agent de codage pour la construction du site.
> Source : notes du 02/08/2026 (assets + brief) — version condensée et normative.
> Dernière mise à jour : 02/08/2026

---

## 1. Contexte de marque

- **Nom** : Vesper Atelier — « l'étoile du soir » (Vesper = Vénus) + atelier artisanal.
- **Nature** : atelier numérique français créant sites web et outils sur mesure. SASU en cours de création.
- **ADN** : classe, chaleureux, un brin mélancolique ; artisanat numérique de précision.
- **Symbole** : étoile à 4 branches. Direction visuelle explorée : rose ruby (rose aux pétales de rubis facetté) et pickaxe (hommage au langage Ruby). Logo en cours de validation — ne pas bloquer le développement dessus.
- **Ton éditorial** : français, sobre, élégant, jamais pompeux.

## 2. Palette (tokens CSS)

| Token | Valeur | Usage |
|---|---|---|
| `--nuit` | `#0A0A1A` | Fond principal |
| `--violet` | `#201050` | Dégradés, secondaire |
| `--ruby` | `#E0115F` | Accents uniquement (jamais de fond massif) |
| `--or` | `#C9A227` | Reflets, étoile, hover |
| `--ivoire` | `#F5F0E8` | Texte sur fond sombre |

Contrastes AA minimum. Palette à confirmer avec le logo — exprimer tout en variables CSS.

## 3. Typographie

- Titres / logo : serif élégante (Cormorant, Garamond ou Didot) — fallback `Georgia, serif`.
- Corps : sans-serif moderne (Inter ou IBM Plex Sans) — fallback `system-ui`.
- Optionnel : mono (JetBrains Mono) pour détails techniques.
- Self-hosted en woff2, `font-display: swap`, sous-ensembles latin.

## 4. Stack et hébergement

- **GitHub Pages** (repo `vesper-atelier.github.io`, public).
- **Jekyll recommandé** (Ruby — cohérent avec l'identité, natif Pages) ; HTML/CSS/JS statique pur acceptable si plus simple.
- Zéro dépendance lourde, zéro build complexe, chargement rapide.
- Mobile-first, accessible (contrastes AA, navigation clavier, `aria`), Lighthouse ≥ 90 mobile.

## 5. Pages (v1)

1. **Accueil** : hero avec tagline, pitch, 3 services (sites sur mesure, outils d'automatisation, projets créatifs), CTA contact.
2. **À propos** : histoire de l'atelier, valeurs, méthode.
3. **Services** : détail des prestations.
4. **Contact** : formulaire simple (mailto ou Formspree) + coordonnées.

## 6. Livrables attendus

- Structure complète du repo (pages, assets, config Jekyll si retenu).
- Tokens CSS palette + typographies self-hostées.
- Favicon complet (16/32/180px) + OG image 1200×630.
- `README.md` : lancement local + déploiement Pages.
- `robots.txt`, `sitemap.xml`, `404.html`, `site.webmanifest`.
- Code propre, commenté, en français.

## 7. Contraintes de marque

- Logo jamais déformé ; espace de respiration généreux.
- Rubis = accents, nuit = fond, ivoire = texte.
- Images WebP/AVIF lazy-load.

## 8. Définition de fait (dans cet ordre)

1. Logo définitif validé
2. Palette figée en tokens
3. Copy finale des pages
4. Choix stack (Jekyll vs statique pur)
5. Build du site

## 9. Références

- Org : `vesper-atelier` — issue #6 « Premier projet de code » (brainstorm du site).
- Issue #7 : création société (contexte légal, non bloquant pour le build).
- Docs Pages : https://docs.github.com/fr/pages
