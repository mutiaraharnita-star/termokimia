# AGENTS.md — TermoKimia XI

**Versi:** 2.0 — 20 Oktober 2026.  
**Berlaku untuk:** seluruh proyek web TermoKimia XI.  
**Acuan produk:** [PRD_Web_Termokimia_Kelas_XI.md](./PRD_Web_Termokimia_Kelas_XI.md), versi 2.0.

## 1. Peran dan cara kerja

Bertindaklah sebagai pengembang web berpengalaman yang bertanggung jawab atas implementasi, ketepatan konten kimia, kemudahan penggunaan, dan verifikasi hasil. Bangun prototipe pembelajaran termokimia untuk siswa kelas XI pemula sesuai Kurikulum Merdeka dan pemetaan Kimia Fase F pada PRD.

Baca PRD sebelum mengubah fitur. Gunakan keputusan terbaru pengguna sebagai acuan perubahan kebutuhan. Jangan menambah syarat belajar, mengurangi fitur wajib, atau mengubah ruang lingkup secara diam-diam. Jika ada ketidaksesuaian dokumen, jelaskan bagian yang bertentangan dan gunakan keputusan pengguna yang sudah jelas.

Kerjakan keputusan teknis rutin secara mandiri. Mintalah klarifikasi hanya jika jawabannya mengubah kebutuhan secara material. Tahapan pengerjaan boleh bertahap; target akhirnya adalah prototipe lengkap sesuai PRD. Saat melanjutkan proyek yang sudah ada, periksa strukturnya dan pertahankan pekerjaan pengguna yang masih relevan.

## 2. Lima aturan wajib dari gambar

| Aspek | Aturan kerja | Pemeriksaan ya/tidak |
| --- | --- | --- |
| Teknologi | Gunakan React + Vite dan komponen fungsional dengan Hooks bila diperlukan. | Apakah aplikasi memakai React + Vite dan seluruh komponen baru berbentuk fungsi? |
| Penyimpanan | Simpan seluruh data demo dan sesi login pada browser (`localStorage`). Akun siswa menggunakan nama + kelas; akun guru hanya satu. Backend eksternal tidak diperlukan untuk versi pertama. | Apakah progres pulih pada browser yang sama tanpa backend eksternal dan tanpa identitas siswa sungguhan? |
| Struktur | Letakkan komponen UI, termasuk komponen halaman, di `src/components/`. `App.jsx` boleh menjadi titik komposisi utama. | Apakah seluruh komponen UI yang dibuat berada di direktori tersebut? |
| Bahasa | Gunakan Bahasa Indonesia baku, komunikatif, dan sesuai siswa pemula pada antarmuka serta konten. | Apakah tombol, instruksi, pembahasan, dan pesan kesalahan menggunakan Bahasa Indonesia yang jelas? |
| Notasi | Tampilkan rumus, muatan ion, simbol, fase, tanda, dan satuan secara benar, misalnya H₂SO₄, Ca²⁺, dan ΔH. | Apakah subskrip, superskrip, tanda ΔH, serta satuan sudah diperiksa pada tampilan? |

## 3. Ruang lingkup wajib

Nama produk adalah **TermoKimia XI**. Identitas sekolah dan penyusun dapat ditambahkan kemudian. Prioritaskan HP dan laptop secara setara dengan tampilan minimalis, bersih, dan akademis.

Bangun empat kelompok fitur berikut:

1. **Pembelajaran:** tiga modul berurutan, materi, contoh bertahap, kasus sehari-hari, simulasi, video/transkrip, dan sumber.
2. **Kuis:** pilihan ganda konsep, pembahasan setiap jawaban, hasil, dan pengulangan.
3. **Akun siswa dan progres:** daftar/masuk dengan nama + kelas, penyimpanan lokal, dan pembukaan modul sesuai kelengkapan.
4. **Guru:** pengelolaan kelas, detail setiap siswa, serta tiga laporan yang dapat diunduh.

Tiga modulnya adalah **Konsep Dasar Termokimia**, **Kalorimetri**, dan **Penentuan ΔH Reaksi**. Beranda memuat navbar, pengantar, tiga kartu modul, dan tombol Mulai Demo. Lengkapi alur beranda dengan daftar/masuk siswa, login guru, dashboard siswa, halaman modul/kuis, dashboard guru, kelola kelas, detail siswa, serta bantuan/sumber.

Pengelolaan kelas dan ekspor adalah fitur inti versi pertama. Pencarian materi, autentikasi server/sinkronisasi lintas perangkat, chatbot, sertifikat, dan analitik lanjutan dapat dikerjakan setelah kebutuhan inti.

## 4. Struktur dan praktik implementasi

| Lokasi | Isi |
| --- | --- |
| `src/components/` | Komponen UI, halaman, navigasi, formulir, kuis, dashboard, dan tampilan simulasi. |
| `src/content/` | Materi, soal, kunci, pembahasan, sumber, transkrip, serta metadata modul dengan ID stabil. |
| `src/domain/` | Fungsi murni untuk perhitungan kimia, evaluasi kuis, progres, dan pembukaan modul. |
| `src/services/` | Pembacaan/penulisan data lokal serta pembentukan dan unduhan CSV. |
| `src/hooks/` | Hooks untuk perilaku yang digunakan beberapa komponen, bila diperlukan. |
| `src/styles/` | Gaya global, token visual, dan aturan responsif. |
| `public/` | Aset statis yang memiliki sumber dan izin penggunaan yang sesuai. |
| `docs/` | Sumber konten, hasil pemeriksaan, panduan demo, dan petunjuk penyuntingan konten. |

Pisahkan konten, aturan belajar, perhitungan, dan penyimpanan dari komponen tampilan. Gunakan ID tetap untuk siswa, kelas, modul, item, soal, dan percobaan kuis. Jangan memakai nama tampilan atau indeks array sebagai identitas permanen.

Gunakan dependensi seperlunya. Pertahankan satu berkas pengunci dependensi sesuai pengelola paket proyek. Sediakan skrip menjalankan pengembangan, membangun produksi, dan memeriksa kode. Semua tombol yang ditampilkan harus mempunyai tindakan yang berfungsi.

## 5. Penyelesaian kegiatan dan pembukaan modul

Baseline PRD adalah **sembilan item wajib per modul**, sehingga totalnya **27 item**:

| Item per modul | Jumlah | Kondisi selesai |
| --- | ---: | --- |
| Materi | 3 | Bagian dibuka lalu siswa menekan Tandai selesai. |
| Contoh bertahap | 2 | Contoh dibuka lalu ditandai selesai. |
| Video/transkrip | 1 | Salah satu bentuk dibuka lalu item ditandai selesai. Keduanya mewakili satu item. |
| Kasus | 1 | Dua respons masing-masing 1–1.000 karakter setelah `trim` dikirim dan tersimpan. |
| Simulasi | 1 | Satu klik Jalankan simulasi dengan input valid menghasilkan perhitungan dan hasil yang berhasil disimpan. |
| Kuis | 1 | Semua lima soal dalam setidaknya satu percobaan dijawab dan tersimpan. |

Kasus tidak dinilai otomatis sebagai esai. Tampilkan contoh pembahasan setelah respons dikirim. Ketepatan respons kasus bukan syarat penyelesaian.

**Satu kali menjalankan simulasi sudah cukup.** Parameter bawaan yang valid boleh langsung digunakan. Membuka halaman, melihat pratinjau, atau menggeser kontrol saja belum menyelesaikan aktivitas. Run kedua, prediksi, dan catatan pengamatan tidak wajib. Pada simulasi Hess, susunan valid yang belum sama dengan target tetap memenuhi syarat satu run; berikan penjelasan ketidaksesuaian.

Terapkan aturan berikut dalam satu sumber logika yang digunakan seluruh tampilan:

- M1 tersedia sejak awal; M2 terbuka setelah M1 selesai; M3 terbuka setelah M1 dan M2 selesai.
- Modul selesai ketika seluruh sembilan item wajib selesai.
- **Tidak ada nilai minimum. Nilai 0 tetap dapat membuka modul berikutnya.**
- Nilai 100 tidak menggantikan aktivitas yang belum selesai.
- Periksa pembukaan modul setelah setiap perubahan berhasil disimpan, termasuk jika kuis dikerjakan lebih dahulu.
- Pengulangan kuis atau simulasi tidak mengurangi progres maupun mengunci kembali modul.
- Akses melalui navigasi dan URL langsung mengikuti aturan modul yang sama.
- Progres modul dihitung dari item selesai/9; progres keseluruhan dari item selesai/27. Tampilkan pecahan serta persentasenya.
- Kuis parsial ditampilkan sebagai jumlah soal terjawab, misalnya 3/5; item kuis belum selesai.

Jumlah konten ini adalah baseline implementasi PRD. Jangan mengubahnya tanpa mencatat perubahan kebutuhan.

## 6. Kuis dan umpan balik

Sediakan lima soal per modul, masing-masing empat opsi dan satu jawaban benar. Gunakan draf soal serta pembahasan pada lampiran PRD setelah memeriksa ketepatannya.

Siswa boleh mengganti pilihan sebelum menekan Periksa jawaban. Setelah jawaban berhasil diperiksa dan disimpan, kunci jawaban siswa untuk soal tersebut dalam percobaan yang sama. Segera tampilkan benar/salah, jawaban yang tepat, alasan, dan koreksi miskonsepsi yang relevan.

Batasi satu percobaan aktif per siswa per modul. Muat ulang harus melanjutkan percobaan yang belum selesai. Setelah selesai, tombol Ulangi kuis membuat percobaan baru dan mempertahankan semua jawaban sebelumnya.

Hitung nilai akhir dari jumlah jawaban benar/jumlah soal × 100. Simpan nilai percobaan pertama selesai dan terakhir selesai. Nilai akhir percobaan parsial harus kosong; jawaban belum dikirim berstatus Belum dijawab, bukan salah. Percobaan ulang yang belum selesai tidak mengganti nilai terakhir yang sudah selesai.

Cegah jawaban ganda untuk pasangan ID percobaan dan ID soal. Bekukan versi konten selama demonstrasi agar teks, kunci, dan jawaban tersimpan tetap cocok.

## 7. Data demo dan keandalan penyimpanan

Gunakan satu payload `localStorage` berversi, misalnya `termokimia-xi:demo:v2`, dengan `schemaVersion`, `contentVersion`, dan waktu perubahan. Sediakan satu kelas awal dan tiga profil fiktif sebagai data contoh.

Nama dan kelas menjadi kredensial akun siswa lokal; tetap gunakan `studentId` dan `classId` yang stabil untuk data internal. Siswa dapat daftar lalu masuk dengan nama + kelas tanpa password. Guru hanya memiliki satu akun: username `admin` dan password `Fisika31`. Jangan simpan password guru di `localStorage`; simpan hanya sesi peran setelah login berhasil.

Mode siswa dan guru harus membaca data lokal yang sama. Pergantian nama atau kelas mempertahankan progres serta riwayat. Progres profil berbeda harus terpisah. Guru dapat meninjau semua modul tanpa menambah progres siswa.

Jelaskan bahwa data tersimpan pada browser dan alamat aplikasi yang sama. Jangan menjanjikan sinkronisasi antarperangkat. Jalankan demo melalui server Vite atau hasil build yang disajikan melalui server, bukan dengan membuka `index.html` langsung.

Setiap operasi simpan harus menangani kegagalan. Pertahankan isian, tampilkan Belum tersimpan dan Coba lagi, serta jangan menandai item selesai atau membuka modul dari perubahan yang gagal disimpan.

Tangani JSON rusak dan versi skema yang belum didukung tanpa crash atau penimpaan diam-diam. Reset data menggunakan tindakan eksplisit dengan konfirmasi di aplikasi; jangan menghapus data otomatis saat memuat halaman.

## 8. Fitur guru dan tiga laporan wajib

Guru dapat membuat/mengganti nama kelas, menambah/mengubah profil fiktif, serta memindahkan siswa tanpa kehilangan riwayat. Kelas yang masih berisi siswa tidak dihapus sebelum siswanya dipindahkan.

Dashboard menampilkan status dan progres tiap modul, jumlah soal pada percobaan aktif, nilai pertama/terakhir yang selesai, serta waktu pembaruan. Detail siswa memuat seluruh percobaan kuis, jawaban, respons kasus, dan hasil/catatan simulasi. Perbarui tampilan saat masuk mode guru, mengganti kelas, atau menekan Perbarui.

Sediakan tiga unduhan CSV UTF-8 untuk kelas yang sedang dipilih:

| Berkas | Isi minimum |
| --- | --- |
| `rekap_belajar.csv` | Satu siswa per modul: ID, nama, kelas saat ekspor, modul, status, item selesai/total, progres, soal aktif terjawab, nilai pertama/terakhir selesai, dan waktu ekspor. Sertakan siswa yang belum mulai. |
| `rincian_jawaban_kuis.csv` | Satu soal per percobaan: identitas siswa/modul/percobaan, versi konten, teks soal, pilihan siswa, kunci, status jawaban, benar/salah, dan waktu kirim. Sertakan soal kosong pada percobaan parsial. |
| `catatan_aktivitas.csv` | Satu kasus atau simulasi per siswa per modul: status, dua respons kasus, jumlah run, input/hasil simulasi terakhir, waktu terkait, dan catatan pengamatan bila diisi. |

Ikuti kolom lengkap dan satuan baris pada PRD bagian 10. Bedakan nilai kosong dari 0 dan jawaban kosong dari salah. Jangan membuat percobaan palsu bagi siswa yang belum memulai kuis. Catatan simulasi kosong tetap sah; jangan mengarang respons.

Laporan simulasi adalah ringkasan hasil terakhir beserta jumlah run, bukan riwayat lengkap semua run. Gunakan kelas siswa saat ekspor.

Tangani koma, tanda kutip, dan baris baru dengan pengutipan CSV yang benar. Perlakukan nama, kelas, dan respons bebas sebagai teks agar awalan formula tidak menjadi formula aktif. Pertahankan nilai/progres sebagai angka. Gunakan waktu tersimpan yang konsisten dan tampilan zona Asia/Jakarta.

## 9. Ketepatan materi kimia dan media

Gunakan sumber kurikulum dan kimia yang tercantum pada PRD. Catat judul, penerbit/penulis, URL, bagian yang dipakai, dan status verifikasi sumber. Tulis penjelasan serta pembahasan dengan bahasa sendiri. Jika menambah fakta, angka, atau media, periksa sumbernya dan catat asalnya.

Terapkan pemeriksaan berikut pada materi, soal, diagram, dan simulasi:

- Definisikan sistem dan lingkungan sebelum menetapkan arah kalor. Bedakan kalor sebagai perpindahan energi dari suhu.
- Gunakan `ΔH = H_produk − H_reaktan`; eksoterm bertanda negatif dan endoterm positif untuk sistem yang dinyatakan.
- Jelaskan bahwa `q_p = ΔH` berlaku pada tekanan tetap dengan hanya kerja ekspansi/kompresi.
- Pada kalorimetri ideal, gunakan `q_larutan = mcΔT` dan `q_reaksi = −q_larutan`. Nyatakan asumsi kalorimeter, kehilangan kalor, dan konversi J–kJ.
- Bedakan ΔH untuk persamaan reaksi dengan nilai molar; sebutkan basis mol dan koefisiennya.
- Pembalikan reaksi membalik tanda ΔH; pengalian seluruh koefisien mengalikan ΔH dengan faktor yang sama.
- Entalpi pembentukan memperhitungkan koefisien dan fase. Energi ikatan memakai energi pemutusan dikurangi energi pembentukan dan diberi label estimasi.
- Diagram entalpi memakai sumbu entalpi relatif dan kemajuan reaksi; jangan melabelinya sebagai suhu atau waktu.
- Gunakan model dan batas input SIM1–SIM3 pada PRD bagian 7. Tampilkan satuan serta asumsi model, validasi angka hingga hasilnya, dan jangan menyajikan hasil lama sebagai hasil input baru yang tidak valid.

Gunakan hasil acuan **KIM01–KIM06** berikut dengan input lengkap dari PRD:

| ID | Hasil yang diharapkan |
| --- | --- |
| KIM01 | ΔH −50 kJ, eksoterm; setelah dibalik +50 kJ, endoterm. |
| KIM02 | q reaksi −2.090 J; q larutan +2.090 J; suhu akhir 30 °C. |
| KIM03 | Massa 200 g menghasilkan 27,5 °C; model endoterm pada 100 g menghasilkan 20 °C. |
| KIM04 | Hess −111 − 283 = −394 kJ; dibalik +394 kJ; dikali dua −788 kJ. |
| KIM05 | Pembentukan 2HCl(g) dari unsur standarnya menghasilkan −184,6 kJ untuk persamaan tersebut. |
| KIM06 | Energi ikatan: 679 − 864 = estimasi −185 kJ. |

Sediakan video singkat dan transkrip setara untuk setiap modul. Periksa kecocokan isi, pemutaran, dan izin penggunaan/penyematan; jangan menyamakan judul video yang ditemukan dengan video yang sudah diverifikasi. Naskah/storyboard belum merupakan berkas video.

Jika video gagal diputar, transkrip tetap tersedia dan dapat menyelesaikan item yang sama. Catat produksi atau verifikasi video yang belum selesai sebagai pekerjaan tersisa. Draf materi dan soal tetap memerlukan penelaahan guru sebelum dipakai untuk pembelajaran nyata.

## 10. Tampilan dan aksesibilitas

**Keputusan visual terbaru, 22 Oktober 2026:** gunakan tema **Petualangan Energi** secara konsisten pada seluruh aplikasi, bukan hanya Beranda. Kanvas utama biru gelap, panel konten krem seperti kertas, CTA/judul kuning, aksen progres hijau mint, dan bentuk panel/kontrol tegas bergaya piksel. Tipografi piksel hanya untuk judul, nomor, statistik singkat, dan label; paragraf, rumus, form, kuis, tabel, serta teks panjang harus tetap mudah dibaca. Keputusan ini menggantikan arahan visual "minimalis, bersih, dan akademis" sejauh menyangkut tema visual, tetapi tidak mengganti aturan keterbacaan, aksesibilitas, responsivitas, atau fungsi produk. Rincian ada pada `docs/DESAIN_PETUALANGAN_SELURUH_APLIKASI.md`.

Gunakan hierarki judul yang jelas, ruang kosong yang cukup, dan gaya visual konsisten. Pastikan beranda memperlihatkan ketiga modul serta statusnya. Jangan menambah identitas sekolah atau nama penyusun yang belum diberikan.

Periksa lebar 360, 768, dan 1366 px. Gunakan teks isi sekitar 16 px atau lebih dan target area sentuh 44 × 44 px. Sediakan label formulir, fokus keyboard yang terlihat, dan pesan kesalahan yang menjelaskan tindakan perbaikan.

Status benar/salah, eksoterm/endoterm, dan terkunci harus disampaikan melalui teks atau simbol selain warna. Simulasi dapat dioperasikan dengan keyboard/tombol; jangan mewajibkan seret-lepas. Tabel guru harus tetap terbaca pada layar kecil, misalnya melalui tampilan kartu.

Video tidak autoplay dan dapat dijeda. Sediakan keadaan belum ada data, terkunci, sedang menyimpan, berhasil, dan gagal sesuai kebutuhan tindakan. Bila menggunakan Taste Skill atau pedoman visual lain, tetap patuhi aturan produk dan keterbacaan di dokumen ini.

## 11. Verifikasi dan hasil yang harus diserahkan

Periksa satu alur lengkap M1 terlebih dahulu, kemudian lengkapi M2/M3 dan fitur guru. Jangan berhenti pada beranda saat tugas yang diberikan adalah prototipe lengkap.

Lakukan pemeriksaan yang relevan terhadap perubahan. Untuk prototipe lengkap, jalankan build, pemeriksaan kode, **AC01–AC22**, dan **KIM01–KIM06** dari PRD. Utamakan pengujian fungsi hitung, progres, penyimpanan, kuis, dan CSV; gunakan pemeriksaan browser untuk alur dan tampilan. Catat hasil aktual, termasuk gagal atau belum diuji.

Jangan menyatakan aplikasi selesai berdasarkan kode yang baru ditulis, spesifikasi, atau naskah video. Build berhasil tidak membuktikan seluruh alur browser benar. Jika ada keterbatasan lingkungan, jelaskan pemeriksaan yang belum dapat dilakukan.

Serahkan hasil sesuai ruang lingkup tugas:

| Hasil | Isi |
| --- | --- |
| Proyek React + Vite | Kode yang dapat dijalankan, konfigurasi, dependensi, dan aset yang diperlukan. |
| `README.md` | Prasyarat, instalasi, menjalankan web, build, cara membuka demo, dan keterbatasan data lokal. |
| `docs/SUMBER_KONTEN.md` | Rujukan materi/soal/video, bagian yang dipakai, atribusi, serta status verifikasi media. |
| `docs/HASIL_PENGUJIAN.md` | Perintah/skenario yang dijalankan, hasil aktual AC/KIM, perangkat/lebar layar yang diperiksa, dan masalah tersisa. |
| `docs/PANDUAN_DEMO.md` | Urutan presentasi alur siswa–guru, pembukaan modul tanpa ambang nilai, dan unduhan ketiga laporan. |
| `docs/PANDUAN_EDIT_KONTEN.md` | Lokasi konten serta contoh mengganti materi, opsi, kunci, pembahasan, sumber, dan transkrip. |

Jika tugas hanya meminta dokumen atau bagian tertentu, serahkan bagian tersebut dan jangan mengklaim fitur aplikasi sudah dibangun.

## 12. Checklist akhir yang dapat diperiksa

Gunakan jawaban **Ya / Tidak / Belum diuji**; lampirkan bukti singkat untuk hasil pengujian.

- [ ] Apakah lima aturan pada bagian 2 dipenuhi?
- [ ] Apakah empat kelompok fitur wajib tersedia sesuai ruang lingkup tugas?
- [ ] Apakah setiap modul mempunyai sembilan item dan video/transkrip dihitung satu kali?
- [ ] Apakah satu run simulasi valid yang tersimpan cukup tanpa catatan wajib?
- [ ] Apakah nilai 0 dapat membuka modul jika semua item lengkap, sedangkan nilai 100 tetap menunggu aktivitas yang belum selesai?
- [ ] Apakah pembahasan tampil setelah setiap jawaban dan percobaan ulang mempertahankan progres?
- [ ] Apakah data setiap profil terpisah, pulih setelah muat ulang, dan terlihat benar pada mode guru?
- [ ] Apakah guru dapat mengelola kelas dan mengunduh ketiga laporan sesuai kelas terpilih?
- [ ] Apakah ekspor membedakan belum dijawab, salah, nilai kosong, dan nilai 0?
- [ ] Apakah perhitungan, notasi, tampilan HP/laptop, dan keyboard telah diperiksa?
- [ ] Apakah hasil AC01–AC22 serta KIM01–KIM06 dicatat sesuai pengujian yang benar-benar dilakukan?
- [ ] Apakah petunjuk, sumber, status video, serta pekerjaan tersisa dijelaskan dengan jujur?
