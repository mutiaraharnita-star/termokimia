# TermoKimia XI — prototipe pembelajaran React + Vite

Web pembelajaran termokimia untuk siswa kelas XI pemula. Materi dipetakan ke sebagian Kimia Fase F Kurikulum Merdeka dan disusun dalam tiga modul: **Konsep Dasar Termokimia**, **Kalorimetri**, serta **Penentuan ΔH Reaksi**.

Proyek menyediakan alur siswa dan guru, materi dan contoh bertahap, kasus, tiga simulasi, tiga video lokal beserta transkrip, kuis dengan pembahasan, progres, pengelolaan kelas contoh, serta tiga unduhan CSV. Akun siswa masuk menggunakan **nama dan kelas** dan dapat didaftarkan langsung pada halaman Masuk. Akun guru hanya satu, yaitu username `admin` dengan password `Fisika31`. Tidak ada backend eksternal; sesi dan progres disimpan pada browser yang sama.

## Tema visual Petualangan Energi

Versi 0.3.0 menerapkan tema Petualangan Energi pada **seluruh aplikasi**: Beranda, pemilihan profil, Ruang Siswa, modul/aktivitas, simulasi, kuis, Ruang Guru, detail siswa, Panduan, dialog, dan state sistem. Lihat `docs/DESAIN_PETUALANGAN_SELURUH_APLIKASI.md`.

## 1. Menjalankan dari Windows dan VS Code

### Siapkan alat

Pada komputer yang akan dipakai, siapkan:

- **Node.js versi 24 atau lebih baru**, sesuai `engines` pada `package.json`; npm digunakan sebagai pengelola paket.
- **Visual Studio Code** untuk membuka proyek dan terminal.
- Browser untuk membuka aplikasi.

Ketersediaan alat pada komputer pembuat proyek tidak berarti alat tersebut sudah terpasang pada komputer Anda. Buka terminal dan periksa:

```powershell
node --version
npm --version
```

`node --version` harus menunjukkan versi minimal `v24.0.0`. Jika perintah belum dikenali setelah memasang Node.js, tutup dan buka kembali VS Code agar terminal membaca konfigurasi yang baru.

### Ekstrak dan buka folder yang benar

1. Ekstrak berkas ZIP proyek ke folder biasa. Buka hasil ekstraksinya, bukan isi ZIP langsung.
2. Di VS Code, pilih **File → Open Folder**, lalu pilih folder `termokimia-xi` yang berisi `package.json`.
3. Pada Explorer VS Code, pastikan terlihat `package.json`, `package-lock.json`, `src`, dan `public`.
4. Pilih **Terminal → New Terminal**. Terminal harus berada di folder proyek tersebut. Jika paket ZIP memiliki folder pembungkus, buka folder di dalamnya sampai `package.json` terlihat langsung.

### Pasang dependensi dan jalankan

Jalankan satu per satu di terminal proyek:

```powershell
npm ci
npm run dev
```

`npm ci` memasang dependensi sesuai versi yang dikunci pada `package-lock.json`. Koneksi internet biasanya diperlukan pada pemasangan pertama. Perintah ini cukup dijalankan setelah menerima proyek atau ketika berkas dependensinya berubah.

Setelah `npm run dev`, terminal Vite menampilkan alamat **Local**, misalnya:

```text
http://localhost:5173/
```

**Buka alamat yang benar-benar tercetak pada terminal.** Port bisa berbeda jika port sebelumnya sedang digunakan. Biarkan terminal berjalan selama aplikasi digunakan. Untuk menghentikan server, tekan **Ctrl+C** pada terminal tersebut. Untuk melanjutkan, jalankan `npm run dev` kembali dan buka alamat Local yang ditampilkan.

Jika PowerShell menampilkan pesan bahwa `npm.ps1` tidak dapat dijalankan, gunakan terminal **Command Prompt** di VS Code, atau gunakan bentuk perintah berikut:

```powershell
npm.cmd ci
npm.cmd run dev
```

Aplikasi tidak memerlukan API key, berkas `.env`, akun layanan, atau backend eksternal untuk demonstrasi ini.

## 2. Mulai mencoba aplikasi

1. Buka **Masuk** pada navbar atau **Mulai Belajar** pada beranda.
2. Pilih salah satu profil awal: **Alya Demo**, **Bima Demo**, atau **Citra Demo**, dalam kelas **XI Demo**.
3. Di **Ruang siswa**, buka M1 melalui **Mulai modul** atau **Lanjutkan belajar**.
4. Gunakan daftar **Isi modul** untuk memilih kegiatan. Urutan kegiatan di dalam modul boleh dipilih.
5. Buka **Ruang guru** untuk melihat progres yang sama, mengelola kelas fiktif, dan mengunduh laporan.

Tiap modul mempunyai **sembilan kegiatan wajib**:

| Kegiatan | Jumlah | Cara menyelesaikan |
| --- | ---: | --- |
| Materi | 3 | Buka bagian, pelajari, lalu tekan **Tandai selesai**. |
| Contoh soal | 2 | Buka contoh, pelajari langkahnya, lalu tekan **Tandai selesai**. |
| Studi kasus | 1 | Isi dua respons dan tekan **Kirim jawaban kasus**; masing-masing 1–1.000 karakter setelah spasi tepi dibuang. |
| Simulasi | 1 | Tekan **Jalankan simulasi** sekali dengan input valid; tunggu hasil tersimpan. Parameter awal boleh langsung digunakan dan catatan opsional. |
| Video/transkrip | 1 | Putar video atau buka **Buka transkrip video**, lalu tekan **Tandai selesai**. |
| Kuis | 1 | Jawab kelima soal dan tekan **Periksa jawaban** untuk setiap soal. |

**M2 terbuka setelah 9/9 kegiatan M1 selesai. M3 terbuka setelah M1 dan M2 selesai. Tidak ada nilai minimum.** Nilai 0 tetap dapat membuka modul berikutnya bila kegiatan lain lengkap. Nilai 100 tidak menggantikan kegiatan yang belum selesai. Progres total dihitung dari 27 kegiatan.

Pilihan kuis dapat diubah sebelum **Periksa jawaban**. Setelah tersimpan, jawaban dikunci pada percobaan itu dan pembahasan langsung muncul. **Ulangi kuis** membuat percobaan baru tanpa menghapus percobaan sebelumnya atau mengurangi progres.

Panduan demonstrasi terperinci, termasuk contoh nilai 0, tersedia di [PANDUAN_DEMO.md](docs/PANDUAN_DEMO.md).

## 3. Video dan materi

Ketiga video MP4 sudah disertakan pada `public/videos/`: M1 90 detik, M2 92 detik, dan M3 100 detik. Formatnya **penjelasan teks dan diagram bertransisi tanpa suara**. Gunakan kontrol jeda atau layar penuh saat membaca; transkrip setara selalu tersedia. Video dan transkrip mewakili satu kegiatan yang sama.

Produksi, sumber, transkrip, dan pemeriksaan berkas video dijelaskan dalam [PRODUKSI_VIDEO.md](docs/PRODUKSI_VIDEO.md). Sumber materi terdapat dalam [SUMBER_KONTEN.md](docs/SUMBER_KONTEN.md) dan pada halaman **Panduan & sumber** di aplikasi.

Draf materi dan soal mengikuti PRD serta memerlukan penelaahan guru sebelum dipakai dalam pembelajaran nyata. Penempatan topik pada kelas XI dan pembagian tiga modul merupakan rancangan produk; aplikasi tidak mengklaim mencakup seluruh CP Kimia Fase F.

## 4. Menyimpan progres dan memahami data demo

Data profil, kelas, kegiatan, hasil simulasi, dan riwayat kuis disimpan pada `localStorage`, dengan kunci `termokimia-xi:demo:v2`.

- Gunakan **browser, profil browser, dan origin yang sama** saat melanjutkan. Origin terdiri dari protokol, nama host, serta port.
- Contohnya, `http://localhost:5173` dan `http://localhost:4173` mempunyai penyimpanan terpisah. `localhost` dan `127.0.0.1` juga berbeda. Perpindahan halaman `#/siswa` ke `#/guru` pada alamat yang sama tetap memakai data yang sama.
- Menyalin folder proyek atau membukanya pada perangkat lain tidak memindahkan progres. Tidak ada sinkronisasi lintas perangkat.
- Jika muncul **Belum tersimpan**, perbaiki input atau kondisi penyimpanan lalu ulangi tindakan yang sama. Jangan menganggap kegiatan selesai sebelum penyimpanannya berhasil.
- JSON rusak atau versi data yang tidak didukung tidak ditimpa diam-diam. Aplikasi menampilkan masalah penyimpanan dan menyediakan pilihan pemulihan.

Untuk mulai ulang secara sengaja, buka **Panduan & sumber → Reset seluruh data demo** dan baca konfirmasinya. Reset menghapus progres, jawaban, kelas, dan profil demo pada origin itu, lalu mengembalikan data awal. Jika membutuhkan rekap, unduh laporan guru terlebih dahulu. CSV adalah laporan; aplikasi belum menyediakan impor CSV untuk memulihkan seluruh state.

## 5. Membuat build dan memeriksa proyek

Jalankan perintah berikut dari folder yang berisi `package.json`:

```powershell
npm run lint
npm test
npm run build
npm run preview
```

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan dengan pembaruan saat kode disimpan. |
| `npm run lint` | Memeriksa kode JavaScript/React melalui ESLint. |
| `npm test` | Menjalankan pengujian otomatis sekali melalui Vitest. |
| `npm run test:watch` | Menjalankan Vitest selama penyuntingan. |
| `npm run build` | Membuat hasil produksi pada folder `dist/`. |
| `npm run preview` | Menyajikan hasil `dist/` melalui server pratinjau lokal; jalankan build terlebih dahulu. |

Buka alamat **Local** yang dicetak saat preview, biasanya `http://localhost:4173/`. Preview menggunakan origin berbeda dari server pengembangan jika portnya berbeda, sehingga progresnya dapat tampak kosong.

**Jalankan aplikasi melalui server Vite atau server yang menyajikan hasil build.** Jangan membuka `index.html` atau `dist/index.html` dengan klik ganda sebagai `file://`.

Hasil lint, pengujian otomatis, build, serta pemeriksaan browser dilaporkan terpisah dalam [HASIL_PENGUJIAN.md](docs/HASIL_PENGUJIAN.md). Panduan ini menjelaskan cara menjalankan pemeriksaan; status keberhasilan aktual mengikuti laporan tersebut.

## 6. Struktur proyek

| Lokasi | Isi |
| --- | --- |
| `src/App.jsx` | Komposisi halaman dan navigasi utama. |
| `src/components/` | Seluruh komponen UI, halaman, kuis, simulasi, dan tampilan guru. |
| `src/content/learningContent.js` | Materi, kegiatan, soal, kunci, pembahasan, transkrip, dan sumber pembelajaran yang digunakan aplikasi. |
| `src/content/siteContent.js` | Identitas situs; `siteIdentity` memuat nama, sekolah, dan penyusun opsional. |
| `src/domain/` | Perhitungan kimia, evaluasi, progres, aturan pembukaan modul, serta versi state/konten. |
| `src/services/` | Penyimpanan lokal, format tampilan, pembentukan dan unduhan laporan CSV. |
| `src/hooks/` | Pengelolaan state demo dan rute hash. |
| `src/styles/` | Gaya dan aturan responsif. |
| `public/videos/` | MP4, poster, transkrip, VTT, dan metadata video lokal. |
| `scripts/generate-videos.py` | Skrip produksi ulang video; tidak diperlukan untuk menjalankan aplikasi. |
| `tests/` | Pengujian logika kimia, progres, penyimpanan, dan laporan. |
| `docs/` | Panduan, sumber, produksi media, dan hasil pengujian. |

Rute utama menggunakan hash: `#/`, `#/demo`, `#/siswa`, `#/belajar/M1`, `#/guru`, dan `#/bantuan`. ID modul pada rute belajar memakai huruf besar. Akses langsung ke modul siswa tetap mengikuti prasyarat. Guru dapat meninjau modul melalui tautan pada **Tinjau materi pembelajaran** tanpa menambah progres siswa.

### Komponen Beranda

Beranda memakai [Navbar.jsx](src/components/Navbar.jsx), [HeroSection.jsx](src/components/HeroSection.jsx), dan [TopicCards.jsx](src/components/TopicCards.jsx). [HomePage.jsx](src/components/HomePage.jsx) menyusun hero dan kartu, sedangkan App.jsx menempatkan navbar bersama. Gaya tambahan Beranda berada pada [home.css](src/styles/home.css).

Tombol **Mulai Belajar** membuka halaman masuk/daftar. Siswa masuk menggunakan nama dan kelas; kartu menampilkan status akun siswa aktif dan akun dapat diganti melalui **Ganti akun**. Tautan **Lihat modul** menggulir ke judul kartu dan memindahkan fokus keyboard. Pratinjau diagram pada bagian **Bekal penjelajah**, di bawah kartu materi, dapat dicoba tanpa menambah progres kegiatan.

[PRD.md](PRD.md) adalah pintasan ke dokumen kebutuhan lengkap. Hasil pemeriksaan Beranda sebelumnya tersedia dalam [VERIFIKASI_BERANDA.md](docs/VERIFIKASI_BERANDA.md).

### Tema Petualangan Energi — 22 Oktober 2026

Beranda sekarang menggunakan tema petualangan piksel dari video referensi pengguna: latar biru gelap, judul dan tombol kuning, peta tiga pos sains, panel progres, serta kartu krem. Peta memakai SVG orisinal; font Silkscreen disertakan lokal bersama lisensinya.

Tombol pos membuka modul atau menampilkan prasyarat yang berlaku. Panel profil menampilkan kegiatan selesai dari 27 dan membaca data yang sama dengan kartu. Pada HP, panel profil berada setelah hero, sesuai urutan visual dan keyboard. Tema ini mencakup Beranda; halaman materi, pemilihan profil, siswa, dan guru tetap menggunakan desain sebelumnya.

Rincian komponen dan keputusan tersedia pada [DESAIN_PETUALANGAN.md](docs/DESAIN_PETUALANGAN.md). Bukti pemeriksaan terbaru tersedia pada [VERIFIKASI_PETUALANGAN.md](docs/VERIFIKASI_PETUALANGAN.md).

## 7. Masalah yang umum ditemui

| Gejala | Langkah yang dapat dilakukan |
| --- | --- |
| `package.json` tidak ditemukan | Pastikan terminal berada pada folder proyek yang menampilkan `package.json` langsung. |
| `node` atau `npm` tidak dikenali | Periksa instalasi Node.js pada komputer ini; buka ulang VS Code setelah pemasangan. |
| Pemasangan dependensi gagal | Baca pesan terminal, periksa koneksi dan versi Node.js, lalu ulangi `npm ci` pada folder yang benar. |
| Browser tidak membuka aplikasi | Pastikan terminal server masih berjalan dan gunakan alamat Local serta port yang tercetak. |
| Progres terlihat hilang | Periksa browser/profil, host, protokol, dan port. Kembali ke origin semula sebelum mempertimbangkan reset. |
| M2/M3 masih terkunci | Periksa jumlah kegiatan pada modul sebelumnya. Lima jawaban kuis saja baru menyelesaikan satu kegiatan. |
| Video gagal diputar | Buka transkrip untuk menyelesaikan kegiatan yang sama; pastikan folder `public/videos/` ikut diekstrak. |
| CSV terbuka dalam satu kolom | Impor berkas sebagai teks/CSV dengan pemisah koma dan pengodean UTF-8 pada aplikasi spreadsheet. |

## 8. Dokumen lanjutan

- [PRD versi 2](PRD_Web_Termokimia_Kelas_XI.md): kebutuhan dan kriteria penerimaan.
- [AGENTS.md](AGENTS.md): aturan implementasi proyek.
- [Panduan demonstrasi](docs/PANDUAN_DEMO.md): alur siswa hingga laporan guru.
- [Panduan menyunting konten](docs/PANDUAN_EDIT_KONTEN.md): struktur konten, contoh perubahan, dan pengelolaan versi.
- [Sumber konten](docs/SUMBER_KONTEN.md): asal konsep, angka, dan media.
- [Produksi video](docs/PRODUKSI_VIDEO.md): aset video dan cara membuat ulang.
- [Hasil pengujian](docs/HASIL_PENGUJIAN.md): bukti serta batas pemeriksaan aktual.
- [Pemberitahuan dependensi pihak ketiga](THIRD_PARTY_NOTICES.md): pustaka, font, dan ikon yang digunakan.
