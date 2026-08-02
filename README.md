# Vesper Atelier

Blog de chercheur sobre et élégant — programmation, LLM, mathématiques,
mythologie, et les ponts entre ces disciplines. **Thème TUI** : l'accueil est
une liste de liens, comme un `ls` de son cerveau.

> Eosphoros et Hesperos sont la même étoile. Les savoirs semblent séparés :
> ils sont une seule lumière.

Spécification : [SPECS.md](SPECS.md) (v3, thème TUI). Les versions
précédentes sont archivées : `agent-v1` (v1 vitrine) · `feature/blog-specs-v2`
(v2 sobre).

## Structure

```
_config.yml          Configuration Jekyll (lang fr, fuseau Paris, catégories, permaliens)
_includes/           head, header (prompt $), footer, liste d'articles TUI, date fr
_layouts/            default, page, post (lecture ~70ch, en-tête `cat <fichier>.md`), theme
_data/               liens.yml (linked list) · blogroll.yml (blogs lus)
_posts/              Articles publiés (Markdown)
_drafts/             Brouillons (visibles via `jekyll serve --drafts`)
themes/              Pages de thème : programmation, llm, maths, mythologie, ponts
index.html           Accueil-liste TUI : articles · liens · blogroll · archives · ailleurs
assets/css/main.css  Tokens CSS, thème clair/sombre, esthétique terminal, AA
assets/js/main.js    Bascule clair/sombre (zéro dépendance)
assets/fonts/        JetBrains Mono en woff2, self-hosted (subset latin)
assets/img/          Favicons étoile (SVG/PNG/ICO), image OG 1200×630
feed.xml             Flux Atom ; sitemap.xml ; robots.txt ; 404.html
```

## Lancer le site en local

Prérequis : Ruby ≥ 3.1 et Bundler.

```bash
bundle install
bundle exec jekyll serve --drafts   # brouillons inclus
# → http://localhost:4000
```

Sans les brouillons :

```bash
bundle exec jekyll serve
```

## Déploiement (GitHub Pages)

Le site est servi depuis la branche `main` (repo `vesper-atelier.github.io`,
site d'organisation) : GitHub Pages exécute Jekyll à chaque poussée. Le
développement se fait sur des branches de fonctionnalité (ici
`feature/blog-v3-tui`) ; la publication consiste à fusionner dans `main`.

```bash
git checkout main && git merge feature/blog-v3-tui && git push
```

Le build Pages active d'office `jekyll-sitemap` : le `sitemap.xml` est alors
régénéré automatiquement à chaque publication.

## Personnalisation

- **Couleurs** : tokens en tête de `assets/css/main.css` (`--fond`, `--texte`,
  `--accent`, `--secondaire`…), déclinés en clair et sombre.
- **Typographie** : JetBrains Mono partout (thème full terminal), self-hosted
  en woff2 (`assets/fonts/`), déclinée en graisses 400/500/700 + italiques.
- **Linked list** : `_data/liens.yml` — le carnet de veille de l'accueil.
- **Blogroll** : `_data/blogroll.yml` — les blogs lus.
- **Contenu** : un article = un fichier `_posts/AAAA-MM-JJ-titre.md` avec les
  champs `categories` (programmation, llm, maths, mythologie) et `tags`
  (dont `ponts`, le fil rouge).

## Feuille de route

- [x] Accueil-liste TUI (articles · liens · blogroll · archives · ailleurs)
- [x] Typographie full terminal (JetBrains Mono partout, sans curseur, listes sèches)
- [x] Mode clair/sombre (préférence système + bascule manuelle, mémorisée)
- [x] Article d'ouverture « Eosphoros et Hesperos » + 3 brouillons
- [x] Self-hosting des polices en woff2 (subset latin) — SPECS §5
- [ ] Rendu comparé à chsmc.org (fidélité d'esprit, pas de copie)
- [ ] Premier build GitHub Pages (après fusion dans `main`)
- [ ] Vérification Lighthouse ≥ 90 sur le site publié
