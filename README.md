# Vesper Atelier

Site vitrine de Vesper Atelier, atelier numérique français. Le site est une base statique HTML/CSS/JS compatible avec GitHub Pages, sans étape de build.

## Développement local

Depuis la racine du dépôt :

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000>.

## Structure

- `index.html` : accueil et présentation des trois expertises
- `a-propos.html` : histoire et valeurs
- `services.html` : prestations et méthode
- `contact.html` : formulaire `mailto`
- `styles.css` : tokens de marque, composants et responsive design
- `script.js` : navigation mobile et formulaire
- `assets/` : favicon et image Open Graph

## Déploiement

Le dépôt `vesper-atelier.github.io` est servi automatiquement par GitHub Pages à l'adresse <https://vesper-atelier.github.io>. Dans GitHub, vérifier que Pages utilise la branche `main` et la racine `/` comme source.

Les URLs, l'adresse email de contact et la disponibilité affichée dans `contact.html` sont à confirmer avant publication.
