#!/usr/bin/env python3
"""Blog banner composer — Lutfi Ikbal Majid's portfolio.

Takes a raw AI-generated background image (no text) and composites the
approved informative overlay on top of it: tag kicker, big title (+ optional
subtitle), 2-3 key-stat cards taken from the article, and the author line.
Plain general style per Lutfi's approval (2026-11-01): NO date, NO reading
time, NO URL.

Render pipeline: HTML template -> headless Chrome screenshot (2048x1152)
-> JPG via Pillow.

Usage:
  python3 make_banner.py \
    --bg raw.jpg --out banner-<slug>.jpg \
    --title "Empat Pemburu Bug, Satu Pola" \
    --subtitle "dan Label 'Uncensored' yang Sering Kosong" \
    --tags "AI, Security, Open Source" \
    --stat "<7%::true positive scanner AI serampangan, kata tim Google" \
    --stat "20.799 -> 7.245::kandidat bug Cloudflare yang lolos validasi" \
    --stat "4 lab, 1 pola::temukan, bantah, tambal"

Stats use Indonesian number formatting (dots for thousands, comma decimals).
If --subtitle is omitted and the title contains " — ", it is split there.
"""
import argparse
import html
import os
import subprocess
import sys
import tempfile

CHROME_CANDIDATES = [
    os.environ.get("CHROME_BIN", ""),
    os.path.expanduser("~/workspace/haslab-marketing/video/node_modules/.remotion/chrome-for-testing/linux64/chrome-linux64/chrome"),
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
]

TEMPLATE = """<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    width: 2048px; height: 1152px; overflow: hidden;
    font-family: "Noto Sans", sans-serif; color: #f3f4f6; background: #030712;
  }}
  .frame {{ position: relative; width: 2048px; height: 1152px; }}
  .bg {{
    position: absolute; inset: 0;
    background-image: url("file://{bg}");
    background-size: cover; background-position: center;
  }}
  .scrim {{
    position: absolute; inset: 0;
    background:
      linear-gradient(90deg, rgba(3,7,18,0.93) 0%, rgba(3,7,18,0.82) 46%, rgba(3,7,18,0.25) 78%, rgba(3,7,18,0.10) 100%),
      linear-gradient(0deg, rgba(3,7,18,0.88) 0%, rgba(3,7,18,0.0) 34%);
  }}
  .content {{ position: absolute; inset: 0; padding: 84px 96px; display: flex; flex-direction: column; }}
  .middle {{ margin-top: auto; margin-bottom: auto; max-width: 1330px; }}
  .kicker {{
    font-family: "Noto Sans Mono", monospace; font-size: 27px; letter-spacing: 5px;
    color: #67e8f9; margin-bottom: 30px; text-transform: uppercase;
  }}
  h1 {{ font-size: {title_size}px; line-height: 1.06; font-weight: 800; letter-spacing: -1px; }}
  h1 .thin {{ display: block; font-weight: 600; color: #a7f3d0; font-size: 62px; margin-top: 20px; letter-spacing: 0; }}
  .stats {{ display: flex; gap: 26px; margin-top: 54px; }}
  .stat {{
    background: rgba(3,7,18,0.66); border: 2px solid rgba(110,231,183,0.30);
    border-radius: 22px; padding: 24px 30px; max-width: 560px;
  }}
  .stat .num {{ font-size: 46px; font-weight: 800; color: #6ee7b7; line-height: 1; white-space: nowrap; }}
  .stat .lbl {{ font-size: 24px; color: #d1d5db; margin-top: 10px; line-height: 1.35; }}
  .bottombar {{
    display: flex; justify-content: space-between; align-items: center;
    border-top: 2px solid rgba(243,244,246,0.16); padding-top: 34px;
  }}
  .author {{ display: flex; align-items: center; gap: 22px; }}
  .avatar {{
    width: 76px; height: 76px; border-radius: 50%;
    background: linear-gradient(135deg, #059669, #0e7490);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 30px; color: #ecfdf5;
    border: 3px solid rgba(110,231,183,0.6);
  }}
  .author .name {{ font-size: 32px; font-weight: 700; }}
  .author .sub {{ font-size: 24px; color: #9ca3af; margin-top: 3px; }}
</style>
</head>
<body>
  <div class="frame">
    <div class="bg"></div>
    <div class="scrim"></div>
    <div class="content">
      <div class="middle">
        <div class="kicker">{kicker}</div>
        <h1>{title}{subtitle_html}</h1>
        {stats_html}
      </div>
      <div class="bottombar">
        <div class="author">
          <div class="avatar">LM</div>
          <div>
            <div class="name">Lutfi Ikbal Majid</div>
            <div class="sub">bersama Bewustein (Muse)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
"""


def find_chrome() -> str:
    for cand in CHROME_CANDIDATES:
        if cand and os.path.isfile(cand) and os.access(cand, os.X_OK):
            return cand
    sys.exit("ERROR: no Chrome binary found (set CHROME_BIN)")


def main() -> None:
    ap = argparse.ArgumentParser(description="Compose an informative blog banner.")
    ap.add_argument("--bg", required=True, help="raw background image (no text), 2048x1152")
    ap.add_argument("--out", required=True, help="output JPG path")
    ap.add_argument("--title", required=True)
    ap.add_argument("--subtitle", default="")
    ap.add_argument("--tags", default="", help='comma separated, e.g. "AI, Security"')
    ap.add_argument("--stat", action="append", default=[], help='"NUMBER::label" (repeat 2-3x)')
    args = ap.parse_args()

    title = args.title.strip()
    subtitle = args.subtitle.strip()
    if not subtitle and " — " in title:
        title, subtitle = (p.strip() for p in title.split(" — ", 1))

    # Scale the title down a bit when it is long, so it never overflows.
    title_size = 104 if len(title) <= 34 else (88 if len(title) <= 52 else 74)

    kicker = " &nbsp;&nbsp;•&nbsp;&nbsp; ".join(
        html.escape(t.strip()) for t in args.tags.split(",") if t.strip()
    )

    stats = []
    for raw in args.stat[:3]:
        if "::" not in raw:
            sys.exit(f"ERROR: --stat must be 'NUMBER::label', got: {raw}")
        num, lbl = (p.strip() for p in raw.split("::", 1))
        # Arrows render better as a glyph than as ASCII.
        num = html.escape(num).replace("-&gt;", "→").replace("--&gt;", "→")
        stats.append(f'<div class="stat"><div class="num">{num}</div><div class="lbl">{html.escape(lbl)}</div></div>')
    stats_html = f'<div class="stats">{"".join(stats)}</div>' if stats else ""

    subtitle_html = f'<span class="thin">{html.escape(subtitle)}</span>' if subtitle else ""

    page = TEMPLATE.format(
        bg=os.path.abspath(args.bg),
        title_size=title_size,
        kicker=kicker,
        title=html.escape(title),
        subtitle_html=subtitle_html,
        stats_html=stats_html,
    )

    chrome = find_chrome()
    with tempfile.TemporaryDirectory() as td:
        html_path = os.path.join(td, "banner.html")
        png_path = os.path.join(td, "banner.png")
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(page)
        subprocess.run(
            [chrome, "--headless=new", "--no-sandbox", "--use-angle=swiftshader",
             "--disable-gpu", "--hide-scrollbars", "--window-size=2048,1152",
             f"--screenshot={png_path}", f"file://{html_path}"],
            check=True, capture_output=True, timeout=180,
        )
        from PIL import Image
        im = Image.open(png_path)
        assert im.size == (2048, 1152), f"unexpected size {im.size}"
        im.convert("RGB").save(args.out, quality=88)
    print(f"OK {args.out} ({os.path.getsize(args.out)} bytes)")


if __name__ == "__main__":
    main()
