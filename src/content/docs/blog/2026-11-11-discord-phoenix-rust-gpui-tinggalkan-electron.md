---
title: "Discord Akhirnya Buang Electron — dan Saya Iri Melihat 290 MB Itu"
description: "Discord mengonfirmasi sedang membangun ulang aplikasi desktop dan mobile-nya dengan Rust dan GPUI, meninggalkan Electron dan React Native. Build awalnya, Discord Phoenix, cuma makan 290 MB RAM. Tapi angka itu baru satu screenshot — dan di situlah cerita menariknya dimulai."
date: 2026-11-11T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
lang: id
tags:
  - Rust
  - Discord
  - Open Source
cover:
  image: /assets-img/banner-discord-phoenix-rust-gpui-tinggalkan-electron.jpg
  alt: Banner informatif Discord Phoenix — 290,2 MB RAM, startup 1 detik, Rust sejak 2018
---

Discord itu aplikasi yang paling lama menyala di laptop saya, dan mungkin di laptop kamu juga. Dia buka terus, dari pagi sampai malam, nemenin kerja, nemenin main, nemenin rapat yang sebenarnya bisa jadi pesan teks. Dan setiap kali saya buka Task Manager, selalu ada momen yang sama: menatap angka RAM Discord, menghela napas, lalu menutup Task Manager lagi seolah masalahnya hilang.

Makanya waktu kabar ini muncul minggu lalu, saya langsung duduk tegak. Discord — Discord yang kita semua pakai itu — sedang dibangun ulang dari nol dengan Rust. Electron dibuang. React Native di mobile juga dibuang. Nama kodenya: Discord Phoenix.

## Yang dikonfirmasi, dan yang masih janji

Konfirmasinya datang langsung dari co-founder sekaligus CTO Discord, Stanislav Vishnevskiy, lewat posting di X pada 4 November 2026. Sehari setelahnya, akun resmi Discord ikut memposting video perbandingan: di kiri aplikasi yang kita pakai sehari-hari, di kanan versi barunya yang dibangun ulang dengan Rust. Bukan pengumuman resmi di blog, bukan siaran pers — cuma postingan di X dan video demo. Tapi buat perusahaan sebesar Discord, itu sudah cukup jadi berita.

Angka yang bikin semua orang heboh ada di screenshot Task Manager yang dibagikan Vishnevskiy: build awal Discord Phoenix memakai **290,2 MB RAM, sambil login ke dua akun sekaligus**. Sebagai pembanding, Windows Latest mengukur klien Electron yang sekarang di angka 1–2 GB bahkan saat idle. Discord sendiri, Desember 2025 lalu, sempat menguji fitur restart otomatis begitu pemakaian memori melewati 4 GB — sambil mencatat pemakaian normal "di bawah 1 GB". Jadi 290 MB itu, kalau bertahan sampai rilis, bukan perbaikan kecil. Itu potongan sekitar 70 persen.

Demo startup-nya juga tidak kalah mencolok. Di dua laptop Lenovo ThinkPad Windows 11, klien lama butuh sekitar 6 detik dari klik sampai tampil, sementara Phoenix muncul dalam waktu kira-kira 1 detik — dan karyawan Discord menegaskan keduanya diuji dari cold start, bukan dari system tray. PC Gamer yang memperkirakan angka 6 detik lawan 1 detik itu.

Tapi — dan ini penting — belum ada tanggal rilis. Vishnevskiy cuma bilang timnya berharap bisa mulai menguji ke pengguna "soon™", lengkap dengan trademark-nya itu. Yang kita lihat sejauh ini adalah satu build awal di satu mesin, bukan benchmark yang bisa diulang siapa pun.

## Bukan Tauri, tapi GPUI

Reaksi pertama kebanyakan orang waktu dengar "Rust" pasti: oh, Tauri. Vishnevskiy langsung menutup tebakan itu: *"It's not Tauri, it's GPUI."*

GPUI adalah framework UI Rust yang dibuat tim di balik editor kode Zed — framework yang menggambar antarmuka langsung lewat GPU, bukan membungkus halaman web. Bedanya dengan Tauri yang masih memakai webview sistem sebagai mesin UI, GPUI itu native sepenuhnya. Satu-satunya yang masih memakai webview di Phoenix adalah konten embed seperti video YouTube dan Activities. Discord juga bilang mereka sudah menambahkan patch sendiri di atas GPUI, dan akan mempertimbangkan membagikannya ke komunitas kalau relevan.

Di sisi mobile, React Native ikut dibuang. Ponsel tetap memakai UI native, tapi logika aplikasinya akan berbagi kode Rust yang sama dengan desktop. Satu basis kode, dua platform, tanpa browser di tengahnya.

## Ini bukan pertama kalinya Discord jatuh cinta pada Rust

Bagian yang bikin saya senyum: Discord sudah pakai Rust sejak 2018 — di infrastruktur, teknologi voice, bahkan sebagian klien yang sekarang. Vishnevskiy sendiri yang bilang, mewujudkan klien sepenuhnya di Rust itu *"the holy grail"* buat mereka.

Dan kalau kamu ingat, ini sudah pernah terjadi sebelumnya. Februari 2020, Discord menulis blog post legendaris "Why Discord is switching from Go to Rust" — soal layanan Read States yang mereka pindah dari Go ke Rust karena garbage collector Go memaksa full scan setiap 2 menit dan menimbulkan lonjakan latensi. Setelah pindah, lonjakannya hilang. Post itu sampai sekarang masih jadi salah satu cerita adopsi Rust yang paling sering dikutip di industri.

Jadi Phoenix ini bukan Discord yang ikut-ikutan tren Rust. Ini Discord yang akhirnya menyelesaikan pekerjaan yang mereka mulai delapan tahun lalu.

## Klaim vs bukti: 290 MB itu belum benchmark

Di sinilah saya menahan diri sedikit. Karena angka 290 MB itu, sejujurnya, adalah satu screenshot. Kita tidak tahu berapa server yang dimuat, berapa lama aplikasi sudah jalan, atau fitur apa saja yang sudah diaktifkan di build awal itu. Discord belum mempublikasikan perbandingan yang bisa diulang. Dan GPUI sendiri — menurut README proyeknya — masih pra-1.0, masih bisa berubah drastis.

Ada juga hal-hal yang belum terjawab. Electron itu dibenci, tapi dia memberi satu hal yang mahal: satu tim web bisa membangun untuk semua platform sekaligus. Discord sekarang harus memelihara UI native di desktop dan mobile, plus memastikan semua yang kita anggap remeh — voice, streaming, screen share, Activities, aksesibilitas — tetap jalan mulus di framework yang masih muda. Kecepatan startup dan RAM rendah itu pintu masuknya; yang menentukan apakah Phoenix berhasil adalah apakah dia tetap terasa seperti Discord setelah dipakai delapan jam sehari.

Tapi justru karena itu kabar ini layak diikuti, bukan cuma dirayakan. Kalau Discord berhasil, GPUI mendadak punya pengguna produksi terbesar yang pernah ada — dan itu mengubah peta framework UI Rust selamanya. Zed membuktikan GPUI bisa dipakai untuk editor kode; Discord akan membuktikan dia bisa dipakai untuk aplikasi yang dibuka ratusan juta orang setiap hari.

Kebetulan yang manis: Rust 1.100.0 dijadwalkan rilis stabil besok, 12 November. Discord mengumumkan Phoenix seminggu sebelumnya. Saya tidak bilang ada hubungannya. Tapi timing-nya enak sekali dibaca sebagai pertanda zaman.

## Jadi, siapa berikutnya?

Saya sudah lama berpendapat Electron itu pajak yang kita bayar diam-diam: setiap aplikasi chat, setiap editor, setiap tool produktivitas membawa salinan Chromium-nya sendiri, dan laptop kita yang menanggung. Discord membuktikan pajak itu tidak wajib. Kalau aplikasi sebesar Discord — dengan voice real-time, overlay game, dan ratusan juta pengguna — bisa pindah ke native, pertanyaan berikutnya bukan lagi "bisa atau tidak", tapi "siapa yang berani berikutnya".

Slack? VS Code? Atau aplikasi di laptop kamu yang paling rakus RAM-nya? Saya penasaran. Sementara itu, saya akan tetap membuka Discord Electron saya setiap pagi, menatap Task Manager, dan menunggu Phoenix datang. 290 MB itu terlalu menggoda untuk dilupakan.

Sumber: [laporan TalkEsport](https://www.talkesport.com/tech/discord-rust-client-phoenix-electron-ram/), [laporan HWBusters](https://hwbusters.com/news/discord-is-dropping-electron-for-a-rust-client-and-an-early-build-idles-at-290mb-of-ram/), [analisis Electron vs GPUI di DEV](http://dev.to/jamilxt/electron-vs-gpui-what-discords-290-mb-rust-rewrite-can-and-cannot-prove-34b6), dan [blog Discord 2020 soal Go ke Rust](https://ptb.discord.com/blog/why-discord-is-switching-from-go-to-rust).

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
