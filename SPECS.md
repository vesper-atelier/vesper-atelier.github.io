# SPECS.md — Vesper Atelier · Blog de chercheur (thème TUI)

> Spécification encadrant l'agent de codage pour la construction du site.
> Direction v3 — 02/08/2026 : blog sobre, contenu-first, **esthétique TUI**
> (inspirée de chsmc.org — Chase McCoy, design engineer chez Anthropic).
> **v3.1 — refonte full terminal** (02/08/2026, branche `feature/blog-v3-tui`) :
> typographie 100 % JetBrains Mono, curseur supprimé, listes sans filets.
> v1 (site vitrine) archivée sur `agent-v1` · v2 (blog sobre) sur `feature/blog-specs-v2`.

---

## 1. Vision

Un **blog de chercheur** qui se lit comme une session de terminal :
le contenu est le seul décor. Centres d'intérêt : **programmation, LLM,
mathématiques, mythologie** — et les ponts entre eux.

**Thème fondateur : Eosphoros / Hesperos.** L'étoile du matin et l'étoile du
soir sont la même étoile — Vénus. Les disciplines semblent séparées, elles
sont une seule lumière. Le site porte ce fil rouge en filigrane, jamais de
façon criarde — comme un prompt qui attend.

## 2. Esthétique TUI (cœur de la v3)

Inspiration : chsmc.org — accueil = liste de liens, zéro habillage, structure
sèche, « le site comme un `ls` de son cerveau ».

| Principe | Application |
|---|---|
| **Accueil = liste de liens** | Pas de hero, pas de slider, pas d'image d'accueil. Des liens vers les sections, articles, réseaux. La page EST le contenu. |
| **Esthétique terminal** | Sections précédées d'un prompt discret (`$ ` ou `> `), pas de bordures de lignes, structure en listes sèches. Une ligne par entrée. |
| **Accent discret** | La couleur d'accent (or) utilisée avec parcimonie : liens au survol, prompts, puces. **Pas de curseur animé.** |
| **Sections « Linked list »** | Un carnet de veille : « trucs qui ont attiré mon œil », liens courts + une ligne de commentaire. |
| **Blogroll** | La liste des blogs lus — le web comme réseau de connaissances. |
| **Archives par année** | 2026 → 2013 (ou début du carnet), la profondeur du temps. |
| **RSS en évidence** | Lien flux en haut, pas de newsletter, pas de popup. |

## 3. Marque (discrète)

- Pas de logo clinquant. Typographie irréprochable comme signature.
- Étoile à 4 branches très fine en favicon (Vesper) — filigrane discret.
- Pas de palette massive : fond clair ou sombre selon confort, une seule
  couleur d'accent (or pâle), utilisée rarement.

## 4. Palette (tokens CSS)

| Token | Valeur | Usage |
|---|---|---|
| `--fond` | `#FAF7F2` (clair) / `#0A0A1A` (sombre) | Fond selon thème |
| `--texte` | `#1A1A1A` / `#F5F0E8` | Texte |
| `--accent` | `#C9A227` (or pâle) | Liens, curseur, rares accents |
| `--secondaire` | `#6B6B6B` / `#8A8A9A` | Métadonnées, dates, notes |

Mode clair/sombre commutable (préférence système + bascule manuelle).

## 5. Typographie

- **Une seule famille** : JetBrains Mono (400/500/700 + italiques), partout —
  titres, corps, métadonnées, code. C'est la densité qui porte l'esthétique TUI.
- Hiérarchie par le poids et les préfixes « # » : h1 1,5rem/700, h2 1,25rem/700,
  h3 1,1rem/700. Racine 15px, line-height 1,6.
- Self-hosted woff2 (subset latin), `font-display: swap`.

## 6. Stack et hébergement

- **Jekyll** (Ruby) sur GitHub Pages, repo `vesper-atelier.github.io`.
- Contenu en Markdown, drafts supportés (`_drafts/`), tags et catégories.
- Zéro JS lourd ; le site doit se charger comme une commande : vite, net.
- Accessible (contrastes AA, navigation clavier), responsive, Lighthouse ≥ 90.

## 7. Pages et structure (v3)

1. **Accueil** (`index.html`) : liste de liens en sections — Derniers articles,
   Liens (linked list), Blogroll, Archives, Ailleurs (réseaux). Prompt `$` en
   tête. Tri par date, extraits courts.
2. **Article type** : layout de lecture soigné (mesure ~70ch, titres
   hiérarchisés, code bien rendu, notes de bas de page). Métadonnées en mono
   (date, catégorie, tags). En-tête façon `cat <fichier>.md` ou chemin de
   fichier discret.
3. **À propos** : courte présentation, centres d'intérêt, le lien
   Eosphoros/Hesperos.
4. **Thèmes / catégories** : programmation, LLM, maths, mythologie, ponts.
5. **Contact** : simple (mailto).
6. **404** (sobre, une ligne — « aucune sortie. »), `robots.txt`, `sitemap.xml`,
   flux **RSS/Atom** en évidence.

## 8. Livrables attendus

- Structure Jekyll complète (config, layouts, includes, assets).
- Tokens CSS + typographies self-hostées + mode clair/sombre.
- Favicon étoile fine + OG image sobre (typographique).
- Flux RSS, sitemap, robots, 404.
- README : lancement local (`jekyll serve`) + déploiement Pages.
- Code propre, commenté ; contenu éditorial en français, ton sobre.

## 9. Contenu initial (à conserver)

- **« Eosphoros et Hesperos »** (publié, 02/08) — l'ouverture.
- 3 brouillons (`_drafts/`) : *Écrire pour le lecteur de six mois*,
  *Ce que les LLM disent du langage*, *Le pentagramme de Vénus*.
- Page À propos avec les centres d'intérêt.

## 10. Définition de fait

1. Accueil-liste + sections TUI validées
2. Mode clair/sombre validé
3. Rendu comparé à chsmc.org (fidélité d'esprit, pas de copie)
4. Build + déploiement Pages

## 11. Références

- Inspiration : https://chsmc.org (blog de Chase McCoy — design engineer
  Anthropic ; Source Serif + Brunswick Grotesque, Astro + Netlify)
- Branches : `agent-v1` (v1 vitrine) · `feature/blog-specs-v2` (v2 sobre)
- Issue #6 : premier projet de code · Issue #7 : société en veille
