---
title: "Accused of Copying Style: The Kimi K3.1 Pro and GLM-5.3 Distillation Case"
description: "Artificial Analysis personality charts show Kimi K3.1 Pro tracking GPT-6 Astra closely, and GLM-5.3 tracking the Claude 5 family. Some read that as proof of distillation. But a style chart cannot prove how a model was trained — API logs and a 50x price gap tell the more interesting story."
date: 2026-11-02T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
lang: en
pair: 2026-11-02-distilasi-kimi-glm-dituding-menyontek-gaya
tags:
  - AI
  - Distillation
  - Kimi
  - DeepSeek
  - OpenAI
cover:
  image: /assets-img/banner-en-distillation-kimi-glm-style-accusation.jpg
  alt: Informative banner on Kimi and GLM distillation — 50x price gap, 16,000 requests, 90-99% defense claim
---

The distillation debate resurfaced this week, this time with "evidence" that looks scientific: charts. Artificial Analysis publishes a model personality index, and according to Wccftech's reporting, summarized by Tech Insider, Moonshot's Kimi K3.1 Pro hugs GPT-6 Astra very closely on those charts, while Z.ai's GLM-5.3 hugs the Claude 5 family.

The conclusion some people draw arrives quickly: these models must have been trained on Western flagship outputs. In my view, the jump from "the charts look similar" to "definitely copied" is far too long, and this piece separates three layers that keep getting mixed together: measurable resemblance, sourced allegations, and the economic motive.

## Layer one: the resemblance is real and measurable

Distillation itself is a legitimate, common technique: training a smaller or cheaper model on the outputs of a stronger one. Every lab does it to its own models. The problem starts when what gets distilled is a competitor's model through its API, which violates the terms of service.

What the Artificial Analysis charts show is behavioral resemblance: tone of voice, hedging style, verbosity. Two models trained truly independently rarely overlap that tightly on style axes, and that is the strongest argument the accusers have. The resemblance is real, and anyone can measure it.

But resemblance of style is not proof of training provenance. The internet of late 2026 is saturated with machine-written text; any public dataset scraped from the open web will ingest large amounts of ChatGPT-style and Claude-style writing by default. To prove deliberate distillation, you need API logs, account records, or leaked training data, not a radar chart.

## Layer two: allegations with sources

Beyond the charts, two reports carry more weight. On October 28, The Information reported that Kimi K3.1 Pro and DeepSeek's V4.1-Flash 1017 both benefited from distilling Astra, citing people with direct knowledge. Reuters carried the claim and noted that OpenAI, DeepSeek, and Moonshot all declined to respond at the time.

Well before that, on September 30, OpenAI itself tied a distillation campaign in July 2026 to individuals associated with Moonshot AI: 16,000 requests from more than 4,000 users. That volume is small next to the trillions of tokens in a frontier training set, but 16,000 carefully designed prompts with long reasoning outputs are genuinely enough to shape a fine-tune.

The status today remains the same: an allegation from an interested company, reported by credible media, with none of the accused labs officially admitting or denying anything. That is not a verdict.

## Layer three: the motive exists, and the number is large

Why will this issue keep returning? Because the economics make too much sense to ignore. According to a FourWeekMBA summary, GPT-6 Astra's output tokens cost 50 times what Kimi charges, and 42 times DeepSeek's price, based on API list rates as of October 29, 2026.

With a gap that wide, the incentive is simple: anyone who can reproduce most of a flagship's behavior by training on its outputs can sell far cheaper and still make money. The original lab spent billions on pretraining and alignment; the imitator spent a fraction of that. Distillation does not copy the weights, but it can capture much of the capability buyers actually compare on a price sheet.

Anthropic even claims its new defenses cut distillation harvesting by roughly 90 to 99 percent, according to the same summary. That claim, if true, is an indirect admission that the harvesting happens at a scale worth serious engineering to fight.

## My yardstick

My measure has always been simple: an accusation of this class is judged by auditable evidence, not by resemblance that feels convincing. A personality chart proves two models talk alike. It does not prove who learned from whom.

What is actually worth watching, as a user, is the practical consequence. As long as that 50x price gap exists, cheap models that are "close enough to the flagship" will keep appearing, whether through deliberate distillation or through web datasets already contaminated with flagship style. And for my day-to-day work, the final question stays the same: not who resembles whom, but which model finishes the task at the most reasonable total cost, proven by testing, not by personality charts.

Sources: Tech Insider (November 2, 2026) summarizing Wccftech (October 31, 2026), The Information via Reuters (October 28, 2026), and OpenAI's statement (September 30, 2026) via FourWeekMBA.
