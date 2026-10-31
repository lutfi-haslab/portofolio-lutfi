---
title: "Python Mau Kemasukan Rust: Bukan Rewrite, Tapi Pintu Kecil Bernama zlib"
description: "Tim Rust for CPython mengusulkan Rust masuk ke interpreter Python secara bertahap, mulai dari modul zlib yang opsional di Python 3.16. Bukan rewrite sejuta baris C — dan justru di situlah letak kecerdasannya."
date: 2026-10-31T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - Python
  - Rust
  - Open Source
cover:
  image: /assets-img/banner-rust-masuk-cpython-python-316.jpg
  alt: Ilustrasi seekor ular hijau melilit gir oranye berkarat di atas meja gelap beraksen hijau zamrud, dengan kepiting kecil di sampingnya — metafora Python yang mulai merangkul Rust
---

Ada pertanyaan yang belakangan ini sering mampir ke kepala saya, biasanya tepat setelah saya menutup laptop: kalau saya sedang belajar mengikat Python dan Rust lewat PyO3, seberapa jauh sebenarnya kedua bahasa ini bisa akur? Ternyata jawabannya sedang ditulis — bukan di blog opini, tapi di meja para core developer Python sendiri.

Ceritanya begini. Di Python Language Summit 2026, yang digelar 14 Juli di Kraków bersamaan dengan EuroPython, David Hewitt — salah satu maintainer PyO3 — kembali berdiri di depan 47 core developer dan tamu undangan. Setahun sebelumnya, di PyCon US 2025, ia baru sebatas "mengetes air": apakah core developer Python mau Rust masuk ke CPython? Jawaban yang ia bawa pulang kali ini, dikutip dari laporan resmi Python Insider, cukup menggelitik: "No one said 'don't do this' last year."

Tidak ada yang bilang jangan. Tapi juga belum ada yang bilang ya, silakan, gas. Dan di situlah cerita ini jadi menarik.

## Kenapa Rust, kenapa sekarang

Alasan tim ini bukan romantisme soal bahasa baru. Hewitt menunjukkan grafik yang agak tidak nyaman: issue CPython berlabel `type-crash` naik dari 82 pada 2021 menjadi 222 pada 2025, dengan proyeksi sekitar 353 untuk 2026. Ia sendiri mengakui, taruhan teknis besar belakangan ini — parser baru, JIT, free-threading — mungkin ikut menyumbang angka itu. Makin ambisius mesinnya, makin banyak sudut tempat C bisa salah pegang memori.

Di sinilah pengalaman Android dikutip: Jeff Vander Stoep menggambarkan Rust di Android sebagai "move fast and fix things", dengan patch berukuran sama yang butuh revisi lebih sedikit sejak Rust diadopsi. Janji yang masuk akal: bukan "Rust bebas bug", tapi kelas bug tertentu — yang paling sering bikin crash dan celah keamanan — jadi jauh lebih sulit ditulis tanpa sengaja.

Padahal Python dan Rust sudah lama akur di luar rumah: ekosistem paket penuh ekstensi Rust lewat PyO3 dan Maturin. Yang belum pernah terjadi adalah Rust masuk ke rumahnya sendiri — CPython, interpreter referensi berkode sekitar satu juta baris C. Satu juta baris itu mematikan satu godaan: rewrite total. Strateginya bukan rewrite, melainkan infiltrasi yang sopan.

## Pintu kecil bernama zlib

Modul pertama yang dipilih adalah `zlib`, modul kompresi di standard library. Alasannya sengaja sederhana: tim ini "wanted to achieve a significant improvement" dengan "small scope". Implementasi Rust-nya akan memakai `zlib-rs`, pustaka yang menurut tim "heavily tested and used by the Firefox, uv, and Cargo" dan "faster than zlib and zlib-ng on many platforms".

Ada dua alasan kenapa pilihan ini cerdas. Pertama, dampaknya massal: algoritma kompresi ini "widely used by Python packaging", sehingga — kalau proposal ini diterima — (hampir) setiap `pip install` di Python 3.16 akan ikut lebih cepat. Modul kecil, efeknya massal. Kedua, zlib memaksa tim menyelesaikan satu masalah build yang selama ini ditunda: memakai satu paket eksternal dari Cargo. Kalau fondasi itu tidak dibereskan di modul kecil, ia akan jadi bom waktu di modul besar.

Rencana tahapannya: akhir 2026, PEP yang mendefinisikan kriteria sukses. Python 3.16 (Oktober 2027): backend Rust opsional untuk zlib plus API Rust internal yang masih privat, dengan kode C lama tetap sebagai fallback. Python 3.17 (Oktober 2028): platform dibereskan, Rust merambah ke `io`, `json`, `xml`, `memoryview`, dan parser. Baru pada Python 3.18 (2029 atau sesudahnya) Rust menjadi syarat build dan API publiknya diterbitkan — itu pun tanggal paling awal, bukan janji.

Di tengah-tengah rencana itu ada satu kalimat Hewitt yang menurutku paling jujur di seluruh laporan: "it would be disingenuous to say that Rust would be optional forever." Rust memang masuk lewat pintu opsional, tapi pintu itu tidak dirancang untuk tetap opsional selamanya. Kejujuran seperti ini — mengatakan tujuan akhirnya di depan, bukan setelah semua orang terlanjur nyaman — adalah hal yang membuat saya percaya pada sebuah proposal teknis.

## Yang bikin core developer mengernyit

Tentu tidak semua orang di ruangan itu langsung mengangguk. Dan keberatan-keberatannya, buatku, justru bagian paling sehat dari cerita ini.

Larry Hastings bilang terus terang ia "wasn't super excited to learn Rust to work on CPython" — keberatan yang sangat manusiawi dari core developer yang sudah puluhan tahun berpikir dalam C. Jawaban Hewitt menenangkan sekaligus tidak menghindar: "CPython should not be written in Rust for the sake of Rust", dan "CPython will be a dual-language project for a meaningful amount of time". Tapi ya, pada akhirnya, opsional selamanya adalah kebohongan.

Thomas Wouters, menanggapi desain API Rust yang baru, menyarankan agar tim tidak "making compromises for the dinosaurs" — termasuk dirinya sendiri di kelompok itu — dan malah mendesain dari prinsip pertama. Hewitt setuju setengah: ada tempat untuk "lean into Rust", seperti resource yang otomatis dibersihkan saat keluar dari scope, tapi ada juga desain idiomatik Rust yang "won't be the best fit".

Keberatan paling tajam datang dari Pablo Galindo Salgado, soal dependensi Cargo. Mengambil dependensi dari Cargo, katanya, adalah "huge problem" dan potensi "showstopper": CPython mem-vendor dependensinya dengan sangat selektif, dan setiap kali ada kerentanan di salah satu dependensi itu, release manager harus menerbitkan rilis baru — "tiresome". Jawaban tim: pilih sesedikit mungkin dependensi eksternal — "zlib-rs is only one dependency" — dan vendor sumber Rust-nya sedemikian rupa sehingga membangun CPython tidak akan membutuhkan Cargo, dengan sumber yang tinggal di repositori `cpython-source-deps` yang terpisah, bukan di dalam tree CPython.

Kriteria suksesnya dirumuskan dengan gaya yang sama hati-hatinya: mayoritas core developer aktif harus *open* — bukan *familiar*, bukan *mahir*, cuma terbuka — terhadap API Rust; tidak boleh ada perlambatan berarti di benchmark; semua platform bertingkat harus didukung Rust; dan pengalaman distributor membangun CPython harus terasa manageable. Tim ini tahu bedanya antara persetujuan dan antusiasme, dan mereka memilih ambang yang jujur.

## Kenapa ini relevan buat saya — dan mungkin buat kamu

Buatku, kabar ini mendarat di tempat yang sangat pribadi. Jalur belajar saya belakangan ini memang Python plus Rust plus binding di antaranya, dengan asumsi itu keterampilan pinggiran: berguna untuk mempercepat satu fungsi, satu ekstensi, satu proyek. Kalau proposal ini berjalan, keterampilan itu berhenti jadi pinggiran. Ia menjadi cara kerja di dalam interpreter yang dipakai hampir semua orang.

Dan ada satu detail waktu yang membuat cerita ini terasa sedang berlangsung, bukan arsip: pada 14 Oktober lalu, Emma Smith — salah satu penulis draf PEP — menulis di forum Python bahwa draf desain API Rust sudah dibuka untuk review, dengan harapan konsensus tercapai pada awal November agar PEP-nya bisa diajukan Desember atau awal Januari, jauh sebelum batas beta Python 3.16 pada Mei 2027. Awal November itu ya sekarang.

Saya tidak akan berpura-pura ini sudah pasti terjadi. Summit adalah tempat diskusi, bukan tempat keputusan; setiap perubahan tetap butuh PEP. Yang sudah pasti hanyalah arahnya: Python tidak lagi bertanya apakah Rust boleh masuk, melainkan bagaimana caranya masuk tanpa merusak rumah yang sudah berdiri tiga dekade. Dan cara yang dipilih — satu modul kecil, satu dependensi, satu kriteria sukses yang jujur — adalah cara yang paling saya hormati dari sebuah proyek sebesar ini.

Kalau kamu selama ini menunda belajar Rust dengan alasan "Python saya sudah cukup", mungkin ini saat yang tepat untuk mulai mengintip. Bukan karena Python akan berubah besok pagi. Tapi karena, untuk pertama kalinya, masa depan Python itu sendiri ditulis — sedikit demi sedikit — dalam Rust.

Sumber utama: laporan resmi Python Insider, [Rust for CPython (Python Language Summit 2026)](https://blog.python.org/2026/09/language-summit-2026-rust-for-cpython/), dan pembaruan 14 Oktober dari Emma Smith di forum [Discussions on Python.org](https://discuss.python.org/t/rust-for-cpython-progress-update-april-2026/106895).

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
