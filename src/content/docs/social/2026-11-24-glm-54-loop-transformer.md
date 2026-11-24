---
title: "GLM-5.4: Model yang Berpikir Dua Kali Tanpa Membesar"
description: "Z.ai merilis GLM-5.4, model 750 miliar parameter yang menjalankan 28 lapisannya dua kali per token. Klaimnya besar — setara model 2–3 triliun parameter — tapi tabel benchmark-nya belum ada. Ini yang sebenarnya terjadi."
date: 2026-11-24T04:00:00.000Z
tags:
  - AI
  - GLM
  - Loop Transformer
lang: id
pair: 2026-11-24-en-glm-54-loop-transformer
source: "Artikel saya: GLM-5.4: Model yang Berpikir Dua Kali Tanpa Membesar"
---

Kemarin, 23 November, Z.ai merilis GLM-5.4 — dan ada satu kebiasaan saya yang langsung terasa familiar dari cara kerja model ini.

Saat membaca kode yang rumit, saya selalu membacanya dua kali. Bacaan pertama untuk menangkap bentuknya, bacaan kedua untuk memeriksa apakah logikanya benar-benar nyambung. Kadang bacaan kedua itu yang menyelamatkan, karena di situlah bug yang tadi lolos akhirnya kelihatan.

GLM-5.4 bekerja dengan cara yang mirip. Arsitekturnya disebut Loop Transformer: 28 lapisan di tengah model dijalankan dua kali untuk setiap token. Bukan menambah parameter, melainkan mengulang pemakaian lapisan yang sama supaya jaringannya terasa lebih dalam.

Klaimnya besar: sekitar 750 miliar parameter, tapi kecerdasannya disebut setara model berparameter 2–3 triliun. Kalau benar, hitungannya berubah — model tidak harus terus digemukkan untuk jadi lebih pintar, cukup dipakai berulang dengan cara yang benar.

Ada tiga trik teknik yang membuat pengulangan ini tidak berantakan di skala sebesar itu, menurut penjelasan Z.ai sendiri. Pertama, gate per token: tiap putaran punya gerbang sendiri yang mengatur seberapa besar pembaruan ditulis kembali ke residual stream, supaya aktivasi tidak meledak antar putaran. Kedua, hybrid KV cache: putaran kedua memakai ulang KV cache putaran pertama dan cuma menambah satu sliding window, jadi biaya memori ekstra untuk konteks 1 juta token tetap terkendali. Ketiga, indeks sparse attention dari putaran pertama dipakai ulang di putaran kedua, tanpa biaya indexing tambahan.

Yang membuat saya menaruh hormat justru kejujuran di baliknya. Z.ai tidak melatih model loop ini dari nol — mereka mengakui model loop yang dilatih dari awal masih kalah dari model biasa dengan anggaran pre-training yang sama. Jadi mereka mengambil GLM-5 yang sudah terlatih, lalu mengubahnya menjadi loop transformer lewat continued training. Arsitekturnya bukan sulap, melainkan konversi yang dihitung biayanya.

Tapi di sinilah saya menahan diri. Sampai hari ini Z.ai belum mempublikasikan satu pun skor benchmark untuk GLM-5.4 itu sendiri. Semua angka yang mereka tunjukkan berasal dari model eksperimen 30 miliar parameter: skor AIME25 naik dari 19,2 ke 30,4, dan GPQA-Diamond dari 47,6 ke 56,3, dengan tambahan komputasi latih sekitar 10 persen. Angka itu bukti untuk arsitekturnya, bukan untuk flagship-nya.

Bukti lain yang ada juga datang dari Z.ai sendiri: dalam uji internal 200 tugas coding nyata, GLM-5.4 menang 51,1 persen atas GLM-5.3 dan kalah 23,1 persen. Satu pengujian independen yang sudah beredar, KingBench 4 dari AICodeKing, menempatkannya di peringkat 7 dari 19 model — pertama di antara model terbuka, tapi di belakang Gemini 4 Neon dan Claude Fable 5.2.

Dan aksesnya pun masih terbatas: belum ada API publik, belum ada bobot yang bisa diunduh. Hari ini GLM-5.4 cuma bisa dipakai lewat Coding Plan Z.ai — Lite 18 dolar, Pro 80 dolar, Max 168 dolar per bulan — di ZCode dan aplikasi chat mereka. API dan bobot terbuka dijanjikan setelah evaluasi keamanan selesai.

Bahkan kelemahannya pun diakui Z.ai sendiri: model ini bisa terjebak dalam fase penalaran yang terlalu panjang, semacam "marathon thinking" yang tak kunjung selesai. Mereka bilang pemeriksaan diri yang lebih lama itu tetap menaikkan akurasi, tapi buatku ini pengingat bahwa berpikir dua kali ada harganya: latensi dan biaya per token ikut naik. Z.ai mengklaim kecepatan sampai 200 token per detik di luar jam sibuk dan 70–80 token per detik saat beban tinggi, tapi itu angka vendor yang belum bisa diverifikasi siapa pun dari luar.

Yang membuat rilis ini layak diperhatikan bukan cuma GLM-5.4-nya. Tiga hari sebelumnya, Thinking Machines merilis Inkling 2 Mini, model terkecil mereka, yang menjalankan 12 lapisan tengahnya tiga kali per token. Dan menurut laporan The Decoder, OpenAI sudah memakai arsitektur serupa sejak GPT-6 Astra. Jadi loop transformer bukan lagi eksperimen kertas: dalam satu minggu, tiga lab besar bergerak ke arah yang sama.

Dari dulu ukuranku sederhana: klaim tanpa tabel benchmark itu janji, bukan bukti. GLM-5.3, pendahulunya, justru memberi contoh yang bagus — bobotnya terbuka dengan lisensi MIT, bisa diunduh di Hugging Face, dan skornya terukur di mana-mana. GLM-5.4 belum sampai di titik itu. Sampai API-nya dibuka dan lembaga independen seperti Artificial Analysis bisa mengujinya, posisi yang jujur adalah: arsitekturnya menarik, klaimnya berani, buktinya masih ditunggu.

Kalau loop transformer terbukti di skala flagship, dampaknya nyata buat kita yang membangun dengan model: model yang lebih pintar tanpa tagihan parameter yang membengkak, dan mungkin, suatu hari nanti, model sekelas ini yang bobotnya bisa kita jalankan sendiri. Tapi kata kuncinya masih "kalau". Dan "kalau" itu baru terjawab setelah bobotnya keluar dan angka independennya muncul.

Selengkapnya di blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-24-glm-54-loop-transformer/
