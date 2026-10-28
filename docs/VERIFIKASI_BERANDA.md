# Verifikasi Beranda TermoKimia XI

**Tanggal:** 20 Oktober 2026.  
**Ruang lingkup:** Navbar, HeroSection, tiga kartu modul, dan integrasi Beranda pada proyek React + Vite yang sudah ada.  
**Acuan:** AGENTS.md versi 2.0 dan PRD_Web_Termokimia_Kelas_XI.md versi 2.0.

## Dokumen dan kondisi awal

Pada awal tugas, tidak ditemukan PRD.md. Dokumen kebutuhan tersedia sebagai PRD_Web_Termokimia_Kelas_XI.md, yang juga dirujuk AGENTS.md proyek. Keduanya dibaca sebelum perubahan. PRD.md sekarang menjadi pintasan ke dokumen tersebut; spesifikasi produk tidak digandakan atau diubah. Salinan AGENTS pada folder upload adalah versi terdahulu; proyek memakai versi 2.0 yang mempertahankan keputusan terbaru pengguna.

Proyek sudah memiliki beranda dan alur pembelajaran. Pekerjaan ini melanjutkan komponen yang ada. Tidak ada perubahan pada materi, kunci kuis, aturan penyelesaian, skema penyimpanan, atau dependensi.

## Perubahan

| Berkas | Hasil |
| --- | --- |
| src/components/Navbar.jsx | Identitas TermoKimia XI, menu HP, penanda aria-current untuk halaman aktif, label kontrol, ikon dekoratif, dan tombol yang menjalankan navigasi. Escape menutup menu dan mengembalikan fokus. |
| src/components/HeroSection.jsx | Judul dan CTA Mulai Belajar, identitas media, tautan Lihat modul yang memindahkan fokus tanpa mengganti hash, ID penggeser unik, serta keterangan bahwa pratinjau tidak mencatat progres modul. Named export EnthalpyPlot tetap tersedia. |
| src/components/TopicCards.jsx | Tiga modul dari learningContent, status dan progres aktual, konteks profil demo, prasyarat, nama tombol yang menyebut modul, dan keterangan kuis parsial. Tombol Lanjutkan modul benar meskipun baru ada jawaban kuis dan item selesai masih 0. |
| src/components/HomePage.jsx dan src/App.jsx | Beranda membaca profil aktif serta progres melalui getModuleProgress. Saat data gagal dimuat, kartu menampilkan informasi umum tanpa mengarang status/progres awal. |
| src/styles/home.css dan src/main.jsx | Teks isi 16 px, kontrol utama minimal 44 px, warna teks yang lebih jelas, kartu satu kolom pada layar kecil dan tiga kolom pada laptop, serta gaya fokus. Gaya preview dibatasi pada Beranda; gaya kartu sengaja dipakai pula di ruang siswa. |
| tests/homepage.test.js | Empat tes regresi render menggunakan state domain asli, tanpa dependensi baru. |
| PRD.md dan README.md | Pintasan PRD dan peta berkas Beranda untuk penyuntingan di VS Code. |

Tiga kartu tetap **Konsep Dasar Termokimia**, **Kalorimetri**, dan **Penentuan ΔH Reaksi**. Identitas sekolah/penyusun tidak ditambahkan karena belum diberikan.

## Pemeriksaan perintah

| Pemeriksaan | Hasil aktual | Bukti |
| --- | --- | --- |
| npm run lint | Lulus; kode keluar 0. | qa-results/beranda-lint.log |
| npm test | 7 berkas, 73 tes lulus; kode keluar 0. Termasuk 69 tes yang sudah ada dan 4 tes Beranda. | qa-results/beranda-test.log |
| npm run build | Lulus; kode keluar 0. | qa-results/beranda-build.log |

Npm mengeluarkan peringatan konfigurasi lingkungan http-proxy. Peringatan tersebut tidak menghentikan lint, tes, atau build. Pemeriksaan ini tidak mencakup audit keamanan dependensi.

Empat tes render memeriksa pergantian profil/nama/kelas/progres; kuis parsial dengan 0 item selesai pada Beranda dan ruang siswa; state null tanpa status palsu; serta M1 lengkap dengan nilai 0 yang membuka M2. Tes render memeriksa markup berdasarkan state, bukan klik atau tata letak browser.

## Pemeriksaan browser yang dilakukan

| Skenario | Hasil aktual |
| --- | --- |
| Mulai Belajar | Membuka pemilihan profil di #/demo. |
| Profil aktif | Bima menampilkan M1 selesai 9/9 dan M2 terbuka. Setelah memilih Citra, Beranda menampilkan Citra, XI Demo, 0/9 di setiap modul, M1 belum dimulai, M2/M3 terkunci. |
| Kartu terkunci | Tombol Lihat prasyarat Kalorimetri membuka penjelasan modul terkunci dan sembilan kegiatan M1 yang perlu diselesaikan. |
| Kuis parsial | Satu jawaban Citra tersimpan; Beranda menampilkan Sedang dipelajari, 0/9 kegiatan, Kuis berjalan 1/5, dan Lanjutkan modul. |
| Muat ulang | Profil dan kuis 1/5 tetap tampil setelah reload. |
| Komponen kartu bersama | Ruang siswa juga menampilkan Lanjutkan modul serta kuis 1/5. |
| Lihat modul dengan keyboard | Enter memindahkan fokus ke judul kartu dan URL tetap #/. Judul terlihat di bawah navbar sticky pada desktop dan HP. |
| Menu HP | Enter membuka menu; Escape menutupnya, aria-expanded menjadi false, dan fokus kembali ke tombol menu. |
| Pratinjau entalpi | ArrowRight mengubah −50 menjadi −40 kJ; Balik reaksi menghasilkan +40 kJ/Endoterm. Progres kegiatan tetap 0/9. |
| Navbar bersama | Panduan, ruang siswa, dan ruang guru dapat dibuka. Penanda halaman aktif mengikuti rute; ruang guru menampilkan dashboard yang sudah ada. |
| Console aplikasi | Tidak ditemukan error aplikasi pada log yang diambil selama pemeriksaan. Pesan ekstensi browser disaring. |

Bukti pembacaan browser tersedia di [beranda-browser.json](qa-results/beranda-browser.json). Beberapa snapshot sesaat setelah navigasi masih menampilkan layar sebelumnya; hasil akhir diperiksa setelah elemen tujuan tampil. Halaman bantu pengukuran ukuran sudah dihapus dari proyek sebelum penyerahan.

## Responsivitas dan keterbacaan

Pengujian menggunakan iframe dengan lebar tetap pada Chrome pengujian. Lebar area isi berkurang 15 px karena scrollbar. Ini bukan pengujian pada HP atau tablet fisik.

| Lebar kontainer | Lebar isi / scroll | Susunan kartu | Teks isi yang diukur | Kontrol utama |
| --- | --- | --- | --- | --- |
| 360 px | 345 / 345 px | 1 kolom | 16 px | Menu 44×44; CTA 51 px; tautan Lihat modul 44 px; tombol kartu 48 px. |
| 768 px | 753 / 753 px | 1 kolom | 16 px | Menu 44×44; CTA 51 px; tautan Lihat modul 44 px; tombol kartu 48 px. |
| 1366 px | 1351 / 1351 px | 3 kolom | 16 px | CTA 51 px; tautan Lihat modul 44 px; tombol kartu 48 px. |

Tidak ditemukan gulir horizontal pada tiga ukuran tersebut. Teks isi yang diukur mencakup deskripsi hero, deskripsi kartu, topik kartu, serta uraian langkah belajar. Label pendamping dan metadata memakai ukuran lebih kecil. Screenshot juga ditinjau untuk memastikan judul, diagram, tiga kartu, dan tombol tetap terbaca.

## Batas dan pekerjaan lanjutan

Lingkup Beranda yang diminta sudah tersedia dan diperiksa. Keadaan data tidak tersedia diperiksa melalui tes render dan tes layanan penyimpanan yang sudah ada; kegagalan localStorage tidak disuntikkan pada browser sesi ini. Alur lengkap 27 kegiatan, ekspor CSV, dan pemutaran video tidak diulang karena perubahan ini tidak menyentuh bagian tersebut; hasil pemeriksaan sebelumnya tetap tercatat dalam HASIL_PENGUJIAN.md.

Pemeriksaan pada perangkat HP/laptop fisik, Safari/iOS, Android, serta pembaca layar masih perlu dilakukan sebelum penggunaan nyata. Materi dan soal tetap perlu ditelaah guru. Aplikasi merupakan demo dengan data pada browser dan alamat aplikasi yang sama, tanpa sinkronisasi antarperangkat.
