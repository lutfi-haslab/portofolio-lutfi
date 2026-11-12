---
title: "Claude Sekarang Ikut Meeting — dan Bukan Cuma Buat Nyatet"
description: "Anthropic merilis Claude Sheets, Whiteboards, Meetings, dan Data dalam satu pekan — di minggu yang sama dengan IPO roadshow-nya. Claude berubah dari chatbot jadi rekan kerja yang duduk di meja rapat. Pertanyaannya: apakah kita memang mau dia di sana?"
date: 2026-11-12T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
lang: id
tags:
  - AI
  - Anthropic
  - Claude
cover:
  image: /assets-img/banner-claude-ikut-meeting.jpg
  alt: Banner informatif Claude ikut meeting — 4 produk workplace, 9.000+ konektor, 144 fungsi Sheets
---

Saya benci rapat. Bukan karena orangnya — karena ritual sesudahnya. Seseorang bilang "nanti saya share notulennya", lalu notulen itu tidak pernah dibaca siapa pun, dan seminggu kemudian orang yang sama bertanya lagi, "tadi kita sepakat harganya berapa ya?"

Jadi waktu Anthropic mengumumkan Claude Meetings pada 10 November 2026, saya langsung duduk tegak. Bukan karena saya suka rapat. Justru karena saya membayangkan rapat di mana pertanyaan itu bisa dijawab saat rapatnya masih jalan — oleh peserta rapat yang bukan manusia.

Dan Meetings ini bukan satu-satunya. Dalam satu pekan yang sama, Anthropic merilis empat produk sekaligus: Claude Sheets, Claude Whiteboards, Claude Meetings, dan Claude Data. Plus konektor interaktif yang membuka aplikasi mitra langsung di dalam Claude. Ini bukan update kecil. Ini Anthropic yang menyatakan: Claude bukan lagi chatbot yang kamu buka kalau butuh. Dia rekan kerja yang duduk di meja yang sama.

## Yang duduk di meja rapatmu

Claude Meetings ini yang paling bikin saya penasaran, sekaligus paling bikin saya mikir dua kali.

Cara kerjanya begini: Claude masuk ke panggilan Google Meet sebagai peserta yang terlihat — bukan bot diam-diam di latar belakang. Dia memposting pemberitahuan di chat meeting begitu bergabung, mengikuti percakapan, dan mulai mengerjakan sesuatu *selagi* orang-orang masih bicara. Bukan menunggu rapat selesai baru merangkum. Dia bisa menggambar rencana di whiteboard saat diskusi berlangsung, menarik angka dari aplikasi yang terhubung, dan menjawab pertanyaan di chat meeting dari transkrip — misalnya, "tadi kita sepakat harganya berapa?" — tanpa ada yang harus menggulir rekaman.

Setelah rapat selesai, catatan dan action item-nya tersimpan di claude.ai dan bisa ditanya lagi kapan pun.

Kedengarannya seperti mimpi buat siapa pun yang pernah jadi notulen dadakan. Tapi ada pagarnya, dan pagarnya penting. Claude tidak akan ikut panggilan yang ada tamu eksternal kecuali admin mengizinkan — dan dia keluar sendiri kalau ada tamu luar yang bergabung di tengah jalan. Untuk sekarang, Meetings masih beta di paket Team dan Enterprise, dan baru mendukung Google Meet. Zoom dan platform lain dijanjikan menyusul, tanpa tanggal.

Di sinilah saya berhenti sejenak. Karena begitu AI ikut rapat, kata-kata kita di ruangan itu berubah status: dari percakapan yang hilang begitu selesai, menjadi catatan yang tersimpan dan bisa dikutip. Anthropic memang memasang pemberitahuan yang terlihat dan tombol keluar otomatis itu. Tapi tetap saja — persetujuan untuk direkam sekarang bukan cuma urusan tombol "record" di tangan host, melainkan keputusan admin yang mungkin tidak pernah ditanyakan ke semua orang di ruangan itu.

## Spreadsheet, whiteboard, dan dashboard — dengan batas yang jujur

Tiga produk lainnya melengkapi paket ini. Claude Sheets adalah spreadsheet yang dibangun Claude bersama kamu: ada tab, formula, format, dan dropdown, bisa diedit bareng, dan bisa diekspor ke .xlsx atau CSV. Beta-nya mendukung 144 fungsi dengan batas 100.000 sel. Claude Whiteboards mengubah rencana yang diucapkan setengah-setengah menjadi papan bersama berisi timeline, pemilik tugas, dan tanggal — dan hasilnya bisa diubah jadi dokumen atau deck, atau dipindah ke Lucid, Miro, atau Vani dari Zoho. Claude Data — yang sebelumnya bernama Claude Dashboards — kini tersedia umum: dashboard, cerita data, dan video narasi dari gudang data dan CRM seperti Redshift, BigQuery, ClickHouse, Snowflake, dan Salesforce.

Anthropic sendiri jujur soal batasnya: Sheets masih jauh lebih ringan daripada Excel atau Google Sheets, dan mereka mengarahkan yang butuh fitur penuh ke Claude for Excel. Whiteboards dan Sheets masih beta di semua paket berbayar, dan di paket Enterprise keduanya mati secara default — admin yang harus menghidupkan. Data baru menyala otomatis untuk Enterprise pada 19 November 2026.

Kejujuran itu penting, karena hype-nya sudah jalan duluan. Di kolom komentar postingan pengumuman @claudeai di Threads, ada yang nyeletuk "Miro is done" dan ada yang bilang Sheets-lah yang pertama kali akan mereka pakai. Saya paham antusiasmenya — tapi Miro tidak selesai hanya karena Claude bisa menggambar timeline. Miro punya sepuluh tahun keunggulan di kolaborasi visual, dan Whiteboards Anthropic masih beta. Yang menarik justru bukan klaim "pengganti", melainkan fakta bahwa semua ini hidup di dalam satu tempat yang sama dengan chat Claude: rencana, angka, dan data tidak perlu pindah aplikasi.

## Bagian yang paling menarik buat developer: MCP Apps

Buat saya, bagian paling penting dari rilis ini justru yang paling tidak mencolok: konektor interaktif.

Sebelumnya, konektor Claude itu seperti remote control teks — Claude memanggil tool, tool mengembalikan teks. Sekarang, aplikasi mitra bisa terbuka langsung di dalam Claude, lengkap dengan antarmukanya sendiri, dan Claude mengedit halaman, baris, atau file yang sedang kamu buka. Kelompok pertama yang meluncur: Asana, Canva, Carta, Dropbox, monday.com, Smartsheet, Vercel, dan Webflow. Figma, Harvey, dan Shopify sedang membangun integrasinya.

Ini berjalan di atas MCP Apps — ekstensi terbuka dari Model Context Protocol yang memungkinkan server MCP membawa antarmukanya sendiri. Dan detail yang paling saya suka: aplikasi yang dibangun dengan cara ini juga berjalan di aplikasi AI lain yang mendukung ekstensi itu. Bukan kunci gembok ekosistem, melainkan standar yang bisa dipakai siapa saja.

Anthropic menyebut Claude Marketplace kini memuat lebih dari 9.000 konektor dan plugin. Setiap aksi di dalam aplikasi tetap butuh persetujuan pengguna, sama seperti aksi konektor lainnya. Dan ada juga plugin dengan skill bawaan dari Salesforce, NetSuite, dan Workday, plus auto-connect yang memungkinkan admin menyiapkan aplikasi seperti Notion atau Atlassian sekali, lalu karyawan terhubung otomatis saat pertama kali memakainya.

## Kenapa minggu ini, kenapa sekaligus

Waktu peluncurannya bukan kebetulan. Sehari sebelumnya, 9 November, Anthropic merilis Claude Fable 5.2 dan Mythos 5.2 — model yang diklaim sampai 30% lebih cepat dengan harga turun ke $8/$40 per satu juta token dan konteks 1 juta token. Di minggu yang sama, Anthropic juga memulai roadshow IPO-nya, dengan saham di kisaran $70–78 dan target valuasi yang menembus $1 triliun.

Baca ketiganya bersamaan dan pesannya jelas: Anthropic tidak lagi menjual diri ke investor sebagai "perusahaan model". Dia menjual diri sebagai platform tempat kerja. Modelnya makin cepat dan murah, dan di atasnya sekarang ada spreadsheet, whiteboard, rapat, dan dashboard — wilayah yang selama ini dikuasai Microsoft 365 dan Copilot.

Itu langkah yang berani, tapi juga langkah yang jujur soal kelemahannya. Microsoft punya puluhan tahun distribusi enterprise dan Excel yang tidak tergantikan. Anthropic punya keunggulan lain: semua produknya lahir dari satu asisten yang sama, dengan satu konteks yang sama. Spreadsheet-mu tahu apa yang dibahas di rapatmu, karena yang membangun keduanya adalah Claude yang sama.

## Jadi, mau dia duduk di meja kita?

Saya sudah lama berpendapat bahwa batas berikutnya dari AI bukan kepintaran modelnya, melainkan tempat dia diizinkan berada. Chatbot tinggal di tab browser — kamu yang datang kepadanya. Asisten yang ikut rapat, mengedit spreadsheet-mu, dan membuka aplikasimu sudah pindah alamat: dia tinggal di alur kerjamu.

Itu bisa jadi hal terbaik yang terjadi buat tim yang tenggelam di rapat dan spreadsheet. Atau bisa jadi hal yang paling mengganggu, kalau pagar privasinya tidak ditegakkan dan setiap kalimat di ruangan berubah jadi data yang tersimpan.

Untuk sekarang, saya akan mencoba Sheets dan Whiteboards dulu — keduanya sudah tersedia di paket berbayar — dan menunggu Meetings sampai jelas soal persetujuan dan penyimpanan rekamannya. Karena pertanyaan yang sebenarnya bukan "apakah Claude bisa ikut rapat", melainkan "apakah kita memang mau dia di sana". Dan itu pertanyaan yang jawabannya tidak ada di pengumuman produk mana pun. Ada di keputusan tiap tim, satu rapat demi satu rapat.

Sumber: [pengumuman Claude Sheets, Whiteboards, dan Meetings](https://codingislove.com/claude-sheets-whiteboards-meetings/), [laporan Superpower Daily soal Claude Meetings](https://superpowerdaily.com/posts/anthropic-adds-claude-meeting-participation-with-work-starting-during-calls), [postingan pengumuman @claudeai di Threads](https://www.threads.com/@claudeai/post/DfkchzQEXbw), dan [rangkuman berita AI 11 November 2026](https://www.bestaiutility.com/blog/ai-news-roundup-november-11-2026).

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
