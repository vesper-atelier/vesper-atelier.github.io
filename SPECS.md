# SPECS.md — Vesper Atelier · Blog de chercheur (thème TUI)

> Spécification de l'interface du site, correspondant à l'implémentation
> actuelle (branche `feature/blog-v3-tui`). Version **v3.2 — full terminal
> épuré** (02/08/2026).
> Versions antérieures : `agent-v1` (v1 vitrine) · `feature/blog-specs-v2`
> (v2 sobre).

---

## 1. Vision

Un blog de chercheur qui se lit comme une session de terminal : le contenu
est le seul décor. Quatre disciplines : **programmation, LLM, mathématiques,
mythologie**. Chaque article traite un sujet précis, avec sources et calculs
quand cela s'y prête. Pas de vitrine, pas de décoration — des listes sèches
et de la lecture.

## 2. Esthétique (cœur de la v3)

| Principe | Application |
|---|---|
| **Accueil = liste de liens** | Pas de hero, pas d'image : l'accueil est une liste d'articles et de liens. La page EST le contenu. |
| **Esthétique terminal** | Sections précédées d'un prompt `$`, pas de curseur, listes sèches, une ligne par entrée. |
| **Accent discret** | Or pâle (`--accent`) avec parcimonie : prompts, puces `*`, survol des liens. |
| **Typographie unique** | JetBrains Mono partout, taille 0.85rem uniforme. Hiérarchie par le poids et les préfixes `#`. |
| **Mode clair/sombre** | Préférence système + bascule manuelle mémorisée (localStorage), posé avant le premier rendu (pas de flash). |

## 3. Pages

1. **Accueil** (`/`) : deux sections seulement.
   - `$ ls ./articles` : tous les articles, une ligne par entrée :
     `* titre — description (AAAA-MM-JJ)`.
   - `$ ls ./liens` : liens externes (veille + blogs lus), affichée
     uniquement si `_data/liens.yml` ou `_data/blogroll.yml` contient des
     entrées.
2. **Article** (`/:categories/:titre/`) : lecture soignée, mesure ~70ch.
   En-tête `$ cat <fichier>.md`, catégories, titre, métadonnées (date, temps
   de lecture, description). Corps markdown : code (rouge), notes de bas de
   page, mathématiques KaTeX si `math: true`. Pied : tags + navigation
   précédent/suivant.
3. **À propos** (`/about/`) : courte introduction.
4. **Contact** (`/contact/`) : uniquement l'adresse courriel (mailto).
5. **404** (`/404.html`) : une ligne (« aucune sortie. ») + retour `$ cd ~`.

## 4. Structure DOM

### Squelette (layout `default`)

```html
<body>
  <a class="lien-saut" href="#contenu">Aller au contenu</a>
  <header class="entete">            <!-- marque + navigation + bascule thème -->
  <main id="contenu" class="conteneur">
    {{ page }}
  </main>
  <footer class="pied">              <!-- sitemap · © année auteur -->
</body>
```

### En-tête (`_includes/header.html`)

```html
<header class="entete">
  <div class="conteneur entete-interieur">
    <a class="marque">               <!-- svg étoile + nom du site -->
    <nav class="navigation">         <!-- articles · apropos · contact -->
    <button class="bascule-theme">
  </div>
</header>
```

### Accueil (`index.html`)

```html
<section class="accueil">
  <section class="tui-section">
    <h2 class="tui-titre">$ ls ./articles</h2>
    <ul class="tui-liste">
      <li class="tui-ligne-veille">
        <span class="tui-puce">*</span>
        <a class="tui-lien">titre</a>
        <span class="tui-note"> — description</span>
        <span class="tui-meta">(date)</span>
      </li>
    </ul>
  </section>
  <section class="tui-section">      <!-- seulement si données -->
    <h2 class="tui-titre">$ ls ./liens</h2>
    <ul class="tui-liste">…</ul>
  </section>
</section>
```

### Article (`_layouts/post.html`)

```html
<article class="article">
  <header class="article-entete">
    <p class="article-chemin">$ cat fichier.md</p>
    <p class="surtitre">catégorie</p>
    <h1>titre</h1>
    <p class="article-meta">date · ≈ N min · description</p>
  </header>
  <div class="article-corps">{{ content }}</div>
  <footer class="article-pied">tags + navigation précédent/suivant</footer>
</article>
```

### Pages simples (`_layouts/page.html`)

```html
<section class="accueil">
  <header class="page-entete">
    <p class="page-chemin">$ cat fichier.md</p>
    <h1>titre</h1>
    <p class="page-chapeau">sous-titre</p>   <!-- optionnel -->
  </header>
  <div class="page-corps">{{ content }}</div>
</section>
```

## 5. Palette (tokens CSS)

| Token | Clair | Sombre | Usage |
|---|---|---|---|
| `--fond` | `#FAF7F2` | `#0A0A1A` | Fond |
| `--fond-doux` | `#F2EDE3` | `#141430` | Blocs de code |
| `--texte` | `#1A1A1A` | `#F5F0E8` | Texte |
| `--texte-doux` | `#3D3D3D` | `#D8D2C6` | Sous-titres |
| `--secondaire` | `#6B6B6B` | `#9B9BA8` | Métadonnées, notes |
| `--accent` | `#C9A227` | `#C9A227` | Prompts, puces |
| `--lien` | `#7A5C00` | `#D9B44A` | Liens |
| `--lien-hover` | `#5C4400` | `#EACB6E` | Liens au survol |
| `--bordure` | `rgba(26,26,26,.16)` | `rgba(245,240,232,.18)` | Bordures fines |

Contrastes AA. Mode clair/sombre commutable (système + manuel).

## 6. Typographie

- **Une seule famille** : JetBrains Mono (400/500/700 + italiques),
  self-hosted en woff2 (subset latin), `font-display: swap`.
- **Taille uniforme** : `0.85rem` partout. La hiérarchie vient du poids
  (400/500/700) et des préfixes `# `, `## `, `### `.
- Racine `0.85rem` (13,6 px), `line-height: 1.6`.

## 7. Rendus

- **Code** : blocs `pre` en soft wrap (`white-space: pre-wrap`), coloration
  syntaxique custom (palette clair/sombre alignée sur les tokens).
- **Mathématiques** : KaTeX self-hosted (`assets/katex/`), chargé
  uniquement si `math: true` dans le front matter. Formules à 0.85rem.

## 8. Stack

- **Jekyll** (Ruby) sur GitHub Pages, repo `vesper-atelier.github.io`.
- Contenu en Markdown, drafts dans `_drafts/`, `future: false`.
- Permaliens par catégorie : `/:categories/:title/`.
- Zéro dépendance front (KaTeX est la seule librairie, chargée
  conditionnellement).
- Accessible (contrastes AA, navigation clavier), responsive.

## 9. Données

- `_data/liens.yml` : carnet de veille (lien + note).
- `_data/blogroll.yml` : blogs lus (nom + note).
- Les deux alimentent la section `$ ls ./liens` de l'accueil.

## 10. Fichiers

- `_layouts/` : `default.html`, `page.html`, `post.html`.
- `_includes/` : `head.html`, `header.html`, `footer.html`, `post-list.html`,
  `date-fr.html`.
- `_data/`, `_posts/`, `_drafts/`, `assets/` (css, js, fonts, katex, img).
- `index.html`, `about.md`, `contact.md`, `404.html`.
- `sitemap.xml`, `robots.txt`.
