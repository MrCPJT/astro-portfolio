---
title: "Modelling Epidemic Spread in a Dynamical Network"
company: "University of Exeter"
startDate: "2022-01-01"
endDate: "2022-04-30"
domain: "Epidemic simulation and dynamic network modelling"
summary: "A third-year project studying how changing network structure affects SIR and SIRS epidemic simulations."
technologies:
  ["R", "EpiModel", "SIR/SIRS", "dynamic networks", "sensitivity analysis"]
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

Each simulation ran for 1,000 daily steps from one infected person, with a transmission probability of 0.05, an act rate of 9.6 and a recovery rate of 0.05. Each network setting was run 10 times, giving 5,450 simulations across the saved sweeps. An outbreak was short-term if infections peaked above 20 % of the population, and long-term if more people had been infected or recovered than remained susceptible on day 1,000.

On a 100-person network, connectivity mattered most. Averaged over partnership durations, the share of runs ending in a long-term epidemic rose from 1 % at a mean of 0.5 partners to 61 % at 1.5. Longer partnerships lowered it, from 54 % at a mean duration of 10 days to about 10 % at 100 days. Population size from 100 to 1,000 had a minimal effect.

The SIRS extension added waning immunity (1/90 per day), two groups of 500 people with different connectivity, and scheduled changes for lockdowns, vaccination and variants. Infection was still present on day 1,000 in 28 of the 30 runs, with 8 % to 12 % of the population infected on average.

## Technical Notes

The repository contains the README and supporting project material, with the full detail kept in the linked PDF noted by the project. The core technical stack centred on R and EpiModel for stochastic network-based epidemic simulation.

## Next Steps

A natural next step would be to formalise the sensitivity analysis outputs into a reproducible report and compare dynamic-network results against simpler homogeneous-mixing simulations.
