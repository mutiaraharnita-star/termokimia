# PRD — TermoKimia XI

Dokumen kebutuhan produk yang berlaku adalah [PRD_Web_Termokimia_Kelas_XI.md](./PRD_Web_Termokimia_Kelas_XI.md), versi 2.0. Baca dokumen tersebut secara lengkap bersama [AGENTS.md](./AGENTS.md) sebelum mengubah proyek.

Berkas ini menjadi pintasan untuk instruksi yang menyebut `PRD.md`. Spesifikasi tetap dipelihara pada satu dokumen sumber agar tidak ada dua versi kebutuhan yang berbeda.


## Keputusan autentikasi terbaru

- Siswa harus dapat **Daftar akun** dan **Masuk siswa** menggunakan **nama + kelas**. Tidak ada password siswa pada versi ini.
- Kombinasi nama + kelas yang sama tidak boleh didaftarkan dua kali.
- Guru hanya memiliki satu akun: username `admin` dan password `Fisika31`. Tidak ada pendaftaran akun guru.
- Halaman Ruang siswa/belajar dan Ruang guru/tinjau harus meminta login sesuai perannya bila belum memiliki sesi yang sah.
- Sesi disimpan lokal pada browser; password guru tidak disimpan sebagai nilai sesi.
- Perubahan ini tidak mengubah desain UI/UX, materi, progres, simulasi, kuis, maupun laporan.

## Lingkup Beranda

- Identitas media: **TermoKimia XI**; sekolah dan penyusun ditambahkan kemudian.
- Navbar, hero dengan tombol **Mulai Belajar**, serta tiga kartu modul.
- Kartu: **Konsep Dasar Termokimia**, **Kalorimetri**, dan **Penentuan ΔH Reaksi**.
- Komponen utama: `Navbar.jsx`, `HeroSection.jsx`, dan `TopicCards.jsx` pada `src/components/`.
- Aturan teknologi, pembelajaran, penyimpanan, responsivitas, dan pemeriksaan mengikuti dokumen sumber dan `AGENTS.md`.

## Penyesuaian visual — 22 Oktober 2026

Pengguna memberikan video referensi setelah tautan Threads tidak dapat ditinjau. Beranda mengikuti gaya petualangan piksel dalam video: latar biru gelap, judul piksel kuning, peta tiga pos sains, panel progres, serta kartu materi krem dengan bingkai tegas. Rincian penerapan ada pada [DESAIN_PETUALANGAN.md](docs/DESAIN_PETUALANGAN.md).

Penyesuaian ini memperbarui arah visual produk yang semula minimalis akademis. Keterbacaan materi, Bahasa Indonesia, akses keyboard, ketiga modul, aturan penyelesaian, penyimpanan, dan fitur guru tetap mengikuti PRD versi 2.0.

### Penyesuaian visual global — 22 Oktober 2026

Atas keputusan pengguna, gaya petualangan piksel tidak lagi dibatasi pada Beranda. Seluruh pengalaman utama memakai sistem visual yang sama: pemilihan profil, Ruang Siswa, halaman modul dan aktivitas, simulasi, kuis, Ruang Guru, detail siswa, Panduan, dialog, status penyimpanan, serta footer.

Prinsip global:
- latar biru gelap berpola halus sebagai kanvas perjalanan;
- panel konten utama berbentuk kertas krem dengan bingkai tegas dan bayangan piksel;
- kuning sebagai aksen aksi/tujuan dan hijau mint sebagai aksen progres/sains;
- tipografi piksel dipakai untuk judul, nomor pos, dan label singkat; teks materi, rumus, form, dan penjelasan tetap memakai font yang mudah dibaca;
- tombol, status, progress bar, form, kartu, sidebar, kuis, simulasi, dan laporan mengikuti bentuk kotak/pixel-edge yang konsisten;
- logika penyelesaian, penyimpanan `localStorage`, nilai kuis, serta data guru tidak berubah karena redesain.

Rincian implementasi dicatat pada [DESAIN_PETUALANGAN_SELURUH_APLIKASI.md](docs/DESAIN_PETUALANGAN_SELURUH_APLIKASI.md).
