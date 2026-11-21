---
title: "Coding Agents Score 78 — But Only 29% Actually Finish the Job"
description: "Stripe tested 14 coding agents across 69 real payment scenarios. The average score is 78.1% — but when every must-pass criterion has to hold, it falls to 29.4%. What is being measured here is not whether agents can code, but whether they can be trusted with money."
date: 2026-11-20T04:00:00.000Z
tags:
  - AI
  - OpenAI
  - Anthropic
lang: en
pair: 2026-11-20-stripe-evals-agen-coding-78-persen-lolos-29-persen
source: "My article: Agen Coding Dapat Nilai 78, tapi yang Betul-Betul Beres Cuma 29%"
---

Two days ago I wrote about MAI Code 2 and how cheap it is. Today Stripe asks the more important question: cheap and smart is not enough, when what is at stake is other people's money.

Two days ago Stripe released Stripe evals — a public benchmark that asks coding agents to build real payment integrations, then grades them to the same harsh standard as the real world. There are 69 scenarios: hosted checkout, metered billing, per-seat subscriptions, marketplace payment splits. Tested across 14 model-and-harness pairs — Claude Code, Codex, OpenCode, from the cheap Haiku 5.5 up to GPT-6 Astra and Claude Fable 5.2.

The result? The average agent scores 78.1%. That sounds decent.

But as always, I don't stop at the headline number. Stripe also applies a strict grading: every must-pass criterion has to hold, with no exceptions. Under that standard, the number falls to 29.4%.

That is a large gap. And the gap is the whole story.

What is tested here is not "can it code", but "can it be trusted with money". Each scenario is graded per criterion, with MUST and SHOULD split the RFC 2119 way — and a second agent plays the human developer, asking follow-up questions and hiding some requirements at first, exactly like a real client.

The scariest example, written by Stripe itself: in one scenario, Claude Opus 5.5 only checked `PaymentIntent.status === 'succeeded'` before fulfilling an order. It never checked whether the order was still fulfillable. So an order that had already been refunded, or was under dispute, could still ship. The code runs. The tests might be green. The business loses money.

There is good news too. Stripe's official agent plugin — skills and MCP tools carrying current guidance and documentation — improved all 14 agents by 3 to 8 points. Web searches fell 96%, because agents stopped guessing from Google results. References to expired parameters fell from 7% to 1.3%.

But there is a side effect worth noting honestly: with the plugin, agents wrote about 40% fewer test lines and ran tests in only 42% of evaluations, down from 53%. Stripe itself writes that fewer tests does not mean better tests. I tend to be wary here: cutting back on testing because you "feel confident" is the same bad habit, whether the one doing it is a human or a machine.

And one table I like: the cost column. Haiku 5.5 needs only about $0.08–$0.09 per evaluation, scoring 76.2% with a 30.9% strict pass. Fable 5.2 burns $5.35 per run for 85.2% and a 43.2% strict pass. GPT-6.1 Sol is interesting in the middle: $0.61 per run, 89.6% score, strict pass above 50%. A 60× price gap is hard to justify if a human reviews the result anyway — but if what you want is the closest thing to "production-ready", numbers like these are what the calculation should be made of.

So my measure is simple: coding agents may handle payment integrations, with one non-negotiable condition — a human checks the last part, especially the part where money moves. Not because the agents are dumb. Precisely because they have become too good at producing something that looks right.

78% is a reassuring number, and a reassuring number is the most dangerous kind if you stop checking there. 29.4% is the honest one.

Full article on my blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-20-stripe-evals-agen-coding-78-persen-lolos-29-persen/
