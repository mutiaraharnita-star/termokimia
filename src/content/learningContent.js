// Konten pembelajaran TermoKimia XI, diselaraskan dengan PRD versi 2.0.
// Kunci dan ID soal dibekukan bersama versi konten selama demonstrasi.

export const modules = [
  {
    "id": "M1",
    "number": 1,
    "title": "Konsep Dasar Termokimia",
    "description": "Hubungkan peristiwa sehari-hari dengan sistem, arah kalor, tanda ΔH, dan diagram entalpi.",
    "topics": [
      "Suhu, kalor, sistem, dan lingkungan.",
      "Eksoterm, endoterm, dan perubahan entalpi.",
      "Tanda ΔH dan diagram entalpi relatif."
    ],
    "objectives": [
      "Menentukan sistem dan lingkungan pada satu kasus yang batas sistemnya dinyatakan.",
      "Menentukan arah perpindahan kalor dan menghubungkannya dengan eksoterm, endoterm, serta tanda ΔH.",
      "Menghitung selisih dua tingkat entalpi relatif dan menjelaskan makna hasilnya dalam kalimat."
    ],
    "items": [
      {
        "id": "M1-MAT01",
        "type": "material",
        "title": "Suhu, kalor, sistem, dan lingkungan",
        "paragraphs": [
          "Termokimia mempelajari perubahan energi yang menyertai proses kimia maupun perubahan fisika. Langkah pertama adalah menetapkan sistem: bagian yang sedang kita pelajari. Segala sesuatu di luar batas sistem disebut lingkungan. Batas ini perlu dinyatakan sebelum kita menentukan arah dan tanda kalor.",
          "Kalor adalah energi yang berpindah karena perbedaan suhu. Suhu menunjukkan keadaan panas atau dingin dan dibaca menggunakan termometer. Kalor dan suhu mempunyai arti serta satuan berbeda: kalor dinyatakan dalam joule atau kilojoule, sedangkan suhu dapat dinyatakan dalam derajat Celsius.",
          "Pada contoh kompor, sistem dapat ditetapkan sebagai zat-zat yang mengalami reaksi pembakaran. Panci, air, dan udara di sekitarnya menjadi lingkungan. Kalor berpindah dari sistem reaksi menuju lingkungan, sehingga air dapat bertambah panas.",
          "Saat membaca kata “menerima” atau “melepaskan”, selalu tanyakan bagian mana yang dibahas. Kalor yang diterima air tidak berarti bahwa sistem reaksi juga menerima kalor."
        ],
        "formula": "1 kJ = 1.000 J",
        "callout": "Mulai dari batas sistem. Tanda kalor baru bermakna setelah bagian yang sedang dibahas jelas."
      },
      {
        "id": "M1-MAT02",
        "type": "material",
        "title": "Eksoterm, endoterm, dan perubahan entalpi",
        "paragraphs": [
          "Entalpi, H, adalah besaran keadaan sistem yang didefinisikan sebagai H = U + pV. U menyatakan energi dalam, p tekanan, dan V volume. Dalam modul ini kita memusatkan perhatian pada perubahan entalpi, ΔH, antara keadaan awal dan akhir.",
          "Pada tekanan tetap dengan hanya kerja ekspansi atau kompresi, perubahan entalpi sama dengan kalor yang diterima sistem. Kalor yang masuk ke sistem bertanda positif; kalor yang keluar dari sistem bertanda negatif.",
          "Proses eksoterm melepaskan kalor ke lingkungan sehingga ΔH negatif. Proses endoterm menyerap kalor dari lingkungan sehingga ΔH positif. Oleh karena itu, air yang memanas di sekitar reaksi dapat menjadi petunjuk bahwa reaksi melepaskan kalor.",
          "Kalor adalah energi yang berpindah, sehingga entalpi tidak disebut “kalor yang tersimpan”. Perubahan entalpi juga harus dikaitkan dengan jumlah zat, fase, dan kondisi proses yang dinyatakan."
        ],
        "formula": "qₚ = ΔH  •  tekanan tetap; hanya kerja ekspansi atau kompresi",
        "callout": "Eksoterm: kalor keluar, ΔH < 0. Endoterm: kalor masuk, ΔH > 0. Tanda selalu merujuk pada sistem."
      },
      {
        "id": "M1-MAT03",
        "type": "material",
        "title": "Tanda ΔH dan diagram entalpi relatif",
        "paragraphs": [
          "Diagram entalpi membandingkan tingkat entalpi reaktan dengan produk pada basis jumlah reaksi yang sama. Reaktan merupakan keadaan awal; produk merupakan keadaan akhir. Sumbu vertikal diberi label entalpi relatif, sedangkan posisi horizontal menunjukkan kemajuan reaksi.",
          "Perubahan entalpi diperoleh dengan mengurangi entalpi produk dengan entalpi reaktan. Produk yang lebih rendah menghasilkan ΔH negatif. Produk yang lebih tinggi menghasilkan ΔH positif.",
          "Sebagai contoh, entalpi relatif reaktan 80 kJ dan produk 30 kJ memberikan ΔH = 30 − 80 = −50 kJ. Kita juga boleh memilih reaktan 0 kJ dan produk −50 kJ: selisihnya tetap −50 kJ.",
          "Membalik proses menukar keadaan awal dan akhir, sehingga tanda ΔH berubah. Tinggi pada diagram ini tidak langsung menyatakan suhu, waktu, atau kecepatan reaksi. Jika kedua tingkat sama, ΔH = 0 dan tidak ada perubahan entalpi bersih pada model."
        ],
        "formula": "ΔH = H produk − H reaktan",
        "callout": "Baca selisih tingkat entalpi, bukan jumlah keduanya. Pada basis yang sama, −50 kJ menjadi +50 kJ ketika proses dibalik."
      },
      {
        "id": "M1-EX01",
        "type": "example",
        "title": "Membaca selisih entalpi",
        "prompt": "pada diagram suatu reaksi model, entalpi relatif reaktan adalah 80 kJ dan produk 30 kJ untuk basis jumlah reaksi yang sama. Tentukan ΔH dan klasifikasi proses. Data merupakan ilustrasi model.",
        "steps": [
          "Tuliskan hubungan: ΔH = H produk − H reaktan.",
          "Masukkan data: ΔH = 30 − 80 = −50 kJ.",
          "Tafsirkan tanda: produk berada pada tingkat entalpi yang lebih rendah; proses bersifat eksoterm.",
          "Pada tekanan tetap dan hanya kerja ekspansi atau kompresi, sistem melepaskan 50 kJ kalor untuk jumlah reaksi yang ditetapkan."
        ],
        "conclusion": "ΔH = −50 kJ; eksoterm. Besar kalor yang dilepas adalah 50 kJ, sedangkan tanda kalor sistem adalah negatif."
      },
      {
        "id": "M1-EX02",
        "type": "example",
        "title": "Dari arah kalor ke diagram",
        "prompt": "suatu proses model menyerap 35 kJ kalor pada tekanan tetap dengan hanya kerja ekspansi atau kompresi. Entalpi relatif reaktan dipilih 0 kJ. Tentukan ΔH, posisi produk, dan ΔH untuk proses sebaliknya pada basis yang sama. Data merupakan ilustrasi model.",
        "steps": [
          "Kalor masuk ke sistem, sehingga q sistem = +35 kJ.",
          "Dengan kondisi yang dinyatakan, ΔH = q sistem = +35 kJ.",
          "H produk = H reaktan + ΔH = 0 + 35 = 35 kJ.",
          "Produk berada 35 kJ di atas reaktan: proses endoterm.",
          "Ketika proses dibalik pada basis yang sama, ΔH menjadi −35 kJ."
        ],
        "conclusion": "proses maju mempunyai ΔH = +35 kJ; produk lebih tinggi; proses sebaliknya mempunyai ΔH = −35 kJ."
      },
      {
        "id": "M1-CASE01",
        "type": "case",
        "title": "Air dipanaskan dengan kompor",
        "scenario": "sebuah panci berisi air dipanaskan menggunakan kompor LPG. Untuk pembahasan ini, zat-zat yang mengalami reaksi pembakaran ditetapkan sebagai sistem. Panci, air, dan udara di sekitarnya termasuk lingkungan. Gunakan model tekanan tetap dengan hanya kerja ekspansi atau kompresi.",
        "prompts": [
          "ke arah mana kalor berpindah dari sistem, dan bagian lingkungan mana yang menerima kalor?",
          "apakah reaksi pembakaran dalam kasus ini eksoterm atau endoterm? Bagaimana tanda ΔH sistem?"
        ],
        "sampleAnswers": [
          "kalor berpindah dari sistem reaksi pembakaran menuju lingkungan. Sebagiannya diterima panci dan air, sedangkan sebagian lain berpindah ke udara sekitar.",
          "reaksi bersifat eksoterm karena sistem melepaskan kalor. ΔH sistem bernilai negatif. Air dapat bertambah panas karena menerima kalor, meskipun ΔH sistem reaksi bernilai negatif."
        ]
      },
      {
        "id": "M1-SIM01",
        "type": "simulation",
        "title": "Peta entalpi dan arah kalor",
        "simulationType": "enthalpy",
        "description": "Ubah tingkat entalpi relatif produk, lalu amati tanda ΔH dan arah kalor. Model berlangsung pada tekanan tetap dengan hanya kerja ekspansi atau kompresi. Satu kali menjalankan input valid dan menyimpan hasil menyelesaikan aktivitas; catatan pengamatan opsional."
      },
      {
        "id": "M1-VID01",
        "type": "video",
        "title": "Ke mana kalor berpindah?",
        "videoSrc": "/videos/m1.mp4",
        "poster": "/videos/m1-poster.jpg",
        "transcript": [
          "Ke mana kalor berpindah?",
          "Video penjelasan teks tanpa suara. Teks berikut memuat penjelasan dan diagram dalam video.",
          "Tetapkan sistem terlebih dahulu",
          "Pada kompor, sistem adalah zat-zat yang mengalami reaksi pembakaran.",
          "Panci, air, dan udara di sekitarnya merupakan lingkungan.",
          "Ikuti arah perpindahan kalor",
          "Kalor adalah energi yang berpindah karena perbedaan suhu.",
          "Dalam contoh pembakaran, sistem melepaskan kalor. Lingkungan menerima kalor; air menghangat.",
          "Hubungkan kalor dengan entalpi",
          "Pada tekanan tetap, dengan hanya kerja ekspansi atau kompresi, qₚ = ΔH.",
          "qₚ dan ΔH bertanda positif ketika sistem menerima kalor, serta negatif ketika sistem melepaskan kalor.",
          "Tanda mengikuti sistem",
          "Eksoterm: kalor keluar dari sistem; ΔH < 0.",
          "Endoterm: kalor masuk ke sistem; ΔH > 0.",
          "Hitung produk dikurangi reaktan",
          "Model ilustrasi pada basis jumlah reaksi yang sama: H reaktan = 80 kJ; H produk = 30 kJ.",
          "ΔH = H produk − H reaktan = 30 − 80 = −50 kJ. Produk lebih rendah; proses eksoterm.",
          "Balik arah, balik tanda ΔH",
          "Pada reaksi balik, keadaan awal dan akhir bertukar.",
          "ΔH balik = 80 − 30 = +50 kJ. Produk lebih tinggi; proses endoterm.",
          "Baca sumbu diagram dengan tepat",
          "Sumbu vertikal menunjukkan entalpi relatif. Sumbu horizontal menunjukkan kemajuan reaksi.",
          "Diagram ini tidak langsung menunjukkan suhu, waktu, atau laju reaksi.",
          "Gunakan empat langkah ini",
          "Tentukan sistem → ikuti arah kalor → baca tanda ΔH → periksa posisi produk.",
          "Selalu gunakan ΔH = H produk − H reaktan."
        ]
      },
      {
        "id": "M1-QUIZ01",
        "type": "quiz",
        "title": "Kuis konsep Modul 1"
      }
    ],
    "questions": [
      {
        "id": "M1-Q01",
        "prompt": "Pada kasus kompor, sistem ditetapkan sebagai zat-zat yang mengalami reaksi pembakaran. Panci dan air yang dipanaskan merupakan ....",
        "options": [
          "reaktan yang berubah menjadi bahan bakar",
          "bagian lingkungan yang menerima kalor",
          "produk langsung dari reaksi pembakaran",
          "batas sistem yang tidak dapat menerima energi"
        ],
        "answerIndex": 1,
        "explanation": "dengan batas sistem yang dinyatakan, panci dan air berada di luar sistem reaksi. Keduanya dapat menerima kalor dari sistem."
      },
      {
        "id": "M1-Q02",
        "prompt": "Suatu proses bersifat eksoterm pada tekanan tetap dengan hanya kerja ekspansi atau kompresi. Pernyataan yang sesuai adalah ....",
        "options": [
          "kalor masuk ke sistem dan ΔH positif",
          "kalor masuk ke sistem dan ΔH negatif",
          "kalor keluar dari sistem dan ΔH negatif",
          "kalor keluar dari sistem dan ΔH positif"
        ],
        "answerIndex": 2,
        "explanation": "proses eksoterm melepaskan kalor dari sistem ke lingkungan. Dengan kondisi yang dinyatakan, q sistem = ΔH sehingga keduanya bertanda negatif."
      },
      {
        "id": "M1-Q03",
        "prompt": "Sebuah diagram menunjukkan entalpi relatif reaktan 80 kJ dan produk 30 kJ pada basis yang sama. Kesimpulan yang tepat adalah ....",
        "options": [
          "ΔH = −50 kJ; produk mempunyai entalpi lebih rendah",
          "ΔH = +50 kJ; produk mempunyai entalpi lebih tinggi",
          "ΔH = −50 kJ; suhu produk pasti 50 °C lebih rendah",
          "ΔH = +110 kJ; nilai kedua tingkat entalpi harus dijumlahkan"
        ],
        "answerIndex": 0,
        "explanation": "ΔH dihitung sebagai 30 − 80 = −50 kJ. Diagram membandingkan entalpi; selisih tersebut tidak langsung menyatakan selisih suhu."
      },
      {
        "id": "M1-Q04",
        "prompt": "Pernyataan yang paling tepat tentang kalor adalah ....",
        "options": [
          "kalor adalah angka yang terbaca langsung pada termometer",
          "kalor adalah nama lain untuk entalpi yang tersimpan dalam zat",
          "kalor hanya dapat berpindah ketika terjadi reaksi kimia",
          "kalor adalah energi yang berpindah karena perbedaan suhu"
        ],
        "answerIndex": 3,
        "explanation": "kalor merupakan perpindahan energi karena perbedaan suhu. Perpindahan kalor juga dapat berlangsung tanpa reaksi kimia, misalnya ketika air panas mendingin."
      },
      {
        "id": "M1-Q05",
        "prompt": "Suatu reaksi model mempunyai ΔH = −75 kJ. Jika reaksi dibalik dengan jumlah zat dan kondisi awal–akhir yang bersesuaian, ΔH proses sebaliknya adalah ....",
        "options": [
          "−75 kJ",
          "+75 kJ",
          "0 kJ",
          "+150 kJ"
        ],
        "answerIndex": 1,
        "explanation": "pembalikan menukar keadaan awal dan akhir sehingga tanda ΔH berubah, sedangkan besarnya tetap. Jumlah zat pada soal tidak dikalikan dua."
      }
    ]
  },
  {
    "id": "M2",
    "number": 2,
    "title": "Kalorimetri",
    "description": "Gunakan perubahan suhu untuk memahami kalor larutan, kalor reaksi, dan perubahan entalpi per mol.",
    "topics": [
      "Massa, kalor jenis, dan perubahan suhu.",
      "Kalorimeter ideal dan neraca kalor.",
      "Kalor reaksi, satuan energi, dan entalpi per mol."
    ],
    "objectives": [
      "Menghitung kalor larutan dari massa, kalor jenis, dan perubahan suhu dengan satuan konsisten.",
      "Menentukan tanda kalor reaksi dari tanda kalor larutan pada kalorimeter ideal.",
      "Menjelaskan perubahan suhu ketika satu variabel model diubah serta menghitung entalpi molar pada basis reaksi 1:1 yang dinyatakan."
    ],
    "items": [
      {
        "id": "M2-MAT01",
        "type": "material",
        "title": "Massa, kalor jenis, dan perubahan suhu",
        "paragraphs": [
          "Kalorimetri menentukan kalor yang berpindah dengan mengukur perubahan suhu. Pada model tanpa perubahan fase dan dengan kalor jenis tetap, kalor larutan dihitung menggunakan q = mcΔT.",
          "m adalah massa seluruh larutan yang dimodelkan, bukan hanya massa zat terlarut. c adalah kalor jenis: energi yang diperlukan untuk menaikkan suhu satu gram zat sebesar satu derajat Celsius. Dalam simulasi ini c ditetapkan 4,18 J/(g·°C).",
          "Perubahan suhu, ΔT, adalah suhu akhir dikurangi suhu awal. Suhu yang naik dari 25 menjadi 30 °C memberi ΔT = +5 °C. Suhu yang turun memberi ΔT negatif; tanda ini ikut menentukan tanda kalor.",
          "Dengan kalor yang sama, massa lebih besar atau kalor jenis lebih besar menghasilkan perubahan suhu lebih kecil. Oleh sebab itu, dua percobaan tidak dapat dibandingkan hanya dari kenaikan suhu tanpa mengetahui massa dan kalor jenisnya."
        ],
        "formula": "q larutan = m × c × ΔT  •  ΔT = T akhir − T awal",
        "callout": "Gunakan massa larutan dan satuan yang konsisten. Jika m dalam g dan c dalam J/(g·°C), hasil q dinyatakan dalam J."
      },
      {
        "id": "M2-MAT02",
        "type": "material",
        "title": "Kalorimeter ideal dan neraca kalor",
        "paragraphs": [
          "Dalam model kalorimeter ideal, kalor wadah serta pertukaran kalor dengan lingkungan luar diabaikan. Larutan dianggap mempunyai kalor jenis tetap dan tidak mengalami perubahan fase.",
          "Kalor reaksi dan kalor larutan berjumlah nol dalam model tersebut. Artinya, kalor yang diterima larutan berasal dari reaksi, atau kalor yang diterima reaksi berasal dari larutan. Kedua besarnya sama, tetapi tandanya berlawanan.",
          "Jika larutan menghangat, q larutan positif. Maka q reaksi negatif dan reaksi bersifat eksoterm. Jika larutan mendingin, q larutan negatif, q reaksi positif, dan reaksi bersifat endoterm.",
          "Hubungan sederhana ini bergantung pada asumsi model. Jika wadah ikut menerima kalor secara berarti atau terdapat kehilangan kalor ke luar, bagian tersebut harus dimasukkan ke neraca energi."
        ],
        "formula": "q reaksi + q larutan = 0  →  q reaksi = −q larutan",
        "callout": "Termometer menunjukkan suhu larutan. Sebutkan “kalor larutan” atau “kalor reaksi” agar tanda tidak tertukar."
      },
      {
        "id": "M2-MAT03",
        "type": "material",
        "title": "Kalor reaksi dan entalpi per mol",
        "paragraphs": [
          "Pada tekanan tetap dengan hanya kerja ekspansi atau kompresi, kalor reaksi dapat digunakan untuk menentukan perubahan entalpi. Kalor untuk sejumlah reaksi tertentu berbeda dari nilai entalpi yang dinyatakan per mol.",
          "Pada model reaksi 1:1, n menyatakan jumlah mol reaksi yang berlangsung. Entalpi molar diperoleh dengan membagi kalor reaksi oleh n. Basis ini harus disebutkan agar kita mengetahui jumlah reaksi yang diwakili satu mol.",
          "Contohnya, q reaksi = −2,090 kJ untuk 0,050 mol reaksi memberi ΔH molar = −41,8 kJ/mol. Tanda negatif berarti setiap satu mol reaksi pada kondisi model melepaskan kalor sebesar 41,8 kJ.",
          "Samakan satuan sebelum berhitung: 2.090 J sama dengan 2,090 kJ. Saat memakai nilai molar untuk menghitung suhu akhir, ubah hasil q menjadi joule agar cocok dengan kalor jenis dalam J/(g·°C)."
        ],
        "formula": "ΔH molar = q reaksi ÷ n  •  q reaksi = n × ΔH molar",
        "callout": "Data ±41,8 kJ/mol pada simulasi adalah ilustrasi reaksi model 1:1, bukan hasil pengukuran suatu bahan tertentu."
      },
      {
        "id": "M2-EX01",
        "type": "example",
        "title": "Dari suhu ke entalpi molar",
        "prompt": "suatu reaksi model 1:1 sebanyak 0,050 mol berlangsung dalam kalorimeter ideal. Massa larutan 100 g, kalor jenis 4,18 J/(g·°C), dan suhu berubah dari 25 menjadi 30 °C. Tentukan kalor larutan, kalor reaksi, dan entalpi per mol reaksi. Data merupakan ilustrasi model.",
        "steps": [
          "ΔT = 30 − 25 = +5 °C.",
          "q larutan = mcΔT = 100 × 4,18 × 5 = +2090 J.",
          "q reaksi = −q larutan = −2090 J = −2,090 kJ.",
          "Untuk basis reaksi 1:1, ΔH molar = q reaksi/n = −2,090/0,050 = −41,8 kJ/mol.",
          "Larutan menghangat karena menerima kalor; reaksi model bersifat eksoterm."
        ],
        "conclusion": "q larutan = +2090 J, q reaksi = −2090 J, dan ΔH molar = −41,8 kJ/mol reaksi model."
      },
      {
        "id": "M2-EX02",
        "type": "example",
        "title": "Memprediksi suhu akhir proses endoterm",
        "prompt": "reaksi model 1:1 mempunyai ΔH molar = +41,8 kJ/mol. Sebanyak 0,050 mol reaksi berlangsung dalam kalorimeter ideal dengan massa larutan 200 g, c = 4,18 J/(g·°C), dan suhu awal 25 °C. Tentukan suhu akhir larutan. Data merupakan ilustrasi model.",
        "steps": [
          "q reaksi = n × ΔH molar = 0,050 × 41,8 = +2,090 kJ = +2090 J.",
          "q larutan = −q reaksi = −2090 J.",
          "ΔT = q larutan/(mc) = −2090/(200 × 4,18) = −2,5 °C.",
          "T akhir = T awal + ΔT = 25 − 2,5 = 22,5 °C.",
          "Reaksi menyerap kalor dan larutan kehilangan kalor, sehingga suhu larutan turun."
        ],
        "conclusion": "suhu akhir 22,5 °C. Jika massa larutan 100 g dengan input lain tetap, suhu akhirnya 20 °C."
      },
      {
        "id": "M2-CASE01",
        "type": "case",
        "title": "Minuman dengan pemanas mandiri",
        "scenario": "sebuah model kemasan minuman mempunyai bagian pemanas yang bekerja melalui proses kimia. Setelah pemanas diaktifkan, suhu cairan meningkat. Untuk pembahasan, seluruh kalor dari proses pemanas dianggap berpindah ke cairan; kalor kemasan dan kalor yang keluar ke udara diabaikan.",
        "prompts": [
          "apakah cairan menerima atau melepaskan kalor? Bagaimana tanda kalor proses pemanas dibandingkan dengan kalor cairan?",
          "jika jumlah kalor dari pemanas tetap, tetapi massa cairan dibuat dua kali semula dengan kalor jenis dan suhu awal sama, bagaimana kenaikan suhunya?"
        ],
        "sampleAnswers": [
          "cairan menerima kalor sehingga q cairan positif. Proses pemanas melepaskan kalor sehingga q proses negatif. Dalam model ideal tersebut, kedua kalor sama besar dan berlawanan tanda.",
          "kenaikan suhu menjadi setengah semula, karena ΔT = q/(mc). Kalor yang sama dibagikan pada massa cairan yang lebih besar."
        ]
      },
      {
        "id": "M2-SIM01",
        "type": "simulation",
        "title": "Kalorimeter ideal",
        "simulationType": "calorimetry",
        "description": "Pilih reaksi model eksoterm atau endoterm, lalu ubah massa larutan, suhu awal, dan jumlah reaksi. Kalor wadah serta kehilangan kalor diabaikan; kalor jenis tetap dan tidak ada perubahan fase. Satu run valid yang tersimpan cukup; catatan pengamatan opsional."
      },
      {
        "id": "M2-VID01",
        "type": "video",
        "title": "Larutan hangat, reaksi bertanda apa?",
        "videoSrc": "/videos/m2.mp4",
        "poster": "/videos/m2-poster.jpg",
        "transcript": [
          "Larutan hangat, reaksi bertanda apa?",
          "Video penjelasan teks tanpa suara. Teks berikut memuat penjelasan dan diagram dalam video.",
          "Mulai dari model kalorimeter",
          "Model ilustrasi: kalor wadah dan kehilangan kalor ke luar diabaikan; kalor jenis tetap, tanpa perubahan fase.",
          "Tekanan tetap; hanya kerja ekspansi atau kompresi. Massa yang dipakai ialah massa larutan.",
          "Hitung perubahan suhu",
          "Massa larutan 100 g. Suhu awal 25 °C dan suhu akhir 30 °C.",
          "ΔT = T akhir − T awal = 30 − 25 = +5 °C.",
          "Larutan menerima kalor",
          "Gunakan kalor jenis model c = 4,18 J/(g·°C).",
          "q larutan = mcΔT = 100 × 4,18 × 5 = +2.090 J.",
          "Tanda positif berarti larutan menerima kalor.",
          "Reaksi melepaskan kalor",
          "Pada model ideal, q reaksi + q larutan = 0.",
          "q reaksi = −q larutan = −2.090 J. Reaksi bersifat eksoterm; larutan menghangat.",
          "Ubah joule menjadi kilojoule",
          "1 kJ = 1.000 J. Untuk mengubah J menjadi kJ, bagi dengan 1.000.",
          "q reaksi = −2.090 J = −2,090 kJ. Tanda negatif tetap dipertahankan.",
          "Nyatakan basis per mol",
          "Untuk jumlah reaksi model 1:1 sebanyak n = 0,050 mol:",
          "ΔH molar = q reaksi / n = −2,090 / 0,050 = −41,8 kJ/mol reaksi.",
          "Nilai per mol berbeda dari kalor total pada percobaan.",
          "Kalor sama, massa berbeda",
          "Jika kalor tetap +2.090 J dan massa larutan menjadi 200 g, kenaikan suhu menjadi setengah.",
          "ΔT = 2.090 / (200 × 4,18) = +2,5 °C. Dari 25 °C, suhu akhir menjadi 27,5 °C.",
          "Periksa tiga hal sebelum selesai",
          "Bagian mana: larutan atau reaksi? Tanda mana: menerima atau melepas? Satuan mana: J, kJ, atau kJ/mol?",
          "Perubahan suhu saja belum cukup; massa dan kalor jenis juga berperan."
        ]
      },
      {
        "id": "M2-QUIZ01",
        "type": "quiz",
        "title": "Kuis konsep Modul 2"
      }
    ],
    "questions": [
      {
        "id": "M2-Q01",
        "prompt": "Dalam kalorimeter ideal, 100 g larutan dengan c = 4,18 J/(g·°C) mengalami kenaikan suhu 5 °C. Kalor larutan adalah +2090 J. Kesimpulan yang tepat untuk reaksi adalah ....",
        "options": [
          "reaksi menyerap +2090 J karena larutan menghangat",
          "reaksi melepaskan kalor, sehingga q reaksi = −2090 J",
          "kalor reaksi nol karena energi total harus tetap",
          "q reaksi = +5 J karena kenaikan suhu sebesar 5 °C"
        ],
        "answerIndex": 1,
        "explanation": "larutan menerima +2090 J. Dengan kalor wadah dan pertukaran ke luar diabaikan, kalor reaksi sama besar tetapi berlawanan tanda: −2090 J."
      },
      {
        "id": "M2-Q02",
        "prompt": "Dalam model, jumlah kalor yang diterima larutan dan kalor jenisnya tetap. Jika massa larutan dilipatgandakan, kenaikan suhunya menjadi ....",
        "options": [
          "dua kali semula",
          "empat kali semula",
          "tetap sama",
          "setengah semula"
        ],
        "answerIndex": 3,
        "explanation": "ΔT = q/(mc). Jika q dan c tetap, massa dua kali lebih besar menghasilkan perubahan suhu setengahnya."
      },
      {
        "id": "M2-Q03",
        "prompt": "Hubungan q reaksi = −q larutan digunakan pada model sederhana jika ....",
        "options": [
          "kalor wadah dan pertukaran kalor dengan lingkungan luar diabaikan",
          "massa larutan diabaikan dalam perhitungan",
          "semua reaksi selalu membuat suhu larutan meningkat",
          "kalor jenis larutan ditetapkan sama dengan nol"
        ],
        "answerIndex": 0,
        "explanation": "hubungan tersebut berasal dari neraca kalor reaksi dan larutan pada model ideal. Jika wadah ikut menerima kalor secara berarti, kalor wadah harus dimasukkan ke neraca."
      },
      {
        "id": "M2-Q04",
        "prompt": "Suhu larutan turun selama suatu reaksi dalam kalorimeter ideal. Pernyataan yang sesuai adalah ....",
        "options": [
          "q larutan positif dan reaksi eksoterm",
          "q larutan negatif dan reaksi eksoterm",
          "q larutan negatif dan reaksi endoterm",
          "q larutan positif dan reaksi endoterm"
        ],
        "answerIndex": 2,
        "explanation": "penurunan suhu memberi ΔT negatif sehingga q larutan negatif. Karena q reaksi = −q larutan, reaksi menyerap kalor dan bersifat endoterm."
      },
      {
        "id": "M2-Q05",
        "prompt": "Pada kondisi model yang ditetapkan, ΔH molar suatu reaksi 1:1 adalah −41,8 kJ/mol reaksi. Artinya ....",
        "options": [
          "suhu larutan selalu turun sebesar 41,8 °C",
          "setiap 1 mol reaksi yang berlangsung melepaskan kalor sebesar 41,8 kJ",
          "setiap 1 gram larutan melepaskan kalor sebesar 41,8 kJ",
          "setiap 1 mol reaksi yang berlangsung menyerap kalor sebesar 41,8 kJ"
        ],
        "answerIndex": 1,
        "explanation": "tanda negatif menunjukkan pelepasan kalor dari sistem pada tekanan tetap dengan hanya kerja ekspansi atau kompresi. Satuan “per mol reaksi” menyatakan basis jumlah reaksi, bukan massa larutan atau perubahan suhu."
      }
    ]
  },
  {
    "id": "M3",
    "number": 3,
    "title": "Penentuan ΔH Reaksi",
    "description": "Tentukan ΔH menggunakan Hukum Hess, entalpi pembentukan, dan estimasi energi ikatan.",
    "topics": [
      "Hukum Hess, pembalikan, dan perkalian persamaan.",
      "Entalpi pembentukan standar.",
      "Energi ikatan dan batas pendekatan."
    ],
    "objectives": [
      "Menjumlahkan, membalik, dan mengalikan persamaan termokimia beserta perubahan entalpinya.",
      "Menghitung ΔH dari data entalpi pembentukan dengan mempertimbangkan koefisien dan fase zat.",
      "Menjelaskan perbedaan antara hasil berbasis data entalpi pembentukan dan estimasi menggunakan energi ikatan fase gas."
    ],
    "items": [
      {
        "id": "M3-MAT01",
        "type": "material",
        "title": "Hukum Hess dan operasi persamaan",
        "paragraphs": [
          "Entalpi merupakan fungsi keadaan: nilainya ditentukan oleh keadaan sistem. Karena itu, perubahan entalpi total antara keadaan awal dan akhir yang sama tidak bergantung pada jalur reaksi yang dipilih.",
          "Hukum Hess memungkinkan kita menjumlahkan beberapa persamaan termokimia untuk memperoleh reaksi target. Jumlah perubahan entalpi tahap-tahap tersebut menjadi perubahan entalpi reaksi total. Persamaan, fase zat, dan kondisi data harus sesuai.",
          "Jika persamaan dibalik, tanda ΔH berubah. Jika seluruh koefisien dikalikan suatu faktor, ΔH dikalikan faktor yang sama. Spesies hanya dapat dieliminasi ketika identitas, fase, dan jumlahnya sesuai pada kedua sisi.",
          "Pada dataset simulasi, C(s, grafit) + ½O₂(g) → CO(g) mempunyai ΔH = −111 kJ. Reaksi CO(g) + ½O₂(g) → CO₂(g) mempunyai ΔH = −283 kJ. Setelah CO dieliminasi, reaksi total membentuk CO₂ dengan ΔH = −394 kJ."
        ],
        "formula": "ΔH total = jumlah ΔH tahapan yang menghasilkan reaksi target",
        "callout": "Perkalian dua reaksi maju memberi −788 kJ; pembalikan reaksi total memberi +394 kJ. Mengubah persamaan berarti mengubah ΔH secara konsisten."
      },
      {
        "id": "M3-MAT02",
        "type": "material",
        "title": "Entalpi pembentukan standar",
        "paragraphs": [
          "Entalpi pembentukan standar adalah perubahan entalpi ketika satu mol zat terbentuk dari unsur-unsurnya dalam keadaan acuan standar. Nilai ini tersedia dalam tabel beserta identitas dan fase zat.",
          "Untuk menghitung perubahan entalpi reaksi, kalikan setiap data pembentukan produk dengan koefisiennya lalu jumlahkan. Lakukan hal yang sama untuk reaktan. Kurangi jumlah reaktan dari jumlah produk.",
          "Unsur dalam keadaan acuan standarnya mempunyai entalpi pembentukan standar nol menurut definisi. Pada contoh H₂(g) + Cl₂(g) → 2HCl(g), data H₂ dan Cl₂ adalah nol, sedangkan HCl(g) −92,3 kJ/mol. Koefisien 2 menghasilkan −184,6 kJ untuk persamaan yang ditulis.",
          "Keadaan zat harus cocok dengan tabel. H₂O(l) dan H₂O(g), misalnya, bukan entri data yang dapat saling ditukar. Tanda nol pada data pembentukan unsur juga tidak berarti bahwa entalpi mutlak unsur tersebut nol."
        ],
        "formula": "ΔH reaksi = jumlah data pembentukan produk − jumlah data pembentukan reaktan, masing-masing sesuai koefisien",
        "callout": "Periksa empat hal sebelum memakai tabel: zat, fase, koefisien, dan kondisi referensi."
      },
      {
        "id": "M3-MAT03",
        "type": "material",
        "title": "Energi ikatan dan batas estimasi",
        "paragraphs": [
          "Energi ikatan menyatakan energi yang diperlukan untuk memutus ikatan dalam spesies fase gas. Pemutusan ikatan memerlukan energi; pembentukan ikatan melepaskan energi.",
          "Untuk memperkirakan ΔH, hitung seluruh ikatan yang diputus pada reaktan dan seluruh ikatan yang terbentuk pada produk sesuai koefisien persamaan. Kurangi energi yang dilepaskan saat pembentukan dari energi yang diperlukan untuk pemutusan.",
          "Pada H₂(g) + Cl₂(g) → 2HCl(g), data 436 kJ/mol ikatan untuk H–H dan 243 untuk Cl–Cl memberi energi pemutusan 679 kJ. Pembentukan dua mol ikatan H–Cl, masing-masing 432 kJ/mol, melepaskan 864 kJ. Selisihnya adalah −185 kJ.",
          "Hasil menggunakan data energi ikatan rata-rata dinyatakan sebagai estimasi. Pendekatan ini menggunakan spesies fase gas dan tidak langsung memberi nilai pasti untuk semua fase atau kondisi zat."
        ],
        "formula": "ΔH ≈ energi pemutusan ikatan − besar energi yang dilepas saat pembentukan ikatan",
        "callout": "Pada contoh, ΔH ≈ −185 kJ. Tanda negatif menunjukkan energi yang dilepas saat pembentukan lebih besar daripada energi pemutusan."
      },
      {
        "id": "M3-EX01",
        "type": "example",
        "title": "Menggunakan entalpi pembentukan",
        "prompt": "Tentukan ΔH untuk H₂(g) + Cl₂(g) → 2HCl(g). Gunakan data entalpi pembentukan standar H₂(g) = 0, Cl₂(g) = 0, dan HCl(g) = −92,3 kJ/mol pada kondisi referensi yang sama.",
        "steps": [
          "Gunakan jumlah entalpi pembentukan produk dikurangi jumlah entalpi pembentukan reaktan.",
          "Produk: 2 × (−92,3) = −184,6 kJ untuk jumlah produk pada persamaan.",
          "Reaktan: 1 × 0 + 1 × 0 = 0 kJ.",
          "ΔH = −184,6 − 0 = −184,6 kJ.",
          "Tanda negatif menunjukkan proses eksoterm untuk pembentukan 2 mol HCl sesuai persamaan."
        ],
        "conclusion": "ΔH = −184,6 kJ untuk persamaan sebagaimana ditulis. Nilai −92,3 kJ/mol adalah entalpi pembentukan per mol HCl."
      },
      {
        "id": "M3-EX02",
        "type": "example",
        "title": "Menggunakan energi ikatan",
        "prompt": "Perkirakan ΔH untuk reaksi fase gas H₂(g) + Cl₂(g) → 2HCl(g). Gunakan energi ikatan H–H = 436, Cl–Cl = 243, dan H–Cl = 432 kJ/mol ikatan.",
        "steps": [
          "Ikatan yang diputus: 1 mol H–H dan 1 mol Cl–Cl.",
          "Energi pemutusan = 436 + 243 = 679 kJ.",
          "Ikatan yang terbentuk: 2 mol H–Cl.",
          "Besar energi yang dilepas saat pembentukan = 2 × 432 = 864 kJ; kontribusinya pada perubahan entalpi bertanda negatif.",
          "ΔH ≈ energi pemutusan − energi pembentukan = 679 − 864 = −185 kJ."
        ],
        "conclusion": "ΔH ≈ −185 kJ untuk persamaan tersebut; eksoterm. Hasil ini merupakan estimasi berbasis tabel yang digunakan, sedangkan contoh sebelumnya memakai data entalpi pembentukan."
      },
      {
        "id": "M3-CASE01",
        "type": "case",
        "title": "Menaksir energi bahan bakar kompor",
        "scenario": "siswa ingin menaksir perubahan entalpi pembakaran bahan bakar kompor melalui perhitungan. Tersedia persamaan reaksi dan tabel entalpi pembentukan, tetapi belum ada hasil pengukuran pada kompor.",
        "prompts": [
          "informasi apa yang harus diperiksa sebelum data tabel digunakan?",
          "apakah seluruh besar kalor reaksi hasil perhitungan pasti diterima air di panci? Jelaskan."
        ],
        "sampleAnswers": [
          "persamaan harus setara; koefisien, identitas zat, fase, dan kondisi data harus sesuai. Jumlah bahan bakar yang dibandingkan juga harus ditentukan, misalnya per mol atau untuk massa tertentu.",
          "belum tentu. Perhitungan perubahan entalpi menyatakan energi reaksi pada kondisi yang ditentukan; kalor yang diterima air juga dipengaruhi pemanasan panci dan perpindahan kalor ke lingkungan lain."
        ]
      },
      {
        "id": "M3-SIM01",
        "type": "simulation",
        "title": "Penyusun Hukum Hess",
        "simulationType": "hess",
        "description": "Susun kartu reaksi dengan pembalikan dan faktor ½, 1, atau 2. Perhatikan perubahan koefisien, spesies yang dieliminasi, dan ΔH total. Satu perhitungan valid yang tersimpan menyelesaikan aktivitas, termasuk ketika hasil belum sesuai target; catatan pengamatan opsional."
      },
      {
        "id": "M3-VID01",
        "type": "video",
        "title": "Tiga cara menggunakan data ΔH",
        "videoSrc": "/videos/m3.mp4",
        "poster": "/videos/m3-poster.jpg",
        "transcript": [
          "Tiga cara menggunakan data ΔH",
          "Video penjelasan teks tanpa suara. Teks berikut memuat penjelasan dan diagram dalam video.",
          "Pilih metode menurut datanya",
          "Hukum Hess: data beberapa reaksi. Entalpi pembentukan: data ΔH°f tiap zat. Energi ikatan: data energi ikatan rata-rata.",
          "Semua perhitungan harus mengikuti persamaan reaksi yang ditulis.",
          "Hess: susun dua tahap reaksi",
          "C(grafit) + ½O₂(g) → CO(g); ΔH₁ = −111 kJ.",
          "CO(g) + ½O₂(g) → CO₂(g); ΔH₂ = −283 kJ.",
          "Data dibulatkan dan memakai kondisi yang konsisten.",
          "Jumlahkan reaksi dan ΔH",
          "CO(g) muncul pada dua sisi yang berlawanan, sehingga saling menghilangkan.",
          "C(grafit) + O₂(g) → CO₂(g); ΔH = −111 − 283 = −394 kJ.",
          "Entalpi adalah fungsi keadaan: perubahan total bergantung pada keadaan awal dan akhir.",
          "Ubah reaksi, sesuaikan ΔH",
          "Membalik reaksi maju memberi ΔH = +394 kJ.",
          "Mengalikan seluruh reaksi maju dengan 2 memberi ΔH = −788 kJ.",
          "Jika reaksi balik dikali 2, ΔH = +788 kJ.",
          "Gunakan entalpi pembentukan",
          "Reaksi: H₂(g) + Cl₂(g) → 2HCl(g). Data ΔH°f: H₂(g) = 0; Cl₂(g) = 0; HCl(g) = −92,3 kJ/mol.",
          "ΔH° reaksi = jumlah koefisien × ΔH°f produk − jumlah koefisien × ΔH°f reaktan.",
          "Hasil: 2 × (−92,3) − (0 + 0) = −184,6 kJ.",
          "Koefisien dan fase menentukan",
          "−92,3 kJ/mol ialah entalpi pembentukan per mol HCl(g).",
          "−184,6 kJ berlaku untuk persamaan yang menghasilkan 2 mol HCl(g). Pertahankan fase dan kondisi referensinya.",
          "Energi ikatan: putus dan bentuk",
          "Untuk H₂(g) + Cl₂(g) → 2HCl(g), putuskan satu H–H dan satu Cl–Cl, lalu bentuk dua H–Cl.",
          "Data dalam kJ/mol ikatan: H–H = 436; Cl–Cl = 243; H–Cl = 432.",
          "Pemutusan memerlukan energi; pembentukan melepaskan energi.",
          "Tuliskan hasil sebagai estimasi",
          "Energi pemutusan = 436 + 243 = 679 kJ. Besar energi pembentukan = 2 × 432 = 864 kJ.",
          "ΔH ≈ energi pemutusan − energi pembentukan = 679 − 864 = −185 kJ.",
          "Ini estimasi untuk persamaan tersebut, memakai energi ikatan rata-rata pada fase gas.",
          "Empat pemeriksaan terakhir",
          "Periksa persamaan, koefisien, fase, dan tanda.",
          "Hess menjumlahkan perubahan; data pembentukan memperhitungkan koefisien; energi ikatan menghasilkan estimasi."
        ]
      },
      {
        "id": "M3-QUIZ01",
        "type": "quiz",
        "title": "Kuis konsep Modul 3"
      }
    ],
    "questions": [
      {
        "id": "M3-Q01",
        "prompt": "Mengapa perubahan entalpi reaksi dapat dihitung melalui beberapa tahapan reaksi lain yang sesuai?",
        "options": [
          "semua tahapan reaksi berlangsung dengan kecepatan yang sama",
          "setiap jalur reaksi selalu mempunyai jumlah tahapan yang sama",
          "entalpi merupakan fungsi keadaan; perubahan total ditentukan keadaan awal dan akhir",
          "setiap reaksi kimia harus melepaskan kalor"
        ],
        "answerIndex": 2,
        "explanation": "perubahan entalpi antara keadaan awal dan akhir yang sama tidak bergantung pada jalur yang digunakan. Kesetaraan persamaan, fase, dan kondisi data tetap harus diperhatikan."
      },
      {
        "id": "M3-Q02",
        "prompt": "Persamaan C(s, grafit) + O₂(g) → CO₂(g) mempunyai ΔH = −394 kJ pada dataset. Jika persamaan dibalik, lalu seluruh koefisien dikalikan dua, perubahan entalpinya menjadi ....",
        "options": [
          "−788 kJ",
          "+788 kJ",
          "+394 kJ",
          "−394 kJ"
        ],
        "answerIndex": 1,
        "explanation": "pembalikan mengubah −394 menjadi +394 kJ. Perkalian seluruh koefisien dengan dua kemudian menghasilkan +788 kJ."
      },
      {
        "id": "M3-Q03",
        "prompt": "Entalpi pembentukan standar suatu zat mengacu pada ....",
        "options": [
          "pembentukan satu gram zat dari senyawa apa pun",
          "pembentukan zat pada suhu berapa pun tanpa memperhatikan fase",
          "pembentukan satu mol zat dari unsur-unsurnya dalam keadaan acuan standar",
          "pemutusan semua ikatan dalam satu mol zat cair"
        ],
        "answerIndex": 2,
        "explanation": "basisnya satu mol zat yang dibentuk dari unsur-unsur dalam keadaan acuannya. Fase zat dan keadaan referensi harus sesuai dengan tabel yang digunakan."
      },
      {
        "id": "M3-Q04",
        "prompt": "Data ΔH pembentukan standar HCl(g) adalah −92,3 kJ/mol, sedangkan H₂(g) dan Cl₂(g) bernilai nol pada keadaan acuannya. Mengapa ΔH untuk H₂(g) + Cl₂(g) → 2HCl(g) bernilai −184,6 kJ?",
        "options": [
          "karena setiap data ΔH harus selalu dikalikan dua",
          "karena penjumlahan dua reaktan membuat nilai ΔH positif",
          "karena persamaan membentuk 2 mol HCl, sehingga data per mol dikalikan dua",
          "karena H₂ dan Cl₂ masing-masing menyumbangkan −92,3 kJ"
        ],
        "answerIndex": 2,
        "explanation": "koefisien HCl adalah dua, sedangkan data pembentukannya dinyatakan per mol. Kontribusi reaktan pada perhitungan ini nol, sehingga hasilnya 2 × (−92,3) = −184,6 kJ."
      },
      {
        "id": "M3-Q05",
        "prompt": "Bagaimana hasil perhitungan ΔH menggunakan energi ikatan rata-rata sebaiknya dipahami?",
        "options": [
          "sebagai estimasi berbasis pemutusan dan pembentukan ikatan pada spesies fase gas",
          "sebagai nilai pasti yang sama untuk semua fase zat",
          "sebagai waktu yang diperlukan reaksi untuk selesai",
          "sebagai bukti bahwa pemutusan ikatan selalu melepaskan energi"
        ],
        "answerIndex": 0,
        "explanation": "energi ikatan rata-rata memberi pendekatan terhadap energi pemutusan ikatan pada fase gas. ΔH diperkirakan dari energi pemutusan dikurangi energi yang dilepas saat pembentukan; pemutusan ikatan memerlukan energi."
      }
    ]
  }
];

export function getModule(id) {
  return modules.find((module) => module.id === id);
}

export const sources = [
  {
    "id": "R1",
    "title": "Keputusan Kepala BSKAP Nomor 046/H/KR/2025 — Capaian Pembelajaran Kimia Fase F",
    "author": "Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP)",
    "url": "https://kurikulum.kemendikdasmen.go.id/file/1753929861_manage_file.pdf",
    "usage": "Pemetaan topik termokimia terhadap CP Kimia Fase F, bagian Kimia pada halaman PDF 169–172. Urutan tiga modul merupakan rancangan produk.",
    "status": "Rujukan resmi yang diperiksa pada penyusunan PRD, 20 Oktober 2026."
  },
  {
    "id": "R2",
    "title": "E-modul kimia kelas XI: termokimia (2018)",
    "author": "Rara, Sudiarto, dan Nestiyarum",
    "url": "https://repositori.kemendikdasmen.go.id/20655/",
    "usage": "Rujukan pendamping konsep termokimia dalam Bahasa Indonesia untuk M1–M2.",
    "status": "Tercatat dalam PRD; terbit sebelum Kurikulum Merdeka dan dipakai sebagai referensi konsep."
  },
  {
    "id": "R3",
    "title": "Modul pembelajaran SMA kimia kelas XI: jenis-jenis dan penentuan entalpi reaksi (2020)",
    "author": "Sriyanto",
    "url": "https://repositori.kemendikdasmen.go.id/22156/",
    "usage": "Rujukan pendamping penentuan perubahan entalpi untuk M2–M3.",
    "status": "Tercatat dalam PRD; modul berbasis KD dipakai untuk konsep, bukan sebagai dokumen CP terbaru."
  },
  {
    "id": "R4",
    "title": "Chemistry 2e, 5.1 — Energy Basics",
    "author": "OpenStax, Rice University",
    "url": "https://openstax.org/books/chemistry-2e/pages/5-1-energy-basics",
    "usage": "Perbedaan suhu, kalor, energi, kalor jenis, dan arah perpindahan energi pada M1–M2.",
    "status": "Konsep diperiksa saat penyusunan PRD; penjelasan aplikasi ditulis dengan bahasa sendiri."
  },
  {
    "id": "R5",
    "title": "Chemistry 2e, 5.2 — Calorimetry",
    "author": "OpenStax, Rice University",
    "url": "https://openstax.org/books/chemistry-2e/pages/5-2-calorimetry",
    "usage": "Neraca kalor dan asumsi kalorimeter ideal pada M2; tanda kalor larutan dan reaksi.",
    "status": "Konsep diperiksa saat penyusunan PRD; nilai ±41,8 kJ/mol merupakan data ilustrasi model aplikasi."
  },
  {
    "id": "R6",
    "title": "Chemistry 2e, 5.3 — Enthalpy",
    "author": "OpenStax, Rice University",
    "url": "https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy",
    "usage": "Entalpi, syarat qₚ = ΔH, pembalikan dan perkalian persamaan, Hukum Hess, serta entalpi pembentukan HCl pada M1 dan M3.",
    "status": "Konsep dan dataset diperiksa pada PRD; angka pembelajaran menggunakan pembulatan yang dinyatakan."
  },
  {
    "id": "R7",
    "title": "Chemistry 2e, 7.5 — Strengths of Ionic and Covalent Bonds",
    "author": "OpenStax, Rice University",
    "url": "https://openstax.org/books/chemistry-2e/pages/7-5-strengths-of-ionic-and-covalent-bonds",
    "usage": "Energi ikatan fase gas dan sifat estimasinya pada M3; H–H 436, Cl–Cl 243, H–Cl 432 kJ/mol ikatan.",
    "status": "Konsep dan data tabel diperiksa pada PRD; hasil energi ikatan dilabeli estimasi."
  },
  {
    "id": "V1",
    "title": "Ke mana kalor berpindah?",
    "author": "TermoKimia XI — produksi asli prototipe",
    "url": "/videos/m1.mp4",
    "usage": "Video penjelasan teks tanpa suara untuk M1, dikembangkan dari naskah asli Lampiran B PRD. Transkrip disediakan pada item yang sama.",
    "status": "Produksi selesai, 90 detik. Metadata, dekode penuh, kesesuaian transkrip, dan pemutaran awal pada browser telah diperiksa."
  },
  {
    "id": "V2",
    "title": "Larutan hangat, reaksi bertanda apa?",
    "author": "TermoKimia XI — produksi asli prototipe",
    "url": "/videos/m2.mp4",
    "usage": "Video penjelasan teks tanpa suara untuk M2, dikembangkan dari naskah asli Lampiran B PRD. Transkrip disediakan pada item yang sama.",
    "status": "Produksi selesai, 92 detik. Metadata, dekode penuh, kesesuaian transkrip, dan pemutaran awal pada browser telah diperiksa."
  },
  {
    "id": "V3",
    "title": "Tiga cara menggunakan data ΔH",
    "author": "TermoKimia XI — produksi asli prototipe",
    "url": "/videos/m3.mp4",
    "usage": "Video penjelasan teks tanpa suara untuk M3, dikembangkan dari naskah asli Lampiran B PRD. Transkrip disediakan pada item yang sama.",
    "status": "Produksi selesai, 100 detik. Metadata, dekode penuh, kesesuaian transkrip, dan pemutaran awal pada browser telah diperiksa. Jalur transkrip saat video tidak tersedia juga telah diuji."
  }
];

