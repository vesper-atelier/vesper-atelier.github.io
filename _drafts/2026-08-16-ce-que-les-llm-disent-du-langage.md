---
layout: post
title: "Ce que les modèles de langage apprennent du langage"
date: 2026-08-16 06:00:00 +0200
categories: [llm]
tags: [langage]
description: "Brouillon — un modèle de langage n'a pas lu les mythes : il a lu des milliards de phrases. Et pourtant…"
---

*Brouillon de démonstration — LLM.*

Un grand modèle de langage n'a pas d'expérience du monde. Il n'a pas lu Homère,
ni Hésiode, ni un almanach : il a lu des milliards de phrases, dans l'ordre où
les humains les ont écrites, avec tout ce que cela charrie — les idées, les
préjugés, les rythmes, les silences.

## Le langage comme statistique

Ce qu'un tel modèle apprend, au fond, c'est une carte des cooccurrences : quels
mots suivent quels mots, quelles idées fréquentent quelles idées.[^1] C'est
une forme de savoir étrange — sans référent, sans expérience du monde — et
pourtant singulièrement efficace pour prédire la suite d'une phrase.

Le langage est un tissu d'habitudes statistiques. Les nommer précisément, c'est
commencer à comprendre comment la langue s'organise — et parfois se piège
elle-même.

## Ce que la réponse typique veut dire

Le plus intéressant n'est pas ce que ces modèles savent faire, mais ce qu'ils
nous renvoient : une image statistique de notre propre langue, débarrassée de
l'intention. On y voit nos automatismes, nos associations, nos lieux communs.

Une réponse de modèle est vraie au sens où elle est *typique* : elle ressemble
à ce qui est statistiquement fréquent dans le corpus d'entraînement. La
typicité n'est pas la vérité.[^2]

*— Brouillon. Article complet à venir.*

[^1]: Les modèles de langage modernes estiment, à chaque étape, une
      distribution de probabilité sur le mot suivant, conditionnée par tout le
      contexte précédent. L'« intelligence » perçue est d'abord une
      modélisation fine de ces régularités.
[^2]: Voir la discussion autour du « perroquet stochastique » (Bender et al.,
      2021) : une performance statistique impeccable peut coexister avec une
      absence totale de compréhension. Le débat reste ouvert.
