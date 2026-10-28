# Hasil pengujian TermoKimia XI

**Versi aplikasi:** 0.2.0  
**Tanggal pemeriksaan:** 20 Oktober 2026  
**Acuan:** `AGENTS.md` versi 2 dan `PRD_Web_Termokimia_Kelas_XI.md` versi 2.

> **Pembaruan visual, 22 Oktober 2026:** Tema Petualangan Energi kini diterapkan ke seluruh aplikasi, bukan hanya Beranda. Lihat [DESAIN_PETUALANGAN_SELURUH_APLIKASI.md](DESAIN_PETUALANGAN_SELURUH_APLIKASI.md) dan [VERIFIKASI_TEMA_GLOBAL.md](VERIFIKASI_TEMA_GLOBAL.md). Catatan pengujian sebelumnya dipertahankan sebagai riwayat; hasil lint/test/build versi sebelumnya tidak diklaim sebagai verifikasi versi 0.3.0 karena instalasi dependensi pada sesi redesain global mengalami timeout.

> **Pembaruan Beranda, 20 Oktober 2026:** navbar, hero, dan tiga kartu telah disesuaikan. Pemeriksaan terbaru menghasilkan **73 tes lulus**, lint lulus, dan build lulus. Bukti perubahan, browser, keyboard, serta ukuran layar ada pada [VERIFIKASI_BERANDA.md](VERIFIKASI_BERANDA.md). Bagian berikut mempertahankan catatan pemeriksaan prototipe lengkap sebelumnya; alur 27 kegiatan dan ekspor tidak diulang pada tugas Beranda.

## 1. Kesimpulan dan batas bukti

Proyek yang semula berisi beranda telah dilanjutkan menjadi prototipe pembelajaran dengan tiga modul, 27 kegiatan, 15 soal kuis, tiga simulasi, tiga video lokal, progres per profil, ruang guru, pengelolaan kelas, dan tiga jenis laporan CSV. Satu profil diuji melalui seluruh 27 kegiatan di browser. Progres dan nilai yang sama kemudian terlihat pada ruang guru.

**Build, lint, dan 69 tes otomatis lulus.** Alur utama browser dan tampilan pada kontainer selebar 360, 768, serta 1366 piksel diperiksa. Pemeriksaan ukuran layar menggunakan iframe dengan lebar tetap di Chrome pengujian; ini bukan pengujian pada perangkat HP atau laptop fisik milik pengguna.

Kegagalan penyimpanan, JSON rusak, dan versi tidak didukung diperiksa melalui tes layanan penyimpanan. Kegagalan kuota atau penolakan `localStorage` belum diinjeksi langsung ke browser aplikasi. Karena itu, AC18 dibedakan dari kriteria yang telah diperiksa langsung pada UI.

Pemeriksaan ini memverifikasi perilaku prototipe dan perhitungan acuannya. Pemeriksaan belum membuktikan efektivitas pembelajaran atau menggantikan penelaahan guru terhadap materi dan soal.

## 2. Kondisi awal dan perubahan

Pada pemeriksaan awal, proyek berisi beranda React + Vite, diagram entalpi, dialog modul, serta 12 tes lama. Dokumen di folder proyek belum mengikuti seluruh keputusan terbaru. `AGENTS.md` dan PRD di akar proyek telah diselaraskan dengan dokumen versi 2 sebelum implementasi dilanjutkan.

| Bagian | Hasil implementasi |
| --- | --- |
| Beranda | Identitas TermoKimia XI, tiga kartu modul, pratinjau diagram, panduan singkat, tautan ruang siswa/guru. |
| Pembelajaran | Tiga materi, dua contoh, satu kasus, satu simulasi, satu video/transkrip, dan satu kuis per modul. |
| Kuis | Lima soal per modul, pembahasan setelah setiap jawaban, jawaban terkunci per percobaan, pemulihan parsial, riwayat percobaan ulang. |
| Progres | Penyelesaian 9/9 membuka modul berikutnya tanpa ambang nilai; percobaan ulang tidak mengurangi progres. |
| Penyimpanan | `localStorage` tervalidasi, versi state/konten, penolakan penimpaan data rusak, status simpan yang mengikuti keberhasilan layanan. |
| Guru | Filter kelas, detail siswa, riwayat kuis, respons kasus, ringkasan simulasi, tambah/ubah kelas dan profil, pindah siswa. |
| Laporan | Ringkasan, seluruh jawaban kuis, serta aktivitas; UTF-8 BOM, escaping CSV, dan penetralan awalan formula. |
| Media | MP4 lokal 90/92/100 detik, poster, transkrip, VTT; teks dan diagram tanpa suara. |
| Dokumentasi | README untuk VS Code/Windows, panduan demo, penyuntingan konten, sumber, produksi video, dan hasil pemeriksaan. |

Komponen UI berada pada `src/components/`. Konten, aturan domain, layanan penyimpanan/laporan, hooks, dan gaya dipisahkan sesuai struktur pada AGENTS.

## 3. Perintah yang benar-benar dijalankan

Lingkungan pemeriksaan menggunakan **Node v24.19.0**. Versi paket mengikuti `package-lock.json` yang disertakan.

| Perintah | Hasil aktual |
| --- | --- |
| `npm run lint` | Kode keluar 0; ESLint tidak melaporkan kesalahan atau peringatan kode. |
| `npm test` | Kode keluar 0; **6 berkas dan 69 tes lulus** pada Vitest 5.0.5. |
| `npm run build` | Kode keluar 0; Vite 8.3.4 membangun 1.956 modul dan menghasilkan `dist/`. |

Keluaran npm memuat peringatan konfigurasi lingkungan `Unknown env config "http-proxy"`. Ini berbeda dari temuan ESLint dan tidak menggagalkan ketiga perintah.

Ukuran keluaran build utama: JavaScript **356,98 kB** sebelum gzip dan **107,89 kB** setelah gzip; CSS **67,39 kB** sebelum gzip dan **16,89 kB** setelah gzip. Media dan font lokal merupakan aset terpisah.

Log aktual tersedia di [lint.log](qa-results/lint.log), [test.log](qa-results/test.log), dan [build.log](qa-results/build.log). Rincian cakupan tes ada pada [VERIFIKASI_DOMAIN.md](VERIFIKASI_DOMAIN.md). Dari 69 tes tersebut, 57 menguji implementasi lengkap dan 12 merupakan tes fungsi beranda terdahulu; jumlah ini tidak berarti 69 skenario browser.

## 4. Kriteria penerimaan PRD

Kata **browser** pada tabel berarti tindakan dilakukan melalui kontrol aplikasi di Chrome pengujian. Kata **otomatis** berarti fungsi domain/layanan diperiksa melalui Vitest. Bukti otomatis tidak dianggap sebagai bukti tampilan UI.

| ID | Hasil | Bukti aktual dan batas pemeriksaan |
| --- | --- | --- |
| AC01 | Lulus, browser + otomatis | Alya mencapai 27/27 pada kelas XI B Uji; beralih ke Bima menampilkan 0/27 dan kelas XI Demo sebelum kegiatan Bima dikerjakan. Riwayat tetap terpisah. |
| AC02 | Lulus, browser + otomatis | Kelas XI B Demo dibuat; Alya dipindahkan; kelas diubah menjadi XI B Uji; Dara Demo ditambahkan. Riwayat Alya tetap. CSV kelas baru memuat kelas terkini dan siswa yang sesuai. Penghapusan kelas kosong diperiksa otomatis, tidak diklik pada browser. |
| AC03 | Lulus, browser + otomatis | Kartu M2 pada profil baru menampilkan halaman terkunci. URL langsung M2 untuk Bima juga ditolak. Penguncian M3 dan aturan seluruh prasyarat diuji otomatis. |
| AC04 | Lulus, browser + otomatis | Membuka materi awal belum menambah progres. Penandaan tiap materi/contoh menambah satu item; tombol selesai menjadi nonaktif. |
| AC05 | Lulus, browser + otomatis | Video dan transkrip menyelesaikan item yang sama. Berkas M3 sengaja dipindahkan sementara: pesan gagal muncul, transkrip dapat dibuka, dan progres naik dari 7/9 menjadi 8/9. Berkas MP4 asli dipulihkan sebelum pemeriksaan akhir. |
| AC06 | Lulus, browser + otomatis | Kasus kosong ditolak validasi formulir; progres tetap. Dua respons valid disimpan dan contoh pembahasan muncul. |
| AC07 | Lulus, browser + otomatis | M1 dijalankan satu kali dengan parameter bawaan −50 kJ dan tanpa catatan; hasil tersimpan dan item selesai. |
| AC08 | Lulus, browser + otomatis | Mengubah slider tanpa menjalankan tidak menambah progres. Massa 0 pada M2 ditolak dengan pesan rentang 50–250 g; setelah diganti 100 g, run berhasil. |
| AC09 | Lulus, browser + otomatis | M3 dijalankan dengan hanya kartu 1: hasil −111 kJ belum sesuai target, tetapi item selesai menjadi 1/9 setelah penyimpanan berhasil. |
| AC10 | Lulus, browser + otomatis | Setelah jawaban dikirim, kunci dan alasan langsung muncul; pilihan dikunci untuk percobaan tersebut. |
| AC11 | Lulus, browser + otomatis | M1 dijawab tiga soal, lalu halaman dimuat ulang. Percobaan pertama pulih dengan 3/5 jawaban; belum ada nilai akhir. Dua soal tersisa kemudian dapat dijawab. |
| AC12 | Lulus, browser + otomatis | M2 dengan tiga jawaban benar dari lima menampilkan **60/100**. |
| AC13 | Lulus, browser + otomatis | M1 dengan nilai **0/100** dan seluruh sembilan kegiatan selesai membuka M2. M2 benar-benar dibuka melalui tautan. |
| AC14 | Lulus, browser + otomatis | Bima mendapat **100/100**, menyelesaikan delapan kegiatan, dan meninggalkan simulasi. M2 tetap terkunci. Halaman terkunci mencantumkan simulasi yang tersisa. |
| AC15 | Lulus, browser + otomatis | Kuis M1 diselesaikan terlebih dahulu. Ketika video/transkrip terakhir selesai, status berubah menjadi 9/9 dan M2 terbuka. |
| AC16 | Lulus, browser + otomatis | Percobaan ulang M1 baru dijawab 1/5. Nilai selesai pertama/terakhir tetap 0, progres M1 tetap selesai, dan M2 tetap terbuka. |
| AC17 | Lulus, browser + otomatis | Jawaban pulih setelah reload. Masuk ruang guru memuat data tersimpan terbaru: nilai 0/60/100 dan progres 27/27 Alya sesuai alur siswa. |
| AC18 | Lulus pada domain/layanan; UI belum diinjeksi | Tes memeriksa kegagalan penulisan, akses ditolak, JSON rusak, dan versi tidak didukung. Review hook memastikan state baru hanya diterapkan setelah simpan berhasil. Pesan gagal kuota dan kondisi JSON rusak belum dibuktikan lewat injeksi langsung di browser. |
| AC19 | Lulus, browser + otomatis | Tiga tombol menghasilkan unduhan CSV yang dapat diparse. Ringkasan, jawaban, dan aktivitas memuat data yang sesuai; nilai 0 dibedakan dari kosong. |
| AC20 | Lulus, browser + otomatis | Ekspor percobaan kedua M1 memuat lima baris, empat soal belum dijawab, serta nilai akhir kosong. Simulasi satu run dengan catatan kosong tetap berstatus selesai. |
| AC21 | Lulus, browser + otomatis | Respons dengan koma, kutip, dan baris baru tetap utuh setelah CSV diparse. Catatan yang diawali `=1+1` diekspor dengan prefiks apostrof sehingga tidak menjadi formula aktif. |
| AC22 | Lulus pada ukuran browser uji; perangkat fisik belum diuji | Lebar 360/768/1366 diperiksa. Menu Enter/Escape, slider dengan tombol panah, run dengan Enter, kuis, filter kelas, dan kartu guru dapat digunakan. Tidak ditemukan overflow horizontal halaman pada tampilan yang diperiksa. |

### Data skenario utama

- **Alya Demo:** M1 nilai 0, percobaan ulang parsial 1/5; M2 nilai 60; M3 nilai 100. Seluruh 27 kegiatan selesai. Pemindahan kelas tidak menghapus hasil.
- **Bima Demo:** mula-mula 0/27; kemudian M1 nilai 100 dan 8/9 kegiatan untuk uji penguncian. Saat uji keyboard ukuran 360 px, simulasi terakhir dijalankan sehingga M1 menjadi 9/9. Setelah itu kuis ulang dijawab satu soal untuk memeriksa tampilan ponsel.
- Data tersebut hanya dibuat pada browser pemeriksaan. ZIP tidak membawa salinan `localStorage` browser; pemasangan baru mulai dari tiga profil fiktif dengan progres kosong.

## 5. Pemeriksaan perhitungan kimia

| ID | Hasil acuan dan hasil yang diamati | Metode |
| --- | --- | --- |
| KIM01 | −50 kJ, eksoterm; pembalikan +50 kJ, endoterm. | Tes fungsi; UI simulasi M1 menghasilkan −50 kJ dan arah kalor keluar. Tombol balik pratinjau beranda menampilkan +50 kJ. |
| KIM02 | Pada 100 g, 25 °C, 0,050 mol, dan −41,8 kJ/mol: q reaksi −2.090 J, q larutan +2.090 J, suhu akhir 30 °C. | Tes fungsi dan run UI M2. |
| KIM03 | Massa 200 g memberi 27,5 °C. Cabang endoterm +41,8 kJ/mol pada 100 g memberi 20 °C. | Tes fungsi dan dua run UI M2. |
| KIM04 | Kartu −111 dan −283 kJ memberi −394 kJ dengan CO dieliminasi. Keduanya dibalik memberi +394 kJ; faktor keduanya 2 memberi −788 kJ. | Tes fungsi dan tiga run UI M3. |
| KIM05 | Pembentukan 2HCl(g): 2 × (−92,3) = −184,6 kJ untuk persamaan tersebut. | Tes menggunakan angka contoh aktif pada konten; contoh dibuka dalam alur M3; pemeriksaan sumber dicatat pada VERIFIKASI_DOMAIN. |
| KIM06 | Energi pemutusan 436 + 243 = 679 kJ; besar energi pembentukan 2 × 432 = 864 kJ; estimasi ΔH = −185 kJ. | Tes menggunakan data contoh aktif dan pemeriksaan sumber; contoh dibuka dalam alur M3. |

Asumsi tekanan tetap dan hanya kerja ekspansi/kompresi dinyatakan ketika memakai qₚ = ΔH. Model kalorimeter mengabaikan kalor wadah dan kehilangan ke luar. Energi ikatan ditandai sebagai estimasi fase gas. Data ilustrasi tidak disajikan sebagai hasil percobaan nyata.

## 6. Video dan transkrip

| Media | Pemeriksaan berkas | Pemeriksaan browser |
| --- | --- | --- |
| M1 | 90 detik; H.264, 1280×720, 24 fps; dekode penuh lulus. | Play melalui keyboard; waktu maju sampai 5,7 detik, `error: null`, lalu dijeda. Transkrip dibuka dan item ditandai selesai. |
| M2 | 92 detik; format sama; dekode penuh lulus. | Play; waktu maju sampai 7,8 detik, `error: null`, lalu dijeda. Transkrip dan penandaan berhasil. |
| M3 | 100 detik; format sama; dekode penuh lulus. | Sesudah pemulihan berkas, waktu maju sampai 29,6 detik, `error: null`. Fallback transkrip pada berkas hilang diuji secara terpisah. |

Ketiganya menggunakan penjelasan teks/diagram **tanpa audio**. Durasi produksi 90–100 detik merupakan keputusan implementasi, lebih singkat daripada usulan 2–3 menit dalam lampiran PRD. Konten inti tetap disertakan. Pemutaran sampai akhir melalui browser, seek pada semua video, Safari/iOS, dan Android fisik belum diperiksa; dekode penuh FFmpeg mencakup seluruh frame tetapi tidak menggantikan pengujian browser tersebut.

Detail produksi tersedia pada [PRODUKSI_VIDEO.md](PRODUKSI_VIDEO.md); catatan sumber terdapat pada [SUMBER_KONTEN.md](SUMBER_KONTEN.md).

## 7. Responsivitas dan keyboard

Lebar ditetapkan pada iframe pengujian, dengan tinggi 960 px. Chrome memberikan scrollbar vertikal 15 px, sehingga area isi terukur 345, 753, dan 1351 px. Pada setiap pemeriksaan di bawah, `scrollWidth` halaman sama dengan `clientWidth`; tidak ada overflow horizontal halaman. Daftar kegiatan modul pada layar kecil memang dapat digulir secara horizontal di dalam panelnya.

| Lebar kontainer | Tampilan yang diperiksa | Hasil |
| ---: | --- | --- |
| 360 px | Beranda, ruang siswa, simulasi M1, kuis, ruang guru, filter kelas. | Isi dan kontrol dapat digunakan; halaman tidak melebar ke samping. |
| 768 px | Ruang guru dan pratinjau simulasi Hess. | Kartu dan rumus terbaca; hasil pratinjau −394 kJ ditampilkan. |
| 1366 px | Beranda, halaman modul/Hess, ruang guru. | Kolom, diagram, dan kartu berada dalam lebar halaman. |

Tombol menu diukur 44×44 px dan mempunyai outline fokus 3 px. Enter membuka menu, Escape menutupnya. Slider dapat diubah dengan tombol panah; Enter pada Jalankan simulasi berhasil menyimpan hasil. Jawaban kuis dan tombol pemeriksaan juga dapat dioperasikan tanpa seret-lepas. Teks utama materi, pilihan kuis, pembahasan, dan hasil simulasi menggunakan sekitar 16 px; label sekunder lebih kecil.

Belum dilakukan audit pembaca layar menyeluruh, pembesaran teks sistem, perangkat sentuh fisik, atau pengujian lintas browser. Pemeriksaan ini tidak dinyatakan sebagai sertifikasi aksesibilitas.

## 8. Pemeriksaan CSV hasil unduhan browser

Lima berkas benar-benar diunduh melalui kontrol aplikasi: tiga jenis laporan awal, ringkasan setelah pemindahan kelas, serta laporan aktivitas yang memuat catatan pengujian awalan formula. Berkas dibaca dengan `csv.DictReader` dan pengodean `utf-8-sig`.

- Ringkasan awal memuat 9 baris: tiga siswa × tiga modul.
- Rincian jawaban memuat 10 baris: dua percobaan M1 × lima soal.
- Laporan aktivitas awal memuat 18 baris: tiga siswa × tiga modul × dua jenis aktivitas.
- Ringkasan kelas baru memuat 6 baris: Alya dan Dara × tiga modul, seluruhnya memakai XI B Uji.
- Laporan aktivitas kelas baru memuat 12 baris; catatan awalan formula dinetralkan dan baris baru/kutip/koma tetap utuh.

Delapan assertion terhadap berkas unduhan lulus. Hasil terstruktur disimpan di [csv-browser.json](qa-results/csv-browser.json). Berkas juga diuji otomatis untuk kondisi kosong, nilai 0, percobaan parsial, dan escaping. Pembukaan di Microsoft Excel atau LibreOffice pada komputer pengguna belum diuji.

## 9. Temuan yang diperbaiki selama pemeriksaan

1. **Fokus navigasi kegiatan:** penjadwalan fokus dengan `requestAnimationFrame` dapat bersaing dengan interaksi berikutnya. Fokus kini diterapkan pada judul kegiatan setelah commit dengan `useLayoutEffect`; gulir global dibuat langsung. Alur materi kemudian berhasil dilanjutkan.
2. **Pesan media gagal:** error pada elemen `source` belum tertangani oleh handler video. Handler source ditambahkan, dan tanda pernah diputar memakai `onPlaying`. Skenario berkas hilang diulang dan transkrip berhasil digunakan.
3. **Respons kasus yang diedit:** label tersimpan sekarang membandingkan draf dengan respons yang benar-benar tersimpan.
4. **Ringkasan Hess guru:** kartu yang tidak digunakan tidak lagi ditampilkan sebagai penyumbang hasil.
5. **Perubahan kelas:** pemilih kelas membaca ulang penyimpanan; tombol Perbarui tidak mengklaim sukses jika pembacaan gagal.
6. **Tautan video:** sumber lokal mengikuti `BASE_URL`, sehingga tidak selalu mengarah ke root host.
7. **Halaman terkunci:** kini mencantumkan item yang masih harus diselesaikan dan mengarahkan ke prasyarat pertama yang belum lengkap.
8. **Tampilan HP:** jarak simbol ΔH pada statistik, ukuran teks belajar, dan beberapa target sentuh diperbaiki.
9. **Peringatan data rusak:** review akhir memastikan peringatan blokir tidak dapat disembunyikan, strip tidak mengklaim simpan sukses ketika ada masalah, dan halaman progres tidak menampilkan state kosong sebagai pengganti data yang belum dapat dibaca. Jalur kegagalan ini tetap berstatus belum diinjeksi langsung pada browser.
10. **Dokumentasi:** status produksi media dan panduan identitas diselaraskan; laporan beranda lama diberi label arsip.

Pratinjau sempat berhenti sehingga browser membuka halaman kesalahan koneksi. Pemeriksaan yang terhenti tidak dihitung lulus. Pratinjau kemudian dipulihkan melalui jalur pengembangan yang tersedia, dan uji reload diulang sampai jawaban parsial terlihat kembali. Log akhir yang dibaca tidak menunjukkan galat aplikasi non-ekstensi; browser pengujian sendiri menghasilkan beberapa galat metadata ekstensi yang tidak berasal dari kode aplikasi.

## 10. Pekerjaan lanjutan yang masih diperlukan

| Pekerjaan | Status dan alasan |
| --- | --- |
| Telaah guru terhadap materi, soal, fase zat, bahasa, dan kesesuaian alur pembelajaran | Belum dilakukan oleh guru; diperlukan sebelum penggunaan di kelas nyata sesuai PRD. |
| Coba pada HP/laptop fisik dan browser target | Belum dilakukan; pemeriksaan saat ini memakai Chrome dan kontainer berukuran tetap. |
| Injeksi kegagalan `localStorage` pada UI browser | Layanan telah diuji otomatis; penampakan banner dan pemulihan pada browser dengan storage ditolak masih perlu pemeriksaan lanjutan. |
| Uji video sampai akhir, seek, serta perangkat Safari/iOS/Android | Pemutaran awal dan fallback berhasil; cakupan perangkat masih terbatas. |
| Validasi instalasi pada komputer Windows pengguna | Panduan tersedia; `npm ci` dan perintah lain belum dijalankan pada komputer pengguna. |
| Identitas sekolah dan penyusun | Tetap kosong sesuai keputusan pengguna; dapat diisi pada `siteIdentity`. |

Backend, autentikasi sungguhan, sinkronisasi antarkomputer, dan impor pemulihan data berada di luar ruang lingkup prototipe saat ini. Pemilihan mode guru adalah fitur demonstrasi dan bukan pengamanan akses. Migrasi otomatis antarversi konten belum tersedia; jangan mengubah nomor versi data lama untuk memaksakan kecocokan.

## 11. Menjalankan pemeriksaan kembali

Di folder proyek yang berisi `package.json`, gunakan:

```sh
npm ci
npm run lint
npm test
npm run build
npm run dev
```

Buka alamat Local yang dicetak Vite. Ikuti [PANDUAN_DEMO.md](PANDUAN_DEMO.md) untuk skenario siswa–guru dan gunakan DevTools browser untuk memeriksa ukuran layar. Hasil laporan ini berlaku pada berkas yang dikemas bersama versi 0.2.0; perubahan selanjutnya perlu pemeriksaan yang sesuai.
