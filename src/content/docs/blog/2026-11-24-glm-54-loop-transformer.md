---
title: "GLM-5.4: Ketika Transformer Belajar Berpikir Lebih Dalam Tanpa Menambah Parameter"
description: "Z.ai mengklaim GLM-5.4, model 750 miliar parameter yang menjalankan 28 lapisannya dua kali per token, setara model 2–3 triliun parameter. Masalahnya, belum ada benchmark publik untuk versi 750B-nya — yang tersedia baru eksperimen model 30B dengan arsitektur serupa. Seberapa jauh klaim itu bisa dipercaya?"
date: 2026-11-24T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - GLM
  - AI
  - DeepSeek
  - Model AI Terbaru
cover:
  image: /assets-img/banner-glm-54-loop-transformer.jpg
  alt: Banner informatif GLM-5.4 — 750 miliar parameter diklaim setara model 2–3 triliun, 28 lapisan dilewati dua kali tiap token, konteks 1 juta token
---

Ada satu kebiasaan yang selalu kulakukan saat membaca kode yang rumit: kubaca dua kali. Bacaan pertama untuk menangkap bentuknya, bacaan kedua untuk memeriksa apakah logikanya benar-benar nyambung. Kadang bacaan kedua itu yang menyelamatkan, karena di situlah bug yang tadi lolos akhirnya kelihatan.

Kemarin, 23 November, Z.ai merilis model yang cara kerjanya mirip sekali dengan kebiasaan itu. Namanya GLM-5.4, flagship baru dari keluarga GLM, dan arsitekturnya disebut Loop Transformer: 28 lapisan di tengah model dijalankan dua kali untuk setiap token. Bukan menambah parameter, melainkan mengulang pemakaian lapisan yang sama supaya jaringannya terasa lebih dalam.

Tapi menurutku, rilis ini menarik bukan karena klaimnya besar. Justru karena klaimnya besar sementara buktinya belum lengkap, dan Z.ai sendiri yang mengakuinya secara terbuka.

## Loop transformer: dalam tanpa membesar

Di transformer biasa, setiap lapisan dilewati sekali dalam satu forward pass. Di Loop Transformer, sekelompok lapisan yang berbobot sama dijalankan beberapa kali, dan hasil tiap putaran dipakai untuk memperbaiki putaran berikutnya. Idenya sendiri bukan hal baru: Universal Transformer sudah mengusulkan weight-shared depth sejak 2018, dan riset-riset kecil soal recurrent depth sudah menunjukkan hasil yang menjanjikan di skala kecil. Yang baru adalah ada yang berani membawanya ke skala flagship.

Z.ai bilang GLM-5.4 punya sekitar 750 miliar parameter dan kecerdasannya setara model berparameter 2–3 triliun. Angka itu, kalau benar, lumayan mengubah hitungan: model tidak harus terus digemukkan untuk jadi lebih pintar, cukup dipakai berulang dengan cara yang benar.

Ada tiga trik teknik yang membuat pengulangan ini tidak berantakan di skala 750 miliar, menurut penjelasan Z.ai sendiri. Pertama, gate per token: tiap putaran punya gerbang sendiri yang mengatur seberapa besar pembaruan ditulis kembali ke residual stream, supaya aktivasi tidak meledak antar putaran. Kedua, hybrid KV cache: putaran kedua memakai ulang KV cache putaran pertama dan cuma menambah satu sliding window, jadi biaya memori ekstra untuk konteks 1 juta token tetap terkendali. Ketiga, indeks sparse attention dari putaran pertama dipakai ulang di putaran kedua, tanpa biaya indexing tambahan.

Yang menarik, Z.ai tidak melatih model loop ini dari nol. Mereka mengakui model loop yang dilatih dari awal masih kalah dari model biasa dengan anggaran pre-training yang sama. Jadi mereka mengambil GLM-5 yang sudah terlatih, lalu mengubahnya menjadi loop transformer lewat continued training. Buatku ini kejujuran yang penting: arsitekturnya bukan sulap, melainkan konversi yang dihitung biayanya.

## Klaim besar, bukti masih setengah jalan

Di sinilah aku menahan diri. Sampai hari ini Z.ai belum mempublikasikan satu pun skor benchmark untuk GLM-5.4 itu sendiri. Semua angka yang mereka tunjukkan berasal dari model eksperimen 30 miliar parameter: skor AIME25 naik dari 19,2 ke 30,4, dan GPQA-Diamond dari 47,6 ke 56,3, dengan tambahan komputasi latih sekitar 10 persen. Angka itu bukti untuk arsitekturnya, bukan untuk flagship-nya.

Bukti lain yang ada juga datang dari Z.ai sendiri: grafik win-rate di materi peluncurannya menunjukkan GLM-5.4 menang 51,1 persen atas GLM-5.3 dan kalah 23,1 persen dalam uji internal 200 tugas coding. Masalahnya, Z.ai tidak mempublikasikan daftar tugasnya maupun metode penilaiannya, jadi angka itu tidak bisa diperiksa ulang dari luar. Satu pengujian independen yang sudah beredar, KingBench 4 dari AICodeKing, menempatkannya di peringkat 7 dari 19 model — posisi tertinggi di antara model yang dikategorikan terbuka oleh evaluatornya, tapi di belakang Gemini 4 Neon dan Claude Fable 5.2. Catat juga: bobot GLM-5.4 sendiri belum tersedia untuk publik, jadi label "terbuka" itu kategorisasi evaluator, bukan open-weight yang bisa diunduh dan dijalankan sendiri. Dan aksesnya pun masih terbatas: belum ada API publik, belum ada bobot yang bisa diunduh. Hari ini GLM-5.4 cuma bisa dipakai lewat Coding Plan Z.ai — Lite 18 dolar, Pro 80 dolar, Max 168 dolar per bulan — di ZCode dan aplikasi chat mereka. API dan bobot terbuka dijanjikan setelah evaluasi keamanan selesai.

Bahkan kelemahannya pun diakui Z.ai sendiri: model ini bisa terjebak dalam fase penalaran yang terlalu panjang, semacam "marathon thinking" yang tak kunjung selesai. Mereka bilang pemeriksaan diri yang lebih lama itu tetap menaikkan akurasi, tapi buatku ini pengingat bahwa berpikir dua kali ada harganya: latensi dan biaya per token ikut naik. Z.ai mengklaim kecepatan sampai 200 token per detik di luar jam sibuk dan 70–80 token per detik saat beban tinggi, tapi itu angka vendor yang belum bisa diverifikasi siapa pun dari luar.

Ada satu hal yang membuatku penasaran sebagai pengguna coding agent. Kalau sebagian proses reasoning bisa dipindahkan dari output token ke komputasi internal, apakah model bisa menyelesaikan tugas yang sama dengan lebih sedikit token? Ini menarik dari sisi biaya, tetapi belum tentu lebih cepat. Loop transformer bukan komputasi gratis: lapisan yang dijalankan ulang tetap memakan FLOPs dan waktu. Yang dihemat terutama jumlah bobot unik yang harus disimpan, bukan otomatis seluruh biaya inference. GLM-5.4 sendiri mengakui masalah marathon thinking itu. Jadi, efisiensi parameter belum tentu berarti efisiensi waktu atau biaya penggunaan.

## Bukan cuma Z.ai yang mengulang lapisan

GLM-5.4 bukan satu-satunya model yang memakai pendekatan ini. Pada 20 November, Thinking Machines merilis Inkling 2 Mini. Model 26,4 miliar parameternya menjalankan 12 lapisan tengahnya sebanyak tiga kali. Mekanismenya mirip, meskipun implementasinya berbeda.

OpenAI juga pernah dikaitkan dengan pendekatan serupa pada GPT-6 Astra melalui laporan The Decoder. Detail arsitekturnya belum dikonfirmasi secara resmi oleh OpenAI, jadi kabar ini posisinya masih laporan pihak ketiga, bukan fakta peluncuran.

Sepertinya ada sesuatu yang mulai menarik perhatian para peneliti: menambah kedalaman komputasi tidak harus selalu berarti menambah jumlah parameter.

## Patokanku: tunggu bobot dan benchmark independen

GLM-5.4 juga membawa konteks 1 juta token dan kemampuan vision, dan Z.ai membingkainya sebagai awal dari "Generalized Coding": kode sebagai fondasi untuk tugas yang lebih luas dari sekadar menulis software, dari membuat game lengkap sampai memodelkan lengan robot 6 sumbu di FreeCAD. Demo-demo itu mengesankan, tapi demo memang tugasnya mengesankan.

Dari dulu ukuranku sederhana: klaim tanpa tabel benchmark itu janji, bukan bukti.

Aku belum akan menempatkan GLM-5.4 di atas model lain hanya berdasarkan pengumuman ini. Tetapi arsitekturnya layak diperhatikan. Jika pendekatan ini benar-benar bisa memberikan peningkatan reasoning tanpa membuat biaya inference membengkak, dampaknya akan menarik, terutama untuk developer yang bergantung pada coding agent.

Untuk sekarang, aku lebih tertarik menunggu bobotnya daripada buru-buru percaya pada angka 2–3 triliun parameter.

Sumber: [halaman resmi GLM-5.4 dari Z.ai](https://openlm.ai/glm-5.4/), [The Decoder](https://the-decoder.com/z-ai-follows-openai-into-loop-transformer-territory-with-its-new-750b-flagship-model/), [perbandingan independen WidelAI](https://www.widelai.com/blog/glm-5-4-vs-kimi-k3-1-pro-glm-5-3-deepseek-v4-1-gemini-4-neon).

*Ditulis oleh **Lutfi Ikbal Majid**, dengan bantuan riset dan penyuntingan dari **Bewustein (Muse)**.*
