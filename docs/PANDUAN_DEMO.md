# Panduan demonstrasi TermoKimia XI

Panduan ini mengikuti nama tombol dan rute pada implementasi saat ini. Gunakan akun siswa dan satu browser pada alamat aplikasi yang sama sepanjang demonstrasi.

**Tujuan demonstrasi:** memperlihatkan pembelajaran lengkap M1, pembukaan M2 meskipun nilai kuis 0, riwayat yang dapat ditinjau guru, ketiga laporan CSV, serta pemindahan profil tanpa kehilangan progres.

## 1. Persiapan

1. Dari folder yang berisi `package.json`, jalankan `npm ci` jika dependensi belum tersedia, kemudian `npm run dev`.
2. Buka alamat **Local** yang dicetak oleh Vite dan biarkan terminal server tetap berjalan.
3. Tekan **Masuk** pada navbar atau **Mulai Belajar** pada beranda.
4. Pilih **Alya Demo** dari kelas **XI Demo**. Data awal juga menyediakan Bima Demo dan Citra Demo.
5. Di **Ruang siswa**, periksa bahwa M1 tersedia dan M2/M3 masih memiliki prasyarat.

Langkah di bawah mengasumsikan Alya belum mengerjakan kegiatan apa pun. Jika profil itu sudah berisi progres, masuk dengan akun siswa lain yang masih kosong atau daftarkan akun siswa baru. Jika memang ingin memulai seluruh demo dari awal, gunakan **Panduan & sumber → Reset seluruh data demo**, lalu baca dan setujui konfirmasi. Reset menghapus semua data demo pada origin tersebut.

Siswa masuk menggunakan nama dan kelas. Guru masuk menggunakan akun administrator. Diagram interaktif pada beranda dapat dicoba sebagai pengantar; menyelesaikan aktivitas belajar dilakukan di dalam modul.

## 2. Perlihatkan bahwa kuis selesai tidak berarti modul selesai

Buka **Konsep Dasar Termokimia** melalui **Mulai modul** atau **Lanjutkan belajar**. Pada daftar **Isi modul**, pilih **Kuis konsep Modul 1**, lalu tekan **Mulai kuis**.

Untuk demonstrasi aturan tanpa ambang nilai, sengaja pilih jawaban yang salah berikut. Ini merupakan **skenario uji**, bukan kunci jawaban untuk belajar. Urutan ini berlaku untuk konten versi 2.0 yang disertakan.

| Soal | Pilihan untuk skenario nilai 0 | Teks pilihan yang salah |
| --- | --- | --- |
| M1-Q01 | A | reaktan yang berubah menjadi bahan bakar |
| M1-Q02 | A | kalor masuk ke sistem dan ΔH positif |
| M1-Q03 | B | ΔH = +50 kJ; produk mempunyai entalpi lebih tinggi |
| M1-Q04 | A | kalor adalah angka yang terbaca langsung pada termometer |
| M1-Q05 | A | −75 kJ |

Untuk setiap soal, pilih opsi lalu tekan **Periksa jawaban**. Pembahasan muncul langsung dengan jawaban yang benar dan alasannya. Sesudah tersimpan, pilihan soal tersebut terkunci pada percobaan yang sama. Gunakan **Soal berikutnya** atau nomor soal untuk berpindah.

Setelah soal kelima dikirim, hasil menunjukkan **0/100** dan **5/5 soal terjawab**. Kuis selesai sebagai **satu** kegiatan, sehingga progres M1 baru **1/9**. M2 masih terkunci karena delapan kegiatan lain belum selesai. Nilai 0 bukan penyebab penguncian.

## 3. Lengkapi lima kegiatan bacaan

Buka lima kegiatan berikut pada **Isi modul**. Pelajari masing-masing, lalu tekan **Tandai selesai** sampai tombol berubah menjadi **Kegiatan selesai**.

| Jenis | Judul |
| --- | --- |
| Materi 1 | Suhu, kalor, sistem, dan lingkungan |
| Materi 2 | Eksoterm, endoterm, dan perubahan entalpi |
| Materi 3 | Tanda ΔH dan diagram entalpi relatif |
| Contoh 1 | Membaca selisih entalpi |
| Contoh 2 | Dari arah kalor ke diagram |

Setelah kelimanya ditandai, progres menjadi **6/9**. Membuka halaman saja tidak menandai materi atau contoh selesai.

## 4. Kirim studi kasus

Pilih **Air dipanaskan dengan kompor**. Isi kedua respons. Contoh jawaban untuk presentasi:

1. “Kalor berpindah dari sistem reaksi pembakaran menuju lingkungan, termasuk panci, air, dan udara sekitar.”
2. “Reaksi pembakaran bersifat eksoterm. Sistem melepaskan kalor sehingga ΔH sistem negatif.”

Tekan **Kirim jawaban kasus**. Pastikan terlihat **Respons tersimpan** dan contoh pembahasan. Progres menjadi **7/9**.

Setiap respons harus berisi 1–1.000 karakter setelah spasi tepi dibuang. Respons kasus tidak diberi nilai otomatis; ketepatan jawaban bukan syarat penyelesaian. Guru dapat membaca respons yang benar-benar dikirim. Jika respons diubah, gunakan **Simpan perubahan jawaban**.

## 5. Jalankan simulasi sekali

Pilih **Peta entalpi dan arah kalor**. Parameter awal yang valid boleh langsung dipakai: entalpi produk −50 kJ dan arah reaksi awal.

Tekan **Jalankan simulasi** sekali. Hasil tersimpan menunjukkan **ΔH = −50 kJ, eksoterm**, dengan kalor keluar dari sistem. Pastikan terlihat **Simulasi selesai · 1 kali dijalankan**. Progres menjadi **8/9**.

Biarkan **Catatan pengamatan** kosong untuk menunjukkan bahwa catatan memang opsional. Tidak perlu mengubah dua variabel atau menjalankan dua percobaan. Menggeser kontrol tanpa menekan Jalankan simulasi hanya mengubah pratinjau.

Jika ingin memperlihatkan pembalikan reaksi, tekan **Balik arah reaksi** lalu Jalankan simulasi kembali. Hasil menjadi +50 kJ dan endoterm; ini kegiatan tambahan, bukan syarat membuka modul. Jumlah run bertambah dan laporan aktivitas menggunakan hasil run terakhir.

## 6. Selesaikan video atau transkrip dan buka M2

Pilih **Ke mana kalor berpindah?**. Video lokal berisi penjelasan teks dan diagram **tanpa suara**, berdurasi 90 detik. Gunakan kontrol putar/jeda; layar penuh dapat membantu membaca pada HP.

Ada dua pilihan untuk item yang sama:

- Putar video, pelajari penjelasannya, lalu tekan **Tandai selesai**.
- Buka **Buka transkrip video**, pelajari teksnya, lalu tekan **Tandai selesai**.

Tombol tersedia setelah video mulai diputar atau transkrip dibuka. Aturan penyelesaian tidak mewajibkan menonton sampai akhir. Jika video gagal diputar, transkrip tetap dapat digunakan. Membuka keduanya tidak menambah dua item.

Sekarang M1 menjadi **9/9**, meskipun kuisnya bernilai **0**. Pesan **Seluruh kegiatan modul ini selesai** muncul dan tombol **Modul berikutnya** membuka **Kalorimetri**. Di Ruang siswa, progres keseluruhan menjadi **9/27** jika belum ada kegiatan lain yang dikerjakan.

## 7. Perlihatkan M2/M3 dan penyimpanan progres

Pada M2, pilih **Kalorimeter ideal** dan gunakan parameter awal: massa 100 g, suhu awal 25 °C, jumlah reaksi 0,050 mol, serta model eksoterm −41,8 kJ/mol. Tekan **Jalankan simulasi**. Hasil yang diharapkan: kalor reaksi −2.090 J, kalor larutan +2.090 J, dan suhu akhir 30 °C.

M3 tetap terkunci bagi siswa sampai M2 selesai. Untuk membuka M3 melalui alur siswa, lengkapi sembilan kegiatan M2 dengan pola yang sama: tiga materi, dua contoh, dua respons kasus, satu run simulasi, video/transkrip, dan semua lima jawaban kuis. Tidak ada nilai minimum pada M2.

Setelah M3 terbuka, **Penyusun Hukum Hess** dengan dua kartu awal menghasilkan −394 kJ. Pembentukan dan energi ikatan dipelajari pada materi serta contoh bertahap M3. Ketiga modul menyediakan sembilan kegiatan dan lima soal masing-masing.

Untuk demonstrasi singkat, guru dapat meninjau M3 tanpa menuntaskan semua modul siswa melalui **Tinjau materi pembelajaran**. Mode tinjau tidak mencatat progres atau jawaban siswa.

Muat ulang browser untuk memperlihatkan bahwa progres yang sudah tersimpan tetap ada. Gunakan alamat, port, profil browser, serta profil siswa yang sama. Buka **Ganti profil** untuk menunjukkan bahwa progres Bima/Citra terpisah dari Alya.

## 8. Beralih ke Ruang guru

Tekan **Ruang guru** pada navbar, lalu masuk dengan username `admin` dan password `Fisika31`. Pilih **XI Demo** pada daftar **Kelas**. Jika diperlukan, tekan **Perbarui** untuk membaca ulang data pada browser ini.

Periksa kartu Alya:

- M1 berstatus selesai dengan 9/9 kegiatan.
- Nilai pertama dan terakhir menunjukkan 0 untuk satu percobaan selesai yang dibuat dalam skenario ini.
- M2 menampilkan progres yang benar-benar telah dikerjakan; M3 mengikuti kondisi prasyaratnya.
- Progres keseluruhan memakai jumlah kegiatan selesai dari 27 kegiatan.

Tekan **Lihat detail** pada Alya. Perlihatkan riwayat percobaan M1, pilihan siswa, kunci, status salah, dua respons kasus, jumlah run simulasi, serta hasil terakhir. Catatan simulasi boleh tetap kosong.

Jika ingin memperlihatkan kuis parsial, kembali ke siswa, buka M1 → Kuis konsep Modul 1 → **Ulangi kuis**, lalu jawab satu soal. Riwayat percobaan pertama tidak hilang, progres M1 tidak turun, dan nilai terakhir selesai tetap 0 sampai percobaan baru selesai. Detail guru membedakan **Belum dijawab** dari **Salah**, serta nilai akhir kosong dari nilai 0.

## 9. Unduh tiga laporan

Kembali ke **Ruang guru**, pastikan kelas yang benar terpilih, lalu buka bagian **Unduh laporan kelas**. Tekan **Unduh CSV** pada setiap kartu berikut.

| Kartu | Nama berkas | Yang diperlihatkan |
| --- | --- | --- |
| Rekap belajar | `rekap_belajar.csv` | Nama, kelas saat ekspor, status/progres tiap modul, soal aktif terjawab, nilai pertama dan terakhir selesai. |
| Rincian jawaban kuis | `rincian_jawaban_kuis.csv` | Setiap soal pada tiap percobaan yang benar-benar ada; pilihan siswa, kunci, status, benar/salah, dan waktu. |
| Catatan aktivitas | `catatan_aktivitas.csv` | Respons kasus, status aktivitas, jumlah run simulasi, input/hasil terakhir, dan catatan opsional. |

Laporan mencakup **kelas yang sedang dipilih**. Rekap tetap memuat siswa yang belum mulai. Rincian kuis tidak membuat percobaan palsu bagi siswa yang belum memulai kuis; jika percobaan parsial ada, soal yang belum dijawab ikut ditampilkan sebagai belum dijawab. Nilai kosong tidak sama dengan 0.

Berkas menggunakan CSV UTF-8 dengan pemisah koma. Jika aplikasi spreadsheet menempatkan seluruh baris dalam satu kolom, gunakan fitur impor teks/CSV, pilih pemisah koma dan pengodean UTF-8. Waktu laporan menggunakan WIB. CSV merupakan rekap dan belum dapat diimpor kembali untuk memulihkan state aplikasi.

## 10. Buat kelas dan pindahkan profil

1. Pada Ruang guru, buka **Kelola kelas dan akun siswa**.
2. Isi **Buat kelas baru** dengan `XI B Demo`, lalu tekan **Tambah kelas**.
3. Biarkan atau pilih kembali **XI Demo** pada daftar Kelas di bagian atas.
4. Pada baris Alya, pilih `XI B Demo` melalui kolom **Kelas**, lalu tekan **Simpan profil**.
5. Pilih **XI B Demo** pada daftar Kelas utama. Alya sekarang terlihat di kelas baru bersama seluruh riwayat dan progresnya.
6. Tekan **Lihat detail** untuk memeriksa bahwa percobaan bernilai 0, respons kasus, dan hasil simulasi tetap ada.
7. Unduh Rekap belajar dari kelas baru. Kolom kelas menggunakan kelas siswa saat ekspor.

Untuk menambah profil lain, isi **Tambah siswa ke kelas ini** lalu tekan **Tambah siswa**. Untuk mengganti nama kelas, gunakan **Nama kelas terpilih → Ubah nama kelas**. Penggantian nama tampilan tidak mengganti identitas internal profil.

**Hapus kelas kosong** hanya tersedia ketika kelas tidak berisi siswa dan masih ada kelas lain yang dipertahankan. Pemindahan siswa dilakukan terlebih dahulu; aplikasi meminta konfirmasi penghapusan kelas kosong. Penghapusan profil siswa bukan fitur pada versi ini.

## 11. Tutup demonstrasi

Tunjukkan **Panduan & sumber** untuk melihat petunjuk siswa/guru, glosarium, sumber konsep, dan penjelasan penyimpanan lokal. Jangan menekan reset pada akhir presentasi jika ingin mempertahankan hasil.

Tutup server dengan Ctrl+C bila demonstrasi selesai. Saat menjalankan kembali, gunakan origin yang sama agar progres tersedia. Mode siswa dan guru dapat berbagi data karena memakai browser dan origin yang sama; aplikasi tidak mengirim progres ke perangkat guru yang berbeda.

Panduan ini adalah skenario pelaksanaan. Catatan hasil pemeriksaan yang benar-benar dilakukan berada pada [HASIL_PENGUJIAN.md](HASIL_PENGUJIAN.md).
