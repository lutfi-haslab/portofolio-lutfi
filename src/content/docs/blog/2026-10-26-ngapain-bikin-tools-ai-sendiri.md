---
title: "Ngapain Bikin Tools AI Sendiri? Catatan dari Dapur Haslab"
description: "Orang sering nanya kenapa saya nggak pakai tools yang sudah jadi saja. Jawaban pendeknya: saya pernah kesal. Jawaban panjangnya ada di tulisan ini."
date: 2026-10-26T02:30:00.000Z
authors:
    - Lutfi Ikbal Majid
    - Bewustein (Muse)
tags:
    - AI
    - Golang
    - Open Source
    - Catatan
cover:
    image: /assets-img/banner-tools-ai-sendiri.jpg
    alt: Bengkel malam seorang builder — laptop berisi kode, perkakas di pegboard, dan asisten robot AI yang menyala hangat
---

Pertanyaan itu datang lagi minggu lalu, entah sudah keberapa kalinya: "Ngapain sih bikin tools AI sendiri? Kan sudah banyak yang jadi."

Saya senyum saja. Bukan karena pertanyaannya salah — justru pertanyaan itu wajar banget. Tapi kalau saya jawab jujur, alasannya sederhana dan agak personal: saya pernah kesal, berkali-kali, dan kekesalan itu lama-lama berubah jadi kode.

## Kesal pertama: IDE yang beratnya minta ampun

Saya ini orangnya nggak sabaran soal satu hal: nunggu. IDE modern itu fiturnya luar biasa, saya akui. Tapi dibuka pagi-pagi, yang muncul duluan justru rasa pengen ngopi lagi karena loading-nya lama. Belum lagi agent AI-nya di jendela lain, terminalnya di aplikasi lain, git-nya entah di mana.

Dari situ lahir **ForgeADE**. Prinsipnya saya tulis besar-besar sejak hari pertama: semua harus jadi satu binary. Native, bukan Electron. Hasilnya sekarang: cold start di bawah 100 milidetik, RAM idle sekitar 80 MB, dan agent-nya tinggal serumah sama editornya. Apakah sempurna? Nggak. Masih banyak kurangnya. Tapi setiap kali saya buka dan dia langsung nyala, saya ingat kenapa dulu saya mulai.

## Kesal kedua: agent saya hidup berpencar

Setelah punya beberapa agent, masalah baru muncul. Yang satu hidup di web, yang satu di Telegram, yang satu lagi di CLI. Setiap channel kayak punya ingatannya sendiri. Saya ngomong apa di satu tempat, tempat lain nggak tahu apa-apa.

Makanya ada **KendaliAI**: satu daemon Go yang jadi gerbang semua channel itu. Satu daemon, banyak agent, semua channel, sesi dan memorinya berbagi konteks yang sama. Dan karena ini urusan data saya sendiri, syaratnya nggak bisa ditawar: 100% self-hosted. Data saya, ya di rumah saya sendiri.

## Kesal ketiga: router yang makannya kebanyakan

Ini yang paling receh sebenarnya. Saya butuh router buat mindahin request antar provider AI — OpenAI, Anthropic, DeepSeek, Qwen, dan teman-temannya. Pilihan yang ada waktu itu? Kebanyakan berat. Ratusan megabyte cuma buat jadi perantara. Perantara kok makannya lebih banyak dari yang diantar, batin saya.

Akhirnya saya tulis sendiri pakai Go. Jadilah **MyAiRouter**: overhead proxy di bawah 20 milidetik, footprint memorinya kecil, failover-nya jalan sendiri kalau satu provider lagi ngambek. Nggak ada sihir di sini, cuma Go yang memang jagoan soal beginian — satu binary statis, jalan di mana saja, nggak pakai drama dependensi.

## Jadi pelajarannya apa?

Kalau dirangkum, sebenarnya cuma tiga hal yang saya pegang tiap kali mulai proyek baru di Haslab:

Pertama, **kecil itu fitur**. Binary kecil, RAM kecil, dependensi sedikit — itu bukan keterbatasan, itu keputusan desain. Semakin kecil sesuatu, semakin gampang dia dirawat jam dua pagi ketika ada yang rusak.

Kedua, **miliki rumahmu sendiri**. Tools boleh berganti, model AI boleh rilis tiap minggu — minggu ini DeepSeek, minggu depan ada lagi yang baru. Tapi gerbang, memori, dan data saya tetap punya saya. Model itu tamu. Rumahnya yang permanen.

Ketiga, dan ini yang paling penting: **kekesalan itu sinyal, bukan hambatan**. Setiap tools di Haslab lahir dari satu momen "ini kenapa begini sih?" Kalau kamu sering kesal sama tools-mu, mungkin itu bukan pertanda kamu kurang bersyukur. Mungkin itu pertanda kamu harus bikin versimu sendiri — kayak **RakitKode** yang lahir karena saya butuh agent coding engine yang bisa di-embed di produk lain, atau **PanduJev** yang lahir karena saya penasaran: masa iya keputusan sepersekian detik harus selalu nanya ke cloud?

## Penutup sebelum ngopi

Saya nggak akan bilang tools buatan sendiri itu selalu lebih baik. Nggak. Ada banyak tools jadi yang jauh lebih matang dari buatan saya, dan saya pun masih pakai beberapa di antaranya tiap hari.

Tapi ada kepuasan yang susah dijelaskan waktu sesuatu yang kamu pakai tiap hari itu hasil tanganmu sendiri — kamu tahu persis kenapa dia begitu, dan kalau dia rusak, kamu tahu harus ngoprek di mana.

Semua proyek tadi open source dan bisa kamu intip di GitHub saya. Kalau kamu lagi bangun tools-mu sendiri gara-gara kesal juga, kita satu frekuensi. Cerita-cerita dong di kolom komentar platform mana pun kamu nemu tulisan ini — saya pengen dengar kekesalan versi kamu.

---

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI yang tinggal di dapur Haslab dan ikut mengoprek semua proyek di atas.*
