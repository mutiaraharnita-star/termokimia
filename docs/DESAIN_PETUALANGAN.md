# Desain Beranda — Petualangan Energi

**Tanggal:** 22 Oktober 2026.  
**Produk:** TermoKimia XI.  
**Lingkup:** adaptasi visual Beranda pada prototipe React + Vite yang sudah ada.

## Acuan dan keputusan

Pengguna memberikan video `threadster_s5k5oic2.mp4` sebagai referensi setelah mengirim tautan https://www.threads.com/share/Ga_9K3TQp/. Tautan tidak berhasil ditinjau; keputusan desain didasarkan pada video lokal berdurasi sekitar 93 detik, ukuran 1280 × 696, termasuk bingkai awal, tengah, dan akhir.

Video memperlihatkan antarmuka petualangan retro: latar biru gelap, judul piksel kuning, peta dengan pos, tombol berbentuk persegi, panel isi krem, serta profil dan jejak perjalanan di sebelah kanan. Penerapan TermoKimia XI memakai pola visual tersebut dengan peta sains orisinal, tiga modul yang sudah ditetapkan, dan data progres sebenarnya. Video sumber tidak disertakan dalam paket aplikasi.

## Pemetaan desain

| Unsur | Implementasi |
| --- | --- |
| Navbar | Identitas TermoKimia XI, menu aktif berbingkai, tombol kuning, menu HP dengan Escape dan fokus kembali. |
| Hero | Judul Petualangan energi., pengantar singkat, Mulai Belajar menuju pemilihan profil, Lihat modul menggulir dan memfokuskan judul kartu. |
| Peta | SVG piksel orisinal: pos konsep, kalorimetri, dan penentuan ΔH; tiga tombol teks di bawah ilustrasi. |
| Status pos | Menggunakan `getModuleProgress` yang sama dengan kartu, termasuk prasyarat pada pos terkunci. |
| Profil/progres | Nama dan kelas fiktif, kegiatan selesai/27, persentase, modul selesai/3, serta status tiga modul. |
| Kartu | Panel krem, sudut siku, ikon sains, nomor pos, judul mudah dibaca, topik dan progres aktual. |
| Mini lab | Dipindahkan ke bagian Bekal penjelajah di bawah kartu. Slider dan Balik reaksi tetap aktif tanpa menambah progres. |
| Layar kecil | Satu kolom; profil/progres berada setelah hero. Jejak samping dan catatan tambahan disembunyikan karena navigasi tetap tersedia pada peta dan kartu. |

## Tipografi dan warna

- **Silkscreen:** judul hero dan nomor pos. Font disimpan lokal dan disertai lisensi utuh.
- **Manrope:** paragraf, tombol, judul materi, notasi kimia, dan informasi profil.
- **Courier New:** label pendek dan beberapa judul panel. Tampilan ini menggunakan font sistem, tanpa unduhan tambahan.
- Latar utama `#111d2d`, panel `#203249`, tombol/judul `#ffe389`, kertas `#fffbea`, aksen mint `#aed9c6`.
- Teks isi utama 16 px. Target kontrol sekurang-kurangnya 44 × 44 px. Teks status dan ikon melengkapi warna.
- Tidak ada animasi wajib, autoplay, atau interaksi yang hanya bisa diseret; preferensi pengurangan gerak dihormati.

## Aturan pembelajaran

Peta adalah navigasi dan ilustrasi. Menekan pos atau mencoba mini lab tidak menyelesaikan kegiatan. Kemajuan menggunakan satu sumber domain; tidak ada XP, skor tambahan, atau ambang nilai baru. Semua sembilan kegiatan wajib pada modul sebelumnya tetap harus lengkap, termasuk lima jawaban kuis. Nilai 0 tetap sah sesuai PRD.

Jika data belum dapat dibaca, Beranda menampilkan prasyarat umum dan ajakan memilih profil tanpa membuat progres nol atau status awal palsu. Kondisi penyimpanan gagal tetap ditangani oleh aplikasi yang sudah ada.

## Peta berkas

| Berkas | Tanggung jawab |
| --- | --- |
| `src/components/Navbar.jsx` | Navbar bersama; kelas tema petualangan aktif pada Beranda. |
| `src/components/HeroSection.jsx` | Hero, CTA, dan tombol tiga pos. |
| `src/components/TopicCards.jsx` | Kartu bersama Beranda dan Ruang siswa; kontrak callback tetap berupa objek modul. |
| `src/components/HomePage.jsx` | Komposisi Beranda dan pengambilan progres dari domain. |
| `src/components/JourneySidebar.jsx` | Profil, rekap kegiatan, jejak modul, dan catatan belajar. |
| `src/components/PixelJourneyScene.jsx` | SVG dekoratif yang tidak menyimpan state belajar. |
| `src/components/EnthalpyPreview.jsx` | Mini lab dan ekspor diagram `EnthalpyPlot`. |
| `src/components/SimulationPanel.jsx` | Mengimpor diagram dari berkas barunya; aturan simulasi tetap. |
| `src/styles/adventure.css` | Font, palet, bingkai, peta, kartu, dan responsivitas khusus Beranda. |
| `public/fonts/silkscreen/` | Font dan lisensi OFL 1.1. |

`App.jsx` menambahkan kelas pembungkus saat rute Beranda aktif; `main.jsx` memuat stylesheet tema sesudah gaya sebelumnya. `index.html` memakai judul dan warna tema baru. Tidak ada perubahan dependensi, skema penyimpanan, konten kimia, atau aturan domain dalam pekerjaan ini.

## Batas dan kelanjutan

Adaptasi visual ini mencakup Beranda. Halaman belajar, pemilihan profil, Ruang siswa, dan Ruang guru tetap menggunakan desain sebelumnya. Penerapan tema petualangan pada halaman-halaman tersebut merupakan tahap tersendiri. Konten pembelajaran tetap perlu penelaahan guru sebelum penggunaan nyata.

Hasil pemeriksaan aktual tercatat pada [VERIFIKASI_PETUALANGAN.md](VERIFIKASI_PETUALANGAN.md).
