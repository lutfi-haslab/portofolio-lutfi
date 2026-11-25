---
title: "Ternary Bonsai 2.5: Model 27B Sebesar 5,9 GB yang Belajar Menjadi Agen"
description: "PrismML merilis Ternary Bonsai 2.5 27B pada 24 November 2026: model 27B yang muat dalam 5,9 GB, dengan rata-rata skor coding agen naik dari 37,9 ke 54,2. Kompresinya bukan lagi berita — yang baru adalah model terkompresi yang bisa bertahan di tugas agen yang panjang."
date: 2026-11-25T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - AI
  - Model AI Terbaru
  - Open Source
  - Qwen
cover:
  image: /assets-img/banner-ternary-bonsai-25-model-27b-59-gb.jpg
  alt: Banner informatif Ternary Bonsai 2.5 — model 27B dalam 5,9 GB, skor coding agen 54,2 naik dari 37,9, skor tool-calling 82,2 naik dari 60,2
---

Berita soal model yang diperkecil sudah tidak mengejutkan lagi. Setiap bulan ada saja model yang diklaim lebih kecil dengan kemampuan yang sama. Rilis PrismML kemarin, 24 November, menarik bukan karena ukurannya — pendahulunya, Bonsai 2, sudah membuktikan model 27B bisa muat dalam 5,9 GB. Yang baru adalah klaim bahwa model sekecil itu sekarang bisa bekerja sebagai agen: memeriksa repositori, menulis kode, menjalankan tes, memanggil tool, dan memperbaiki kesalahannya sendiri dalam tugas yang panjang.

Itu klaim yang lebih sulit daripada sekadar "lebih kecil". Model yang menjawab satu pertanyaan dengan benar belum tentu bisa menyelesaikan tugas yang butuh dua puluh langkah.

## Tiga nilai untuk setiap bobot

Ternary Bonsai dibangun dari Qwen3.8-27B, dan arsitekturnya tidak diubah. Yang diubah adalah cara bobotnya disimpan: setiap bobot hanya boleh bernilai −1, 0, atau +1. Tiga kemungkinan nilai membawa informasi log₂3, sekitar 1,585 bit per bobot. Dengan satu faktor skala FP16 yang dipakai bersama untuk tiap kelompok 128 bobot, ukuran akhirnya 1,76 bit per bobot — 5,93 GB, berbanding 53,8 GB untuk versi FP16 yang sama.

Ada dua detail yang membuat pendekatan ini berbeda dari kuantisasi biasa. Pertama, bobotnya dibatasi menjadi ternary *selama* pelatihan, bukan dikompresi setelah model selesai dilatih, jadi modelnya belajar hidup di dalam batas itu. Kedua, setiap matriks bobot diputar dulu lewat transformasi Hadamard sebelum ditetapkan nilai ternary-nya, supaya outlier tersebar dan tidak ada satu bobot ekstrem yang merusak satu kelompok.

Hasilnya, menurut PrismML sendiri, Bonsai 2 mempertahankan 98,2 persen kemampuan model FP16-nya dalam rata-rata evaluasi mereka. Angka itu rata-rata, dan datang dari vendornya — tapi setidaknya ini bukan kuantisasi tempel-belakang yang hasilnya baru ketahuan setelah dipakai.

## Yang berubah di 2.5: perilaku agen, bukan ukuran

Format bobot, ukuran file, dan arsitektur 2.5 sama persis dengan Bonsai 2. Yang berubah adalah perilakunya dalam tugas agen. Di tiga benchmark coding agen — SWE-bench Verified, DeepSWE v1.1, dan Terminal-Bench 2.1 — rata-rata skornya 54,2, naik dari 37,9 pada Bonsai 2. Di dua benchmark pemanggilan tool, AppWorld dan τ³-Bench, rata-ratanya 82,2, naik dari 60,2.

Kenaikan 16,3 poin di coding agen itu besar, dan alasan PrismML masuk akal secara teknis. Model terkompresi paling rapuh justru di tugas berantai: satu kesalahan kecil di langkah ketiga membuat langkah keempat salah arah, dan agennya mengulang pendekatan yang sudah gagal. Siaran persnya sendiri mengakui masalah itu secara terbuka. Pengembangan 2.5 difokuskan ke sana: merespons umpan balik tool, pulih dari aksi yang gagal, dan menghindari penalaran yang berputar-putar tanpa hasil.

Ini bagian yang menurutku paling penting dari rilis ini. Industri sudah cukup pandai membuat model kecil yang pintar menjawab. Yang belum terbukti adalah model kecil yang bisa menyelesaikan pekerjaan — dan pekerjaan hampir selalu berantai, berantakan, dan butuh koreksi di tengah jalan.

## Catatan kaki yang tidak boleh dilewatkan

Semua angka di atas adalah angka PrismML, dan sampai artikel ini ditulis belum ada pengujian independen atas Bonsai 2.5. Siaran persnya hanya memberi rata-rata, tanpa rincian per benchmark; hasil lengkapnya ada di whitepaper yang menyertai rilis. Jadi 54,2 itu angka yang bisa diuji, bukan angka yang sudah teruji dari luar.

Ada satu catatan praktis lagi. File 5,93 GB yang paling padat, format PTQ1_0, berjalan di fork llama.cpp milik PrismML sendiri — dukungannya di llama.cpp upstream masih dalam proses review. File Q2_0 yang berjalan di llama.cpp standar berukuran 7,63 GB. Di sisi Apple, modelnya berjalan lewat MLX. Jadi "bisa dijalankan di llama.cpp" benar, tapi dengan tanda bintang yang perlu dibaca sebelum merencanakan deployment.

Konteksnya 262 ribu token, diwarisi dari Bonsai 2 yang arsitekturnya dipertahankan, dan lisensinya Apache 2.0 — bobotnya bisa diunduh gratis sejak 24 November.

## Buat siapa model seperti ini

PrismML membidik dua pemakaian: asisten coding yang bekerja di dalam repositori privat tanpa kodenya keluar dari mesin, dan asisten knowledge work yang mengolah folder dokumen menjadi analisis terstruktur. Keduanya butuh satu hal yang sama: model yang tetap bisa diandalkan setelah sepuluh, dua puluh, lima puluh langkah — dan tetap berada di perangkat pengguna.

Dari sisi perangkat, 5,9 GB mengubah kelas mesin yang bisa menjalankan model 27B. Laptop biasa yang sebelumnya mentok di model 7–8B kini punya model yang skor coding agennya, menurut vendornya, berada di kisaran yang sama dengan model yang jauh lebih besar. Tidak ada harga API di sini, karena modelnya diunduh; biayanya adalah perangkat keras dan listrik sendiri, plus waktu menyiapkan runtime yang tepat.

Aku menunggu dua hal sebelum menaruh kepercayaan penuh pada rilis ini: pengujian independen atas angka 54,2 itu, dan format PTQ1_0 yang masuk ke llama.cpp upstream. Sampai dua hal itu terjadi, Bonsai 2.5 adalah janji yang spesifik dan bisa diuji — dan itu sudah lebih baik dari kebanyakan pengumuman model.

Sumber: [siaran pers PrismML, 24 November 2026](https://www.prnewswire.com/news-releases/prismml-launches-ternary-bonsai-2-5-27b-for-agentic-coding-and-private-knowledge-work-302949886.html), [model card Ternary Bonsai 2.5 27B di Hugging Face](https://huggingface.co/prism-ml/Ternary-Bonsai-2.5-27B-GGUF), [model card Ternary Bonsai 2 27B](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf/blob/main/README.md).

*Ditulis oleh **Lutfi Ikbal Majid**, dengan bantuan riset dan penyuntingan dari **Bewustein (Muse)**.*
