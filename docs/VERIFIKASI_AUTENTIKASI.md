# Verifikasi autentikasi lokal

Perubahan ini hanya menambahkan autentikasi lokal. Stylesheet, materi `src/content/learningContent.js`, dan video pembelajaran tidak diubah.

## Ketentuan

- Siswa: daftar dan masuk memakai **nama + kelas**, tanpa password.
- Kombinasi nama + kelas yang sama tidak dapat didaftarkan dua kali.
- Guru: satu akun, username `admin`, password `Fisika31`.
- Ruang siswa/belajar dan Ruang guru/tinjau meminta sesi sesuai peran.
- Sesi disimpan pada `localStorage`; password guru tidak disimpan sebagai data sesi.

## Pemeriksaan yang dijalankan pada 25 Oktober 2026

- Pemeriksaan logika Node: pendaftaran siswa, login nama+kelas, normalisasi spasi/kapitalisasi siswa, penolakan akun siswa duplikat, kredensial guru benar/salah: **lulus**.
- `node --check` untuk `authStorage.js`, `learning.js`, dan `useDemo.js`: **lulus**.
- Parse seluruh berkas JS/JSX dan tes menggunakan TypeScript parser (`tsc --allowJs --checkJs false --noEmit --jsx preserve`): **lulus tanpa error sintaks**.
- Perbandingan direktori `src/styles`: **tidak berubah** dari versi sebelum autentikasi.
- Perbandingan `src/content/learningContent.js`: **tidak berubah**.
- Perbandingan `public/videos`: **tidak berubah**.

`npm ci`, lint, Vitest, dan Vite build belum dapat dijalankan ulang di lingkungan ini karena registry npm tidak dapat di-resolve (`EAI_AGAIN`).
