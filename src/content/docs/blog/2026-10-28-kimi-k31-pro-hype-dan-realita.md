---
title: "Kimi K3.1 Pro: Hype-nya Kencang, Buktinya Masih Setengah Jalan"
description: "Moonshot AI merilis Kimi K3.1 Pro dengan klaim nyaris menyamai Claude Opus 5.5, lalu minta maaf soal kuota dua hari kemudian. Di antara demo yang viral dan angka benchmark, mana yang benar-benar bisa dipegang?"
date: 2026-10-28T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - Kimi
  - AI
  - Open Source
cover:
  image: /assets-img/banner-kimi-k31-pro-hype-dan-realita.jpg
  alt: Ilustrasi bulan sabit besar di atas gerbang besi yang setengah terbuka dengan cahaya hijau zamrud, metafora model open-weight yang dijanjikan tapi belum sepenuhnya dibuka
---

Timeline saya minggu lalu isinya satu hal: Kimi. Video demo game Unity yang jadi dalam sekali prompt, katedral 3D dari sketsa, spreadsheet keuangan ribuan rumus. Kalau cuma menonton demo, rasanya seperti semua orang tiba-tiba menemukan model gratis yang mengalahkan segalanya.

Saya sudah cukup lama menonton siklus seperti ini untuk tidak langsung percaya. Demo itu panggung. Yang menarik justru apa yang terjadi setelah panggungnya beres — dan minggu ini, ceritanya jadi jauh lebih menarik dari sekadar demo.

## Apa yang sebenarnya dirilis

Pada 23 Oktober, Moonshot AI merilis [Kimi K3.1 Pro](https://kimi.ai/blog/kimi-k3-1-pro): model pertama dari seri K3.1, yang mereka sebut model open-weight kelas 3T paling mumpuni sejauh ini. Penting untuk diluruskan: ini bukan arsitektur baru. K3.1 Pro adalah Kimi K3 yang di-post-training jauh lebih besar — reinforcement learning gabungan di ratusan domain — di atas kerangka yang sama: 2,8 triliun parameter total, 104 miliar aktif per token, konteks 1 juta token, multimodal.

Harganya ikut turun, bukan naik: API $2 per juta token input dan $10 output (cache $0,20), dari K3 yang $3/$15. Ada varian Highspeed yang diklaim 2–3 kali lebih cepat dengan harga $4/$20. Modelnya sudah bisa dipakai di kimi.ai, aplikasi Kimi, Kimi Work, Kimi Code, dan API. Tapi satu hal yang belum bisa dilakukan sampai tulisan ini dibuat: mengunduhnya. Bobot model dijanjikan rilis paling lambat 4 November, dan per 28 Oktober belum ada kabar ia rilis lebih awal — juga belum ada lisensi yang diumumkan.

Jadi untuk sekarang, sebutan "open-weight" untuk K3.1 Pro masih berupa janji. Presedennya bagus — K3 dijanjikan 27 Juli dan benar-benar mendarat 27 Juli — tapi janji tetaplah janji, bukan file yang bisa diunduh.

## Angka vendor vs angka independen

Di atas kertas vendor, K3.1 Pro memang menggoda. Terminal-Bench 4.0: 65,7%, di depan GPT-6 Astra (58,2%) dan tipis di belakang Claude Opus 5.5 (66,4%). BenchCAD dengan tools: 92,7%, mendekati Opus 5.5 (96,2%). OfficeQA Pro v2 diklaim terbaik: 64,4. Tingkat halusinasi di stress test internal turun dari 23,4% ke 8,3%.

Tapi baca catatan kakinya, karena Moonshot sendiri yang menulisnya: K3.1 Pro diuji dengan harness Claude Code, sementara skor rival diambil dari nilai maksimum yang mereka laporkan di blog masing-masing atau leaderboard resmi. Itu bukan satu eksperimen terkontrol. Bukan berarti angkanya bohong — tapi ini angka dari pihak yang berkepentingan, dan belum ada yang mereproduksinya di luar.

Angka independen pertama datang dari [Artificial Analysis](https://artificialanalysis.ai/models/kimi-k3-1-pro): skor 55 di Intelligence Index, peringkat 4 dari 215 model, di belakang Opus 5.5 (58), Sonnet 5.5 (56), dan Muse Wonder Full (56). Dalam pengujian Terminal-Bench versinya sendiri, Artificial Analysis justru mengukur 67% — tertinggi dari model mana pun yang mereka uji. Di GDPval-AA, tolok ukur kerja kantor nyata, K3.1 Pro meraih 1.846 Elo, peringkat 3.

Penulis independen Simon Willison, yang langsung mencobanya lewat API di hari rilis, menulis kalimat yang paling sering dikutip minggu ini:

> "This is the first time a (soon-to-be) open weight model has scored this highly against the frontier." — [Simon Willison](https://simonwillison.net/2026/Oct/23/kimi-k31-pro/)

Tanda kurungnya penting: *soon-to-be*. Bahkan orang yang paling antusias pun menulisnya dengan catatan.

Ada sisi yang kurang enak dari angka independen itu. Artificial Analysis mencatat K3.1 Pro memakai sekitar 14% lebih banyak token output per tugas, sehingga biaya per tugasnya kurang lebih sama dengan K3 meski harga per token turun. Murah per token, belum tentu murah per pekerjaan.

## Bagian paling menarik justru bukan benchmark-nya

Bagian blog Moonshot yang paling jarang dibahas di video-video viral adalah bagian keamanan sibernya. Moonshot bercerita terus terang: seiring post-training diskalakan, kemampuan model menemukan dan mengeksploitasi kerentanan ikut naik. Untuk rilis open-weight ini, mereka sengaja menghapus data terkait siber dari mid-training dan dari lingkungan RL.

Hasilnya, di benchmark internal xdev-bench-hard, checkpoint tanpa pemangkasan itu menyelesaikan 90,5% tugas, sementara model final yang dirilis berhenti di 81,0%. Moonshot menulis prinsipnya begini:

> "We aim not to release open weights that would extend the absolute frontier of cyber capability."

Saya menghargai kejujuran semacam ini — dan mencatat batasnya, karena ini evaluasi internal atas data yang mereka pilih sendiri. Tapi sebagai preseden, ini langkah yang sehat.

## Lalu hype-nya menabrak kenyataan

Dua hari setelah rilis, akun X Kimi memposting permintaan maaf. Intinya, pelanggan kena rate limit dan kuotanya terkuras sia-sia oleh pemanggilan sub-agent yang tidak perlu. Moonshot mereset 25% kuota bulanan semua pelanggan — setara satu minggu pemakaian — dan menyesuaikan parameter supaya kuota lebih awet. Reuters [melaporkan](https://www.reuters.com/world/asia-pacific/moonshot-resets-subscriber-quotas-after-kimi-k31-pro-launch-issues-2026-10-26/) permintaan maaf itu pada 26 Oktober. Bunyi postingnya:

> "We're sorry for the rate limits and unnecessary quota consumption on the K3.1 Pro subscription plan." — [akun X Kimi (@Kimi_Moonshot)](https://www.reuters.com/world/asia-pacific/moonshot-resets-subscriber-quotas-after-kimi-k31-pro-launch-issues-2026-10-26/)

Ini bukan detail kecil. Ini memperlihatkan sisi lain dari model agentik yang sedang dijual semua orang: ketika model memanggil puluhan sub-agent untuk satu tugas, tagihannya bukan cuma token — tapi juga kuota, antrean, dan kesabaran pelanggan. Hype soal "agent swarm" selalu terdengar keren sampai Anda yang membayar meterannya.

Di sisi lain, sempat beredar tuduhan soal postingan berbayar tanpa label di X seputar peluncuran ini. Sampai artikel ini ditulis, tuduhan itu masih berupa allegation yang belum terverifikasi — dokumennya belum terautentikasi, asalnya belum jelas, belum ada respons resmi yang terkonfirmasi. Saya tidak akan menulisnya sebagai fakta, tapi saya juga tidak akan pura-pura tidak melihatnya: di minggu peluncuran sebesar ini, skeptis itu sehat.

Sementara itu di Threads, keramaian K3.1 Pro jauh lebih kecil daripada di X — kebanyakan repost dan konten edukasi yang mendaur ulang angka dari blog Moonshot, bukan kesan pemakaian pertama yang orisinal. Polanya konsisten: X tempat peluncurannya meledak, Threads tempat ia dijelaskan ulang.

## Jadi, apa yang saya tunggu?

Tiga hal, semuanya bertanggal 4 November. Pertama, apakah bobotnya benar-benar mendarat — dan di bawah lisensi apa. Kedua, apakah benchmark independen pada bobot yang sudah bisa diunduh itu mengonfirmasi skor API-nya, atau justru mengoreksinya. Ketiga, apakah ada host pihak ketiga yang ikut menyajikannya, karena itu yang akan menentukan harga riilnya di pasar, bukan harga katalog Moonshot.

Dan satu catatan praktis: kalaupun bobotnya rilis tepat waktu, model 2,8 triliun parameter bukan sesuatu yang Anda jalankan di laptop. Ini pekerjaan infrastruktur kelas data center. Bagi kebanyakan dari kita, "open" di sini artinya bisa diaudit, di-host oleh pihak ketiga, dan tidak terkunci pada satu vendor — bukan "gratis di laptop saya".

K3.1 Pro terasa seperti titik balik yang tertunda: model open-weight pertama yang benar-benar mengintip dari balik pagar frontier, tapi pagarnya belum dibuka. Tanggal 4 November akan menentukan apakah cerita ini berakhir sebagai tonggak, atau sekadar minggu yang ramai.

Saya akan menunggu file-nya, bukan videonya.

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
