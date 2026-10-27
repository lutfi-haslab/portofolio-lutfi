---
title: "DeepSeek Akhirnya Membuka Dapur Inference-nya — dan Itu Bukan Buat Laptop Kita"
description: "DeepInfer adalah mesin inference produksi DeepSeek yang kini open source. Saya baca README-nya, dan bagian paling menarik justru daftar apa yang sengaja tidak disertakan."
date: 2026-10-27T00:00:00.000Z
authors:
    - Lutfi Ikbal Majid
    - Bewustein (Muse)
tags:
    - AI
    - DeepSeek
    - Open Source
cover:
    image: /assets-img/banner-deepinfer-mesin-inference-deepseek-dibuka.jpg
    alt: Mesin inference AI yang terbuka, aliran token bercahaya mengalir lewat dua arsitektur chip berbeda dalam palet hijau emerald gelap
---

Kemarin saya lagi ngoprek seperti biasa — buka repo, baca README, iseng membayangkan "ini bisa saya pakai buat apa?" — lalu saya mentok di satu kalimat yang jujur saja agak menyesakkan: mesin ini butuh GPU kelas Blackwell atau NPU Ascend 950. Laptop saya yang RAM-nya 8 GB itu jelas bukan target pasarnya. Tapi justru di situlah ceritanya jadi menarik.

Yang dirilis DeepSeek pekan lalu adalah **DeepInfer**: framework inference yang, menurut README resminya sendiri, "powers DeepSeek's large-scale production services". Bukan komponen kecil, bukan demo, bukan wrapper di atas engine orang lain. Ini dapur tempat DeepSeek melayani API-nya sendiri, dibuka ke publik di bawah lisensi Apache 2.0. Saya verifikasi langsung ke repositorinya — [github.com/deepseek-ai/DeepInfer](https://github.com/deepseek-ai/DeepInfer) — dan dalam seminggu sudah dikumpulkan lebih dari 23 ribu star. Wajar, sih. Laboratorium frontier yang membuka mesin produksinya sendiri itu bukan kejadian tiap bulan.

## Satu model, dua chip, dan satu kejujuran

Hal pertama yang saya cek adalah cakupannya, karena di sinilah banyak hype mulai mengada-ada. DeepInfer saat ini hanya mendukung satu model: **DeepSeek-V4.1-Flash**, dengan checkpoint default dari 17 Oktober. Hardwarenya juga cuma dua: GPU NVIDIA SM100 dan NPU Huawei Ascend 950. Itu saja. Bukan engine universal buat semua model di Hugging Face.

Dan ini bagian yang paling saya suka: DeepSeek menulis dengan terang-terangan apa yang *tidak* disertakan. Tiga hal yang dibutuhkan sebuah layanan inference lengkap — sistem KV cache, pemisahan prefill/decode, dan load balancing antar replika — sengaja tidak ada di rilis ini. Jadi kalau ada yang bilang "sekarang semua orang bisa meniru harga API DeepSeek", jawabannya: belum. Mesinnya dikasih, tapi restoran lengkapnya belum. Kamu masih harus membangun dapur sisanya sendiri, atau meminjam dari vLLM dan SGLang — yang, diakui DeepSeek sendiri di bagian acknowledgment, memang jadi fondasi awal DeepInfer.

Ngomong-ngomong soal isi mesinnya: kernel-kernel yang selama ini cuma kita baca di paper mereka — FlashMLA, DeepGEMM, DeepEP, TileKernels, DeepSelect — sekarang ada di dalam satu paket, bersama DSpark (speculative decoding dengan confidence-scheduled verification), SWA bounded replay, scheduler asinkron, dan mode sampling deterministik. Buat saya yang hobinya membedah sistem, ini seperti diberi denah lengkap sebuah pabrik yang sedang berjalan, bukan sekadar brosur.

## Kenapa saya peduli, padahal tidak bisa menjalankannya?

Pertanyaan yang wajar. Saya tidak punya klaster Blackwell di rumah, dan kamu mungkin juga tidak. Tapi ada tiga alasan kenapa rilis ini tetap penting buat kita yang kerja di lapisan aplikasi.

Pertama, **ini mengubah cara kita belajar inference**. Selama ini, pengetahuan soal serving model skala besar tersebar di paper, blog post, dan potongan kode yang sudah dibersihkan untuk publikasi. DeepInfer adalah kode produksi yang sedang berjalan — lengkap dengan trade-off-nya yang tidak dirapikan. Membaca bagaimana mereka menyeimbangkan expert parallelism dengan load balancing (EPLB), atau kenapa batch-invariant inference cuma tersedia di NVIDIA, mengajarkan lebih banyak daripada sepuluh tutorial "cara deploy LLM".

Kedua, **ini sinyal soal arah hardware**. Menyejajarkan Ascend 950 dengan SM100 dalam satu rilis resmi, sebagai target yang setara, itu bukan keputusan teknis semata. Buat developer, pesannya praktis: dunia inference tidak lagi satu vendor. Kalau kamu membangun sesuatu yang hari ini terikat mati pada satu stack hardware, mungkin sudah waktunya memikirkan abstraksi di lapisan itu — meski cuma di level desain, bukan kode.

Ketiga, dan ini yang paling nyambung ke tulisan saya kemarin soal bikin tools sendiri: **keterbukaan seperti ini yang membuat tools kecil tetap relevan**. DeepInfer memang bukan buat laptop. Tapi pola pikirnya sama dengan yang saya pegang di Haslab: pahami mesinnya sampai ke baut-bautnya, lalu putuskan sendiri bagian mana yang kamu adopsi dan bagian mana yang kamu bangun versi ringkasnya. Kamu tidak harus menjalankan DeepInfer untuk belajar dari DeepInfer.

## Yang masih harus dibuktikan

Satu catatan kewarasan, karena angka-angka produksi DeepSeek — misalnya klaim 155 triliun token per hari per klaster — adalah angka mereka sendiri, dari hardware mereka sendiri. Belum ada reproduksi independen yang saya temukan sejauh ini. Angka itu boleh dikagumi, tapi jangan dikutip seolah-olah sudah jadi benchmark umum. Tugas komunitas sekarang adalah menguji: seberapa jauh performa itu bertahan di luar data center DeepSeek, dan seberapa cepat tiga komponen yang hilang itu dibangun oleh kontributor luar.

Buat saya pribadi, pekerjaan rumah berikutnya jelas: baca dokumen deployment Q&A di repo itu pelan-pelan, lalu petakan konsepnya ke skala yang masuk akal buat mesin biasa — mana yang bisa dipelajari lewat nano-vLLM atau llama.cpp, mana yang memang harus diterima sebagai "ilmu klaster". Kalau kamu ikut membaca repo ini, ceritakan bagian mana yang paling bikin kamu garuk-garuk kepala. Saya curiga daftar kita akan mirip.

---

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
