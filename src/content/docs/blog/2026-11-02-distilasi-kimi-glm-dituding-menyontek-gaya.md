---
title: "Dituding Menyontek Gaya: Kasus Distilasi Kimi K3.1 Pro dan GLM-5.3"
description: "Grafik kepribadian Artificial Analysis menunjukkan Kimi K3.1 Pro sangat mirip GPT-6 Astra, dan GLM-5.3 mirip keluarga Claude 5. Sebagian pihak membacanya sebagai bukti distilasi. Padahal grafik gaya tidak bisa membuktikan apa pun soal cara sebuah model dilatih — yang bisa adalah log API dan selisih harga 50 kali lipat."
date: 2026-11-02T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
lang: id
pair: 2026-11-02-en-distillation-kimi-glm-style-accusation
tags:
  - AI
  - Distilasi
  - Kimi
  - DeepSeek
  - OpenAI
cover:
  image: /assets-img/banner-distilasi-kimi-glm-dituding-menyontek-gaya.jpg
  alt: Banner informatif distilasi Kimi dan GLM — selisih harga 50x, 16.000 permintaan, klaim pertahanan 90-99%
---

Isu distilasi naik lagi ke permukaan minggu ini, dan kali ini dengan "bukti" yang kelihatan ilmiah: grafik. Artificial Analysis menerbitkan indeks kepribadian model, dan menurut laporan Wccftech yang dirangkum Tech Insider, grafik Moonshot Kimi K3.1 Pro menempel sangat rapat ke GPT-6 Astra, sementara GLM-5.3 dari Z.ai menempel ke keluarga Claude 5.

Kesimpulan yang ditarik sebagian orang cepat sekali: model-model ini pasti dilatih dari output model Barat. Menurutku, lompatan dari "grafiknya mirip" ke "pasti menyontek" itu terlalu jauh, dan tulisan ini mencoba memisahkan tiga lapisan yang sering dicampur: kemiripan yang terukur, tudingan yang bersumber, dan motif ekonominya.

## Lapisan pertama: kemiripan memang terukur

Distilasi sendiri adalah teknik yang sah dan umum: melatih model yang lebih kecil atau lebih murah menggunakan output model yang lebih kuat. Semua lab melakukannya ke modelnya sendiri. Persoalannya mulai ketika yang didistilasi adalah model milik pesaing lewat API, yang melanggar ketentuan layanan.

Yang ditunjukkan grafik Artificial Analysis adalah kemiripan perilaku: nada bicara, gaya hedging, tingkat verbosity. Dua model yang dilatih benar-benar independen jarang tumpang tindih seketat itu pada sumbu-sumbu gaya, dan itulah argumen terkuat pihak yang menuding. Kemiripannya nyata dan bisa diukur siapa pun.

Tapi kemiripan gaya bukan bukti asal-usul pelatihan. Internet di akhir 2026 sudah jenuh dengan teks hasil mesin; dataset publik mana pun yang dikeruk dari web terbuka pasti ikut menelan tulisan bergaya ChatGPT dan Claude dalam jumlah besar. Untuk membuktikan distilasi yang disengaja, yang dibutuhkan adalah log API, catatan akun, atau data latih yang bocor — bukan radar chart.

## Lapisan kedua: tudingan yang bersumber

Di luar grafik, ada dua laporan yang lebih berbobot. Pada 28 Oktober, The Information melaporkan bahwa Kimi K3.1 Pro dan DeepSeek V4.1-Flash 1017 sama-sama diuntungkan dari distilasi terhadap Astra, mengutip orang-orang yang mengaku tahu langsung. Reuters meneruskan klaim itu, dan mencatat OpenAI, DeepSeek, dan Moonshot tidak satu pun menanggapi saat dimintai komentar.

Jauh sebelum itu, pada 30 September, OpenAI sendiri mengaitkan sebuah kampanye distilasi pada Juli 2026 kepada individu-individu yang berhubungan dengan Moonshot AI: 16.000 permintaan dari lebih dari 4.000 pengguna. Volumenya kecil dibanding dataset pelatihan model frontier yang triliunan token, tapi 16.000 prompt yang dirancang hati-hati, dengan output penalaran yang panjang, memang cukup untuk membentuk sebuah fine-tune.

Posisinya sampai hari ini tetap sama: tudingan dari perusahaan yang berkepentingan, dilaporkan media kredibel, dan belum ada satu pun lab yang dituding mengaku atau membantah secara resmi. Itu bukan vonis.

## Lapisan ketiga: motifnya ada, dan angkanya besar

Kenapa isu ini akan terus muncul? Karena ekonominya terlalu masuk akal untuk diabaikan. Menurut rangkuman FourWeekMBA, token output GPT-6 Astra berharga 50 kali lipat dari yang ditagihkan Kimi, dan 42 kali lipat dari DeepSeek, berdasarkan harga API per 29 Oktober 2026.

Dengan selisih sebesar itu, insentifnya sederhana: siapa pun yang bisa mereproduksi sebagian besar perilaku flagship dengan melatih dari outputnya bisa menjual jauh lebih murah dan tetap untung. Lab aslinya menghabiskan miliaran dolar untuk pretraining dan alignment; penirunya mengeluarkan sebagian kecil dari itu. Distilasi tidak menyalin bobot model, tapi ia bisa menangkap sebagian besar kemampuan yang terlihat oleh pembeli.

Anthropic bahkan mengklaim pertahanan barunya memangkas panen distilasi sekitar 90 sampai 99 persen, menurut rangkuman yang sama. Klaim itu, kalau benar, adalah pengakuan tidak langsung bahwa panennya memang terjadi dalam skala yang layak dilawan dengan rekayasa serius.

## Patokanku

Buatku, dari dulu ukurannya sederhana: tuduhan sekelas ini dinilai dari bukti yang bisa diaudit, bukan dari kemiripan yang terasa meyakinkan. Grafik kepribadian membuktikan dua model berbicara mirip. Ia tidak membuktikan siapa belajar dari siapa.

Yang justru layak diperhatikan sebagai pengguna adalah konsekuensi praktisnya. Selama selisih harga 50 kali lipat itu ada, model murah yang "cukup mirip flagship" akan terus lahir, entah lewat distilasi yang disengaja atau lewat dataset web yang memang sudah terkontaminasi gaya flagship. Dan untuk pekerjaanku sehari-hari, pertanyaan akhirnya tetap sama: bukan siapa yang paling mirip siapa, tapi model mana yang menyelesaikan tugas dengan biaya total paling masuk akal — dibuktikan lewat pengujian, bukan lewat grafik kepribadian.

Sumber: Tech Insider (2 November 2026) merangkum Wccftech (31 Oktober 2026), The Information via Reuters (28 Oktober 2026), dan pernyataan OpenAI (30 September 2026) via FourWeekMBA.
