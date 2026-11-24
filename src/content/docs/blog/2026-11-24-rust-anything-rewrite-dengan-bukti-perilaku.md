---
title: "rust-anything: Menulis Ulang ke Rust dengan Bukti Perilaku"
description: "Sebuah tool open source baru membiarkan coding agent menulis ulang aplikasi ke Rust selangkah demi selangkah, sementara setiap langkahnya diperiksa terhadap rekaman perilaku aplikasi aslinya. Yang dijual bukan penerjemah kode, melainkan bukti bahwa hasil rewrite-nya sama."
date: 2026-11-24T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - Rust
  - Open Source
  - AI
  - Developer Tools
cover:
  image: /assets-img/banner-rust-anything-rewrite-dengan-bukti-perilaku.jpg
  alt: Banner informatif rust-anything — 8.820 bintang GitHub dalam delapan hari, Prettier 19 kali lebih cepat setelah di-port ke Rust, 17.224 kasus terekam cocok byte per byte
---

Delapan hari sejak repositorinya dibuat, [rust-anything](https://github.com/erkamyaman/rust-anything) sudah mengumpulkan 8.820 bintang di GitHub. Pembuatnya Erkam Yaman, developer asal Istanbul, dan lisensinya MIT. Angka bintangnya sendiri bukan hal yang paling menarik dari proyek ini. Idenya yang menarik: tool ini tidak menerjemahkan kode ke Rust. Ia merekam perilaku aplikasi aslinya, membiarkan coding agent menulis versi Rust-nya, lalu memeriksa setiap potong hasil porting terhadap rekaman itu sebelum potongan berikutnya dikerjakan.

Alur kerjanya empat langkah. Pertama, `record` menjalankan aplikasi asli dengan input buatan yang mencakup kasus tepi dan jebakan semantik, ditambah input dari pemakaian nyata, lalu menyimpan apa yang dikembalikan atau dilempar sebagai error. Kedua, `bridge` membuat crate Rust dan pembungkusnya, sehingga pemanggil tetap memakai API yang lama; kode Rust-nya ditulis manusia atau agen. Ketiga, `diff` memutar ulang semua kasus terekam ke versi Rust, dan tidak ada yang boleh meluncur sebelum semuanya cocok dan `gate` lolos. Keempat, kalau seluruh unit lolos tanpa fallback, `app lift` menjadikannya aplikasi Rust murni. Bahasa yang didukung: TypeScript/JavaScript, Python, C, Go, Ruby, dan Java/Kotlin, dengan jembatan napi-rs, PyO3, dan wasm-bindgen. Tool ini juga mendaftarkan dirinya sebagai MCP server ke Claude Code, Codex, Cursor, Gemini CLI, dan OpenCode, jadi agenlah yang menjalankan sebagian besar prosesnya.

Hasil yang dilaporkan di README-nya cukup besar untuk ukuran proyek berumur seminggu. Prettier 3.6.2 memformat 2.360 berkas JavaScript/TypeScript dari command line dalam 128,6 detik; versi Rust-nya 6,9 detik, sekitar 19 kali lebih cepat. Dari 17.224 run terekam milik Prettier, 15.861 sudah berjalan sepenuhnya di Rust dan sisanya jatuh kembali ke Prettier asli — dan ke-17.224-nya cocok byte per byte. Pencarian Fuse.js atas 50.000 string turun dari 91,2 ms menjadi 2,8 ms per query. json-server, server Node utuh, diangkat menjadi satu biner Rust: memori saat idle turun dari 74 MB ke 3,5 MB, dan 514 dari 514 kasus HTTP terekamnya cocok. Metodologi pengukurannya ditulis terbuka: semua angka di Apple M4, dua kali jalan, dan output selalu dibandingkan dulu sebelum waktu diukur. Itu detail yang membuat angka-angkanya lebih gampang dipercaya daripada klaim benchmark pada umumnya, walaupun tetap perlu dicatat bahwa ini pengukuran penulisnya sendiri di satu mesin, dan sejauh ini belum ada replikasi independen.

Justru bagian paling meyakinkan dari README ini adalah pengakuan batasnya. Penulisnya menulis sendiri bahwa memanggil Rust sekali per fungsi kecil biasanya lebih lambat daripada JIT, jadi tool-nya mencari loop yang layak dipindah, bukan memindah semuanya. Port libavutil milik ffmpeg ke Rust cocok di semua 226.447 panggilan terekam, tetapi kecepatannya hanya setara C: dari 42 benchmark, 18 imbang, 8 lebih cepat, 16 lebih lambat 3 sampai 40 persen. Untuk C, keuntungan yang ditawarkan adalah keamanan memori, bukan kecepatan. Ada juga halaman khusus berjudul "What it can't catch": pembuktiannya hanya sekuat cakupan rekamannya. Kasus yang tidak pernah terekam tidak bisa diperiksa. Dan karena `record` menjalankan kode asli berkali-kali, dokumentasinya memperingatkan untuk menjalankannya di salinan proyek dengan database uji, tanpa kredensial production di environment.

Kenapa pendekatan ini terasa pas buatku: pekerjaan harianku memang mengawasi agen menulis dan mengubah kode, dan pelajaran yang paling sering kupetik adalah laporan "selesai" dari agen tidak pernah cukup — hasilnya harus diperiksa terhadap sumber kebenaran yang independen dari agen itu sendiri. rust-anything pada dasarnya membakukan pelajaran itu menjadi tool. Agen boleh menulis secepat apa pun; yang memutuskan sebuah potong kode layak meluncur adalah rekaman perilaku, bukan keyakinan agen. Jembatan Python-nya memakai PyO3, tumpukan yang memang sedang kupelajari untuk mengikat Python ke Rust dan C++, jadi mekanismenya terasa dekat dengan hal yang sedang kutekuni.

Aku belum menjalankan tool ini sama sekali, jadi belum ada pengalaman pribadi yang bisa kuceritakan soal memakainya. Yang bisa dinilai hari ini adalah desain dan bukti yang dipublikasikan pembuatnya, dan keduanya di atas rata-rata proyek viral biasanya. Kalau nanti kucoba, sasaran pertamaku adalah fungsi Python kecil yang memang berat di salah satu toolingku sendiri — kasus yang rekamannya bisa kubuat lengkap, karena di situlah pembuktian model begini paling kuat sekaligus paling jujur soal batasnya.

*Ditulis oleh **Lutfi Ikbal Majid**, dengan bantuan riset dan penyuntingan dari **Bewustein (Muse)**.*

Sumber: README dan halaman repositori [erkamyaman/rust-anything](https://github.com/erkamyaman/rust-anything) di GitHub (dibaca 24 November 2026) untuk cara kerja, angka benchmark beserta metodologinya, dan batasan yang diakui proyek; liputan [Sulat News](https://news.sulat.com/2026/11/18/rust-anything/) untuk konteks rilis dan riwayat versinya.
