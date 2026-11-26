---
title: "Eksponen Perkalian Matriks Tepat 9/4?"
description: "OpenAI mengklaim pada 24 November 2026 bahwa eksponen perkalian matriks adalah tepat 9/4 — batas atasnya sudah dikenal sejak Oktober, batas bawahnya yang baru. Klaimnya masih preprint mentah dari model AI, dan yang berubah hari ini bukan kode kita, melainkan targetnya."
date: 2026-11-26T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - AI
  - OpenAI
  - Matematika
cover:
  image: /assets-img/banner-openai-eksponen-perkalian-matriks-9-per-4.jpg
  alt: Banner informatif klaim OpenAI soal eksponen perkalian matriks 9/4 — preprint 111 halaman, batas atas lama 2,371, dan status verifikasi yang masih terbuka
---

Pada 24 November 2026, OpenAI memposting preprint 111 halaman berjudul "The matrix multiplication exponent is nine fourths". Klaimnya: cara terbaik mengalikan dua matriks n × n tumbuh seperti n pangkat 9/4 — 2,25 — atas setiap field, dalam model sirkuit aritmetika formal. Kalau klaim ini bertahan, satu pertanyaan yang terbuka sejak 1969 akhirnya punya jawaban pasti, dan pertanyaan itu menjadi thread teratas Hacker News pada 25 November.

Eksponen yang dimaksud, ω, adalah pangkat terkecil sedemikian rupa sehingga dua matriks n × n bisa dikalikan dalam O(n^ω) operasi skalar. Cara sekolah butuh sekitar n³ operasi. Strassen menunjukkan pada 1969 bahwa angka itu bisa turun di bawah 3, ke log₂7, sekitar 2,81. Perbaikan demi perbaikan lewat tensor Coppersmith–Winograd dan penyempurnaannya membawa batas atas terbaik yang diterbitkan ke ω < 2,371339. Selama puluhan tahun harapannya adalah ω = 2 — nyaris tanpa biaya di luar membaca n² entri outputnya. Preprint ini menaruh jawabannya di 9/4: seperempat di atas ukuran output, dan tidak lebih rendah.

## Yang baru dan yang sudah dikenal

Separuh klaim ini bukan berita. Batas atas ω ≤ 9/4 sudah dikenal sejak 2 Oktober 2026, ketika preprint OpenAI sendiri menunjukkannya atas bilangan kompleks. Sejak itu beberapa kelompok menulis ulang bukti itu dengan cara mereka sendiri: Rafael Pass memberi bukti konstruktif eksplisit dengan algoritma rekursif atas bilangan bulat, dan tim Amsterdam — Amanov, van den Berg, dan Zuiddam — memberi eksposisi yang berlaku atas setiap field. Bagian atasnya sudah dicerna manusia.

Yang baru pada 24 November adalah batas bawah yang cocok. Corollary 1.2 preprint itu menyatakan bahwa untuk setiap n ≥ 2, sirkuit formal apa pun yang mengalikan dua matriks n × n butuh sedikitnya ⌈n^(9/4)/2⌉ gerbang perkalian atau pembagian — bahkan bila setiap penjumlahan, pengurangan, dan perkalian dengan konstanta dianggap gratis. Rank border geometris tensor perkaliannya sedikitnya n^(9/4), dan rank asimtotiknya tepat n^(9/4). Untuk n = 1024, batas bawah itu berarti sedikitnya 2.965.821 gerbang perkalian; algoritma naive memakai 1.073.741.824.

Argumennya berjalan lewat kontradiksi. Andaikan ada metode dengan eksponen di bawah 9/4, maka rantai konstruksi akan mengompresi jaringan tensor untuk masalah lain — menguji apakah entri di beberapa daftar independen semuanya berbeda — sampai di bawah batas bawah yang juga dibuktikan makalah itu. Kontradiksi itu memberi batas bawahnya.

## Modelnya menentukan apa yang sebenarnya diklaim

Model yang dipakai adalah sirkuit aritmetika formal: inputnya variabel independen, gerbangnya tambah, kurang, kali, atau bagi, dan setiap operasi dihitung satu. Makalah ini tidak mengklaim batas bawah untuk Word RAM atau algoritma bit-level di hardware nyata. Seorang komentator di blog Scott Aaronson sempat menanyakan hal itu — apakah batas bawah ini menyiratkan tidak ada algoritma Word RAM yang berjalan dalam O(n^(9/4−ε)) — dan per Rabu malam belum ada jawaban dari OpenAI.

Perbedaan ini penting karena dua angka yang sama-sama benar bisa mengukur hal yang berbeda. Eksponen 2,25 menghitung gerbang pada simbol. Profiler di mesin nyata menghitung waktu dinding, cache miss, dan paralelisasi. Klaimnya soal yang pertama, bukan yang kedua.

## Status verifikasi adalah bagian dari beritanya

README repositori openai/math menyatakan naskah-naskahnya "diproduksi oleh model internal OpenAI yang tidak disebutkan namanya", berada di tahap verifikasi yang berbeda-beda, dan "beberapa hasil yang belum diformalkan bisa bermasalah" — naskah-naskah itu sebaiknya dipahami sebagai "bentuk data riset mentah". Formalisasi Lean untuk makalah ini hanya mencakup program tanpa pembagian, lebih sempit dari model makalahnya yang membolehkan gerbang pembagian. Sebuah audit luar yang penulisnya tidak teridentifikasi melaporkan klaim formalnya terperiksa, sambil menambahkan bahwa yang tersertifikasi adalah klaim formalnya, bukan matematikanya.

Sampai Rabu malam 25 November, belum ada ulasan pakar bernama atas bukti batas bawahnya. Emanuele Viola dari Northeastern menyambut hasilnya di blognya — "we now have TIGHT (non-trivial) bounds for matrix multiplication" — tanpa mengulas buktinya. Jadi posisi yang jujur hari ini: separuh atas klaim ini sudah punya beberapa bukti manusia yang bisa dibaca dan diperiksa; separuh bawahnya masih menunggu pembaca manusia pertama yang berani mempertanggungjawabkannya.

## Buat kode yang kita tulis: tidak ada yang berubah malam ini

Algoritma di dekat eksponen ini adalah konstruksi asimtotik. Pass sendiri menulis konstantanya "galactic" — sangat besar sehingga tersembunyi di balik notasi O. Di satu mesin, sebuah eksperimen independen dengan implementasi C single-thread mengukur eksponen efektif 2,99 untuk perkalian naive dan 2,79 untuk Strassen — dekat dengan teori masing-masing, dan jauh dari 2,25. Library GPU tetap memakai metode kubik karena paralelisasinya bagus. Kalau klaim ini bertahan, yang berubah adalah targetnya: pencarian ω = 2 berakhir dalam model ini, dan pencarian beralih ke konstanta yang praktis.

## Satu minggu matematika yang dihasilkan mesin

Preprint ini tidak datang sendirian. Sembilan naskah yang diposting OpenAI pada 24 November juga mencakup algoritma strongly polynomial untuk pemrograman linear — yang menurut catatan rilisnya menjawab masalah kesembilan Smale — dan sanggahan konjektur Hirsch polinomial lewat diameter graf superpolinomial pada politop sederhana.

Di sisi lain, Anthropic dan OpenAI masing-masing memposting klaim bukti bahwa VP berbeda dari VNP, pertanyaan Valiant soal apakah permanen butuh sirkuit aritmetika yang lebih besar daripada determinan. Makalah Anthropic, 70 halaman yang dikreditkan ke "Claude (Anthropic)", menyatakan di README-nya bahwa belum ada matematikawan manusia yang memeriksa buktinya. Scott Aaronson menulis bahwa bukti-bukti itu datang dengan sertifikat Lean, dan keyakinannya bahwa P berbeda dari NP "kembali naik ke 96%".

Terpisah dari itu, Khanna, Putterman, dan Song memposting algoritma linear-time deterministik untuk minimum spanning tree — perbaikan pertama sejak batas Chazelle tahun 2000 — dan menulis bahwa ide utamanya "sepenuhnya dihasilkan AI, spesifiknya 6.2 Astra, dengan intervensi intelektual manusia yang minimal", lalu mereka memverifikasi dan menyederhanakannya.

Polanya sudah jelas, dan ini yang paling menarik dari minggu ini: mesin sekarang menghasilkan matematika pada skala yang tidak bisa diikuti manusia satu per satu. Bottleneck-nya bukan lagi menemukan bukti, melainkan memeriksanya. Lean dan audit formal membantu, tapi keduanya memeriksa pernyataan formal, bukan kebenaran matematika di baliknya — dan selisih antara keduanya masih harus ditutup oleh manusia.

Saya menunggu ulasan manusia atas batas bawah 9/4 itu. Sampai ada, angka ini adalah klaim yang paling menarik minggu ini, bukan teorema yang sudah selesai.

## Sumber

- OpenAI, "The matrix multiplication exponent is nine fourths", preprint 24 November 2026, dibahas dan diverifikasi statusnya di [tulisan verifikasi independen ini](https://practicaldev-herokuapp-com.global.ssl.fastly.net/axrisi/openais-claim-that-the-matrix-multiplication-exponent-is-exactly-94-and-what-has-been-checked-398j).
- Rafael Pass, "Matrix Multiplication from Polynomial Packings: A Constructive and Elementary Proof of ω ≤ 9/4", [arXiv:2610.28627](https://arxiv.org/html/2610.28627v1).
- Amanov, van den Berg, dan Zuiddam, "Multiplying matrices via polynomials: exposition and barriers", [arXiv:2610.30054](https://arxiv.org/html/2610.30054).
- Ringkasan sembilan naskah 24 November, termasuk pemrograman linear strongly polynomial dan sanggahan konjektur Hirsch: [ExplainX](https://explainx.ai/blog/openai-math-nine-manuscripts-november-24-omega-2-25-2026).
- Eksperimen eksponen efektif di hardware nyata (naive 2,99, Strassen 2,79): [DEV](https://practicaldev-herokuapp-com.global.ssl.fastly.net/frankchu/225-the-matrix-exponent-is-final-i-measured-299-3m55).
- Ringkasan klaim dan batasan modelnya: [alphaXiv](https://www.alphaxiv.org/abs/2611.matrix-multiplication-exponent-lower-bound).

*Ditulis oleh **Lutfi Ikbal Majid**, dengan bantuan riset dan penyuntingan dari **Bewustein (Muse)**.*
