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
import {
  optionAgama,
  optionDusun,
  optionKebangsaan,
  optionMenerangkanKematian,
  optionRt,
  optionRw,
  optionSebabKematian,
} from "../../constants/Dummy";
import CustomInputTime from "../../components/generals/CustomInputTime";
import GenerateInputForm from "../../components/generals/GenerateInputForm";
import { dataToString } from "../../constants/Helper";
import { useDispatch } from "react-redux";
import { setLoading } from "../../features/loading/loadingSlice";
import ButtonBottom from "../../components/surat/ButtonBottom";
const RenderHeader = () => {
  return (
    <SafeAreaView style={[GlobalCss.containerPaddingX]}>
      <CustomHeader title="Permohonan Surat Kematian" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Data yang Meninggal",
  },
  {
    name: "Orang Tua",
  },
  {
    name: "Lainnya",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_kepala_keluarga: "",
  nomor_kartu_keluarga: "",
  // ==========================
  nama_meninggal: "",
  nik_meninggal: "",
  jenis_kelamin_meninggal: "",
  tempat_kelahiran: "",
  tanggal_lahir_bayi: "",
  agama_meninggal: "",
  pekerjaan_meninggal: "",
  alamat_meninggal: "",
  rt_meninggal: "",
  rw_meninggal: "",
  dusun_meninggal: "",
  anakke_meninggal: "",
  tanggal_kematian: "",
  pukul_kematian: "",
  sebab_kematian: "",
  tempat_kematian: "",
  yang_menerangkan: "",
  // ==========================
  nama_lengkap_ayah: "",
  nik_ayah: "",
  tanggal_lahir_ayah: "",
  usia_ayah: "",
  pekerjaan_ayah: "",
  alamat_ayah: "",
  rt_ayah: "",
  rw_ayah: "",
  dusun_ayah: "",
  desa_ayah: "",
  kecamatan_ayah: "",
  kabupaten_kota_ayah: "",
  provinsi_ayah: "",
  // ==========================
  nama_lengkap_ibu: "",
  nik_ibu: "",
  tanggal_lahir_ibu: "",
  usia_ibu: "",
  pekerjaan_ibu: "",
  alamat_ibu: "",
  rt_ibu: "",
  rw_ibu: "",
  dusun_ibu: "",
  desa_ibu: "",
  kecamatan_ibu: "",
  kabupaten_kota_ibu: "",
  provinsi_ibu: "",
  // ==========================
  nama_lengkap_pelapor: "",
  nik_pelapor: "",
  usia_pelapor: "",
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
};
const initialStateFile = [
  {
    name: "pengantar_rt",
  },
  {
    name: "foto_ktp",
  },
  {
    name: "foto_kk",
  },
];
const RenderForm1 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Umum",
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
          type: "numeric",
          required: true,
        },
      ],
    },
    {
      header: "Identitas yang Meninggal",
      data: [
        {
          name: "nama_meninggal",
          title: "Nama Lengkap",
          value: formDataUser.nama_meninggal,
          type: "text",
          required: true,
        },
        {
          name: "nik_meninggal",
          title: "NIK",
          value: formDataUser.nik_meninggal,
          type: "numeric",
          required: true,
        },
        {
          name: "jenis_kelamin_meninggal",
          title: "Jenis Kelamin",
          value: formDataUser.jenis_kelamin_meninggal,
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
          name: "tempat_kelahiran",
          title: "Tempat Kelahiran",
          value: formDataUser.tempat_kelahiran,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "agama_meninggal",
          title: "Agama",
          value: formDataUser.agama_meninggal,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_meninggal",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_meninggal,
          type: "text",
          required: true,
        },
        {
          name: "alamat_meninggal",
          title: "Alamat",
          value: formDataUser.alamat_meninggal,
          type: "text",
          required: true,
        },
        {
          name: "rt_meninggal",
          title: "RT",
          value: formDataUser.rt_meninggal,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_meninggal",
          title: "RW",
          value: formDataUser.rw_meninggal,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_meninggal",
          title: "Dusun",
          value: formDataUser.dusun_meninggal,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "anakke_meninggal",
          title: "Anak Ke-",
          value: formDataUser.anakke_meninggal,
          type: "numeric",
          required: true,
        },
      ],
    },
    {
      header: "Keterangan Meninggal",
      data: [
        {
          name: "tanggal_kematian",
          title: "Tanggal Kematian",
          value: formDataUser.tanggal_kematian || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "pukul_kematian",
          title: "Pukul",
          value: formDataUser.pukul_kematian || new Date(),
          type: "time",
          required: true,
        },
        {
          name: "sebab_kematian",
          title: "Sebab Kematian",
          value: formDataUser.sebab_kematian,
          type: "options",
          placeholder: "Pilih Sebab Kematian",
          options: [...optionSebabKematian],
          required: true,
        },
        {
          name: "tempat_kematian",
          title: "Tempat Kematian",
          value: formDataUser.tempat_kematian,
          type: "text",
          required: true,
        },
        {
          name: "yang_menerangkan",
          title: "Yang Menerangkan",
          value: formDataUser.yang_menerangkan,
          type: "options",
          placeholder: "Pilih Yang Menerangkan",
          options: [...optionMenerangkanKematian],
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
      header: "Data Ayah",
      data: [
        {
          name: "nama_lengkap_ayah",
          title: "Nama Lengkap",
          value: formDataUser.nama_lengkap_ayah,
          type: "text",
          required: true,
        },
        {
          name: "nik_ayah",
          title: "NIK",
          value: formDataUser.nik_ayah,
          type: "numeric",
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
          type: "numeric",
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
          name: "rt_ayah",
          title: "RT",
          value: formDataUser.rt_ayah,
          type: "numeric",
          required: true,
        },
        {
          name: "rw_ayah",
          title: "RW",
          value: formDataUser.rw_ayah,
          type: "numeric",
          required: true,
        },
        {
          name: "dusun_ayah",
          title: "Dusun",
          value: formDataUser.dusun_ayah,
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
      ],
    },
    {
      header: "Data Ibu",
      data: [
        {
          name: "nama_lengkap_ibu",
          title: "Nama Lengkap",
          value: formDataUser.nama_lengkap_ibu,
          type: "text",
          required: true,
        },
        {
          name: "nik_ibu",
          title: "NIK",
          value: formDataUser.nik_ibu,
          type: "numeric",
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
          type: "numeric",
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
          name: "rt_ibu",
          title: "RT",
          value: formDataUser.rt_ibu,
          type: "text",
          required: true,
        },
        {
          name: "rw_ibu",
          title: "RW",
          value: formDataUser.rw_ibu,
          type: "text",
          required: true,
        },
        {
          name: "dusun_ibu",
          title: "Dusun",
          value: formDataUser.dusun_ibu,
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
const RenderForm4 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Lampiran yang Meninggal",
      data: [
        {
          name: "kk_kematian",
          title: "Foto Kartu Keluarga (KK)",
          description: "Foto Kartu Keluarga (KK) yang Meninggal",
          value: formDataUser.kk_kematian,
          type: "file",
          required: true,
        },

        {
          name: "ktp_kematian",
          title: "Foto KTP",
          description: "Foto KTP orang yang meninggal",
          value: formDataUser.ktp_kematian,
          type: "file",
          required: true,
        },
        {
          name: "pengantar_rt_rw_kematian",
          title: "Foto Surat Pengantar RT/RW",
          description: "Foto Surat Pengantar RT/RW",
          value: formDataUser.pengantar_rt_rw_kematian,
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
export default function PermohonanKematianScreen() {
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
          {slideIn === 3 && (
            <RenderForm4
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
            if (slideIn < 3) {
              setSlideIn(slideIn + 1);
            } else {
              for (const [key, value] of Object.entries(initialState)) {
                if (!formDataUser[key]) {
                  ToastAndroid.show(
                    "Form : " + dataToString(key),
                    ToastAndroid.SHORT
                  );
                  return;
                }
              }
              for (const [key, value] of Object.entries(initialStateFile)) {
                if (!formDataUser[key]) {
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
