import { Text } from "react-native";
import tw from "../lib/tailwind";
import Icons from "./Icons";
import Images from "./Images";

const menu = () => {
  const Basic = [
    {
      id: "9",
      name: "Surat Kehilangan",
      icon: Icons.SuratKK,
      screen: "PermohonanKehilanganScreen",
    },
    {
      id: "14",
      name: "Permohonan KTP",
      icon: Icons.SuratKTP,
    },
    {
      id: "3",
      name: "Suket Domisili",
      icon: Icons.SuratDomisiliSolid,
      screen: "PermohonanDomisiliScreen",
    },
    {
      id: "16",
      name: "Suket kelahiran",
      icon: Icons.SuratKelahiran,
      screen: "PermohonanKelahiranScreen",
    },
    {
      id: "6",
      name: "Suket Tidak Mampu",
      icon: Icons.SuratKematian,
      screen: "PermohonanTidakMampuScreen",
    },
  ];
  const other = {
    name: "Lainnya",
    icon: Icons.Other,
  };
  return [...Basic, other];
};
export const AllSurat = [
  {
    id: "1",
    name: "SKCK Polisi",
    slug: "skck",
    type: "Surat Pribadi",
    icon: Icons.Skck,
    screen: "PermohonanSKCKScreen",
    syarat: [
      {
        id: "1",
        name: "Melampirkan Kartu keluarga (KK)/Kartu Tanda Penduduk (KTP)",
      },
      {
        id: "2",
        name: "Melampirkan  foto resmi berukuran ukuran 4x6 menggunakan latar belakang merah",
      },
      {
        id: "3",
        name: "Melampirkan Surat Pengantar RT/RW",
      },
    ],
  },
  {
    id: "2",
    name: "Surat Kuasa",
    slug: "SuratKuasa",
    type: "Surat Pribadi",
    icon: Icons.SuratKuasa,
    screen: "PermohonanSuratKuasaScreen",
    syarat: [
      {
        id: "1",
        name: "Melampirkan Kartu keluarga (KK) kedua belah pihak",
      },
      {
        id: "2",
        name: "Melampirkan Kartu Tanda Penduduk (KTP) kedua belah pihak",
      },
      {
        id: "3",
        name: "Melampirkan Surat Pengantar RT/RW",
      },
      {
        id: "4",
        name: "Membawa materai saat pengambilan surat di Kantor Desa",
      },
    ],
  },
  {
    id: "3",
    name: "Surat Keterangan Domisili",
    slug: "SuratKeteranganDomisili",
    type: "Surat Pribadi",
    icon: Icons.SuratKeteranganDomisili,
    screen: "PermohonanDomisiliScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki KTP",
      },
      {
        id: "2",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "3",
        name: "Mempunyai Surat Pengantar RT",
      },
    ],
  },
  {
    id: "4",
    name: "Surat Pindah Tempat",
    slug: "SuratPindahTempat",
    type: "Surat Pribadi",
    icon: Icons.SuketPindahTempat,
    screen: "PermohonanPindahTempatScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki KTP",
      },
      {
        id: "2",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "3",
        name: "Mempunyai Surat Pengantar RT",
      },
    ],
  },
  {
    id: "5",
    name: "Surat Keterangan Hubungan Keluarga",
    slug: "SuratKeteranganHubunganKeluarga",
    type: "Surat Pribadi",
    icon: Icons.SuketHubunganKeluarga,
    screen: "PermohonanHubunganKeluargaScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki KTP",
      },
      {
        id: "2",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "3",
        name: "Mempunyai Surat Pengantar RT",
      },
    ],
  },
  {
    id: "6",
    name: "Surat Keterangan Tidak Mampu",
    slug: "SuratKeteranganTidakMampu",
    type: "Surat Pribadi",
    icon: Icons.SuketTidakMampu,
    screen: "PermohonanTidakMampuScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki Kartu Tanda Penduduk (KTP)",
      },
      {
        id: "2",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "3",
        name: "Memiliki Surat Pengantar RT/RW",
      },
    ],
    ketentuan: [
      {
        id: 1,
        name: "Tidak memiliki sumber mata pencaharian dan/atau mempunyai sumber mata pencaharian tetapi tidak mempunyai kemampuan memenuhi kebutuhan dasar",
      },
      {
        id: 2,
        name: "Memiliki pengeluaran yang sebagian besar diperuntukkan untuk memenuhi kebutuhan pokok dengan sangat sederhana",
      },
      {
        id: 3,
        name: "Memiliki pengeluaran yang sebagian besar diperuntukkan untuk memenuhi kebutuhan pokok dengan sederhana",
      },
      {
        id: 4,
        name: "Memiliki pengeluaran yang sebagian besar diperuntukkan untuk memenuhi kebutuhan pokok dengan sedang",
      },
      {
        id: 5,
        name: "Memiliki pengeluaran yang sebagian besar diperuntukkan untuk memenuhi kebutuhan pokok dengan besar",
      },
    ],
  },
  {
    id: "7",
    name: "Surat Pengantar Nikah",
    slug: "SuratPengantarNikah",
    type: "Surat Pernyataan Hubungan Nikah",
    icon: Icons.SuratPengantarNikah,
    screen: "PermohonanPengantarNikahScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki Kartu Tanda Penduduk (KTP)",
      },
      {
        id: "2",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "3",
        name: "Memiliki Surat Pengantar RT/RW",
      },
    ],
  },
  {
    id: "8",
    name: "Surat Pengantar Cerai",
    slug: "SuratPengantarCerai",
    type: "Surat Pernyataan Hubungan Nikah",
    icon: Icons.SuratPengantarCerai,
    screen: "PermohonanPengantarCeraiScreen",
    syarat: [
      {
        id: "1",
        name: "Melampirkan Kartu keluarga (KK)/Kartu Tanda Penduduk (KTP) istri dan suami",
      },
      {
        id: "2",
        name: "Melampirkan Surat Pengantar RT/RW",
      },
      {
        id: "3",
        name: "Melampirkan Surat Nikah",
      },
      {
        id: "4",
        name: "Membawa materai saat mengambil surat di desa",
      },
      {
        id: "5",
        name: "Semua berkas dokumen asli dibawa saat pengambilan surat",
      },
    ],
  },
  {
    id: "9",
    name: "Surat Kehilangan",
    slug: "SuratKehilangan",
    type: "Surat Keterangan",
    icon: Icons.SuketKehilangan,
    screen: "PermohonanKehilanganScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki KTP",
      },
      {
        id: "2",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "3",
        name: "Memiliki Surat Pengantar RT/RW",
      },
    ],
    ketentuan: [
      {
        name: "Foto copy dokumen pendukung atau surat keternagan yang dilaporkan antara lain:\n\nA. Sertifikat tanah \n Melampirkan foto copy sertifikat atau pengantar dari BPN",
      },
      {
        name: "B. Buku rekening/tabungan/ATM \n Melampirkan surat dari bank yang mengeluarkan",
      },
      {
        name: "C. KTP/Kartu Keluarga \n Melampirkan foto copy KTP/KK atau surat keterangan hilang dari kepolisian",
      },
      {
        name: "D. Ijazah \n Melampirkan foto copy Ijazah atau surat pengantar dari Dinas terkait/sekolah yang mengeluarkan ijazah.",
      },
      {
        name: "E. BPKB \n Melampirkan foto copy KTP atas nama di BPKB dan STNK",
      },
      {
        name: "F. STNK \n Melampirkan foto copy KTP , foto copy STNK (jika ada) serta foto copy BPKB atau untuk kendaraan kredit melampirka surat pengantar dari pihak Finance (perusahaan).",
      },
    ],
  },
  {
    id: "10",
    name: "Surat Keterangan Kredit",
    slug: "SuratKeteranganKredit",
    type: "Surat Keterangan",
    icon: Icons.SuratKeteranganKredit,
    screen: "PermohonanKeteranganKreditScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki Kartu Tanda Penduduk (KTP)",
      },
      {
        id: "2",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "3",
        name: "Memiliki Surat Pengantar RT/RW",
      },
    ],
  },
  {
    id: "11",
    name: "Surat Boro Kerja",
    slug: "SuratBoroKerja",
    type: "Surat Keterangan",
    icon: Icons.SuketBoroKerja,
    screen: "PermohonanBoroScreen",
    syarat: [
      {
        id: "1",
        name: "Surat Pengantar dari RT/RW",
      },
      {
        id: "2",
        name: "Wajib Lampirkan KTP & KK Asli: Pengaju dan Pengikut",
      },
      {
        id: "3",
        name: "Wajib Membawa KTP & KK Foto Copy 1 Lembar (Pengaju dan Pengikut) Ketika Pengambilan Surat",
      },
      {
        id: "4",
        name: "Wajib Membawa Pas Foto 4x6 2 Lembar (Background Merah) Ketika Pengambilan Surat",
      },
      {
        id: "5",
        name: "Wajib Membawa Foto Copy Surat Nikah (Bagi yang Sudah Menikah) Ketika Pengambilan Surat",
      },
    ],
  },
  {
    id: "12",
    name: "Surat Keterangan Kayu Desa",
    slug: "SuratKeteranganKayuDesa",
    type: "Surat Keterangan",
    icon: Icons.SuketKayuDesa,
    screen: "PermohonanKayuScreen",
    syarat: [
      {
        id: "1",
        name: "Wajib Melampirkan Surat Keterangan Asal-Usul",
      },
      {
        id: "2",
        name: "Nota Jual/Beli Kayu Tersebut",
      },
      {
        id: "3",
        name: "Surat Keterangan Sah Kayu Bulat Kayu Rakyat (SKSKB Cap “KR”)",
      },
      {
        id: "4",
        name: "Melampirkan Kartu keluarga (KK)/Kartu Tanda Penduduk (KTP)",
      },
    ],
  },
  {
    id: "13",
    name: "Kartu Keluarga <tidak ada>",
    slug: "KK",
    type: "Surat Pribadi",
    icon: Icons.SuratKKOptions,
    // screen: "PermohonanKKScreen",
    // syarat: [
    //   {
    //     id: "1",
    //     name: "Memiliki Kartu Tanda Penduduk (KTP)",
    //   },
    //   {
    //     id: "2",
    //     name: "Memiliki Kartu Keluarga (KK)",
    //   },
    //   {
    //     id: "3",
    //     name: "Memiliki Surat Pengantar RT/RW",
    //   },
    // ],
    // ketentuan: [
    //   {
    //     id: "1",
    //     name: "Melampirkan Kartu Keluarga (KK) lama masing-masing (Khusus Baru Nikah)",
    //   },
    //   {
    //     id: "2",
    //     name: "Melampirkan formulir F I-01 (Khusus Baru Nikah)",
    //   },
    //   {
    //     id: "3",
    //     name: "Melampirkan foto buku nikah (Khusus Baru Nikah)",
    //   },
    //   {
    //     id: "4",
    //     name: "Melampirkan surat keterangan domisili jika berpindah (Khusus Baru Nikah)",
    //   },
    //   {
    //     id: "5",
    //     name: "Melampirkan Kartu Tanda Penduduk (KTP) masing-masing (Khusus Baru Nikah)",
    //   },
    //   {
    //     id: "6",
    //     name: "Melampirkan surat pengantar Rt/RW (Khusus Baru Nikah)",
    //   },
    // ],
  },
  {
    id: "14",
    // name: "Permohonan Kartu Tanda Penduduk (KTP)",
    name: "Permohonan (KTP)",
    slug: "PermohonanKTP",
    type: "Surat Pribadi",
    icon: Icons.SuratKTPOptions,
    screen: "PermohonanKtpScreen",
    syarat: [
      {
        id: "1",
        name: "Berusia minimal 17 tahun.",
      },
      {
        id: "2",
        name: "Memiliki Kartu Keluarga (KK).",
      },
    ],
    ketentuan: [
      {
        id: "1",
        name: "Jika KTP Hilang/Rusak, memiliki bukti foto KTP yang rusak (Jika Rusak) dan Surat keterangan hilang dari kepolisian (jika hilang).",
      },
      {
        id: "2",
        name: "Jika Anda bukan asli warga setempat dan Warga Negara Indonesia (WNI),wajib memiliki surat keterangan pindah dari kota asal.",
      },
      {
        id: "3",
        name: "Bagi WNI yang datang dari luar negeri karena pindah, wajib memiliki surat keterangan pindah dari Disdukcapil Kabupaten/Kota Asal.",
      },
      {
        id: "4",
        name: "Bagi Warga Negara Asing (WNA), wajib memiliki dokumen perjalanan, dan kartu izin tinggal tetap (KITAP)",
      },
    ],
  },
  {
    id: "15",
    name: "Surat Keterangan Usaha (SKU)",
    slug: "SKU",
    type: "Surat Keterangan",
    icon: Icons.SuratKeteranganUsahaOptions,
    screen: "PermohonanSKUScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki Kartu Tanda Penduduk (KTP)",
      },
      {
        id: "2",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "3",
        name: "Memiliki Surat Pengantar RT/RW",
      },
    ],
  },
  {
    id: "16",
    name: "Surat Kelahiran",
    slug: "SuratKelahiran",
    type: "Surat Keterangan",
    icon: Icons.SuratKelahiranOptions,
    screen: "PermohonanKelahiranScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki Kartu Keluarga (KTP)",
      },
      {
        id: "2",
        name: "Memiliki Kartu Tanda Penduduk (KTP)",
      },
      {
        id: "3",
        name: "Memiliki buku nikah atau akta perkawinan atau SPTJM Kebenaran Pasangan Suami Istri",
      },
    ],
    ketentuan: [
      {
        id: "1",
        name: "SPTJM Kebenaran Pasangan Suami Istri digunakan apabila pemohon tidak dapat melampirkan akta nikah/perkawinan yang bersangkutan/orang tua",
      },
      {
        id: "2",
        name: "Melampirkan foto copy KTP Pelapor apabila pelapor bukan orang tua bayi",
      },
      {
        id: "3",
        name: "Melampirkan foto copy 2 orang saksi",
      },
      {
        id: "4",
        name: "Persyaratan pencatatan kelahiran anak yang tidak diketahui asal usulnya atau keberadaan orangtuanya dilakukan dengan melampirkan Berita Acara Pemeriksaan dari Kepolisian.",
      },
    ],
  },
  {
    id: "17",
    name: "Surat Kematian",
    slug: "SuratKematian",
    type: "Surat Keterangan",
    icon: Icons.SuratKematianOptions,
    screen: "PermohonanKematianScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "2",
        name: "Memiliki Kartu Tanda Penduduk (KTP)",
      },
      {
        id: "3",
        name: "Memiliki surat pengantar RT/RW",
      },
    ],
  },
  {
    id: "18",
    name: "Surat Pengajuan Beasiswa",
    slug: "SuratPengajuanBeasiswa",
    type: "Surat Keterangan",
    icon: Icons.SuratKKOptions,
    screen: "PengajuanBeasiswaScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "2",
        name: "Memiliki Kartu Tanda Penduduk (KTP)",
      },
      {
        id: "3",
        name: "Memiliki surat pengantar RT/RW",
      },
    ],
  },
  {
    id: "19",
    name: "Surat Keterangan Lainya",
    slug: "SuratKeteranganLainya",
    type: "Surat Keterangan",
    icon: Icons.SuratKKOptions,
    screen: "KeteranganLainyaScreen",
    syarat: [
      {
        id: "1",
        name: "Memiliki Kartu Keluarga (KK)",
      },
      {
        id: "2",
        name: "Memiliki Kartu Tanda Penduduk (KTP)",
      },
      {
        id: "3",
        name: "Memiliki surat pengantar RT/RW",
      },
    ],
  },
];
export const AllSuratPribadi = [
  AllSurat[0],
  // AllSurat[1],
  AllSurat[3],
  // AllSurat[4],
  AllSurat[17],
];
export const AllSuratPernyataanNikah = [
  AllSurat[6],
  // AllSurat[7]
];
export const AllSuratKeterangan = [
  // AllSurat[9],
  AllSurat[10],
  // AllSurat[11],
  AllSurat[14],
  AllSurat[16],
  AllSurat[18],
];
export const searchSurat = (keyword) => {
  const result = AllSurat.filter((item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase());
  });
  return result;
};
export const optionJenisKelamin = [
  {
    id: "1",
    label: "Laki-laki",
  },
  {
    id: "2",
    label: "Perempuan",
  },
];
export const optionAgama = [
  { id: 1, label: "Islam" },
  { id: 2, label: "Kristen" },
  { id: 3, label: "Katolik" },
  { id: 4, label: "Budha" },
  { id: 5, label: "Hindu" },
  { id: 6, label: "Konghucu" },
];
export const optionKebangsaan = [
  { id: 1, label: "WNI" },
  { id: 2, label: "WNA" },
];
export const optionKawin = [
  { id: 1, label: "Kawin" },
  { id: 2, label: "Belum Kawin" },
  { id: 3, label: "Cerai Hidup" },
  { id: 4, label: "Cerai Mati" },
];
export const optionPendidikan = [
  { id: 1, label: "Tidak/Belum Sekolah" },
  { id: 2, label: "Tidak Tamat SD/Sederajat" },
  { id: 3, label: "Tamat SD/Sederajat" },
  { id: 4, label: "SLTP/Sederajat" },
  { id: 5, label: "SLTA/Sederajat" },
  { id: 6, label: "Diploma I/II" },
  { id: 7, label: "Akademi/Diploma III/Sarjana Muda" },
  { id: 8, label: "Diploma IV/Strata I" },
  { id: 9, label: "Strata II" },
  { id: 10, label: "Strata III" },
];
export const optionDusun = [
  {
    id: 1,
    label: "Dusun Ngadiloyo",
  },
  { id: 2, label: "Dusun Ngadiluwih" },
];
export const optionRt = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
  // { id: 6, label: "6" },
  // // { id: 7, label: "7" },
  // // { id: 8, label: "8" },
  // // { id: 9, label: "9" },
  // // { id: 10, label: "10" },
  // // { id: 11, label: "11" },
  // // { id: 12, label: "12" },
  // // { id: 13, label: "13" },
  // // { id: 14, label: "14" },
  // // { id: 15, label: "15" },
  // // { id: 16, label: "16" },
  // // { id: 17, label: "17" },
  // // { id: 18, label: "18" },
];
export const optionRw = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
  { id: 6, label: "6" },
];
export const programKredit = [
  {
    id: 1,
    label: "Koperasi Simpan Pinjam",
  },
  {
    id: 2,
    label: "Koperasi Umum Pedesaan",
  },
  {
    id: 3,
    label: "Kredit UMKM",
  },
  {
    id: 4,
    label: "Kredit Usaha Rakyat",
  },
];
export const optionPemberiKredit = [
  {
    id: "1",
    label: "Bank Indonesia",
  },
  {
    id: "2",
    label: "BPR MULYA SRI REZEKI",
  },
  {
    id: "3",
    label: "Bank Jatim",
  },
  {
    id: "4",
    label: "Bank Rakyat Indonesia (Persero) Unit Ngadiluwih",
  },
  {
    id: "5",
    label: "Bank Central Asia (BCA)",
  },
  {
    id: "6",
    label: "Bank Tabungan Negara (BTN)",
  },
  {
    id: "7",
    label: "Bank Mandiri",
  },
  {
    id: "8",
    label: "BPR JATIM",
  },
  {
    id: "9",
    label: "Bank Panin",
  },
  {
    id: "10",
    label: "BPR JATIM - Kediri",
  },
  {
    id: "11",
    label: "Bank Mayapada",
  },
  {
    id: "12",
    label: "Bank Rakyat Indonesia (Persero) CABANG Kediri",
  },
  {
    id: "13",
    label: "Bank Sinarmas",
  },
  {
    id: "14",
    label: "Bank UMKM Jatim",
  },
];
export const optionJaminan = [
  {
    id: "1",
    label: "Tanah",
  },
  {
    id: "2",
    label: "Barang Berharga",
  },
];
export const optionJenisKayu = [
  {
    id: "1",
    label: "Batang",
  },
  {
    id: "2",
    label: "Biji",
  },
  {
    id: "3",
    label: "cm",
  },
  {
    id: "4",
    label: "gelondong",
  },
  {
    id: "5",
    label: "ikat",
  },
  {
    id: "6",
    label: "kubik",
  },
  {
    id: "7",
    label: "lembar",
  },
  {
    id: "8",
    label: "meter",
  },
  {
    id: "9",
    label: "paket",
  },
  {
    id: "10",
    label: "poting",
  },
  {
    id: "11",
    label: "rit truck",
  },
  {
    id: "12",
    label: "ton",
  },
  {
    id: "13",
    label: "potong",
  },
];
export const optionSebabKematian = [
  {
    id: "1",
    label: "Sakit biasa/tua",
  },
  {
    id: "2",
    label: "Wabah penyakit",
  },
  {
    id: "3",
    label: "Kecelakaan",
  },
  {
    id: "4",
    label: "Kriminalitas",
  },
  {
    id: "5",
    label: "Bunuh diri",
  },
  {
    id: "6",
    label: "Lainnya",
  },
];
export const optionMenerangkanKematian = [
  {
    id: "1",
    label: "Dokter",
  },
  {
    id: "2",
    label: "Tenaga Kesehatan",
  },
  {
    id: "3",
    label: "Kepolisian",
  },
  {
    id: "4",
    label: "Lainnya",
  },
];
const Dummy = {
  menu: menu,
  slider: [
    {
      image: Images.Slide1,
    },
    {
      image: Images.Slide2,
    },
    {
      image: Images.Slide3,
    },
    {
      image: Images.Slide4,
    },
  ],

  InstructionItem: [
    {
      icon: Icons.Setting,
      title: "Melengkapi Data Pribadi",
      link: undefined,
    },
    {
      icon: Icons.Admin,
      title: "Tata Cara Pengajuan Surat",
      link: undefined,
    },

    {
      icon: Icons.Faq,
      title: "Pengajuan Kembali Surat yang Ditolak",
      link: undefined,
    },
    {
      icon: Icons.Bug,
      title: "Fitur Chat Bot",
      link: undefined,
    },
    {
      icon: Icons.Bug,
      title: "Keluar Akun",
      link: undefined,
    },
  ],
  FaqItem: [
    {
      title: "Apa itu SICAD?",
      desc: "SICAD merupakan layanan sistem administrasi online Desa Ngadiluwih guna memberikan layanan cerdas, tanpa memperhitungkan jarak dan jam operasional pemerintahan.\n\n\nPengaju dapat mengajukan surat apapun, kapanpun, dan dimanapun.",
    },
    {
      title: "Apakah data pengguna yang diberikan akan terjaga keamanannya?",
      desc: "Ya, data Anda akan disimpan dan dijaga tingkat kerahasiaannya.\n\nPenyimpanan data akan menggunakan sistem yang disediakan oleh Kominfo milik Pemerintahan Kediri, selama database dan server tersebut terhindar dari serangan cyber data pengguna akan selalu dalam keadaan aman.",
    },

    // {
    //   title:
    //     "Apakah saya dapat membatalkan pengajuan surat yang telah diajukan?",
    //   desc: (
    //     <Text>
    //       Ya, Anda dapat membatalkan pengajuan surat selama pihak admin belum
    //       menyetujui pengajuannya.{"\n\n"} Namun, apabila telah disetujui oleh
    //       admin, maka Anda dapat membatalkannya melalui fitur gelembung pesan
    //       yang terdapat pada tampilan awal (home) atau di bagian Pengaturan lalu
    //       klik
    //       <Text style={[tw`text-yPastel`]}>“Informasi Admin”</Text> dan{" "}
    //       <Text style={[tw`text-yPastel`]}>“Tanya Admin”</Text>. Tunggu hingga
    //       status berubah.
    //     </Text>
    //   ),
    // },
    {
      title:
        "Apakah saya dapat membatalkan pengajuan surat yang telah diajukan?",
      desc: (
        <Text>
          Ya, Anda dapat membatalkan pengajuan surat selama pihak admin belum
          menyetujui pengajuannya.{"\n\n"}Namun, apabila telah disetujui oleh
          admin, maka Anda dapat membatalkannya melalui fitur{" "}
          <Text style={[tw`text-yPastel`]}> gelembung pesan</Text>
          (bubble chat) yang terdapat pada tampilan awal (home) atau di bagian
          Pengaturan lalu klik{" "}
          <Text style={[tw`text-yPastel`]}>“Informasi Admin”</Text> dan{" "}
          <Text style={[tw`text-yPastel`]}>“Tanya Admin”</Text>. Tunggu hingga
          status berubah.
        </Text>
      ),
    },
    {
      title:
        "Bagaimana jika surat yang diajukan belum juga diproses hingga 10 hari kerja?",
      desc: "Pengaju dapat menghubungi admin yang ada di fitur “Tanya Admin”",
    },
    // {
    //   title: "Bagaimana jika pertanyaan saya tidak terjawab di sini?",
    //   desc: (
    //     <Text>
    //       Anda dapat menggunakan fitur{" "}
    //       <Text style={[tw`text-yPastel`]}> gelembung pesan</Text> (bubble chat)
    //       yang terdapat pada tampilan awal (home) atau di bagian Pengaturan lalu
    //       klik <Text style={[tw`text-yPastel`]}>“Informasi Admin”</Text> dan{" "}
    //       <Text style={[tw`text-yPastel`]}>“Tanya Admin”</Text>.{"\n\n"}Tunggu
    //       hingga pesan Anda ditanggapi oleh Admin dengan batas 3x24 jam.
    //     </Text>
    //   ),
    // },
    {
      title: "Bagaimana jenis surat yang saya ajukan salah",
      desc: "Selama surat belum disetujui oleh pihak desa, Anda dapat melakukan pembatalan melalui aplikasi. Apabila data yang Anda masukkan salah namun status surat telah disetujui oleh pihak desa, Anda dapat mengajukan ulang surat yang anda kehendaki.",
    },
    {
      title: "Bagaimana cara mengubah data yang salah?",
      desc: "Selama surat belum disetujui oleh pihak desa, Anda dapat melakukan pembatalan melalui aplikasi. Apabila data yang Anda masukkan salah namun status surat telah disetujui oleh pihak desa, Anda dapat mengajukan ulang dengan tahapan yang sama seperti sebelumnya.",
    },
    {
      title: "Bagaimana cara mengajukan surat?",
      desc: "Untuk melihat cara mengajukan surat, Anda dapat mengikuti tutorial yang kami sediakan. Pada halaman utama, klik logo tanda tanya <?> di pojok kanan atas dan anda dapat menonton tutorial pembuatan surat.",
    },
    {
      title: "Apa yang harus disiapkan",
      desc: "Detail informasi yang dibutuhkan berbeda-beda tiap surat, Anda dapat mengecek informasi dan lampiran yang dibutuhkan saat pengisian form pengajuan surat.",
    },
    {
      title: "Layanan apa saja yang disediakan",
      desc: 'Untuk melihat layanan apa saja yang disediakan, anda dapat kembali ke beranda untuk melihat layan yang tersedia. Klik "lainnya" untuk melihat surat lainnya.',
    },
    {
      title: "Bagaimana cara mengatur notifikasi ",
      desc: "Untuk mengaktifkan maupun menonaktifkan notifikasi anda dapat menuju ke pengaturan umum.",
    },
  ],
};
export default Dummy;
