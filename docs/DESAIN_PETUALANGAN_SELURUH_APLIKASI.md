# Desain Petualangan Energi — Seluruh Aplikasi

**Pembaruan:** 22 Oktober 2026  
**Versi proyek:** 0.3.0

## Keputusan desain

Pengguna meminta agar gaya UI/UX Petualangan Energi yang sebelumnya hanya diterapkan pada Beranda juga digunakan pada seluruh halaman internal. Implementasi ini mempertahankan logika, konten, dan struktur data PRD; perubahan berfokus pada sistem visual dan konsistensi pengalaman.

## Sistem visual global

| Elemen | Penerapan |
| --- | --- |
| Kanvas | Biru gelap `#111d2d` dengan pola titik halus. |
| Panel utama | Kertas krem `#fffbea`, bingkai abu-biru tegas, inset tipis, bayangan kotak/piksel. |
| Panel gelap | Biru `#203249` untuk perjalanan, sidebar modul, ringkasan siswa, dan hasil penting. |
| Aksen tujuan | Kuning `#ffe389` untuk judul petualangan, CTA utama, tab kertas, dan state aktif. |
| Aksen sains/progres | Mint `#aed9c6` dan hijau untuk aktivitas selesai, ikon, serta progres. |
| Tipografi piksel | Silkscreen/Courier digunakan terbatas pada judul besar, nomor, label singkat, dan statistik. |
| Tipografi materi | Manrope tetap digunakan untuk paragraf, form, penjelasan, kuis, tabel, dan teks panjang. |
| Bentuk | Sudut sebagian besar panel/kontrol dibuat kotak untuk meniru UI referensi; target sentuh tetap minimal 44 px. |

## Halaman yang diselaraskan

1. **Navbar, demo strip, footer** — tema petualangan berlaku di semua route.
2. **Pemilihan profil** — profil siswa menjadi kartu kertas; mode guru memakai panel mint; avatar berbentuk token piksel.
3. **Ruang Siswa** — ringkasan progres menjadi panel quest gelap, statistik berupa kartu kertas, dan kartu modul mengikuti bahasa visual peta.
4. **Halaman modul** — judul modul berwarna kuning, sidebar aktivitas menjadi panel quest, kegiatan aktif menjadi token kuning, sedangkan materi tampil pada "catatan lab" krem.
5. **Materi dan studi kasus** — formula, contoh, callout, respons, pembahasan, video/transkrip memakai bingkai kertas/piksel.
6. **Simulasi** — meja kerja berwarna krem dengan hasil pada panel gelap; input dan kartu Hess dibuat kotak dan konsisten.
7. **Kuis** — navigasi soal, opsi jawaban, feedback, dan hasil kuis mengikuti state token/pixel-paper tanpa mengandalkan warna saja.
8. **Ruang Guru** — toolbar gelap, statistik dan rekam siswa berbentuk kartu kertas, laporan dan pengelolaan kelas memakai komponen yang sama.
9. **Detail Siswa** — modul, percobaan kuis, checklist, respons kasus, dan ringkasan simulasi memakai panel kertas.
10. **Panduan & Sumber** — kartu instruksi dan glosarium tetap krem; daftar sumber menggunakan panel biru gelap agar menjadi bagian dari dunia visual yang sama.
11. **Status penyimpanan, halaman terkunci, dialog modul** — seluruh state sistem juga mengikuti tema, bukan hanya halaman normal.

## UX yang tidak berubah

- Tiga modul tetap dibuka berurutan berdasarkan kelengkapan 9 aktivitas per modul.
- Tidak ada nilai minimum kuis.
- Satu run simulasi valid tetap cukup menyelesaikan aktivitas simulasi.
- Data demo tetap tersimpan pada `localStorage`.
- Mode guru tetap membaca data yang sama dengan mode siswa.
- Pratinjau guru tidak menambah progres siswa.
- Bahasa Indonesia, notasi kimia, akses keyboard, ukuran sentuh, dan responsivitas tetap mengikuti AGENTS.md.

## Implementasi teknis

- `App.jsx`: kelas `app-shell--adventure` sekarang berlaku pada semua route.
- `Navbar.jsx`: `navbar--adventure` selalu digunakan.
- `src/styles/interior-adventure.css`: override terisolasi untuk halaman internal dan komponen bersama.
- `src/main.jsx`: mengimpor `interior-adventure.css` setelah stylesheet lain agar sistem visual global memiliki prioritas tanpa mengubah logika komponen.

## Batas pengujian pada sesi ini

Struktur CSS diparse menggunakan `tinycss2` tanpa error dan perubahan JSX yang sangat kecil diperiksa langsung. `npm ci` tidak selesai di lingkungan kerja sesi ini karena instalasi dependensi mengalami timeout, sehingga lint, Vitest, build, dan pemeriksaan browser aktual belum dapat dijalankan ulang untuk versi 0.3.0. Hasil pengujian versi sebelumnya tidak dianggap sebagai bukti bahwa perubahan visual global versi ini sudah lulus.
