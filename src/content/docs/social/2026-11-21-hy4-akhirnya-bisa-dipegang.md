---
title: "Hy4 Akhirnya Bisa Dipegang — Tapi Baca Dulu Klausul di Lisensinya"
description: "Tencent akhirnya mengunggah bobot Hy4 ke Hugging Face: 770 miliar parameter, 1,55 TB, tiga checkpoint. Tapi lisensinya bukan Apache 2.0 lagi — ada garis komersial 50 juta dolar di pasal 10."
date: 2026-11-21T04:00:00.000Z
tags:
  - AI
  - Tencent
  - Open Source
lang: id
pair: 2026-11-21-en-hy4-weights-finally-landed
source: "Artikel saya: Hy4 Akhirnya Bisa Dipegang — Tapi Baca Dulu Klausul di Lisensinya"
---

Dua minggu lalu saya menulis satu kalimat yang waktu itu terasa seperti kesimpulan: Hy4 bisa melihat layarmu dan mengklik aplikasimu, tapi belum bisa kamu pegang. Tombol download-nya belum ada.

Kemarin, 20 November, tombol itu akhirnya muncul. Tencent mengunggah bobot Hy4 ke Hugging Face — bukan satu checkpoint, tapi tiga: model instruct `tencent/Hy4`, varian FP8 `Hy4-FP8`, dan model dasar `Hy4-base`. Ada cermin di ModelScope dan GitCode, resep deployment vLLM dan SGLang, pipeline fine-tuning, dan system card beserta evaluasi keamanannya. Janji "dalam beberapa hari ke depan" dari rilis 4 November itu ternyata ditepati, dan ditepati dengan cukup lengkap.

Tapi seperti biasa, saya tidak berhenti di judul. Karena barangnya memang ada — dan syaratnya juga ada.

Barangnya dulu: Hy4 adalah Mixture-of-Experts 770 miliar parameter, 49 miliar di antaranya aktif per token, konteks 1 juta token. Angka yang paling membumi justru bukan parameternya, melainkan ukuran filenya: model BF16-nya tersebar di 245 shard safetensors, total sekitar 1,55 TB. Varian FP8-nya sekitar 0,79 TB. Menjalankan FP8-nya saja, menurut resep resmi, butuh delapan GPU. Saya sendiri tidak punya mesin seperti itu — Mac 8 GB saya bahkan tidak cukup untuk sekadar mengintip satu shard-nya.

Jadi "bisa dipegang" di sini punya arti yang spesifik: bisa dipegang oleh tim yang memang punya klaster, atau peneliti yang mau mengukur dan mengutak-atik. Bukan oleh semua orang di laptop masing-masing.

Sekarang syaratnya. Hy4 preview bulan Agustus lalu dirilis di bawah Apache 2.0. Bobot penuh yang baru ini tidak. Ia memakai Tencent Hy License versi 1.0 — lisensi turunan Apache 2.0 yang di dalam teksnya sendiri tertulis: ini bukan Apache 2.0.

Bedanya ada di pasal 10: operator yang menjual inferensi Hy4 sebagai layanan perlu lisensi tertulis terpisah dari Tencent begitu pendapatan kotor dunianya melewati 50 juta dolar AS dalam dua belas bulan, atau produknya melewati 100 juta pengguna aktif bulanan. Penggunaan internal murni dikecualikan.

Apakah itu jebakan? Menurutku bukan. Buat hampir semua orang yang membaca ini, garis itu tidak akan pernah tersentuh. Tapi ini tetap perubahan arah yang layak disebut namanya: dari "open" tanpa syarat menjadi "open, dengan garis komersial yang jelas". Dan ini bukan kesalahan ketik di satu repo — bobot Hy4 Flash yang mendarat tiga hari lebih dulu, 17 November, memakai lisensi yang sama. Ini kebijakan.

Ada satu konteks yang menjelaskan kenapa rilis ini terasa seperti penutup satu babak. Di laporan keuangan kuartal ketiga Tencent, 18 November, presiden Martin Lau bilang pembatasan chip AS akan memperlambat pengembangan generasi Hy berikutnya. Model ini, dengan kata lain, adalah puncak dari apa yang bisa mereka latih dengan komputasi yang mereka punya sekarang — dan mereka memilih untuk membagikannya sebelum babak berikutnya melambat.

Soal angka-angkanya, saya tetap pada pendirian saya: ini klaim Tencent, bukan hasil reproduksi independen. Kartu modelnya menulis Hy4 Base mencetak MMLU 91,6 dan MMLU-Pro 73,9. Tencent juga mengakui sendiri kesenjangannya dengan model proprietary terbaik di matematika level riset, coding horizon panjang, dan visual question answering yang sulit. Sekarang, dengan bobot di tangan publik, angka-angka itu akhirnya bisa diuji ulang oleh siapa saja yang punya GPU-nya. Itu justru nilai terbesar dari rilis ini: bukan skornya, melainkan bahwa skornya sekarang bisa dibantah.

Lalu, buat siapa sebenarnya rilis ini? Kalau kamu cuma mau memakai Hy4, jawabannya tidak berubah dari dua minggu lalu: pakai API-nya. Harganya tetap 0,834 dolar per 1 juta token input dan 2,501 dolar per 1 juta token output, dengan tarif promo separuhnya di OpenRouter. Tidak ada gunanya mengunduh 1,55 TB untuk sesuatu yang bisa dipanggil lewat satu endpoint.

Tapi kalau kamu peneliti, pembangun infrastruktur, atau tim yang memang butuh modelnya hidup di dalam tembokmu sendiri — kemarin adalah harinya.

Dua minggu lalu saya menutup artikel dengan kalimat "tunggu". Dua dari tiga penantian itu sudah selesai kemarin. Yang ketiga — reproduksi independen — baru bisa dimulai sekarang, karena baru sekarang ada yang bisa direproduksi.

Hy4 akhirnya bisa dipegang. Pegang baik-baik, baca lisensinya, dan ukur sendiri.

Selengkapnya di blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-21-hy4-akhirnya-bisa-dipegang/
