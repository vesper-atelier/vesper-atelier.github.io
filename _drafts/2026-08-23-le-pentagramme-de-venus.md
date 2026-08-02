---
layout: post
title: "Le pentagramme de Vénus"
date: 2026-08-23 06:00:00 +0200
categories: [maths]
tags: [astronomie, venus]
description: Brouillon — huit ans, cinq cycles, une étoile à cinq branches dessinée dans le ciel.
math: true
---

*Brouillon de démonstration — mathématiques.*

La Terre met environ 365,256 jours à faire le tour du Soleil ; Vénus,
224,7 jours. Rapportées l'une à l'autre, ces deux périodes produisent une
période synodique d'environ 584 jours — et cinq de ces cycles valent presque
exactement huit ans.

## Le calcul

La période synodique de Vénus — le temps entre deux retours à la même
configuration vue de la Terre — se déduit des périodes orbitales sidérales de
la Terre et de Vénus, respectivement notées $T_T$ et $T_V$ :

$$ \frac{1}{T_{\text{syn}}} = \frac{1}{T_V} - \frac{1}{T_T} $$

Soit, avec $T_T = 365{,}256$ jours et $T_V = 224{,}701$ jours :

$$ T_{\text{syn}} = \frac{T_T \cdot T_V}{T_T - T_V} \approx 583{,}9 \text{ jours} $$

Cinq périodes synodiques valent presque exactement huit années terrestres :

$$ 5 \cdot T_{\text{syn}} \approx 8 \cdot T_T $$

```ruby
annee_terre = 365.256   # jours — année sidérale
annee_venus = 224.701   # jours — année sidérale de Vénus

# Période synodique : le temps entre deux alignements Terre–Vénus–Soleil
# du même type (par exemple deux élongations maximales du soir).
periode_synodique = 1 / (1 / annee_venus - 1 / annee_terre)

puts format("%.1f jours", periode_synodique)                 # 583.9 jours
puts format("%.2f ans", 5 * periode_synodique / annee_terre) # 8.00 ans
```

Cinq périodes synodiques : 2 919,6 jours. Huit années terrestres : 2 922,0
jours. L'écart est de deux jours et demi sur huit ans — moins de 0,1 %.

## La figure dans le ciel

Cette quasi-coïncidence a une conséquence visuelle : si l'on reporte, de huit
ans en huit ans, la position de Vénus au moment de ses élongations maximales,
on obtient une étoile à cinq branches presque parfaite — le « pentagramme de
Vénus ».

L'écart se mesure précisément. Chaque période synodique décale la configuration
d'un résidu angulaire $\Delta\theta$, rapporté au tour complet :

$$ \Delta\theta = 2\pi\left(\frac{5 \cdot T_{\text{syn}}}{8 \cdot T_T} - 1\right) \approx 2\pi \cdot 0{,}0008 $$

Sur huit ans, la figure ne se referme donc pas tout à fait : elle laisse un
décalage d'environ $0{,}08\,\%$, assez lent pour être observé comme une figure
stable sur des décennies.

## Une résonance approchée

Le rapport 5:8 entre les périodes de Vénus et de la Terre est une résonance
orbitale proche mais non exacte, contrairement à celle, bien réelle, de Pluton
et Neptune (3:2). Deux jours et demi d'écart sur huit ans suffisent à ce que
la figure se dégrade lentement — assez lentement pour rester reconnaissable à
l'échelle d'une vie humaine.[^1]

Ce que l'exemple illustre : les mathématiques ne sont pas seulement la science
de l'exact, mais aussi la science de ce qui tient « à peu près » sur une durée
donnée — et de la mesure précise de cet à-peu-près.

*— Brouillon. Article complet à venir.*

[^1]: La résonance 5:8 entre les périodes de Vénus et de la Terre est
      approximative — contrairement à celle, bien réelle, de Pluton et Neptune
      (3:2). La figure observable reste stable assez longtemps pour être
      reconnue, puis se dégrade.
