---
title: "Tinta Tak Terlihat di Tulisan Claude — dan Kamu Tidak Bisa Memeriksanya"
description: "Mulai 3 November 2026, empat model Claude yang lebih lama ikut membawa watermark tak terlihat di setiap teksnya. Masalahnya bukan tandanya — melainkan siapa yang boleh membacanya, dan apa yang sebenarnya dibuktikan tanda itu."
date: 2026-11-03T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - AI
  - Anthropic
  - Open Source
cover:
  image: /assets-img/banner-claude-watermark-tinta-tak-terlihat.jpg
  alt: Banner informatif watermark Claude — 4 model lama mulai di-watermark, 2 di antaranya punya celah parameter, dan batas transisi 2 Desember 2026
---

Kalimat pertama yang kubaca soal ini bukan dari pengumuman resmi. Melainkan dari candaan di internet: *"Claude gonna start snitching on Tuesday."*

Claude akan mulai mengadu hari Selasa. Selasa itu hari ini, 3 November 2026.

Menurut email yang dikirim Anthropic ke pelanggan Claude Platform pada 27 Oktober — yang isinya beredar dan diliput beberapa media — mulai hari ini watermark teks diterapkan ke empat model yang lebih lama: Claude Mythos 5, Opus 4.7, Opus 4.6, dan Sonnet 4.6. Model-model yang lebih baru, seperti Opus 5.5, sudah membawanya sejak awal. Untuk Amazon Bedrock, peralihannya kabarnya butuh beberapa hari tambahan.

Satu catatan kejujuran dulu: tanggal 3 November ini berasal dari email pelanggan itu, bukan dari halaman publik Anthropic yang bisa kubuka. Halaman resminya hanya bilang model-model lama sedang ditambahkan "dalam beberapa bulan ke depan". Jadi kalau kamu membaca artikel ini dan tanggalnya ternyata meleset beberapa hari di satu permukaan, itu sebabnya. Tapi arahnya tidak diragukan: semua model Claude sedang menuju ke sana.

## Cara kerja tintanya

Watermark ini bukan stempel yang ditempel di akhir dokumen. Ia tidak menambah karakter, tidak menambah token, dan menurut Anthropic tidak mengubah makna, kualitas, atau keterbacaan teks.

Cara kerjanya: saat model memilih kata, ada pola statistik yang dibisikkan ke dalam pilihan-pilihan itu, dipandu kunci rahasia. Tekniknya adalah varian dari SynthID-Text yang dipublikasikan Google DeepMind. Karena tandanya hidup di dalam pilihan kata itu sendiri, ia ikut terbawa saat teks di-copy paste — dan baru hilang kalau kata-katanya diubah cukup banyak.

Itu desain yang pintar, dan aku tidak meremehkannya. Tanda yang menempel pada teks, bukan pada file, adalah satu-satunya jenis tanda yang punya peluang bertahan di dunia nyata, tempat semua orang menyalin-menempel seenaknya.

Tapi justru di sinilah ceritanya jadi menarik. Bukan karena teknologinya — melainkan karena asimetrinya.

## Kamu ditandai, tapi kamu tidak bisa memeriksa tandanya

Inilah bagian yang paling mengganjal buatku: watermark ini tidak bisa dimatikan, tidak bisa dibatasi per wilayah — Anthropic bilang belum bisa membatasi cakupannya, jadi berlaku global — dan yang paling penting, kamu sebagai penulis atau pembaca tidak bisa memeriksanya sendiri.

Detektor teks Anthropic masih berstatus private preview. Yang boleh mengaksesnya adalah daftar organisasi yang memenuhi syarat menurut hukum Uni Eropa: regulator, penegak hukum, media, pemeriksa fakta, peneliti independen, institusi pendidikan, dan perusahaan yang butuh verifikasi untuk kepatuhannya sendiri. Kamu, aku, dan pembaca biasa tidak termasuk.

Yang gratis dan terbuka untuk umum hanyalah Claude Content Checker — dan itu hanya memeriksa file (gambar, dokumen) untuk metadata Content Credentials berstandar C2PA, bukan teks. Jadi kalau seseorang menuduh tulisanmu "pasti dari Claude", tidak ada alat publik yang bisa kamu pakai untuk membantah atau mengonfirmasi.

Ini bukan sekadar soal teknis. Ini soal siapa yang memegang kunci pembuktian. Sebuah sistem transparansi yang kunci verifikasinya hanya dipegang segelintir pihak bukanlah transparansi penuh — ia adalah transparansi yang disewakan.

## Tanda ini tidak membuktikan apa yang orang kira

Keterbatasan kedua, yang diakui Anthropic sendiri dengan cukup jujur: watermark yang terdeteksi hanya berarti Claude *mungkin pernah memproses* teks itu. Bukan berarti Claude yang menulisnya.

Kamu bisa menulis esai sepenuhnya dengan tanganmu sendiri, lalu meminta Claude memperbaiki tata bahasanya, dan hasil akhirnya bisa membawa watermark. Terjemahan, ringkasan, penyuntingan — semua bisa meninggalkan jejak yang sama. Sebaliknya, tidak adanya watermark tidak membuktikan teks itu bukan buatan AI. Teks yang diedit berat, diparafrase, diterjemahkan, atau dicampur dengan tulisan lain bisa kehilangan tandanya. Teks yang sangat pendek juga sulit dideteksi, karena deteksinya adalah uji statistik yang butuh cukup banyak kata.

Jadi watermark ini adalah sinyal lunak, bukan bukti. Ia berguna untuk menelusuri asal-usul dalam skala besar — misalnya platform yang memeriksa banjir konten — tapi berbahaya kalau dipakai sebagai vonis atas satu orang. Dan sayangnya, vonis atas satu orang adalah tepatnya cara alat seperti ini paling sering disalahgunakan: di ruang kelas, di ruang redaksi, di proses rekrutmen.

## Celah yang justru diumumkan sendiri

Lalu ada detail yang membuatku mengangkat alis lebih tinggi lagi. Untuk dua dari empat model itu — Opus 4.6 dan Sonnet 4.6 — watermark hanya berlaku kalau tiga parameter sampling tetap di nilai default: temperature, top_p, dan top_k. Ubah salah satunya, sekecil apa pun, dan keluarannya tidak bertanda.

Anthropic menyatakannya secara terbuka di email pelanggan, lengkap dengan peringatan: kalau kamu mengandalkan watermark untuk kepatuhanmu sendiri, jaga parameter itu tetap default. Tidak ada keterangan serupa untuk Mythos 5 dan Opus 4.7, yang mengisyaratkan keduanya ditandai apa pun pengaturannya — tapi itu pun inferensi, bukan pernyataan resmi.

Aku menghargai keterbukaannya. Tapi mari kita jujur soal implikasinya: sebuah kewajiban penandaan yang bisa dilewati dengan mengubah satu angka di API bukanlah penegakan yang kuat. Ia adalah penandaan untuk pengguna yang patuh, dan pintu samping untuk yang tidak. Untuk tim kepatuhan, artinya satu hal praktis: periksa tumpukan produksimu sekarang, model mana yang kamu pakai, dan apakah ada integrasi yang mengubah tiga parameter itu dari default.

Kode pun kasus yang lebih lemah lagi. Token kode yang harus persis agar program berjalan umumnya tidak ditandai; yang lebih mungkin membawa tanda adalah komentar dan pesan commit di sekitarnya. Developer yang bertekad menghasilkan keluaran tanpa tanda nyaris tidak perlu berusaha keras.

## Kenapa ini terjadi, dan kenapa sekarang

Akarnya ada di Brussels. Pasal 50 EU AI Act mewajibkan penyedia sistem yang menghasilkan teks sintetis untuk menandainya dalam format yang bisa dibaca mesin. Kewajiban itu berlaku sejak 2 Agustus 2026, dan model-model yang sudah beredar sebelum tanggal itu mendapat masa transisi sampai 2 Desember 2026. Itulah tenggat yang sedang dikejar Anthropic sekarang — dan kenapa model-model lama disusul satu per satu.

Anthropic bukan satu-satunya. Dari 7 November nanti, xAI juga akan menandai teks dari Grok API secara default. Gelombang ini akan datang ke semua lab besar, dalam bentuk yang berbeda-beda. Pertanyaannya bukan lagi apakah tulisan AI akan ditandai, melainkan dengan aturan main seperti apa.

Dan di situlah menurutku artikel ini seharusnya berhenti sejenak dan menatap masalah yang sebenarnya.

## Yang seharusnya kita tuntut

Aku tidak menentang watermark. Dunia yang dibanjiri teks sintetis memang butuh cara menelusuri asal-usul. Tapi ada tiga hal yang menurutku wajib dituntut dari sistem mana pun yang mengklaim dirinya alat transparansi:

Pertama, **verifikasi harus bisa diakses publik**, atau setidaknya oleh pihak yang dituduh. Tanda yang hanya bisa dibaca oleh klub tertutup akan selalu lebih berguna sebagai alat kekuasaan daripada sebagai alat kebenaran.

Kedua, **hasilnya harus dijelaskan dengan jujur**: probabilitas, bukan vonis. "Claude mungkin memproses teks ini" adalah kalimat yang sangat berbeda dari "teks ini ditulis AI". Setiap alat yang menampilkan yang pertama seolah-olah yang kedua sedang berbohong dengan cara yang sopan.

Ketiga, **aturan mainnya harus sama untuk semua parameter**. Kalau satu angka di API bisa mematikan tanda, maka kepatuhan menjadi soal konfigurasi, bukan soal niat — dan audit konfigurasi itu harus jadi bagian dari ceritanya, bukan catatan kaki.

Sampai tiga hal itu terpenuhi, watermark Claude adalah kemajuan yang nyata sekaligus peringatan yang nyata. Ia membuat teks lebih mudah ditelusuri — dan membuat pembuktian lebih sulit dijangkau oleh orang yang paling membutuhkannya.

Tinta tak terlihat itu sudah ada di dalam kata-kata. Pertanyaannya tinggal: siapa yang boleh melihatnya, dan apa yang boleh mereka simpulkan darinya.

Sumber: liputan [Techweez](https://techweez.com/2026/11/02/anthropic-is-bringing-text-watermarking-to-more-claude-models/) dan [AI ParaBellum](https://aiparabellum.com/anthropic-claude-watermark-older-models-loophole/) soal email pelanggan 27 Oktober; penjelasan mekanisme dan batas deteksi dari dokumentasi bantuan Anthropic yang dirangkum [Developers Digest](https://www.developersdigest.tech/blog/anthropic-claude-text-watermarking-eu-code) dan [SSDNODES](https://www.ssdnodes.com/learn/claude-text-watermarking-explained).

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
