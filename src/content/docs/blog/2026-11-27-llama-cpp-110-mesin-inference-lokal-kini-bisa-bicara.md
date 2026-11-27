---
title: "llama.cpp 1.1.0: Mesin Inference Lokal yang Kini Bisa Bicara"
description: "llama.cpp 1.1.0, rilis 26 November 2026, menambahkan suara dua arah, kuantisasi berbasis anggaran, dan UI agen ke mesin inference yang selama ini diam-diam menjalankan hampir semua AI lokal. Yang berubah bukan modelnya, melainkan job description mesinnya."
date: 2026-11-27T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - AI
  - Open Source
  - llama.cpp
cover:
  image: /assets-img/banner-llama-cpp-110-mesin-inference-lokal-kini-bisa-bicara.jpg
  alt: Banner informatif llama.cpp 1.1.0 — 9 model TTS dan audio baru, JavaScript first-load Llama Chat dipangkas 63%, dan Hy4 flash 220B dengan 12B parameter aktif
---

llama.cpp merilis versi 1.1.0 pada 26 November 2026. Bagi yang tidak mengikuti proyek ini dari dekat, namanya mungkin terdengar seperti kabar rutin: satu lagi nomor versi dari mesin inference C/C++ yang menjalankan model bahasa di laptop, server, dan ponsel. Tapi rilis ini layak dibaca lebih pelan, karena isinya menunjukkan mesin itu sedang bergeser peran — dari program yang menjalankan model teks menjadi tumpukan lengkap untuk AI lokal, lengkap dengan suara dan antarmuka agen.

llama.cpp memang jarang jadi headline. Ia lapisan yang tenang di bawah hampir semua hal yang disebut "AI lokal": Ollama, LM Studio, dan puluhan tool lain berdiri di atasnya atau meminjam idenya. Ketika lapisan seperti ini berubah arah, efeknya sampai ke semua yang dibangun di atasnya, entah penggunanya sadar atau tidak.

## Suara masuk ke dalam mesin

Perubahan paling mencolok ada di daftar model audio. v1.1.0 menambahkan dukungan TTS dan audio untuk sembilan model sekaligus: Kokoro, Zonos3-Mini, tiny-voca, VoxCPM2, MiniMax-Music3, YuE2, Fish S2, Higgs v3/VibeVoice-ASR, dan Kyutai Hibiki. Yang terakhir ini penting: Hibiki dan Moshi memberi llama.cpp suara full-duplex real-time, bicara dan mendengar dalam satu alur, bukan bergantian seperti walkie-talkie.

Konteksnya: v1.0.0 sudah lebih dulu menambahkan endpoint `/v1/audio/speech` yang kompatibel dengan OpenAI. v1.1.0 melengkapi sisi lainnya, yaitu input suara dan model-model yang menghasilkannya. Hasilnya, satu binary yang sama kini menutup seluruh putaran suara: dengar, pikir, jawab. Dulu itu pekerjaan tiga layanan berbeda; sekarang satu mesin lokal bisa memegang ketiganya, tanpa data keluar dari perangkat.

Ada satu catatan jujur yang perlu dijaga: mendukung model bukan berarti model itu berjalan bagus di semua hardware. Beberapa dukungan di rilis ini masih segar — dukungan Inkling 2, misalnya, baru masuk ke mainline pertengahan November dengan catatan konversi checkpoint aslinya belum sempat diuji. Dukungan adalah janji, bukan benchmark.

## Kuantisasi berubah dari pilihan format menjadi soal anggaran

Fitur yang paling praktis buat pengguna lokal ada di `llama-quantize`: flag `--target-bpw` dan `--target-size`. Selama ini menguantisasi model berarti memilih nama format — Q4_K_M, Q5_K_S, dan kawan-kawan — lalu berharap ukurannya muat di VRAM. Sekarang pertanyaannya dibalik: sebutkan anggaranmu, berapa bit per bobot atau berapa besar file yang diinginkan, dan quantizer memilih format per tensor untuk memenuhi anggaran itu, dengan state file yang bisa dilanjutkan kalau prosesnya berhenti di tengah jalan.

Ini perubahan kecil yang mengubah cara berpikir. Kemarin, di artikel soal Ternary Bonsai 2.5, ukuran yang relevan adalah 5,9 GB untuk model 27B. Angka seperti itu hanya bermakna kalau ada alat yang bisa menargetkannya — dan `--target-size` memang alat itu. Kuantisasi berhenti jadi tebak-tebakan format dan menjadi keputusan anggaran: berapa GB yang kupunya, berapa kualitas yang rela kukorbankan.

## API lama dipensiunkan, UI-nya berubah jadi agen

Di sisi API, rilis ini memensiunkan `llama_batch` dan menggantinya dengan `llama_batch_ext` plus `llama_process`. Siapa pun yang menulis binding langsung ke llama.cpp — bukan lewat server HTTP-nya — perlu mengubah kode. Itu harga yang dibayar proyek ini untuk janji semver: v1.0.0 baru saja membuang 35 fungsi yang sudah deprecated dan mempromosikan API spekulatif NextN ke header utama, dan v1.1.0 langsung melanjutkan bersih-bersih itu. Proyek yang dulu dikenal lewat nomor build malam hari seperti b12752 kini memberi nomor versi seperti platform: 1.0.0, lalu 1.1.0, dengan ggml ikut naik ke 1.1.1.

Sementara itu servernya makin menyerupai API OpenAI: `tool_choice` bernama kini diterima, dan ada endpoint `GET /models/sse`. Yang lebih menarik ada di UI. Llama Chat dipindah ke `ui/apps/chat`, dibangun ulang di SvelteKit 3, dan JavaScript first-load-nya dipangkas 63%. Ia kini bisa dijalankan terpisah dari server lewat `npx @ggml-org/llama-chat`, mendukung pesan suara dan dikte, dan menampilkan balasan agen sebagai Agent Trace yang dikelompokkan. Flag `--ui-agent` menyalakan mode agen tanpa tool server atau MCP proxy.

Di sinilah rilis ini bersinggungan dengan sesuatu yang pernah saya tulis pada 23 November: model saja tidak cukup, harness ikut menentukan. llama.cpp tampaknya setuju — ia mulai membundel harness-nya sendiri. Bedanya, harness di sini masih tipis: Agent Trace adalah tampilan atas loop agen, bukan agen itu sendiri. Pertanyaan yang belum terjawab adalah apakah UI ini akan tetap menjadi demo yang nyaman, atau berkembang menjadi cara default orang menjalankan agen lokal. Dua kemungkinan itu punya implikasi yang sangat berbeda buat ekosistem di atasnya.

## Model-model barunya

Daftar model baru dalam rilis ini panjang, dan dua di antaranya layak disebut. Keluarga Inkling 2 dari Thinking Machines Lab — base, Mini, dan DSpark — kini didukung untuk teks dan vision, setelah dukungannya masuk ke mainline pada 14 November. Lalu ada Hy4 flash: 220B parameter total dengan 12B aktif per token, berjalan di atas cache DSA iSWA. Sisanya: Domyn Edge 4B, Zaya1 8B, RAON-1-mini dari Krafton (MoE 30B dengan 4B aktif), MiniMax-M3.1, dan DFlash2 untuk Recursive Ripple-65B-Preview. Speculative decoding DFlash sendiri dipecah menjadi empat metode draft terpisah, termasuk DSpark untuk Inkling 2.

Tidak ada angka benchmark dalam catatan rilis ini, dan memang itu bukan tempatnya. llama.cpp tidak mengklaim model-model ini lebih pintar; ia hanya menyatakan mereka kini bisa jalan. Klaim performa tetap menjadi urusan pembuat modelnya masing-masing.

## Yang saya tunggu

Tiga hal. Pertama, seberapa cepat binding dan tool di atas llama.cpp bermigrasi dari `llama_batch` — deprecation yang tenang sering kali baru terasa saat build seseorang tiba-tiba gagal. Kedua, apakah `--target-size` menjadi cara standar orang menyiapkan model lokal, menggantikan hafalan nama format kuantisasi. Ketiga, dan yang paling menarik, apakah Llama Chat dengan Agent Trace-nya berhenti di titik ini atau terus tumbuh menjadi runtime agen. Kalau yang terjadi adalah yang kedua, batas antara "mesin inference" dan "aplikasi AI" akan makin sulit digambar — dan itu kabar baik buat siapa pun yang membangun AI lokal, karena lapisannya makin sedikit.

Sumber: [catatan rilis v1.1.0](https://github.com/ggml-org/llama.cpp/releases/tag/v1.1.0) dan [catatan rilis v1.0.0](https://github.com/ggml-org/llama.cpp/releases/tag/v1.0.0), keduanya di repositori ggml-org/llama.cpp.

*Ditulis oleh **Lutfi Ikbal Majid**, dengan bantuan riset dan penyuntingan dari **Bewustein (Muse)**.*
