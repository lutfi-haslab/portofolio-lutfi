---
title: "Tencent Hy4 Sudah Bisa Melihat dan Mengklik — Tapi Belum Bisa Kamu Pegang"
description: "Hy4 versi penuh akhirnya rilis 4 November 2026 dengan vision dan computer use. Tapi bobotnya belum dibagikan, lisensinya belum dinyatakan, dan angka-angka terbaiknya masih klaim sepihak Tencent. Rilis yang separuh terbuka."
date: 2026-11-05T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - AI
  - Tencent
  - Open Source
cover:
  image: /assets-img/banner-hy4-tencent-bisa-melihat-tapi-belum-terbuka.jpg
  alt: Banner informatif Tencent Hy4 — halusinasi internal turun ke 5,45%, skor OSWorld 2.1 78,9, dan harga API 0,834 dolar per 1 juta token input
---

Saya punya kebiasaan buruk setiap ada model baru yang diklaim "open": saya langsung mencari tombol download-nya. Bukan halaman produknya, bukan demo videonya — tombol download. Karena buatku, dari dulu ukurannya sederhana: kalau bobotnya belum bisa diunduh, model itu belum terbuka, seberapa pun meriah siaran persnya.

Itulah kenapa rilis Tencent Hy4 kemarin, 4 November 2026, membuatku senyum getir. Di satu sisi, ini lompatan yang nyata. Di sisi lain, tombol download-nya belum ada.

Sepuluh minggu sebelumnya, Hy4 hadir sebagai preview yang hanya bisa membaca teks. Versi preview itu memang dirilis terbuka: 770 miliar parameter total, 49 miliar parameter aktif per token, konteks 1 juta token, lisensi Apache 2.0. Versi penuh yang baru ini menambahkan dua hal yang mengubah karakter modelnya: ia bisa melihat, dan ia bisa mengoperasikan komputer.

Melihat, di sini, bukan sekadar "bisa menjawab soal gambar". Tencent bilang Hy4 bisa membaca detail halus di foto, menganalisis grafik yang rumit, dan bernalar matematis dari informasi visual. Demo andalannya agak pamer tapi memang menggoda: model ini menemukan komponen atap selebar sekitar dua meter di dalam foto udara 2,8 gigapiksel. Buatku itu bukan sekadar soal ketajaman mata — itu soal kesabaran mesin menelusuri detail yang manusia pasti lewatkan kalau tidak diperbesar berkali-kali.

Lalu mengklik. Hy4 bisa bekerja lewat command line maupun antarmuka grafis, dan Tencent melatihnya khusus untuk perangkat lunak profesional seperti Blender dan CAD, plus pekerjaan lintas aplikasi yang panjang. Ini yang membedakan Hy4 dari sekadar chatbot multimodal: ia tidak hanya menjawab tentang perangkat lunak, ia diklaim bisa menggerakkannya. Tencent mengarahkan kemampuan ini ke pekerjaan yang konkret — pengembangan game di Unreal Engine, Unity, dan Godot, analisis keuangan, dan pekerjaan kantor lewat WorkBuddy dan CodeBuddy.

Angka-angka yang menyertai rilis ini, kalau dibaca apa adanya, memang mengesankan. Di evaluasi pencarian internal Tencent, tingkat halusinasi turun dari 15,76% pada preview menjadi 5,45% pada versi penuh. Di evaluasi keuangan internal yang mencakup 579 tugas dunia nyata dan dinilai 213 profesional keuangan, Hy4 mencetak 3,04 — di atas DeepSeek-V4.1-Flash yang 2,97, serta Kimi K3.1 Pro dan GLM-5.3 yang masing-masing 2,68. Dan di OSWorld 2.1, benchmark computer use, Hy4 mendapat 78,9 — di bawah Claude Opus 5.5 yang 81,8 dan Kimi K3.1 Pro yang 79,6, tapi di atas GPT-6.1 Sol yang 75,2. Jadi Hy4 ketiga, bukan kedua. Detail kecil seperti ini penting, karena di era headline, selisih satu peringkat gampang sekali dibulatkan jadi "mengalahkan semua".

Tapi — dan ini "tapi" yang besar — semua angka itu datang dari Tencent sendiri. Rilis ini tidak menyertakan lampiran benchmark yang bisa diperiksa pihak luar, tidak ada hasil Terminal-Bench atau SWE-bench, dan tidak ada bobot yang bisa diunduh untuk mereproduksi skor OSWorld itu. Bahkan menurut laporan yang menelaah pengumuman Tencent, pengumuman versi penuh ini tidak mengulang jumlah parameter maupun panjang konteksnya; angka 770 miliar itu adalah spesifikasi preview yang dibawa-bawa oleh liputan, bukan penegasan baru dari Tencent. Lisensi versi penuh pun belum dinyatakan sama sekali, padahal preview-nya Apache 2.0.

Jadi apa yang sebenarnya dirilis kemarin? Akses API. Hy4 sudah bisa dipakai lewat Tencent Cloud TokenHub, OpenRouter, dan produk-produk Tencent seperti Yuanbao, WorkBuddy, CodeBuddy, dan ima. Harganya tidak berubah dari preview: 0,834 dolar AS per 1 juta token input dan 2,501 dolar per 1 juta token output, dengan kuota gratis di produk Tencent dari 4 sampai 15 November dan diskon 50% di TokenHub sampai akhir Desember. Tencent juga menjanjikan bobot dan system card "dalam beberapa hari ke depan", plus varian Hy4 Flash yang lebih murah dan cepat. Janji, bukan barang.

Yang membuatku menghargai Tencent di sini justru kejujurannya di bagian yang biasanya disembunyikan. Mereka mengakui masih ada kesenjangan dengan model proprietary terbaik, terutama di matematika level riset, coding horizon panjang, dan visual question answering yang sulit. Mereka juga mempublikasikan skor 30,4 dari 100 di Hy-BioExperimentBench, lengkap dengan penilaian reviewer internal bahwa kemampuan model mengubah pengetahuan biologi menjadi protokol eksperimen masih terbatas. Itu bukan bahasa pemasaran. Itu bahasa tim yang tahu di mana temboknya.

Buatku, Hy4 adalah cermin dari satu pola yang makin sering muncul di 2026: "open" sebagai arah, bukan sebagai keadaan. Preview-nya terbuka, versi penuhnya API dulu, bobotnya menyusul, dan di antaranya ada jeda yang cukup untuk semua orang mengklaim apa saja. Pola yang sama kita lihat di tempat lain — bobot dijanjikan tanggal tertentu, lalu tanggal itu lewat tanpa kejelasan. Bedanya, Tencent kali ini transparan soal jedanya. Mereka tidak pura-pura bobotnya sudah ada.

Apakah Hy4 layak dicoba? Kalau kamu bekerja dengan alur kerja kantor, keuangan, atau game di ekosistem Tencent, jelas layak — apalagi selama kuota gratis dan diskon berjalan. Tapi kalau kamu, seperti saya, menilai model dari apakah ia bisa di-self-host, diukur sendiri, dan diutak-atik di mesin sendiri, jawabannya masih: tunggu. Tunggu bobotnya benar-benar mendarat, tunggu system card-nya, dan tunggu seseorang di luar Tencent menjalankan OSWorld pada model yang persis sama dan mendapatkan angka yang sama.

Sampai saat itu, Hy4 adalah model yang sudah bisa melihat layarmu dan mengklik aplikasimu — tapi belum bisa kamu pegang. Dan buat saya, itu perbedaan yang layak disebut dengan nama aslinya.

Sumber yang saya baca: [pengumuman Hy4 di Unite.AI](https://www.unite.ai/tencent-releases-full-hy4-model-with-vision-and-computer-use/), [laporan Startup Fortune](https://startupfortune.com/tencent-launches-hunyuan-hy4-with-vision-and-the-ability-to-click-through-apps/), [analisis MadRobot](https://madrobot.blog/2026/11/04/tencent-hy4-release-computer-use-open-weight/), dan [laporan Unicorn API](https://unicornapi.net/blog/tencent-releases-full-hy4-ai-model-see-images-use-computer). Halaman resmi Tencent Hunyuan sendiri tidak bisa saya buka saat riset — jadi angka-angka di atas saya kutip dari laporan-laporan itu, dengan statusnya ditandai apa adanya.

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
