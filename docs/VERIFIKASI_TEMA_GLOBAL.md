# Verifikasi Tema Global Petualangan Energi

**Tanggal:** 22 Oktober 2026  
**Versi:** 0.3.0

## Perubahan yang diperiksa secara statis

| Pemeriksaan | Hasil | Bukti |
| --- | --- | --- |
| Tema adventure berlaku untuk semua route | Lulus statis | `App.jsx` selalu memakai `app-shell app-shell--adventure`. |
| Navbar adventure berlaku untuk semua route | Lulus statis | `Navbar.jsx` selalu memakai `navbar navbar--adventure`. |
| Stylesheet internal dimuat setelah stylesheet lain | Lulus statis | `main.jsx` mengimpor `interior-adventure.css` paling akhir. |
| CSS baru dapat diparse | Lulus | `tinycss2`: 206 rules, 0 parse error. |
| Logika belajar/domain tidak diedit | Lulus statis | Perubahan kode aplikasi dibatasi pada kelas visual App/Navbar dan stylesheet/dokumentasi. |

## Pemeriksaan yang belum dapat dijalankan ulang

`npm ci` mengalami timeout pada lingkungan kerja sesi ini. Karena dependensi tidak selesai terpasang, pemeriksaan berikut **belum diuji ulang untuk versi 0.3.0**:

- `npm run lint`;
- `npm test`;
- `npm run build`;
- alur browser pada 360, 768, dan 1366 px;
- navigasi keyboard/fokus pada semua halaman setelah tema global;
- regresi visual halaman modul, simulasi, kuis, Ruang Guru, dan Panduan.

Versi sebelumnya telah memiliki pengujian fungsional, tetapi hasil tersebut tidak diklaim sebagai verifikasi visual versi 0.3.0.

## Skenario pemeriksaan berikutnya

1. Jalankan `npm ci` menggunakan Node.js 24 atau lebih baru.
2. Jalankan `npm run lint`, `npm test`, dan `npm run build`.
3. Buka profil siswa dan periksa Ruang Siswa, ketiga modul, studi kasus, simulasi, video/transkrip, serta kuis.
4. Buka Ruang Guru, kelola kelas, detail siswa, dan tiga tombol laporan.
5. Periksa lebar 360, 768, dan 1366 px serta fokus keyboard.
6. Pastikan status terkunci, benar/salah, selesai, belum tersimpan, dan gagal tidak hanya dibedakan dengan warna.
