---
title: "Le Chonk Lepas Kandang: Mistral Membuka Bobot Model 1 Triliun Parameternya"
description: "Mistral Large 4 akhirnya bisa diunduh siapa pun, tiga minggu setelah preview-nya. Angka coding-nya memimpin di kubu open-weight, tapi cerita yang lebih menarik adalah soal keamanan siber — dan soal siapa yang sebenarnya bisa menjalankan model sebesar ini."
date: 2026-10-30T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - AI
  - DeepSeek
  - Open Source
  - NVIDIA
cover:
  image: /assets-img/banner-mistral-large-4-le-chonk-terbuka.jpg
  alt: Ilustrasi seekor kucing gempal berwarna oranye keemasan yang duduk santai di atas tumpukan server gelap beraksen hijau zamrud, metafora model raksasa Mistral Large 4 yang bobotnya kini terbuka
---

Ada pola yang mulai terasa akrab belakangan ini: sebuah lab mengumumkan model besar, publikasi preview-nya cuma lewat API, lalu janji bobotnya menyusul. Bedanya, kali ini janji itu ditepati — dan tepat waktu, nyaris di ujung bulan seperti yang dijanjikan.

Pada 29 Oktober, Mistral merilis bobot Mistral Large 4, model andalannya yang dijuluki "Le Chonk". Tiga minggu sebelumnya, pada 6 Oktober, model ini baru muncul sebagai preview lewat API. Versi yang bisa diunduh sekarang bukan versi preview itu: Mistral bilang mereka menghabiskan tiga minggu berikutnya untuk reinforcement learning tambahan, dan hasilnya diklaim membawa lompatan besar di coding dan keamanan siber defensif.

Buatku, ini adalah rilis open-weight paling menarik dari Eropa sejauh ini, bukan karena ukurannya semata. Satu triliun parameter total, sekitar 52 miliar yang aktif per token, multimodal bawaan, konteks satu juta token — angka-angka itu memang menggoda. Tapi yang membuatku berhenti membaca lebih pelan adalah dua hal: klaimnya soal keamanan siber, dan kejujuran yang agak langka soal risiko modelnya sendiri.

## Angka coding yang memang memimpin — di kubu terbuka

Mari mulai dari klaim yang paling mudah dicek, dengan catatan penting: semua angka di bawah ini berasal dari Mistral sendiri, belum dari pengujian independen atas checkpoint yang baru dirilis.

Di FrontierCode 2.0 milik Cognition, benchmark yang menilai kualitas kode end-to-end sampai ke pertanyaan apakah maintainer repo mau me-merge perubahan buatan agen, Large 4 mencetak 19,7% — tertinggi di antara model open-weight. Di Artificial Analysis Coding Agent Index, ia mencetak 48%, praktis seri dengan GLM-5.3, tapi dengan token 47% lebih sedikit per tugas. Dan di Terminal-Bench 4.0, skornya naik 13 poin dari preview menjadi 41%, dengan token output 30% lebih sedikit.

Tiga mode reasoning baru — Low, Medium, dan High sebagai default — memberi developer tuas yang selama ini sering hilang dari model API: memilih sendiri seberapa dalam model harus berpikir, dan membayar sesuai itu. Menurutku ini detail yang lebih penting daripada satu angka benchmark. Model yang bagus tapi cuma punya satu setelan adalah model yang memaksa semua tugas membayar harga tugas tersulit.

Tapi ada sisi lain yang wajib ditulis di paragraf yang sama, bukan di catatan kaki. Di FrontierCode 2.0 yang sama, Claude Opus 5.5 mencetak 46% — lebih dari dua kali lipat. Di Artificial Analysis Intelligence Index v5, Large 4 mencetak 26, tertinggi di antara model open-weight Barat, tapi masih di belakang model-model terbuka dari Tiongkok. Jadi kalimat yang jujur bukan "model terbaik", melainkan "model terbuka terbaik di coding, yang masih tertinggal jauh dari model tertutup terbaik". Dua kalimat itu terdengar mirip, tapi artinya beda jauh.

## Dibangun untuk defender — dengan pengakuan yang jarang terdengar

Bagian paling menarik dari pengumuman ini justru bukan coding, melainkan keamanan siber. Mistral memposisikan Large 4 sebagai model untuk para defender: menemukan kerentanan di codebase, mereproduksinya, memvalidasinya, lalu menambalnya tanpa merusak fungsi yang sudah ada. Di Artificial Analysis Cyber Index, yang mengukur persis alur itu, ia mencetak 51%.

Yang membuatku menghargai rilis ini adalah pengakuannya. Mistral menulis terus terang bahwa mereka memantau pemakaian terkait keamanan siber di traffic live-nya, dan meskipun model itu menolak serangan black-box terhadap target live, mereka melihat "potensi peningkatan kemampuan untuk melakukan serangan nyata". Kalimat seperti itu jarang muncul di pengumuman rilis yang biasanya penuh selebrasi. Guardrail-nya sedang diubah, dan varian khusus penetration testing hanya diberikan ke mitra enterprise yang sudah melewati vetting ketat, untuk sistem yang dimiliki sendiri atau sudah diotorisasi secara eksplisit.

Di sisi lain, guardrail bawaan model ini diklaim menolak rata-rata 96,6% permintaan siber yang berbahaya di JailbreakBench, StrongREJECT, dan AgentHarm — tertinggi yang pernah diukur Mistral di antara model terbuka. Angka itu tetap klaim vendor, dan pengujian independen atas checkpoint final masih perlu waktu. Tapi arahnya jelas: Mistral mencoba membuktikan bahwa model yang berguna untuk defender tidak harus menjadi model yang menolak semua pekerjaan keamanan, dan model yang terbuka tidak harus menjadi model yang tanpa rem.

Ada satu kutipan dari pengumuman ini yang menurutku layak diingat, dari Pierre Stock, VP Science Mistral, kepada Reuters:

> "I'm not comfortable living in a world in which open weights do not exist."

Begitu bobotnya keluar, katanya, akses tidak mungkin lagi dibendung. Itu melindungi pengguna dari risiko diputus aksesnya — tapi juga berarti siapa pun bisa memakainya. Buatku, kalimat itu adalah inti dari seluruh perdebatan open-weight: kebebasan yang sama yang melindungi defender juga mempersenjatai penyerang, dan tidak ada lisensi yang bisa menyelesaikan ketegangan itu sendirian.

## Terbuka, tapi bukan untuk laptop saya

Di sinilah saya perlu jujur soal posisi saya sendiri. "Bisa diunduh siapa pun" bukan berarti "bisa dijalankan siapa pun". Checkpoint FP8-nya saja berukuran lebih dari satu terabyte, dan resep serving resminya memakai delapan GPU kelas data center. Varian NVFP4 yang lebih ringkas menargetkan empat GPU Blackwell. Dengan Mac 8 GB saya, model ini tetap akan saya pakai lewat API, bukan di mesin sendiri — dan itu tidak apa-apa.

Yang berubah dengan rilis ini bukan siapa yang bisa menjalankannya di rumah, melainkan siapa yang memegang kendali. Organisasi bisa memeriksa, mengustomisasi, dan men-deploy model ini di infrastruktur mereka sendiri, tanpa bergantung pada Mistral untuk melayaninya lewat API. Lisensinya, Mistral Ecosystem Open-Weight License — turunan MIT yang dimodifikasi — mengizinkan pemakaian, modifikasi, fine-tuning, dan komersialisasi, dengan satu syarat: perusahaan yang menjual model ini sebagai layanan (Model-as-a-Service) wajib mengantongi lisensi komersial terpisah dari Mistral.

Harga API-nya sendiri dipatok $0,70 per juta token input, $0,07 untuk cached input, dan $2,10 per juta token output. Model ini juga sudah tersedia lewat Mistral Studio, OpenRouter, Microsoft Foundry sebagai cloud provider pertama, dan kontainer NVIDIA NIM. Buat tim yang sudah memakai DeepSeek atau Kimi minggu-minggu lalu, ini menambah satu opsi Eropa di meja yang sama — dengan karakter yang lebih defensif dan lebih hemat token.

Buatku, dari dulu ukurannya sederhana: sebuah rilis itu bagus bukan saat angkanya paling besar, tapi saat ia memberi saya sesuatu yang bisa saya periksa sendiri. Bobot yang bisa diunduh, lisensi yang bisa dibaca, dan pengakuan risiko yang ditulis tanpa disembunyikan — tiga hal itu membuat Le Chonk layak dicoba, diuji, dan diperdebatkan, bukan cuma dikagumi dari kejauhan. Dan kalau pengujian independen nanti membuktikan angkanya meleset, bobot yang sudah terbuka itu justru yang membuat koreksinya mungkin.

Sumber utama: pengumuman resmi Mistral, [Mistral Large 4 (Le Chonk) is now open weight](https://mistral.ai/news/mistral-large-4-oss/), dan liputan [Reuters](https://www.reuters.com/legal/litigation/mistral-ai-publicly-releases-large-4-targets-cybersecurity-users-2026-10-29/) serta [The Decoder](https://the-decoder.com/paris-based-mistral-releases-le-chonk-a-strong-coding-model-that-still-trails-china-overall/) soal rilis yang sama.

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
