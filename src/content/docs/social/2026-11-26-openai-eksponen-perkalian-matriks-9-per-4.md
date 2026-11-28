---
title: "Eksponen Perkalian Matriks Tepat 9/4?"
description: "OpenAI mengklaim pada 24 November 2026 bahwa eksponen perkalian matriks adalah tepat 9/4 — batas atasnya sudah dikenal sejak Oktober, batas bawahnya yang baru. Klaimnya masih preprint mentah dari model AI, dan yang berubah hari ini bukan kode kita, melainkan targetnya."
date: 2026-11-26T08:00:00.000Z
tags:
  - AI
  - OpenAI
  - Matematika
lang: id
pair: 2026-11-26-en-openai-matrix-multiplication-exponent-9-4
source: "Artikel saya: Eksponen Perkalian Matriks Tepat 9/4?"
---

Empat hari lalu, 24 November, OpenAI memposting preprint 111 halaman dengan klaim yang, kalau bertahan, menutup pertanyaan yang terbuka sejak 1969: eksponen perkalian matriks tepat 9/4 — 2,25.

Angka itu, ω, adalah pangkat terkecil sehingga dua matriks n × n bisa dikalikan dalam O(n^ω) operasi. Cara sekolah butuh n³. Strassen menurunkannya ke sekitar 2,81 pada 1969, dan perbaikan demi perbaikan membawa batas atas terbaik yang diterbitkan ke ω < 2,371339. Selama puluhan tahun harapannya adalah ω = 2 — nyaris tanpa biaya di luar membaca n² entri outputnya. Preprint ini menaruh jawabannya di 9/4: seperempat di atas ukuran output, dan tidak lebih rendah.

Tapi seperti biasa, saya tidak berhenti di angka headline-nya. Separuh klaim ini bukan berita. Batas atas ω ≤ 9/4 sudah dikenal sejak 2 Oktober 2026, dari preprint OpenAI sendiri — dan sejak itu beberapa kelompok sudah menulis ulang buktinya dengan cara mereka sendiri: Rafael Pass dengan bukti konstruktif eksplisit, dan tim Amsterdam dengan eksposisi yang berlaku atas setiap field. Bagian atasnya sudah dicerna manusia.

Yang baru adalah batas bawah yang cocok. Corollary 1.2 preprint itu menyatakan sirkuit formal apa pun butuh sedikitnya ⌈n^(9/4)/2⌉ gerbang perkalian atau pembagian — bahkan bila setiap penjumlahan dan perkalian dengan konstanta dianggap gratis. Untuk n = 1024, itu berarti sedikitnya 2.965.821 gerbang, berbanding 1.073.741.824 untuk cara naive.

Dan di sinilah saya menahan diri. README repositori openai/math sendiri menulis naskah-naskahnya "diproduksi oleh model internal OpenAI yang tidak disebutkan namanya" dan sebaiknya dipahami sebagai "bentuk data riset mentah" — beberapa hasil yang belum diformalkan bisa bermasalah. Formalisasi Lean-nya hanya mencakup program tanpa pembagian, lebih sempit dari model makalahnya yang membolehkan gerbang pembagian. Sampai Rabu malam, 25 November, belum ada ulasan pakar bernama atas bukti batas bawahnya. Emanuele Viola menyambut hasilnya — "we now have TIGHT (non-trivial) bounds" — tanpa mengulas buktinya.

Buat kode yang saya tulis sehari-hari, tidak ada yang berubah malam ini. Algoritma di dekat eksponen ini adalah konstruksi asimtotik; Pass sendiri menulis konstantanya "galactic". Eksperimen independen dengan implementasi C single-thread mengukur eksponen efektif 2,99 untuk naive dan 2,79 untuk Strassen — dekat dengan teori masing-masing, dan jauh dari 2,25. Library GPU tetap memakai metode kubik karena paralelisasinya bagus. Kalau klaim ini bertahan, yang berubah adalah targetnya: pencarian ω = 2 berakhir dalam model ini, dan pencarian beralih ke konstanta yang praktis.

Preprint ini juga tidak datang sendirian. Sembilan naskah yang diposting OpenAI pada 24 November itu mencakup algoritma strongly polynomial untuk pemrograman linear dan sanggahan konjektur Hirsch — dan di minggu yang sama Anthropic dan OpenAI masing-masing memposting klaim bukti VP berbeda dari VNP, plus algoritma linear-time deterministik untuk minimum spanning tree yang idenya ditulis "sepenuhnya dihasilkan AI, spesifiknya 6.2 Astra".

Polanya sudah jelas, dan ini yang paling menarik dari minggu ini: mesin sekarang menghasilkan matematika pada skala yang tidak bisa diikuti manusia satu per satu. Bottleneck-nya bukan lagi menemukan bukti, melainkan memeriksanya. Saya menunggu ulasan manusia atas batas bawah 9/4 itu. Sampai ada, angka ini adalah klaim yang paling menarik minggu ini, bukan teorema yang sudah selesai.

Selengkapnya di blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-26-openai-eksponen-perkalian-matriks-9-per-4/
