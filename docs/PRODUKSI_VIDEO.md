# Produksi video TermoKimia XI

**Versi media:** `2.0-video-1` · **Tanggal:** 20 Oktober 2026.

Ketiga berkas MP4 telah diproduksi dan tersedia secara lokal. Video berupa penjelasan teks dan diagram asli dengan transisi lembut, **tanpa suara**. Label tersebut terlihat pada setiap adegan. Tidak ada video YouTube, rekaman pihak lain, musik, foto, atau diagram pihak lain yang disalin ke berkas ini.

## Aset dan hasil aktual

| Modul | Berkas utama | Durasi | Ukuran | Adegan |
| --- | --- | ---: | ---: | ---: |
| M1 — Konsep Dasar Termokimia | `public/videos/m1.mp4` | 90 detik | 862.493 byte | 8 |
| M2 — Kalorimetri | `public/videos/m2.mp4` | 92 detik | 763.093 byte | 8 |
| M3 — Penentuan ΔH Reaksi | `public/videos/m3.mp4` | 100 detik | 1.009.099 byte | 9 |

Setiap modul juga memiliki `mN-poster.jpg`, `mN-transcript.txt`, `mN-id.vtt`, dan `mN-probe.json` pada direktori yang sama. `public/videos/manifest.json` mencatat judul, URL, durasi, bab, bahasa, format, serta status audio dan teks.

Seluruh MP4 memakai H.264 High, format piksel `yuv420p`, resolusi 1280 × 720, dan 24 fps. Semua memiliki **satu stream video dan nol stream audio**. Jumlah frame M1/M2/M3 adalah 2.160/2.208/2.400. Kotak `moov` berada sebelum `mdat`, sehingga optimasi `faststart` benar-benar ada pada hasil akhir.

## Isi dan ketepatan konsep

- **M1:** menetapkan sistem reaksi pembakaran dan lingkungan; arah kalor; kondisi penggunaan `qₚ = ΔH`; eksoterm/endoterm; contoh entalpi relatif 80 → 30 kJ dan reaksi balik; makna sumbu diagram. Diagram tidak menampilkan suhu atau waktu sebagai entalpi.
- **M2:** asumsi kalorimeter ideal; 100 g larutan berubah dari 25 menjadi 30 °C; `q larutan = +2.090 J`; `q reaksi = −2.090 J = −2,090 kJ`; jumlah reaksi model 1:1 sebesar 0,050 mol menghasilkan −41,8 kJ/mol reaksi; massa 200 g dengan kalor sama menghasilkan 27,5 °C. Angka model dilabeli sebagai model, dan massa ialah massa larutan.
- **M3:** penjumlahan reaksi Hess −111 − 283 = −394 kJ; pembalikan +394 kJ; dua kali reaksi maju −788 kJ dan dua kali reaksi balik +788 kJ; penggunaan koefisien dan fase dalam pembentukan 2HCl(g), −184,6 kJ; energi pemutusan 679 kJ dikurangi besar energi pembentukan 864 kJ menghasilkan **estimasi** −185 kJ berdasarkan energi ikatan rata-rata fase gas.

Durasi 90–100 detik merupakan keputusan implementasi untuk versi produksi ringkas. PRD Lampiran B semula mengusulkan sekitar 2–3 menit. Konsep inti tetap dicakup; transkrip akhir mengikuti isi versi video yang diproduksi, bukan menyalin naskah panjang sebelumnya secara otomatis.

## Suara, transkrip, dan caption

Pemeriksaan lingkungan tidak menemukan `espeak`, `espeak-ng`, `pyttsx3`, `piper`, `TTS`, maupun `gtts`. Produksi dilanjutkan sebagai video teks tanpa suara; tidak ada klaim narasi audio.

Teks layar menyampaikan diagram, rumus, dan simpulan. Berkas transkrip menjelaskan kembali seluruh informasi pembelajaran dalam urutan adegan. VTT menyediakan teks penjelasan bertempo Bahasa Indonesia sebagai pilihan tambahan. Karena tidak ada audio, VTT bukan hasil transkripsi suara. Sumber transkrip dan VTT berasal dari struktur data yang sama dengan adegan pada skrip.

Konten aplikasi menggunakan paragraf `mN-transcript.txt` yang telah dikoordinasikan dengan penyusun `src/content/learningContent.js`. Jika naskah diubah, perbarui transkrip aplikasi, VTT, dan MP4 bersamaan. Video dan transkrip tetap dihitung sebagai satu item belajar sesuai PRD.

Untuk layar kecil, pertahankan transkrip yang dapat dibaca sebagai teks HTML, tombol layar penuh, serta kontrol jeda. Ukuran huruf video minimum 32 px pada kanvas 1280 × 720 tidak berarti teks video akan menjadi 32 CSS px pada layar HP.

## Rujukan dan asal media

Naskah, teks, susunan adegan, dan gambar dibuat khusus untuk prototipe ini. Asal kebutuhan dan data utamanya ialah **PRD versi 2, Lampiran B serta KIM01–KIM06**. Diagram dibuat dengan Python/Pillow; video disusun dengan FFmpeg. Sumber yang mendukung konsep dan data adalah:

| Sumber | Bagian yang dipakai |
| --- | --- |
| [Rara, Sudiarto, Nestiyarum (2018), E-modul kimia Kelas XI: termokimia](https://repositori.kemendikdasmen.go.id/20655/) | Konsep sistem–lingkungan, eksoterm/endoterm, diagram entalpi. Referensi lama berbasis KD, tidak dipakai sebagai bukti CP Merdeka. |
| [Sriyanto (2020), jenis-jenis dan penentuan entalpi reaksi](https://repositori.kemendikdasmen.go.id/22156/) | Kerangka materi penentuan entalpi. |
| [OpenStax Chemistry 2e, 5.1 Energy Basics](https://openstax.org/books/chemistry-2e/pages/5-1-energy-basics) | Kalor sebagai perpindahan energi; pembedaan dari suhu. |
| [OpenStax Chemistry 2e, 5.2 Calorimetry](https://openstax.org/books/chemistry-2e/pages/5-2-calorimetry) | Neraca kalor dan batas asumsi kalorimeter ideal. |
| [OpenStax Chemistry 2e, 5.3 Enthalpy](https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy) | Syarat `qₚ = ΔH`, Hess, pembalikan/koefisien, entalpi pembentukan. |
| [OpenStax Chemistry 2e, 7.5 Strengths of Ionic and Covalent Bonds](https://openstax.org/books/chemistry-2e/pages/7-5-strengths-of-ionic-and-covalent-bonds) | Data dan batas estimasi energi ikatan fase gas. |

Materi dijelaskan dengan kata-kata dan visual baru; tidak menyalin halaman atau ilustrasi sumber. Video Direktorat SMA yang dicantumkan sebagai kandidat dalam PRD tidak diunduh atau dijadikan bagian MP4 ini. Font yang dirasterisasi ialah DejaVu Sans/DejaVu Sans Bold dari lingkungan produksi; tidak ada berkas font yang dibundel ke aplikasi.

## Pemeriksaan yang telah dilakukan

| Pemeriksaan | Hasil dan bukti |
| --- | --- |
| Metadata setiap MP4 melalui `ffprobe` | Lulus; durasi, codec, piksel, resolusi, fps, jumlah frame tersimpan pada `public/videos/mN-probe.json`. |
| Dekode seluruh frame dengan `ffmpeg -v error -i ... -f null -` | Lulus untuk ketiga MP4; tidak ada kesalahan dekode. |
| Struktur `faststart` | Lulus; pembacaan kotak MP4 memastikan `moov` mendahului `mdat`. |
| Semua 25 adegan diperiksa sebagai contact sheet | Lulus; huruf minimum 32 px, angka/tanda dan diagram diperiksa. Gambar pada `docs/video-qa/mN-storyboard.jpg`. |
| Sampel hasil MP4 awal/tengah/akhir | Lulus; frame M1 pada 3/45/87 detik, M2 pada 3/49/89 detik, dan M3 pada 3/50/97 detik diekstrak dan diperiksa visual. |
| Angka contoh | Lulus; perhitungan kalor, molar, suhu 200 g, Hess, pembentukan, dan energi ikatan diperiksa aritmetis. |
| Waktu VTT | Lulus; 16/18/24 cue untuk M1/M2/M3, urutan waktu meningkat, tanpa tumpang tindih dan tanpa melewati durasi video. |
| Transkrip aplikasi dan sumber teks | Dikomunikasikan dan disamakan dengan penyusun konten; teks final tidak berubah sesudah koordinasi. |
| Pemutaran awal pada browser aplikasi | Lulus; M1/M2/M3 benar-benar mulai diputar. Durasi terbaca 90/92/100 detik, posisi `currentTime` mencapai sekitar 5,7/7,8/29,6 detik, dan `error` bernilai `null`. |
| Jalur transkrip saat video M3 tidak tersedia | Lulus; berkas sengaja dipindahkan sementara, pesan gagal muncul, dan transkrip dapat menyelesaikan item sehingga progres M3 berubah dari 7/9 menjadi 8/9. Berkas MP4 kemudian dipulihkan. |
| Cakupan pengujian browser lainnya | Hasil kontrol jeda/seek, caption, serta tampilan responsif mengikuti catatan aktual pada `docs/HASIL_PENGUJIAN.md`. Pemeriksaan di browser pengujian tidak menyatakan pengujian pada HP atau laptop fisik. |

`docs/video-qa/verification.json` menyimpan ringkasan pemeriksaan mesin. Gambar `mN-decoded-1.jpg` sampai `mN-decoded-3.jpg` berasal dari MP4 akhir. Frame tepat pada peralihan dapat berwarna krim selama transisi; sampel utama diambil ketika adegan sudah terlihat penuh.

## Membuat ulang

Prasyarat lingkungan produksi: Python 3, Pillow, FFmpeg dengan encoder `libx264`, `ffprobe`, serta font DejaVu pada `/usr/share/fonts/truetype/dejavu/`. Produksi tidak mengakses jaringan setelah alat dan font tersedia. Lingkungan yang dipakai: Pillow 12.3.0 dan FFmpeg 6.1.1.

Skrip saat ini disiapkan untuk **Linux atau WSL** karena `FONT_DIR` memakai lokasi font Linux di atas. Pada Windows native, sesuaikan `FONT_DIR` dalam `scripts/generate-videos.py` ke folder yang berisi `DejaVuSans.ttf` dan `DejaVuSans-Bold.ttf`, serta pastikan Python, FFmpeg, dan ffprobe dapat dipanggil dari terminal. Alat produksi ini hanya diperlukan untuk membuat ulang media; menjalankan aplikasi dan memutar MP4 yang sudah disertakan tidak memerlukannya. Jalankan perintah berikut dari folder proyek pada lingkungan produksi yang sudah siap.

```bash
python scripts/generate-videos.py --prepare-only
python scripts/generate-videos.py
```

Untuk satu modul saja:

```bash
python scripts/generate-videos.py --module m2
```

`--prepare-only` menghasilkan transkrip, VTT, poster, manifest, dan contact sheet tanpa membuat MP4. Menjalankan tanpa opsi itu menghasilkan berkas MP4 sungguhan, metadata `ffprobe`, dan pemeriksaan dekode penuh. Video memiliki transisi masuk 0,45 detik dan keluar 0,30 detik pada tiap adegan, tanpa musik dan tanpa kedipan cepat.

Penyuntingan rumus atau data tetap harus diperiksa sebelum produksi ulang. Penelaahan guru untuk pemakaian pembelajaran nyata tetap mengikuti ketentuan PRD; dokumen ini melaporkan produksi dan verifikasi media prototipe.
