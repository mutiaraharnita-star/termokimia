# Sumber konten — TermoKimia XI

**Acuan produk:** PRD versi 2.0 dan AGENTS.md versi 2.0.  
**Versi konten:** paket tiga modul untuk demonstrasi lokal.  
**Tanggal pencatatan:** 20 Oktober 2026.

## 1. Asal dan pemakaian konten

Materi, kasus, contoh bertahap, soal, kunci, dan pembahasan aplikasi disusun dari Lampiran A PRD TermoKimia XI. Sembilan bagian materi memperluas penjelasan ringkas pada PRD dengan bahasa untuk siswa pemula, tanpa mengubah cakupan tiga modul atau ketentuan penyelesaiannya.

Naskah media berangkat dari Lampiran B PRD. Berkas video aplikasi diproduksi sebagai penjelasan teks dan diagram tanpa suara. Transkrip pada aplikasi harus mengikuti teks video akhir yang benar-benar diproduksi; naskah narasi lengkap pada PRD tetap menjadi dokumentasi rancangan.

Berkas konten terstruktur berada di src/content/learningContent.js. Berkas ini mengekspor modules, getModule(id), dan sources. Setiap modul mempunyai sembilan item wajib dengan ID stabil: tiga materi, dua contoh, satu kasus, satu simulasi, satu video/transkrip, dan satu kuis. Total soal adalah 15.

Pemeriksaan sumber berikut diwarisi dari penyusunan PRD pada 20 Oktober 2026. Tautan tidak diklaim telah diperiksa ulang saat pemindahan konten ke kode. Rujukan kurikulum dipakai untuk pemetaan; bahan ajar lama dipakai untuk konsep. Tidak ada klaim bahwa seluruh CP Kimia Fase F telah dicakup.

## 2. Daftar rujukan materi

| ID | Judul dan penulis/penerbit | Bagian yang digunakan | Status dan batas penggunaan |
| --- | --- | --- | --- |
| R1 | BSKAP (2025), Keputusan Kepala BSKAP Nomor 046/H/KR/2025. [PDF resmi](https://kurikulum.kemendikdasmen.go.id/file/1753929861_manage_file.pdf) | Kimia Fase F, halaman PDF 169–172; pemetaan perubahan entalpi dan sumber energi. | Rujukan kurikulum resmi yang dicatat dalam PRD. Pemilihan kelas XI dan pembagian modul adalah rancangan produk. |
| R2 | Rara, Sudiarto, dan Nestiyarum (2018), E-modul kimia kelas XI: termokimia. [Repositori pemerintah](https://repositori.kemendikdasmen.go.id/20655/) | Pendamping penjelasan konsep termokimia dalam Bahasa Indonesia, terutama M1–M2. | Terbit sebelum Kurikulum Merdeka; digunakan untuk konsep, bukan sebagai CP terkini. |
| R3 | Sriyanto (2020), Modul pembelajaran SMA kimia kelas XI: jenis-jenis dan penentuan entalpi reaksi. [Repositori pemerintah](https://repositori.kemendikdasmen.go.id/22156/) | Pendamping penentuan entalpi reaksi pada M2–M3. | Modul berbasis KD; pemetaan pembelajaran tetap mengikuti R1 dan PRD. |
| R4 | OpenStax, Rice University, Chemistry 2e, §5.1 Energy Basics. [Baca sumber](https://openstax.org/books/chemistry-2e/pages/5-1-energy-basics) | Suhu, kalor, energi, kalor jenis, dan perpindahan energi. | Dasar konsep untuk M1-MAT01, M2-MAT01, kasus, serta kuis terkait. Penjelasan ditulis dengan bahasa sendiri. |
| R5 | OpenStax, Rice University, Chemistry 2e, §5.2 Calorimetry. [Baca sumber](https://openstax.org/books/chemistry-2e/pages/5-2-calorimetry) | Neraca kalor dan asumsi kalorimeter. | Dasar M2; kalor wadah dan kehilangan kalor diabaikan pada model. |
| R6 | OpenStax, Rice University, Chemistry 2e, §5.3 Enthalpy. [Baca sumber](https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy) | Entalpi, qₚ = ΔH, Hess, pembentukan standar, dan contoh data. | Dasar M1-MAT02–03 serta M3-MAT01–02. Kondisi tekanan tetap dan hanya kerja ekspansi/kompresi selalu disebutkan ketika memakai qₚ = ΔH. |
| R7 | OpenStax, Rice University, Chemistry 2e, §7.5 Strengths of Ionic and Covalent Bonds. [Baca sumber](https://openstax.org/books/chemistry-2e/pages/7-5-strengths-of-ionic-and-covalent-bonds) | Energi ikatan dan batas perhitungan fase gas. | Dasar M3-MAT03 dan M3-EX02. Hasil memakai energi ikatan dilabeli estimasi. |

Atribusi R4–R7 adalah kepada buku OpenStax Chemistry 2e. Persamaan, data, dan batas model dipakai sebagai rujukan konsep; teks buku, gambar buku, maupun video eksternal tidak disalin menjadi halaman aplikasi.

## 3. Pemetaan konten dan angka

| Kelompok | Materi/kasus/soal | Sumber atau asal data |
| --- | --- | --- |
| M1 | Sistem–lingkungan, suhu dan kalor; eksoterm/endoterm; diagram entalpi. | R2, R4, R6; kasus kompor dan rumusan soal asli Lampiran A. |
| M1-EX01–02 | Reaktan 80 kJ dan produk 30 kJ; proses yang menyerap 35 kJ. | Data ilustrasi, bukan hasil pengukuran bahan tertentu. |
| M1-SIM01 | Reaktan sebagai acuan 0; produk −100 sampai +100 kJ. | Model konseptual PRD; tidak memodelkan suhu atau laju reaksi. |
| M2 | Kalor larutan, kalor reaksi, mol reaksi, dan perubahan suhu. | R3–R6; kasus kemasan pemanas dan soal asli Lampiran A. |
| M2-EX01–02 dan M2-SIM01 | c = 4,18 J/(g·°C), ΔH molar ±41,8 kJ/mol; reaksi model 1:1. | Data ilustrasi. Massa adalah massa larutan; kalor jenis tetap; tanpa perubahan fase, kalor wadah, atau kehilangan ke luar. |
| M3-SIM01 | C(s, grafit) + ½O₂(g) → CO(g), −111 kJ; CO(g) + ½O₂(g) → CO₂(g), −283 kJ. | Pembulatan dataset Hess R6 sesuai PRD; total −394 kJ. |
| M3-EX01 | ΔH pembentukan standar HCl(g) = −92,3 kJ/mol; H₂(g) dan Cl₂(g) = 0 pada keadaan acuan. | R6; pembentukan 2 mol HCl menghasilkan −184,6 kJ untuk persamaan tertulis. |
| M3-EX02 | H–H = 436, Cl–Cl = 243, H–Cl = 432 kJ/mol ikatan. | R7; 679 − 864 = estimasi −185 kJ untuk H₂(g) + Cl₂(g) → 2HCl(g). |
| 15 soal kuis | Lima soal konsep per modul, empat opsi, satu kunci, dan pembahasan langsung. | Rumusan asli Lampiran A; belum melalui validasi pada siswa. |

Perbedaan −184,6 kJ dan estimasi −185 kJ dipertahankan sesuai metode serta data yang digunakan. Jangan mengubah keduanya menjadi satu hasil tanpa menjelaskan metode dan pembulatan.

## 4. Media asli aplikasi

| ID | Judul | Berkas aplikasi | Asal dan status |
| --- | --- | --- | --- |
| V1 / M1-VID01 | Ke mana kalor berpindah? | public/videos/m1.mp4; public/videos/m1-poster.jpg | Dikembangkan dari Lampiran B.1; video teks tanpa suara, 90 detik. Produksi selesai; metadata, dekode penuh, transkrip, dan pemutaran awal pada browser telah diperiksa. |
| V2 / M2-VID01 | Larutan hangat, reaksi bertanda apa? | public/videos/m2.mp4; public/videos/m2-poster.jpg | Dikembangkan dari Lampiran B.2; video teks tanpa suara, 92 detik. Produksi selesai; metadata, dekode penuh, transkrip, dan pemutaran awal pada browser telah diperiksa. |
| V3 / M3-VID01 | Tiga cara menggunakan data ΔH | public/videos/m3.mp4; public/videos/m3-poster.jpg | Dikembangkan dari Lampiran B.3; video teks tanpa suara, 100 detik. Produksi selesai; metadata, dekode penuh, transkrip, dan pemutaran awal pada browser telah diperiksa. Jalur transkrip ketika berkas video tidak tersedia juga lulus uji. |

Transkrip akhir tersedia melalui item video yang sama dan berkas teks pendamping yang dihasilkan produksi media. Video dan transkrip dihitung sebagai satu item belajar. Kegagalan pemutaran tidak menghilangkan jalur belajar melalui transkrip.

Durasi 90–100 detik merupakan keputusan implementasi untuk versi produksi ringkas; Lampiran B PRD sebelumnya mengusulkan sekitar 2–3 menit. Transkrip aplikasi mengikuti teks video akhir yang diproduksi.

Pemeriksaan browser menunjukkan posisi pemutaran M1/M2/M3 telah mencapai sekitar 5,7/7,8/29,6 detik, dengan durasi terbaca 90/92/100 detik dan `error` bernilai `null`. Pada uji M3, berkas video sengaja dibuat tidak tersedia; pesan gagal dan penyelesaian melalui transkrip berfungsi, lalu berkas dipulihkan. Rincian produksi terdapat pada [PRODUKSI_VIDEO.md](PRODUKSI_VIDEO.md), sedangkan cakupan pengujian integrasi dicatat pada [HASIL_PENGUJIAN.md](HASIL_PENGUJIAN.md). Hasil ini berasal dari browser pengujian dan tidak menyatakan pengujian pada HP atau laptop fisik.

## 5. Kandidat media eksternal dalam PRD

Kedua video berikut merupakan kandidat rujukan yang tercatat pada PRD. Keduanya tidak digunakan sebagai berkas video utama aplikasi dan naskah asli aplikasi bukan transkrip dari video tersebut.

| Rujukan | Tautan | Status |
| --- | --- | --- |
| Direktorat SMA (2020), Kimia — Perubahan Entalpi Reaksi Pada Tekanan Tetap Dalam Persamaan Termokimia | [YouTube](https://www.youtube.com/watch?v=eGwZMgmHJMs) | Metadata dicatat pada PRD; pemutaran penuh, kecocokan seluruh isi, durasi, dan izin penyematan belum dinyatakan terverifikasi. |
| Direktorat SMA (2020), Kimia — Hukum Hess | [YouTube](https://www.youtube.com/watch?v=w5MXlH6VrCI) | Metadata dicatat pada PRD; pemutaran penuh, kecocokan seluruh isi, durasi, dan izin penyematan belum dinyatakan terverifikasi. |

Rujukan implementasi penyimpanan dari PRD adalah [MDN Web Docs — Window: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Ini merupakan rujukan teknis, bukan sumber materi kimia.

## 6. Pemeriksaan sebelum penggunaan pembelajaran

- Penelaah guru memeriksa kesesuaian bahasa, urutan, dan tingkat kesulitan terhadap ATP yang akhirnya dipilih.
- Notasi, fase, koefisien, tanda, satuan, serta hitungan dibandingkan dengan acuan KIM01–KIM06.
- Kunci serta pembahasan diperbarui bersama jika opsi soal diubah; ID konten tetap stabil.
- Transkrip akhir dibandingkan dengan teks yang muncul pada video.
- Uji pada siswa dibedakan dari pemeriksaan kode. Paket ini adalah materi demonstrasi dan asesmen formatif yang belum divalidasi melalui uji siswa.

