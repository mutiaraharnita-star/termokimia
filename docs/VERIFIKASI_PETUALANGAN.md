# Verifikasi Beranda Petualangan Energi

**Tanggal:** 22 Oktober 2026.  
**Lingkup:** penyesuaian visual Beranda berdasarkan video referensi pengguna.  
**Acuan:** AGENTS.md versi 2.0, PRD.md, dan PRD_Web_Termokimia_Kelas_XI.md versi 2.0.

## Perubahan yang diperiksa

Beranda memakai palet biru gelap–krem–kuning, tipografi piksel untuk judul pendek, SVG peta tiga laboratorium orisinal, tiga tombol pos, sidebar progres, dan kartu materi berbingkai. Mini lab dipindahkan ke bagian Bekal penjelajah. Diagram yang sama tetap dipakai oleh simulasi modul melalui impor barunya.

Komponen Navbar.jsx, HeroSection.jsx, dan TopicCards.jsx tetap menjadi bagian utama. HomePage.jsx menggabungkan peta, kartu, sidebar, dan pratinjau. Penyesuaian visual dibatasi pada Beranda; aturan domain, konten kimia, kunci soal, skema localStorage, dan dependensi tidak diubah.

## Pemeriksaan otomatis

| Pemeriksaan | Hasil |
| --- | --- |
| `npm run lint` | Lulus; kode keluar 0. |
| `npm test` | Lulus; 73 tes pada 7 berkas. |
| `npm run build` | Lulus; keluaran produksi tersedia dalam dist. |

Log akhir tersedia pada `docs/qa-results/petualangan-lint.log`, `petualangan-test.log`, dan `petualangan-build.log`. Versi lingkungan saat pemeriksaan: Node.js 24.19.0, React 19.3.1, Vite 8.3.4, serta Vitest 5.0.5, sesuai lockfile proyek. Peringatan npm mengenai konfigurasi lingkungan `http-proxy` tidak menggagalkan perintah. Pemasangan awal dalam lingkungan tanpa akses jaringan gagal; pemasangan ulang dengan akses jaringan berhasil menggunakan lockfile yang sama.

Tes render Beranda yang sudah ada tetap mencakup pemisahan profil, kuis parsial dengan nol kegiatan lengkap, keadaan data null tanpa progres palsu, serta M1 selesai dengan nilai kuis nol yang membuka M2. Tes domain lain mencakup perhitungan kimia, penyimpanan, kuis, progres, dan CSV. Tidak ada tes CSS yang menyalin implementasi.

## Pemeriksaan browser yang benar-benar dilakukan

| Skenario | Hasil yang diamati |
| --- | --- |
| Mulai Belajar | Membuka halaman pemilihan profil. |
| Pergantian profil | Memilih Bima Demo, lalu Beranda menampilkan nama dan kelas yang sesuai pada kartu dan panel profil. |
| Pos M2 dari peta | Menampilkan Modul ini belum terbuka dan daftar sembilan kegiatan M1 yang belum selesai. |
| Progres tersimpan | Menandai satu materi M1 pada Bima; Beranda menampilkan 1/9 dan 1/27. Muat ulang mempertahankan progres tersebut. |
| Pratinjau ΔH | ArrowRight mengubah −50 menjadi −40 kJ; Balik reaksi menghasilkan +40 kJ dan Masuk ke sistem. Progres tetap 1/9 serta 1/27. |
| Lihat modul melalui Enter | Fokus berpindah ke judul kartu; hash tetap `#/`; judul tidak tertutup navbar. |
| Menu HP | Enter membuka menu; Escape menutup dan mengembalikan fokus ke tombol menu. |
| Urutan Tab HP | Setelah tombol pos ketiga, fokus menuju Ganti profil pada panel yang memang tampil sesudah peta. |
| Status kartu | M1 yang sudah dimulai menampilkan Sedang dipelajari dan Lanjutkan modul; M2/M3 menampilkan Terkunci serta prasyarat. |
| Galat aplikasi | Setelah perbaikan key SVG dan muat ulang, tidak ada galat aplikasi baru pada log browser yang diperiksa. Pesan dari ekstensi browser dibedakan dari aplikasi. |

## Ukuran tampilan dan area sentuh

Pengujian memakai iframe dengan lebar tetap pada Chrome, ditambah pemeriksaan visual desktop. Selisih lebar iframe dan area konten berasal dari scrollbar vertikal 15 px.

| Lebar iframe | Area konten | Lebar dokumen | Kartu | Teks paragraf kartu | Kontrol terlihat di bawah 44 × 44 px |
| ---: | ---: | ---: | --- | --- | ---: |
| 360 px | 345 px | 345 px | 3 kartu, satu kolom | 16 px | 0 |
| 768 px | 753 px | 753 px | 3 kartu, satu kolom | 16 px | 0 |
| 1366 px | 1351 px | 1351 px | 3 kartu, tiga kolom | 16 px | 0 |

Tidak ditemukan gulir horizontal pada dokumen aplikasi di ketiga ukuran tersebut. Pada HP dan tablet, panel profil ada di bawah hero; urutan DOM dan urutan fokus mengikuti susunan ini. Jejak samping serta catatan tambahan disembunyikan pada layar kecil, sedangkan tombol pos dan kartu tetap menyediakan navigasi yang sama.

Data pengukuran dan ringkasan observasi tersimpan pada `docs/qa-results/petualangan-browser.json`. Pemeriksaan area sentuh menggunakan ukuran kotak elemen yang terlihat, bukan pengujian pada layar sentuh fisik.

## Temuan yang diperbaiki

1. Posisi sidebar dalam DOM dipindahkan setelah hero agar urutan Tab pada HP sesuai dengan susunan visual.
2. Cincin fokus tombol pos diarahkan ke dalam bingkai agar tidak terpotong oleh batas hero.
3. Dua pasang persegi panjang peta berbagi koordinat awal; key React dibuat dari koordinat dan ukuran lengkap agar unik.
4. Kontras label Data demonstrasi disesuaikan dengan latar gelap; tautan merek pada footer diberi area klik setinggi 44 px.

## Batas pemeriksaan dan pekerjaan selanjutnya

- Ini adalah pemeriksaan perubahan Beranda, bukan pengujian ulang seluruh AC01–AC22 melalui UI. Alur 27 kegiatan, pemutaran tiga video, dan ekspor guru tidak diulang; catatan sebelumnya tetap ada pada HASIL_PENGUJIAN.md.
- Belum diuji pada perangkat HP fisik, Safari, browser Android, atau pembaca layar. Pemeriksaan keyboard dilakukan pada Chrome.
- Penolakan localStorage tidak diinjeksi kembali melalui browser. Keadaan null dan kegagalan penyimpanan tetap tercakup oleh tes render/layanan yang dijalankan.
- Penelaahan konten oleh guru sebelum pembelajaran nyata masih diperlukan.
- Tema petualangan pada halaman materi, pemilihan profil, Ruang siswa, dan Ruang guru merupakan kelanjutan terpisah bila diminta.
- Peta bersifat dekoratif dengan tombol navigasi di bawahnya; karakter tidak bergerak berdasarkan progres dan tidak ada sistem XP atau badge.

Progres Bima 1/27 yang terlihat pada pemeriksaan berasal dari browser pengujian. Data tersebut tidak disertakan pada ZIP; browser baru memulai profil contoh sesuai state awal aplikasi.
