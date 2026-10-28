> **ARSIP BERANDA VERSI 0.1.0 — bukan hasil pengujian versi sekarang.**
>
> Implementasi lengkap dan hasil aktual versi 0.2.0 ada pada [docs/HASIL_PENGUJIAN.md](docs/HASIL_PENGUJIAN.md). Pernyataan di bawah tentang modul/guru yang belum tersedia hanya berlaku pada tahap beranda terdahulu.

# Catatan verifikasi — TermoKimia XI 0.1.0

**Cakupan:** proyek beranda React + Vite sesuai Praktik 3. Catatan ini tidak menyatakan aplikasi pembelajaran lengkap telah selesai.

## Pemeriksaan yang dilakukan

| Pemeriksaan | Status | Bukti / lingkup |
| --- | --- | --- |
| Instalasi dependensi | Terpenuhi | Paket terpasang; versi dicatat pada package.json dan package-lock.json. |
| Build produksi | Terpenuhi | npm run build selesai dengan exit code 0; dist/index.html dan aset dihasilkan. |
| Pemeriksaan kode | Terpenuhi | npm run lint selesai dengan exit code 0. |
| Tes domain dan penyimpanan | Terpenuhi | npm test: 1 berkas tes, 12 tes lulus. |
| Struktur komponen | Terpenuhi | Navbar.jsx, HeroSection.jsx, TopicCards.jsx terpisah; dialog pendukung terpisah. |
| Peninjauan cakupan | Terpenuhi | Pengantar/prasyarat dibedakan dari modul penuh; tidak ada klaim akun atau progres lintas perangkat. |
| Tinjauan kode fokus menu | Terpenuhi secara statis | Tombol Mulai Belajar di menu HP memindahkan fokus ke tombol menu sebelum menu disembunyikan. |
| Pemeriksaan visual 360/768/1366 px | Belum diuji | Aturan CSS tersedia; layanan browser tidak menyelesaikan sesi. |
| Klik, keyboard, dan fokus di browser nyata | Belum diuji | Peninjauan kode dilakukan; pengujian interaksi langsung belum terverifikasi. |
| HP dan laptop fisik | Belum diuji | Tidak dilakukan dalam lingkungan ini. |

## Lingkup 12 tes otomatis

Tes memeriksa tanda ΔH, nilai nol dan batas rentang, penolakan input tidak valid, pembalikan reaksi, data anonim yang disimpan, pemulihan data, payload rusak atau versi tidak dikenal, serta kegagalan baca/tulis penyimpanan. Tes menggunakan adapter penyimpanan tiruan; hasil ini tidak dianggap bukti interaksi browser nyata.

## Checklist manual browser

Jalankan npm ci dan npm run dev, lalu lakukan skenario berikut. Kolom status sengaja belum ditandai lulus.

| No. | Skenario | Hasil yang harus diperoleh | Status |
| --- | --- | --- | --- |
| 1 | Buka lebar 360, 768, dan 1366 px | Konten utama terbaca, tidak terpotong, tidak ada gulir horizontal; kartu tersusun sesuai layar. | Belum diuji |
| 2 | Klik tautan Beranda, Modul belajar, Cara belajar | Halaman menuju bagian yang benar tanpa judul tertutup navbar. | Belum diuji |
| 3 | Buka menu HP, pilih navigasi, lalu ulang dengan Escape | Menu membuka/menutup; fokus keyboard kembali ke tombol menu saat Escape. | Belum diuji |
| 4 | Klik Mulai Belajar pada hero dan menu HP | Dialog pengantar M1 terbuka. Tutup dialog mengembalikan fokus ke pemicu yang terlihat. | Belum diuji |
| 5 | Pilih Coba diagram entalpi | Dialog tertutup, halaman menuju diagram, judul diagram menerima fokus. | Belum diuji |
| 6 | Pilih Eksoterm, Endoterm, dan ΔH nol | −50/+50/0 kJ tampil konsisten dengan diagram serta penjelasan arah kalor. | Belum diuji |
| 7 | Ubah slider dengan mouse/sentuhan dan tombol panah | Nilai, posisi produk, dan keterangan diperbarui tanpa kesalahan. | Belum diuji |
| 8 | Balik reaksi −50 kJ | Nilai menjadi +50 kJ; posisi produk serta arah kalor berubah; acuan reaktan tetap 0. | Belum diuji |
| 9 | Simpan ΔH, lalu muat ulang | Nilai yang berhasil disimpan pulih; tidak ada status selesai modul yang dibuat. | Belum diuji |
| 10 | Blokir penyimpanan browser lalu ubah diagram | Pesan Belum tersimpan dan tombol Coba simpan lagi muncul; diagram tetap dapat dieksplorasi. | Belum diuji |
| 11 | Buka kartu M2 dan M3 | Dialog menampilkan prasyarat, tujuan, dan batas pratinjau; tidak ada konten modul penuh yang dibuka. | Belum diuji |
| 12 | Aktifkan sumber pembelajaran dan gunakan keyboard | Daftar sumber muncul, semua kontrol utama dapat difokuskan dan diaktifkan. | Belum diuji |

## Hubungan dengan kriteria PRD

KIM01 mendapat pemeriksaan numerik pada fungsi domain, tetapi tampilan diagram belum diverifikasi dalam browser. KIM02–KIM05 berkaitan dengan modul penuh yang belum termasuk tahap beranda ini.

AC01–AC21 dalam PRD tetap menjadi rencana penerimaan produk lengkap. Tidak ada deklarasi bahwa seluruh AC tersebut telah lulus. Khusus pemantauan guru, identitas, pembukaan modul berdasarkan penyelesaian, dan sinkronisasi lintas perangkat memerlukan implementasi layanan data pada tahap selanjutnya.

