---
title: "Liquid AI d1.3-ultra: Model yang Tidak Menjawab, Cuma Memutuskan"
description: "Liquid AI merilis d1.3-ultra pada 27 November 2026, model decision yang memuncaki Artificial Analysis Decision Index dengan skor 76,4. Ia tidak menulis satu kata pun — ia mengembalikan probabilitas, dan tagihannya dihitung per tugas, bukan per token."
date: 2026-11-28T11:52:00.000Z
tags:
  - AI
  - Machine Learning
  - Liquid AI
lang: id
pair: 2026-11-28-en-liquid-ai-d13-ultra-decision-model
source: "Artikel saya: Liquid AI d1.3-ultra: Model yang Tidak Menjawab, Cuma Memutuskan"
---

Kemarin, 27 November, Liquid AI merilis d1.3-ultra lewat satu kalimat di X: "Today we release d1.3-ultra, our most powerful decision model, recursively improved from d1-ultra."

Saya membaca kalimat itu dua kali, karena model ini tidak melakukan hal yang biasa dilakukan model bahasa. Ia tidak menulis satu kata pun. Ia memutuskan.

Decision model menerima input — email dukungan, faktur, foto struk, rekaman suara — bersama daftar pertanyaan, lalu mengembalikan jawaban untuk tiap pertanyaan beserta probabilitas tiap opsi, dalam satu pass. Tidak ada token yang di-generate, jadi tagihannya hanya token input.

Contoh yang dipakai Liquid sendiri cukup membumi: sebuah pipeline triase menerima ribuan email, dan untuk tiap email model menjawab "butuh eskalasi: ya 0,82, tidak 0,15, tidak tahu 0,03". Tim menetapkan ambang — di atas 0,8 diproses otomatis, di bawah itu dilempar ke manusia. Mekanisme seperti ini hanya bekerja kalau angkanya jujur. Di situlah indeks Artificial Analysis masuk: skornya adalah akurasi dikurangi penalti Brier, jadi jawaban yang salah dengan percaya diri tinggi dihukum lebih berat daripada jawaban salah yang ragu-ragu.

Dan skornya memang memuncaki indeks itu. Artificial Analysis menjalankan sendiri pengujiannya atas 27 decision model, dan d1.3-ultra duduk di posisi pertama dalam Decision Index v2.1 dengan 76,4 — setengah poin di atas Bison 31B dari Baseten yang mencetak 75,9. Pendahulunya sendiri, d1.2-ultra, tertinggal 1,6 poin di 74,8, padahal model itu baru rilis 16 November, sebelas hari sebelumnya.

Tapi angka 76,4 dan 75,9 tampak seperti seri kalau dibulatkan, dan memang beberapa pemberitaan menyebutnya seri. Profil di balik kedua angka itu berbeda, dan profilnya yang menentukan cocok tidaknya model untuk satu pekerjaan.

Indeks ini merata-ratakan enam evaluasi dengan bobot yang dipublikasikan. d1.3-ultra menang di dua yang paling berbobot: AA-Paperclip, 30% bobot, menguji keputusan atas 1.500 dokumen — resume, struk, faktur, makalah — dengan skor 77,2 melawan 73,3 milik Bison. AA-Omniscience-Decision, 15% bobot, menguji pengetahuan dan kesediaan menolak yang tidak diketahui, 66,3 melawan 60,1. Bison menang di empat sisanya, termasuk Symmetry yang menguji apakah jawaban tetap sama ketika pertanyaan diungkapkan ulang: 89,2 melawan 86,2.

Artinya, pipeline yang membaca dokumen dan struk lebih cocok dengan profil Liquid. Pipeline yang harus stabil ketika kebijakan ditulis ulang dengan kata berbeda lebih cocok dengan profil Baseten. Indeks yang sama, dua jawaban berbeda, tergantung apa yang sedang diputuskan.

Versi ini menambah tiga kemampuan. Ranking mengurutkan sekumpulan opsi atau mengembalikan top-k, sesuatu yang baru bagi keluarga d1: selama ini API-nya hanya menjawab ya/tidak, memilih satu opsi, memberi skor, atau membaca satu nilai. Ekstraksi, yang diperkenalkan d1.2, kini membaca angka dan tanggal langsung dari gambar dan audio — total struk dari foto, tanggal yang diucapkan dalam klip. Span, yang juga berasal dari d1.2, kini mengembalikan waktu mulai dan selesai dari bagian audio tempat sesuatu diucapkan.

Di sinilah sudut yang paling relevan buat siapa pun yang membangun sistem agen: harga per tugas, bukan per token. Artificial Analysis juga mempublikasikan biaya dan latensi per tugas: d1.3-ultra US$133 per satu juta tugas indeks dengan median 191 ms per tugas. Bison 31B US$345 dengan 154 ms. Median dari 27 model adalah US$137 dan 192 ms — jadi d1.3-ultra adalah model dengan skor tertinggi pada harga dan kecepatan yang biasa-biasa saja: peringkat 11 dari 27 untuk biaya, 13 dari 27 untuk kecepatan.

Harga inputnya sendiri US$0,042 per satu juta token, kurang dari separuh US$0,10 milik Bison. Tapi perbandingan per token menyesatkan di sini, karena kedua model menagih dengan cara yang sama sekali berbeda: decision model hanya menagih input, sementara model bahasa menagih input dan output. Angka yang bisa dibandingkan antar kategori adalah biaya per tugas selesai dan milidetik per tugas.

Patokan yang sama pernah kupakai untuk GPT-6.1 Terra: bukan token termurah yang menang, tapi tugas yang selesai dengan biaya total paling masuk akal. Decision model membuat patokan itu eksplisit — harga per tugasnya memang dipublikasikan sebagai metrik utama, bukan disembunyikan di balik harga per token.

Perbandingan ini juga menempatkan "termurah" pada tempatnya. Perplexity Decider v1.3 mencetak 70,4 dengan biaya US$68 per satu juta tugas. Celeris-1.1 Decision US$14 dan 61 ms, dengan skor 62,0. Gemini Decision 1 dari Google US$345 dengan skor 66,0. Tidak ada satu model yang menang di semua sumbu; yang ada adalah peta trade-off, dan tugasnya yang menentukan titik mana yang diambil.

Ada beberapa hal yang layak dicatat sebelum ada yang memindahkan pipeline ke d1.3-ultra. Pertama, kecepatannya. Empat rilis dalam tujuh minggu: d1 pada 5 Oktober, d1-ultra 15 Oktober, d1.2 pada 16 November, d1.3-ultra 27 November. Dokumentasi Liquid sudah menandai d1-ultra, d1.1, dan d1 sebagai deprecated, dan d1.2-ultra mendapat pengganti sebelas hari setelah rilis. Siapa pun yang memanggil model ini lewat nama akan sering migrasi, dan itu biaya yang tidak muncul di tabel harga.

Kedua, model ini bukan open-weight. Tidak ada indikasi bobot publik untuk keluarga ultra; model decision open-weight Liquid tetap yang kecil — d1-2B, d1-omni-2B, dan d1-omni-600M. Lawannya, Bison 31B, justru open-weight: post-training dari Gemma 4 31B, bobot di Hugging Face di bawah lisensi MIT dan Apache 2.0, konteks 131.072 token. Jadi "seri" di papan skor mempertemukan model tertutup dengan model terbuka, dan pilihannya bukan cuma soal skor.

Ketiga, klaim dari Liquid sendiri yang belum bisa diverifikasi. Pengumuman menyebut peningkatan di "lebih dari 100 benchmark" internal tanpa angka apa pun, dan tidak ada angka kalibrasi untuk d1.3-ultra — padahal rilis d1.2 menyertakan calibration error 0,8 poin. Klaim bahwa data latihnya kini mencakup instruksi yang ditanam di dalam input, yang harus diperlakukan sebagai data bukan perintah, juga tidak disertai pengujian yang dipublikasikan. Sampai ada pengujian itu, klaim tersebut tetap klaim.

Keempat, distribusi. Liquid menyebut OpenRouter dan Vercel "segera", tanpa tanggal. Hal yang sama dijanjikan untuk d1.2 pada 16 November, dan halaman OpenRouter Liquid sampai 28 November masih hanya mencantumkan d1.2 dan d1.2-ultra. Janji distribusi yang diulang tanpa tanggal adalah janji yang belum ditepati dua kali.

Decision model adalah primitif yang masuk akal untuk sistem agen — routing, moderasi, skoring, triase — pekerjaan yang selama ini dipaksakan ke model bahasa yang menghasilkan paragraf untuk menjawab pertanyaan ya/tidak. d1.3-ultra membuktikan kategori ini bisa memuncaki indeksnya sendiri dengan harga yang wajar. Yang masih kutunggu adalah dua hal yang lebih membosankan daripada skor: apakah OpenRouter benar-benar kebagian model ini, dan apakah ritme rilisnya melambat cukup lama sampai orang berani membangun di atasnya tanpa rencana migrasi tiap dua minggu.

Selengkapnya di blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-28-liquid-ai-d13-ultra-model-yang-tidak-menjawab/
