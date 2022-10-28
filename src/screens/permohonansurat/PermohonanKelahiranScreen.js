import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import CustomButton from "../../components/generals/CustomButton";
import CustomInputDate from "../../components/generals/CustomInputDate";
import DropdownInput from "../../components/generals/DropdownInput";
import FormFileInput from "../../components/generals/FormFileInput";
import FormInput from "../../components/generals/FormInput";
import CustomHeader from "../../components/header/CustomHeader";
import CustomProgressBar from "../../components/progressbar/CustomProgressBar";
import Icons from "../../constants/Icons";
import {
  apiUploadSuratOnlyText,
  apiUploadSuratWithPicture,
} from "../../lib/api";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
import * as ImagePicker from "expo-image-picker";
import { optionAgama, optionKebangsaan } from "../../constants/Dummy";
import CustomInputTime from "../../components/generals/CustomInputTime";
import GenerateInputForm from "../../components/generals/GenerateInputForm";
import { dataToString } from "../../constants/Helper";
import { useDispatch } from "react-redux";
import { setLoading } from "../../features/loading/loadingSlice";
import ButtonBottom from "../../components/surat/ButtonBottom";
const RenderHeader = () => {
  return (
    <SafeAreaView style={[GlobalCss.containerPaddingX]}>
      <CustomHeader title="Permohonan Surat Kelahiran" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Data Pemohon",
  },
  {
    name: "Data Lainya",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_kepala_keluarga: "",
  nomor_kartu_keluarga: "",
  nama_bayi: "",
  jenis_kelamin_bayi: "",
  tempat_dilahirkan_bayi: "",
  tempat_kelahiran_bayi: "",
  hari_lahir_bayi: "",
  tanggal_lahir_bayi: new Date(),
  pukul_bayi: "",
  jenis_kelahiran_bayi: "",
  kelahiran_ke_bayi: "",
  penolong_kelahiran_bayi: "",
  berat_bayi: "",
  panjang_bayi: "",
  nik_ibu: "",
  nama_lengkap_ibu: "",
  tanggal_lahir_ibu: new Date(),
  usia_ibu: "",
  pekerjaan_ibu: "",
  alamat_ibu: "",
  desa_ibu: "",
  kecamatan_ibu: "",
  kabupaten_kota_ibu: "",
  provinsi_ibu: "",
  kewarganegaraan_ibu: "",
  kebangsaan_ibu: "",
  tanggal_pencatatan_perkawinan_ibu: new Date(),
  nik_ayah: "",
  nama_lengkap_ayah: "",
  tanggal_lahir_ayah: new Date(),
  usia_ayah: "",
  pekerjaan_ayah: "",
  alamat_ayah: "",
  desa_ayah: "",
  kecamatan_ayah: "",
  kabupaten_kota_ayah: "",
  provinsi_ayah: "",
  kewarganegaraan_ayah: "",
  kebangsaan_ayah: "",
  nama_lengkap_pelapor: "",
  nik_pelapor: "",
  usia_pelapor: "",
  jenis_kelamin_pelapor: "",
  pekerjaan_pelapor: "",
  alamat_pelapor: "",
  desa_pelapor: "",
  kecamatan_pelapor: "",
  kabupaten_kota_pelapor: "",
  provinsi_pelapor: "",
  nama_saksi_satu: "",
  nik_saksi_satu: "",
  usia_saksi_satu: "",
  pekerjaan_saksi_satu: "",
  alamat_saksi_satu: "",
  desa_saksi_satu: "",
  kecamatan_saksi_satu: "",
  kabupaten_kota_saksi_satu: "",
  provinsi_saksi_satu: "",
  nama_saksi_dua: "",
  nik_saksi_dua: "",
  usia_saksi_dua: "",
  pekerjaan_saksi_dua: "",
  alamat_saksi_dua: "",
  desa_saksi_dua: "",
  kecamatan_saksi_dua: "",
  kabupaten_kota_saksi_dua: "",
  provinsi_saksi_dua: "",
  pengantar_rt: "",
  surat_bidan_rs: "",
  foto_kk: "",
  foto_3x4_ibu: "",
  foto_3x4_ayah: "",
};
const initialStateFile = [
  {
    name: "pengantar_rt",
    file: "pengantar_rt_file",
  },
  {
    name: "surat_bidan_rs",
    file: "surat_bidan_rs_file",
  },
  {
    name: "foto_kk",
    file: "foto_kk_file",
  },
  {
    name: "foto_3x4_ibu",
    file: "foto_3x4_ibu_file",
  },
  {
    name: "foto_3x4_ayah",
    file: "foto_3x4_ayah_file",
  },
];
const RenderForm1 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Kepala Keluarga",
      data: [
        {
          name: "nama_kepala_keluarga",
          title: "Nama Kepala Keluarga",
          value: formDataUser.nama_kepala_keluarga,
          type: "text",
          required: true,
        },
        {
          name: "nomor_kartu_keluarga",
          title: "Nomor Kartu Keluarga",
          value: formDataUser.nomor_kartu_keluarga,
          type: "text",
          required: true,
        },
      ],
    },
    {
      header: "Data Bayi/Anak",
      data: [
        {
          name: "nama_bayi",
          title: "Nama Bayi",
          value: formDataUser.nama_bayi,
          type: "text",
          required: true,
        },
        {
          name: "jenis_kelamin_bayi",
          title: "Jenis Kelamin",
          value: formDataUser.jenis_kelamin_bayi,
          type: "options",
          placeholder: "Pilih Jenis Kelamin",
          options: [
            {
              id: "1",
              label: "Laki-laki",
            },
            {
              id: "2",
              label: "Perempuan",
            },
          ],
          required: true,
        },
        {
          name: "tempat_dilahirkan_bayi",
          title: "Tempat Dilahirkan",
          value: formDataUser.tempat_dilahirkan_bayi,
          type: "options",
          placeholder: "Pilih Tempat Dilahirkan",
          options: [
            {
              id: "1",
              label: "RS/RB",
            },
            {
              id: "2",
              label: "Puskesmas",
            },
            {
              id: "3",
              label: "Polindes",
            },
            {
              id: "4",
              label: "Rumah",
            },
            {
              id: "5",
              label: "Lainnya",
            },
          ],
          required: true,
        },
        {
          name: "tempat_kelahiran_bayi",
          title: "Tempat Kelahiran",
          value: formDataUser.tempat_kelahiran_bayi,
          type: "text",
          required: true,
        },
        {
          name: "hari_lahir_bayi",
          title: "Hari Lahir",
          value: formDataUser.hari_lahir_bayi,
          type: "options",
          placeholder: "Pilih Hari Lahir",
          options: [
            {
              id: "1",
              label: "Minggu",
            },
            {
              id: "2",
              label: "Senin",
            },
            {
              id: "3",
              label: "Selasa",
            },
            {
              id: "4",
              label: "Rabu",
            },
            {
              id: "5",
              label: "Kamis",
            },
            {
              id: "6",
              label: "Jumat",
            },
            {
              id: "7",
              label: "Sabtu",
            },
          ],
          required: true,
        },
        {
          name: "tanggal_lahir_bayi",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_bayi || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "pukul_bayi",
          title: "pukul",
          value: formDataUser.pukul_bayi || new Date(),
          type: "time",
          required: true,
        },
        {
          name: "jenis_kelahiran_bayi",
          title: "Jenis Kelahiran",
          value: formDataUser.jenis_kelahiran_bayi,
          type: "options",
          placeholder: "Pilih Jenis Kelahiran",
          options: [
            {
              id: "1",
              label: "Tunggal",
            },
            {
              id: "2",
              label: "Kembar 2",
            },
            {
              id: "3",
              label: "Kembar 3",
            },
            {
              id: "4",
              label: "Kembar 4",
            },
            {
              id: "5",
              label: "Lainnya",
            },
          ],
          required: true,
        },
        {
          name: "kelahiran_ke_bayi",
          title: "Kelahiran Ke-",
          value: formDataUser.kelahiran_ke_bayi,
          type: "text",
          required: true,
        },
        {
          name: "penolong_kelahiran_bayi",
          title: "Penolong Kelahiran",
          value: formDataUser.penolong_kelahiran_bayi,
          type: "options",
          placeholder: "Pilih Penolong Kelahiran",
          options: [
            {
              id: "1",
              label: "Dokter",
            },
            {
              id: "2",
              label: "Bidan",
            },
            {
              id: "3",
              label: "Dukun",
            },
            {
              id: "4",
              label: "Lainnya",
            },
          ],
          required: true,
        },
        {
          name: "berat_bayi",
          title: "Berat Bayi (kg)",
          value: formDataUser.berat_bayi,
          type: "text",
          required: true,
        },
        {
          name: "panjang_bayi",
          title: "Panjang Bayi (cm)",
          value: formDataUser.panjang_bayi,
          type: "text",
          required: true,
        },
      ],
    },
    {
      header: "Data Ibu",
      data: [
        {
          name: "nik_ibu",
          title: "NIK",
          value: formDataUser.nik_ibu,
          type: "text",
          required: true,
        },
        {
          name: "nama_lengkap_ibu",
          title: "Nama Lengkap",
          value: formDataUser.nama_lengkap_ibu,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_ibu",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_ibu || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "usia_ibu",
          title: "Usia",
          value: formDataUser.usia_ibu,
          type: "text",
          required: true,
        },
        {
          name: "pekerjaan_ibu",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_ibu,
          type: "text",
          required: true,
        },
        {
          name: "alamat_ibu",
          title: "Alamat",
          value: formDataUser.alamat_ibu,
          type: "text",
          required: true,
        },
        {
          name: "desa_ibu",
          title: "Desa",
          value: formDataUser.desa_ibu,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_ibu",
          title: "Kecamatan",
          value: formDataUser.kecamatan_ibu,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_ibu",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_ibu,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_ibu",
          title: "Provinsi",
          value: formDataUser.provinsi_ibu,
          type: "text",
          required: true,
        },
        {
          name: "kewarganegaraan_ibu",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_ibu,
          type: "options",
          placeholder: "Pilih Kewarganegaraan",
          options: [
            {
              id: "1",
              label: "WNI",
            },
            {
              id: "2",
              label: "WNA",
            },
          ],
          required: true,
        },
        {
          name: "kebangsaan_ibu",
          title: "Kebangsaan",
          value: formDataUser.kebangsaan_ibu,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_pencatatan_perkawinan_ibu",
          title: "Tanggal Pencatatan Perkawinan",
          value: formDataUser.tanggal_pencatatan_perkawinan_ibu || new Date(),
          type: "date",
          required: false,
        },
      ],
    },
    {
      header: "Data Ayah",
      data: [
        {
          name: "nik_ayah",
          title: "NIK",
          value: formDataUser.nik_ayah,
          type: "text",
          required: true,
        },
        {
          name: "nama_lengkap_ayah",
          title: "Nama Lengkap",
          value: formDataUser.nama_lengkap_ayah,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_ayah",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_ayah || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "usia_ayah",
          title: "Usia",
          value: formDataUser.usia_ayah,
          type: "text",
          required: true,
        },
        {
          name: "pekerjaan_ayah",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_ayah,
          type: "text",
          required: true,
        },
        {
          name: "alamat_ayah",
          title: "Alamat",
          value: formDataUser.alamat_ayah,
          type: "text",
          required: true,
        },
        {
          name: "desa_ayah",
          title: "Desa",
          value: formDataUser.desa_ayah,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_ayah",
          title: "Kecamatan",
          value: formDataUser.kecamatan_ayah,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_ayah",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_ayah,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_ayah",
          title: "Provinsi",
          value: formDataUser.provinsi_ayah,
          type: "text",
          required: true,
        },
        {
          name: "kewarganegaraan_ayah",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_ayah,
          type: "options",
          placeholder: "Pilih Kewarganegaraan",
          options: [
            {
              id: "1",
              label: "WNI",
            },
            {
              id: "2",
              label: "WNA",
            },
          ],
          required: true,
        },
        {
          name: "kebangsaan_ayah",
          title: "Kebangsaan",
          value: formDataUser.kebangsaan_ayah,
          type: "text",
          required: true,
        },
      ],
    },
  ];
  return (
    <>
      {allforminput.map((item, index) => {
        return (
          <View key={index}>
            <Text
              style={[tw`font-bold text-gray-500 text-lg mb-5 text-center`]}
            >
              {item.header}
            </Text>
            {item.data.map((itemData, index) => {
              return (
                <GenerateInputForm
                  itemData={itemData}
                  key={index}
                  onChange={props.onChange}
                />
              );
            })}
          </View>
        );
      })}
    </>
  );
};
const RenderForm2 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Pelapor",
      data: [
        {
          name: "nama_lengkap_pelapor",
          title: "Nama Lengkap Pelapor",
          value: formDataUser.nama_lengkap_pelapor,
          type: "text",
          required: true,
        },
        {
          name: "nik_pelapor",
          title: "NIK Pelapor",
          value: formDataUser.nik_pelapor,
          type: "text",
          required: true,
        },
        {
          name: "usia_pelapor",
          title: "Usia Pelapor",
          value: formDataUser.usia_pelapor,
          type: "text",
          required: true,
        },
        {
          name: "jenis_kelamin_pelapor",
          title: "Jenis Kelamin Pelapor",
          value: formDataUser.jenis_kelamin_pelapor,
          type: "options",
          placeholder: "Pilih Jenis Kelamin",
          options: [
            {
              id: "1",
              label: "Laki-laki",
            },
            {
              id: "2",
              label: "Perempuan",
            },
          ],
          required: true,
        },
        {
          name: "pekerjaan_pelapor",
          title: "Pekerjaan Pelapor",
          value: formDataUser.pekerjaan_pelapor,
          type: "text",
          required: true,
        },
        {
          name: "alamat_pelapor",
          title: "Alamat Pelapor",
          value: formDataUser.alamat_pelapor,
          type: "text",
          required: true,
        },
        {
          name: "desa_pelapor",
          title: "Desa",
          value: formDataUser.desa_pelapor,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_pelapor",
          title: "Kecamatan",
          value: formDataUser.kecamatan_pelapor,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_pelapor",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_pelapor,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_pelapor",
          title: "Provinsi",
          value: formDataUser.provinsi_pelapor,
          type: "text",
          required: true,
        },
      ],
    },
    {
      header: "Data Saksi 1",
      data: [
        {
          name: "nama_saksi_satu",
          title: "Nama Lengkap",
          value: formDataUser.nama_saksi_satu,
          type: "text",
          required: true,
        },
        {
          name: "nik_saksi_satu",
          title: "NIK",
          value: formDataUser.nik_saksi_satu,
          type: "text",
          required: true,
        },
        {
          name: "usia_saksi_satu",
          title: "Usia",
          value: formDataUser.usia_saksi_satu,
          type: "text",
          required: true,
        },
        {
          name: "pekerjaan_saksi_satu",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_saksi_satu,
          type: "text",
          required: true,
        },
        {
          name: "alamat_saksi_satu",
          title: "Alamat",
          value: formDataUser.alamat_saksi_satu,
          type: "text",
          required: true,
        },
        {
          name: "desa_saksi_satu",
          title: "Desa",
          value: formDataUser.desa_saksi_satu,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_saksi_satu",
          title: "Kecamatan",
          value: formDataUser.kecamatan_saksi_satu,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_saksi_satu",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_saksi_satu,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_saksi_satu",
          title: "Provinsi",
          value: formDataUser.provinsi_saksi_satu,
          type: "text",
          required: true,
        },
      ],
    },
    {
      header: "Data Saksi 2",
      data: [
        {
          name: "nama_saksi_dua",
          title: "Nama Lengkap",
          value: formDataUser.nama_saksi_dua,
          type: "text",
          required: true,
        },
        {
          name: "nik_saksi_dua",
          title: "NIK",
          value: formDataUser.nik_saksi_dua,
          type: "text",
          required: true,
        },
        {
          name: "usia_saksi_dua",
          title: "Usia",
          value: formDataUser.usia_saksi_dua,
          type: "text",
          required: true,
        },
        {
          name: "pekerjaan_saksi_dua",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_saksi_dua,
          type: "text",
          required: true,
        },
        {
          name: "alamat_saksi_dua",
          title: "Alamat",
          value: formDataUser.alamat_saksi_dua,
          type: "text",
          required: true,
        },
        {
          name: "desa_saksi_dua",
          title: "Desa",
          value: formDataUser.desa_saksi_dua,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_saksi_dua",
          title: "Kecamatan",
          value: formDataUser.kecamatan_saksi_dua,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_saksi_dua",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_saksi_dua,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_saksi_dua",
          title: "Provinsi",
          value: formDataUser.provinsi_saksi_dua,
          type: "text",
          required: true,
        },
      ],
    },
  ];
  return (
    <>
      {allforminput.map((item, index) => {
        return (
          <View key={index}>
            <Text
              style={[tw`font-bold text-gray-500 text-lg mb-5 text-center`]}
            >
              {item.header}
            </Text>
            {item.data.map((itemData, index) => {
              return (
                <GenerateInputForm
                  itemData={itemData}
                  key={index}
                  onChange={props.onChange}
                />
              );
            })}
          </View>
        );
      })}
    </>
  );
};
const RenderForm3 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      data: [
        {
          name: "pengantar_rt",
          title: "Surat Pengantar RT/RW",
          description: "Foto Surat Pengantar RT/RW",
          value: formDataUser.pengantar_rt,
          type: "file",
          required: true,
        },
        {
          name: "surat_bidan_rs",
          title: "Surat dari Bidan/RS",
          description: "Foto Surat dari Bidan/RS",
          value: formDataUser.surat_bidan_rs,
          type: "file",
          required: true,
        },
        {
          name: "foto_kk",
          title: "Foto KK",
          description: "Foto KK",
          value: formDataUser.foto_kk,
          type: "file",
          required: true,
        },
        {
          name: "foto_3x4_ibu",
          title: "Foto 3x4 Ibu",
          description: "Foto 3x4 Ibu background warna merah",
          value: formDataUser.foto_3x4_ibu,
          type: "file",
          required: true,
        },
        {
          name: "foto_3x4_ayah",
          title: "Foto 3x4 Ayah",
          description: "Foto 3x4 Ayah background warna merah",
          value: formDataUser.foto_3x4_ayah,
          type: "file",
          required: true,
        },
      ],
    },
  ];
  return (
    <>
      {allforminput.map((item, index) => {
        return (
          <View key={index}>
            {item.data.map((itemData, index) => {
              return (
                <GenerateInputForm
                  itemData={itemData}
                  key={index}
                  onChange={props.onChange}
                />
              );
            })}
          </View>
        );
      })}
    </>
  );
};
export default function PermohonanKelahiranScreen() {
  const [formDataUser, setFormDataUser] = useState(initialState);
  const { accessToken, userInfo } = useSelector((state) => state.auth);
  const [slideIn, setSlideIn] = useState(0);
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  function handleUpload() {
    dispatch(setLoading(true));
    let formData = new FormData();
    for (const [key, value] of Object.entries(initialState)) {
      formData.append(key, String(formDataUser[key]));
    }
    formData.append("type", 16);
    for (const [key, value] of Object.entries(initialStateFile)) {
      if (formDataUser[value.name]) {
        formData.append(value.name, {
          uri: formDataUser[value.name].uri,
          type: "image/jpeg",
          name: formDataUser[value.name].uri.split("/")[
            formDataUser[value.name].uri.split("/").length - 1
          ],
        });
      } else {
        formData.append(value.name, null);
      }
    }
    apiUploadSuratWithPicture(accessToken, formData)
      .then((res) => {
        Navigation.navigate("HomeScreen");
        ToastAndroid.show("Data berhasil diupload", ToastAndroid.SHORT);
      })
      .catch((err) => {
        ToastAndroid.show("Data gagal diupload", ToastAndroid.SHORT);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }
  function onChange(key, value) {
    setFormDataUser({ ...formDataUser, [key]: value });
  }
  useEffect(() => {
    setFormDataUser({ ...initialState, ...userInfo });
  }, []);
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        console.log(slideIn);
        if (slideIn == 0) {
          Alert.alert("Mau kemana?", "Yakin mau keluar aplikasi?", [
            {
              text: "Gak jadi",
              onPress: () => null,
            },
            {
              text: "Iya",
              onPress: () => Navigation.goBack(),
            },
          ]);
          return true;
        } else {
          setSlideIn(slideIn - 1);
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [slideIn])
  );
  if (formDataUser) {
    return (
      <View style={[tw`bg-primary flex-1`]}>
        <RenderHeader />
        <View style={[GlobalCss.containerMarginX, tw`pb-5`]}>
          <CustomProgressBar data={DataProgress} active={slideIn + 1} />
        </View>
        <ScrollView
          style={[
            tw`bg-white rounded-2xl shadow-md`,
            GlobalCss.containerMarginX,
            GlobalCss.container,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {slideIn === 0 && (
            <RenderForm1
              onChange={onChange}
              formDataUser={formDataUser}
              setFormDataUser={setFormDataUser}
            />
          )}
          {slideIn === 1 && (
            <RenderForm2
              formDataUser={formDataUser}
              setFormDataUser={setFormDataUser}
              onChange={onChange}
            />
          )}
          {slideIn === 2 && (
            <RenderForm3
              formDataUser={formDataUser}
              setFormDataUser={setFormDataUser}
              onChange={onChange}
            />
          )}
          <View style={[tw`h-10 w-full`]} />
        </ScrollView>
        <ButtonBottom
          slideIn={slideIn}
          setSlideIn={setSlideIn}
          formDataUser={formDataUser}
          onPress={() => {
            if (slideIn < 2) {
              setSlideIn(slideIn + 1);
            } else {
              for (const [key, value] of Object.entries(initialState)) {
                if (formDataUser[key] == " ") {
                  ToastAndroid.show(
                    "Form : " + dataToString(key),
                    ToastAndroid.SHORT
                  );
                  return;
                }
              }
              handleUpload();
            }
          }}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}
