---
title: "Bun Ditulis Ulang 11 Hari oleh 64 Agen — dan Tagihannya Belum Lunas"
description: "Bun mem-port 535.496 baris kode Zig ke Rust dalam 11 hari dengan 64 agen Claude. Angkanya spektakuler, tapi kisah di baliknya — review yang tak pernah dibaca manusia, tagihan yang membengkak, dan kritik pedas pencipta Zig — jauh lebih penting."
date: 2026-11-04T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - Rust
  - Bun
  - AI
cover:
  image: /assets-img/banner-bun-64-agen-11-hari-tagihan-belum-lunas.jpg
  alt: Banner informatif rewrite Bun — 535.496 baris Zig di-port ke Rust, 11 hari port mekanis, dan memori build turun dari 6.745 ke 609 MB
---

Saya menjalankan build situs ini dengan Bun. Jadi ketika saya membaca cerita rewrite Bun, saya tidak membacanya sebagai gosip industri. Saya membacanya sebagai pengguna yang kodenya sehari-hari berjalan di atas hasil pekerjaan itu.

Ceritanya, kalau hanya dibaca dari headline, terdengar seperti dongeng: Jarred Sumner, pencipta Bun, mem-port 535.496 baris kode Zig ke Rust dalam 11 hari, 3–14 Mei 2026, dengan sekitar 50 workflow Claude Code yang berjalan terus-menerus dan puncaknya 64 agen paralel. Biayanya sekitar 165 ribu dolar AS pada harga API — 5,9 miliar token input yang belum di-cache, 690 juta token output, dan 72 miliar pembacaan token dari cache. Estimasi Sumner sendiri untuk tim manusia: setahun penuh, dengan bugfix dan fitur dibekukan selama itu.

Buatku, dari dulu ukurannya sederhana: angka yang terlalu bulat untuk dipercaya biasanya memang belum selesai diceritakan. Dan cerita ini belum selesai.

## Kenapa Zig ditinggalkan

Alasannya bukan gengsi bahasa. Menurut tulisan Sumner yang dirangkum dalam liputan-liputan yang saya baca, bug tracker Bun di era Zig didominasi kelas bug yang sama berulang-ulang: use-after-free, double-free, dan free yang terlewat di jalur error. Di Rust yang aman, kelas-kelas itu berubah menjadi error compiler. Itu argumen yang kuat, dan jujur saja, sulit dibantah dari sisi teori.

Ada juga dorongan praktis yang jarang disebut di headline: Zig punya kebijakan tidak menerima kontribusi yang dihasilkan AI. Setelah Anthropic mengakuisisi Bun pada Desember 2025 dan timnya bekerja dengan cara agent-driven, kebijakan itu menjadi tembok.

Hasilnya, di atas kertas, memang mengesankan. Bun 1.4 lulus 100% test suite lamanya di semua platform. Memori puncak untuk 2.000 build paralel turun dari 6.745 MB menjadi 609 MB. Binari menyusut sekitar 20%. Sekitar 128 bug yang bisa direproduksi dari versi 1.3.14 dilaporkan sudah diperbaiki.

## "Satu juta baris kode yang tidak pernah dibaca"

Andrew Kelley, pencipta Zig, menulis tanggapan yang pedas — dan, menurutku, tidak bisa sekadar dicap sebagai sakit hati. Intinya bukan "Zig lebih baik dari Rust". Intinya adalah kepercayaan.

Kelley menulis bahwa Bun "sudah menulis slop jauh sebelum ia punya akses ke LLM" — maksudnya, menurut pengamatan tim Zig, codebase Bun sudah lama dipenuhi hack di atas hack, error handling yang buruk, dan utang teknis yang menumpuk karena fitur dikejar lebih cepat dari stabilitas. Dari sudut itu, AI tidak menciptakan kekacauan di Bun. AI mempercepat kekacauan yang sudah ada, lalu membuatnya sepanjang satu juta baris.

Kritiknya yang paling tajam justru soal test suite. Bun membela rewrite ini dengan mengatakan test suite-nya cukup bagus untuk memvalidasi port sebesar itu. Kelley membaliknya dengan satu pertanyaan yang, begitu dibaca, sulit dilupakan: kalau test suite itu memang cukup untuk menangkap segalanya, kenapa Bun punya begitu banyak bug di era Zig?

Dan ada fakta yang menurut saya harus disebut apa adanya: diff gabungan rewrite itu — lebih dari satu juta baris Rust yang ditambahkan — kabarnya hanya direview oleh bot, claude[bot] dan coderabbitai[bot]. Tidak ada manusia yang membacanya baris per baris. Pembelaannya adalah review adversarial: setiap implementasi diperiksa dua agen reviewer di context window terpisah, yang hanya diberi diff dan diminta berasumsi kodenya salah. Itu desain review yang serius. Tapi tetap saja, itu bukan review manusia.

## Tagihan yang tidak ikut di headline

Angka 165 ribu dolar itu pun perlu dibaca dengan teliti. Itu estimasi pra-merge, pada harga API, untuk token yang dikonsumsi sampai branch port itu di-merge. Ia tidak mencakup komputasi setelahnya. Analisis independen Tom Lockwood menemukan, enam minggu setelah merge, belum ada tag rilis stabil, jumlah pull request terbuka dari identitas Claude Code "robobun" tumbuh dari 1.277 menjadi 2.475, dan klaster CI Buildkite berjalan terus. Kalau laju itu mendekati 10 ribu dolar per hari, Lockwood memperkirakan totalnya mendekati 800 ribu dolar.

Itu perkiraan, bukan tagihan resmi — dan saya menuliskannya sebagai perkiraan. Tapi arahnya penting: "rewrite seharga 165 ribu dolar" adalah lantai, bukan total. Belum lagi satu detail yang membuat angka itu tidak bisa direplikasi begitu saja: sebagian besar pekerjaan memakai Claude Fable 5 pra-rilis, model yang tidak bisa dibeli pelanggan mana pun pada Mei 2026.

Ada juga utang audit yang tertinggal di dalam kode barunya. Sekitar 4% kode Rust hasil port berada di blok `unsafe` — kira-kira 13.000 kata kunci `unsafe`, berbanding sekitar 73 pada proyek Rust tulisan tangan yang sebanding. Sebagian besar cuma membungkus interop C/C++, dan angkanya diharapkan turun seiring refactor ke Rust yang lebih idiomatik. Tapi rasionya menceritakan sesuatu yang jujur: translasi AI mencapai kebenaran fungsional dengan cepat, dan meninggalkan tumpukan audit struktural yang harus dibereskan manusia setelah merge.

## Analisis bug yang membuat kedua kubu tidak nyaman

Bagian yang paling menarik buat saya justru datang belakangan, dari seseorang yang benar-benar menghitung. Sebuah analisis independen mengumpulkan setiap issue yang dilaporkan ke repositori oven-sh/bun dari enam bulan sebelum merge sampai beberapa waktu sesudahnya — 2.981 issue — dan mengklasifikasikannya berdasarkan build yang dipakai pelapor.

Kesimpulannya tidak memihak siapa-siapa, dan karena itu terasa bisa dipercaya: dalam setup paling menguntungkan yang pernah didapat bahasa yang ketat — spesifikasi beku, satu juta assertion sebagai oracle, tenaga AI yang tak kenal lelah — rewrite ini tidak menghasilkan perbaikan yang terukur dalam cara bug ditangani. Mesinnya bekerja: borrow checker terpenuhi sejuta baris. Manusia yang tidak bekerja: triase menumpuk, review menjadi bottleneck, dan tidak ada rilis stabil selama berbulan-bulan.

Kalau diringkas dengan kasar: rewrite-nya 11 hari, kepercayaannya masih harus berjalan dalam waktu nyata.

## Yang saya bawa pulang dari cerita ini

Saya tidak menulis ini untuk mengatakan "jangan pakai agen coding". Saya sendiri memakai Bun, dan saya memakai agen setiap hari. Yang saya katakan adalah: Bun adalah kasus terbaik yang bisa didapat agen coding — port mekanis, spesifikasi beku, test suite raksasa yang sudah ada sebelum port, dan satu ahli yang mengawasi loop-nya penuh waktu selama 11 hari.

Ada satu pelajaran yang menurutku paling layak dibawa ke tim mana pun: throughput 64 agen yang menghasilkan 1.300 baris per menit hanya bisa dipakai karena ada pipeline review di belakangnya — dua reviewer adversarial per implementasi, plus satu manusia yang membaca loop itu sepanjang jalan. Keterampilan yang konon akan hilang itu — kemampuan membaca kode — ternyata adalah keterampilan yang sama yang membuat seluruh proses ini mungkin.

Jadi kalau ada yang menjual cerita ini sebagai "developer tidak perlu membaca kode lagi", jawabannya sudah ada di dalam cerita itu sendiri: orang yang menjalankan rewrite ini adalah orang yang paling dalam memahami codebase-nya, dan ia mengawasi setiap putarannya. Kecepatan itu nyata. Tapi kecepatan tanpa pembaca hanya memindahkan utang dari baris kode ke antrean review — dan antrean itu, seperti tagihan Bun, tetap harus dibayar.

Sumber yang saya baca: [tulisan Jamil Xt yang merangkum blog Sumner dan analisis-analisis lanjutannya](https://dev.to/jamilxt/anthropic-rewrote-bun-in-rust-with-64-claude-agents-for-165k-the-real-bill-is-higher-68g), [rangkuman rewrite Rust besar 2026](https://botmonster.com/coding/big-rust-rewrites-of-2026/), [tanggapan Andrew Kelley](https://byteiota.com/andrew-kelley-challenges-bun-rewrite-slop-predates-ai/), dan [analisis hitung bug sebelum dan sesudah rewrite](https://dev.to/asmyshlyaev177/i-counted-every-bun-bug-before-and-after-the-rust-rewrite-3cgi).

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
