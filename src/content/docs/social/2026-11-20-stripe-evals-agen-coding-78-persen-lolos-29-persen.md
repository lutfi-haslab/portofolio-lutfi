---
title: "Agen Coding Dapat Nilai 78, tapi yang Betul-Betul Beres Cuma 29%"
description: "Stripe menguji 14 agen coding di 69 skenario pembayaran nyata. Skor rata-ratanya 78,1% — tapi begitu semua kriteria wajib harus lolos, angkanya jatuh ke 29,4%. Yang diukur di sini bukan bisa ngoding, tapi bisa dipercaya megang uang."
date: 2026-11-20T04:00:00.000Z
tags:
  - AI
  - OpenAI
  - Anthropic
lang: id
pair: 2026-11-20-en-stripe-evals-coding-agents-78-pass-29-strict
source: "Artikel saya: Agen Coding Dapat Nilai 78, tapi yang Betul-Betul Beres Cuma 29%"
---

Dua hari lalu saya menulis soal MAI Code 2 yang murah. Hari ini giliran Stripe yang mengajukan pertanyaan yang lebih penting: murah dan pintar saja tidak cukup, kalau yang dipegang itu uang orang.

Dua hari lalu Stripe merilis Stripe evals — benchmark publik yang menyuruh agen coding membangun integrasi pembayaran sungguhan, lalu menilainya dengan standar yang sama kerasnya dengan dunia nyata. Ada 69 skenario: hosted checkout, metered billing, langganan per kursi, pembagian pembayaran marketplace. Diuji di 14 pasangan model dan harness — Claude Code, Codex, OpenCode, dari Haiku 5.5 yang murah sampai GPT-6 Astra dan Claude Fable 5.2.

Hasilnya? Rata-rata agen mendapat skor 78,1%. Kedengarannya lumayan.

Tapi seperti biasa, saya tidak berhenti di angka headline-nya. Stripe memakai penilaian ketat: semua kriteria wajib harus lolos, tidak boleh ada satu pun yang bolong. Begitu standar itu dipakai, angkanya jatuh ke 29,4%.

Itu jurang yang besar. Dan jurang itulah inti ceritanya.

Yang diuji di sini bukan "bisa ngoding", tapi "bisa dipercaya megang uang". Setiap skenario dinilai per kriteria, dengan pembagian MUST dan SHOULD ala RFC 2119 — dan ada agen kedua yang berperan sebagai developer manusia, mengajukan pertanyaan lanjutan dan menyembunyikan sebagian kebutuhan di awal, persis seperti klien sungguhan.

Contoh paling ngeri yang ditulis Stripe sendiri: dalam satu skenario, Claude Opus 5.5 hanya memeriksa `PaymentIntent.status === 'succeeded'` sebelum memproses pengiriman. Ia tidak memeriksa apakah pesanan itu masih layak dipenuhi. Artinya, pesanan yang sudah di-refund atau sedang disengketakan tetap bisa terkirim. Kodenya jalan. Tesnya mungkin hijau. Bisnisnya yang rugi.

Ada kabar baik juga. Plugin resmi Stripe — skills dan MCP tools berisi panduan dan dokumentasi terkini — membuat ke-14 agen itu membaik 3 sampai 8 poin. Pencarian web turun 96%, karena agen berhenti menebak dari hasil Google. Referensi parameter kedaluwarsa turun dari 7% menjadi 1,3%.

Tapi ada efek samping yang patut dicatat dengan jujur: dengan plugin, agen menulis baris tes sekitar 40% lebih sedikit dan menjalankan tes hanya di 42% evaluasi, turun dari 53%. Stripe sendiri menulis bahwa ini bukan berarti tes yang lebih sedikit itu lebih baik. Saya cenderung waspada di titik ini: mengurangi pengujian karena "sudah yakin" adalah kebiasaan buruk yang sama, entah yang melakukannya manusia atau mesin.

Dan satu tabel yang saya suka: kolom biaya. Haiku 5.5 cuma butuh sekitar $0,08–$0,09 per evaluasi, skor 76,2%, strict pass 30,9%. Fable 5.2 menghabiskan $5,35 per lari untuk skor 85,2% dan strict pass 43,2%. GPT-6.1 Sol menarik di tengah: $0,61 per lari, skor 89,6%, strict pass di atas 50%. Selisih harga 60 kali lipat itu sulit dibenarkan kalau hasilnya nanti tetap direview manusia — tapi kalau yang dicari adalah yang paling dekat dengan "siap produksi", angka seperti inilah yang seharusnya jadi bahan hitung-hitungan.

Jadi ukuran saya sederhana: agen coding boleh megang integrasi pembayaran, dengan satu syarat yang tidak bisa ditawar — ada manusia yang memeriksa bagian terakhirnya, terutama bagian yang berhubungan dengan uang bergerak. Bukan karena agennya bodoh. Justru karena agennya sudah terlalu bagus dalam menghasilkan sesuatu yang terlihat benar.

Angka 78% itu menenangkan, dan angka yang menenangkan adalah angka yang paling berbahaya kalau kamu berhenti memeriksanya di situ. Angka 29,4% adalah angka yang jujur.

Selengkapnya di blog: https://lutfiikbalmajid.pages.dev/blog/2026-11-20-stripe-evals-agen-coding-78-persen-lolos-29-persen/
