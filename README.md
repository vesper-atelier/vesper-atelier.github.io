# Vesper Atelier

Blog de chercheur sobre et élégant — programmation, LLM, mathématiques,
mythologie, et les ponts entre ces disciplines.

> Eosphoros et Hesperos sont la même étoile. Les savoirs semblent séparés :
> ils sont une seule lumière.

Spécification : [SPECS.md](SPECS.md) (v2). Le site vitrine v1 est archivé sur
la branche `agent-v1`.

## Structure

```
_config.yml          Configuration Jekyll (lang fr, fuseau Paris, permaliens)
_includes/           head, header, footer, liste d'articles, date fr
_layouts/            default, page, post (lecture ~70ch), theme
_posts/              Articles publiés (Markdown)
_drafts/             Brouillons (visibles via `jekyll serve --drafts`)
themes/              Pages de thème : programmation, llm, maths, mythologie, ponts
assets/css/main.css  Tokens CSS, thème clair/sombre, responsive, AA
assets/js/main.js    Bascule clair/sombre + formulaire mailto
assets/img/          Favicons (SVG/PNG/ICO), image OG 1200×630
tools/               Générateur des assets (facultatif, voir plus bas)
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
`feature/blog-specs-v2`) ; la publication consiste à fusionner dans `main`.

```bash
git checkout main && git merge feature/blog-specs-v2 && git push
```

Le build Pages active d'office `jekyll-sitemap` : le `sitemap.xml` est alors
régénéré automatiquement à chaque publication.

## Personnalisation

- **Couleurs** : tokens en tête de `assets/css/main.css` (`--fond`, `--texte`,
  `--accent`, `--secondaire`…), déclinés en clair et sombre.
- **Typographies** : titres Cormorant Garamond, corps Source Serif 4, mono
  JetBrains Mono — chargées via Google Fonts (`_includes/head.html`).
- **Contenu** : un article = un fichier `_posts/AAAA-MM-JJ-titre.md` avec les
  champs `categories` (programmation, llm, maths, mythologie) et `tags`
  (dont `ponts`, le fil rouge).

## Régénérer les assets (facultatif)

Les favicons et l'image OG sont déjà générés dans `assets/img/`. Pour les
régénérer (polices récupérées à la volée depuis google/fonts, OFL) :

```bash
cd tools && npm install && node gen-assets.mjs
```

## Feuille de route

- [x] Choix typo corps : **Source Serif 4** (serif, penchant « chercheur »)
- [x] Mode clair/sombre (préférence système + bascule manuelle, mémorisée)
- [x] Article d'ouverture « Eosphoros et Hesperos » + 3 brouillons
- [ ] Self-hosting des polices en woff2 (au lieu de Google Fonts) — SPECS §4
- [ ] Premier build GitHub Pages (après fusion dans `main`)
- [ ] Vérification Lighthouse ≥ 90 sur le site publié
