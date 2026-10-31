#!/usr/bin/env python3
"""Regenerate ALL blog banners with the approved informative template.
Backgrounds live in tools/banner/raw/; stats are taken from each article's
own text (verified during the 2026-11-01 regeneration pass).
"""
import subprocess
import sys

BASE = "/home/hatch/workspace/portofolio-lutfi"
GEN = f"{BASE}/tools/banner/make_banner.py"
RAW = f"{BASE}/tools/banner/raw"
OUT = f"{BASE}/public/assets-img"

# slug -> (raw, out, title, subtitle, tags, [stats])
JOBS = {
    "ngapain": ("ngapain-bikin-tools-ai-sendiri-raw.jpg", "banner-tools-ai-sendiri.jpg",
        "Ngapain Bikin Tools AI Sendiri?", "Catatan dari Dapur Haslab", "AI, Golang, Open Source",
        ["<20 ms::overhead proxy MyAiRouter, gateway AI buatan sendiri",
         "1 binary::prinsip ForgeADE: semua jadi satu binary native",
         "1 daemon Go::KendaliAI, gerbang semua channel dan agen"]),
    "deepinfer": ("deepinfer-mesin-inference-deepseek-dibuka-raw.jpg", "banner-deepinfer-mesin-inference-deepseek-dibuka.jpg",
        "DeepSeek Akhirnya Membuka Dapur Inference-nya", "dan Itu Bukan Buat Laptop Kita", "AI, DeepSeek, Open Source",
        ["SM100 + Ascend 950::hanya dua target hardware yang didukung resmi",
         "155 T token/hari::klaim skala klaster produksi DeepSeek, angka mereka",
         "Open source::DeepInfer dibuka ke publik, bukan dapur tertutup lagi"]),
    "kimi": ("kimi-k31-pro-hype-dan-realita-raw.jpg", "banner-kimi-k31-pro-hype-dan-realita.jpg",
        "Kimi K3.1 Pro: Hype-nya Kencang,", "Buktinya Masih Setengah Jalan", "Kimi, AI, Open Source",
        ["2,8T parameter::104B aktif dengan context 1M token, klaim Moonshot",
         "$2 / $10::harga API per juta token input dan output",
         "55::skor Intelligence Index dari Artificial Analysis"]),
    "tsrs": ("tsrs-typescript-rust-yang-ditulis-agen-raw.jpg", "banner-tsrs-typescript-rust-yang-ditulis-agen.jpg",
        "tsrs: Compiler TypeScript yang Ditulis Agen, Bukan Manusia", "dan Kenapa Itu Bukan Lelucon", "TypeScript, Rust, Open Source",
        ["37.000 file::TypeScript di monolit Olympus milik Owner.com",
         "10×::port TypeScript ke Go saja sudah secepat itu",
         "8×::klaim plafon kecepatan tsrs, bukan janji"]),
    "gelembung": ("gelembung-ai-china-pecah-raw.jpg", "banner-gelembung-ai-china-pecah.jpg",
        "Gelembung AI di China Sudah Pecah, Bukan Akan Pecah", "", "AI, China, Pasar Saham",
        ["-40%::indeks STAR50 dalam kurang dari empat bulan",
         "250× laba::valuasi puncak STAR50, Nasdaq 100 hanya ±30×",
         "±$480 miliar::nilai pasar yang menguap dalam koreksinya"]),
    "mistral": ("mistral-large-4-le-chonk-terbuka-raw.jpg", "banner-mistral-large-4-le-chonk-terbuka.jpg",
        "Le Chonk Lepas Kandang", "Mistral Membuka Bobot Model 1 Triliun Parameternya", "AI, Open Source, NVIDIA",
        ["1 triliun::parameter total Mistral Large 4, kini open weight",
         "96,6%::klaim penolakan permintaan siber berbahaya",
         "$0,70 / $2,10::harga API per juta token input dan output"]),
    "binance": ("binance-dibobol-bitcoin-tidak-jebol-raw.jpg", "banner-binance-dibobol-bitcoin-tidak-jebol.jpg",
        "Binance Dibobol 6,3 Miliar Dolar", "Bitcoin-nya? Tidak Ikut Jebol.", "Kripto, Bitcoin, Keamanan Siber",
        ["$6,36 miliar::keluar dari dompet Binance dalam ±20 menit",
         "±$3 miliar::berhasil dibekukan Tether, Circle, dan partner",
         "18.270 BTC::di luar jangkauan pembekuan siapa pun"]),
    "rust": ("rust-masuk-cpython-python-316-raw.jpg", "banner-rust-masuk-cpython-python-316.jpg",
        "Python Mau Kemasukan Rust", "Bukan Rewrite, Tapi Pintu Kecil Bernama zlib", "Python, Rust, Open Source",
        ["1 modul dulu::zlib, pintu masuk pertama Rust ke CPython",
         "3.16::versi Python yang ditarget membawa backend Rust",
         "Akhir 2026::PEP kriteria sukses disiapkan lebih dulu"]),
    "golang": ("golang-and-web-frameworks-raw.jpg", "banner-golang-and-web-frameworks.jpg",
        "Golang and Web Frameworks", "", "Architecture, Go, Backend",
        ["2 framework::Gin dan Fiber dibandingkan head-to-head",
         "2 use case::microservices dan aplikasi cloud-native"]),
    "vibe": ("vibe-coding-raw.jpg", "banner-vibe-coding.jpg",
        "Vibe Coding", "The Programming Revolution Taking 2025 by Storm", "AI, Coding",
        ["5 langkah::alur kerja vibe coding versi artikel ini",
         "1 prompt::dari deskripsi bahasa natural jadi kode awal",
         "2025::tahun vibe coding menjadi arus utama"]),
    "multiagent": ("autonomous-multi-agent-orchestration-raw.jpg", "banner-autonomous-multi-agent-orchestration.jpg",
        "Designing Autonomous Multi-Agent Orchestration", "with Live Telemetry", "AI, Agents, TypeScript",
        ["3 pilar desain::worktree terisolasi, telemetri live, guard hooks",
         "WebSocket::tool call dan thought stream ter-stream real-time",
         "Git worktree::mutasi file tiap agen terisolasi per tugas"]),
    "smartcontract": ("build-smart-contract-api-raw.jpg", "banner-build-smart-contract-api.jpg",
        "Build Smart Contract REST API", "", "Blockchain, Solidity, Web3",
        ["Solidity::smart contract yang diekspos lewat REST API",
         "8545::port Ganache lokal untuk deploy dan pengujian",
         "MetaMask::dompet untuk tanda tangan dan faucet testnet"]),
    "airouter": ("building-a-lightweight-ai-router-raw.jpg", "banner-building-a-lightweight-ai-router.jpg",
        "Designing an Ultra-Low Footprint AI Gateway in Go", "Architecture Notes", "Architecture, AI, Go",
        ["1.000::MaxIdleConns pada custom Go HTTP transport",
         "90 detik::IdleConnTimeout untuk koneksi upstream",
         "sync.Pool::buffer zero-copy, minim alokasi di jalur panas"]),
    "docker": ("docker-and-docker-compose-raw.jpg", "banner-docker-and-docker-compose.jpg",
        "Docker and Docker Compose", "A Practical Guide for Modern Software Engineering", "Architecture, DevOps",
        ["2 alat::Docker untuk container, Compose untuk orkestrasinya",
         "1 file YAML::docker-compose.yml mendefinisikan seluruh stack",
         "1 perintah::docker compose up menjalankan semua service"]),
    "macos": ("macos-disk-space-raw.jpg", "banner-macos-disk-space-ncdu-df.jpg",
        "Analyze & Clean Disk Space on macOS", "Using ncdu and df", "macOS, Tips, Tools",
        ["2 tools::ncdu untuk analisis, df untuk cek cepat",
         "500 GB::disk contoh di artikel, 390 GB terpakai",
         "78%::tingkat pemakaian disk pada contoh kasusnya"]),
    "astro": ("introduction-to-astro-raw.jpg", "banner-introduction-to-astro.jpg",
        "Introduction to Astro", "", "Architecture, Web",
        ["4 konsep inti::.astro files, Islands, Routing, Data Fetching",
         "Islands::JavaScript hanya di komponen yang membutuhkan",
         "0 JS::halaman ringan tanpa JavaScript yang tak perlu"]),
    "git": ("mastering-git-raw.jpg", "banner-mastering-git-commit-messages.jpg",
        "Mastering Git", "Writing Meaningful Commit Messages", "Git, Best Practices",
        ["50 karakter::batas ringkasan pesan commit yang baik",
         "5 aturan::imperatif, ringkas, tautkan issue, fokus, review",
         "1 commit::satu perubahan logis untuk satu pesan"]),
    "wails": ("native-workspace-architecture-raw.jpg", "banner-native-workspace-wails-vs-electron.jpg",
        "Why We Chose Wails & Go Over Electron", "ForgeADE's Architecture", "Architecture, Desktop, Go",
        ["<80 MB::target baseline memory ForgeADE",
         "180–350 MB::RAM shell Electron kosong sebelum buka file",
         "0 Chromium::Wails memakai WebView bawaan sistem operasi"]),
    "richtext": ("rich-text-editor-raw.jpg", "banner-rich-text-editor-for-react.jpg",
        "Rich Text Editor for React", "or NextJS, with S3 Image Upload", "React, Next.js, Editor",
        ["S3::gambar editor diunggah langsung ke AWS S3",
         "1 handler::image upload handler untuk toolbar editor",
         "React + Next.js::dua framework yang dicakup panduan ini"]),
    "fastlane": ("unlocking-fastlane-raw.jpg", "banner-unlocking-fastlane-programming.jpg",
        "Unlocking the Fast Lane", "Accelerate Your Programming Journey", "Programming, Coding",
        ["6 langkah::peta jalan mempercepat perjalanan programming",
         "30 menit::praktik coding harian minimal yang disarankan",
         "1 proyek nyata::belajar lewat membangun, bukan cuma teori"]),
}


def main() -> None:
    only = sys.argv[1:] or list(JOBS)
    failed = []
    for key in only:
        raw, out, title, subtitle, tags, stats = JOBS[key]
        cmd = [sys.executable, GEN, "--bg", f"{RAW}/{raw}", "--out", f"{OUT}/{out}",
               "--title", title, "--tags", tags]
        if subtitle:
            cmd += ["--subtitle", subtitle]
        for s in stats:
            cmd += ["--stat", s]
        r = subprocess.run(cmd, capture_output=True, text=True)
        print(("OK  " if r.returncode == 0 else "FAIL"), key, r.stdout.strip() or r.stderr.strip()[-200:])
        if r.returncode != 0:
            failed.append(key)
    if failed:
        sys.exit(f"FAILED: {failed}")


if __name__ == "__main__":
    main()
