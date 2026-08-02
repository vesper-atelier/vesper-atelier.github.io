/* ═══════════════════════════════════════════════════════════════════
   Vesper Atelier — scripts
   — Bascule clair/sombre (mémoire locale, suit le système par défaut)
   Zéro dépendance, ~0,8 Ko gzippé. Pas de formulaire : le contact est
   un simple mailto (SPECS v3 §7.5).
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

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
})();
