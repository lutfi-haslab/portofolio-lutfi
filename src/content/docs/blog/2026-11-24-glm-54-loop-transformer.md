---
title: "GLM-5.4: Model yang Berpikir Dua Kali Tanpa Membesar"
description: "Z.ai merilis GLM-5.4, model 750 miliar parameter yang menjalankan 28 lapisannya dua kali per token. Klaimnya besar — setara model 2–3 triliun parameter — tapi tabel benchmark-nya belum ada. Ini yang sebenarnya terjadi."
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

Bukti lain yang ada juga datang dari Z.ai sendiri: dalam uji internal 200 tugas coding nyata, GLM-5.4 menang 51,1 persen atas GLM-5.3 dan kalah 23,1 persen. Satu pengujian independen yang sudah beredar, KingBench 4 dari AICodeKing, menempatkannya di peringkat 7 dari 19 model — pertama di antara model terbuka, tapi di belakang Gemini 4 Neon dan Claude Fable 5.2. Dan aksesnya pun masih terbatas: belum ada API publik, belum ada bobot yang bisa diunduh. Hari ini GLM-5.4 cuma bisa dipakai lewat Coding Plan Z.ai — Lite 18 dolar, Pro 80 dolar, Max 168 dolar per bulan — di ZCode dan aplikasi chat mereka. API dan bobot terbuka dijanjikan setelah evaluasi keamanan selesai.

Bahkan kelemahannya pun diakui Z.ai sendiri: model ini bisa terjebak dalam fase penalaran yang terlalu panjang, semacam "marathon thinking" yang tak kunjung selesai. Mereka bilang pemeriksaan diri yang lebih lama itu tetap menaikkan akurasi, tapi buatku ini pengingat bahwa berpikir dua kali ada harganya: latensi dan biaya per token ikut naik. Z.ai mengklaim kecepatan sampai 200 token per detik di luar jam sibuk dan 70–80 token per detik saat beban tinggi, tapi itu angka vendor yang belum bisa diverifikasi siapa pun dari luar.

## Bukan cuma Z.ai yang mengulang lapisan

Yang membuat rilis ini layak diperhatikan bukan cuma GLM-5.4-nya. Tiga hari sebelumnya, Thinking Machines merilis Inkling 2 Mini, model terkecil mereka, yang menjalankan 12 lapisan tengahnya tiga kali per token. Dan menurut laporan The Decoder, OpenAI sudah memakai arsitektur serupa sejak GPT-6 Astra. Jadi loop transformer bukan lagi eksperimen kertas: dalam satu minggu, tiga lab besar bergerak ke arah yang sama.

Buatku, ini pola yang familier dari sejarah model bahasa. Dulu semua orang berlomba menambah parameter. Lalu datang era konteks panjang, lalu era reasoning, lalu era efisiensi inference. Sekarang giliran kedalaman komputasi per token yang dioptimalkan — bukan seberapa besar modelnya, tapi seberapa keras tiap parameternya bekerja.

## Patokanku: tunggu bobot dan benchmark independen

GLM-5.4 juga membawa konteks 1 juta token dan kemampuan vision, dan Z.ai membingkainya sebagai awal dari "Generalized Coding": kode sebagai fondasi untuk tugas yang lebih luas dari sekadar menulis software, dari membuat game lengkap sampai memodelkan lengan robot 6 sumbu di FreeCAD. Demo-demo itu mengesankan, tapi demo memang tugasnya mengesankan.

Dari dulu ukuranku sederhana: klaim tanpa tabel benchmark itu janji, bukan bukti. GLM-5.3, pendahulunya, justru memberi contoh yang bagus — bobotnya terbuka dengan lisensi MIT, bisa diunduh di Hugging Face, dan skornya terukur di mana-mana. GLM-5.4 belum sampai di titik itu. Sampai API-nya dibuka dan lembaga independen seperti Artificial Analysis bisa mengujinya, posisi yang jujur adalah: arsitekturnya menarik, klaimnya berani, buktinya masih ditunggu.

Kalau loop transformer terbukti di skala flagship, dampaknya nyata buat kita yang membangun dengan model: model yang lebih pintar tanpa tagihan parameter yang membengkak, dan mungkin, suatu hari nanti, model sekelas ini yang bobotnya bisa kita jalankan sendiri. Tapi kata kuncinya masih "kalau". Dan "kalau" itu baru terjawab setelah bobotnya keluar dan angka independennya muncul.

Sumber: [halaman resmi GLM-5.4 dari Z.ai](https://openlm.ai/glm-5.4/), [The Decoder](https://the-decoder.com/z-ai-follows-openai-into-loop-transformer-territory-with-its-new-750b-flagship-model/), [perbandingan independen WidelAI](https://www.widelai.com/blog/glm-5-4-vs-kimi-k3-1-pro-glm-5-3-deepseek-v4-1-gemini-4-neon).

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
