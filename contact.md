---
layout: default
title: Contact
description: >-
  Écrire à Vesper Atelier — formulaire de contact, coordonnées et présence
  sur GitHub.
---

{% comment %}
  Adresse de contact : placeholder — à confirmer lors du figement de la copy
  (domaine de l'atelier non encore déployé). Voir README.md « À faire ».
{% endcomment %}

<section class="entete-page">
  <div class="conteneur">
    <p class="fil">Accueil / Contact</p>
    <h1>Contact</h1>
    <p class="entete-sous-titre">Écrivez quelques lignes — je réponds avec soin.</p>
  </div>
</section>

<section class="section" aria-labelledby="contact-titre">
  <div class="conteneur grille-contact">

    <div class="colonne-contact-texte">
      <h2 class="section-titre" id="contact-titre">Parlons de votre projet</h2>
      <p class="section-texte">
        Une idée de site, une tâche à automatiser, une envie créative&nbsp;?
        Décrivez-la en quelques mots — le cadre, l'échéance, ce qui vous tient
        à cœur. Le premier échange est offert et sans engagement.
      </p>

      <h3 class="sous-titre">Coordonnées</h3>
      <ul class="liste-coordonnees">
        <li>
          <span class="coordonnee-libelle">Courriel</span>
          <a href="mailto:bonjour@vesper-atelier.fr">bonjour@vesper-atelier.fr</a>
        </li>
        <li>
          <span class="coordonnee-libelle">GitHub</span>
          <a href="https://github.com/vesper-atelier" rel="noopener noreferrer">github.com/vesper-atelier</a>
        </li>
        <li>
          <span class="coordonnee-libelle">Lieu</span>
          France — travail à distance, en Europe
        </li>
      </ul>
    </div>

    <form class="formulaire" id="formulaire-contact" action="mailto:bonjour@vesper-atelier.fr" method="post" enctype="text/plain">
      <div class="champ">
        <label for="nom">Nom ou structure</label>
        <input type="text" id="nom" name="nom" autocomplete="name" required>
      </div>
      <div class="champ">
        <label for="courriel">Votre courriel</label>
        <input type="email" id="courriel" name="courriel" autocomplete="email" required>
      </div>
      <div class="champ">
        <label for="objet">Objet</label>
        <select id="objet" name="objet">
          <option value="Site sur mesure">Site sur mesure</option>
          <option value="Outil d'automatisation">Outil d'automatisation</option>
          <option value="Projet créatif">Projet créatif</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div class="champ">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="6" required></textarea>
      </div>
      <p class="formulaire-aide" id="aide-mailto">
        L'envoi ouvre votre messagerie avec le message pré-rempli
        (courriel&nbsp;: bonjour@vesper-atelier.fr).
      </p>
      <button type="submit" class="bouton bouton-primaire">Envoyer le message</button>
    </form>

  </div>
</section>

<script>
  // Formulaire mailto : construit un lien mailto enrichi (objet + corps)
  // à l'envoi, en complément de l'action mailto native (progressive enhancement).
  (function () {
    var formulaire = document.getElementById('formulaire-contact');
    if (!formulaire) { return; }
    var dest = 'bonjour@vesper-atelier.fr';
    var aide = document.getElementById('aide-mailto');
    formulaire.addEventListener('submit', function (e) {
      e.preventDefault();
      var objet = document.getElementById('objet').value || 'Projet Vesper Atelier';
      var nom = document.getElementById('nom').value.trim();
      var courriel = document.getElementById('courriel').value.trim();
      var message = document.getElementById('message').value.trim();
      var lignes = ['Bonjour,', '', message, '', '— ' + nom, courriel ? 'Réponse souhaitée à : ' + courriel : ''];
      var corps = lignes.join('\n');
      window.location.href = 'mailto:' + dest + '?subject=' +
        encodeURIComponent(objet) + '&body=' + encodeURIComponent(corps);
    });
    if (aide) { aide.hidden = false; }
  })();
</script>
