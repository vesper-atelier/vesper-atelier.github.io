---
layout: post
title: "Le pentagramme de Vénus"
date: 2026-08-23 06:00:00 +0200
categories: [maths]
tags: [ponts, astronomie, venus]
description: Brouillon — huit ans, cinq cycles, une étoile à cinq branches dessinée dans le ciel.
---

*Brouillon de démonstration — mathématiques.*

Il y a des coïncidences que les mathématiciens préfèrent appeler des
structures, tant elles semblent avoir été écrites à l'avance. En voici une :
la Terre fait le tour du Soleil en un an, Vénus en 224,7 jours. Rapportées
l'une à l'autre, ces deux périodes produisent une période synodique d'environ
584 jours — et cinq de ces cycles valent presque exactement huit ans.

## Le calcul

```python
annee_terre = 365.256   # jours — année sidérale
annee_venus = 224.701   # jours — année sidérale de Vénus

# Période synodique : le temps entre deux alignements Terre–Vénus–Soleil
# du même type (par exemple deux élongations maximales du soir).
periode_synodique = 1 / (1 / annee_venus - 1 / annee_terre)

print(f"{periode_synodique:.1f} jours")   # 583.9 jours
print(f"{5 * periode_synodique / annee_terre:.2f} ans")  # 8.00 ans
```

Cinq périodes synodiques : 2 919,6 jours. Huit années terrestres : 2 922,0
jours. L'écart est de deux jours et demi sur huit ans — moins de 0,1 %.

## La figure dans le ciel

Cette quasi-coïncidence a une conséquence visuelle remarquable. Si l'on
reporte, de huit ans en huit ans, la position de Vénus au moment de ses
élongations maximales, on obtient une étoile à cinq branches presque parfaite
— le fameux « pentagramme de Vénus » que les astronomes de l'Antiquité ont
observé sans pouvoir le nommer ainsi, et que les symbolistes ont ensuite
chargé de sens.

C'est un pont parfait entre les disciplines : un rapport de nombres entiers
approché (5 pour 8), une figure géométrique, un mythe — la déesse de l'amour
qui dessine une étoile au-dessus de nos têtes, soir après soir.[^1]

## L'approximation qui ouvre les yeux

Ce qui est beau, ici, ce n'est pas l'exactitude : c'est l'approximation.
Deux jours et demi d'écart sur huit ans suffisent à ce que la figure se
dégrade lentement — assez lentement pour qu'une civilisation entière ait le
temps de la voir, de la vénérer, d'écrire dessus des histoires.

Les mathématiques ne sont pas la science de l'exact : elles sont la science
de ce qui tient, à peu près, assez longtemps pour qu'on y voie une vérité —
et le ciel, lui, se charge du reste.

*— Brouillon. Article complet à venir.*

[^1]: La résonance 5:8 entre les périodes de Vénus et de la Terre est
      approximative — c'est une résonance orbitale proche mais non exacte,
      contrairement à celle, bien réelle, de Pluton et Neptune (3:2). La
      précision du mythe n'a pas besoin de l'exactitude de l'orbite : il lui
      suffit d'une coïncidence assez belle pour être racontée.
