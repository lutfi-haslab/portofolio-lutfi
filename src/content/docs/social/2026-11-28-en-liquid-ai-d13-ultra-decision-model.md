---
title: "Liquid AI d1.3-ultra: A Model That Doesn't Answer, It Just Decides"
description: "Liquid AI released d1.3-ultra on 27 November 2026, a decision model that tops the Artificial Analysis Decision Index at 76.4. It does not write a single word — it returns probabilities, and it bills per task, not per token."
date: 2026-11-28T11:52:00.000Z
tags:
  - AI
  - Machine Learning
  - Liquid AI
lang: en
pair: 2026-11-28-liquid-ai-d13-ultra-model-yang-tidak-menjawab
source: "My article: Liquid AI d1.3-ultra: Model yang Tidak Menjawab, Cuma Memutuskan"
---

Yesterday, 27 November, Liquid AI released d1.3-ultra in a single sentence on X: "Today we release d1.3-ultra, our most powerful decision model, recursively improved from d1-ultra."

I read that sentence twice, because this model does not do what language models usually do. It does not write a single word. It decides.

A decision model takes an input — a support email, an invoice, a photo of a receipt, a voice recording — together with a list of questions, and returns an answer for each question with the probability of each option, in a single pass. No tokens are generated, so the bill covers input tokens only.

Liquid's own example is down to earth: a triage pipeline receives thousands of emails, and for each one the model answers "needs escalation: yes 0.82, no 0.15, don't know 0.03". The team sets a threshold — above 0.8 it is handled automatically, below it a human takes over. A mechanism like this only works if the numbers are honest. That is where the Artificial Analysis index comes in: the score is accuracy minus a Brier penalty, so a wrong answer given with high confidence is punished more heavily than a wrong answer given hesitantly.

And the score does top that index. Artificial Analysis ran its own testing across 27 decision models, and d1.3-ultra sits first in Decision Index v2.1 at 76.4 — half a point above Baseten's Bison 31B at 75.9. Its own predecessor, d1.2-ultra, trails by 1.6 points at 74.8, even though that model was only released on 16 November, eleven days earlier.

But 76.4 and 75.9 look like a tie when rounded, and some coverage does call it a tie. The profiles behind the two numbers differ, and the profile is what decides whether a model fits a particular job.

The index averages six evaluations with published weights. d1.3-ultra wins the two that carry the most weight: AA-Paperclip, 30% weight, testing decisions over 1,500 documents — resumes, receipts, invoices, papers — at 77.2 against Bison's 73.3. AA-Omniscience-Decision, 15% weight, testing knowledge and willingness to decline what it does not know, 66.3 against 60.1. Bison wins the other four, including Symmetry, which tests whether the answer stays the same when the question is reworded: 89.2 against 86.2.

So a pipeline that reads documents and receipts fits Liquid's profile better. A pipeline that must stay stable when a policy is rewritten in different words fits Baseten's better. The same index, two different answers, depending on what is being decided.

This version adds three capabilities. Ranking orders a set of options or returns a top-k, something new for the d1 family: until now the API only answered yes/no, picked one option, gave a score, or read a single value. Extraction, introduced in d1.2, now reads numbers and dates straight from images and audio — a receipt total from a photo, a date spoken in a clip. Span, also from d1.2, now returns the start and end times of the part of an audio clip where something was said.

Here is the angle most relevant to anyone building agent systems: price per task, not per token. Artificial Analysis also publishes cost and latency per task: d1.3-ultra at US$133 per one million index tasks with a median of 191 ms per task. Bison 31B at US$345 with 154 ms. The median across the 27 models is US$137 and 192 ms — so d1.3-ultra is the highest-scoring model at a thoroughly ordinary price and speed: 11th of 27 on cost, 13th of 27 on speed.

Its input price alone is US$0.042 per one million tokens, less than half of Bison's US$0.10. But a per-token comparison is misleading here, because the two models bill in completely different ways: a decision model bills input only, while a language model bills input and output. The numbers that can be compared across categories are cost per completed task and milliseconds per task.

It is the same yardstick I used for GPT-6.1 Terra: the cheapest token does not win, the task completed at the most sensible total cost does. A decision model makes that yardstick explicit — its per-task price is published as the headline metric, not hidden behind a per-token price.

The comparison also puts "cheapest" in its place. Perplexity Decider v1.3 scores 70.4 at US$68 per one million tasks. Celeris-1.1 Decision is US$14 and 61 ms, at 62.0. Google's Gemini Decision 1 is US$345 at 66.0. No single model wins on every axis; there is a trade-off map, and the task decides which point to take.

A few things are worth noting before anyone moves a pipeline to d1.3-ultra. First, the pace. Four releases in seven weeks: d1 on 5 October, d1-ultra on 15 October, d1.2 on 16 November, d1.3-ultra on 27 November. Liquid's documentation already marks d1-ultra, d1.1, and d1 as deprecated, and d1.2-ultra was replaced eleven days after release. Anyone calling this model by name will migrate often, and that is a cost that does not appear in the price table.

Second, this model is not open-weight. There is no sign of public weights for the ultra family; Liquid's open-weight decision models remain the small ones — d1-2B, d1-omni-2B, and d1-omni-600M. Its rival, Bison 31B, is open-weight: a post-training of Gemma 4 31B, weights on Hugging Face under MIT and Apache 2.0, 131,072-token context. So the "tie" on the scoreboard pits a closed model against an open one, and the choice is not only about the score.

Third, Liquid's own claims that cannot yet be verified. The announcement mentions improvements across "more than 100" internal benchmarks without a single number, and there is no calibration figure for d1.3-ultra — even though the d1.2 release included a calibration error of 0.8 points. The claim that its training data now includes instructions embedded in inputs, which must be treated as data rather than commands, also comes with no published test. Until such a test exists, that claim stays a claim.

Fourth, distribution. Liquid says OpenRouter and Vercel are "coming soon", with no date. The same was promised for d1.2 on 16 November, and Liquid's OpenRouter page as of 28 November still lists only d1.2 and d1.2-ultra. A distribution promise repeated without a date is a promise unkept twice.

A decision model is a sensible primitive for agent systems — routing, moderation, scoring, triage — work that has so far been forced onto language models that produce a paragraph to answer a yes/no question. d1.3-ultra proves this category can top its own index at a reasonable price. What I am still waiting for are two things more boring than the score: whether OpenRouter actually gets this model, and whether the release rhythm slows down long enough for people to build on it without a migration plan every two weeks.

Full article on my blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-28-liquid-ai-d13-ultra-model-yang-tidak-menjawab/
