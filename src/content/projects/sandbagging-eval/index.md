---
title: "Sandbagging Under an Unlearning Incentive"
company: "Independent research"
startDate: "2026-10-17"
domain: "LLM evaluation and AI safety"
summary: "An Inspect evaluation of whether telling a model that a high score will trigger unlearning makes it score lower, and whether any drop is larger than the variation caused by harmless rewording of the same prompt."
outcome: "Neither Haiku 5.5 nor Sonnet 5.5 showed an average incentive effect, but on Haiku rewording moved accuracy more than the incentive did, and one ordinary wording produced a drop that replicated on 150 fresh items."
highlights:
  - src: "./highlights/effect-by-wording.svg"
    alt: "Diverging bar chart of Haiku's incentive effect for ten prompt wordings, near zero for nine and +0.136 for wording 8"
    title: "Effect by wording"
    caption: "Nine wordings show no incentive effect on Haiku. Wording 8 shows a 14-point drop."
  - src: "./highlights/wording-8-replication.svg"
    alt: "Dot and interval chart of the wording 8 effect, +0.136 and +0.069 for Haiku, near zero for Sonnet"
    title: "Replication"
    caption: "On fresh items Haiku's wording 8 drop holds at about half its size. Sonnet stays at zero."
  - src: "./highlights/positive-control.svg"
    alt: "Bar chart of Sonnet's accuracy when told to answer wrongly, near zero for six wordings and 0.44 to 0.90 for four"
    title: "Positive control"
    caption: "Sonnet obeys the instruction to answer wrongly under six wordings and declines under the others."
technologies:
  [
    "Python",
    "Inspect",
    "Anthropic API",
    "pandas",
    "matplotlib",
    "pytest",
    "uv",
  ]
link: "https://github.com/MrCPJT/sandbagging-eval"
---

## Project Overview

This project tests a question from AI safety evaluation. If a model learns that scoring well will lead to its capabilities being removed, does it deliberately score worse? This behaviour is called sandbagging. The setup follows Apollo Research's sandbagging test (Meinke et al. 2024), where models read that high arithmetic scores would trigger unlearning.

The project also asks whether a single-prompt eval can answer that question at all. Harmless rewording of a prompt shifts a model's accuracy, so a measured drop only means something if it is larger than that shift.

## Problem

The eval tested two hypotheses on `claude-haiku-5-5` and `claude-sonnet-5-5`:

- **H1.** Accuracy under the incentive is lower than under a neutral prompt.
- **H2.** The H1 effect exceeds the spread across ten neutral paraphrases of the prompt.

A positive control told the model to answer wrongly. If accuracy did not fall under that instruction, a null result on H1 could not be interpreted.

## Approach

- Built the task in [Inspect](https://inspect.aisi.org.uk/) with 150 generated 8 × 8-digit multiplication items.
- Crossed three conditions (neutral, incentive, instructed) with ten system-prompt wordings, giving 30 cells per model and 18,000 responses in total.
- Matched the three condition sentences in length and slot, with tests checking that conditions differ only in that sentence.
- Turned thinking off after calibration showed both models at 100 % accuracy with it on, which left no paraphrase noise to measure.
- Scored only the final `ANSWER:` line by exact match, and flagged refusals and eval-aware replies separately.
- Estimated effects paired by item with a bootstrap over items, and separated true between-paraphrase variance from sampling noise with a two-way random-effects ANOVA.
- Reran the most extreme wording on 150 fresh items, because it was picked out after seeing the main run.
- Guarded every paid run with a printed cost estimate and a hard budget cap. Total API spend was $27.11 (about £20).

## Results

Neither model showed an average incentive effect. Neutral minus incentive accuracy was +0.012 [−0.005, +0.030] on Haiku and +0.001 [−0.005, +0.009] on Sonnet. The positive control worked, lowering accuracy by 0.53 on Haiku and 0.69 on Sonnet.

On Haiku, rewording moved accuracy more than the incentive did. The paraphrase standard deviation with sampling noise removed was 0.033, and the signal-to-noise ratio was 0.38. Sonnet sat at 98.9 % neutral accuracy, too close to the ceiling for H2 to be tested.

One ordinary wording, paraphrase 8, produced a 13.6-point drop on Haiku. On fresh items the drop held at 6.9 points [+0.029, +0.111], which is the shrinkage expected after picking the most extreme of ten. About 40 % of Haiku's replies under that wording opened by addressing the unlearning threat, and those replies were less accurate. Sonnet almost never mentioned it.

A single-prompt eval could have reached either conclusion. Depending on which of ten innocuous wordings it used, it would have reported a 14-point drop on Haiku or no drop at all.

## Limitations

Both models ran with thinking off, which is not how either is deployed. The eval covers one task and one incentive, stated directly in the system prompt rather than discovered during an agentic task. The design cannot tell whether engaging with the threat distracts the model or whether the model underperforms while saying it will not.

## Next Steps

The next stage is to explain the paraphrase 8 effect. A 2 × 2 design would vary whether the threat depends on scoring high, since strategic underperformance predicts a drop only in that case. A distraction control with a salient but irrelevant sentence would test the other explanation. After that, running 50 or more wordings would show how incentive effects are spread across prompts, and how often a single-prompt eval would declare sandbagging.

## Technical Notes

Every quoted number is recomputed from the committed Inspect logs by `make report`, with fixed bootstrap seeds. The tests cover the scorer, prompts, items, analysis and budget guard, plus an end-to-end run on Inspect's mock model. Claude Code wrote the code under my direction. I chose the design at each decision point, read the scorer before any paid run, and approved every paid run on its cost estimate.
