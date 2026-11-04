---
title: "Bug Claude Agent SDK: Limit 5 Jam Terkuras Lewat Harness Pihak Ketiga"
description: "Theo mengonfirmasi bug di sisi Anthropic: penggunaan lewat Claude Agent SDK menguras limit 5 jam lebih cepat daripada Claude Code langsung. Satu sesi T3 Code habiskan limit dalam 30 menit."
date: 2026-11-04T01:48:00.000Z
tags:
  - AI
  - Anthropic
  - Coding Agent
lang: id
pair: 2026-11-04-en-claude-agent-sdk-bug-drains-limits
source: "ZeroNoise, rangkuman temuan Theo Browne (25 Oktober 2026)"
---

Satu lagi dari Theo, dan yang ini dampaknya langsung ke kantong pengguna Claude Max.

Seorang pengguna T3 Code melaporkan satu sesi memperbaiki beberapa bug pembayaran menghabiskan seluruh limit 5 jam dalam waktu sekitar 30 menit. Theo menelusurinya dan mengonfirmasi: ini bug beneran di sisi Anthropic. Semua pemakaian lewat Claude Agent SDK menguras limit 5 jam lebih cepat daripada memakai Claude Code langsung. Limit mingguan, kabarnya, tidak ikut terpengaruh.

Buatku ini pengingat praktis: jalur akses itu bagian dari produk. Model yang sama, lewat harness dan SDK yang berbeda, bisa punya ekonomi yang sama sekali berbeda — dan yang membayar selisihnya adalah kita, penggunanya.
