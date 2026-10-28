# Verifikasi domain, data, dan konten — TermoKimia XI

**Acuan:** PRD versi 2.0 dan AGENTS.md versi 2.0.  
**Tanggal pemeriksaan:** 20 Oktober 2026.  
**Waktu pencatatan ulang perintah:** 15:17 UTC.  
**Ruang lingkup:** tes unit pada fungsi domain, perhitungan kimia, penyimpanan tiruan, pembentukan teks CSV, dan data konten. Dokumen ini tidak menyatakan bahwa alur browser sudah lulus.

## 1. Hasil eksekusi aktual

Perintah dijalankan dari direktori proyek:

~~~sh
node --version
npm test
~~~

Versi Node yang dilaporkan:

~~~text
v24.19.0
~~~

Keluaran npm test pada pemeriksaan ulang:

~~~text
npm warn Unknown env config "http-proxy". This will stop working in the next major version of npm.

> termokimia-xi@0.2.0 test
> vitest run

 RUN  v5.0.5 /workspace/scratch/27e0afb8a7c6/termokimia-xi

 Test Files  6 passed (6)
      Tests  69 passed (69)
   Start at  00:17:58
   Duration  318ms (transform 45%, tests 29%, import 21%, worker 5%)
~~~

Proses berakhir dengan kode keluar **0**. Peringatan npm berasal dari konfigurasi lingkungan dan tidak menyebabkan tes gagal. Baris waktu di atas disalin sesuai keluaran runner.

Sebanyak **57 tes pada lima berkas** memeriksa implementasi prototipe lengkap saat ini. **12 tes pada tests/domain.test.js** adalah tes yang sudah ada untuk domain diagram entalpi dan penyimpanan eksplorasi versi beranda terdahulu. Tes lama ikut dijalankan, tetapi tidak dipakai sebagai bukti bahwa alur prototipe lengkap telah diperiksa.

| Berkas | Bukti utama |
| --- | --- |
| tests/learning.test.js | Progres sembilan item, prasyarat modul, respons kasus, satu run simulasi, kuis, nilai, pengulangan, profil, dan pengelolaan kelas. |
| tests/chemistry.test.js | Hitungan KIM01–KIM04, arah kalor, perubahan koefisien Hess, rentang input, angka kosong/tidak valid, dan desimal koma/titik. |
| tests/storage.test.js | Serialisasi dan pemulihan state, kuis parsial, validasi data, kegagalan baca/tulis, data rusak/versi tidak didukung, serta reset eksplisit. |
| tests/reports.test.js | Ketiga CSV, cakupan kelas, percobaan parsial, nilai kosong dibanding 0, snapshot aktivitas, serta pengutipan dan perlakuan teks formula. |
| tests/content.test.js | Kelengkapan 27 item/15 soal, kecocokan opsi dan kunci dengan PRD, aset/transkrip, metadata sumber, serta KIM05–KIM06 dari teks contoh. |
| tests/domain.test.js | Regresi domain dan penyimpanan eksplorasi beranda terdahulu; bukan pengganti tes alur aplikasi lengkap. |

Pemeriksaan lint terpisah terhadap berkas domain/services dan tes yang dikerjakan juga selesai dengan kode keluar 0. Bukti lint tidak digunakan sebagai bukti interaksi browser.

## 2. Cara membaca cakupan

**Bukti unit lulus** berarti perilaku yang disebut pada kolom kedua telah diperiksa oleh tes otomatis yang dijalankan. Satu acceptance criterion dapat mencakup aturan data sekaligus interaksi pengguna; lulus pada aturan data tidak otomatis berarti seluruh acceptance criterion lulus pada browser.

Penyimpanan dalam tes memakai objek tiruan dengan metode getItem/setItem. Ini menguji serialisasi, validasi, dan penanganan error, bukan browser localStorage yang sebenarnya. Tes laporan memanggil generateReport dan membaca hasil CSV; tombol unduh, izin unduhan, serta berkas hasil unduhan browser tidak dijalankan oleh tes tersebut.

## 3. Pemetaan AC01–AC21

| AC | Bukti unit/domain yang lulus | Bagian acceptance criterion yang belum dibuktikan oleh tes unit |
| --- | --- | --- |
| **AC01 — Pergantian profil** | learning.test.js: setelah progres siswa pertama dibuat, pergantian profil menunjukkan siswa kedua tetap berprogres 0; riwayat siswa pertama tetap ada. Aksi belajar untuk profil yang tidak aktif ditolak. | Klik pemilih profil, kecocokan nama/kelas di layar, serta pergantian profil berulang melalui UI. |
| **AC02 — Kelola kelas dan pindah siswa** | learning.test.js: membuat/mengganti nama kelas, menambah/mengubah siswa, memindahkan kelas tanpa kehilangan riwayat, serta menolak penghapusan kelas berisi siswa. reports.test.js: ekspor mengikuti kelas terkini. | Seluruh formulir guru, pesan simpan, muat ulang sesudah perubahan kelas melalui UI, serta konfirmasi penghapusan. |
| **AC03 — Prasyarat kartu dan URL** | learning.test.js: M1 terbuka; M2/M3 terkunci pada state awal; aksi pada modul terkunci ditolak oleh domain. | Kartu, URL langsung, pesan alasan terkunci, dan tujuan tombol langkah berikutnya. |
| **AC04 — Materi/contoh selesai** | learning.test.js: COMPLETE_ITEM menambah tepat satu item; pengiriman ulang identik tidak menambah progres atau mengubah state; case/simulation/quiz tidak dapat diselesaikan melalui aksi ini. | Membuka materi/contoh saja tidak menandainya selesai, serta tombol Tandai selesai hanya dipakai setelah bagian dibuka. |
| **AC05 — Video dan transkrip satu item** | learning.test.js: penandaan dengan ID video yang sama hanya dihitung sekali. content.test.js: satu item video per modul, aset video/poster/VTT tersedia, transkrip berkas sama dengan transkrip aplikasi. | Pemutaran, jeda, kegagalan video, akses transkrip, dan penandaan melalui kedua jalur di browser. Keberadaan berkas tidak membuktikan pemutaran. |
| **AC06 — Respons kasus** | learning.test.js: dua respons wajib; kosong, jumlah respons tidak sesuai, tipe salah, dan respons terlalu panjang ditolak; respons valid disimpan; penyuntingan mempertahankan waktu selesai pertama. storage.test.js: respons kasus dapat disimpan dan dipulihkan. | Formulir, pesan kesalahan, isian tetap tersedia ketika gagal, dan pembahasan baru terlihat setelah simpan berhasil. |
| **AC07 — Satu run valid cukup** | learning.test.js: satu RUN_SIMULATION valid menghasilkan runs = 1 dan item selesai tanpa catatan; run berikutnya tidak menambah jumlah item. storage.test.js memeriksa penyimpanan hasil. | Membuka simulasi tidak otomatis selesai; tombol Jalankan mencatat hasil; UI hanya menandai sukses sesudah simpan berhasil. |
| **AC08 — Kontrol berubah/input invalid** | chemistry.test.js: angka kosong, null, boolean, angka tidak hingga, format salah, dan nilai di luar rentang ditolak. learning.test.js: run invalid tidak menambah progres atau mengubah state asal. | Menggeser/mengubah kontrol tanpa menekan Jalankan, petunjuk input terlihat, serta pembedaan hasil lama dan input yang belum dijalankan. |
| **AC09 — Hess valid belum sesuai target** | chemistry.test.js dan learning.test.js: konfigurasi satu kartu yang valid menghasilkan matchesTarget = false, tetap mencatat satu run, dan menyelesaikan item tanpa refleksi wajib. | Penjelasan ketidaksesuaian terlihat, koefisien/hasil ditampilkan dengan benar, serta status selesai tampil setelah hasil berhasil disimpan. |
| **AC10 — Jawaban dan umpan balik** | learning.test.js: jawaban pertama terkunci per soal/percobaan; jawaban ganda identik aman; perubahan jawaban setelah kirim ditolak. content.test.js: kunci dan pembahasan tersedia dan opsi/kunci sesuai PRD. | Pilihan sebelum kirim, tombol Periksa jawaban, penguncian kontrol, serta kunci/pembahasan lengkap langsung terlihat setelah simpan. |
| **AC11 — Pulihkan kuis 3/5** | storage.test.js: tepat tiga jawaban disimpan dan dipulihkan; percobaan tetap aktif dengan nilai null; jawaban yang telah dikirim tetap terkunci. reports.test.js memeriksa soal kosong pada percobaan parsial berstatus Belum dijawab dengan benar/salah dan nilai akhir kosong. | Muat ulang halaman browser sebenarnya, navigasi kembali ke kuis, dan dua soal belum dijawab tampil dengan benar. |
| **AC12 — Tiga benar menghasilkan 60** | learning.test.js: tiga jawaban benar dari lima menghasilkan score, firstScore, dan latestScore = 60; percobaan selesai dan tidak ada percobaan aktif. | Tampilan nilai 60 pada kartu hasil dan dashboard. Aturan hitungnya sudah dibuktikan unit. |
| **AC13 — Nilai 0 membuka modul lengkap** | learning.test.js: sembilan item selesai dan seluruh jawaban salah menghasilkan nilai 0, M1 selesai 100%, dan M2 terbuka. | Penyelesaian alur melalui UI dan akses modul berikutnya melalui tombol/kartu. |
| **AC14 — Nilai 100 tidak menggantikan aktivitas** | learning.test.js: nilai 100 dengan simulasi belum selesai menghasilkan 8/9 item dan M2 tetap terkunci. | Penunjukan aktivitas tersisa serta alasan terkunci yang terlihat pada UI. |
| **AC15 — Kuis lebih dahulu, item terakhir kemudian** | learning.test.js: setelah kuis selesai dan satu simulasi masih belum selesai, menjalankan simulasi memperbarui prasyarat dan membuka M2. | Pembaruan tampilan langsung tanpa muat ulang dan tombol modul berikutnya. |
| **AC16 — Pengulangan tidak menurunkan progres** | learning.test.js: percobaan ulang parsial mempertahankan nilai pertama/terakhir selesai, 9/9 item, serta M2 terbuka. Percobaan kedua selesai memperbarui nilai terakhir dan mempertahankan percobaan pertama. reports.test.js menyertakan semua percobaan. | Tombol Ulangi, berhenti di tengah, berpindah halaman, dan status progres yang terlihat. |
| **AC17 — Muat ulang dan mode guru** | storage.test.js: state yang valid pulih sama setelah penyimpanan tiruan. learning.test.js: pergantian mode/profil dan riwayat tetap konsisten. | Muat ulang browser, masuk mode guru, serta dashboard menampilkan hasil terbaru dari data lokal yang sama. Kombinasi alur ini belum dijalankan oleh tes unit. |
| **AC18 — Gagal simpan/data rusak** | storage.test.js: JSON rusak, versi tidak didukung, referensi/data tidak valid, hasil simulasi yang diubah, gagal baca/tulis, dan getter storage yang melempar error ditangani; data asal tidak ditimpa; reset gagal tidak menghapus data lama. | Pesan kesalahan, isian tetap tersedia, tindakan Coba lagi/reset, dan tidak ada klaim simpan sukses pada UI. |
| **AC19 — Tiga laporan** | reports.test.js: ringkasan seluruh siswa/modul, rincian tiap soal/percobaan, dan catatan kasus/simulasi tersedia sesuai kelas; nilai kosong berbeda dari 0; siswa tanpa kuis tidak mendapat percobaan palsu. Kolom minimum dicocokkan dengan PRD bagian 10 melalui audit kode. | Ketiga tombol unduh, nama berkas hasil unduhan, serta pembacaan berkas yang benar-benar diunduh. |
| **AC20 — Parsial dan tanpa catatan** | reports.test.js: soal kosong tidak diberi status salah, nilai akhir parsial kosong, catatan simulasi kosong sah, dan simulasi tetap Selesai. Snapshot mencerminkan input/hasil terakhir serta jumlah run. | Tampilan detail guru dan berkas unduhan browser memuat data yang sama. |
| **AC21 — Karakter khusus CSV** | reports.test.js: pembaca CSV pada tes memulihkan koma, kutip ganda, dan baris baru; teks berawalan formula diberi prefiks teks; nilai/progres tetap diekspor sebagai angka. | Impor berkas unduhan pada aplikasi spreadsheet tertentu tidak dijalankan oleh tes ini. |

**AC22** berada di luar cakupan dokumen ini: lebar 360/768/1366 px, keyboard, fokus, area sentuh, kontrol tertutup, overflow, serta keterbacaan memerlukan pemeriksaan browser. Catat hasilnya pada laporan pengujian browser utama.

## 4. Pemetaan KIM01–KIM06

| ID | Bukti dan hasil aktual | Batas bukti |
| --- | --- | --- |
| **KIM01** | chemistry.test.js: produk −50 kJ dengan reaktan acuan 0 menghasilkan ΔH −50 dan eksoterm; pembalikan menghasilkan +50 dan endoterm. | Fungsi hitung diuji; label/sumbu/posisi diagram yang dirender memerlukan browser. |
| **KIM02** | chemistry.test.js: m = 100 g, T awal = 25 °C, n = 0,05 mol, ΔH molar = −41,8 kJ/mol menghasilkan q reaksi −2090 J, q larutan +2090 J, ΔT 5 °C, dan T akhir 30 °C. | Fungsi hitung dan hasil numerik sebelum pembulatan tampilan. |
| **KIM03** | chemistry.test.js: massa 200 g menghasilkan 27,5 °C; cabang endoterm +41,8 kJ/mol pada massa 100 g menghasilkan 20 °C. | Perubahan kontrol dan tampilan suhu di browser belum dibuktikan oleh tes ini. |
| **KIM04** | chemistry.test.js: Hess −111 − 283 = −394 kJ; CO tereliminasi; pembalikan +394 kJ; faktor dua −788 kJ. Koefisien dan susunan reaktan/produk ikut diperiksa. | Tampilan kartu terpilih/tidak terpilih, persamaan, dan langkah eliminasi memerlukan browser. |
| **KIM05** | content.test.js membaca koefisien 2 serta data HCl(g) −92,3 kJ/mol dari teks contoh M3-EX01. Perhitungan ulang 2 × (−92,3) − (0 + 0) = −184,6 kJ cocok dengan kesimpulan yang ditampilkan dan kunci M3-Q04. | Ini verifikasi contoh konten, bukan fitur kalkulator pembentukan. Tidak ditambahkan kalkulator yang tidak diminta. |
| **KIM06** | content.test.js membaca H–H 436, Cl–Cl 243, H–Cl 432, dan koefisien produk 2 dari M3-EX02. Hasil 679 − 864 = −185 kJ cocok dengan teks langkah dan kesimpulan. Label estimasi/fase gas serta kunci M3-Q05 ikut diperiksa. | Ini verifikasi contoh konten, bukan kalkulator energi ikatan umum. |

Tes content.test.js membaca angka dari contoh aplikasi yang sebenarnya. Tes tidak hanya menghitung konstanta terpisah lalu mengabaikan teks yang akan dibaca siswa. Tes kunci juga mencocokkan seluruh 15 soal dan urutan opsi dengan lampiran PRD.

## 5. Pemeriksaan sumber kimia

Sumber berikut dibuka langsung pada 20 Oktober 2026 dalam pemeriksaan lanjutan. Pemeriksaan web ini terpisah dari Vitest; tes otomatis tidak memerlukan jaringan.

| Sumber | Bagian yang diperiksa | Hasil |
| --- | --- | --- |
| [OpenStax Chemistry 2e, 5.3 — Enthalpy](https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy) | Check Your Learning sesudah Example 5.11; bagian Hukum Hess. | Sumber memuat data HCl(g) −92,3 kJ/mol dan hasil persamaan pembentukan 2HCl(g) −184,6 kJ. Dataset karbon/CO/CO₂ juga memuat −111, −283, dan −394 kJ. Cocok dengan PRD serta konten. |
| [OpenStax Chemistry 2e, 7.5 — Strengths of Ionic and Covalent Bonds](https://openstax.org/books/chemistry-2e/pages/7-5-strengths-of-ionic-and-covalent-bonds) | Tabel energi ikatan dan contoh H₂(g) + Cl₂(g) → 2HCl(g), sebelum Example 7.9. | Data H–H 436, Cl–Cl 243, dan H–Cl 432 kJ/mol cocok. Sumber menghitung (436 + 243) − 2 × 432 = −185 kJ dan menjelaskan sifat estimasi perhitungan energi ikatan. |

Pemeriksaan ini memvalidasi angka, koefisien, fase, tanda, dan perbedaan basis per mol dengan basis persamaan pada KIM05–KIM06. Metadata R1–R7 diperiksa kelengkapannya dalam tes konten; keberadaan metadata tidak berarti semua halaman sumber dibuka ulang dalam eksekusi tes ini. Penelaahan pedagogis oleh guru untuk penggunaan kelas nyata tetap berbeda dari verifikasi unit dan aritmetika.

## 6. Audit integrasi dan pekerjaan di luar bukti unit

Audit baca-kode dilakukan pada useDemo, ModulePage, dan QuizPanel. Kontrak aksi dan bentuk hasil domain sesuai dengan pemakaiannya. useDemo menulis state baru melalui saveDemo sebelum melakukan commit ke state React; QuizPanel mengambil jawaban tersimpan dari state untuk menampilkan penguncian dan umpan balik. Ini hasil pemeriksaan kode, bukan pengganti tes interaksi atau injeksi kegagalan melalui browser.

Dua temuan UI telah diteruskan kepada pengembang UI dan tidak dihitung sebagai perbaikan oleh dokumen domain ini:

- Pesan Perbarui pada dashboard guru perlu mengikuti keberhasilan nilai kembalian onRefresh, agar kegagalan baca tidak diikuti pesan sukses.
- Rincian Hess perlu membedakan kartu included = false dari kartu yang digunakan; result.cards memuat kedua kartu beserta statusnya.

Status perbaikan dan pengujian ulang kedua temuan tersebut harus mengikuti laporan browser/integrasi terbaru. Dokumen ini tidak mengubah UI dan tidak menetapkan status akhirnya.

Pekerjaan yang belum dibuktikan oleh tes unit mencakup alur siswa–guru melalui browser, muat ulang halaman sebenarnya, pesan gagal dan pemulihan UI, unduhan browser, pemutaran/fallback video, aksesibilitas keyboard, responsivitas, serta pembacaan CSV dalam aplikasi spreadsheet. Satukan bukti domain ini dengan hasil browser; jangan menandai seluruh AC lulus hanya berdasarkan 69 tes otomatis.
