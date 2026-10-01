---
title: "Mathematically Modelling Microbial Interactions"
company: "University of Exeter"
startDate: "2022-09-01"
endDate: "2023-05-31"
domain: "Mathematical biology, Bayesian inference, and dynamical systems"
summary: "A final-year project modelling interactions between Staphylococcus aureus and Pseudomonas aeruginosa in co-culture."
outcome: "Bayesian fits of a two-species Lotka-Volterra model, plus a bifurcation analysis, showed the switch from co-existence to P. aeruginosa out-competing S. aureus."
figure:
  src: "./figure.png"
  alt: "Four bar charts of mean bacterial counts over time for each species grown alone and together"
  caption: "Mean bacterial counts over 13 hours, with error bars and a separate scale per panel. Grown together, S. aureus rises and then collapses while P. aeruginosa surges."
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

The data held four sets of bacterial counts (each species grown alone and together), with six replicates and 14 hourly measurements per set. A two-species generalised Lotka-Volterra model was fitted in Stan with weakly informative Cauchy priors, using 15 to 20 chains of 25,000 to 30,000 iterations with half discarded as warmup. Rhat was 1.00 or 1.01 for every parameter.

Grown alone, _S. aureus_ had the higher estimated growth rate, 1.01 (95 % credible interval 0.91 to 1.14) against 0.88 (0.77 to 1.01) for _P. aeruginosa_. Four co-culture set-ups were compared, differing in which parameters were refitted. Only the set-up that refitted everything captured the late surge in _P. aeruginosa_, and it moved the growth rates to 0.97 and 1.12. The report reads this as the interaction directly affecting growth.

A transcritical bifurcation in MATCONT marks where _P. aeruginosa_ has an equal effect on itself and on _S. aureus_. Past it, the species stop co-existing and _P. aeruginosa_ out-competes _S. aureus_. In all four fitted cases the model ended with _S. aureus_ dying out.

## Next Steps

Future work could compare alternative model structures, test sensitivity to prior choices, and validate fitted dynamics against additional experimental conditions.

## Technical Notes

The repository documents the modelling workflow and points to the full project PDF for detailed derivations and discussion. Supporting work included implementations of higher-dimensional generalized Lotka-Volterra models, pairwise models, and metabolite-mediated interaction cases.
