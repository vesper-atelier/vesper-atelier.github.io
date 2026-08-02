---
title: Contact
description: Une remarque, une question, une idée de pont — écrivez-moi.
---
Une remarque, une question, une idée de pont entre deux disciplines ?
Ce carnet se lit dans le calme ; il se répond de même.

**Le plus simple** : un courriel direct à
<a href="mailto:vesper@vesper-atelier.github.io">vesper@vesper-atelier.github.io</a>.

## Formulaire

Le formulaire ci-dessous ouvre votre messagerie avec le message pré-rempli
(la destination reste votre logiciel de courrier : rien n'est stocké, rien ne
quitte votre machine).

<form class="formulaire" id="formulaire-contact">
  <div class="champ">
    <label for="champ-nom">Nom</label>
    <input type="text" id="champ-nom" name="nom" autocomplete="name" required>
  </div>

  <div class="champ">
    <label for="champ-courriel">Adresse de réponse</label>
    <input type="email" id="champ-courriel" name="courriel" autocomplete="email" required>
  </div>

  <div class="champ">
    <label for="champ-message">Message</label>
    <textarea id="champ-message" name="message" rows="8" required></textarea>
  </div>

  <button type="submit" class="bouton">Ouvrir ma messagerie</button>
  <p class="champ-aide" id="formulaire-aide" role="status" aria-live="polite"></p>
</form>
