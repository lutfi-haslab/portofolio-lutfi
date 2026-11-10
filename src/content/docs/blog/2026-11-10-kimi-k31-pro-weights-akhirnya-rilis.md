---
title: "Weights Kimi K3.1 Pro Akhirnya Rilis — dan 'Terbuka' Ternyata Punya Harga"
description: "Moonshot menepati janji: weights Kimi K3.1 Pro mendarat di Hugging Face tepat 4 November. Tapi 1,56 TB, delapan GPU data center, dan gerbang lisensi US$20 juta membuat 'terbuka' di sini punya arti yang jauh lebih sempit dari yang dibayangkan."
date: 2026-11-10T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
lang: id
tags:
  - AI
  - Kimi
  - Open Source
cover:
  image: /assets-img/banner-kimi-k31-pro-weights-akhirnya-rilis.jpg
  alt: Banner informatif rilis weights Kimi K3.1 Pro — 1,56 TB, 104B parameter aktif, 8 GPU data center
---

Ada janji yang ditepati minggu ini, dan itu saja sudah cukup langka untuk dicatat. Waktu Moonshot meluncurkan Kimi K3.1 Pro pada 23 Oktober lalu, mereka berjanji weights-nya menyusul paling lambat 4 November. Tanggal 4 November, akun Kimi.ai di X menulis satu kalimat pendek: "Releasing the model weights of Kimi K3.1 Pro." Repo-nya muncul di Hugging Face tanpa gerbang akses, 96 file, dan janji itu lunas tepat waktu.

Saya mengikuti model ini sejak peluncurannya — dua minggu lalu saya menulis soal tudingan distilasi yang menempel padanya — jadi rilis weights ini penting buat saya bukan karena dramanya, tapi karena inilah momen ketika klaim akhirnya bisa diuji siapa pun. Weights yang terbuka berarti orang lain bisa menjalankan, mengukur, dan membongkar modelnya sendiri, bukan cuma percaya tabel benchmark dari vendor.

## Yang mendarat itu monster

Angkanya dulu, karena di sinilah ceritanya mulai lucu. Kimi K3.1 Pro adalah Mixture-of-Experts dengan total 2,8 triliun parameter, 104 miliar di antaranya aktif per token, 896 expert, 93 layer, dan context window 1.048.576 token. Bobotnya memakai kuantisasi MXFP4 dengan aktivasi MXFP8, dan ada vision encoder MoonViT-V2 untuk input gambar. Di atas kertas ini model open-weight terbesar yang pernah dirilis — dan ukurannya memang sebesar klaimnya: sekitar 1,56 TB dalam 96 file safetensors.

Satu koma lima enam terabyte. Itu bukan angka yang bisa diunduh sambil lalu. Buat perbandingan, laptop saya yang 8 GB RAM-nya saja sudah pas-pasan buat kerja sehari-hari tidak akan pernah menyentuh model ini, bahkan sekadar untuk melihat isinya. Menurut hitungan vramglass, menjalankan weights aslinya butuh sekitar delapan GPU data center kelas 288 GB VRAM lewat vLLM. Versi GGUF yang biasa dipakai komunitas untuk menjalankan model di perangkat yang lebih sederhana? Sampai 4 November kemarin belum ada.

Jadi "terbuka" di sini artinya: siapa pun boleh mengunduh, memeriksa, dan memodifikasi — asal punya klaster. Buat sebagian besar dari kita, termasuk saya, jalur praktisnya tetap API Moonshot di harga US$2 per juta token input dan US$10 per juta token output. Provider inference pihak ketiga sudah ramai-ramai meng-hosting-nya, dan menurut beberapa laporan awal, throughput mereka bahkan lebih baik dari endpoint resmi di harga yang sama. Ironi yang lumayan: model open-weight yang paling cepat dijangkau orang ternyata lewat API juga.

## Benchmark-nya mengesankan, dengan catatan yang sama seperti biasa

Tabel evaluasi di model card-nya sendiri patut dibaca, tapi dengan kacamata yang benar. Kimi K3.1 Pro mengungguli Claude Opus 5.5 di 16 dari 37 baris benchmark yang dibandingkan — hitungan itu dari FourWeekMBA atas tabel Moonshot. Di Terminal-Bench 4.0 ia mencetak 65,7 berbanding 66,4 milik Opus 5.5, nyaris imbang; di SWE Marathon 51,7 berbanding 46,3, ia malah di depan. Di sisi lain, ada benchmark seperti ProgramBench yang hasilnya jauh di bawah, dan HLE-Diamond yang tertinggal cukup jauh dari GPT-6 Astra.

Semua angka itu adalah angka Moonshot sendiri, dari harness yang mereka pilih, dengan effort maksimal. Sampai ada reproduksi independen atas weights yang baru dirilis ini, statusnya tetap klaim vendor — klaim yang kuat, tapi klaim. Justru di sinilah rilis weights ini berharga: sekarang komunitas bisa memverifikasi, bukan cuma mengangguk.

## Lisensinya terbuka, bukan bebas tanpa syarat

Satu hal yang sering terlewat dari perayaan "open source" adalah membaca lisensinya. Kimi K3.1 Pro dirilis di bawah lisensi buatan Moonshot sendiri, bukan lisensi open-source standar. Buat kebanyakan orang, ia bekerja seperti lisensi permisif: boleh dipakai, dimodifikasi, di-fine-tune, dan dijual. Tapi ada gerbangnya: operator Model-as-a-Service yang pendapatannya melewati US$20 juta dalam 12 bulan berturut-turut wajib menandatangani perjanjian terpisah dengan Moonshot sebelum memakai model ini untuk tujuan komersial, dan produk besar wajib menampilkan nama modelnya.

Itu bukan detail kecil. Gerbang US$20 juta itu jelas dirancang untuk satu hal: mencegah orang lain menjual ulang Kimi sebagai layanan dan menggerus API Moonshot sendiri, sementara tetap membiarkan peneliti, startup kecil, dan perusahaan yang self-host untuk kebutuhan internal memakai weights-nya secara gratis. Strategi yang masuk akal dari sisi bisnis — dan pengingat bahwa "open weights" adalah keputusan produk, bukan amal.

## Jadi, buat siapa rilis ini?

Buat saya, jawabannya terbagi tiga. Buat peneliti dan lab yang punya klaster, ini bahan mentah kelas frontier yang akhirnya bisa dibedah — termasuk soal tudingan distilasi yang saya tulis dua minggu lalu, yang kini bisa diuji lebih jauh dari sekadar grafik kepribadian. Buat perusahaan yang self-host di skala besar, ini opsi nyata dengan harga yang jauh di bawah flagship tertutup, asal lisensinya dibaca sampai habis. Dan buat kita yang cuma punya laptop dan API key, tidak banyak yang berubah hari ini — kecuali satu hal: model yang kita pakai lewat API sekarang punya bobot yang bisa diaudit siapa pun, dan itu membuat klaim-klaim di sekelilingnya lebih mudah dipertanggungjawabkan.

Janji ditepati, weights-nya nyata, dan ukurannya mengingatkan satu hal sederhana: di dunia model terbuka, yang gratis bukan hardwarenya.

Sumber: model card moonshotai/Kimi-K3.1-Pro di Hugging Face, i10x (5 November 2026), enjoy.dev (4 November 2026), FourWeekMBA (4 November 2026), dan vramglass.

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
