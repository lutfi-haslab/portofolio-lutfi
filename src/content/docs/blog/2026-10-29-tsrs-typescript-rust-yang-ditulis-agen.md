---
title: "tsrs: Compiler TypeScript yang Ditulis Agen, Bukan Manusia — dan Kenapa Itu Bukan Lelucon"
description: "Cloudflare dan VoidZero membawa tsrs, port Rust dari compiler TypeScript, ke Oxc. Angka awalnya menggoda, cerita di baliknya lebih menarik: seorang engineer yang mengaku tidak menulis satu baris kode pun."
date: 2026-10-29T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - TypeScript
  - Rust
  - Open Source
cover:
  image: /assets-img/banner-tsrs-typescript-rust-yang-ditulis-agen.jpg
  alt: Ilustrasi lengan mekanik berwarna karat yang merakit roda gigi hijau zamrud di atas meja kerja gelap, metafora compiler TypeScript yang di-port ke Rust
---

Ada momen tertentu saat membaca pengumuman teknis ketika saya berhenti sejenak, bukan karena angkanya, tapi karena kalimatnya. Minggu lalu momen itu datang dari sebuah proyek bernama tsrs.

Pada 20 Oktober, Cloudflare dan VoidZero mengumumkan bahwa mereka kini mengerjakan tsrs bersama Max Schwenk dari Owner.com: port compiler TypeScript ke Rust, yang diinkubasi di toolchain Oxc dan dikerjakan dalam kolaborasi erat dengan tim TypeScript. Klaim awalnya: hingga 8 kali lebih cepat dan memori sekitar 70% lebih sedikit dibanding TypeScript 7.0, dengan jumlah worker type-check yang sama.

Tapi menurutku, angka itu bukan bagian paling menariknya. Yang paling menarik adalah siapa yang menulis port ini.

## "I wrote zero code"

Schwenk bercerita terus terang di blog engineering Owner. Monolit backend mereka, Olympus, terdiri dari sekitar 37.000 file TypeScript yang di-typecheck sebagai satu program. Dengan TypeScript 7.0, satu kali check single-threaded membutuhkan 19 GiB memori dan 80 detik. Tambahkan linter yang membawa checker-nya sendiri, language server, dan dev server, dan totalnya bisa melewati 50 GiB untuk sesuatu yang, di atas kertas, cuma validasi dasar. Di MacBook 36 GiB saja, menjalankan beberapa agen coding paralel sudah berisiko membuat mesin terkunci. Solusi sementaranya sudah dicoba semua — sandbox cloud, agen yang diminta bergantian, tsconfig yang dipecah — dan semuanya terasa seperti plester, bukan perbaikan.

Lalu ia mencoba sesuatu yang terdengar seperti ide yang akan saya tertawakan kalau diceritakan di warung kopi: menyuruh Claude Opus 5.5 mem-port compiler Go itu ke Rust. Dan ia menulis kalimat ini tanpa malu-malu:

> "I wrote zero code. Not 'barely any'. Zero." — [Max Schwenk, Building @Owner](https://building.owner.com/tsrs)

Saya tidak membaca kalimat itu sebagai pamer, melainkan sebagai pengakuan tentang di mana pekerjaan sebenarnya berpindah. Agen-agen itu bekerja paralel, lebih dari 20 subagent, semalaman. Bangun pagi, ia menemukan typechecker yang sudah jalan: pada run pertama, 78% error baseline TypeScript cocok byte-for-byte, dan setelah type printer ditambahkan, kecocokannya menjadi 99,97%, semua kecuali empat dari 13.462 baseline.

Buatku, dari dulu ukurannya sederhana: compiler yang cepat tapi diam-diam melewatkan error bukanlah compiler, melainkan generator rasa aman palsu. Schwenk tampaknya memikirkan hal yang sama. Sebagian besar pengujian tsrs dibangun justru untuk menangkap kegagalan itu: conformance suite TypeScript sendiri, injeksi error ke proyek nyata, 200.000 input termutasi ke parser setiap malam, dan mode bayangan yang menghitung ulang jawaban lambat di samping jawaban hasil cache.

Ada satu kalimatnya yang paling saya suka, karena ini persis masalah yang hanya kelihatan kalau Anda pernah debugging sesuatu yang tidak bisa direproduksi:

> "A compiler whose errors depend on thread scheduling is a random number generator with opinions." — [Max Schwenk, Building @Owner](https://building.owner.com/tsrs)

Maka tsrs punya determinism gate: single-threaded, scheduling default, dan assignment acak semuanya harus menghasilkan output identik.

## Kenapa Rust, kalau Go sudah 10 kali lebih cepat?

Pertanyaan yang wajar. Cloudflare sendiri yang mengingatkan: port TypeScript dari JavaScript ke Go sudah membuatnya sekitar 10 kali lebih cepat dan jauh lebih hemat memori dibanding versi sebelumnya. Jadi kenapa repot-repot mem-port lagi?

Jawabannya, menurut [pengumuman Cloudflare](https://blog.cloudflare.com/typescript-rust-port/), bukan semata-mata soal kecepatan. Ini soal WebAssembly: program Go yang dikompilasi ke Wasm harus membawa garbage collector Go bersamanya, sementara model memori Rust memungkinkan interaksi yang lebih sederhana antara guest dan host Wasm. Di lingkungan sempit — sandbox Workers, browser, perangkat embedded — selisih itu penentu apakah satu toolchain utuh bisa jalan di sana atau tidak.

Ada juga alasan kedua yang lebih dekat dengan keseharian saya: agen. Ketika agen coding bekerja, ia hidup di dalam loop edit, type-check, lint, test, lalu ulang lagi. Kalau setiap putaran check memakan puluhan GiB dan puluhan detik, agen itu tidak produktif, ia antre. Di Owner, setelah tsrs dipakai di seluruh monorepo, typecheck dilaporkan menjadi tujuh detik di CI dan sekitar dua belas detik di MacBook. Memori yang turun mengubah cara kerja, bukan cuma angka di dashboard CI.

Dan satu hal yang perlu ditegaskan, karena Cloudflare menekankannya sendiri: ini bukan fork. Tim TypeScript tetap memegang kendali penuh atas desain dan arah bahasa, dan port Rust harus mengikuti keputusan mereka dengan ketat atau menjadi tidak kompatibel. Itu kontrak yang berat, dan justru karena itu rencana pemeliharaannya menarik: tsrs akan digabung dengan tsc-rs milik Theo Browne, dan proses yang dipakai untuk menjaga Vinext tetap sinkron dengan Next.js akan diterapkan di sini — setiap pagi agen meninjau diff upstream, setiap malam matriks kompatibilitas diregenerasi dari test suite TypeScript.

## Tapi jangan telan angka 8x mentah-mentah

Di sinilah saya menahan diri untuk tidak ikut bersorak. "Hingga 8x" adalah plafon, bukan janji. Cloudflare sendiri mengakui TypeScript 7.1 beta sudah hingga 2,5 kali lebih cepat dari 7.0, sebagian karena optimasi yang di-upstream dari tsrs.

Pengukuran independen pertama yang saya baca justru membuat cerita ini lebih bisa dipercaya, bukan kurang. Frank Chu menguji tsrs 0.18.0 melawan TypeScript 7.0.2 pada proyek sintetis 400 file, 35.199 baris, dan mendapatkan median 5,3 kali lebih cepat dengan memori 72% lebih rendah — klaim memorinya nyaris tepat, klaim kecepatannya nyata tapi tidak mencapai 8x di mesin 2 vCPU itu. Diagnostiknya identik, output JavaScript-nya byte-identical, dan ada satu perbedaan kecil yang persis jenisnya akan merusak skrip CI pada jam dua pagi: saat ada type error, `tsc` keluar dengan kode 1, tsrs dengan kode 2. Skrip yang mengecek `$? -eq 1` akan mengira check yang gagal itu sukses.

Itu bukan skandal, ini rilis eksperimental. Tapi itu pengingat yang bagus: kesetiaan pada compiler tidak hanya soal error yang dicetak, tapi juga soal kontrak kecil yang diam-diam diandalkan tooling di sekitarnya. Cloudflare pun mengakui masih ada perbedaan, misalnya urutan pencetakan diagnostik, yang ditargetkan dikecilkan sebelum rilis stabil melawan TypeScript 7.1.

## Yang saya bawa pulang dari cerita ini

Saya belum sempat menjalankan tsrs di repo portofolio saya sendiri, dan saya tidak akan berpura-pura sudah. Rencana saya sederhana dan membosankan, seperti seharusnya: pasang berdampingan, bukan menggantikan. Jalankan dengan `--noEmit`, bandingkan diagnostiknya dengan `tsc` yang sudah ada, ukur waktu dan memori di proyek saya sendiri, dan baru bicara soal pindah kalau hasilnya konsisten:

```bash
pnpm add -D tsrs
pnpm exec tsrs --noEmit
```

Tapi pelajaran yang lebih besar bukan soal perintah itu. Selama bertahun-tahun, mem-port compiler adalah proyek yang butuh tim khusus dan waktu berbulan-bulan. Sekarang, model frontier bisa melakukannya hampir sendiri dalam hitungan hari — dan itu mengubah pertanyaan yang penting. Bukan lagi "bisakah kita menulis ulang ini?", melainkan "bisakah kita membuktikan yang baru ini tetap bahasa yang sama, besok, dan tahun depan?"

Jawaban tsrs sejauh ini bukan sekadar kecepatan, melainkan proses: test suite sebagai spesifikasi, determinism sebagai gerbang, dan optimasi yang dikembalikan ke upstream supaya semua orang menang. Kalau proses itu bertahan, tsrs akan menjadi toolchain yang serius. Kalau melorot, ia akan menjadi fork dengan benchmark yang bagus.

Untuk sekarang, saya akan mengujinya sendiri. Compiler yang ditulis agen tetap harus lulus ujian yang sama dengan compiler yang ditulis manusia: di repo saya, dengan error saya, pada mesin saya.

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
