---
title: "A Literature Review Pipeline That Checks Its Own Work"
company: "Independent research"
startDate: "2026-10-16"
domain: "LLM agents and evaluation"
pinned: true
summary: "A pipeline of Claude agents that searches, screens, reads and writes a literature review in rounds, with a benchmark for each stage and a rule fixed before every experiment."
outcome: "Rules registered before each run rejected 20 of 54 ideas and adopted three. On 16,242 expert-labelled abstracts the Haiku screener matched the best published model's macro F1 of 0.77."
thumbnail: "/sprites/projects/literature-review-pipeline.png"
highlights:
  - src: "./highlights/pipeline.svg"
    alt: "Diagram of one review round, with finder, screener, snowball, extractor, triage, synthesis, verifier and challenger agents and three reliability measures"
    title: "One round"
    caption: "Search, screen, snowball, extract, triage, write and check."
  - src: "./highlights/key-papers.svg"
    alt: "Bar chart of 67 key papers across four reviews: 18 never found, 3 screened out, 27 passed and never read, 9 dropped at triage, 10 cited"
    title: "Key papers"
    caption: "The reviews cited 10 of 67 key papers and never read 27 that passed screening."
  - src: "./highlights/batch-size.svg"
    alt: "Dot and interval chart of the change in expert includes excluded per pass at 5, 15, 30 and 60 abstracts a call, with only 30 above zero"
    title: "Batch size"
    caption: "At 30 abstracts a call the screener loses about 15 more expert includes a pass."
technologies:
  [
    "Python",
    "Claude Code",
    "Semantic Scholar",
    "OpenAlex",
    "arXiv",
    "PubMed",
    "SQLite",
    "GitHub Actions",
  ]
---

## Project Overview

A literature review answers a research question by finding the papers that bear on it, reading them, and writing up where they agree and where they conflict. This project is a pipeline of Claude agents that does that work in rounds inside Claude Code, which is Anthropic's coding agent. Each round searches Semantic Scholar, OpenAlex, arXiv, PubMed and the web, screens the abstracts against a written rubric, and follows citations outwards from the strongest papers. It then extracts claims from the full texts and writes a draft, and the questions the draft cannot answer become the next round's search queries.

Most of the work went into finding out how far the result can be trusted. An agent pipeline returns a fluent review whether or not its search was wide enough, so the review is no evidence of its own quality. I built a benchmark for each stage, and I set rules that decide when a change to the pipeline has earned its place.

## Problem

A review can fail in three places, and none of them shows in the finished text.

- **Search.** The papers that matter were never found.
- **Screening.** A relevant paper was found and then thrown out on its abstract.
- **Writing.** A sentence says more than the paper it cites.

A fourth problem sits under the other three. A language model gives a different answer each time it runs, so a new prompt can look better than the old one by chance. Ten passes of one screener prompt over the same 300 abstracts differed by up to 7 percentage points from one pass to the next, so a smaller change cannot be told from noise in a single run.

## Approach

- Split the work across seven agents by cost, with Haiku finding and screening papers, Sonnet extracting and checking claims, and Opus writing the review.
- Kept a ledger of every paper a review touched, deduplicated by identifier and title, so a review can stop and resume across rounds.
- Gated the draft in code. A claim reaches the writer only if its supporting quote is found in the paper's text, and a review passes only when every citation resolves to a claim that passed.
- Built four checks into each round that need no domain expert. They are recall against a held-out survey's reference list, a capture-recapture estimate of the papers still missing, a blind recheck of sampled exclusions by a stronger model, and an adversarial search against every claimed gap.
- Froze the inputs for a benchmark of each stage, and logged every run with its commit, agent file hash, model, data split and cost.
- Registered a rule in a commit before the first run of each idea. A rule names the measure, the data split, the number of passes and the threshold, and the test split is scored once.
- Separated deciding measures from diagnostic ones. A measure became diagnostic once I had seen a change move it without improving the review.
- Scored the screener and the extractor against human decisions from the AgentSLR dataset (Padarha et al., arXiv 2603.22327), which holds 16,242 abstracts on seven pathogens with an epidemiologist's include or exclude decision for each. For extraction I ported the paper's scoring code and checked the port against the original.

A held-out survey is a recent published review of the same topic, set aside so that its reference list can score the search. Capture-recapture comes from ecology, where the overlap between two catches estimates how many animals were never caught. Here the two catches are the papers found by search and the papers found by following citations.

## Results

The rules rejected most of what I tried. Of the 54 ideas in the ledger, 20 carry a verdict of rejected, not adopted or not supported, and three are marked adopted, all of them in the step that fetches full texts. The remainder are benchmarks, baselines and open questions. The log holds 403 runs between 9 and 20 November 2026, at a logged cost of $399 (about £300).

Some numbers improved while the review did not. A stricter screening prompt cut the share of papers marked unclear by 11.7 percentage points, yet it passed 228.4 papers of 300 to the reading stage against 227.0 for the stock prompt. The prompt had relabelled unclear papers as includes while the reading load stayed where it was, so the unclear rate can no longer decide an adoption.

The tool that runs a benchmark changes its result. One screener prompt wrongly excluded 0.6 relevant papers a pass when it ran through Claude Code's Agent tool and 3.1 a pass through my benchmark runner. I tested three candidate causes and none explained the gap, so every comparison now keeps both arms on one runner.

Against expert labels the cheapest model held up. On all 16,242 AgentSLR abstracts the Haiku screener scored a macro F1 of 0.77, a measure that balances missed papers against wrongly kept ones, and that equals the best model in the paper. It passed 83 % of the experts' includes where that model kept 59 %. The comparison is not like for like, because the paper released no per-paper predictions, its models ran at a higher reasoning setting, and the labels are public and may sit in a model's training data. The full pass cost $5.67. On a 1,257-abstract sample Sonnet lost the same 95 expert includes and passed fewer irrelevant papers, at 14 times the cost of Haiku.

Larger batches lose papers. With the rule registered first, I ran the screener at 5, 30 and 60 abstracts a call against its usual 15. At 30 a call it excluded 15.3 more of the 417 expert includes a pass, with a 95 % interval of 4.7 to 26.7, while 60 a call sat inside the noise. The rule had named that pattern inconsistent in advance, so the cap stayed at 15.

The end-to-end measure is the least flattering. Four finished reviews were scored against 67 key papers, taken from a held-out survey for each review, and the reviews cited 10 of them. Search never found 18, screening removed 3, triage dropped 9, and 27 passed screening and were never read. Screening lost the fewest, so the next experiments moved to what gets read and what survives triage.

I then tested the obvious fix, which was to read more. Extracting 30 further included papers raised the key papers cited from 4 to 6, but it added 1.33 wanted findings out of 17 against a registered bar of 3. The experiment cost $59.36 across its three arms, and the rule marked the change not supported.

The remaining stages have baselines. The extractor recovers 74.4 % of the reference findings on a loose match across 30 papers, and an arm that read only abstracts lost 53 points of that. The verifier, which is the agent that checks each sentence against its source, ruled none of 100 claims supported once their evidence had been inverted. It also flagged 10 % of sound claims against a limit of 5 %, so it failed its own rule.

## Limitations

The key papers for the end-to-end measures come from surveys filtered by a Claude screener, and that filter still awaits a check by hand. The surveys fit their reviews unevenly, so a low score sometimes measures the survey more than the review. Most benchmarks rest on three or four reviews, which leaves wide intervals, and several verdicts say only that the data could not separate the arms. Human labels at scale exist for screening and extraction alone, in one field, and elsewhere a model judges a model. The gap between the two runners remains unexplained.

## Next Steps

One search change passed its rule. Rewriting each query three ways in different vocabulary recovered 40.6 % of the expert includes that the stock search missed, and it goes to one trial on a live review before it is installed.

After that the work moves to triage and synthesis, because the read-more experiment showed that a finding can be lost even when its paper is read. The verifier needs a hand-labelled set of 100 sentences to test whether it is too lenient between full and partial support.

## Technical Notes

The scripts use the Python standard library alone. Unit tests run on every pull request, and mutation checks break the code one piece at a time to confirm that a test fails. The local arXiv search runs on a 6.6 GB SQLite full-text index of 3.2 million papers, so it cannot be rate limited. Claude Code wrote the code under my direction. I chose what to test, ruled by hand on disputed labels, approved each budget and made every adoption decision.
