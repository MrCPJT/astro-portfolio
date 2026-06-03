---
title: "Modelling Epidemic Spread in a Dynamical Network"
company: "University of Exeter"
startDate: "2022-01-01"
endDate: "2022-04-30"
domain: "Epidemic simulation and dynamic network modelling"
summary: "A third-year project studying how changing network structure affects SIR and SIRS epidemic simulations."
technologies:
  [
    "R",
    "EpiModel",
    "SIR models",
    "SIRS models",
    "dynamic networks",
    "sensitivity analysis",
    "simulation",
  ]
link: "https://github.com/MrCPJT/Modelling-Epidemic-Spread-in-a-Dynamical-Network"
---

## Project Overview

This project studied how network structure can affect epidemic outcomes in SIR and SIRS simulations. Rather than modelling a population as a static or uniformly mixed group, the project used dynamic network simulation to explore how contact structure changes the spread of infection.

## Problem

Network assumptions can strongly influence epidemic simulations. The project investigated how changing network parameters affects simulated disease spread, and how extending a baseline SIR model into SIRS can increase realism by allowing individuals to become susceptible again.

## Approach

- Generated probabilistic, non-static networks in R using the EpiModel package.
- Defined key network and epidemic modelling concepts before building simulations.
- Ran hundreds of simulations to study how network parameters affected epidemic outcomes.
- Performed two-dimensional sensitivity analysis across selected model parameters.
- Extended the baseline SIR formulation by adding an additional susceptible state to create an SIRS model.
- Used updater-style logic for time-sensitive events and explored disease progression behaviour.
- Summarised findings with reference to possible real-world implications.

## Results

The project demonstrated how network structure and parameter choices can materially change epidemic trajectories. The extension from SIR to SIRS also highlighted how additional biological assumptions can improve model realism, while increasing simulation complexity.

## Technical Notes

The repository contains the README and supporting project material, with the full detail kept in the linked PDF noted by the project. The core technical stack centred on R and EpiModel for stochastic network-based epidemic simulation.

## Next Steps

A natural next step would be to formalise the sensitivity analysis outputs into a reproducible report and compare dynamic-network results against simpler homogeneous-mixing simulations.
