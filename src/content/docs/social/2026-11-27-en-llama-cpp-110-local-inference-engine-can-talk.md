---
title: "llama.cpp 1.1.0: The Local Inference Engine That Can Now Talk"
description: "llama.cpp 1.1.0, released 26 November 2026, adds two-way voice, budget-based quantization, and an agent UI to the inference engine that quietly runs almost all local AI. What changed is not the model, but the engine's job description."
date: 2026-11-27T08:00:00.000Z
tags:
  - AI
  - Open Source
  - llama.cpp
lang: en
pair: 2026-11-27-llama-cpp-110-mesin-inference-lokal-kini-bisa-bicara
source: "My article: llama.cpp 1.1.0: Mesin Inference Lokal yang Kini Bisa Bicara"
---

Two days ago, 26 November, llama.cpp released version 1.1.0. If you do not follow this project closely, the name may sound like routine news: one more version number from the C/C++ inference engine that runs language models on laptops, servers, and phones.

But this release deserves a slower read, because its contents show the engine shifting roles — from a program that runs text models into a complete stack for local AI, voice and agent interface included.

The most striking change is in the audio model list. v1.1.0 adds TTS and audio support for nine models at once: Kokoro, Zonos3-Mini, tiny-voca, VoxCPM2, MiniMax-Music3, YuE2, Fish S2, Higgs v3/VibeVoice-ASR, and Kyutai Hibiki. The last one matters: Hibiki and Moshi give llama.cpp real-time full-duplex voice, speaking and listening in a single flow, not taking turns like a walkie-talkie.

The context: v1.0.0 had already added an OpenAI-compatible `/v1/audio/speech` endpoint. v1.1.0 completes the other side — voice input and the models that produce it. The result is that one binary now closes the whole voice loop: listen, think, answer. That used to be three different services; now one local engine can hold all three, with no data leaving the device.

One honest note to keep: supporting a model does not mean the model runs well on all hardware. Some support in this release is still fresh — Inkling 2 support, for example, only landed in mainline in mid-November with a note that its original checkpoint conversion had not yet been tested. Support is a promise, not a benchmark.

The most practical feature for local users is in `llama-quantize`: the `--target-bpw` and `--target-size` flags. Until now, quantizing a model meant picking a format name — Q4_K_M, Q5_K_S, and friends — then hoping the size fit in VRAM. Now the question is reversed: state your budget, how many bits per weight or how large a file you want, and the quantizer picks a per-tensor format to meet that budget, with a state file that lets the process resume if it stops halfway.

This is a small change that changes how you think. Yesterday, in the article about Ternary Bonsai 2.5, the relevant size was 5.9 GB for a 27B model. A number like that only means something if there is a tool that can target it — and `--target-size` is exactly that tool.

On the API side, this release retires `llama_batch` and replaces it with `llama_batch_ext` plus `llama_process`. Anyone writing bindings directly against llama.cpp — not through its HTTP server — needs to change code. That is the price this project pays for its semver promise: v1.0.0 had just removed 35 deprecated functions, and v1.1.0 continues that cleanup right away.

Meanwhile the server looks more and more like the OpenAI API, and its UI has turned into an agent. Llama Chat moved to `ui/apps/chat`, rebuilt on SvelteKit 3, with first-load JavaScript cut by 63%. It can now run separately from the server via `npx @ggml-org/llama-chat`, supports voice messages and dictation, and shows agent replies as grouped Agent Traces. The `--ui-agent` flag turns on agent mode without a tool server or MCP proxy.

This is where the release touches something I wrote on 23 November: the model alone is not enough, the harness matters too. llama.cpp seems to agree — it is starting to bundle its own harness. The difference is that the harness here is still thin: Agent Trace is a view over the agent loop, not the agent itself. The unanswered question is whether this UI stays a comfortable demo, or grows into the default way people run local agents.

Two new models deserve a mention: the Inkling 2 family from Thinking Machines Lab — base, Mini, and DSpark — now supported for text and vision. And Hy4 flash: 220B parameters in total with 12B active per token, running on the DSA iSWA cache.

There are no benchmark numbers in these release notes, and that is not their place. llama.cpp does not claim these models are smarter; it only states they can now run. Performance claims remain the business of each model's maker.

Three things I am waiting for: how fast the bindings and tools above llama.cpp migrate away from `llama_batch`; whether `--target-size` becomes the standard way people prepare local models; and whether Llama Chat with its Agent Trace stops here or keeps growing into an agent runtime. If it is the latter, the line between "inference engine" and "AI application" will get harder to draw — and that is good news for anyone building local AI, because there are fewer layers in the way.

Full article on my blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-27-llama-cpp-110-mesin-inference-lokal-kini-bisa-bicara/
