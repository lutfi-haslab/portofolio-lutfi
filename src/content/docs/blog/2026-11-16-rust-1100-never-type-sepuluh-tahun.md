---
title: "Rust 1.100: Sepuluh Tahun Menunggu Satu Tanda Seru"
description: "Rust 1.100.0 akhirnya menstabilkan never type setelah sepuluh tahun dan lima kali gagal — tapi ada breaking change kecil yang menyertainya, plus Cargo yang kini bisa menahan dependensi baru selama tiga hari demi keamanan supply chain."
date: 2026-11-16T00:00:00.000Z
authors:
  - Lutfi Ikbal Majid
  - Bewustein (Muse)
lang: id
tags:
  - Rust
  - Golang
  - Open Source
cover:
  image: /assets-img/banner-rust-1100-never-type-sepuluh-tahun.jpg
  alt: Banner informatif Rust 1.100 — never type stabil setelah 10 tahun, 5 kali gagal, rating TIOBE 1,63 persen
---

Ada angka yang kalau dilihat sekilas terasa seperti tonggak, tapi sebenarnya cuma angka. Rust 1.100 adalah salah satunya — dan justru itu yang bikin saya senyum sendiri waktu membacanya. Seratus rilis minor. Bukan versi 2.0, bukan rewrite besar-besaran, cuma angka bulat yang kebetulan jatuh di minggu yang sama dengan salah satu fitur yang paling lama ditunggu dalam sejarah bahasa ini: never type, si tanda seru `!`, akhirnya stabil. Setelah sepuluh tahun. Setelah lima kali percobaan stabilisasi yang gagal.

Saya sudah cukup lama mengikuti Rust untuk tahu: kalau tim Rust bilang "lima kali gagal", itu bukan drama. Itu lima kali mereka menemukan alasan yang sah untuk menahan sesuatu yang kelihatannya sepele. Dan alasan itu, ternyata, memang layak ditunggu.

## Tanda seru yang akhirnya boleh ditulis di mana saja

Buat yang belum akrab: never type, ditulis `!`, adalah tipe untuk komputasi yang tidak pernah menghasilkan nilai — fungsi yang tidak pernah kembali, cabang kode yang tidak pernah tercapai. Selama ini kamu sudah bisa melihatnya bekerja di balik layar: `return`, `break`, dan `std::process::exit` semuanya bertipe `!`, dan kompiler memakainya untuk memahami bahwa kode setelahnya tidak bisa dijangkau. Yang baru di 1.100 adalah kamu akhirnya boleh *menulisnya sendiri di mana saja*.

Contoh paling gampangnya dari pengumuman resmi: `Result<T, !>` — sebuah Result yang error-nya mustahil terjadi. Dulu menulis itu tidak diizinkan; sekarang boleh, dan kompiler langsung paham bahwa `let Ok(v) = res;` tidak mungkin gagal.

Bersamaan dengan itu, `Infallible` — tipe lama yang selama ini dipakai sebagai pengganti `!` di API standar — resmi dijadikan alias dari never type. Semua API lama yang memakai `Infallible` jadi kompatibel dengan `!` tanpa perlu diubah satu-satu. Elegan, dan ini memang rencana sejak `Infallible` diperkenalkan dulu.

Tapi di sinilah ada "tapi"-nya, dan saya justru menghargai cara tim Rust menuliskannya dengan jujur di pengumuman.

## Breaking change yang (hampir) tidak terasa

Untuk mengubah `Infallible` menjadi alias, tim Rust harus mengubah satu perilaku lama: "never type fallback" — tipe yang diasumsikan kompiler ketika sebuah ekspresi bertipe `!` tidak dijelaskan — berubah dari `()` menjadi `!` di edisi sebelum 2024 (2015, 2018, dan 2021). Edisi 2024 sudah memakai perilaku baru ini sejak awal, jadi yang kena dampak hanya proyek di edisi lama.

Kata tim Rust, perubahan ini "sebagian besar tidak terasa", tapi bisa muncul di kasus langka — misalnya saat mengabaikan hasil fungsi yang mengembalikan parameter generik — dan bisa membuat kompiler mendeteksi lebih banyak kode sebagai unreachable. Mereka sudah memberi peringatan kompatibilitas jauh-jauh hari dan merilis perbaikan untuk crate publik yang rusak karenanya. Jadi kalau ada dependensimu yang tiba-tiba gagal build setelah `rustup update stable`, perbarui dependensinya dulu sebelum panik. Kemungkinan besar perbaikannya sudah ada.

Ini Rust yang saya kenal: breaking change-nya kecil, diumumkan dengan terus terang, dan mitigasinya dikerjakan sebelum rilis, bukan sesudah ada yang komplain.

## Tiga hal lain yang diam-diam penting

Pertama, **Allocator API**. Bagian inti dari `allocator_api` kini stabil: library author bisa mendefinisikan allocator kustom yang dipakai bersama `Vec` dan `Box` lewat trait `Allocator` yang baru. Ini fondasi, bukan garis finis — koleksi dan tipe pointer lain menyusul — tapi buat yang menulis sistem dengan kebutuhan alokasi khusus, ini pintu yang selama ini terkunci.

Kedua, **DropGuard**. Rust memang sudah punya `Drop`, tapi mengimplementasikan trait cuma untuk menjalankan kode saat fungsi keluar terasa berlebihan. `DropGuard::new` membungkus variabel plus closure yang dijalankan saat guard di-drop, dengan `dismiss` untuk membatalkannya. Contoh di pengumuman: parser yang memotong kembali `Vec` kalau ada string yang gagal di-parse — rollback transaksional dalam belasan baris. Saya suka API kecil seperti ini: tidak mengubah paradigma, cuma menghilangkan gesekan.

Ketiga, **`conjure_zst`**. Ada satu fungsi baru yang namanya terdengar seperti mantra: `std::mem::conjure_zst`, cara resmi untuk membuat nilai dari zero-sized type di kode unsafe — menggantikan sulap lama seperti mentransmutasi `()` atau `MaybeUninit::uninit().assume_init()`. Dan contoh yang dipakai pengumuman itu menarik buat saya pribadi: token `Python<'py>` di PyO3, penanda zero-sized yang membuktikan kamu sedang memegang GIL Python. Mengarang token itu dari udara kosong akan merusak jaminan keamanan PyO3. Jadi fungsi ini unsafe, dan memang seharusnya begitu. Saya sedang belajar binding Python–Rust lewat PyO3, jadi detail kecil ini terasa seperti pesan langsung: fondasi di bawah kakimu sedang dirapikan, pelan-pelan.

## Cargo belajar sabar: pending dependensi tiga hari

Bagian yang paling saya suka justru bukan di bahasa, tapi di Cargo. Rust 1.100 menstabilkan `min-publish-age` — alias *dependency cooldowns*. Kamu bisa mengatur Cargo untuk tidak mengambil versi dependensi yang baru diterbitkan kurang dari, katakanlah, tiga hari:

```toml
[registry]
global-min-publish-age = "3 days"
```

Logikanya sederhana dan sulit dibantah: versi paket yang jahat biasanya ketahuan dalam hitungan jam atau hari setelah diterbitkan, entah oleh scanner otomatis atau komunitas. Menunggu tiga hari tidak membuatmu ketinggalan apa-apa yang penting, tapi menutup jendela serangan yang paling sering dipakai. Saat `cargo update`, Cargo akan memberitahumu apa yang ditahan — "Adding clap 4.6.7 (available: 4.6.9, published 2 days ago)" — dan kamu bisa memaksa satu update kalau memang butuh, dengan `CARGO_RESOLVER_INCOMPATIBLE_PUBLISH_AGE=allow`.

Tim Rust sendiri jujur soal batasnya: cooldown mengurangi risiko, bukan menghilangkannya. Tetap tinjau update dependensimu seperti biasa. Tapi buat saya ini arah yang benar: keamanan supply chain yang tidak menuntutmu jadi ahli keamanan, cuma menuntutmu menunggu sebentar.

Cargo juga kini memberi peringatan untuk dependensi yang tidak terpakai (`cargo::unused_dependencies`, aktif secara default) dan memperbaiki tabrakan cache antar konfigurasi build — dua hal yang dampaknya terasa di proyek besar, meski tidak pernah masuk headline.

## Ironi kecil dari TIOBE: rating naik, peringkat turun

Ada satu ironi yang tidak bisa saya lewatkan. Di minggu yang sama Rust merilis 1.100, indeks TIOBE November 2026 mencatat Rust keluar dari 10 besar — digeser Go yang kembali ke peringkat 10 dengan rating 1,69%. Padahal rating Rust sendiri *naik*, dari 1,44% ke 1,63%. Rust masuk 10 besar Juli lalu dan bertahan sampai Oktober; selisihnya dengan Go cuma 0,06 poin persentase.

Saya tidak akan membesar-besarkan TIOBE — indeks ini mengukur hasil pencarian, bukan kualitas bahasa — tapi ada sesuatu yang lucu dan jujur di angka itu: bahasa bisa membaik di semua metrik yang penting dan tetap kehilangan satu peringkat karena tetangganya membaik sedikit lebih cepat. Sementara itu, di sisi lain, ada proyek kecil seperti benchfmt.rs yang meminjam workflow benchmarking Go ke Rust dan menemukan Rust mendekode varint sekitar 899 MB/s berbanding 563 MB/s di Go. Peringkat boleh turun; angka mentahnya tetap bicara sendiri.

Buat saya, Rust 1.100 bukan rilis yang berteriak. Tidak ada fitur yang mengubah cara saya menulis kode besok pagi. Tapi ada sepuluh tahun kesabaran yang akhirnya selesai, satu breaking change yang diumumkan tanpa drama, dan satu fitur keamanan supply chain yang membuat ekosistemnya sedikit lebih dewasa. Bahasa yang merayakan angka 100 dengan cara seperti ini — dengan merapikan fondasi, bukan menambah kembang api — adalah bahasa yang saya percaya untuk jangka panjang.

`rustup update stable`, lalu lihat sendiri apa yang berubah di proyekmu. Kalau ada yang rusak, kemungkinan besar cuma dependensi lama yang perlu diperbarui.

Sumber: [pengumuman resmi Rust 1.100.0](https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/), [indeks TIOBE November 2026](https://www.techrepublic.com/article/news-tiobe-november-2026-java-overtakes-cpp/), [benchfmt.rs di Hacker News](https://zeli.app/story/50369462).

*Ditulis oleh **Lutfi Ikbal Majid** bersama **Bewustein (Muse)**, asisten AI saya.*
