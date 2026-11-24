---
title: "GLM-5.4: A Model That Thinks Twice Without Getting Bigger"
description: "Z.ai released GLM-5.4, a 750-billion-parameter model that runs its 28 layers twice per token. The claim is big — as smart as a 2–3 trillion parameter model — but the benchmark table is still missing. Here is what actually happened."
date: 2026-11-24T04:00:00.000Z
tags:
  - AI
  - GLM
  - Loop Transformer
lang: en
pair: 2026-11-24-glm-54-loop-transformer
source: "My article: GLM-5.4: Model yang Berpikir Dua Kali Tanpa Membesar"
---

Yesterday, 23 November, Z.ai released GLM-5.4 — and one of my own habits felt immediately familiar in how this model works.

When I read complicated code, I always read it twice. The first pass is to catch its shape, the second to check whether the logic actually holds together. Sometimes that second read is the one that saves me, because that is where the bug that slipped past finally shows up.

GLM-5.4 works in a similar way. Its architecture is called a Loop Transformer: 28 layers in the middle of the model run twice for every token. Not adding parameters, but reusing the same layers so the network feels deeper.

The claim is big: around 750 billion parameters, but said to be as smart as a 2–3 trillion parameter model. If true, the math changes — a model does not have to keep getting fatter to get smarter, it just has to be used repeatedly in the right way.

There are three engineering tricks that keep this repetition from falling apart at that scale, according to Z.ai's own explanation. First, a per-token gate: each loop has its own gate controlling how much of the update gets written back to the residual stream, so activations do not blow up between loops. Second, a hybrid KV cache: the second loop reuses the first loop's KV cache and only adds one sliding window, so the extra memory cost for a 1-million-token context stays under control. Third, the sparse attention index from the first loop gets reused in the second, with no extra indexing cost.

What earns my respect is the honesty behind it. Z.ai did not train this loop model from scratch — they admit a loop model trained from the start still loses to an ordinary model on the same pre-training budget. So they took the already-trained GLM-5 and turned it into a loop transformer through continued training. The architecture is not magic, it is a conversion with its cost counted.

But this is where I hold back. As of today Z.ai has not published a single benchmark score for GLM-5.4 itself. Every number they show comes from a 30-billion-parameter experiment model: AIME25 rising from 19.2 to 30.4, and GPQA-Diamond from 47.6 to 56.3, with about 10 percent extra training compute. Those numbers are evidence for the architecture, not for the flagship.

The other evidence also comes from Z.ai itself: in an internal test of 200 real coding tasks, GLM-5.4 won 51.1 percent against GLM-5.3 and lost 23.1 percent. One independent test already circulating, KingBench 4 from AICodeKing, puts it at rank 7 out of 19 models — first among open models, but behind Gemini 4 Neon and Claude Fable 5.2.

And access is still limited: no public API, no weights to download. Today GLM-5.4 can only be used through Z.ai's Coding Plan — Lite $18, Pro $80, Max $168 a month — in ZCode and their chat apps. The API and open weights are promised after the security evaluation finishes.

Even its weakness is admitted by Z.ai itself: the model can get stuck in an overlong reasoning phase, a kind of "marathon thinking" that never ends. They say the longer self-checking still raises accuracy, but to me this is a reminder that thinking twice has a price: latency and cost per token go up with it. Z.ai claims speeds up to 200 tokens per second outside peak hours and 70–80 under heavy load, but those are vendor numbers nobody outside can verify yet.

What makes this release worth watching is not GLM-5.4 alone. Three days earlier, Thinking Machines released Inkling 2 Mini, their smallest model, which runs its 12 middle layers three times per token. And according to The Decoder, OpenAI has been using a similar architecture since GPT-6 Astra. So the loop transformer is no longer a paper experiment: within one week, three big labs moved in the same direction.

My measure has always been simple: a claim without a benchmark table is a promise, not proof. GLM-5.3, its predecessor, actually sets a good example — its weights are open under the MIT license, downloadable on Hugging Face, and its scores measurable everywhere. GLM-5.4 is not there yet. Until its API opens and independent bodies like Artificial Analysis can test it, the honest position is: the architecture is interesting, the claim is bold, the proof is still awaited.

If the loop transformer proves itself at flagship scale, the impact is real for those of us building with models: a smarter model without a ballooning parameter bill, and maybe, one day, a model of this class whose weights we can run ourselves. But the keyword is still "if". And that "if" is only answered once the weights are out and the independent numbers appear.

Full article on my blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-24-glm-54-loop-transformer/
