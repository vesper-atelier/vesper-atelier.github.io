/* ═══════════════════════════════════════════════════════════════════
   Vesper Atelier — scripts
   — Bascule clair/sombre (mémoire locale, suit le système par défaut)
   — Formulaire de contact : compose un mailto (rien n'est stocké)
   Zéro dépendance, ~1,5 Ko gzippé.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Thème clair/sombre ──────────────────────────────────────── */

  var racine = document.documentElement;
  var systemeSombre = window.matchMedia("(prefers-color-scheme: dark)");
  var bouton = document.getElementById("bascule-theme");
  var cleStockage = "vesper-theme";

  /** Thème effectif : choix manuel sinon préférence système. */
  function themeEffectif() {
    var choix = null;
    try {
      choix = localStorage.getItem(cleStockage);
    } catch (e) {
      /* stockage indisponible (navigation privée stricte) : système */
    }
    if (choix === "light" || choix === "dark") return choix;
    return systemeSombre.matches ? "dark" : "light";
  }

  /** Applique le thème et met le bouton en cohérence. */
  function appliquerTheme(theme) {
    racine.dataset.theme = theme;
    if (bouton) {
      var sombre = theme === "dark";
      bouton.setAttribute("aria-pressed", sombre ? "true" : "false");
      bouton.setAttribute(
        "aria-label",
        sombre ? "Basculer en thème clair" : "Basculer en thème sombre"
      );
      bouton.title = sombre ? "Basculer en thème clair" : "Basculer en thème sombre";
    }
  }

  appliquerTheme(themeEffectif());

  if (bouton) {
    bouton.addEventListener("click", function () {
      var suivant = themeEffectif() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(cleStockage, suivant);
      } catch (e) {
        /* on applique quand même pour la session */
      }
      appliquerTheme(suivant);
    });
  }

  /* Sans choix manuel, on suit les changements du système en direct */
  systemeSombre.addEventListener("change", function () {
    try {
      if (localStorage.getItem(cleStockage)) return;
    } catch (e) {
      /* on suit le système */
    }
    appliquerTheme(systemeSombre.matches ? "dark" : "light");
  });

  /* ── Formulaire de contact (mailto) ───────────────────────────── */

  var formulaire = document.getElementById("formulaire-contact");
  if (formulaire) {
    var aide = document.getElementById("formulaire-aide");
    var dest = "vesper@vesper-atelier.github.io";

    formulaire.addEventListener("submit", function (evenement) {
      evenement.preventDefault();

      var nom = document.getElementById("champ-nom").value.trim();
      var courriel = document.getElementById("champ-courriel").value.trim();
      var message = document.getElementById("champ-message").value.trim();

      if (!nom || !courriel || !message) {
        if (aide) aide.textContent = "Merci de remplir tous les champs.";
        return;
      }

      var sujet = "Message depuis le carnet — " + nom;
      var corps =
        "De : " + nom + " <" + courriel + ">\n\n" + message;

      window.location.href =
        "mailto:" + dest +
        "?subject=" + encodeURIComponent(sujet) +
        "&body=" + encodeURIComponent(corps);

      if (aide) aide.textContent = "Votre messagerie s'ouvre…";
    });
  }
})();
