---
title: "DeepSeek Merilis Agen yang Katanya Mengintip Chat Tim — Padahal Tidak Begitu"
description: "Headline-nya bilang Super-agent DeepSeek mengawasi chat developer tanpa diminta. README resminya bilang sebaliknya: ia hanya bertindak bila diminta, atau bila ada aturan tertulis dari tim. Bedah klaim vs kode yang benar-benar dirilis."
date: 2026-11-02T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
tags:
  - AI
  - DeepSeek
  - Open Source
cover:
  image: /assets-img/banner-deepseek-super-agent-mengintip-chat-tim.jpg
  alt: Banner informatif Super-agent DeepSeek — 7.214 bintang GitHub, simulasi p95 15,7 menit, dan hanya 1 repositori yang didengarkan
---

Judul berita yang pertama kali lewat di depanku hari Minggu kemarin bunyinya kurang lebih begini: DeepSeek merilis agen AI yang mengawasi chat developer dan memperbaiki bug tanpa diminta. Refleksku langsung dua arah sekaligus. Sebagai engineer, aku penasaran. Sebagai orang yang pernah ikut grup chat tim yang isinya setengah curhat dan setengah keluhan soal deadline, aku agak ngeri.

Jadi sebelum ikut-ikutan menyebarkan headline itu, aku melakukan hal yang seharusnya dilakukan siapa pun sebelum berkomentar: membuka repositorinya sendiri.

Dan ternyata ceritanya beda. Bukan sedikit beda — beda di bagian yang paling penting.

## Yang benar-benar dirilis

Pada 31 Oktober 2026, tim DeepSeek Harness memublikasikan [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype) di GitHub, di bawah lisensi MIT. Saat aku mengeceknya pagi ini, repositori itu sudah mengumpulkan 7.214 bintang dan 736 fork, padahal isinya baru satu commit. Itu angka yang gila untuk sebuah prototipe — dan justru karena itulah aku makin curiga pada ringkasan-ringkasan yang beredar.

README-nya dibuka dengan peringatan yang ditulis dengan huruf tebal, bukan basa-basi: ini *research prototype for reference only, not an official DeepSeek product*. Kode ini tumbuh dari pekerjaan sehari-hari timnya, sebagian besar ditulis oleh coding agent juga, dan DeepSeek sendiri bilang kode ini mungkin masih mengandung bug dan belum siap produksi. Versi publiknya pun diakui tidak identik dengan versi internal yang mereka pakai, dan sebagian desain yang dibahas di artikel pendampingnya — *Exploring Super-agent Design: Towards a More Autonomous Agent System* — belum diimplementasikan di prototipe ini.

Jadi ini bukan produk. Ini cetak biru yang dibuka ke publik, lengkap dengan disclaimer-nya.

## Yang sebenarnya ia lakukan

Definisi resminya jauh lebih sempit daripada headline-nya: dsh-superagent adalah agen coding proaktif untuk **satu** repositori GitHub, dikemas sebagai bundle untuk DeepSeek Harness. Ia mendengarkan GitHub dan, opsional, Feishu — aplikasi chat kantornya ByteDance — lalu ketika ada anggota tim yang diizinkan meminta pekerjaan, ia membuka satu work item, mengerjakannya di sesi dan direktorinya sendiri, dan menjawab di percakapan yang sama, misalnya dalam bentuk pull request. Ada panel web yang hanya menampilkan hal-hal yang butuh manusia.

Bagian yang paling penting ada di satu kalimat README ini, dan aku kutip karena ini inti dari seluruh rilis:

> Ia bertindak hanya ketika diminta, atau ketika aturan yang ditulis tim mengizinkannya, dan berbicara hanya ketika seseorang harus bertindak atau bisa memakai hasilnya.

Prinsipnya dirumuskan sebagai: ambil perhatian manusia seminimal mungkin, beri nilai semaksimal mungkin. Tapi kalimat lanjutannya justru yang paling jujur: agen yang bisa bertindak untuk satu tim juga bisa *membuang* perhatian satu tim. Makanya perilaku default-nya dibatasi. Pekerjaan yang tidak diminta, menurut dokumentasi yang diringkas sejumlah ulasan awal, dimulai dalam mode yang hanya mencatat apa yang *seandainya* dilakukan agen — bukan langsung mengeksekusi.

Jadi tidak, prototipe ini tidak diam-diam mengintip grup chatmu lalu mendorong perbaikan ke repo saat kamu tidur. Ia bisa membaca pesan yang tidak menyebutnya hanya di tempat-tempat yang memang tim izinkan untuk ia terima sepenuhnya. Beda tipis di kata-kata, beda jauh di konsekuensi.

Arsitekturnya sendiri menarik buat dipelajari, terlepas dari hype-nya. Ada satu sesi Router yang persisten — yang ngobrol dengan manusia dan menjaga konteks bersama — dan sesi Worker terpisah yang mengerjakan tiap tugas secara paralel, sehingga agen bisa menerima permintaan baru sebelum tugas lama selesai. Ini jawaban atas masalah klasik agen coding: satu sesi yang antre panjang dan kehilangan konteks di tengah jalan. Harganya? Kompleksitas. Dan DeepSeek sendiri mengakui empat masalah yang belum terjawab: bagaimana Router diskalakan saat satu Router tidak lagi cukup, bagaimana agen berkolaborasi saat ia tidak lagi tinggal di jendela chat, bagaimana batas konteks digambar saat organisasi membesar, dan bagaimana mengamankan agen cloud yang menjangkau mesin penggunanya sendiri.

## Angka yang ada — dan yang tidak ada

DeepSeek memang menaruh angka di meja, tapi angka ini wajib dibaca dengan labelnya. Dalam simulasi internal yang dilaporkan MarkTechPost, Super-agent menyelesaikan tugas dengan p95 15,7 menit, berbanding 29,5 menit untuk baseline satu sesi — kira-kira 1,9 kali lebih cepat. Simulasinya: sekitar 300 pesan per run, yang hanya sekitar 20 di antaranya permintaan kerja sungguhan, masing-masing skema dijalankan lima kali.

Perhatikan kata-katanya: simulasi, pesan sintetis, alat yang disimulasikan. Kualitas coding sungguhan tidak diukur di sini. Tidak ada benchmark perbandingan akurasi coding melawan Claude Code atau Codex di repositori ini. Bloomberg, yang pertama kali membingkai rilis ini sebagai tantangan langsung ke Claude Code, benar soal arah kompetisinya — DeepSeek memang membentuk tim Harness awal tahun ini untuk bersaing di lapisan agen, dan baru saja mengumpulkan sekitar 100 miliar yuan (sekitar 15 miliar dolar AS) menjelang IPO yang direncanakan. Tapi "menantang Claude Code" sebagai narasi pasar bukan berarti "mengalahkan Claude Code" sebagai fakta teknis. Dua hal yang berbeda, dan artikel-artikel yang mencampuradukkannya sedang menjual cerita, bukan data.

Bagian setup-nya juga memberi gambaran soal siapa targetnya saat ini. Kamu butuh akun GitHub khusus untuk agen, Node.js 22.19 atau lebih baru, GitHub CLI 2.48 atau lebih baru, plus pnpm, Git, Python, dan tmux. Hanya github.com yang didukung, bukan GitHub Enterprise Server. Dan karena sesi Router dan Worker berjalan dengan akses penuh sebagai user sistem operasi yang menjalankannya, ulasan-ulasan awal mengingatkan untuk memakai akun terpisah demi isolasi. Ini bukan alat yang kamu pasang lima menit lalu kamu lupakan. Ini alat yang kamu pelajari di repo buangan dulu.

## Kenapa aku tetap menganggap rilis ini penting

Setelah semua koreksi itu, kenapa aku masih menulis tentangnya? Karena ide yang paling berharga di sini bukan "agen yang bekerja sendiri". Ide yang paling berharga adalah *anggaran perhatian*.

Selama ini agen coding dijual dengan janji "tidak perlu repot". Kenyataannya, agen yang cerewet — yang berkomentar di tiap thread, membuka PR setengah jadi, dan menanyakan hal yang sudah dijawab tiga pesan di atas — justru menambah pekerjaan. DeepSeek menuliskan prinsip sebaliknya ke dalam desainnya: diam adalah default, bicara adalah pengecualian yang harus dibenarkan. Kalau prinsip itu bertahan sampai ke produk sungguhan, itu perubahan yang lebih besar daripada sekadar kecepatan 1,9 kali lipat dalam simulasi.

Ada juga pergeseran yang lebih luas. Dua minggu lalu aku menulis soal DeepInfer, mesin inference DeepSeek yang dibuka. Sekarang mereka membuka lapisan harness-nya. Polanya konsisten: DeepSeek tidak hanya membuka model, mereka membuka perkakas di sekeliling model. Buat developer yang membangun tools sendiri — dan itu memang caraku bekerja — lapisan inilah yang paling bisa dipelajari, karena di sinilah keputusan desainnya terlihat: apa yang diizinkan agen, kapan ia diam, dan siapa yang memegang kendali.

Jadi sikapku terhadap Super-agent begini: jangan pasang di repo produksi minggu ini, jangan biarkan ia membaca chat tim yang berisi hal sensitif tanpa aturan tertulis, dan jangan percaya headline yang bilang ia mengintip. Tapi bacalah README dan dokumen filosofinya. Cetak biru yang jujur soal batasannya sendiri itu langka — dan biasanya justru dari situlah ide yang paling bisa dipakai berasal.

Sumber: [repositori dsh-superagent-prototype di GitHub](https://github.com/deepseek-ai/dsh-superagent-prototype), laporan Bloomberg soal rilis ini, dan ringkasan teknis [MarkTechPost](https://www.marktechpost.com/2026/11/01/deepseek-dsh-superagent-router-worker-coding-agent/?amp=1).

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
