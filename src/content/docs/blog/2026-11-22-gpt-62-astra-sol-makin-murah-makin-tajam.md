---
title: "GPT-6.2: Astra Makin Murah, Sol Makin Nempel, Cyber Makin Tajam"
description: "OpenAI merilis GPT-6.2 Astra dan Sol pada 17 November: flagship turun harga 20 persen, Sol hampir menyamai Astra di coding dengan seperlima biaya, dan keduanya makin tajam di cyber — dengan guardrail yang ikut diketatkan."
date: 2026-11-22T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - OpenAI
  - GPT-6.2
  - AI
cover:
  image: /assets-img/banner-gpt-62-astra-sol-makin-murah-makin-tajam.jpg
  alt: Banner informatif GPT-6.2 — Astra turun harga 20 persen, lonjakan 22 poin di ExploitBench, dan Sol seperlima biaya Astra
---

Dua minggu lalu saya menulis bahwa GPT-6 makin jago soal cyber — skornya di benchmark keamanan naik sampai-sampai saya memberi judul artikel itu "948 jalan ke root". Waktu itu saya menutup dengan nada waspada: kemampuan naik, dan tanggung jawab di sekitarnya harus ikut naik.

Selasa lalu, 17 November, OpenAI merilis GPT-6.2, dan polanya berulang persis seperti yang saya takutkan sekaligus saya harapkan. Astra, model flagship-nya, makin murah. Sol, model hariannya, makin nempel ke flagship. Dan keduanya makin tajam di cyber — sampai OpenAI sendiri merasa perlu mengencangkan guardrail-nya di hari yang sama.

Mari mulai dari yang paling terasa di dompet. GPT-6.2 Astra dipatok 8 dolar per 1 juta token input dan 40 dolar per 1 juta token output — 20 persen lebih murah dari GPT-6 Astra. Input yang masuk cache malah turun 60 persen, jadi 0,40 dolar. Sol tidak berubah harganya: tetap 2 dolar input dan 10 dolar output per 1 juta token, sama seperti GPT-6.1 Sol. Jadi yang flagship turun, yang murah tetap murah. Itu bukan pola yang biasa saya lihat. Biasanya yang baru datang lebih mahal dulu, baru turun belakangan.

Tapi harga murah tidak ada artinya kalau kualitasnya ikut turun. Di sinilah angka-angka OpenAI mulai menarik — dan, seperti biasa, perlu dibaca dengan kacamata klaim vs bukti.

Di Agents' Last Exam, benchmark tugas profesional berdurasi panjang, Astra 6.2 mencetak 5,2 poin di atas GPT-6 Astra dengan biaya per tugas kurang dari setengahnya. Di Artificial Analysis Intelligence Index, Astra 6.2 dapat 62 — di bawah Claude Fable 5.2 yang 65, tapi di atas GPT-6 Astra yang 57. Sol 6.2 dapat 57, angka yang sama dengan Astra generasi sebelumnya. Baca sekali lagi: model harian yang harganya 2 dolar sekarang mencetak skor yang dulu hanya dicetak flagship 10 dolar. Di Agent Arena yang baru diluncurkan minggu ini, Astra Max duduk di peringkat 6 dan Sol Max di peringkat 11 — dengan Sol mencatat biaya median 0,90 dolar per tugas.

Yang paling bikin saya berhenti sejenak adalah coding. Di FrontierCode 2.0, benchmark yang menguji apakah perubahan kode benar-benar layak di-merge ke codebase nyata, Sol tertinggal cuma 0,5 poin dari Astra — dengan biaya sekitar seperlima. Seperlima. Buat saya yang sehari-hari memakai model untuk coding, itu angka yang mengubah keputusan: kapan terakhir kali model murah sedekat itu dengan flagship di tugas yang benar-benar saya kerjakan?

Pengguna di forum OpenAI sendiri sudah menghitung dengan cara mereka. Seorang pengguna bernama merefield membagikan tabel Digbench buatannya, dan menyimpulkan dengan satu kalimat yang susah dibantah:

> "So yeah, 6.2 Sol is the current cost-weighted king."

Pengguna lain, Mb, menulis soal pengalamannya memakai Sol 6.2 untuk coding: "Sol 6.2 seems to do much better to find the issues in your whole project at once. With 6.1, I usually needed more tries to find the issues. Now 6.2 spot it immediately/more comprehensive." Bukan angka benchmark, tapi cerita orang yang memang memakai — dan buat saya itu justru yang lebih berbobot.

Tentu tidak semua orang senang. Di thread yang sama ada juga yang kecewa berat, merasa modelnya lambat dan tidak paham instruksi sederhana meski sudah di level reasoning tertinggi. Dan sebagian pengguna bahkan belum bisa mengakses modelnya sama sekali — rollout-nya bertahap, dan 6.2 hanya masuk ke ChatGPT Work dan Codex, bukan ke Chat biasa. Jadi kalau kamu buka ChatGPT dan tidak menemukan Astra atau Sol 6.2, itu bukan salahmu. Memang belum giliranmu, atau memang bukan di sana tempatnya.

Sekarang bagian cyber-nya, karena ini kelanjutan langsung dari artikel saya dua minggu lalu. OpenAI bilang Astra 6.2 adalah model paling mumpuni yang pernah mereka buat untuk cyber: naik 22 poin atas GPT-6 Astra di ExploitBench Internal Port. Dan untuk pertama kalinya, sebuah model yang mereka rilis melewati ambang "High" untuk AI self-improvement — kemampuan mempercepat riset dan pengembangan AI itu sendiri. Definisi OpenAI: dampaknya setara memberi setiap peneliti mereka satu engineer riset tambahan yang sangat mumpuni.

Itu kalimat yang seharusnya membuat siapa pun berhenti sejenak. Karena di paragraf yang sama, OpenAI mengumumkan guardrail yang lebih ketat untuk bantuan cyber berisiko tinggi. Polanya jelas: makin tajam pisaunya, makin tebal sarungnya. Buat para defender yang sudah terverifikasi, OpenAI menyiapkan jalur Daybreak — akses dengan penolakan yang dikurangi. Buat yang lain, pintunya justru makin sempit. Saya rasa itu keputusan yang benar, meski saya juga tahu akan ada yang mengeluh "modelnya makin pelit".

Ada satu catatan kaki yang saya rasa penting, terutama buat yang pernah mengikuti proyek gateway saya. Pada 20 November, OpenAI memperbarui kebijakan penggunaannya: menurut ringkasan harian Zinbiel, router dan gateway AI yang memberi akses langsung ke model OpenAI kini harus melewati review dan persetujuan OpenAI. Saya tidak akan mengomentari panjang-lebar soal itu di sini — saya cuma mencatatnya, karena arahnya jelas: era gateway liar yang sekadar meneruskan API makin dipersempit dari sisi platformnya sendiri.

Jadi, buat siapa rilis ini? Kalau kamu membayar API untuk pekerjaan panjang — slide, spreadsheet, dokumen hukum, riset — Astra 6.2 adalah upgrade yang langka: lebih bagus dan lebih murah sekaligus. Kalau kamu memakai model setiap hari untuk coding dan tugas berantai, Sol 6.2 mungkin adalah jawaban yang selama ini kamu tunggu: hampir selevel flagship dengan seperlima biaya. Dan kalau kamu bekerja di keamanan, perhatikan dua sisi koinnya: kemampuan naik 22 poin, tapi guardrail juga naik — uji sendiri sebelum memutuskan.

Satu hal yang tidak berubah: semua angka benchmark di atas adalah klaim OpenAI dan lembaga independen yang saya baca, bukan hasil reproduksi saya sendiri. Saya belum sempat menjalankan benchmark itu di mesin saya — dan saya tidak akan berpura-pura sudah. Yang sudah saya lakukan adalah membaca pengumumannya, membaca reaksi orang yang sudah memakai, dan menghitung ulang mana angka yang konsisten dari sumber ke sumber. Sejauh ini, ceritanya konsisten: flagship turun harga, yang murah makin pintar, dan cyber makin tajam.

Itu kabar baik — dengan catatan kaki yang makin panjang.

Sumber yang saya baca: [pengumuman resmi OpenAI di forum developer](https://community.openai.com/t/gpt-6-2-astra-and-sol-are-now-available/1417531?ref=apidog.com), [laporan The Decoder](https://the-decoder.com/openai-launches-gpt-6-2-astra-and-sol-with-lower-api-prices-and-some-benchmark-gains/), [analisis ExplainX](https://explainx.ai/blog/openai-gpt-6-2-astra-sol-launch-pricing-benchmarks-november-2026), [hasil Artificial Analysis dan Agent Arena](https://www.linkedin.com/company/arenaai/), dan [ringkasan harian Zinbiel 21 November](https://zinbiel.net/daily-ai-engineering-brief-2026-11-21/) untuk perubahan kebijakan 20 November. Kutipan pengguna forum berasal dari thread pengumuman OpenAI yang sama.

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
