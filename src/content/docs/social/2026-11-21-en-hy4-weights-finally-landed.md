---
title: "Hy4 Can Finally Be Held — But Read the License Clause First"
description: "Tencent finally uploaded Hy4's weights to Hugging Face: 770 billion parameters, 1.55 TB, three checkpoints. But the license is no longer Apache 2.0 — there is a $50 million commercial line in clause 10."
date: 2026-11-21T04:00:00.000Z
tags:
  - AI
  - Tencent
  - Open Source
lang: en
pair: 2026-11-21-hy4-akhirnya-bisa-dipegang
source: "My article: Hy4 Akhirnya Bisa Dipegang — Tapi Baca Dulu Klausul di Lisensinya"
---

Two weeks ago I wrote a sentence that felt like a conclusion at the time: Hy4 can see your screen and click your apps, but you cannot hold it yet. There was no download button.

Yesterday, 20 November, the button finally appeared. Tencent uploaded Hy4's weights to Hugging Face — not one checkpoint, but three: the instruct model `tencent/Hy4`, the FP8 variant `Hy4-FP8`, and the base model `Hy4-base`. There are mirrors on ModelScope and GitCode, vLLM and SGLang deployment recipes, a fine-tuning pipeline, and a system card with its safety evaluation. The promise of "in the next few days" from the 4 November release was kept, and kept quite completely.

But as always, I don't stop at the headline. Because the goods are really there — and so are the terms.

The goods first: Hy4 is a 770-billion-parameter Mixture-of-Experts, 49 billion active per token, with a 1-million-token context. The most grounding number is not the parameter count, but the file size: the BF16 model is spread across 245 safetensors shards, about 1.55 TB in total. The FP8 variant is about 0.79 TB. Running even the FP8 version, by the official recipe, needs eight GPUs. I don't own a machine like that — my 8 GB Mac isn't even enough to peek at a single shard.

So "can be held" has a specific meaning here: it can be held by teams that actually own a cluster, or researchers who want to measure and tinker. Not by everyone on their own laptop.

Now the terms. Last August's Hy4 preview was released under Apache 2.0. These full weights are not. They use the Tencent Hy License version 1.0 — a derivative of Apache 2.0 that says in its own text: this is not Apache 2.0.

The difference sits in clause 10: an operator selling Hy4 inference as a service needs a separate written license from Tencent once its worldwide gross revenue passes $50 million in twelve months, or its product passes 100 million monthly active users. Purely internal use is exempt.

Is that a trap? I don't think so. For almost everyone reading this, that line will never be touched. But it is still a change of direction worth naming: from "open" with no conditions to "open, with a clear commercial line". And this is not a typo in one repo — the Hy4 Flash weights that landed three days earlier, on 17 November, carry the same license. This is policy.

There is one piece of context that explains why this release feels like the close of a chapter. In Tencent's third-quarter earnings, on 18 November, president Martin Lau said US chip restrictions will slow development of the next Hy generation. This model, in other words, is the peak of what they could train with the compute they have now — and they chose to share it before the next chapter slows down.

On the numbers, I hold the same line: these are Tencent's claims, not independently reproduced results. The model card says Hy4 Base scores 91.6 on MMLU and 73.9 on MMLU-Pro. Tencent also admits its own gaps against the best proprietary models in research-level math, long-horizon coding, and hard visual question answering. Now, with the weights in public hands, those numbers can finally be re-tested by anyone who has the GPUs. That is the real value of this release: not the scores, but that the scores can now be challenged.

So who is this release actually for? If you just want to use Hy4, the answer hasn't changed from two weeks ago: use the API. The price is still $0.834 per million input tokens and $2.501 per million output tokens, with a half-price promo on OpenRouter. There is no point downloading 1.55 TB for something you can call through one endpoint.

But if you are a researcher, an infrastructure builder, or a team that genuinely needs the model living inside your own walls — yesterday was your day.

Two weeks ago I closed the article with the word "wait". Two of those three waits ended yesterday. The third — independent reproduction — can only begin now, because only now is there something to reproduce.

Hy4 can finally be held. Hold it well, read its license, and measure it yourself.

Full article on my blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-21-hy4-akhirnya-bisa-dipegang/
