---
title: "Mathematically Modelling Microbial Interactions"
company: "University of Exeter"
startDate: "2022-09-01"
endDate: "2023-05-31"
domain: "Mathematical biology, Bayesian inference, and dynamical systems"
summary: "A final-year project modelling interactions between Staphylococcus aureus and Pseudomonas aeruginosa in co-culture."
technologies:
  [
    "R",
    "Stan",
    "Hamiltonian Monte Carlo",
    "MCMC",
    "generalized Lotka-Volterra",
    "MATCONT",
  ]
link: "https://github.com/MrCPJT/Mathematically-Modelling-Microbial-Interactions"
---

## Project Overview

This final-year project investigated the microbial interactions between _Staphylococcus aureus_ and _Pseudomonas aeruginosa_ in co-culture. It combined literature review, mathematical modelling, Bayesian parameter estimation, and dynamical systems analysis to understand how interaction regimes could change over time.

## Problem

Microbial communities are complex systems where species can compete, cooperate, or shift between interaction types depending on the surrounding conditions. The project focused on fitting and analysing models capable of explaining observed growth behaviour in mono-culture and co-culture experiments.

## Approach

- Performed a literature review covering microbial communities, the biological motivation for studying _S. aureus_ and _P. aeruginosa_, and prior models of microbial interaction.
- Reproduced existing modelling results to build intuition around generalized Lotka-Volterra systems and related mechanistic models.
- Preprocessed novel microbial growth data, including mono-culture and co-culture observations with six replicates per case.
- Normalised and summarised experimental data before fitting a mathematical model.
- Used R, RStan, and Stan to estimate unknown model parameters with Hamiltonian Monte Carlo.
- Validated sampling behaviour with MCMC convergence diagnostics.
- Analytically investigated nullclines, equilibria, and steady states.
- Explored system stability and bifurcation behaviour, identifying a transcritical bifurcation as a mechanism for changes in interaction dynamics.

## Results

The project connected experimental growth data with a fitted mathematical model and used dynamical systems analysis to interpret possible interaction changes. The final analysis showed how parameter estimates, steady-state behaviour, and bifurcation theory could be used together to reason about microbial co-culture dynamics.

## Technical Notes

The repository documents the modelling workflow and points to the full project PDF for detailed derivations and discussion. Supporting work included implementations of higher-dimensional generalized Lotka-Volterra models, pairwise models, and metabolite-mediated interaction cases.

## Next Steps

Future work could compare alternative model structures, test sensitivity to prior choices, and validate fitted dynamics against additional experimental conditions.
