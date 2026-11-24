---
title: "Agentic Development: Model Saja Tidak Cukup"
description: "Agentic development mengubah cara kita membangun software: model saja tidak cukup — yang ikut menentukan adalah long horizon, harness, dan tools. Ini penjelasan tiga istilah itu dari kacamata orang yang hidup dengan agen setiap hari."
date: 2026-11-23T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - AI
  - Agentic Development
  - Developer Tools
cover:
  image: /assets-img/banner-agentic-development-long-horizon-harness-tools.jpg
  alt: Banner informatif agentic development — horizon terpanjang agen 27 jam kerja manusia pada subset tugas terverifikasi METR, dan tesis artikel bahwa model saja tidak cukup tanpa harness yang baik
---

Setiap pagi, ada artikel baru terbit di situs ini dan ada pelajaran baru muncul di situs belajarku. Bukan karena aku begadang. Ada agen yang bekerja semalaman mengikuti jadwal: meneliti topik, menulis, membangun, men-deploy, lalu melaporkan hasilnya kepadaku pagi harinya. Kadang hasilnya mulus. Kadang ada yang gagal di tengah jalan dan aku yang harus memeriksa apa yang sebenarnya terjadi.

Pengalaman setahun terakhir itu mengubah cara pandangku soal membangun software. Istilah kerennya sekarang adalah agentic development: kita tidak lagi menulis semua kode sendiri baris demi baris, melainkan memberi tugas ke agen — sistem AI yang bisa merencanakan, bertindak, membaca hasil tindakannya, lalu memperbaiki diri sampai tugasnya selesai. Dan dari pengalamanku, yang menentukan agen itu berguna atau menyebalkan ternyata bukan cuma modelnya. Ada tiga kata yang jauh lebih menentukan: long horizon, harness, dan tools.

## Long horizon: seberapa panjang tugas yang bisa dipercaya ke agen

Pertanyaan paling jujur soal agen adalah sepanjang apa tugas yang bisa kuserahkan tanpa harus mengawasi terus-menerus. Di situlah konsep long horizon masuk.

Lembaga riset METR memberi konsep ini ukuran yang konkret. Mereka mengukur horizon sebuah model sebagai durasi tugas — dihitung dari waktu yang dibutuhkan manusia untuk mengerjakannya — yang bisa diselesaikan agen dengan peluang berhasil 50 persen. Temuan mereka yang terkenal dari riset 2025: horizon ini berlipat ganda kira-kira setiap tujuh bulan sejak 2019. Dalam pembaruan terbarunya, [METR Time Horizon 2](https://casrai.org/news/metr-th2-ai-time-horizons-research-judgment-evaluation-2026) yang terbit 20 November lalu, mereka menemukan bahwa time horizon pada gabungan evaluasi TH1.1 dan TH2 meningkat dua kali lipat kira-kira setiap 110 hari. Pada subset TH2 yang tugasnya bisa diverifikasi secara otomatis, lajunya bahkan sekitar 1,65 bulan, dan horizon terpanjang yang tercatat pada subset itu mencapai 27 jam kerja manusia. Namun METR sendiri mengingatkan bahwa hasil subset ini masih punya ketidakpastian.

Perlu dicatat juga: 27 jam di sini bukan berarti agen mampu berjalan selama 27 jam tanpa berhenti. Angka itu adalah estimasi waktu kerja manusia untuk menyelesaikan tugas yang berhasil ditangani agen. Agennya sendiri bisa menyelesaikannya lebih cepat, lebih lambat, atau gagal di tengah jalan.

Tapi menurutku angka itu harus dibaca dengan satu catatan kaki besar, dan METR sendiri yang menulisnya. Horizon 50 persen bukan horizon yang bisa dipakai bekerja. Claude 3.7 Sonnet, misalnya — dari evaluasi METR tahun 2025 — punya horizon sekitar 55–59 menit pada ambang keberhasilan 50 persen, tapi cuma sekitar 15 menit pada ambang 80 persen. Jauh lebih pendek, dan rasio seperti itu tidak berlaku sama untuk semua model. Dan di tugas yang menuntut penilaian riset terbuka, bukan sekadar lulus uji otomatis, performa model-model terdepan jatuh cukup jauh menurut evaluasi yang sama.

Buatku, dari dulu ukurannya sederhana: horizon yang penting bukan yang tertulis di laporan benchmark, tapi yang terasa di pekerjaan nyata. Agen yang bisa kupercaya mengerjakan tugas dua jam tanpa kusentuh itu mengubah cara kubagi waktu. Agen yang cuma andal untuk tugas 15 menit tetap berguna, tapi posisinya beda: dia asisten cepat, bukan pekerja yang bisa kutinggal.

## Harness: semua yang mengelilingi model

Kalau model adalah mesinnya, harness adalah seluruh mobilnya. Ada rumusan yang menurutku paling jujur soal ini, dari Vivek Trivedy di LangChain: agent = model + harness. Kalau kamu bukan modelnya, berarti kamu adalah harness-nya.

Harness adalah semua yang mengelilingi model dan membuatnya bisa bekerja: instruksi dan file aturan seperti AGENTS.md, daftar tools yang boleh dipakai, cara konteks dikelola saat percakapan makin panjang, subagen yang bisa dipanggil untuk tugas sampingan, sandbox tempat kode dijalankan, sampai gerbang persetujuan yang menahan tindakan berisiko sampai manusia bilang ya. Claude Code, Cursor, Codex — itu semua pada dasarnya harness. Model di dalamnya bisa sama, tapi pengalaman memakainya bisa jauh berbeda, dan perbedaan itu datang dari harness-nya.

Aku merasakan ini setiap hari, karena asistenku sendiri hidup di dalam harness yang kubangun sedikit demi sedikit: file memori yang membuatnya ingat keputusanku, jadwal otomatis yang membuatnya bekerja tanpa disuruh, dan aturan bahwa tindakan tertentu — mempublikasikan sesuatu, misalnya — tidak boleh jalan tanpa persetujuanku atas teks persisnya. Setiap kali agenku berbuat salah, yang kuperbaiki hampir tidak pernah "modelnya". Yang kuperbaiki adalah harness-nya: aturan yang kurang jelas, konteks yang hilang, atau gerbang yang belum ada.

Contoh nyatanya pernah kualami beberapa kali. Suatu kali, alat yang kupakai untuk mengarsipkan artikel ke GitHub melaporkan prosesnya selesai tanpa error — padahal berkasnya tidak pernah sampai ke repositori. Aku baru mengetahuinya setelah memeriksa isi repositori secara langsung. Di kesempatan lain, deployment situs ini melaporkan sukses dan halamannya membalas HTTP 200, padahal di situs ini status 200 juga diberikan untuk halaman yang tidak ada, dengan isi halaman depan. Dua-duanya bukan masalah model. Modelnya tidak berubah; yang berubah adalah harness-nya. Sekarang setiap pengarsipan wajib diverifikasi dengan membaca balik isi repositori, dan setiap deployment wajib diperiksa judul serta isi halamannya, bukan cuma kode statusnya. Kesalahan yang sama tidak terulang sejak aturan itu ada. Di situlah harness engineering sebenarnya terjadi: bukan menulis file aturan yang panjang, melainkan membangun mekanisme supaya kesalahan yang sama tidak terus berulang.

Menariknya, ini bukan cuma pengalamanku. Sebuah [studi empiris soal desain harness untuk coding agent](https://arxiv.org/html/2609.20804v1) membedah harness menjadi tiga komponen — perencanaan, ruang aksi, dan manajemen konteks — lalu mengujinya satu per satu. Temuannya: manajemen konteks menjadi sangat berharga justru saat jendela konteks sempit, karena sebagian besar manfaatnya adalah mencegah kegagalan akibat konteks meluap. Perencanaan membantu model yang lebih lemah menyelesaikan tugas, sementara pada model yang kuat efeknya bergeser menjadi penghemat biaya. Jadi harness bukan hiasan. Ia variabel yang terukur. Dengan satu catatan: studi itu menguji harness untuk coding agent dalam lingkungan eksperimen tertentu, jadi pola besarnya masuk akal untuk sistem agen lain, tapi bukan hukum universal.

## Tools: tangan yang menentukan seberapa halus agen bekerja

Komponen terakhir adalah tools, dan ini yang paling sering diremehkan. Model hanya bisa bertindak lewat tools yang diberikan harness kepadanya: membaca dan menulis file, menjalankan perintah shell, membuka browser, memanggil API. Ruang aksi ini menentukan seberapa halus pekerjaannya. Agen yang cuma punya tombol "tulis ulang seluruh file" akan bekerja sangat berbeda dari agen yang bisa mengedit sebaris, menjalankan satu tes, dan membaca error-nya.

Studi harness yang sama menemukan sesuatu yang agak melawan intuisi: model yang sudah mahir memakai shell ternyata bisa bekerja efektif — dan jauh lebih murah — hanya dengan akses bash, tanpa perlu tools terstruktur yang rumit. Sebaliknya, model yang kemampuan shell-nya lemah terbantu besar oleh tools yang sudah terdefinisi rapi. Jadi tidak ada resep tunggal. Tools yang tepat tergantung modelnya, dan itu keputusan engineering, bukan selera.

Satu pola yang menurutku paling awet dari semua ini: filesystem dan git adalah fondasi state yang paling bisa diandalkan. Agen yang bekerja di atas file dan riwayat versi punya tempat untuk menyimpan kemajuan, kembali ke titik aman saat salah langkah, dan menyerahkan hasil yang bisa diperiksa manusia. Long horizon tanpa state yang tahan lama itu ilusi — agen akan lupa, mengulang, atau tersesat di tengah jalan.

Tiga hal ini sebenarnya punya peran yang berbeda. Tools memberi agen kemampuan bertindak. Filesystem menyimpan state dan artefak pekerjaannya. Git melacak perubahan dan menyediakan jalan pulang saat ada yang salah. Ketiganya saling melengkapi, tapi filesystem saja bukan memori yang otomatis awet: berkas bisa terhapus, rusak, atau tidak pernah dibaca lagi oleh agen di sesi berikutnya. Harness tetap harus mengatur bagaimana state disimpan, dipulihkan, dan dimasukkan kembali ke konteks. Kalau tidak, "memori" agen cuma tumpukan berkas yang tidak ada yang membuka.

## Harness bukan pengganti model

Satu hal yang perlu diluruskan: harness yang bagus tidak membuat model lemah otomatis setara model frontier. Model tetap menentukan kemampuan dasarnya — memahami instruksi, menalar, mengambil keputusan. Harness menyediakan lingkungan, state, tools, umpan balik, dan batasan supaya kemampuan itu benar-benar terpakai. Model bagus dengan harness buruk berarti potensinya terbuang; model biasa dengan harness bagus bisa bekerja jauh lebih konsisten. Dan harness pun bisa berbalik merugikan: instruksi yang terlalu banyak, tools yang tumpang tindih, konteks yang disuntikkan berlebihan, atau gerbang persetujuan di tempat yang salah justru menghambat agen. Hubungannya dua arah, dan keduanya harus direkayasa.

## Jadi, pekerjaan engineer bergeser ke mana

Kalau ditarik benang merahnya, agentic development bukan cerita tentang mengganti programmer dengan model yang lebih pintar. Ini cerita tentang pekerjaan yang bergeser satu lapis ke atas: dari menulis kode menjadi merancang sistem tempat agen bekerja — horizon tugas yang realistis, harness yang ketat tapi tidak mencekik, dan tools yang pas untuk modelnya.

Model akan terus berganti, dan horizon akan terus memanjang. Tapi harness yang kubangun hari ini — aturan, memori, gerbang persetujuan, cara memverifikasi hasil — tetap berlaku untuk model apa pun yang kupakai besok. Buatku itu investasi yang lebih tahan lama daripada mengejar model terbaru setiap bulan.

*Ditulis oleh **Lutfi Ikbal Majid**, dengan bantuan riset dan penyuntingan dari **Bewustein (Muse)**.*
