# Panduan menyunting konten TermoKimia XI

Panduan ini ditujukan bagi penyunting materi dan pengembang yang melanjutkan prototipe. Simpan salinan proyek sebelum perubahan besar. Gunakan VS Code untuk menyunting berkas, jalankan server pengembangan untuk meninjau tampilan, dan catat rujukan materi yang diubah.

## 1. Lokasi yang benar

| Yang akan diubah | Berkas utama |
| --- | --- |
| Nama produk, identitas sekolah, nama penyusun | `src/content/siteContent.js`, objek `siteIdentity`. |
| Judul tab browser dan deskripsi halaman | `index.html`, elemen `<title>` dan `<meta name="description">`. |
| Judul, tujuan, uraian, kegiatan, soal, pembahasan, transkrip, sumber modul aktif | `src/content/learningContent.js`. |
| Rumus, nilai tetap model, validasi input, hasil simulasi | `src/domain/chemistry.js`. |
| Parameter awal dan kontrol simulasi yang terlihat | `src/components/SimulationPanel.jsx`. |
| Aturan progres, pembukaan modul, evaluasi kuis, versi data/konten | `src/domain/learning.js`. |
| Validasi serta pembacaan/penulisan data lokal | `src/services/demoStorage.js`. |
| Kolom dan pembentukan CSV | `src/services/reports.js`. |
| Naskah produksi video dan gambar adegan | `scripts/generate-videos.py`. |
| MP4, poster, VTT, transkrip sumber, metadata video | `public/videos/`. |
| Sumber dan catatan verifikasi konten | `docs/SUMBER_KONTEN.md`, `docs/PRODUKSI_VIDEO.md`. |

**Materi pembelajaran aktif memakai `learningContent.js`.** Pada `siteContent.js` masih terdapat data kartu dari tahap beranda; mengubah array lama itu tidak mengganti materi pada halaman modul. Untuk identitas situs, sunting `siteIdentity`; biarkan sekolah/penyusun kosong bila belum ditentukan.

Jika nama produk diubah, selaraskan juga `<title>` dan deskripsi pada `<meta name="description">` di `index.html`. Metadata HTML tersebut tidak diperbarui otomatis dari `siteIdentity`; judul tab browser perlu disunting secara terpisah dari identitas pada antarmuka.

## 2. Bentuk modul dan ID

`learningContent.js` mengekspor `modules`, fungsi `getModule`, dan daftar `sources`. Setiap modul aktif mempunyai `id`, `number`, `title`, `description`, `topics`, `objectives`, `items`, serta `questions`.

ID modul adalah **M1, M2, dan M3**. ID harus tetap, unik, dan sesuai huruf besar/kecil. Nama tampilan boleh disunting tanpa menjadikan nama tersebut identitas data.

| Pola ID | Jenis | Jumlah per modul |
| --- | --- | ---: |
| `M1-MAT01` sampai `M1-MAT03` | `material` | 3 |
| `M1-EX01` sampai `M1-EX02` | `example` | 2 |
| `M1-CASE01` | `case` | 1 |
| `M1-SIM01` | `simulation` | 1 |
| `M1-VID01` | `video` | 1 |
| `M1-QUIZ01` | `quiz` | 1 |
| `M1-Q01` sampai `M1-Q05` | Objek dalam `questions` | 5 soal |

Pola yang sama berlaku untuk M2/M3. Sembilan item berada dalam `items`; lima soal berada dalam `questions` dan bersama-sama menyelesaikan satu item kuis. Video dan transkrip juga merupakan satu item. Jangan menambah item, mengganti tipe, menambah modul, atau mengubah jumlah soal hanya dengan menempel objek baru: aturan produk, UI, progres, ekspor, dan pengujian memakai baseline ini.

## 3. Menyunting materi dan contoh

Cari ID yang ingin diubah menggunakan pencarian VS Code. Sunting objek yang sudah ada; contoh berikut menunjukkan bentuk data, bukan objek tambahan untuk ditempel dengan ID yang sama.

```js
{
  id: 'M1-MAT01',
  type: 'material',
  title: 'Suhu, kalor, sistem, dan lingkungan',
  paragraphs: [
    'Sistem adalah bagian yang sedang dipelajari. Nyatakan batas sistem sebelum menentukan arah kalor.',
    'Kalor adalah energi yang berpindah karena perbedaan suhu.'
  ],
  formula: 'ΔH = H produk − H reaktan',
  callout: 'Sebutkan bagian yang menerima atau melepaskan kalor.'
}
```

`paragraphs` berisi string yang ditampilkan sebagai paragraf. `formula` dan `callout` bersifat opsional. Komponen merender teks biasa, bukan Markdown atau HTML dari string. Gunakan notasi Unicode yang didukung, misalnya H₂, CO₂, ΔH, °C, dan tanda −; jangan menulis tag `<sub>` atau penanda Markdown dengan harapan akan dirender.

Contoh bertahap menggunakan bentuk berikut:

```js
{
  id: 'M1-EX01',
  type: 'example',
  title: 'Membaca selisih entalpi',
  prompt: 'Entalpi relatif reaktan 80 kJ dan produk 30 kJ pada basis jumlah reaksi yang sama. Tentukan ΔH.',
  steps: [
    'Gunakan ΔH = H produk − H reaktan.',
    'Substitusi: ΔH = 30 − 80 = −50 kJ.',
    'Nilai negatif menunjukkan proses eksoterm.'
  ],
  conclusion: 'Produk memiliki entalpi relatif lebih rendah daripada reaktan.'
}
```

Pertahankan data, satuan, serta basis jumlah reaksi yang konsisten antara pertanyaan, langkah, dan simpulan. Ubah versi konten bila perubahan memengaruhi makna atau hasil belajar yang direkam; lihat bagian 7.

## 4. Menyunting soal dan pembahasan

Setiap soal mempunyai `id`, `prompt`, empat string `options`, `answerIndex`, dan `explanation`. Indeks jawaban dimulai dari **0**: A = 0, B = 1, C = 2, D = 3.

```js
{
  id: 'M1-Q01',
  prompt: 'Jika sistem ialah zat yang bereaksi dalam pembakaran kompor, panci dan air yang dipanaskan termasuk ....',
  options: [
    'reaktan pembakaran',
    'lingkungan',
    'produk pembakaran',
    'sistem yang sama dengan zat bereaksi'
  ],
  answerIndex: 1,
  explanation: 'Panci dan air berada di luar batas sistem yang ditetapkan, sehingga keduanya merupakan lingkungan.'
}
```

Contoh ini harus menggantikan objek yang bersesuaian pada data pengembangan yang telah ditangani versinya. Jangan membuat ID duplikat. Jangan hanya mengubah urutan `options` tanpa menyesuaikan `answerIndex` dan tanpa menangani riwayat jawaban.

Pembahasan ditampilkan setelah **Periksa jawaban**, baik untuk jawaban benar maupun salah. Tulis alasan kunci dan koreksi miskonsepsi yang relevan. Pastikan hanya satu opsi yang benar dalam kondisi soal yang dinyatakan. Hasil penilaian mengikuti `answerIndex`; aplikasi tidak menilai kebenaran konsep dari kalimat secara otomatis.

**Selama demonstrasi berlangsung, bekukan teks soal, opsi, kunci, dan ID.** Riwayat menyimpan pilihan berdasarkan indeks, sedangkan detail dan CSV mengambil teks dari konten aktif. Perubahan tanpa pengelolaan versi dapat membuat pilihan lama ditampilkan sebagai kalimat yang berbeda.

## 5. Kasus, simulasi, dan sumber

Kasus menggunakan `scenario`, dua `prompts`, dan dua `sampleAnswers`. Kedua pasangan mengikuti urutan yang sama. Respons siswa tetap berupa teks bebas, tidak dinilai otomatis sebagai esai. Jangan menambah jawaban contoh sebagai respons siswa yang seolah pernah dikirim.

Item simulasi mengatur judul, `description`, dan `simulationType`. Nilai tipe yang dipakai ialah `enthalpy`, `calorimetry`, dan `hess`. Rumus serta validasi ada pada `chemistry.js`; nilai awal dan kontrol UI ada pada `SimulationPanel.jsx`. Mengubah tulisan `description` tidak mengubah perhitungannya.

Jika mengubah angka atau model simulasi, selaraskan perhitungan, batas input, parameter awal, label satuan, asumsi, materi, soal, video, dan pengujian. Riwayat hasil tersimpan divalidasi ulang menggunakan fungsi perhitungan aktif, sehingga perubahan rumus juga memerlukan penanganan versi/migrasi.

Daftar `sources` mempunyai bentuk:

```js
{
  id: 'R6',
  title: 'Chemistry 2e, 5.3 — Enthalpy',
  author: 'OpenStax, Rice University',
  url: 'https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy',
  usage: 'Syarat qₚ = ΔH, Hukum Hess, dan entalpi pembentukan.',
  status: 'Tuliskan bagian dan tanggal yang benar-benar telah diperiksa.'
}
```

Gunakan sumber primer tepercaya, lalu jelaskan dengan bahasa sendiri. Catat asal data numerik, pembulatan, serta bagian yang digunakan pada `docs/SUMBER_KONTEN.md`. Jangan memberi status sudah ditinjau atau sudah diputar bila pemeriksaan itu belum dilakukan.

## 6. Menyunting video dan transkrip

Item video aktif berisi `videoSrc`, `poster`, dan `transcript` sebagai array paragraf. Contoh jalurnya `/videos/m1.mp4` dan `/videos/m1-poster.jpg`. Pemutar juga mencari caption `/videos/m1-id.vtt` berdasarkan nama MP4.

Versi saat ini adalah video teks dan diagram **tanpa suara**. Naskah dan diagram disusun di `scripts/generate-videos.py`; hasil teks sumber tersedia pada `public/videos/m1-transcript.txt` dan seterusnya. Berkas TXT tidak diimpor otomatis oleh aplikasi: array `transcript` dalam `learningContent.js` harus disamakan dengan berkas hasil produksi.

Alur perubahan media:

1. Sunting paragraf adegan serta diagram pada skrip. Memperbarui paragraf saja tidak otomatis mengganti setiap label pada gambar yang digambar oleh fungsi renderer.
2. Jalankan `python scripts/generate-videos.py --prepare-only` untuk membuat poster, transkrip, VTT, manifest, dan storyboard.
3. Periksa semua slide: rumus, tanda, satuan, pemenggalan, serta keterbacaan.
4. Jalankan `python scripts/generate-videos.py` untuk membuat ketiga MP4, atau tambahkan `--module m1` untuk satu video.
5. Selaraskan `transcript` pada item video dan pastikan setiap media yang berubah ikut diproduksi ulang. `--prepare-only` bukan produksi MP4.
6. Periksa metadata/dekode, tonton sampel awal/tengah/akhir, lalu uji play, pause, seek, caption, dan transkrip melalui pemutar aplikasi.
7. Perbarui manifest serta `docs/PRODUKSI_VIDEO.md` dengan durasi, status suara, dan hasil verifikasi aktual.

Produksi ulang memerlukan Python, Pillow, FFmpeg/ffprobe, dan font yang disebut pada [PRODUKSI_VIDEO.md](PRODUKSI_VIDEO.md). Skrip saat ini menggunakan lokasi font Linux; jalankan melalui Linux/WSL, atau sesuaikan `FONT_DIR` pada skrip dengan lokasi font DejaVu bila memakai Windows native. Alat produksi tersebut tidak diperlukan untuk menjalankan aplikasi atau MP4 yang sudah disertakan. Jangan mengubah label menjadi “narasi” atau “bersuara” tanpa benar-benar menambahkan dan memeriksa audio.

## 7. Versi konten, data lama, dan reset

Versi aplikasi yang relevan ditetapkan pada `src/domain/learning.js`:

```js
export const SCHEMA_VERSION = 2;
export const CONTENT_VERSION = '2.0';
```

`SCHEMA_VERSION` menunjukkan bentuk payload penyimpanan. `CONTENT_VERSION` membekukan materi/soal/model yang dipakai oleh state dan riwayat. Nilai `contentVersion` pada `public/videos/manifest.json` adalah versi paket media, bukan pengganti konstanta aplikasi tersebut.

Penyimpanan aktif menggunakan kunci `termokimia-xi:demo:v2`. Loader memeriksa kesesuaian versi; **migrasi otomatis antarversi belum disediakan**. Jika data tidak cocok, data lama dipertahankan dan penulisan diblokir. Jangan menyiasatinya dengan mengganti nomor versi dalam JSON lama agar dianggap cocok.

| Perubahan | Penanganan |
| --- | --- |
| Ejaan atau gaya visual tanpa mengubah makna, identitas, kunci, urutan opsi, atau struktur | Pertahankan ID; catat koreksi. Tidak perlu mengubah skema hanya karena tampilan. |
| Makna soal/materi, opsi, kunci, ID, jumlah kegiatan, atau perilaku perhitungan berubah | Rencanakan versi konten baru serta reset eksplisit atau migrasi yang mempertahankan makna riwayat. |
| Struktur payload, field tersimpan, atau aturan serialisasi berubah | Rencanakan versi skema baru dan migrasi/reset yang sesuai. |

### Pilihan A — mulai dataset demonstrasi baru

1. **Sebelum mengganti versi atau konten**, gunakan aplikasi lama untuk mengunduh ketiga laporan guru bila hasil perlu disimpan. Simpan juga salinan kode versi lama.
2. Lakukan perubahan konten dan pembaruan versi yang diperlukan. Jangan menghapus storage otomatis saat aplikasi dimuat.
3. Pada aplikasi versi baru, gunakan **Panduan & sumber → Reset seluruh data demo** dan baca konfirmasinya. Tindakan eksplisit ini mengganti dataset lokal dengan data awal versi baru.
4. Mulai percobaan baru dan jalankan pemeriksaan yang relevan. CSV lama tetap menjadi arsip laporan; aplikasi belum memiliki impor pemulihan CSV.

Mengubah `CONTENT_VERSION` saja tidak memigrasikan jawaban lama. Sebaliknya, membiarkan versi tetap sama ketika opsi/kunci berubah dapat membuat jawaban lama tidak sesuai. Pilih strategi sebelum mendistribusikan versi baru.

### Pilihan B — pertahankan riwayat melalui migrasi

Pilihan ini memerlukan pekerjaan pengembangan tambahan. Migrasi harus memetakan ID, mempertahankan makna pilihan dan kunci lama, serta memastikan laporan menampilkan teks soal versi yang benar. Bila soal berubah, pertimbangkan penyimpanan snapshot soal/opsi per percobaan atau konten historis menurut versinya. State saat ini tidak menyimpan snapshot lengkap tersebut.

Uji migrasi terhadap data yang sudah selesai maupun parsial, kegagalan simpan, pembukaan modul, dan ketiga CSV. Pertahankan salinan data lama sampai hasil baru tervalidasi. Jangan mengganti header versi, menghitung ulang nilai dengan kunci baru, atau mereset riwayat secara diam-diam.

## 8. Pemeriksaan setelah perubahan

Jalankan dari folder proyek:

```powershell
npm run lint
npm test
npm run build
```

Lalu buka server pengembangan atau preview dan tinjau bagian yang berubah. Untuk perubahan konten, periksa sekurangnya:

- Jumlah tetap tiga modul, sembilan item per modul, dan lima soal beropsi empat dengan satu kunci.
- ID unik dan rute M1/M2/M3 tetap cocok; tidak ada teks kosong atau tanda kimia yang hilang.
- Rumus, angka, satuan, koefisien, fase, tanda, dan asumsi model konsisten; sumber tercatat.
- Pembahasan cocok dengan opsi/kunci, transkrip cocok dengan media, serta tampilan terbaca pada lebar kecil dan besar.
- Ketika perilaku data berubah, progres, kelanjutan kuis parsial, nilai 0, pengulangan, penyimpanan, dan CSV masih bekerja sesuai PRD.

Untuk perubahan perhitungan, gunakan acuan KIM01–KIM06 pada PRD. Keberhasilan sintaks/build tidak memeriksa seluruh ketepatan materi; catat hasil pemeriksaan nyata pada dokumen pengujian dan minta penelaahan materi oleh guru sebelum pemakaian pembelajaran nyata.
