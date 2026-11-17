---
title: "Qwen4-Max Is Officially Out — But the Weights Stay Locked"
description: "Alibaba shipped Qwen4-Max on 16 November: 2.4 trillion parameters, 1-million-token context, $1.50/$4.50 pricing. Its own Work360 benchmark claims 60 percent cheaper per task — independent Artificial Analysis scores it 43, rank 9, and the weights stay closed."
date: 2026-11-17T03:45:00.000Z
tags:
  - AI
  - Qwen
lang: en
pair: 2026-11-17-qwen-4-max-rilis-resmi
source: "My article: Qwen4-Max Rilis Resmi, Bobotnya Tetap Dikunci"
---

Two days ago I asked: is Qwen 4 a release, or a paid teaser? On 16 November the answer arrived — Qwen4-Max is officially out, the first flagship of the Qwen4 family. Pay-as-you-go is open, the price is clear: $1.50/$4.50 per million tokens, 1-million-token context, 2.4 trillion parameters with 71 billion active per token.

But read the announcement to the end, and it feels like opening a gift box that really does contain a gift — with the box still padlocked on one side.

The claim comes from Work360, Alibaba's own benchmark: cost per task down around 60 percent, 35 percent fewer tokens. It sounds great — until you remember Work360 belongs to the vendor. The tasks can't be inspected, the results can't be replicated. That 60 percent is a claim, not evidence.

Then the independent numbers arrive, and the tone changes at once. Artificial Analysis puts Qwen4-Max at 43 — rank 9, three points below Kimi K3.1 Pro, 19 points behind it on Terminal-Bench 4.0. On Code Arena, rank 6. Good, not bad. But not "most capable", as the announcement puts it.

And what bothers me most: the Qwen4 flagship is API-only. No weights, no self-hosting, no fine-tuning. Qwen built its name on open weights — Qwen3 was downloaded tens of millions of times — yet what arrived now is closed. The smaller open-weight models are "coming soon", with no date. Meanwhile the preview retires on 25 November, eight days from now.

So my measure stays the same: at this price it's cheap for experiments — agent routing, long coding sessions, work that needs a giant context. Try it through the API, measure it on your own workload. But don't migrate a production system here this week, and don't hold your breath waiting for the open-weight model.

Full article on my blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-17-qwen-4-max-rilis-resmi/
