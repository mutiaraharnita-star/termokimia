#!/usr/bin/env python3
"""Produce the three original, silent TermoKimia XI teaching videos.

Requirements: Python + Pillow, ffmpeg with libx264, ffprobe, DejaVu fonts.
Run from any directory: python scripts/generate-videos.py [--prepare-only]
No external images, recordings, or network requests are used.
"""
from __future__ import annotations

import argparse
import json
import math
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "videos"
W, H, FPS = 1280, 720, 24
CREAM, GREEN, TERRA = "#f7f7ef", "#234b3d", "#ad573d"
LIGHT, LINE, INK, WHITE = "#e5ece3", "#cbd7cb", "#243b32", "#ffffff"
FONT_DIR = Path("/usr/share/fonts/truetype/dejavu")
FONT = FONT_DIR / "DejaVuSans.ttf"
BOLD = FONT_DIR / "DejaVuSans-Bold.ttf"


def scene(title, seconds, kind, paragraphs, **data):
    return {"title": title, "seconds": seconds, "kind": kind,
            "paragraphs": paragraphs, **data}


VIDEOS = {
    "m1": {
        "title": "Ke mana kalor berpindah?", "module": "KONSEP DASAR TERMOKIMIA",
        "scenes": [
            scene("Tetapkan sistem terlebih dahulu", 10, "system", [
                "Pada kompor, sistem adalah zat-zat yang mengalami reaksi pembakaran.",
                "Panci, air, dan udara di sekitarnya merupakan lingkungan."
            ]),
            scene("Ikuti arah perpindahan kalor", 11, "heat", [
                "Kalor adalah energi yang berpindah karena perbedaan suhu.",
                "Dalam contoh pembakaran, sistem melepaskan kalor. Lingkungan menerima kalor; air menghangat."
            ]),
            scene("Hubungkan kalor dengan entalpi", 12, "condition", [
                "Pada tekanan tetap, dengan hanya kerja ekspansi atau kompresi, qₚ = ΔH.",
                "qₚ dan ΔH bertanda positif ketika sistem menerima kalor, serta negatif ketika sistem melepaskan kalor."
            ]),
            scene("Tanda mengikuti sistem", 11, "exoendo", [
                "Eksoterm: kalor keluar dari sistem; ΔH < 0.",
                "Endoterm: kalor masuk ke sistem; ΔH > 0."
            ]),
            scene("Hitung produk dikurangi reaktan", 14, "enthalpy", [
                "Model ilustrasi pada basis jumlah reaksi yang sama: H reaktan = 80 kJ; H produk = 30 kJ.",
                "ΔH = H produk − H reaktan = 30 − 80 = −50 kJ. Produk lebih rendah; proses eksoterm."
            ], reverse=False),
            scene("Balik arah, balik tanda ΔH", 12, "enthalpy", [
                "Pada reaksi balik, keadaan awal dan akhir bertukar.",
                "ΔH balik = 80 − 30 = +50 kJ. Produk lebih tinggi; proses endoterm."
            ], reverse=True),
            scene("Baca sumbu diagram dengan tepat", 10, "axes", [
                "Sumbu vertikal menunjukkan entalpi relatif. Sumbu horizontal menunjukkan kemajuan reaksi.",
                "Diagram ini tidak langsung menunjukkan suhu, waktu, atau laju reaksi."
            ]),
            scene("Gunakan empat langkah ini", 10, "recap1", [
                "Tentukan sistem → ikuti arah kalor → baca tanda ΔH → periksa posisi produk.",
                "Selalu gunakan ΔH = H produk − H reaktan."
            ]),
        ],
    },
    "m2": {
        "title": "Larutan hangat, reaksi bertanda apa?", "module": "KALORIMETRI",
        "scenes": [
            scene("Mulai dari model kalorimeter", 12, "calorimeter", [
                "Model ilustrasi: kalor wadah dan kehilangan kalor ke luar diabaikan; kalor jenis tetap, tanpa perubahan fase.",
                "Tekanan tetap; hanya kerja ekspansi atau kompresi. Massa yang dipakai ialah massa larutan."
            ]),
            scene("Hitung perubahan suhu", 10, "temperature", [
                "Massa larutan 100 g. Suhu awal 25 °C dan suhu akhir 30 °C.",
                "ΔT = T akhir − T awal = 30 − 25 = +5 °C."
            ]),
            scene("Larutan menerima kalor", 12, "solution", [
                "Gunakan kalor jenis model c = 4,18 J/(g·°C).",
                "q larutan = mcΔT = 100 × 4,18 × 5 = +2.090 J.",
                "Tanda positif berarti larutan menerima kalor."
            ]),
            scene("Reaksi melepaskan kalor", 12, "reaction", [
                "Pada model ideal, q reaksi + q larutan = 0.",
                "q reaksi = −q larutan = −2.090 J. Reaksi bersifat eksoterm; larutan menghangat."
            ]),
            scene("Ubah joule menjadi kilojoule", 10, "units", [
                "1 kJ = 1.000 J. Untuk mengubah J menjadi kJ, bagi dengan 1.000.",
                "q reaksi = −2.090 J = −2,090 kJ. Tanda negatif tetap dipertahankan."
            ]),
            scene("Nyatakan basis per mol", 13, "molar", [
                "Untuk jumlah reaksi model 1:1 sebanyak n = 0,050 mol:",
                "ΔH molar = q reaksi / n = −2,090 / 0,050 = −41,8 kJ/mol reaksi.",
                "Nilai per mol berbeda dari kalor total pada percobaan."
            ]),
            scene("Kalor sama, massa berbeda", 13, "mass", [
                "Jika kalor tetap +2.090 J dan massa larutan menjadi 200 g, kenaikan suhu menjadi setengah.",
                "ΔT = 2.090 / (200 × 4,18) = +2,5 °C. Dari 25 °C, suhu akhir menjadi 27,5 °C."
            ]),
            scene("Periksa tiga hal sebelum selesai", 10, "recap2", [
                "Bagian mana: larutan atau reaksi? Tanda mana: menerima atau melepas? Satuan mana: J, kJ, atau kJ/mol?",
                "Perubahan suhu saja belum cukup; massa dan kalor jenis juga berperan."
            ]),
        ],
    },
    "m3": {
        "title": "Tiga cara menggunakan data ΔH", "module": "PENENTUAN ΔH REAKSI",
        "scenes": [
            scene("Pilih metode menurut datanya", 8, "methods", [
                "Hukum Hess: data beberapa reaksi. Entalpi pembentukan: data ΔH°f tiap zat. Energi ikatan: data energi ikatan rata-rata.",
                "Semua perhitungan harus mengikuti persamaan reaksi yang ditulis."
            ]),
            scene("Hess: susun dua tahap reaksi", 14, "hess", [
                "C(grafit) + ½O₂(g) → CO(g); ΔH₁ = −111 kJ.",
                "CO(g) + ½O₂(g) → CO₂(g); ΔH₂ = −283 kJ.",
                "Data dibulatkan dan memakai kondisi yang konsisten."
            ]),
            scene("Jumlahkan reaksi dan ΔH", 12, "hesssum", [
                "CO(g) muncul pada dua sisi yang berlawanan, sehingga saling menghilangkan.",
                "C(grafit) + O₂(g) → CO₂(g); ΔH = −111 − 283 = −394 kJ.",
                "Entalpi adalah fungsi keadaan: perubahan total bergantung pada keadaan awal dan akhir."
            ]),
            scene("Ubah reaksi, sesuaikan ΔH", 11, "hessrules", [
                "Membalik reaksi maju memberi ΔH = +394 kJ.",
                "Mengalikan seluruh reaksi maju dengan 2 memberi ΔH = −788 kJ.",
                "Jika reaksi balik dikali 2, ΔH = +788 kJ."
            ]),
            scene("Gunakan entalpi pembentukan", 14, "formation", [
                "Reaksi: H₂(g) + Cl₂(g) → 2HCl(g). Data ΔH°f: H₂(g) = 0; Cl₂(g) = 0; HCl(g) = −92,3 kJ/mol.",
                "ΔH° reaksi = jumlah koefisien × ΔH°f produk − jumlah koefisien × ΔH°f reaktan.",
                "Hasil: 2 × (−92,3) − (0 + 0) = −184,6 kJ."
            ]),
            scene("Koefisien dan fase menentukan", 9, "basis", [
                "−92,3 kJ/mol ialah entalpi pembentukan per mol HCl(g).",
                "−184,6 kJ berlaku untuk persamaan yang menghasilkan 2 mol HCl(g). Pertahankan fase dan kondisi referensinya."
            ]),
            scene("Energi ikatan: putus dan bentuk", 11, "bonds", [
                "Untuk H₂(g) + Cl₂(g) → 2HCl(g), putuskan satu H–H dan satu Cl–Cl, lalu bentuk dua H–Cl.",
                "Data dalam kJ/mol ikatan: H–H = 436; Cl–Cl = 243; H–Cl = 432.",
                "Pemutusan memerlukan energi; pembentukan melepaskan energi."
            ]),
            scene("Tuliskan hasil sebagai estimasi", 11, "bondsum", [
                "Energi pemutusan = 436 + 243 = 679 kJ. Besar energi pembentukan = 2 × 432 = 864 kJ.",
                "ΔH ≈ energi pemutusan − energi pembentukan = 679 − 864 = −185 kJ.",
                "Ini estimasi untuk persamaan tersebut, memakai energi ikatan rata-rata pada fase gas."
            ]),
            scene("Empat pemeriksaan terakhir", 10, "recap3", [
                "Periksa persamaan, koefisien, fase, dan tanda.",
                "Hess menjumlahkan perubahan; data pembentukan memperhitungkan koefisien; energi ikatan menghasilkan estimasi."
            ]),
        ],
    },
}


def font(size=36, bold=False):
    if size < 32:
        raise ValueError("All displayed text must be at least 32 px")
    return ImageFont.truetype(str(BOLD if bold else FONT), size)


def text(draw, xy, value, size=36, color=GREEN, bold=False, anchor=None):
    f = font(size, bold)
    x, y = xy
    bbox = draw.textbbox((x, y), value, font=f, anchor=anchor)
    if bbox[0] < -1 or bbox[2] > W + 1 or bbox[3] > H + 1:
        raise ValueError(f"Text outside canvas: {value!r} {bbox}")
    draw.text(xy, value, font=f, fill=color, anchor=anchor)


def wrap(value, size, width, bold=False):
    f = font(size, bold)
    lines, current = [], ""
    for word in value.split():
        test = (current + " " + word).strip()
        if f.getlength(test) <= width:
            current = test
        else:
            if not current:
                raise ValueError(f"Word exceeds text width: {word}")
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def block(draw, x, y, value, width=1100, size=36, color=INK, bold=False, gap=10):
    for line in wrap(value, size, width, bold):
        text(draw, (x, y), line, size, color, bold)
        y += size + gap
    return y


def card(draw, box, fill=WHITE, outline=LINE, radius=22):
    draw.rounded_rectangle(box, radius, fill=fill, outline=outline, width=2)


def arrow(draw, start, end, color=TERRA, width=10, head=20):
    draw.line([start, end], fill=color, width=width)
    a = math.atan2(end[1] - start[1], end[0] - start[0])
    points = [end,
              (end[0] - head * math.cos(a - .55), end[1] - head * math.sin(a - .55)),
              (end[0] - head * math.cos(a + .55), end[1] - head * math.sin(a + .55))]
    draw.polygon(points, fill=color)


def heading(draw, video, item, index, total):
    text(draw, (64, 34), "TERMOKIMIA XI", 32, GREEN, True)
    text(draw, (1216, 34), f"{index:02d} / {total:02d}", 32, GREEN, anchor="ra")
    title_size = 48
    while font(title_size, True).getlength(item["title"]) > 1152:
        title_size -= 2
    if title_size < 36:
        raise ValueError("Title too long")
    text(draw, (64, 100), item["title"], title_size, GREEN, True)
    text(draw, (64, 168), video["module"], 32, TERRA)
    draw.line((64, 215, 1216, 215), fill=LINE, width=2)
    text(draw, (64, 662), "Video teks • tanpa suara", 32, GREEN)
    text(draw, (1216, 662), "Jeda untuk membaca", 32, GREEN, anchor="ra")
    draw.rectangle((0, 712, W, 719), fill=LIGHT)
    draw.rectangle((0, 712, round(W * index / total), 719), fill=TERRA)


def environment(draw, heat=False):
    card(draw, (64, 246, 1216, 614), fill=LIGHT)
    card(draw, (100, 293, 548, 562), fill=GREEN, outline=GREEN)
    text(draw, (324, 321), "SISTEM", 38, CREAM, True, "ma")
    block(draw, 136, 389, "Zat yang bereaksi dalam pembakaran", 380, 36, CREAM)
    text(draw, (890, 286), "LINGKUNGAN", 38, GREEN, True, "ma")
    # A pot and its water lie outside the indicated reaction boundary.
    draw.rounded_rectangle((785, 369, 1000, 471), 15, fill=WHITE, outline=GREEN, width=5)
    draw.rounded_rectangle((798, 409, 987, 459), 10, fill="#bad4d8")
    draw.line((1001, 390, 1040, 390), fill=GREEN, width=7)
    draw.line((1040, 390, 1040, 428, 1000, 428), fill=GREEN, width=5)
    text(draw, (890, 503), "Panci, air, udara", 34, GREEN, anchor="ma")
    if heat:
        arrow(draw, (570, 421), (749, 421), width=12)
        text(draw, (660, 359), "kalor", 34, TERRA, True, "ma")
        text(draw, (324, 513), "melepas", 34, CREAM, True, "ma")
        text(draw, (890, 558), "menerima", 34, TERRA, True, "ma")


def calorimeter(draw, x=815, y=270, temp="25 °C", mass="100 g"):
    draw.rounded_rectangle((x - 110, y + 50, x + 190, y + 294), 18, fill=WHITE, outline=GREEN, width=6)
    draw.rounded_rectangle((x - 90, y + 170, x + 170, y + 274), 10, fill="#d7e5df")
    draw.rounded_rectangle((x - 130, y + 34, x + 210, y + 61), 12, fill=GREEN)
    draw.rounded_rectangle((x + 105, y - 12, x + 130, y + 199), 10, fill=CREAM, outline=GREEN, width=4)
    draw.line((x + 117, y + 72, x + 117, y + 195), fill=TERRA, width=10)
    draw.ellipse((x + 99, y + 180, x + 135, y + 216), fill=TERRA)
    text(draw, (x - 58, y + 202), mass, 36, GREEN, True)
    if temp:
        text(draw, (x - 50, y - 30), temp, 42, TERRA, True)


def energy_diagram(draw, reverse=False, plain=False):
    x0, x1, ytop, ybottom = 735, 1193, 295, 581
    text(draw, (735, 244), "Entalpi relatif (kJ)", 32, GREEN)
    arrow(draw, (x0, ybottom), (x0, ytop), color=GREEN, width=4, head=14)
    arrow(draw, (x0, ybottom), (x1, ybottom), color=GREEN, width=4, head=14)
    text(draw, (963, 600), "Kemajuan reaksi", 32, GREEN, anchor="ma")
    r_y, p_y = (500, 337) if reverse else (337, 500)
    draw.line((785, r_y, 920, r_y), fill=GREEN, width=7)
    draw.line((1030, p_y, 1165, p_y), fill=TERRA, width=7)
    arrow(draw, (976, r_y), (976, p_y), width=8)
    text(draw, (851, r_y - 48), "Reaktan", 32, GREEN, anchor="ma")
    text(draw, (1098, p_y - 48), "Produk", 32, TERRA, anchor="ma")
    if not plain:
        text(draw, (851, r_y + 13), "30" if reverse else "80", 34, GREEN, True, "ma")
        text(draw, (1098, p_y + 13), "80" if reverse else "30", 34, TERRA, True, "ma")
        text(draw, (1020, 405), "+50" if reverse else "−50", 36, TERRA, True)


def render_slide(video, item, index, total):
    image = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(image)
    heading(d, video, item, index, total)
    k = item["kind"]
    if k in ("system", "heat"):
        environment(d, heat=k == "heat")
        # The diagram contains the facts; the short definition is given in its own strip.
        if k == "heat":
            card(d, (91, 235, 1187, 290), fill=CREAM, outline=CREAM)
            text(d, (640, 240), "Kalor berpindah karena perbedaan suhu.", 34, GREEN, anchor="ma")
    elif k == "condition":
        card(d, (64, 250, 1216, 410), fill=GREEN, outline=GREEN)
        text(d, (640, 282), "qₚ = ΔH", 76, CREAM, True, "ma")
        block(d, 90, 446, "Berlaku pada tekanan tetap, dengan hanya kerja ekspansi atau kompresi.", 1100, 38)
        text(d, (90, 563), "Menerima: positif. Melepas: negatif.", 38, TERRA, True)
    elif k == "exoendo":
        for x, title, sub, exo in [(64, "EKSOTERM", "ΔH < 0", True), (664, "ENDOTERM", "ΔH > 0", False)]:
            card(d, (x, 250, x + 552, 618))
            text(d, (x + 276, 272), title, 40, GREEN, True, "ma")
            card(d, (x + 45, 369, x + 245, 451), fill=GREEN, outline=GREEN)
            text(d, (x + 145, 390), "Sistem", 34, CREAM, True, "ma")
            if exo:
                arrow(d, (x + 266, 411), (x + 488, 411))
            else:
                arrow(d, (x + 488, 411), (x + 266, 411))
            text(d, (x + 380, 352), "Kalor", 34, TERRA, anchor="ma")
            text(d, (x + 276, 489), sub, 52, TERRA, True, "ma")
            text(d, (x + 276, 565), "Kalor keluar" if exo else "Kalor masuk", 34, GREEN, anchor="ma")
    elif k in ("enthalpy", "axes"):
        energy_diagram(d, item.get("reverse", False), plain=k == "axes")
        if k == "enthalpy":
            rev = item["reverse"]
            block(d, 64, 257, "Model ilustrasi; basis jumlah reaksi sama.", 590, 34)
            text(d, (64, 368), "ΔH = H produk − H reaktan", 36, GREEN, True)
            text(d, (64, 432), "= 80 − 30" if rev else "= 30 − 80", 42, GREEN)
            text(d, (64, 499), "+50 kJ" if rev else "−50 kJ", 62, TERRA, True)
            text(d, (64, 585), "Endoterm" if rev else "Eksoterm", 36, GREEN, True)
        else:
            block(d, 64, 270, "Tinggi diagram menunjukkan entalpi relatif.", 585, 40, GREEN, True)
            block(d, 64, 426, "Bukan suhu, waktu, atau laju reaksi.", 570, 40, TERRA, True)
    elif k == "recap1":
        steps = ["1  Tentukan sistem", "2  Ikuti arah kalor", "3  Baca tanda ΔH", "4  Periksa posisi produk"]
        for j, value in enumerate(steps):
            x = 64 if j % 2 == 0 else 664
            y = 258 + (j // 2) * 126
            card(d, (x, y, x + 552, y + 105), fill=LIGHT)
            text(d, (x + 24, y + 30), value, 34, GREEN, True)
        text(d, (640, 563), "ΔH = H produk − H reaktan", 42, TERRA, True, "ma")
    elif k == "calorimeter":
        calorimeter(d, temp="", mass="larutan")
        block(d, 64, 252, "Kalor wadah dan kalor ke luar diabaikan.", 590, 36)
        block(d, 64, 373, "Kalor jenis tetap; tanpa perubahan fase.", 590, 36)
        block(d, 64, 494, "Tekanan tetap; hanya kerja ekspansi/kompresi.", 590, 36)
    elif k == "temperature":
        calorimeter(d, temp="30 °C", mass="100 g")
        text(d, (64, 268), "25 °C → 30 °C", 54, GREEN, True)
        text(d, (64, 372), "ΔT = T akhir − T awal", 36, GREEN)
        text(d, (64, 445), "= 30 − 25", 42, GREEN)
        text(d, (64, 526), "+5 °C", 64, TERRA, True)
    elif k == "solution":
        text(d, (640, 252), "c = 4,18 J/(g·°C)", 38, GREEN, anchor="ma")
        card(d, (64, 322, 1216, 488), fill=GREEN, outline=GREEN)
        text(d, (640, 345), "q larutan = mcΔT", 48, CREAM, True, "ma")
        text(d, (640, 413), "= 100 × 4,18 × 5", 44, CREAM, anchor="ma")
        text(d, (64, 538), "+2.090 J", 60, TERRA, True)
        text(d, (470, 555), "Larutan menerima kalor.", 38, GREEN)
    elif k == "reaction":
        for x, title, result, small in [(64, "LARUTAN", "+2.090 J", "Menerima kalor"), (664, "REAKSI", "−2.090 J", "Melepas kalor")]:
            card(d, (x, 250, x + 552, 507), fill=LIGHT)
            text(d, (x + 276, 276), title, 36, GREEN, True, "ma")
            text(d, (x + 276, 349), result, 58, TERRA, True, "ma")
            text(d, (x + 276, 436), small, 36, GREEN, anchor="ma")
        text(d, (640, 543), "q reaksi = −q larutan", 44, GREEN, True, "ma")
        text(d, (640, 602), "Asumsi kalorimeter ideal", 32, TERRA, anchor="ma")
    elif k == "units":
        text(d, (640, 271), "1 kJ = 1.000 J", 54, GREEN, True, "ma")
        card(d, (64, 367, 1216, 505), fill=LIGHT)
        text(d, (640, 402), "−2.090 J ÷ 1.000 = −2,090 kJ", 47, TERRA, True, "ma")
        text(d, (640, 557), "Tanda negatif tetap dipertahankan.", 38, GREEN, anchor="ma")
    elif k == "molar":
        text(d, (640, 248), "Jumlah reaksi model 1:1: n = 0,050 mol", 37, GREEN, anchor="ma")
        text(d, (640, 321), "ΔH molar = q reaksi / n", 44, GREEN, True, "ma")
        text(d, (640, 396), "= −2,090 / 0,050", 45, GREEN, anchor="ma")
        text(d, (640, 473), "−41,8 kJ/mol reaksi", 58, TERRA, True, "ma")
        text(d, (640, 576), "Per mol ≠ kalor total percobaan", 38, GREEN, anchor="ma")
    elif k == "mass":
        text(d, (640, 245), "Kalor tetap +2.090 J; suhu awal 25 °C", 38, GREEN, anchor="ma")
        for x, mass, change, final in [(64, "100 g", "+5 °C", "30 °C"), (664, "200 g", "+2,5 °C", "27,5 °C")]:
            card(d, (x, 315, x + 552, 598), fill=LIGHT)
            text(d, (x + 276, 334), mass, 48, GREEN, True, "ma")
            text(d, (x + 276, 410), "ΔT = " + change, 42, TERRA, True, "ma")
            text(d, (x + 276, 487), "Suhu akhir", 34, GREEN, anchor="ma")
            text(d, (x + 276, 536), final, 44, GREEN, True, "ma")
    elif k == "recap2":
        lines = [("BAGIAN", "Larutan atau reaksi?"), ("TANDA", "Menerima (+) atau melepas (−)?"), ("SATUAN", "J, kJ, atau kJ/mol?")]
        for j, (a, b) in enumerate(lines):
            y = 248 + 112 * j
            card(d, (64, y, 1216, y + 93), fill=LIGHT)
            text(d, (91, y + 25), a, 34, TERRA, True)
            text(d, (303, y + 25), b, 36, GREEN)
        text(d, (640, 603), "Perhatikan juga massa dan kalor jenis.", 34, GREEN, anchor="ma")
    elif k == "methods":
        rows = [("HESS", "Data beberapa reaksi"), ("PEMBENTUKAN", "Data ΔH°f tiap zat"), ("ENERGI IKATAN", "Data energi ikatan rata-rata")]
        for j, (a, b) in enumerate(rows):
            y = 249 + 112 * j
            card(d, (64, y, 1216, y + 94), fill=LIGHT)
            text(d, (90, y + 27), a, 34, TERRA, True)
            text(d, (455, y + 27), b, 34, GREEN)
        text(d, (640, 604), "Ikuti persamaan reaksi yang ditulis.", 34, GREEN, anchor="ma")
    elif k == "hess":
        for j, (equation, enthalpy) in enumerate([
            ("C(grafit) + ½O₂(g) → CO(g)", "ΔH₁ = −111 kJ"),
            ("CO(g) + ½O₂(g) → CO₂(g)", "ΔH₂ = −283 kJ")]):
            y = 253 + 171 * j
            card(d, (64, y, 1216, y + 146), fill=LIGHT)
            text(d, (90, y + 19), equation, 42, GREEN, True)
            text(d, (90, y + 84), enthalpy, 38, TERRA, True)
        text(d, (640, 601), "Data dibulatkan; kondisi konsisten.", 34, GREEN, anchor="ma")
    elif k == "hesssum":
        text(d, (640, 254), "CO(g) pada dua sisi saling menghilangkan.", 36, GREEN, anchor="ma")
        card(d, (64, 323, 1216, 437), fill=GREEN, outline=GREEN)
        text(d, (640, 352), "C(grafit) + O₂(g) → CO₂(g)", 44, CREAM, True, "ma")
        text(d, (640, 466), "ΔH = −111 − 283 = −394 kJ", 48, TERRA, True, "ma")
        block(d, 90, 552, "Fungsi keadaan: perubahan total ditentukan oleh keadaan awal dan akhir.", 1100, 34)
    elif k == "hessrules":
        rows = [("Reaksi maju", "−394 kJ"), ("Reaksi balik", "+394 kJ"), ("2 × reaksi maju", "−788 kJ"), ("2 × reaksi balik", "+788 kJ")]
        for j, (a, b) in enumerate(rows):
            y = 243 + j * 94
            card(d, (64, y, 1216, y + 80), fill=LIGHT if j % 2 == 0 else WHITE)
            text(d, (93, y + 18), a, 38, GREEN, True)
            text(d, (1174, y + 16), b, 43, TERRA, True, "ra")
    elif k == "formation":
        text(d, (640, 246), "H₂(g) + Cl₂(g) → 2HCl(g)", 42, GREEN, True, "ma")
        text(d, (640, 306), "ΔH°f (kJ/mol): H₂  0  |  Cl₂  0  |  HCl  −92,3", 33, GREEN, anchor="ma")
        card(d, (64, 371, 1216, 512), fill=LIGHT)
        text(d, (640, 389), "Σ koefisien × ΔH°f produk", 38, GREEN, True, "ma")
        text(d, (640, 446), "− Σ koefisien × ΔH°f reaktan", 38, GREEN, True, "ma")
        text(d, (640, 556), "2 × (−92,3) − 0 = −184,6 kJ", 46, TERRA, True, "ma")
    elif k == "basis":
        for x, amount, value in [(64, "1 mol HCl(g)", "−92,3 kJ"), (664, "2 mol HCl(g)", "−184,6 kJ")]:
            card(d, (x, 255, x + 552, 510), fill=LIGHT)
            text(d, (x + 276, 289), amount, 40, GREEN, True, "ma")
            text(d, (x + 276, 386), value, 55, TERRA, True, "ma")
        block(d, 90, 552, "Entalpi pembentukan per mol HCl(g) = −92,3 kJ/mol. Perhatikan fase dan kondisi referensi.", 1100, 34)
    elif k == "bonds":
        text(d, (640, 242), "H₂(g) + Cl₂(g) → 2HCl(g)", 40, GREEN, True, "ma")
        entries = [(64, "H–H", "436", "diputus"), (464, "Cl–Cl", "243", "diputus"), (864, "H–Cl", "432", "dibentuk ×2")]
        for x, bond, energy, label in entries:
            card(d, (x, 310, x + 352, 523), fill=LIGHT)
            text(d, (x + 176, 329), bond, 44, GREEN, True, "ma")
            text(d, (x + 176, 393), energy, 48, TERRA, True, "ma")
            text(d, (x + 176, 470), label, 32, GREEN, anchor="ma")
        text(d, (640, 550), "Data: kJ/mol ikatan", 34, GREEN, anchor="ma")
        text(d, (640, 601), "Memutus perlu energi; membentuk melepas energi.", 33, TERRA, anchor="ma")
    elif k == "bondsum":
        text(d, (64, 252), "Pemutusan: 436 + 243 = 679 kJ", 40, GREEN, True)
        text(d, (64, 321), "Pembentukan: 2 × 432 = 864 kJ", 40, GREEN, True)
        card(d, (64, 398, 1216, 517), fill=GREEN, outline=GREEN)
        text(d, (640, 426), "ΔH ≈ 679 − 864 = −185 kJ", 48, CREAM, True, "ma")
        block(d, 90, 553, "Estimasi energi ikatan rata-rata pada fase gas; berlaku untuk persamaan yang ditulis.", 1100, 34)
    elif k == "recap3":
        text(d, (640, 250), "Persamaan • koefisien • fase • tanda", 42, TERRA, True, "ma")
        rows = ["Hess → jumlahkan perubahan ΔH.", "Pembentukan → gunakan koefisien tiap zat.", "Energi ikatan → nyatakan sebagai estimasi."]
        for j, value in enumerate(rows):
            y = 335 + 94 * j
            card(d, (64, y, 1216, y + 76), fill=LIGHT)
            text(d, (92, y + 18), value, 36, GREEN)
    else:
        raise ValueError(k)
    return image


def stamp(seconds):
    ms = round(seconds * 1000)
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d}.{ms % 1000:03d}"


def prepare():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {"contentVersion": "2.0-video-1", "language": "id", "hasAudio": False,
                "formatLabel": "Video penjelasan teks dan diagram bertransisi, tanpa suara.",
                "source": "PRD v2 Lampiran B; angka diperiksa terhadap KIM01–KIM06.", "videos": []}
    for key, video in VIDEOS.items():
        chunks = [video["title"], "Video penjelasan teks tanpa suara. Teks berikut memuat penjelasan dan diagram dalam video."]
        vtt = ["WEBVTT", "", "NOTE Teks penjelasan; video ini tidak memiliki audio.", ""]
        elapsed = 0.0
        chapters = []
        for item in video["scenes"]:
            chunks += [item["title"], *item["paragraphs"]]
            chapters.append({"start": elapsed, "end": elapsed + item["seconds"], "title": item["title"]})
            n = len(item["paragraphs"])
            for index, paragraph in enumerate(item["paragraphs"]):
                start = elapsed + index * item["seconds"] / n
                end = elapsed + (index + 1) * item["seconds"] / n - .04
                vtt += [f"{stamp(start)} --> {stamp(end)}", paragraph, ""]
            elapsed += item["seconds"]
        (OUT / f"{key}-transcript.txt").write_text("\n\n".join(chunks) + "\n", encoding="utf-8")
        (OUT / f"{key}-id.vtt").write_text("\n".join(vtt) + "\n", encoding="utf-8")
        manifest["videos"].append({"id": key, "title": video["title"], "videoSrc": f"/videos/{key}.mp4",
            "poster": f"/videos/{key}-poster.jpg", "captions": f"/videos/{key}-id.vtt",
            "transcript": f"/videos/{key}-transcript.txt", "durationSeconds": elapsed,
            "width": W, "height": H, "fps": FPS, "hasAudio": False,
            "captionStatus": "Teks terlihat pada video; VTT tambahan dan transkrip setara disediakan.",
            "chapters": chapters})
    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return manifest


def run(command):
    subprocess.run(command, check=True)


def render_video(key, video, work):
    module_dir = work / key
    module_dir.mkdir()
    pieces = []
    scene_count = len(video["scenes"])
    for index, item in enumerate(video["scenes"], 1):
        image = render_slide(video, item, index, scene_count)
        png = module_dir / f"{index:02d}.png"
        mp4 = module_dir / f"{index:02d}.mp4"
        image.save(png)
        if index == 1:
            image.save(OUT / f"{key}-poster.jpg", quality=93, subsampling=0)
        seconds = item["seconds"]
        # A calm dip through the cream background keeps scientific diagrams stationary.
        vf = f"fade=t=in:st=0:d=0.45:color={CREAM},fade=t=out:st={seconds-.30}:d=0.30:color={CREAM},format=yuv420p"
        run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-loop", "1", "-framerate", str(FPS),
             "-i", str(png), "-t", str(seconds), "-vf", vf, "-an", "-c:v", "libx264",
             "-preset", "veryfast", "-crf", "20", "-threads", "2", "-profile:v", "high", "-level", "3.1",
             "-pix_fmt", "yuv420p", "-r", str(FPS), str(mp4)])
        pieces.append(mp4)
        print(f"{key}: slide {index}/{scene_count} encoded", flush=True)
    concat = module_dir / "concat.txt"
    concat.write_text("\n".join(f"file '{p.as_posix()}'" for p in pieces) + "\n", encoding="utf-8")
    target = OUT / f"{key}.mp4"
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0",
         "-i", str(concat), "-c", "copy", "-movflags", "+faststart", str(target)])
    probe = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries",
        "format=duration,size:stream=codec_name,codec_type,profile,width,height,pix_fmt,r_frame_rate,duration,nb_frames",
        "-of", "json", str(target)], text=True)
    (OUT / f"{key}-probe.json").write_text(probe, encoding="utf-8")
    # Decode the entire finished video, not just its container metadata.
    run(["ffmpeg", "-hide_banner", "-v", "error", "-i", str(target), "-f", "null", "-"])
    print(f"{key}: complete and full decode passed", flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prepare-only", action="store_true", help="Write transcripts, VTT, manifest, and preview contact sheets.")
    parser.add_argument("--module", choices=list(VIDEOS), help="Encode only one module.")
    args = parser.parse_args()
    prepare()
    # Make previews before encoding so layout mistakes are caught immediately.
    qa = ROOT / "docs" / "video-qa"
    qa.mkdir(parents=True, exist_ok=True)
    for key, video in VIDEOS.items():
        if args.module and args.module != key:
            continue
        thumbs = []
        for index, item in enumerate(video["scenes"], 1):
            slide = render_slide(video, item, index, len(video["scenes"]))
            if index == 1:
                slide.save(OUT / f"{key}-poster.jpg", quality=93, subsampling=0)
            if index in (2, 5, len(video["scenes"])):
                slide.save(qa / f"{key}-slide-{index:02d}.png")
            thumbs.append(slide.resize((640, 360), Image.Resampling.LANCZOS))
        sheet = Image.new("RGB", (1280, math.ceil(len(thumbs) / 2) * 360), CREAM)
        for i, thumb in enumerate(thumbs):
            sheet.paste(thumb, ((i % 2) * 640, (i // 2) * 360))
        sheet.save(qa / f"{key}-storyboard.jpg", quality=92)
    if not args.prepare_only:
        with tempfile.TemporaryDirectory(prefix="termokimia-video-") as temp:
            for key, video in VIDEOS.items():
                if args.module and args.module != key:
                    continue
                render_video(key, video, Path(temp))
    print("Assets prepared in", OUT, flush=True)


if __name__ == "__main__":
    main()
