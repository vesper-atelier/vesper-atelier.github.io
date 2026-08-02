---
layout: post
title: "Écrire pour le lecteur de six mois"
date: 2026-08-09 06:00:00 +0200
categories: [programmation]
tags: [ponts, ecriture]
description: "Brouillon — le code se lit deux fois : par la machine, et par celui qui reviendra dans six mois."
---

*Brouillon de démonstration — programmation.*

On dit souvent que le code est écrit pour les machines et relu par les
humains. C'est à moitié vrai : la machine le lit tout de suite, sans fatigue ;
l'humain, lui, le relira dans six mois, à trois heures du matin, avec un bug à
trouver et la moitié du contexte déjà oubliée. Écrire, c'est donc surtout
écrire pour ce lecteur-là.

## La politesse du code

Quelques habitudes simples tiennent lieu de politesse :

- nommer les choses pour ce qu'elles sont, pas pour ce qu'elles font à
  l'instant ;
- garder les fonctions courtes, une idée par fonction ;
- laisser le code dire l'essentiel, et les commentaires dire ce que le code
  ne peut pas dire : le *pourquoi*.

```ruby
# Calcule la période synodique de Vénus vue de la Terre.
# Pourquoi : la période synodique rythme l'alternance
# étoile du soir / étoile du matin (584 jours environ).
def periode_synodique(periode_terre, periode_planete)
  1.0 / (1.0 / periode_planete - 1.0 / periode_terre)
end

puts periode_synodique(365.256, 224.701).round(1)  # => 583.9
```

Le commentaire ne paraphrase pas la formule ; il donne la raison d'être. Dans
six mois, c'est lui qu'on cherchera.

## La lenteur assumée

Écrire lentement, c'est écrire une fois pour toutes. La précipitation
s'archive ; la patience se lit. C'est une vertu que les mathématiques
connaissent bien : une démonstration n'est pas finie quand elle est juste,
mais quand elle est claire. Le code est notre démonstration à nous.

*— Brouillon. Article complet à venir.*
