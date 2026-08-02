# Vesper Atelier ✦

> L'atelier numérique de l'étoile du soir — sites web et outils sur mesure, façonnés avec soin.

**Vesper Atelier** est un atelier numérique français qui conçoit des sites web et des outils
sur mesure, avec la précision d'un artisan et l'élégance d'une étoile du soir.

## Le site

Ce repo héberge le site vitrine de Vesper Atelier, servi par [GitHub Pages](https://vesper-atelier.github.io).

- **Stack** : [Jekyll](https://jekyllrb.com) (Ruby — cohérent avec l'identité, natif Pages),
  zéro plugin tiers, zéro dépendance lourde, chargement rapide.
- **Spec** : [SPECS.md](./SPECS.md) — le document qui encadre l'agent de codage (marque, palette, pages).

## Structure

```
├── _config.yml              # Configuration Jekyll (titre, url, langue fr, timezone Europe/Paris)
├── _layouts/
│   └── default.html         # Gabarit unique : fond nuit, header/footer, accessibilité
├── assets/
│   ├── css/main.css         # Tokens CSS de la palette + typographies + responsive
│   └── img/                 # favicon.svg, PNG 16/32/192/512, apple-touch-icon, og-image
├── index.html               # Accueil — hero, pitch, 3 services, CTA
├── about.md                 # À propos — histoire, valeurs, méthode
├── services.md              # Services — détail des prestations
├── contact.md               # Contact — formulaire mailto + coordonnées
├── 404.html                 # Page introuvable
├── favicon.ico              # Icônes 16/32 px
├── apple-touch-icon.png     # Icône iOS 180 px
├── robots.txt               # Indexation
├── sitemap.xml              # Sitemap
├── site.webmanifest         # Manifest PWA léger
├── scripts/
│   └── generer_assets.py    # Générateur des PNG/ICO (pur Python, zéro dépendance)
└── SPECS.md                 # Spécification du site
```

## Développement local

Prérequis : Ruby ≥ 3.1 et [Bundler](https://bundler.io).

```bash
bundle install               # installe la gem github-pages (alignée sur Pages)
bundle exec jekyll serve     # http://localhost:4000
```

Variante sans Bundler (si Jekyll est déjà installé) :

```bash
jekyll serve
```

Le site est mobile-first : pensez à vérifier le rendu en largeur réduite
(DevTools > responsive) et les contrastes (palette SPECS §2).

### Régénérer les images

Les PNG et l'ICO sont des placeholders générés (étoile à 4 branches) :

```bash
python3 scripts/generer_assets.py
```

Pur Python (zlib + struct), aucune dépendance requise.

## Déploiement

Le déploiement est entièrement géré par **GitHub Pages** : tout `push` sur la branche
`main` déclenche le build Jekyll côté GitHub. Rien d'autre à faire.

Vérification manuelle :

```bash
curl -sI https://vesper-atelier.github.io/          # → 200
curl -s https://vesper-atelier.github.io/SPECS.md   # → toujours accessible
```

## À faire (définition de fait, SPECS §8)

1. **Logo définitif validé** — le symbole actuel (étoile 4 branches SVG/PNG) est un placeholder.
2. **Palette figée en tokens** — exprimée en variables CSS (`--nuit`, `--ruby`, …), à confirmer avec le logo.
3. **Copy finale** — les textes actuels sont une première version sobre et élégante.
4. **Adresse de contact** — `bonjour@vesper-atelier.fr` est un placeholder (domaine à confirmer) ;
   penser aussi à régénérer `og-image.png` avec typographie finale une fois le logo validé.

## Contact

- Org GitHub : [vesper-atelier](https://github.com/vesper-atelier)
- Journal (privé) : `vesper-atelier/journal`
