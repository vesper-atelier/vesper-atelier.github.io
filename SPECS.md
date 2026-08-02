# SPECS.md — Vesper Atelier · Blog de chercheur

> Spécification encadrant l'agent de codage pour la construction du site.
> Direction v2 — 02/08/2026 : blog sobre, contenu-first, thème mythologique.
> La v1 (site vitrine) est archivée sur la branche `agent-v1`.

---

## 1. Vision

Un **blog de chercheur** sobre et élégant : le contenu est le seul décor.
Centres d'intérêt : **programmation, LLM, mathématiques, mythologie** — et surtout
les ponts entre eux.

**Thème fondateur : Eosphoros / Hesperos.** L'étoile du matin et l'étoile du soir
sont la même étoile — Vénus. Les Grecs les croyaient distinctes avant de comprendre
qu'il s'agissait d'un seul astre. Métaphore du site : les disciplines semblent
séparées, elles sont une seule lumière. Le site porte ce fil rouge en filigrane,
jamais de façon criarde.

## 2. Marque (discrète)

- Pas de logo clinquant. Une **typographie irréprochable** comme signature.
- Option : une étoile à 4 branches très fine en favicon (Vesper) — filigrane discret.
- Pas de palette massive : fond clair ou sombre selon confort de lecture,
  une seule couleur d'accent (or pâle ou rouge rubis, très rare).

## 3. Palette (tokens CSS)

| Token | Valeur | Usage |
|---|---|---|
| `--fond` | `#FAF7F2` (clair) / `#0A0A1A` (sombre) | Fond selon thème |
| `--texte` | `#1A1A1A` / `#F5F0E8` | Texte |
| `--accent` | `#C9A227` (or pâle) | Liens, soulignements, rares accents |
| `--secondaire` | `#6B6B6B` | Notes, métadonnées |

Mode clair/sombre commutable (préférence système + bascule manuelle).

## 4. Typographie

- Titres : serif élégante (Cormorant Garamond ou équivalent) — fallback `Georgia, serif`.
- Corps : serif lisible (Source Serif 4, Lora) ou sans-serif sobre (Inter) — à trancher ;
  penchant : serif pour l'âme « chercheur ».
- Mono : JetBrains Mono pour le code.
- Self-hosted woff2, `font-display: swap`.

## 5. Stack et hébergement

- **Jekyll** (Ruby) sur GitHub Pages, repo `vesper-atelier.github.io`.
- Contenu en Markdown, drafts supportés (`_drafts/`), tags et catégories.
- Zéro JS lourd ; le site doit se lire comme un article de revue : vite, net, sans bruit.
- Accessible (contrastes AA, navigation clavier), responsive, Lighthouse ≥ 90.

## 6. Pages et structure (v2)

1. **Accueil** : liste des articles (titre + extrait + date), triée par date.
2. **Article type** : layout de lecture soigné (mesure ~70ch, titres hiérarchisés, code, notes de bas de page), articles en Markdown.
3. **À propos** : courte présentation, les centres d'intérêt, le lien Eosphoros/Hesperos.
4. **Thèmes / catégories** : programmation, LLM, maths, mythologie (et les ponts).
5. **Contact** : simple (mailto).
6. **404**, `robots.txt`, `sitemap.xml`, flux **RSS/Atom** (essentiel pour un blog).

## 7. Livrables attendus

- Structure Jekyll complète (config, layouts, includes, assets).
- Tokens CSS + typographies self-hostées + mode clair/sombre.
- Favicon étoile fine + OG image sobre (typographique).
- Flux RSS, sitemap, robots, 404.
- README : lancement local (`jekyll serve`) + déploiement Pages.
- Code propre, commenté ; contenu éditorial en français.

## 8. Contenu initial (à rédiger)

- 1er article d'ouverture : « Eosphoros et Hesperos » — la même étoile, les ponts entre disciplines.
- 2-3 articles de démonstration (programmation, LLM, maths) en brouillon (`_drafts/`).
- Page À propos avec les centres d'intérêt.

## 9. Définition de fait

1. Choix typo corps (serif vs sans-serif)
2. Mode clair/sombre validé
3. 1er article d'ouverture rédigé
4. Build du site

## 10. Références

- Branche archive : `agent-v1` (site vitrine v1, SPECS v1)
- Issue #6 : premier projet de code (brainstorm)
- Issue #7 : société en veille (Apple Developer individuel — DUNS différé)
