---
layout: post
title: "Vénus : une planète, deux noms"
date: 2026-08-02 06:00:00 +0200
categories: [mythologie]
tags: [venus, astronomie]
description: L'étoile du matin et l'étoile du soir ne sont qu'une seule planète — Vénus. Histoire d'une identification.
---

Les Grecs de l'Antiquité désignaient deux astres distincts : l'astre du matin,
appelé Eosphoros ou Phosphoros, « celui qui apporte la lumière » ; et l'astre
du soir, appelé Hesperos.[^1] Rien, dans l'observation directe, ne signalait
qu'il s'agissait du même objet : les deux apparitions ne se montrent jamais
ensemble.

## Pourquoi deux étoiles

Vénus est l'objet le plus brillant du ciel après le Soleil et la Lune. Mais
elle ne s'éloigne jamais beaucoup du Soleil : au maximum, elle en est distante
d'environ 47 degrés.[^2] Il en résulte une alternance : pendant plusieurs
mois, elle suit le Soleil au couchant et brille le soir ; puis elle passe
derrière ou devant lui, disparaît quelques semaines, et réapparaît à l'aube,
précédant l'astre du jour.[^3]

Un observateur voit donc deux lumières qui ne se montrent jamais en même temps
— l'une le matin, l'autre le soir. Croire à deux étoiles était raisonnable.

## L'identification

La tradition attribue la première identification à Pythagore — ou à
Parménide, les doxographes hésitent.[^4] Peu importe qui l'a établie : le
raisonnement est vérifiable. Il a fallu des observations accumulées et
l'hypothèse que deux mondes séparés par la nuit pouvaient être un seul objet.

Un petit programme pour le vérifier :

```ruby
# L'astre du matin et l'astre du soir,
# deux noms pour un seul objet.
eosphoros = "Vénus"   # visible à l'aube
hesperos  = "Vénus"   # visible au crépuscule

raise "deux astres ?" unless eosphoros == hesperos  # l'identification tient.
```

## La mécanique de l'alternance

La période de révolution de Vénus autour du Soleil est de 224,7 jours ; celle
de la Terre, de 365,256 jours. La période synodique — le temps entre deux
retours à la même configuration vue de la Terre — vaut environ 584 jours.
C'est ce rythme qui gouverne l'alternance entre ciel du soir et ciel du matin.

L'identification d'Eosphoros et Hesperos est un cas simple de ce que fait
l'observation patiente : regrouper deux phénomènes distincts sous un seul
objet, dès que la mécanique l'explique.

---

[^1]: Homère et Hésiode connaissent Hesperos, l'astre du soir ; le nom
      d'Eosphoros (ou Phosphoros, « le porteur de lumière ») désigne le même
      astre vu à l'aube. Les deux noms ont persisté : « étoile du berger » et
      « étoile du matin ».
[^2]: C'est l'élongation maximale de Vénus, environ 47°. Au-delà de cette
      limite, la planète « retombe » vers le Soleil : elle n'est jamais
      visible au milieu de la nuit.
[^3]: La période synodique de Vénus — le temps entre deux retours à la même
      configuration vue de la Terre — vaut environ 584 jours. C'est le rythme
      de son va-et-vient entre ciel du soir et ciel du matin.
[^4]: La doxographie (Diogène Laërce, entre autres) attribue l'identification
      d'Eosphoros et Hesperos à Pythagore ; certains fragments suggèrent
      Parménide. La question historique reste ouverte.
