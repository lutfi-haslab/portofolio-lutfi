---
title: Agen Coding Dapat Nilai 78, tapi yang Betul-Betul Beres Cuma 29%
description: Stripe baru saja menguji 14 agen coding di 69 skenario pembayaran nyata. Skor rata-ratanya terlihat bagus, sampai kamu lihat angka yang satu ini.
date: 2026-11-20T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - AI
  - Open Source
  - Anthropic
  - OpenAI
cover:
  image: /assets-img/banner-stripe-evals-agen-coding-78-persen-lolos-29-persen.jpg
  alt: Ilustrasi agen AI coding yang sedang membangun integrasi pembayaran Stripe, dengan angka statistik hasil evaluasi Stripe
---

Saya sudah cukup lama curiga sama angka-angka benchmark agen coding. Bukan karena angkanya bohong — biasanya angkanya benar — tapi karena yang diukur sering kali bukan hal yang benar-benar penting. Lolos tes unit bukan berarti integrasinya benar. Kode jalan bukan berarti uangnya sampai ke tempat yang benar.

Kemarin Stripe merilis sesuatu yang, menurut saya, akhirnya mengukur hal yang benar: [Stripe evals](https://stripe.dev/blog/stripe-integration-evals-methodology), benchmark publik yang menyuruh agen coding membangun integrasi pembayaran sungguhan — checkout, langganan, sampai marketplace — lalu menilainya dengan standar yang sama kerasnya dengan dunia nyata.

Hasilnya? Rata-rata agen mendapat skor 78,1%. Kedengarannya lumayan. Tapi begitu Stripe memakai penilaian ketat — semua kriteria wajib harus lolos, tidak boleh ada satu pun yang bolong — angkanya jatuh ke 29,4%.

Itu jurang yang besar. Dan jurang itulah inti cerita ini.

## Yang diuji bukan "bisa ngoding", tapi "bisa dipercaya megang uang"

Stripe evals bukan benchmark leetcode. Ada 69 skenario yang dirancang bareng engineer support Stripe sendiri: membangun hosted checkout, menerapkan metered billing, mengelola langganan per kursi, membagi pembayaran marketplace. Setiap skenario dijalankan dua kali, dengan dan tanpa plugin agen Stripe, di 14 pasangan model dan harness — Claude Code, Codex, dan OpenCode, dari Haiku 5.5 yang murah sampai GPT-6 Astra dan Claude Fable 5.2.

Yang menarik dari metodologinya: ada agen kedua yang berperan sebagai developer manusia. Ia mengajukan pertanyaan lanjutan, menyembunyikan sebagian kebutuhan di awal — persis seperti klien atau product manager sungguhan — lalu menilai apakah semua kebutuhan itu akhirnya terpenuhi. Penilaiannya pun bukan satu juri yang menilai semuanya sekaligus, melainkan penilai terpisah per kriteria, dengan pembagian MUST dan SHOULD ala RFC 2119. Kriteria MUST itu syarat mutlak integrasi yang valid. Gagal satu saja, integrasinya tidak layak produksi, berapa pun skor totalnya.

Di sinilah angka 78,1% itu menipu. Agen-agen ini memang jago menulis kode yang "hampir benar". Tapi "hampir benar" di urusan pembayaran artinya ada celah yang bisa bikin barang terkirim padahal pembayarannya sudah di-refund.

Contoh paling ngeri yang ditulis Stripe sendiri: dalam skenario `payments-radar-review-fulfillment`, Claude Opus 5.5 hanya memeriksa `PaymentIntent.status === 'succeeded'` sebelum memproses pengiriman. Ia tidak memeriksa apakah pesanan itu masih layak dipenuhi. Artinya, pesanan yang sudah di-refund atau sedang disengketakan tetap bisa terkirim. Kodenya jalan. Tesnya mungkin hijau. Bisnisnya yang rugi.

## Plugin resmi Stripe membantu — tapi tidak menambal lubang terakhir

Ada kabar baik juga. Stripe merilis plugin agen resmi — skills dan MCP tools berisi panduan implementasi dan dokumentasi terkini — dan ke-14 agen itu semuanya membaik saat memakainya, naik sekitar 3 sampai 8 poin persentase. Pencarian web turun 96%, karena agen berhenti menebak-nebak dari hasil Google dan mulai memakai panduan yang bisa dipercaya. Referensi parameter kedaluwarsa turun dari 7% menjadi 1,3%.

Contoh konkretnya lucu sekaligus mengkhawatirkan: tanpa plugin, GPT-6.1 Sol masih memakai parameter `payment_method_types: ['card']` yang sudah dihapus, padahal yang benar adalah `automatic_payment_methods: { enabled: true }`. Ini bukan kesalahan logika — ini model yang belajar dari dokumentasi lama yang tersebar di internet, lalu percaya diri menulis kode usang. Plugin memperbaikinya karena sumber kebenarannya satu: dokumentasi Stripe sendiri, bukan memori pretraining.

Tapi perhatikan: bahkan dengan plugin, strict pass rate terbaik pun baru 52,9%, diraih GPT-6 Astra di Codex. Artinya, separuh skenario tetap punya minimal satu kriteria wajib yang bolong. GPT-6.1 Sol menyusul di 50,7%, Claude Fable 5.2 di 43,2%. Tidak ada yang lolos bersih.

Dan ada efek samping yang perlu dicatat dengan jujur: dengan plugin, agen menulis baris tes sekitar 40% lebih sedikit dan menjalankan tes hanya di 42% evaluasi, turun dari 53%. Stripe sendiri menulis bahwa ini bukan berarti tes yang lebih sedikit itu lebih baik — agen hanya merasa lebih yakin karena informasinya lebih otoritatif. Keyakinan itu bisa jadi benar, bisa juga jadi rasa aman yang palsu. Saya cenderung waspada di titik ini: mengurangi pengujian karena "sudah yakin" adalah kebiasaan buruk yang sama, entah yang melakukannya manusia atau mesin.

## Harga per lari: yang termurah bukan yang terburuk

Satu tabel yang saya suka dari laporan ini adalah kolom biaya. Haiku 5.5 di Claude Code cuma butuh sekitar $0,08–$0,09 per evaluasi, dengan skor rata-rata 76,2% memakai plugin dan strict pass 30,9%. Bandingkan dengan Fable 5.2 yang menghabiskan $5,35 per lari untuk skor 85,2% dan strict pass 43,2%.

Artinya, kalau kamu cuma butuh draf integrasi yang nanti tetap direview manusia, selisih harga 60 kali lipat itu sulit dibenarkan. Tapi kalau yang kamu cari adalah hasil yang paling dekat dengan "siap produksi tanpa banyak tambalan", GPT-6.1 Sol menarik: $0,61 per lari, skor 89,6%, strict pass di atas 50%. Di dunia nyata, angka seperti inilah yang seharusnya jadi bahan hitung-hitungan, bukan sekadar "model mana yang paling pintar".

## Yang paling penting: benchmark-nya dibuka

Bagian yang paling saya apresiasi: Stripe mempublikasikan benchmark dan framework evaluasinya sebagai open source di GitHub, dan berjanji memelihara harness-nya serta memperbarui hasil seiring model baru datang. Ini penting, karena benchmark yang tertutup cuma menghasilkan klaim. Benchmark yang terbuka menghasilkan percakapan — orang bisa menjalankan ulang, menemukan kelemahan metodologi, dan mengajukan skenario yang lebih sulit.

Dan ada satu hal lagi yang menurut saya layak dicatat: Stripe tidak membangun ini dalam semalam. Kerangka evaluasinya pertama kali dijelaskan di blog mereka pada Maret 2026, dengan 11 environment. Yang dirilis sekarang adalah versi yang jauh lebih besar dan lebih ketat. Ada pelajaran proses di sana: evaluasi yang bagus itu iterasi, bukan pengumuman sekali jadi.

## Jadi, bolehkah agen coding megang integrasi pembayaran?

Jawaban jujur saya: boleh, dengan satu syarat yang tidak bisa ditawar — ada manusia yang memeriksa bagian terakhirnya, terutama bagian yang berhubungan dengan uang bergerak. Bukan karena agennya bodoh. Justru karena agennya sudah terlalu bagus dalam menghasilkan sesuatu yang terlihat benar.

Stripe evals menunjukkan dengan angka: rata-rata 78% itu angka yang menenangkan, dan angka yang menenangkan adalah angka yang paling berbahaya kalau kamu berhenti memeriksanya di situ. Strict pass 29,4% adalah angka yang jujur. Ia bilang: agen coding sudah bisa mengerjakan 80% pekerjaan integrasi dengan baik, tapi 20% terakhir — validasi, edge case, urutan pemeriksaan sebelum uang bergerak — masih wilayah manusia.

Buat saya yang sehari-hari membangun sistem dan mengotak-atik agen, ini kabar baik, bukan kabar buruk. Kita akhirnya punya penggaris yang mengukur hal yang benar. Sekarang tinggal bagaimana kita memakainya: bukan untuk membuktikan agen sudah menggantikan engineer, melainkan untuk tahu persis di mana engineer masih dibutuhkan.

Sumber: [Stripe evals: Measuring real-world coding agent performance](https://stripe.dev/blog/stripe-integration-evals-methodology) (Stripe.dev) dan [Can AI agents build real Stripe integrations?](https://stripe.com/blog/can-ai-agents-build-real-stripe-integrations) (Stripe, Maret 2026).

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
