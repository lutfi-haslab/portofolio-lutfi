---
title: "Claude Agent SDK Bug: 5-Hour Limits Drain Faster via Third-Party Harnesses"
description: "Theo confirmed a bug on Anthropic's side: usage through the Claude Agent SDK drains 5-hour limits faster than Claude Code itself. One T3 Code session burned the whole limit in 30 minutes."
date: 2026-11-04T01:49:00.000Z
tags:
  - AI
  - Anthropic
  - Coding Agent
lang: en
pair: 2026-11-04-bug-claude-agent-sdk-habiskan-limit
source: "ZeroNoise, summary of Theo Browne's findings (Oct 25, 2026)"
---

Another one from Theo, and this one hits Claude Max subscribers directly in the wallet.

A T3 Code user reported that a single session fixing a few payment bugs used up the entire 5-hour limit in about 30 minutes. Theo dug in and confirmed it: a real bug on Anthropic's side. All usage through the Claude Agent SDK drains 5-hour limits faster than using Claude Code directly. Weekly limits, reportedly, are not affected.

My practical takeaway: the access path is part of the product. The same model, reached through a different harness and SDK, can carry completely different economics — and the one paying the difference is us, the users.
