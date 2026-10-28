# PRD — TermoKimia XI

**Produk:** web pembelajaran termokimia kelas XI.  
**Versi dokumen:** 2.0 — 20 Oktober 2026.  
**Status:** spesifikasi untuk pembangunan prototipe demonstrasi; dilengkapi draf konten asli.  
**Pemilik kebutuhan:** calon guru kimia. Identitas sekolah dan penyusun ditambahkan kemudian.  
**Acuan keputusan terakhir:** jawaban pengguna pada 20 Oktober 2026 pukul 21.25 WIB.

## Ringkasan PRD

TermoKimia XI membantu siswa pemula menghubungkan fenomena sehari-hari, arah perpindahan kalor, tanda dan diagram ΔH, kalorimetri, serta penentuan ΔH reaksi. Pembelajaran disusun dalam tiga modul berurutan. Siswa memperoleh penjelasan lengkap sesudah mengirim setiap jawaban kuis. Guru dapat mengelola kelas contoh, melihat hasil setiap siswa, dan mengunduh rekap.

Versi pertama memperagakan alur siswa dan guru dengan data contoh pada satu perangkat dan browser. Progres disimpan secara lokal. Nama siswa serta kelas digunakan untuk tampilan; email dan kata sandi tidak diperlukan. Pilihan peran merupakan mode demonstrasi.

**Aturan inti:** modul selesai apabila semua materi dan aktivitas wajib selesai serta satu percobaan kuis telah menjawab seluruh soal. Nilai tidak menjadi syarat. Simulasi selesai setelah satu kali dijalankan dengan input valid dan hasil berhasil disimpan. Pengamatan tambahan pada simulasi bersifat opsional.

Empat kelompok fitur wajib adalah (1) modul dan aktivitas belajar, (2) kuis dan pembahasan, (3) profil demo serta progres, dan (4) pengelolaan kelas, pemantauan, serta ekspor oleh guru. Pencarian materi merupakan pengembangan tambahan.

Bagian utama menetapkan kebutuhan dan cara mengujinya. Lampiran menyediakan draf materi, contoh, soal, rancangan video, dan sumber sehingga produksi konten dapat langsung dimulai. Status kebutuhan yang ditetapkan, usulan operasional, dan aset yang masih harus diproduksi dijelaskan terpisah.

## 1. Keputusan pengguna dan usulan operasional

### 1.1 Keputusan pengguna yang wajib dipertahankan

| Aspek | Ketentuan |
| --- | --- |
| Nama | TermoKimia XI; identitas sekolah dan penyusun menyusul. |
| Sasaran | Siswa SMA kelas XI yang baru mempelajari termokimia. |
| Kurikulum | Kurikulum Merdeka; pemetaan materi mengacu pada bagian relevan CP Kimia Fase F. |
| Situasi belajar | Belajar mandiri, pembelajaran bersama guru, latihan/remedial, dan persiapan ulangan. |
| Tiga modul | Konsep Dasar Termokimia; Kalorimetri; Penentuan ΔH Reaksi. |
| Aktivitas utama | Kasus sehari-hari, contoh soal bertahap, simulasi interaktif, dan video penjelasan singkat. |
| Urutan akses | Berurutan; penyelesaian modul sebelumnya membuka modul berikutnya. |
| Syarat penyelesaian | Materi dan aktivitas selesai; seluruh pertanyaan kuis dijawab; tanpa nilai minimum. |
| Simulasi | Cukup menjalankan satu kali; tidak ada syarat dua konfigurasi atau refleksi wajib. |
| Kuis | Pilihan ganda konsep termokimia; pembahasan lengkap langsung setelah setiap jawaban dikirim. |
| Identitas siswa | Nama dan kelas, tanpa email. |
| Kebutuhan guru | Memantau setiap siswa, membuat/mengelola kelas, dan mengunduh rekap. |
| Isi rekap | Ringkasan nama, kelas, progres dan nilai tiap modul; rincian jawaban kuis beserta benar/salah; jawaban atau catatan aktivitas. |
| Penggunaan awal | Tugas kuliah atau demonstrasi media dengan alur siswa–guru dan data contoh pada satu perangkat. |
| Kondisi internet | Umumnya stabil dan kuota mencukupi. |
| Perangkat | HP dan laptop sama penting. |
| Desain | Minimalis, bersih, akademis; Bahasa Indonesia. |
| Teknologi | React + Vite sesuai pilihan pembangunan sebelumnya. |
| Kesiapan konten | Belum tersedia; materi, soal, dan sumber media disusun dalam pekerjaan ini. |

### 1.2 Usulan operasional untuk membuat kebutuhan dapat dibangun

- Lima soal pilihan ganda per modul: total 15 soal, masing-masing empat opsi dan satu jawaban benar.
- Tiga bagian materi, dua contoh bertahap, satu kasus dengan dua pertanyaan, satu simulasi, satu video beserta transkrip, dan satu kuis per modul.
- Sembilan item wajib per modul; total 27 item. Video dan transkrip mewakili satu item yang sama.
- Penyimpanan `localStorage` pada browser dan alamat aplikasi yang sama; satu kelas awal dengan tiga profil siswa fiktif.
- Tiga berkas CSV terpisah untuk tiga jenis laporan guru.
- Kasus selesai setelah dua respons tidak kosong dikirim. Jawaban bebas ditinjau manusia dan tidak diberi nilai otomatis.
- Nilai percobaan pertama selesai dan terakhir selesai dicatat. Pengulangan kuis tidak menghapus penyelesaian sebelumnya.

Jumlah konten, format CSV, jumlah profil awal, dan rincian tindakan di atas adalah keputusan rancangan yang dapat disesuaikan. Aturan pada bagian 1.1 tetap menjadi dasar perubahan.

## 2. Masalah belajar, tujuan, dan batas keberhasilan

### Masalah yang ditangani

Siswa membutuhkan bantuan untuk mengaitkan pengamatan, batas sistem, perpindahan kalor, tanda ΔH, diagram, dan operasi perhitungan. Fokus rancangan mencakup kebingungan antara kalor dan suhu, tanda kalor sistem dan lingkungan, penggunaan massa larutan serta satuan, dan perubahan ΔH saat persamaan reaksi diubah. Ini adalah masalah yang dipilih dalam penggalian kebutuhan, bukan hasil survei atau diagnosis siswa yang telah dilakukan.

### Tujuan produk

1. Menyediakan jalur belajar dari konsep menuju penggunaan data reaksi secara bertahap.
2. Memperlihatkan hubungan perubahan variabel dan hasil melalui model interaktif yang asumsi serta satuannya jelas.
3. Membantu siswa memperbaiki alasan jawabannya melalui pembahasan langsung.
4. Menyimpan kelengkapan belajar agar siswa dapat melanjutkan pada browser yang sama.
5. Menyediakan bukti kegiatan dan hasil latihan yang dapat ditinjau dan diekspor oleh guru.

Keberhasilan prototipe dinilai dari ketepatan konten dan berfungsinya alur siswa–guru. Progres 100% berarti kegiatan wajib selesai. Nilai kuis berulang setelah pembahasan tidak otomatis membuktikan peningkatan kemampuan yang independen. Efektivitas pembelajaran memerlukan evaluasi tersendiri setelah penggunaan.

## 3. Acuan kurikulum dan susunan modul

Dokumen kurikulum yang dijadikan acuan adalah Keputusan Kepala BSKAP Nomor 046/H/KR/2025, bagian Kimia Fase F. Bagian ini mengaitkan perubahan entalpi standar reaksi dengan sumber energi di sekitar siswa. Fase F mencakup kelas XI–XII; penempatan pada kelas XI dan pembagian tiga modul merupakan pemetaan produk yang dapat diselaraskan dengan ATP sekolah. Dokumen ini mencakup topik termokimia yang relevan, bukan seluruh CP Kimia Fase F. [R1]

| Modul | Tiga bagian materi | Tujuan yang dapat diperiksa | Simulasi utama |
| --- | --- | --- | --- |
| M1 — Konsep Dasar Termokimia | Kalor/suhu serta sistem–lingkungan; eksoterm/endoterm; tanda dan diagram ΔH. | Menetapkan sistem, menentukan arah kalor, dan menghubungkan tanda ΔH dengan entalpi reaktan serta produk. | Peta entalpi dan arah kalor. |
| M2 — Kalorimetri | Pengukuran suhu dan kapasitas kalor; kalorimetri ideal; kalor reaksi dan ΔH per mol. | Membaca data, memakai `q = mcΔT`, membedakan kalor larutan dari kalor reaksi, dan menjelaskan pengaruh variabel. | Kalorimeter ideal. |
| M3 — Penentuan ΔH Reaksi | Hukum Hess; entalpi pembentukan standar; estimasi energi ikatan. | Memilih metode, menerapkan perubahan koefisien dan arah reaksi, serta menjelaskan koefisien, fase dan batas pendekatan energi ikatan. | Penyusun Hukum Hess. |

Sediakan pengingat mol, koefisien reaksi, fase zat, konversi J–kJ, dan ΔT. Pengingat dapat dibuka kembali dan tidak menjadi pengunci tambahan. Contoh numerik disertakan untuk membantu pemahaman, sedangkan kuis utama menekankan konsep dan interpretasi.

### Paket konten awal

| Jenis konten | Per modul | Total tiga modul |
| --- | ---: | ---: |
| Bagian materi | 3 | 9 |
| Contoh soal bertahap | 2 | 6 |
| Kasus dengan dua pertanyaan panduan | 1 | 3 |
| Simulasi | 1 | 3 |
| Video singkat dan transkrip setara | 1 | 3 |
| Soal kuis | 5 | 15 |
| Item wajib yang dihitung untuk progres | 9 | 27 |

Lampiran materi dan soal merupakan draf asli yang siap ditinjau calon guru sebelum dimasukkan ke aplikasi. Pembuatan berkas video dan pengujian pemutarannya termasuk tahap produksi, bukan hasil yang sudah dinyatakan selesai dalam PRD.

## 4. Empat kelompok fitur wajib

| ID | Kelompok fitur | Kebutuhan versi pertama |
| --- | --- | --- |
| F1 | Modul dan aktivitas belajar | Materi, kasus, contoh bertahap, simulasi, video/transkrip, tujuan dan sumber pada tiga modul. |
| F2 | Kuis dan pembahasan | Pilihan ganda, periksa per jawaban, pembahasan lengkap, hasil dan percobaan ulang. |
| F3 | Profil demo dan progres | Nama/kelas, pemilihan siswa, pemisahan progres, penyimpanan lokal, dan pembukaan modul berurutan. |
| F4 | Mode guru dan laporan | Pengelolaan kelas serta profil contoh, pemantauan tiap siswa, rincian jawaban, dan tiga ekspor laporan. |

**Tambahan setelah fitur inti:** pencarian materi. Akun sungguhan, sinkronisasi lintas perangkat, pengelolaan banyak sekolah, editor materi, chatbot, sertifikat dan analitik lanjutan berada pada tahap pengembangan berikutnya. Ekspor dan pengelolaan kelas sudah termasuk F4 pada versi pertama.

## 5. Halaman dan alur penggunaan

| Halaman | Informasi dan tindakan |
| --- | --- |
| Beranda | Navbar, judul TermoKimia XI, pengantar, tiga kartu materi, tombol Mulai Demo. |
| Pilih peran/profil | Mode Siswa atau Guru; pemilihan profil fiktif; label Data demonstrasi. |
| Dashboard siswa | Nama, kelas, progres, status modul, kegiatan tersisa, dan Lanjutkan belajar. |
| Modul | Tujuan, navigasi item wajib, materi, contoh, kasus, simulasi, video/transkrip, kuis, dan sumber. |
| Kuis | Opsi jawaban, Periksa jawaban, pembahasan, jumlah soal dijawab, hasil dan Ulangi kuis. |
| Dashboard guru | Pilihan kelas, daftar siswa, progres/nilai per modul, akses detail dan unduh laporan. |
| Kelola kelas | Buat/ubah kelas, tambah/ubah profil siswa, dan pindahkan siswa. |
| Detail siswa | Kelengkapan item, percobaan kuis, jawaban, respons kasus, serta hasil dan catatan simulasi. |
| Bantuan dan sumber | Petunjuk kedua peran, glosarium, daftar rujukan, dan informasi model demonstrasi. |

**Alur siswa:** pilih profil → lihat M1 → pelajari materi dan contoh → jawab kasus → jalankan simulasi → buka video/transkrip → jawab semua kuis → lihat modul berikutnya terbuka ketika semua syarat lengkap. Urutan kegiatan di dalam modul boleh dipilih siswa.

**Alur guru:** pilih mode Guru → pilih atau buat kelas → lihat siswa → buka rincian hasil → unduh laporan yang diperlukan. Beralih dari siswa ke guru pada browser yang sama harus menampilkan data yang baru tersimpan.

Guru dapat meninjau semua materi untuk persiapan tanpa menambah progres siswa. Beranda yang sebelumnya dibangun menjadi bagian awal dari alur lengkap ini.

## 6. Aturan penyelesaian dan progres

### 6.1 Definisi selesai per item

| Item | Kondisi selesai | Pengaruh terhadap progres |
| --- | --- | --- |
| Materi Mx-MAT01–03 | Bagian dibuka dan siswa menekan Tandai selesai. | Masing-masing satu item. |
| Contoh Mx-EX01–02 | Contoh dibuka dan ditandai selesai. | Masing-masing satu item. |
| Video/transkrip Mx-VID01 | Salah satu bentuk dibuka dan item ditandai selesai. | Satu item bersama; tidak dihitung dua kali. |
| Kasus Mx-CASE01 | Dua pertanyaan dijawab, masing-masing 1–1.000 karakter setelah `trim`, lalu berhasil disimpan. | Satu item; ketepatan respons bukan pengunci. |
| Simulasi Mx-SIM01 | Satu klik Jalankan simulasi dengan input valid, model berhasil dihitung, dan hasil tersimpan. | Satu item; catatan pengamatan opsional. |
| Kuis Mx-QUIZ01 | Semua lima soal pada setidaknya satu percobaan telah dijawab dan tersimpan. | Satu item; nilai dapat 0. |

Membuka halaman simulasi, melihat hasil pratinjau, atau menggeser kontrol saja belum menyelesaikan simulasi. Parameter bawaan yang valid boleh langsung dijalankan tanpa harus diubah. Percobaan tambahan dan catatan pengamatan tidak menjadi syarat baru. Pada Hess, hasil yang belum sesuai target tetap merupakan satu percobaan valid; tampilkan penjelasan, tanpa mengubahnya menjadi pengunci berbasis ketepatan.

Konfirmasi membaca materi mencatat tindakan siswa, bukan mengukur pemahaman otomatis. Kasus dan catatan bebas menampilkan contoh pembahasan setelah dikirim; penilaian esai otomatis tidak diperlukan.

### 6.2 Status dan perhitungan

| Status | Kondisi |
| --- | --- |
| Terkunci | Ada modul sebelumnya yang belum selesai. |
| Belum dimulai | Modul tersedia; belum ada item atau jawaban yang tercatat. |
| Sedang dipelajari | Ada kegiatan tercatat, tetapi seluruh syarat belum lengkap. |
| Selesai | Semua sembilan item wajib selesai. |

Progres modul = `item wajib selesai / 9 × 100%`; progres keseluruhan = `total item wajib selesai / 27 × 100%`. Tampilkan juga pecahan, misalnya 4/9 item, agar persentase mudah dimengerti. Kuis parsial ditampilkan terpisah, misalnya 3/5 soal dijawab, dan belum menyelesaikan item kuis.

```text
moduleCompleted =
  semuaMateriDanContohSelesai
  AND videoAtauTranskripSelesai
  AND kasusTerkirim
  AND jumlahRunSimulasiValidTersimpan >= 1
  AND adaPercobaanKuisDenganSemuaSoalTerkirim

M1 terbuka sejak awal.
M2 terbuka jika M1 selesai.
M3 terbuka jika M1 dan M2 selesai.
```

Pemeriksaan berjalan setelah setiap perubahan berhasil disimpan, termasuk ketika siswa menyelesaikan kuis lebih dahulu. Modul yang telah selesai dan terbuka tetap demikian saat latihan diulang. Pengulangan yang belum selesai atau bernilai lebih rendah tidak menurunkan progres. Akses melalui URL langsung tetap mengikuti aturan pada antarmuka demo.

## 7. Spesifikasi tiga simulasi

Ketiganya menggunakan tombol **Jalankan simulasi** yang jelas. Sesudah satu hasil valid tersimpan, tampilkan “Simulasi selesai” dan sediakan catatan opsional. Simpan jumlah menjalankan, waktu pertama selesai, waktu terakhir, input terakhir, hasil terakhir, serta catatan bila diisi.

### SIM1 — Peta entalpi dan arah kalor

- Input: entalpi relatif reaktan 0 dan produk −100 sampai +100 kJ untuk basis reaksi model yang tertulis; tombol balik arah.
- Output: ΔH = H_produk − H_reaktan, tingkat entalpi, tanda, klasifikasi, dan arah kalor terhadap sistem.
- Membalik reaksi menukar keadaan awal–akhir dan membalik tanda ΔH.
- Pada ΔH = 0, jelaskan bahwa model tidak menunjukkan perubahan entalpi bersih.
- Diagram berlabel entalpi relatif dan kemajuan reaksi; tinggi diagram bukan suhu, dan diagram ini tidak menentukan laju reaksi.
- Model memperlihatkan kaitan kalor dan ΔH pada tekanan tetap dengan hanya kerja ekspansi/kompresi. [R4, R6]

### SIM2 — Kalorimeter ideal

| Parameter | Rancangan awal |
| --- | --- |
| Massa larutan | 50–250 g |
| Suhu awal | 20–35 °C |
| Jumlah reaksi pada basis model 1:1 | 0,010–0,050 mol |
| Kalor jenis larutan | 4,18 J g⁻¹ °C⁻¹; konstan pada model |
| Entalpi molar model | −41,8 atau +41,8 kJ/mol; data ilustrasi |

Rumus model: `q_reaksi = n × ΔH_m`; ubah kJ ke J; `q_larutan = −q_reaksi`; `ΔT = q_larutan/(m × c)`; `T_akhir = T_awal + ΔT`. Asumsi: tekanan tetap, hanya kerja ekspansi/kompresi, kalor wadah dan kehilangan ke luar diabaikan, sifat larutan tetap, tanpa perubahan fase. Massa yang digunakan adalah massa larutan. [R5]

Tampilkan kalor larutan dan reaksi dengan tanda berbeda, suhu awal/akhir, serta substitusi perhitungan. Input kosong, bukan angka, atau di luar rentang menghasilkan petunjuk; hasil sebelumnya tidak dilabeli sebagai hasil input tidak valid.

### SIM3 — Penyusun Hukum Hess

Gunakan kartu data bertanda fase dan kondisi yang konsisten:

1. C(grafit) + ½O₂(g) → CO(g); ΔH = −111 kJ.
2. CO(g) + ½O₂(g) → CO₂(g); ΔH = −283 kJ.
3. Target: C(grafit) + O₂(g) → CO₂(g); ΔH = −394 kJ.

Data dibulatkan mengikuti contoh sumber. [R6] Siswa dapat membalik kartu dan mengalikan seluruh koefisien dengan ½, 1, atau 2. ΔH mengikuti perubahan yang sama. Sistem menjumlahkan reaksi, mengeliminasi spesies identik, dan menampilkan apakah hasil sesuai target. Reaksi yang belum cocok mendapat penjelasan dan kesempatan mencoba lagi secara opsional. Satu run valid tetap menyelesaikan item simulasi. Sediakan tombol dan keyboard; seret-lepas hanya pilihan tambahan.

## 8. Kuis, nilai, dan umpan balik

1. Siswa memilih satu dari empat opsi dan dapat mengubah pilihan sebelum menekan Periksa jawaban.
2. Setelah tersimpan, tampilkan benar/belum tepat, jawaban yang benar, alasan, dan penjelasan miskonsepsi. Bila ada hitungan, sertakan data, rumus, substitusi, satuan serta makna hasil.
3. Jawaban terkunci untuk soal tersebut dalam percobaan yang sama; satu soal tidak dinilai berulang setelah pembahasannya terlihat.
4. Paling banyak ada satu percobaan aktif per siswa per modul. Percobaan parsial dilanjutkan setelah muat ulang.
5. Nilai akhir hanya muncul setelah semua soal dijawab: `100 × jumlah benar / jumlah soal`. Tiga benar dari lima menghasilkan 60.
6. Sebelum selesai, tampilkan jumlah soal terjawab. Nilai akhir kosong; jawaban belum dikirim tidak diberi status salah.
7. Ulangi kuis membuat percobaan baru setelah percobaan sebelumnya selesai. Simpan hasil pertama selesai dan terakhir selesai beserta setiap jawaban.
8. Nilai tidak dipakai dalam logika pembukaan modul. Nilai 0 sah dan berbeda dari belum mempunyai nilai.

Susunan opsi tetap cukup untuk prototipe. Draf 15 soal ada dalam lampiran. Kunci tidak diperlakukan sebagai rahasia ujian pada demo lokal, karena tujuan kuis adalah latihan dengan pembahasan langsung.

## 9. Pengelolaan kelas dan dashboard guru

### Pengelolaan minimum

- Membuat kelas dengan nama yang tidak kosong dan mengganti nama kelas.
- Menambahkan profil siswa fiktif berisi nama dan kelas; mengubah nama tampilan.
- Memindahkan siswa ke kelas lain tanpa mengubah ID atau menghapus riwayat.
- Kelas berisi siswa tidak dihapus sebelum siswa dipindahkan. Penghapusan data dan reset demo menggunakan tindakan khusus dengan konfirmasi di aplikasi.

Setiap kelas mempunyai `classId` dan siswa mempunyai `studentId` yang stabil. Nama sama boleh ada; gunakan ID untuk membedakan data. Laporan memakai kelas siswa saat ekspor. Pelacakan seluruh riwayat perpindahan kelas belum diperlukan pada prototipe.

### Pemantauan

Dashboard menampilkan nama/kelas, status ketiga modul, item selesai/total, jumlah soal pada percobaan aktif, nilai pertama dan terakhir yang selesai, serta waktu pembaruan. Detail siswa memuat jawaban tiap soal dan respons aktivitas. Guru dapat memfilter berdasarkan kelas dan membuka siswa tertentu. Tampilan diperbarui ketika masuk mode guru, mengganti kelas, atau menekan Perbarui.

## 10. Tiga laporan yang dapat diunduh

Format awal yang diusulkan adalah tiga CSV UTF-8, masing-masing dari kelas yang sedang dipilih. Tampilkan jenis laporan dan cakupan kelas sebelum unduh.

| Berkas | Satuan baris | Kolom minimum |
| --- | --- | --- |
| `rekap_belajar.csv` | Satu siswa per modul; termasuk siswa yang belum mulai. | ID siswa, nama, kelas saat ekspor, ID/nama modul, status, item selesai, total item, progres persen, soal aktif terjawab, nilai pertama selesai, nilai terakhir selesai, waktu ekspor. |
| `rincian_jawaban_kuis.csv` | Satu soal per percobaan; semua soal dari percobaan parsial ikut. | ID/nama siswa, kelas, modul, ID/nomor/status percobaan, versi konten, ID/teks soal, opsi siswa, kunci, status jawaban, benar/salah, waktu kirim. |
| `catatan_aktivitas.csv` | Satu aktivitas kasus atau simulasi per siswa per modul. | ID/nama siswa, kelas, modul, ID/jenis aktivitas, status, waktu pertama selesai, waktu perubahan terakhir, respons kasus 1–2, jumlah run simulasi, input/hasil terakhir, catatan pengamatan bila ada. |

Ketentuan data laporan:

- Nilai yang belum tersedia diekspor kosong; nilai nol diekspor `0`.
- Soal belum dijawab menggunakan status `Belum dijawab`, pilihan kosong dan benar/salah kosong. Soal tersebut tidak dihitung sebagai salah.
- Profil yang belum memulai kuis tetap muncul pada ringkasan; tidak perlu membuat percobaan palsu pada laporan jawaban.
- Catatan simulasi kosong diperbolehkan walaupun simulasinya selesai. Gunakan keterangan `Tidak diisi` pada tampilan; jangan mengarang jawaban siswa.
- Laporan aktivitas menyimpan snapshot hasil simulasi terakhir, jumlah run, serta waktu pertama dan terakhir; label ini harus jelas dan tidak disebut riwayat lengkap semua run.
- Terapkan pengutipan CSV untuk koma, tanda kutip, dan baris baru. Nama, kelas dan jawaban bebas diperlakukan sebagai teks, termasuk karakter awal yang dapat dibaca sebagai formula oleh aplikasi spreadsheet.
- Angka nilai/progres tetap numerik. Waktu tersimpan dalam format konsisten dan ditampilkan menggunakan zona Asia/Jakarta.

## 11. Tampilan dan kemudahan penggunaan

Desain minimalis akademis mengutamakan teks, diagram, dan tindakan belajar. Usulan palet: latar putih/krim muda, teks gelap, aksen hijau atau biru kehijauan. Identitas sekolah serta penyusun mudah ditambahkan. Taste Skill, bila digunakan, membantu konsistensi visual dengan tetap mengikuti kebutuhan produk ini.

| Aspek | Target rancangan |
| --- | --- |
| Responsif | Satu kolom pada HP; tiga kartu beranda dapat sejajar pada laptop. Tabel guru menjadi kartu pada layar sempit. |
| Keterbacaan | Teks isi sekitar 16 px atau lebih; paragraf pendek; istilah diberi penjelasan. |
| Kontrol | Area sentuh ditargetkan 44 × 44 px; label dan fokus keyboard terlihat. |
| Simulasi | Penggeser dilengkapi nilai numerik dan alternatif tombol; hasil memiliki keterangan teks. |
| Warna | Status eksoterm/endoterm, benar/salah, dan terkunci menggunakan teks/simbol selain warna. |
| Notasi | Subskrip, superskrip, ΔH, fase, satuan dan tanda negatif konsisten; misalnya H₂O, Ca²⁺, kJ/mol. |
| Media | Video tidak autoplay, dapat dijeda, dan mempunyai transkrip setara. |
| Pesan | Instruksi membimbing: kegiatan yang tersisa, alasan terkunci, serta tindakan saat simpan gagal. |

Uji rancangan pada lebar 360, 768, dan 1366 px, serta HP dan laptop yang tersedia. Angka di atas merupakan target desain, bukan klaim bahwa pengujian sudah dilakukan.

## 12. Penyimpanan dan rancangan teknis

### 12.1 Batas demonstrasi

React + Vite digunakan untuk antarmuka. Materi/soal disimpan sebagai data konten terstruktur. Fungsi hitung simulasi, evaluasi kuis dan aturan progres dipisahkan dari komponen tampilan. Gunakan `localStorage` untuk satu payload data demo berversi, misalnya `termokimia-xi:demo:v2`.

Pergantian mode siswa–guru membaca data yang sama. Muat ulang pada browser dan alamat aplikasi yang sama mempertahankan data. Browser lain, mode privat, penghapusan data situs, atau alamat aplikasi yang berbeda tidak dijanjikan memiliki data yang sama. Penggunaan siswa sungguhan lintas perangkat membutuhkan rancangan penyimpanan bersama dan autentikasi pada tahap berikutnya. [R9]

### 12.2 Struktur data minimum

| Entitas | Data inti |
| --- | --- |
| Aplikasi | `schemaVersion`, `contentVersion`, waktu pembaruan, profil aktif, mode aktif. |
| Kelas | `classId`, nama, status aktif. |
| Profil siswa | `studentId`, nama tampilan fiktif, `classId`. |
| Modul dan item | ID, urutan, jenis, wajib/opsional, sumber, versi. |
| Progres item | Siswa, item, selesai, waktu selesai pertama. |
| Kasus | Siswa, aktivitas, dua respons, waktu kirim/perubahan. |
| Simulasi | Siswa, simulasi, run valid tersimpan, input/hasil terakhir, waktu pertama/terakhir, catatan opsional. |
| Percobaan kuis | ID percobaan, siswa, modul, nomor, status, waktu mulai/selesai, nilai akhir. |
| Jawaban | Percobaan, soal, pilihan, kunci/versi soal, benar/salah, waktu kirim. |

Penulisan yang gagal tidak boleh dilabeli berhasil. Pertahankan isian di layar, tampilkan Belum tersimpan dan Coba lagi, serta jangan membuka modul akibat perubahan yang gagal disimpan. Cegah duplikasi jawaban untuk kombinasi percobaan–soal. Nilai dihitung dari kunci soal dan respons, bukan masukan angka bebas.

Jika data tidak terbaca atau versi tidak didukung, berikan pesan pemulihan tanpa crash dan tanpa diam-diam menimpa data lama. Reset data demo dilakukan secara eksplisit. Versi konten dibekukan selama demonstrasi agar kunci dan teks soal tetap cocok dengan jawaban.

## 13. Kriteria penerimaan aplikasi

Semua baris berikut adalah rencana pengujian setelah implementasi. Belum ada status lulus yang diberikan oleh dokumen ini.

| ID | Skenario | Hasil yang diharapkan |
| --- | --- | --- |
| AC01 | Memilih dua profil siswa bergantian. | Nama/kelas/progres/jawaban terpisah sesuai ID. |
| AC02 | Membuat/mengubah kelas dan memindahkan siswa. | Data tersimpan; riwayat tetap; laporan memakai kelas terkini. |
| AC03 | Siswa baru membuka M2 melalui kartu maupun URL langsung. | M1 terbuka, M2/M3 terkunci; alasan dan langkah berikutnya jelas. |
| AC04 | Membuka lalu menandai materi/contoh selesai. | Buka saja belum selesai; penandaan menambah tepat satu item. |
| AC05 | Membuka video lalu transkrip untuk item sama. | Maksimal satu item selesai; jika video gagal, transkrip tetap bisa digunakan. |
| AC06 | Mengirim kasus kosong lalu dua respons valid. | Kosong ditolak; respons valid tersimpan dan contoh pembahasan muncul. |
| AC07 | Membuka simulasi, kemudian menjalankan parameter bawaan valid sekali. | Aktivitas selesai setelah hasil tersimpan; tidak memerlukan perubahan parameter, run kedua atau catatan. |
| AC08 | Menggeser kontrol tanpa menjalankan, atau memakai input tidak valid. | Tidak ada penyelesaian baru; petunjuk input terlihat. |
| AC09 | Menjalankan Hess sekali dengan susunan valid yang belum sesuai target. | Penjelasan ketidaksesuaian tampil; item tetap selesai sesudah hasil tersimpan. |
| AC10 | Mengirim satu jawaban kuis. | Respons terkunci untuk percobaan itu; kunci dan pembahasan lengkap langsung terlihat. |
| AC11 | Menjawab tiga soal lalu muat ulang. | Percobaan parsial berlanjut; dua soal kosong berstatus belum dijawab; nilai akhir kosong. |
| AC12 | Menyelesaikan kuis dengan tiga dari lima jawaban benar. | Nilai akhir 60. |
| AC13 | Menyelesaikan seluruh item dengan nilai kuis 0. | Modul selesai dan modul berikutnya terbuka. |
| AC14 | Nilai kuis 100, tetapi satu aktivitas wajib belum selesai. | Modul berikutnya tetap terkunci dan item tersisa ditunjukkan. |
| AC15 | Kuis diselesaikan lebih dahulu, kemudian item wajib terakhir. | Pemeriksaan berjalan lagi dan modul berikutnya terbuka. |
| AC16 | Mengulang kuis lalu berhenti di tengah. | Hasil pertama tetap; progres selesai dan modul terbuka tidak mundur. |
| AC17 | Muat ulang browser dan beralih ke mode guru. | Data valid yang tersimpan pulih dan guru melihat hasil terbaru. |
| AC18 | Simulasi penulisan penyimpanan gagal atau data rusak. | Pesan sesuai; tidak ada klaim simpan sukses, kehilangan diam-diam, atau crash. |
| AC19 | Guru mengekspor ketiga laporan. | Semua jenis informasi yang diminta ada dan sesuai kelas/profil; nilai kosong berbeda dari 0. |
| AC20 | Ekspor percobaan parsial dan simulasi tanpa catatan. | Soal kosong tidak salah; nilai akhir kosong; catatan kosong sah; status simulasi tetap selesai. |
| AC21 | Ekspor respons berisi koma, kutip, baris baru, dan awalan formula. | CSV terbaca utuh; teks bebas tidak menjadi formula aktif. |
| AC22 | Menggunakan alur inti pada HP, laptop dan keyboard. | Tidak ada kontrol tertutup, teks penting terpotong, atau interaksi wajib yang hanya dapat diseret. |

### Pemeriksaan konsep dan hitungan

| ID | Data/tindakan | Hasil yang harus cocok |
| --- | --- | --- |
| KIM01 | H_reaktan 0; H_produk −50 kJ; lalu balik arah. | ΔH −50 kJ/eksoterm/kalor keluar sistem; setelah dibalik +50 kJ/endoterm. |
| KIM02 | m=100 g, c=4,18, T_awal=25 °C, n=0,050 mol, ΔH_m=−41,8 kJ/mol. | q_reaksi=−2.090 J; q_larutan=+2.090 J; T_akhir=30 °C. |
| KIM03 | KIM02, massa 200 g; lalu model endoterm +41,8 kJ/mol pada 100 g. | Massa 200 g memberi 27,5 °C; cabang endoterm 100 g memberi 20 °C. |
| KIM04 | Menjumlahkan kartu Hess −111 dan −283 kJ. | CO dieliminasi; total −394 kJ; dibalik +394; dikali dua −788 kJ. |
| KIM05 | H₂(g)+Cl₂(g)→2HCl(g), ΔH_f° HCl(g)=−92,3 kJ/mol; unsur standar=0. | ΔH persamaan = −184,6 kJ. |
| KIM06 | Reaksi KIM05; D(H–H)=436, D(Cl–Cl)=243, D(H–Cl)=432 kJ/mol ikatan. | Energi pemutusan 679; besar energi pembentukan 864; estimasi ΔH=−185 kJ. |

KIM01–03 memakai data model ilustrasi. KIM04–06 memakai data pembulatan pada R6–R7. Periksa hasil sebelum pembulatan tampilan. Kalor bukan energi yang tersimpan; ΔH bukan suhu. Hubungan `q_p = ΔH` menyertakan kondisi tekanan tetap dan hanya kerja ekspansi/kompresi. Entalpi pembentukan memperhitungkan fase serta koefisien; energi ikatan merupakan pendekatan fase gas. [R4–R7]

## 14. Urutan pengerjaan dan definisi selesai

| Tahap | Hasil konkret |
| --- | --- |
| 1 — Konten dan rancangan | Tinjau lampiran materi/soal, siapkan transkrip/video, dan susun layar siswa–guru. |
| 2 — Satu alur lengkap | M1, pemilihan profil, penyimpanan, kuis, pembukaan M2, serta perubahan data yang terlihat guru. |
| 3 — Melengkapi produk | M2/M3, simulasi, kelola kelas, rincian siswa, dan tiga unduhan CSV. |
| 4 — Pemeriksaan | Jalankan AC01–AC22, KIM01–KIM06, serta pemeriksaan tampilan; catat hasil aktual. |
| 5 — Demonstrasi | Siapkan data contoh, panduan siswa/guru, sumber dan laporan pengujian. |

Prototipe selesai ketika F1–F4 berfungsi, konten minimum tersedia, ketiga video dapat diputar dan mempunyai transkrip, perhitungan benar, ekspor sesuai, serta alur HP/laptop berhasil diperiksa. Jika yang tersedia baru transkrip, catat bahwa produksi video belum selesai; transkrip tetap dapat menjadi jalur penyelesaian item bagi siswa.

**Skenario demo:** pilih siswa baru; jalankan satu simulasi tanpa catatan; lengkapi kegiatan; jawab kuis termasuk jawaban salah; lihat pembahasan dan M2 terbuka tanpa ambang nilai; beralih ke guru; lihat rincian; unduh tiga laporan; buat kelas dan pindahkan profil tanpa kehilangan progres.

Jadwal, identitas penyusun, sekolah, dan rubrik tugas tambahan dapat dimasukkan kemudian. Kebutuhan inti sudah cukup untuk memulai pengembangan. PRD ini menetapkan fitur pembelajaran lengkap; tahapan implementasi dapat dimulai dari beranda yang telah dirancang sebelumnya.

## 15. Sumber, pemakaian, dan status aset

Rujukan kurikulum digunakan untuk pemetaan. Bahan ajar lama digunakan untuk konsep, dengan penyesuaian istilah dan alur terhadap CP yang dipilih. Materi, pertanyaan dan contoh dalam lampiran disusun sebagai draf asli; kebenaran konsep serta kecocokan untuk siswa tetap ditinjau sebelum publikasi.

| ID | Sumber | Penggunaan |
| --- | --- | --- |
| R1 | BSKAP (2025), Keputusan 046/H/KR/2025, bagian Kimia Fase F, halaman PDF 169–172. [PDF resmi](https://kurikulum.kemendikdasmen.go.id/file/1753929861_manage_file.pdf). | Pemetaan CP, bukan penetapan seluruh urutan materi kelas XI oleh dokumen ini. |
| R2 | Rara, Sudiarto, dan Nestiyarum (2018), E-modul kimia kelas XI: termokimia. [Repositori resmi](https://repositori.kemendikdasmen.go.id/20655/). | Sumber konsep berbahasa Indonesia; terbit sebelum Kurikulum Merdeka. |
| R3 | Sriyanto (2020), Modul pembelajaran SMA kimia kelas XI: jenis-jenis dan penentuan entalpi reaksi. [Repositori resmi](https://repositori.kemendikdasmen.go.id/22156/). | Sumber penentuan entalpi; modul berbasis KD digunakan sebagai referensi konsep. |
| R4 | OpenStax, Chemistry 2e, 5.1 Energy Basics. [Baca](https://openstax.org/books/chemistry-2e/pages/5-1-energy-basics). | Pemeriksaan kalor, suhu dan arah perpindahan energi. |
| R5 | OpenStax, Chemistry 2e, 5.2 Calorimetry. [Baca](https://openstax.org/books/chemistry-2e/pages/5-2-calorimetry). | Pemeriksaan tanda kalor, model kalorimeter dan asumsi. |
| R6 | OpenStax, Chemistry 2e, 5.3 Enthalpy. [Baca](https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy). | Entalpi, Hess, pembentukan standar dan data contoh. |
| R7 | OpenStax, Chemistry 2e, 7.5 Strengths of Ionic and Covalent Bonds. [Baca](https://openstax.org/books/chemistry-2e/pages/7-5-strengths-of-ionic-and-covalent-bonds). | Energi ikatan rata-rata dan batas estimasinya. |
| R8 | Direktorat SMA (2020), Kimia — Perubahan Entalpi Reaksi Pada Tekanan Tetap Dalam Persamaan Termokimia. [Video sumber](https://www.youtube.com/watch?v=eGwZMgmHJMs). | Kandidat rujukan penjelasan M1; metadata ditelusuri, pemutaran, durasi dan kecocokan seluruh isi masih perlu ditinjau. |
| R9 | MDN Web Docs, Window: localStorage property. [Dokumentasi](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). | Batas penyimpanan lokal dan penanganan akses penyimpanan. |
| R10 | Direktorat SMA (2020), Kimia — Hukum Hess. [Video sumber](https://www.youtube.com/watch?v=w5MXlH6VrCI). | Kandidat rujukan M3; metadata ditelusuri, pemutaran dan kesesuaian seluruh isi masih perlu ditinjau. |

Sumber kebutuhan: gambar panduan Praktik 1 yang diunggah pengguna dan seluruh keputusan pengguna sampai 20 Oktober 2026 pukul 21.25 WIB. Pemeriksaan tautan dilakukan pada 20 Oktober 2026. Tautan video merupakan rujukan, bukan berkas video yang sudah diproduksi untuk aplikasi. Naskah video asli disediakan pada lampiran berikutnya sebagai bahan produksi tiga video singkat.

### Perubahan penting dari dokumen 1.0

1. Simulasi diubah menjadi satu run valid tersimpan; catatan pengamatan opsional.
2. Lingkup demo ditetapkan satu perangkat/browser dengan profil nama–kelas dan penyimpanan lokal.
3. Pengelolaan kelas dan ekspor ditetapkan sebagai kebutuhan wajib mode guru.
4. Rekap diperluas menjadi tiga jenis laporan sesuai pilihan pengguna.
5. Nama TermoKimia XI dan React + Vite sudah menjadi pilihan proyek.
6. Materi, contoh, kasus, soal dan rancangan video disertakan untuk memulai produksi konten.

---

## Lampiran A. Draf materi, contoh, kasus, simulasi dan kuis

**Kedudukan:** konten asli untuk ditinjau calon guru dan dimasukkan ke lampiran PRD. Ini bukan bank soal yang sudah divalidasi dan bukan implementasi web. Rujukan konsep akan dicantumkan pada PRD; angka ilustrasi dan data rujukan dibedakan di bawah.

**Sasaran:** siswa kelas XI yang baru mempelajari termokimia. Pengantar mol, koefisien reaksi, fase zat, dan konversi J–kJ dapat dibuka kembali saat dibutuhkan.

#### Aturan pembelajaran yang berlaku pada seluruh modul

- Setiap modul mempunyai tiga bagian materi, dua contoh bertahap, satu kasus dengan dua pertanyaan, satu simulasi, satu video atau transkrip setara, dan satu kuis berisi lima soal pilihan ganda. Video dan transkrip merupakan dua cara menyelesaikan satu item. Totalnya sembilan item wajib per modul.
- Simulasi selesai setelah siswa menjalankannya satu kali dengan input valid dan hasilnya berhasil disimpan. Catatan pengamatan bersifat opsional; jika diisi dan disimpan, catatan tampil pada rincian laporan guru.
- Pada kasus, siswa mengisi kedua jawaban dengan teks tidak kosong. Setelah jawaban tersimpan, aplikasi menampilkan contoh pembahasan. Ketepatan jawaban teks tidak menjadi syarat pembukaan modul.
- Setiap soal kuis mempunyai empat opsi dan satu jawaban benar. Setelah satu jawaban diperiksa dan berhasil disimpan, kunci dan pembahasan langsung tampil.
- Modul berikutnya dibuka berdasarkan kelengkapan seluruh item wajib dan seluruh soal kuis yang telah dijawab, tanpa ambang nilai. Pengulangan kuis tidak mengunci ulang modul.
- Contoh jawaban merupakan acuan makna. Rumusan siswa yang berbeda dapat tetap benar; teks bebas tidak dinilai otomatis.

### A.1 Modul 1 — Konsep Dasar Termokimia

#### Tujuan pembelajaran yang dapat diamati

Setelah mempelajari modul, siswa dapat:

1. Menentukan sistem dan lingkungan pada satu kasus yang batas sistemnya dinyatakan.
2. Menentukan arah perpindahan kalor dan menghubungkannya dengan eksoterm, endoterm, serta tanda ΔH.
3. Menghitung selisih dua tingkat entalpi relatif dan menjelaskan makna hasilnya dalam kalimat.

#### Tiga bagian materi

1. Suhu, kalor, sistem, dan lingkungan.
2. Eksoterm, endoterm, dan perubahan entalpi.
3. Tanda ΔH dan diagram entalpi relatif.

#### Ringkasan inti

Termokimia mempelajari perubahan energi yang menyertai proses kimia. Sebelum membahas kalor, tentukan sistem, yaitu bagian yang sedang dipelajari, serta lingkungan di luarnya. Kalor adalah energi yang berpindah karena perbedaan suhu. Suhu menyatakan keadaan panas atau dingin; suhu dan kalor bukan besaran yang sama.

Entalpi, H, merupakan besaran keadaan sistem yang didefinisikan sebagai H = U + pV. Dalam pembelajaran ini, perhatian diarahkan pada perubahan entalpi, ΔH. Pada tekanan tetap dengan hanya kerja ekspansi atau kompresi, kalor yang diterima sistem sama dengan ΔH. Proses eksoterm melepaskan kalor sehingga ΔH negatif; proses endoterm menyerap kalor sehingga ΔH positif.

Diagram entalpi membandingkan tingkat entalpi reaktan dan produk pada basis reaksi yang sama. Nilai ΔH diperoleh dari entalpi produk dikurangi entalpi reaktan. Produk lebih rendah menunjukkan ΔH negatif, sedangkan produk lebih tinggi menunjukkan ΔH positif. Acuan entalpi relatif boleh dipilih, tetapi selisihnya tetap sama. Posisi pada diagram tidak menyatakan suhu, waktu berlangsungnya reaksi, atau kecepatan reaksi.

#### Kasus M1-CASE01 — Air dipanaskan dengan kompor

**Situasi:** sebuah panci berisi air dipanaskan menggunakan kompor LPG. Untuk pembahasan ini, zat-zat yang mengalami reaksi pembakaran ditetapkan sebagai sistem. Panci, air, dan udara di sekitarnya termasuk lingkungan. Gunakan model tekanan tetap dengan hanya kerja ekspansi atau kompresi.

**Pertanyaan 1:** ke arah mana kalor berpindah dari sistem, dan bagian lingkungan mana yang menerima kalor?

**Contoh jawaban:** kalor berpindah dari sistem reaksi pembakaran menuju lingkungan. Sebagiannya diterima panci dan air, sedangkan sebagian lain berpindah ke udara sekitar.

**Pertanyaan 2:** apakah reaksi pembakaran dalam kasus ini eksoterm atau endoterm? Bagaimana tanda ΔH sistem?

**Contoh jawaban:** reaksi bersifat eksoterm karena sistem melepaskan kalor. ΔH sistem bernilai negatif. Air dapat bertambah panas karena menerima kalor, meskipun ΔH sistem reaksi bernilai negatif.

**Pembahasan setelah pengiriman:** penetapan sistem menentukan tanda kalor yang dibahas. Kenaikan suhu air adalah pengamatan pada bagian lingkungan; tanda ΔH yang ditanyakan merupakan tanda untuk sistem reaksi.

#### Contoh bertahap M1-EX01 — Membaca selisih entalpi

**Soal:** pada diagram suatu reaksi model, entalpi relatif reaktan adalah 80 kJ dan produk 30 kJ untuk basis jumlah reaksi yang sama. Tentukan ΔH dan klasifikasi proses.

**Jenis data:** ilustrasi konseptual.

1. Tuliskan hubungan: ΔH = H produk − H reaktan.
2. Masukkan data: ΔH = 30 − 80 = −50 kJ.
3. Tafsirkan tanda: produk berada pada tingkat entalpi yang lebih rendah; proses bersifat eksoterm.
4. Pada tekanan tetap dan hanya kerja ekspansi atau kompresi, sistem melepaskan 50 kJ kalor untuk jumlah reaksi yang ditetapkan.

**Jawaban akhir:** ΔH = −50 kJ; eksoterm. Besar kalor yang dilepas adalah 50 kJ, sedangkan tanda kalor sistem adalah negatif.

#### Contoh bertahap M1-EX02 — Dari arah kalor ke diagram

**Soal:** suatu proses model menyerap 35 kJ kalor pada tekanan tetap dengan hanya kerja ekspansi atau kompresi. Entalpi relatif reaktan dipilih 0 kJ. Tentukan ΔH, posisi produk, dan ΔH untuk proses sebaliknya pada basis yang sama.

**Jenis data:** ilustrasi konseptual.

1. Kalor masuk ke sistem, sehingga q sistem = +35 kJ.
2. Dengan kondisi yang dinyatakan, ΔH = q sistem = +35 kJ.
3. H produk = H reaktan + ΔH = 0 + 35 = 35 kJ.
4. Produk berada 35 kJ di atas reaktan: proses endoterm.
5. Ketika proses dibalik pada basis yang sama, ΔH menjadi −35 kJ.

**Jawaban akhir:** proses maju mempunyai ΔH = +35 kJ; produk lebih tinggi; proses sebaliknya mempunyai ΔH = −35 kJ.

#### Simulasi M1-SIM01 — Peta entalpi dan arah kalor

**Tujuan:** menghubungkan posisi tingkat entalpi, tanda ΔH, dan arah kalor.

| Aspek | Spesifikasi konten |
| --- | --- |
| Variabel siswa | Entalpi relatif produk antara −100 dan +100 kJ; pilihan arah melalui tombol “Balik reaksi”. |
| Acuan | Entalpi relatif reaktan 0 kJ pada keadaan awal. Basis jumlah reaksi model ditampilkan. |
| Model | ΔH = H produk − H reaktan. Pembalikan menukar keadaan awal dan akhir serta membalik tanda ΔH. Jika acuan diagram diatur kembali menjadi nol, selisih entalpi harus tetap benar. |
| Asumsi | Model konseptual; tekanan tetap; hanya kerja ekspansi atau kompresi. Tidak ada perhitungan suhu atau laju reaksi. |
| Output | Dua tingkat entalpi, nilai ΔH, eksoterm/endoterm, dan panah kalor keluar/masuk sistem. Pada ΔH = 0 tampil “Tidak ada perubahan entalpi bersih pada model”. |
| Penanda sumbu | Vertikal “Entalpi relatif (kJ)”; horizontal “Kemajuan reaksi”. |
| Penyelesaian | Satu kali menjalankan konfigurasi valid dan menyimpan hasil. Catatan pengamatan opsional. |

**Pemeriksaan contoh:** reaktan 0 dan produk −50 kJ menghasilkan ΔH = −50 kJ. Pembalikan menghasilkan +50 kJ. Panah menunjukkan kalor keluar pada keadaan pertama dan masuk pada keadaan kedua.

**Pemantik catatan opsional:** “Apa hubungan posisi produk dengan tanda ΔH yang kamu lihat?”

#### Kuis konsep Modul 1

##### M1-Q01 — Menentukan lingkungan

Pada kasus kompor, sistem ditetapkan sebagai zat-zat yang mengalami reaksi pembakaran. Panci dan air yang dipanaskan merupakan ....

A. reaktan yang berubah menjadi bahan bakar  
B. bagian lingkungan yang menerima kalor  
C. produk langsung dari reaksi pembakaran  
D. batas sistem yang tidak dapat menerima energi

**Kunci: B**

**Pembahasan:** dengan batas sistem yang dinyatakan, panci dan air berada di luar sistem reaksi. Keduanya dapat menerima kalor dari sistem.

##### M1-Q02 — Tanda dan arah kalor

Suatu proses bersifat eksoterm pada tekanan tetap dengan hanya kerja ekspansi atau kompresi. Pernyataan yang sesuai adalah ....

A. kalor masuk ke sistem dan ΔH positif  
B. kalor masuk ke sistem dan ΔH negatif  
C. kalor keluar dari sistem dan ΔH negatif  
D. kalor keluar dari sistem dan ΔH positif

**Kunci: C**

**Pembahasan:** proses eksoterm melepaskan kalor dari sistem ke lingkungan. Dengan kondisi yang dinyatakan, q sistem = ΔH sehingga keduanya bertanda negatif.

##### M1-Q03 — Interpretasi diagram entalpi

Sebuah diagram menunjukkan entalpi relatif reaktan 80 kJ dan produk 30 kJ pada basis yang sama. Kesimpulan yang tepat adalah ....

A. ΔH = −50 kJ; produk mempunyai entalpi lebih rendah  
B. ΔH = +50 kJ; produk mempunyai entalpi lebih tinggi  
C. ΔH = −50 kJ; suhu produk pasti 50 °C lebih rendah  
D. ΔH = +110 kJ; nilai kedua tingkat entalpi harus dijumlahkan

**Kunci: A**

**Pembahasan:** ΔH dihitung sebagai 30 − 80 = −50 kJ. Diagram membandingkan entalpi; selisih tersebut tidak langsung menyatakan selisih suhu.

##### M1-Q04 — Membedakan kalor dan suhu

Pernyataan yang paling tepat tentang kalor adalah ....

A. kalor adalah angka yang terbaca langsung pada termometer  
B. kalor adalah nama lain untuk entalpi yang tersimpan dalam zat  
C. kalor hanya dapat berpindah ketika terjadi reaksi kimia  
D. kalor adalah energi yang berpindah karena perbedaan suhu

**Kunci: D**

**Pembahasan:** kalor merupakan perpindahan energi karena perbedaan suhu. Perpindahan kalor juga dapat berlangsung tanpa reaksi kimia, misalnya ketika air panas mendingin.

##### M1-Q05 — Membalik proses

Suatu reaksi model mempunyai ΔH = −75 kJ. Jika reaksi dibalik dengan jumlah zat dan kondisi awal–akhir yang bersesuaian, ΔH proses sebaliknya adalah ....

A. −75 kJ  
B. +75 kJ  
C. 0 kJ  
D. +150 kJ

**Kunci: B**

**Pembahasan:** pembalikan menukar keadaan awal dan akhir sehingga tanda ΔH berubah, sedangkan besarnya tetap. Jumlah zat pada soal tidak dikalikan dua.

### A.2 Modul 2 — Kalorimetri

#### Tujuan pembelajaran yang dapat diamati

Setelah mempelajari modul, siswa dapat:

1. Menghitung kalor larutan dari massa, kalor jenis, dan perubahan suhu dengan satuan konsisten.
2. Menentukan tanda kalor reaksi dari tanda kalor larutan pada kalorimeter ideal.
3. Menjelaskan perubahan suhu ketika satu variabel model diubah serta menghitung entalpi molar pada basis reaksi 1:1 yang dinyatakan.

#### Tiga bagian materi

1. Massa, kalor jenis, dan perubahan suhu.
2. Kalorimeter ideal dan neraca kalor.
3. Kalor reaksi, satuan energi, dan entalpi per mol.

#### Ringkasan inti

Kalorimetri menentukan kalor yang berpindah melalui pengukuran perubahan suhu. Untuk larutan dengan kalor jenis yang dianggap tetap dan tanpa perubahan fase, gunakan q larutan = mcΔT. Massa m adalah massa larutan, c adalah kalor jenisnya, dan ΔT adalah suhu akhir dikurangi suhu awal. Kenaikan suhu memberi q larutan positif; penurunan suhu memberi q larutan negatif.

Dalam model kalorimeter ideal, kalor wadah dan pertukaran kalor dengan lingkungan luar diabaikan. Neraca energinya menjadi q reaksi + q larutan = 0. Karena itu, larutan yang menghangat menunjukkan penerimaan kalor, sementara reaksi melepaskan kalor dengan tanda berlawanan. Larutan yang mendingin menunjukkan keadaan sebaliknya.

Pada tekanan tetap dengan hanya kerja ekspansi atau kompresi, kalor reaksi dapat digunakan untuk menentukan perubahan entalpi. Dalam model reaksi 1:1, entalpi per mol diperoleh dengan membagi kalor reaksi oleh jumlah mol reaksi yang berlangsung. Satuan J dan kJ harus disamakan. Besar perubahan suhu juga bergantung pada massa dan kalor jenis, sehingga suhu saja belum cukup untuk membandingkan kalor dua percobaan.

#### Kasus M2-CASE01 — Minuman dengan pemanas mandiri

**Situasi:** sebuah model kemasan minuman mempunyai bagian pemanas yang bekerja melalui proses kimia. Setelah pemanas diaktifkan, suhu cairan meningkat. Untuk pembahasan, seluruh kalor dari proses pemanas dianggap berpindah ke cairan; kalor kemasan dan kalor yang keluar ke udara diabaikan.

**Pertanyaan 1:** apakah cairan menerima atau melepaskan kalor? Bagaimana tanda kalor proses pemanas dibandingkan dengan kalor cairan?

**Contoh jawaban:** cairan menerima kalor sehingga q cairan positif. Proses pemanas melepaskan kalor sehingga q proses negatif. Dalam model ideal tersebut, kedua kalor sama besar dan berlawanan tanda.

**Pertanyaan 2:** jika jumlah kalor dari pemanas tetap, tetapi massa cairan dibuat dua kali semula dengan kalor jenis dan suhu awal sama, bagaimana kenaikan suhunya?

**Contoh jawaban:** kenaikan suhu menjadi setengah semula, karena ΔT = q/(mc). Kalor yang sama dibagikan pada massa cairan yang lebih besar.

**Pembahasan setelah pengiriman:** tanda kalor selalu dikaitkan dengan bagian yang sedang dibahas. Perbandingan perubahan suhu pada pertanyaan kedua berlaku karena jumlah kalor dan kalor jenis ditetapkan sama.

#### Contoh bertahap M2-EX01 — Dari suhu ke entalpi molar

**Soal:** suatu reaksi model 1:1 sebanyak 0,050 mol berlangsung dalam kalorimeter ideal. Massa larutan 100 g, kalor jenis 4,18 J/(g·°C), dan suhu berubah dari 25 menjadi 30 °C. Tentukan kalor larutan, kalor reaksi, dan entalpi per mol reaksi.

**Jenis data:** ilustrasi model; tekanan tetap, hanya kerja ekspansi atau kompresi, kalor wadah dan kehilangan kalor diabaikan.

1. ΔT = 30 − 25 = +5 °C.
2. q larutan = mcΔT = 100 × 4,18 × 5 = +2090 J.
3. q reaksi = −q larutan = −2090 J = −2,090 kJ.
4. Untuk basis reaksi 1:1, ΔH molar = q reaksi/n = −2,090/0,050 = −41,8 kJ/mol.
5. Larutan menghangat karena menerima kalor; reaksi model bersifat eksoterm.

**Jawaban akhir:** q larutan = +2090 J, q reaksi = −2090 J, dan ΔH molar = −41,8 kJ/mol reaksi model.

#### Contoh bertahap M2-EX02 — Memprediksi suhu akhir proses endoterm

**Soal:** reaksi model 1:1 mempunyai ΔH molar = +41,8 kJ/mol. Sebanyak 0,050 mol reaksi berlangsung dalam kalorimeter ideal dengan massa larutan 200 g, c = 4,18 J/(g·°C), dan suhu awal 25 °C. Tentukan suhu akhir larutan.

**Jenis data:** ilustrasi model dengan asumsi yang sama seperti M2-EX01.

1. q reaksi = n × ΔH molar = 0,050 × 41,8 = +2,090 kJ = +2090 J.
2. q larutan = −q reaksi = −2090 J.
3. ΔT = q larutan/(mc) = −2090/(200 × 4,18) = −2,5 °C.
4. T akhir = T awal + ΔT = 25 − 2,5 = 22,5 °C.
5. Reaksi menyerap kalor dan larutan kehilangan kalor, sehingga suhu larutan turun.

**Jawaban akhir:** suhu akhir 22,5 °C. Jika massa larutan 100 g dengan input lain tetap, suhu akhirnya 20 °C.

#### Simulasi M2-SIM01 — Kalorimeter ideal

**Tujuan:** menghubungkan jumlah reaksi, massa larutan, kalor, dan perubahan suhu.

| Aspek | Spesifikasi konten |
| --- | --- |
| Variabel siswa | Massa larutan 50–250 g; suhu awal 20–35 °C; jumlah reaksi 0,010–0,050 mol; pilihan model eksoterm atau endoterm. |
| Konstanta model | c = 4,18 J/(g·°C). ΔH molar = −41,8 kJ/mol untuk model eksoterm atau +41,8 kJ/mol untuk model endoterm. |
| Basis jumlah | Reaksi model 1:1; n menyatakan mol reaksi yang berlangsung. |
| Perhitungan | q reaksi (J) = 1000 × n × ΔH molar (kJ/mol); q larutan = −q reaksi; T akhir = T awal + q larutan/(mc). |
| Asumsi | Tekanan tetap; hanya kerja ekspansi atau kompresi; kalor jenis tetap; kalor wadah dan pertukaran kalor ke luar diabaikan; tidak ada perubahan fase. |
| Output | Suhu awal dan akhir, ΔT, kalor reaksi, kalor larutan, serta langkah substitusi dengan satuan. Termometer menunjukkan suhu larutan. |
| Label data | “Data ilustrasi — model kalorimeter ideal”. |
| Validasi | Input harus berupa bilangan berhingga dalam rentang yang ditentukan. Input tidak valid tidak menghasilkan run yang tercatat selesai. |
| Penyelesaian | Satu kali run valid dengan hasil berhasil disimpan. Catatan pengamatan opsional. |

**Pemeriksaan contoh:** m = 100 g, T awal = 25 °C, n = 0,050 mol, dan ΔH molar = −41,8 kJ/mol menghasilkan q reaksi = −2090 J dan T akhir = 30 °C. Mengganti massa menjadi 200 g menghasilkan 27,5 °C; memilih cabang endoterm pada massa 100 g menghasilkan 20 °C.

**Pemantik catatan opsional:** “Apa yang berubah pada suhu akhir ketika massa larutan diubah, sementara jumlah reaksi tetap?”

#### Kuis konsep Modul 2

##### M2-Q01 — Menafsirkan hasil pengukuran

Dalam kalorimeter ideal, 100 g larutan dengan c = 4,18 J/(g·°C) mengalami kenaikan suhu 5 °C. Kalor larutan adalah +2090 J. Kesimpulan yang tepat untuk reaksi adalah ....

A. reaksi menyerap +2090 J karena larutan menghangat  
B. reaksi melepaskan kalor, sehingga q reaksi = −2090 J  
C. kalor reaksi nol karena energi total harus tetap  
D. q reaksi = +5 J karena kenaikan suhu sebesar 5 °C

**Kunci: B**

**Pembahasan:** larutan menerima +2090 J. Dengan kalor wadah dan pertukaran ke luar diabaikan, kalor reaksi sama besar tetapi berlawanan tanda: −2090 J.

##### M2-Q02 — Mengubah massa larutan

Dalam model, jumlah kalor yang diterima larutan dan kalor jenisnya tetap. Jika massa larutan dilipatgandakan, kenaikan suhunya menjadi ....

A. dua kali semula  
B. empat kali semula  
C. tetap sama  
D. setengah semula

**Kunci: D**

**Pembahasan:** ΔT = q/(mc). Jika q dan c tetap, massa dua kali lebih besar menghasilkan perubahan suhu setengahnya.

##### M2-Q03 — Memahami asumsi model

Hubungan q reaksi = −q larutan digunakan pada model sederhana jika ....

A. kalor wadah dan pertukaran kalor dengan lingkungan luar diabaikan  
B. massa larutan diabaikan dalam perhitungan  
C. semua reaksi selalu membuat suhu larutan meningkat  
D. kalor jenis larutan ditetapkan sama dengan nol

**Kunci: A**

**Pembahasan:** hubungan tersebut berasal dari neraca kalor reaksi dan larutan pada model ideal. Jika wadah ikut menerima kalor secara berarti, kalor wadah harus dimasukkan ke neraca.

##### M2-Q04 — Larutan mendingin

Suhu larutan turun selama suatu reaksi dalam kalorimeter ideal. Pernyataan yang sesuai adalah ....

A. q larutan positif dan reaksi eksoterm  
B. q larutan negatif dan reaksi eksoterm  
C. q larutan negatif dan reaksi endoterm  
D. q larutan positif dan reaksi endoterm

**Kunci: C**

**Pembahasan:** penurunan suhu memberi ΔT negatif sehingga q larutan negatif. Karena q reaksi = −q larutan, reaksi menyerap kalor dan bersifat endoterm.

##### M2-Q05 — Makna satuan per mol

Pada kondisi model yang ditetapkan, ΔH molar suatu reaksi 1:1 adalah −41,8 kJ/mol reaksi. Artinya ....

A. suhu larutan selalu turun sebesar 41,8 °C  
B. setiap 1 mol reaksi yang berlangsung melepaskan kalor sebesar 41,8 kJ  
C. setiap 1 gram larutan melepaskan kalor sebesar 41,8 kJ  
D. setiap 1 mol reaksi yang berlangsung menyerap kalor sebesar 41,8 kJ

**Kunci: B**

**Pembahasan:** tanda negatif menunjukkan pelepasan kalor dari sistem pada tekanan tetap dengan hanya kerja ekspansi atau kompresi. Satuan “per mol reaksi” menyatakan basis jumlah reaksi, bukan massa larutan atau perubahan suhu.

### A.3 Modul 3 — Penentuan ΔH Reaksi

#### Tujuan pembelajaran yang dapat diamati

Setelah mempelajari modul, siswa dapat:

1. Menjumlahkan, membalik, dan mengalikan persamaan termokimia beserta perubahan entalpinya.
2. Menghitung ΔH dari data entalpi pembentukan dengan mempertimbangkan koefisien dan fase zat.
3. Menjelaskan perbedaan antara hasil berbasis data entalpi pembentukan dan estimasi menggunakan energi ikatan fase gas.

#### Tiga bagian materi

1. Hukum Hess, pembalikan, dan perkalian persamaan.
2. Entalpi pembentukan standar.
3. Energi ikatan dan batas pendekatan.

#### Ringkasan inti

Perubahan entalpi dapat ditentukan menggunakan data reaksi lain karena entalpi merupakan fungsi keadaan. Menurut Hukum Hess, perubahan entalpi total diperoleh dengan menjumlahkan perubahan entalpi tahapan yang menghasilkan keadaan awal dan akhir yang sama. Membalik persamaan membalik tanda ΔH. Mengalikan seluruh koefisien dengan suatu faktor juga mengalikan ΔH dengan faktor tersebut.

Entalpi pembentukan standar menyatakan perubahan entalpi ketika satu mol zat terbentuk dari unsur-unsurnya dalam keadaan acuan standar. Untuk menghitung ΔH reaksi, jumlahkan data pembentukan produk sesuai koefisien, kemudian kurangi jumlah data pembentukan reaktan. Fase zat perlu dicocokkan karena zat yang sama pada fase berbeda mempunyai entalpi berbeda.

Pendekatan lain menggunakan energi ikatan. Pemutusan ikatan memerlukan energi, sedangkan pembentukan ikatan melepaskan energi. Perkiraan ΔH diperoleh dari energi pemutusan dikurangi energi yang dilepaskan saat pembentukan. Data energi ikatan rata-rata digunakan untuk spesies fase gas dan memberikan estimasi. Hasilnya harus disertai basis jumlah reaksi serta penjelasan bahwa model ini memiliki keterbatasan.

#### Kasus M3-CASE01 — Menaksir energi bahan bakar kompor

**Situasi:** siswa ingin menaksir perubahan entalpi pembakaran bahan bakar kompor melalui perhitungan. Tersedia persamaan reaksi dan tabel entalpi pembentukan, tetapi belum ada hasil pengukuran pada kompor.

**Pertanyaan 1:** informasi apa yang harus diperiksa sebelum data tabel digunakan?

**Contoh jawaban:** persamaan harus setara; koefisien, identitas zat, fase, dan kondisi data harus sesuai. Jumlah bahan bakar yang dibandingkan juga harus ditentukan, misalnya per mol atau untuk massa tertentu.

**Pertanyaan 2:** apakah seluruh besar kalor reaksi hasil perhitungan pasti diterima air di panci? Jelaskan.

**Contoh jawaban:** belum tentu. Perhitungan perubahan entalpi menyatakan energi reaksi pada kondisi yang ditentukan; kalor yang diterima air juga dipengaruhi pemanasan panci dan perpindahan kalor ke lingkungan lain.

**Pembahasan setelah pengiriman:** data termokimia membantu menentukan energi reaksi, sedangkan pemanasan air pada perangkat nyata melibatkan neraca energi tambahan. Ketepatan basis jumlah dan fase zat tetap diperlukan.

#### Contoh bertahap M3-EX01 — Menggunakan entalpi pembentukan

**Soal:** tentukan ΔH untuk persamaan berikut menggunakan data yang disediakan:

H₂(g) + Cl₂(g) → 2HCl(g)

| Zat | ΔH pembentukan standar (kJ/mol) |
| --- | ---: |
| H₂(g) | 0 |
| Cl₂(g) | 0 |
| HCl(g) | −92,3 |

**Jenis data:** data rujukan dibulatkan untuk pembelajaran; gunakan satu kondisi referensi yang sama.

1. Gunakan jumlah entalpi pembentukan produk dikurangi jumlah entalpi pembentukan reaktan.
2. Produk: 2 × (−92,3) = −184,6 kJ untuk jumlah produk pada persamaan.
3. Reaktan: 1 × 0 + 1 × 0 = 0 kJ.
4. ΔH = −184,6 − 0 = −184,6 kJ.
5. Tanda negatif menunjukkan proses eksoterm untuk pembentukan 2 mol HCl sesuai persamaan.

**Jawaban akhir:** ΔH = −184,6 kJ untuk persamaan sebagaimana ditulis. Nilai −92,3 kJ/mol adalah entalpi pembentukan per mol HCl.

#### Contoh bertahap M3-EX02 — Menggunakan energi ikatan

**Soal:** perkirakan ΔH untuk reaksi fase gas berikut:

H₂(g) + Cl₂(g) → 2HCl(g)

| Ikatan | Energi ikatan (kJ/mol ikatan) |
| --- | ---: |
| H–H | 436 |
| Cl–Cl | 243 |
| H–Cl | 432 |

**Jenis data:** tabel energi ikatan rujukan, dibulatkan. Perhitungan ditampilkan sebagai estimasi.

1. Ikatan yang diputus: 1 mol H–H dan 1 mol Cl–Cl.
2. Energi pemutusan = 436 + 243 = 679 kJ.
3. Ikatan yang terbentuk: 2 mol H–Cl.
4. Besar energi yang dilepas saat pembentukan = 2 × 432 = 864 kJ; kontribusinya pada perubahan entalpi bertanda negatif.
5. ΔH ≈ energi pemutusan − energi pembentukan = 679 − 864 = −185 kJ.

**Jawaban akhir:** ΔH ≈ −185 kJ untuk persamaan tersebut; eksoterm. Hasil ini merupakan estimasi berbasis tabel yang digunakan, sedangkan contoh sebelumnya memakai data entalpi pembentukan.

#### Simulasi M3-SIM01 — Penyusun Hukum Hess

**Tujuan:** menghubungkan operasi pada persamaan reaksi dengan perubahan ΔH.

##### Dataset kartu

| Kartu | Persamaan | ΔH untuk persamaan tertulis |
| --- | --- | ---: |
| K1 | C(s, grafit) + ½O₂(g) → CO(g) | −111 kJ |
| K2 | CO(g) + ½O₂(g) → CO₂(g) | −283 kJ |

**Target dasar:** C(s, grafit) + O₂(g) → CO₂(g).

**Jenis data:** pembulatan data rujukan OpenStax bagian entalpi. Kedua kartu menggunakan keadaan zat dan kondisi yang konsisten.

| Aspek | Spesifikasi konten |
| --- | --- |
| Variabel siswa | Memilih kartu yang digunakan, arah masing-masing kartu, dan faktor ½, 1, atau 2. |
| Model | Pembalikan mengubah arah semua spesies serta tanda ΔH; perkalian mengubah seluruh koefisien dan ΔH. Jumlahkan persamaan setelah operasi dan hilangkan spesies identik dengan fase sama pada sisi berlawanan. |
| Asumsi | Data entalpi dan fase konsisten; seluruh persamaan setara. Model menghitung energi, bukan kecepatan atau mekanisme reaksi. |
| Output | Persamaan setiap kartu setelah operasi, langkah eliminasi, persamaan total, ΔH total, serta umpan balik kecocokan dengan target. |
| Validasi | Sedikitnya satu kartu dipilih dan faktor berada pada pilihan yang tersedia. |
| Penyelesaian | Satu kali perhitungan valid yang berhasil disimpan menyelesaikan simulasi. Kecocokan target menjadi umpan balik pembelajaran; catatan pengamatan opsional. |

##### Langkah acuan

1. Pilih K1 dan K2 pada arah maju, masing-masing faktor 1.
2. Jumlahkan: C(s, grafit) + ½O₂(g) + CO(g) + ½O₂(g) → CO(g) + CO₂(g).
3. CO(g) muncul pada kedua sisi dengan jumlah sama, sehingga dapat dieliminasi.
4. Gabungkan ½O₂(g) + ½O₂(g) menjadi O₂(g).
5. Hasil: C(s, grafit) + O₂(g) → CO₂(g), ΔH = −111 − 283 = −394 kJ.

**Variasi pembalikan:** reaksi total dibalik menghasilkan ΔH = +394 kJ. Membalik lalu mengalikan seluruh reaksi dengan dua menghasilkan 2CO₂(g) → 2C(s, grafit) + 2O₂(g), ΔH = +788 kJ. Perkalian dua tanpa pembalikan menghasilkan −788 kJ.

**Pemantik catatan opsional:** “Mengapa CO dapat dihilangkan ketika kedua kartu dijumlahkan?”

#### Kuis konsep Modul 3

##### M3-Q01 — Dasar Hukum Hess

Mengapa perubahan entalpi reaksi dapat dihitung melalui beberapa tahapan reaksi lain yang sesuai?

A. semua tahapan reaksi berlangsung dengan kecepatan yang sama  
B. setiap jalur reaksi selalu mempunyai jumlah tahapan yang sama  
C. entalpi merupakan fungsi keadaan; perubahan total ditentukan keadaan awal dan akhir  
D. setiap reaksi kimia harus melepaskan kalor

**Kunci: C**

**Pembahasan:** perubahan entalpi antara keadaan awal dan akhir yang sama tidak bergantung pada jalur yang digunakan. Kesetaraan persamaan, fase, dan kondisi data tetap harus diperhatikan.

##### M3-Q02 — Pembalikan dan perkalian

Persamaan C(s, grafit) + O₂(g) → CO₂(g) mempunyai ΔH = −394 kJ pada dataset. Jika persamaan dibalik, lalu seluruh koefisien dikalikan dua, perubahan entalpinya menjadi ....

A. −788 kJ  
B. +788 kJ  
C. +394 kJ  
D. −394 kJ

**Kunci: B**

**Pembahasan:** pembalikan mengubah −394 menjadi +394 kJ. Perkalian seluruh koefisien dengan dua kemudian menghasilkan +788 kJ.

##### M3-Q03 — Arti entalpi pembentukan standar

Entalpi pembentukan standar suatu zat mengacu pada ....

A. pembentukan satu gram zat dari senyawa apa pun  
B. pembentukan zat pada suhu berapa pun tanpa memperhatikan fase  
C. pembentukan satu mol zat dari unsur-unsurnya dalam keadaan acuan standar  
D. pemutusan semua ikatan dalam satu mol zat cair

**Kunci: C**

**Pembahasan:** basisnya satu mol zat yang dibentuk dari unsur-unsur dalam keadaan acuannya. Fase zat dan keadaan referensi harus sesuai dengan tabel yang digunakan.

##### M3-Q04 — Menafsirkan koefisien data pembentukan

Data ΔH pembentukan standar HCl(g) adalah −92,3 kJ/mol, sedangkan H₂(g) dan Cl₂(g) bernilai nol pada keadaan acuannya. Mengapa ΔH untuk H₂(g) + Cl₂(g) → 2HCl(g) bernilai −184,6 kJ?

A. karena setiap data ΔH harus selalu dikalikan dua  
B. karena penjumlahan dua reaktan membuat nilai ΔH positif  
C. karena persamaan membentuk 2 mol HCl, sehingga data per mol dikalikan dua  
D. karena H₂ dan Cl₂ masing-masing menyumbangkan −92,3 kJ

**Kunci: C**

**Pembahasan:** koefisien HCl adalah dua, sedangkan data pembentukannya dinyatakan per mol. Kontribusi reaktan pada perhitungan ini nol, sehingga hasilnya 2 × (−92,3) = −184,6 kJ.

##### M3-Q05 — Batas pendekatan energi ikatan

Bagaimana hasil perhitungan ΔH menggunakan energi ikatan rata-rata sebaiknya dipahami?

A. sebagai estimasi berbasis pemutusan dan pembentukan ikatan pada spesies fase gas  
B. sebagai nilai pasti yang sama untuk semua fase zat  
C. sebagai waktu yang diperlukan reaksi untuk selesai  
D. sebagai bukti bahwa pemutusan ikatan selalu melepaskan energi

**Kunci: A**

**Pembahasan:** energi ikatan rata-rata memberi pendekatan terhadap energi pemutusan ikatan pada fase gas. ΔH diperkirakan dari energi pemutusan dikurangi energi yang dilepas saat pembentukan; pemutusan ikatan memerlukan energi.

### A.4 Catatan penelaahan sebelum digunakan

1. Tinjau kesesuaian istilah dan tingkat bahasa dengan buku atau ATP yang akhirnya dipilih.
2. Periksa kembali angka, kunci, koefisien, fase, tanda, dan satuan pada tampilan akhir.
3. Kelima soal setiap modul merupakan draf asesmen formatif. Kualitas pengecoh, tingkat kesulitan, dan kejelasan bahasa belum diuji pada siswa.
4. Nomor opsi dan urutannya dapat diubah, tetapi kunci serta penjelasan harus ikut diperbarui.
5. Rujukan konsep: OpenStax Chemistry 2e, bagian 5.1, 5.2, 5.3, dan 7.5; tautan serta pemetaan kurikulum disediakan pada PRD.
6. Naskah video asli tersedia pada Lampiran B. Produksi berkas video dan penyelarasan transkrip akhir dilakukan pada tahap pembuatan media.

---

## Lampiran B. Naskah dan rancangan tiga video singkat

**Status:** naskah asli siap ditinjau dan diproduksi; berkas video belum dibuat. Target durasi sekitar 2–3 menit per video, dengan jeda membaca diagram serta contoh. Target ini merupakan keputusan produksi, bukan durasi video eksternal. Naskah juga menjadi dasar transkrip; transkrip akhir harus sesuai dengan versi video yang benar-benar dibuat.

### B.1 Video M1-VID01 — Ke mana kalor berpindah?

**Tujuan:** siswa dapat menetapkan sistem, arah kalor, tanda ΔH dan posisi entalpi produk. Dasar konsep: R2, R4 dan R6.

| Urutan adegan | Visual yang disiapkan |
| --- | --- |
| 1 | Kompor, panci dan air; sorot batas sistem pada zat yang bereaksi dalam pembakaran. |
| 2 | Panah kalor dari sistem menuju panci/air dan udara. |
| 3 | Diagram reaktan 80 kJ dan produk 30 kJ; hitung selisih dengan tanda. |
| 4 | Balik arah panah reaksi dan tampilkan ΔH +50 kJ. |
| 5 | Ringkasan sistem → arah kalor → tanda ΔH → posisi produk. |

**Naskah narasi:**

Saat kompor memanaskan air, bagian mana yang kita sebut sistem? Dalam contoh ini, sistem adalah zat-zat yang mengalami reaksi pembakaran. Panci, air, dan udara di sekitarnya berada di luar batas sistem dan kita sebut lingkungan.

Kalor adalah energi yang berpindah karena perbedaan suhu. Pada contoh pembakaran, kalor berpindah dari sistem menuju lingkungan. Air menerima sebagian kalor dan suhunya meningkat. Walaupun air menjadi lebih panas, sistem reaksi justru melepaskan kalor. Itulah sebabnya kita selalu menetapkan sistem sebelum menentukan tanda.

Untuk kondisi tekanan tetap dengan hanya kerja ekspansi atau kompresi, perubahan entalpi sama dengan kalor yang diterima sistem. Ketika sistem melepaskan kalor, ΔH negatif dan proses disebut eksoterm. Ketika sistem menyerap kalor, ΔH positif dan proses disebut endoterm.

Sekarang perhatikan diagram model. Entalpi relatif reaktan 80 kilojoule dan produk 30 kilojoule pada basis jumlah reaksi yang sama. Perubahan entalpi adalah entalpi produk dikurangi entalpi reaktan: 30 dikurangi 80, hasilnya negatif 50 kilojoule. Posisi produk lebih rendah, sesuai dengan proses eksoterm.

Jika arah reaksi dibalik, keadaan awal dan akhir bertukar. Nilai perubahan entalpinya menjadi positif 50 kilojoule. Ingat, tinggi pada diagram menunjukkan entalpi relatif. Diagram ini tidak langsung menunjukkan suhu atau kecepatan reaksi.

Saat mencoba simulasi, mulai dari empat langkah: tentukan sistem, perhatikan arah kalor, baca tanda ΔH, lalu cocokkan dengan posisi produk pada diagram.

**Kandidat rujukan eksternal:** [Direktorat SMA — Perubahan Entalpi Reaksi Pada Tekanan Tetap Dalam Persamaan Termokimia](https://www.youtube.com/watch?v=eGwZMgmHJMs). Rujukan ini perlu ditonton dan diperiksa sebelum dijadikan video utama; naskah di atas merupakan karya baru, bukan transkrip video tersebut.

### B.2 Video M2-VID01 — Larutan hangat, reaksi bertanda apa?

**Tujuan:** siswa dapat menjelaskan tanda kalor larutan dan reaksi serta menggunakan basis mol. Dasar konsep: R3 dan R5.

| Urutan adegan | Visual yang disiapkan |
| --- | --- |
| 1 | Kalorimeter model, label massa larutan 100 g, termometer 25 °C. |
| 2 | Termometer berubah menjadi 30 °C; tampilkan ΔT +5 °C. |
| 3 | Substitusi q_larutan = 100 × 4,18 × 5 = +2.090 J. |
| 4 | Pasangan tanda q_reaksi = −2.090 J; konversi menjadi −2,090 kJ. |
| 5 | Bagi dengan 0,050 mol; tampilkan ΔH_m = −41,8 kJ/mol. |
| 6 | Massa diganti 200 g; suhu akhir 27,5 °C; tunjukkan bahwa kalor yang sama memberi ΔT berbeda. |

**Naskah narasi:**

Bagaimana kita mengetahui kalor suatu reaksi melalui perubahan suhu? Kita gunakan model kalorimeter. Dalam model ini, kalor wadah serta perpindahan kalor ke udara diabaikan. Larutan dianggap mempunyai kalor jenis tetap dan tidak mengalami perubahan fase.

Bayangkan massa larutan 100 gram. Suhu awalnya 25 derajat Celsius, kemudian meningkat menjadi 30 derajat Celsius. Perubahan suhunya adalah suhu akhir dikurangi suhu awal, yaitu positif 5 derajat Celsius.

Kalor larutan dihitung dengan q sama dengan m kali c kali perubahan suhu. Dengan kalor jenis model 4,18 joule per gram per derajat Celsius, hasilnya 100 kali 4,18 kali 5, yaitu positif 2.090 joule. Tanda positif berarti larutan menerima kalor.

Dari mana kalor tersebut berasal? Dalam model ideal ini, berasal dari proses reaksi. Karena kalor reaksi dan larutan sama besar serta berlawanan tanda, kalor reaksi adalah negatif 2.090 joule. Jadi, larutan yang menghangat menunjukkan reaksi yang melepaskan kalor.

Ubah satuannya menjadi negatif 2,090 kilojoule. Jika jumlah reaksi pada basis model satu banding satu adalah 0,050 mol, bagi kalor reaksi dengan jumlah tersebut. Hasilnya negatif 41,8 kilojoule per mol reaksi.

Sekarang jumlah kalor tetap, tetapi massa larutan menjadi 200 gram. Kenaikan suhunya menjadi setengah, yaitu 2,5 derajat Celsius. Suhu akhir menjadi 27,5 derajat Celsius. Jadi, perubahan suhu saja belum cukup untuk membandingkan kalor: massa dan kalor jenis juga berperan.

Saat membaca hasil simulasi, sebutkan selalu bagian yang dibahas: kalor larutan atau kalor reaksi. Periksa tanda dan satuan sebelum menyimpulkan.

**Rancangan produksi:** rekaman narasi Bahasa Indonesia dengan animasi diagram model atau rekaman simulasi yang telah dibangun. Belum ada video kalorimetri eksternal yang ditetapkan sebagai video utama.

### B.3 Video M3-VID01 — Tiga cara menggunakan data ΔH

**Tujuan:** siswa membedakan operasi Hess, penggunaan entalpi pembentukan, serta perkiraan energi ikatan. Dasar konsep: R3, R6 dan R7.

| Urutan adegan | Visual yang disiapkan |
| --- | --- |
| 1 | Dua kartu reaksi Hess; sorot CO pada dua sisi. |
| 2 | Eliminasi CO, jumlahkan −111 dan −283 menjadi −394 kJ. |
| 3 | Tombol balik arah: +394 kJ; pengalian dua: +788 kJ. |
| 4 | Tabel pembentukan H₂/Cl₂/HCl; sorot koefisien 2 pada HCl. |
| 5 | Ikatan H–H dan Cl–Cl diputus, dua H–Cl terbentuk; tampilkan hasil perkiraan −185 kJ. |
| 6 | Ringkasan pemilihan metode menurut data yang tersedia. |

**Naskah narasi:**

Bagaimana menentukan perubahan entalpi tanpa mengukur sendiri setiap reaksi? Kita dapat menggunakan data yang sudah tersedia. Pilihan metodenya bergantung pada jenis data yang diberikan.

Cara pertama menggunakan Hukum Hess. Entalpi merupakan fungsi keadaan, sehingga perubahan total ditentukan oleh keadaan awal dan akhir. Pada contoh yang dibulatkan, satu mol karbon grafit bereaksi dengan setengah mol oksigen menghasilkan karbon monoksida dengan perubahan entalpi negatif 111 kilojoule. Karbon monoksida kemudian bereaksi dengan setengah mol oksigen menghasilkan karbon dioksida dengan perubahan entalpi negatif 283 kilojoule.

Saat persamaan dijumlahkan, karbon monoksida muncul pada kedua sisi dan dapat dihilangkan. Perubahan entalpi total adalah negatif 394 kilojoule. Jika seluruh reaksi dibalik, tandanya menjadi positif. Jika semua koefisien dikalikan dua, nilai perubahan entalpi ikut dikalikan dua.

Cara kedua memakai entalpi pembentukan standar. Jumlahkan data pembentukan produk yang sudah dikalikan koefisiennya, kemudian kurangi dengan jumlah untuk reaktan. Perhatikan keadaan zat. Pada pembentukan dua mol HCl gas, data negatif 92,3 kilojoule per mol dikalikan dua, sehingga hasilnya negatif 184,6 kilojoule untuk persamaan yang ditulis.

Cara ketiga memakai energi ikatan. Pemutusan ikatan memerlukan energi; pembentukan ikatan melepaskannya. Perkiraan perubahan entalpi diperoleh dari energi pemutusan dikurangi besar energi pembentukan. Untuk contoh H₂ dan Cl₂ membentuk dua HCl, tabel yang digunakan memberi perkiraan negatif 185 kilojoule.

Hasil energi ikatan dilabeli perkiraan dan memakai spesies fase gas. Pilih metode sesuai data, lalu periksa persamaan, koefisien, fase dan tanda pada setiap langkah.

**Kandidat rujukan eksternal:** [Direktorat SMA — Kimia: Hukum Hess](https://www.youtube.com/watch?v=w5MXlH6VrCI). Metadata pokok telah ditelusuri; durasi, pemutaran, izin sematan, dan seluruh isi perlu diperiksa saat produksi. Naskah di atas bukan transkrip video sumber.

### B.4 Pemeriksaan sebelum video dinyatakan siap

1. Narasi, rumus, diagram, koefisien dan satuan sama dengan materi serta soal.
2. Teks pada layar terbaca di HP; tidak ada musik yang menghalangi narasi.
3. Video dapat dijeda dan diputar pada lingkungan demonstrasi yang dipakai.
4. Transkrip akhir lengkap dan sesuai narasi; teks dapat diakses ketika pemutaran gagal.
5. Judul, pembuat dan sumber media dicantumkan; aset eksternal digunakan sesuai izin penggunaannya.

## Lampiran C. Penyelarasan dengan instruksi pengembang

Jika proyek telah mempunyai `AGENTS.md`, selaraskan aturan operasionalnya dengan versi PRD ini: satu run simulasi valid yang tersimpan cukup; catatan simulasi opsional; kelengkapan kegiatan dan seluruh jawaban kuis membuka modul tanpa minimum nilai; demo berjalan pada satu browser dengan data fiktif; pengelolaan kelas dan tiga laporan merupakan fitur wajib.

Gunakan sumber keputusan pengguna pada bagian 1.1 bila ada perbedaan dengan usulan lama. Jumlah soal, format laporan dan rincian model merupakan baseline implementasi yang dinyatakan terbuka pada bagian 1.2. Draf soal memerlukan pemeriksaan guru sebelum penggunaan; jangan menandai aplikasi, pengujian browser, atau berkas video sebagai selesai hanya karena spesifikasinya sudah tertulis.
