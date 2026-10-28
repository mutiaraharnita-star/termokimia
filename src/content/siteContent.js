export const siteIdentity = {
  name: 'TermoKimia XI',
  school: '',
  author: '',
};

export const modules = [
  {
    id: 'm1',
    number: '01',
    title: 'Konsep Kalor dan Entalpi',
    description:
      'Pahami perpindahan kalor, tentukan sistem dan lingkungan, lalu baca makna tanda ΔH.',
    topics: [
      'Suhu, kalor, sistem, dan lingkungan',
      'Reaksi eksoterm dan endoterm',
      'Tanda ΔH dan diagram entalpi',
    ],
    prerequisite: null,
    estimatedLabel: 'Konsep dasar',
    objectives: [
      'Membedakan suhu, kalor, dan entalpi serta menentukan batas sistem.',
      'Menjelaskan arah perpindahan kalor pada proses eksoterm dan endoterm.',
      'Menghubungkan tanda ΔH dengan tingkat entalpi reaktan dan produk.',
    ],
  },
  {
    id: 'm2',
    number: '02',
    title: 'Kalorimetri',
    description:
      'Gunakan data perubahan suhu untuk menghitung kalor larutan dan perubahan entalpi reaksi.',
    topics: [
      'Massa, kalor jenis, dan perubahan suhu',
      'Kalorimeter ideal dan neraca kalor',
      'Kalor reaksi dan entalpi per mol',
    ],
    prerequisite: 'm1',
    estimatedLabel: 'Perhitungan',
    objectives: [
      'Menghitung kalor larutan menggunakan q = mcΔT dengan satuan yang sesuai.',
      'Membedakan tanda kalor larutan dan kalor reaksi dalam model kalorimeter ideal.',
      'Menentukan perubahan entalpi per mol pada basis reaksi yang dinyatakan.',
    ],
  },
  {
    id: 'm3',
    number: '03',
    title: 'Penentuan ΔH',
    description:
      'Tentukan perubahan entalpi dari susunan persamaan, data pembentukan, dan energi ikatan.',
    topics: [
      'Hukum Hess dan persamaan termokimia',
      'Entalpi pembentukan standar',
      'Estimasi menggunakan energi ikatan',
    ],
    prerequisite: 'm2',
    estimatedLabel: 'Analisis reaksi',
    objectives: [
      'Membalik dan menjumlahkan persamaan reaksi beserta perubahan entalpinya.',
      'Menghitung ΔH dari entalpi pembentukan dengan koefisien dan fase yang sesuai.',
      'Memperkirakan ΔH menggunakan energi ikatan fase gas dan menjelaskan batas modelnya.',
    ],
  },
];
