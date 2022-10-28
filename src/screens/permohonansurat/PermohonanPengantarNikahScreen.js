import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/generals/CustomButton";
import FormFileInput from "../../components/generals/FormFileInput";
import GenerateInputForm from "../../components/generals/GenerateInputForm";
import CustomHeader from "../../components/header/CustomHeader";
import CustomProgressBar from "../../components/progressbar/CustomProgressBar";
import ButtonBottom from "../../components/surat/ButtonBottom";
import {
  optionAgama,
  optionDusun,
  optionJenisKelamin,
  optionKawin,
  optionKebangsaan,
  optionPendidikan,
  optionRt,
  optionRw,
} from "../../constants/Dummy";
import { dataToString } from "../../constants/Helper";
import Icons from "../../constants/Icons";
import { setLoading } from "../../features/loading/loadingSlice";
import { apiUploadSuratWithPicture } from "../../lib/api";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
const RenderHeader = () => {
  return (
    <SafeAreaView style={[GlobalCss.containerPaddingX]}>
      <CustomHeader title="Pengantar Nikah" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Calon Mempelai",
  },
  {
    name: "Ortu Calon Suami",
  },
  {
    name: "Ortu Calon Istri",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_lengkap_calon_suami: "",
  nik_calon_suami: "",
  bin_calon_suami: "",
  nama_ayah_calon_suami: "",
  tempat_lahir_calon_suami: "",
  tanggal_lahir_calon_suami: "",
  kewarganegaraan_calon_suami: "",
  agama_calon_suami: "",
  pekerjaan_calon_suami: "",
  status_perkawinan_calon_suami: "",
  alamat_calon_suami: "",
  rt_calon_suami: "",
  rw_calon_suami: "",
  dusun_calon_suami: "",
  desa_calon_suami: "",
  kecamatan_calon_suami: "",
  kabupaten_kota_calon_suami: "",
  provinsi_calon_suami: "",
  nama_lengkap_calon_istri: "",
  nik_calon_istri: "",
  binti_calon_istri: "",
  nama_ayah_calon_istri: "",
  tempat_lahir_calon_istri: "",
  tanggal_lahir_calon_istri: "",
  kewarganegaraan_calon_istri: "",
  agama_calon_istri: "",
  pekerjaan_calon_istri: "",
  status_perkawinan_calon_istri: "",
  alamat_calon_istri: "",
  rt_calon_istri: "",
  rw_calon_istri: "",
  dusun_calon_istri: "",
  desa_calon_istri: "",
  kecamatan_calon_istri: "",
  kabupaten_kota_calon_istri: "",
  provinsi_calon_istri: "",
  nama_lengkap_ot_calon_suami_ayah: "",
  nik_ot_calon_suami_ayah: "",
  bin_ot_calon_suami_ayah: "",
  tempat_lahir_ot_calon_suami_ayah: "",
  tanggal_lahir_ot_calon_suami_ayah: "",
  kewarganegaraan_ot_calon_suami_ayah: "",
  agama_ot_calon_suami_ayah: "",
  pekerjaan_ot_calon_suami_ayah: "",
  status_kehidupan_ot_calon_suami_ayah: "",
  alamat_ot_calon_suami_ayah: "",
  rt_ot_calon_suami_ayah: "",
  rw_ot_calon_suami_ayah: "",
  dusun_ot_calon_suami_ayah: "",
  desa_ot_calon_suami_ayah: "",
  kecamatan_ot_calon_suami_ayah: "",
  kabupaten_kota_ot_calon_suami_ayah: "",
  provinsi_ot_calon_suami_ayah: "",
  nama_lengkap_ot_calon_suami_ibu: "",
  nik_ot_calon_suami_ibu: "",
  binti_ot_calon_suami_ibu: "",
  tempat_lahir_ot_calon_suami_ibu: "",
  tanggal_lahir_ot_calon_suami_ibu: "",
  kewarganegaraan_ot_calon_suami_ibu: "",
  agama_ot_calon_suami_ibu: "",
  pekerjaan_ot_calon_suami_ibu: "",
  status_kehidupan_ot_calon_suami_ibu: "",
  alamat_ot_calon_suami_ibu: "",
  rt_ot_calon_suami_ibu: "",
  rw_ot_calon_suami_ibu: "",
  dusun_ot_calon_suami_ibu: "",
  desa_ot_calon_suami_ibu: "",
  kecamatan_ot_calon_suami_ibu: "",
  kabupaten_kota_ot_calon_suami_ibu: "",
  provinsi_ot_calon_suami_ibu: "",
  nama_lengkap_ot_calon_istri_ayah: "",
  nik_ot_calon_istri_ayah: "",
  bin_ot_calon_istri_ayah: "",
  tempat_lahir_ot_calon_istri_ayah: "",
  tanggal_lahir_ot_calon_istri_ayah: "",
  kewarganegaraan_ot_calon_istri_ayah: "",
  agama_ot_calon_istri_ayah: "",
  pekerjaan_ot_calon_istri_ayah: "",
  status_kehidupan_ot_calon_istri_ayah: "",
  alamat_ot_calon_istri_ayah: "",
  rt_ot_calon_istri_ayah: "",
  rw_ot_calon_istri_ayah: "",
  dusun_ot_calon_istri_ayah: "",
  desa_ot_calon_istri_ayah: "",
  kecamatan_ot_calon_istri_ayah: "",
  kabupaten_kota_ot_calon_istri_ayah: "",
  provinsi_ot_calon_istri_ayah: "",
  nama_lengkap_ot_calon_istri_ibu: "",
  nik_ot_calon_istri_ibu: "",
  binti_ot_calon_istri_ibu: "",
  tempat_lahir_ot_calon_istri_ibu: "",
  tanggal_lahir_ot_calon_istri_ibu: "",
  kewarganegaraan_ot_calon_istri_ibu: "",
  agama_ot_calon_istri_ibu: "",
  pekerjaan_ot_calon_istri_ibu: "",
  status_kehidupan_ot_calon_istri_ibu: "",
  alamat_ot_calon_istri_ibu: "",
  rt_ot_calon_istri_ibu: "",
  rw_ot_calon_istri_ibu: "",
  dusun_ot_calon_istri_ibu: "",
  desa_ot_calon_istri_ibu: "",
  kecamatan_ot_calon_istri_ibu: "",
  kabupaten_kota_ot_calon_istri_ibu: "",
  provinsi_ot_calon_istri_ibu: "",
};
const initialStateFile = [
  {
    name: "foto_2x3_suami",
  },
  {
    name: "foto_2x3_istri",
  },
  {
    name: "kk_suami",
  },
  {
    name: "kk_istri",
  },
  {
    name: "ktp_suami",
  },
  {
    name: "ktp_istri",
  },
  {
    name: "pengantar_rt",
  },
];
const RenderForm1 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Calon Suami",
      data: [
        {
          name: "nama_lengkap_calon_suami",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_calon_suami,
          type: "text",
          required: true,
        },
        {
          name: "nik_calon_suami",
          title: "NIK",
          value: formDataUser.nik_calon_suami,
          type: "numeric",
          required: true,
        },
        {
          name: "bin_calon_suami",
          title: "Binti",
          value: formDataUser.bin_calon_suami,
          type: "text",
          required: true,
        },
        {
          name: "nama_ayah_calon_suami",
          title: "Nama  Ayah",
          value: formDataUser.nama_ayah_calon_suami,
          type: "text",
          required: true,
        },
        {
          name: "tempat_lahir_calon_suami",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_calon_suami,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_calon_suami",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_calon_suami || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "kewarganegaraan_calon_suami",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_calon_suami,
          type: "options",
          placeholder: "Pilih Jenis Kewarganegaraan",
          options: [...optionKebangsaan],
          required: true,
        },
        {
          name: "agama_calon_suami",
          title: "Agama",
          value: formDataUser.agama_calon_suami,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_calon_suami",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_calon_suami,
          type: "text",
          required: true,
        },
        {
          name: "status_perkawinan_calon_suami",
          title: "Status Perkawinan",
          value: formDataUser.status_perkawinan_calon_suami,
          type: "options",
          placeholder: "Pilih Status Perkawinan",
          options: [
            {
              id: "1",
              label: "Jejaka",
            },
            {
              id: "2",
              label: "Duda",
            },
            {
              id: "3",
              label: "Beristri ke 1",
            },
            {
              id: "4",
              label: "Beristri ke 2",
            },
            {
              id: "5",
              label: "Beristri ke 3",
            },
            {
              id: "6",
              label: "Beristri ke 4",
            },
          ],
          required: true,
        },
        {
          name: "alamat_calon_suami",
          title: "Alamat",
          value: formDataUser.alamat_calon_suami,
          type: "text",
          required: true,
        },
        {
          name: "rt_calon_suami",
          title: "RT",
          value: formDataUser.rt_calon_suami,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_calon_suami",
          title: "RW",
          value: formDataUser.rw_calon_suami,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_calon_suami",
          title: "Dusun",
          value: formDataUser.dusun_calon_suami,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "desa_calon_suami",
          title: "Desa",
          value: formDataUser.desa_calon_suami,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_calon_suami",
          title: "Kecamatan",
          value: formDataUser.kecamatan_calon_suami,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_calon_suami",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_calon_suami,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_calon_suami",
          title: "Provinsi",
          value: formDataUser.provinsi_calon_suami,
          type: "text",
          required: true,
        },
      ],
    },
    {
      header: "Data Calon Istri",
      data: [
        {
          name: "nama_lengkap_calon_istri",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_calon_istri,
          type: "text",
          required: true,
        },
        {
          name: "nik_calon_istri",
          title: "NIK",
          value: formDataUser.nik_calon_istri,
          type: "numeric",
          required: true,
        },
        {
          name: "binti_calon_istri",
          title: "Binti",
          value: formDataUser.binti_calon_istri,
          type: "text",
          required: true,
        },
        {
          name: "nama_ayah_calon_istri",
          title: "Nama  Ayah",
          value: formDataUser.nama_ayah_calon_istri,
          type: "text",
          required: true,
        },
        {
          name: "tempat_lahir_calon_istri",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_calon_istri,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_calon_istri",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_calon_istri || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "kewarganegaraan_calon_istri",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_calon_istri,
          type: "options",
          placeholder: "Pilih Jenis Kewarganegaraan",
          options: [...optionKebangsaan],
          required: true,
        },
        {
          name: "agama_calon_istri",
          title: "Agama",
          value: formDataUser.agama_calon_istri,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_calon_istri",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_calon_istri,
          type: "text",
          required: true,
        },
        {
          name: "status_perkawinan_calon_istri",
          title: "Status Perkawinan",
          value: formDataUser.status_perkawinan_calon_istri,
          type: "options",
          placeholder: "Pilih Status Perkawinan",
          options: [
            {
              id: "1",
              label: "Perawan",
            },
            {
              id: "2",
              label: "Janda",
            },
          ],
          required: true,
        },
        {
          name: "alamat_calon_istri",
          title: "Alamat",
          value: formDataUser.alamat_calon_istri,
          type: "text",
          required: true,
        },
        {
          name: "rt_calon_istri",
          title: "RT",
          value: formDataUser.rt_calon_istri,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_calon_istri",
          title: "RW",
          value: formDataUser.rw_calon_istri,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_calon_istri",
          title: "Dusun",
          value: formDataUser.dusun_calon_istri,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "desa_calon_istri",
          title: "Desa",
          value: formDataUser.desa_calon_istri,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_calon_istri",
          title: "Kecamatan",
          value: formDataUser.kecamatan_calon_istri,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_calon_istri",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_calon_istri,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_calon_istri",
          title: "Provinsi",
          value: formDataUser.provinsi_calon_istri,
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
          <>
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
          </>
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
          name: "nama_lengkap_ot_calon_suami_ayah",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_ot_calon_suami_ayah,
          type: "text",
          required: true,
        },
        {
          name: "nik_ot_calon_suami_ayah",
          title: "NIK",
          value: formDataUser.nik_ot_calon_suami_ayah,
          type: "numeric",
          required: true,
        },
        {
          name: "bin_ot_calon_suami_ayah",
          title: "Bin",
          value: formDataUser.bin_ot_calon_suami_ayah,
          type: "text",
          required: true,
        },
        {
          name: "tempat_lahir_ot_calon_suami_ayah",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_ot_calon_suami_ayah,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_ot_calon_suami_ayah",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_ot_calon_suami_ayah || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "kewarganegaraan_ot_calon_suami_ayah",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_ot_calon_suami_ayah,
          type: "options",
          placeholder: "Pilih Jenis Kewarganegaraan",
          options: [...optionKebangsaan],
          required: true,
        },
        {
          name: "agama_ot_calon_suami_ayah",
          title: "Agama",
          value: formDataUser.agama_ot_calon_suami_ayah,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_ot_calon_suami_ayah",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_ot_calon_suami_ayah,
          type: "text",
          required: true,
        },
        {
          name: "status_kehidupan_ot_calon_suami_ayah",
          title: "Status Kehidupan",
          value: formDataUser.status_kehidupan_ot_calon_suami_ayah,
          type: "options",
          placeholder: "Pilih Status Kehidupan",
          options: [
            {
              id: "1",
              label: "Hidup",
            },
            {
              id: "2",
              label: "Meninggal Dunia",
            },
          ],
          required: true,
        },
        {
          name: "alamat_ot_calon_suami_ayah",
          title: "Alamat",
          value: formDataUser.alamat_ot_calon_suami_ayah,
          type: "text",
          required: true,
        },
        {
          name: "rt_ot_calon_suami_ayah",
          title: "RT",
          value: formDataUser.rt_ot_calon_suami_ayah,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_ot_calon_suami_ayah",
          title: "RW",
          value: formDataUser.rw_ot_calon_suami_ayah,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_ot_calon_suami_ayah",
          title: "Dusun",
          value: formDataUser.dusun_ot_calon_suami_ayah,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "desa_ot_calon_suami_ayah",
          title: "Desa",
          value: formDataUser.desa_ot_calon_suami_ayah,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_ot_calon_suami_ayah",
          title: "Kecamatan",
          value: formDataUser.kecamatan_ot_calon_suami_ayah,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_ot_calon_suami_ayah",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_ot_calon_suami_ayah,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_ot_calon_suami_ayah",
          title: "Provinsi",
          value: formDataUser.provinsi_ot_calon_suami_ayah,
          type: "text",
          required: true,
        },
      ],
    },
    {
      header: "Data Ibu",
      data: [
        {
          name: "nama_lengkap_ot_calon_suami_ibu",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_ot_calon_suami_ibu,
          type: "text",
          required: true,
        },
        {
          name: "nik_ot_calon_suami_ibu",
          title: "NIK",
          value: formDataUser.nik_ot_calon_suami_ibu,
          type: "numeric",
          required: true,
        },
        {
          name: "binti_ot_calon_suami_ibu",
          title: "Binti",
          value: formDataUser.binti_ot_calon_suami_ibu,
          type: "text",
          required: true,
        },
        {
          name: "tempat_lahir_ot_calon_suami_ibu",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_ot_calon_suami_ibu,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_ot_calon_suami_ibu",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_ot_calon_suami_ibu || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "kewarganegaraan_ot_calon_suami_ibu",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_ot_calon_suami_ibu,
          type: "options",
          placeholder: "Pilih Jenis Kewarganegaraan",
          options: [...optionKebangsaan],
          required: true,
        },
        {
          name: "agama_ot_calon_suami_ibu",
          title: "Agama",
          value: formDataUser.agama_ot_calon_suami_ibu,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_ot_calon_suami_ibu",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_ot_calon_suami_ibu,
          type: "text",
          required: true,
        },
        {
          name: "status_kehidupan_ot_calon_suami_ibu",
          title: "Status Kehidupan",
          value: formDataUser.status_kehidupan_ot_calon_suami_ibu,
          type: "options",
          placeholder: "Pilih Status Kehidupan",
          options: [
            {
              id: "1",
              label: "Hidup",
            },
            {
              id: "2",
              label: "Meninggal Dunia",
            },
          ],
          required: true,
        },
        {
          name: "alamat_ot_calon_suami_ibu",
          title: "Alamat",
          value: formDataUser.alamat_ot_calon_suami_ibu,
          type: "text",
          required: true,
        },
        {
          name: "rt_ot_calon_suami_ibu",
          title: "RT",
          value: formDataUser.rt_ot_calon_suami_ibu,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_ot_calon_suami_ibu",
          title: "RW",
          value: formDataUser.rw_ot_calon_suami_ibu,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_ot_calon_suami_ibu",
          title: "Dusun",
          value: formDataUser.dusun_ot_calon_suami_ibu,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "desa_ot_calon_suami_ibu",
          title: "Desa",
          value: formDataUser.desa_ot_calon_suami_ibu,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_ot_calon_suami_ibu",
          title: "Kecamatan",
          value: formDataUser.kecamatan_ot_calon_suami_ibu,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_ot_calon_suami_ibu",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_ot_calon_suami_ibu,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_ot_calon_suami_ibu",
          title: "Provinsi",
          value: formDataUser.provinsi_ot_calon_suami_ibu,
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
          <>
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
          </>
        );
      })}
    </>
  );
};
const RenderForm3 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Ayah",
      data: [
        {
          name: "nama_lengkap_ot_calon_istri_ayah",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_ot_calon_istri_ayah,
          type: "text",
          required: true,
        },
        {
          name: "nik_ot_calon_istri_ayah",
          title: "NIK",
          value: formDataUser.nik_ot_calon_istri_ayah,
          type: "numeric",
          required: true,
        },
        {
          name: "bin_ot_calon_istri_ayah",
          title: "Bin",
          value: formDataUser.bin_ot_calon_istri_ayah,
          type: "text",
          required: true,
        },
        {
          name: "tempat_lahir_ot_calon_istri_ayah",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_ot_calon_istri_ayah,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_ot_calon_istri_ayah",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_ot_calon_istri_ayah || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "kewarganegaraan_ot_calon_istri_ayah",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_ot_calon_istri_ayah,
          type: "options",
          placeholder: "Pilih Jenis Kewarganegaraan",
          options: [...optionKebangsaan],
          required: true,
        },
        {
          name: "agama_ot_calon_istri_ayah",
          title: "Agama",
          value: formDataUser.agama_ot_calon_istri_ayah,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_ot_calon_istri_ayah",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_ot_calon_istri_ayah,
          type: "text",
          required: true,
        },
        {
          name: "status_kehidupan_ot_calon_istri_ayah",
          title: "Status Kehidupan",
          value: formDataUser.status_kehidupan_ot_calon_istri_ayah,
          type: "options",
          placeholder: "Pilih Status Kehidupan",
          options: [
            {
              id: "1",
              label: "Hidup",
            },
            {
              id: "2",
              label: "Meninggal Dunia",
            },
          ],
          required: true,
        },
        {
          name: "alamat_ot_calon_istri_ayah",
          title: "Alamat",
          value: formDataUser.alamat_ot_calon_istri_ayah,
          type: "text",
          required: true,
        },
        {
          name: "rt_ot_calon_istri_ayah",
          title: "RT",
          value: formDataUser.rt_ot_calon_istri_ayah,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_ot_calon_istri_ayah",
          title: "RW",
          value: formDataUser.rw_ot_calon_istri_ayah,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_ot_calon_istri_ayah",
          title: "Dusun",
          value: formDataUser.dusun_ot_calon_istri_ayah,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "desa_ot_calon_istri_ayah",
          title: "Desa",
          value: formDataUser.desa_ot_calon_istri_ayah,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_ot_calon_istri_ayah",
          title: "Kecamatan",
          value: formDataUser.kecamatan_ot_calon_istri_ayah,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_ot_calon_istri_ayah",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_ot_calon_istri_ayah,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_ot_calon_istri_ayah",
          title: "Provinsi",
          value: formDataUser.provinsi_ot_calon_istri_ayah,
          type: "text",
          required: true,
        },
      ],
    },
    {
      header: "Data Ibu",
      data: [
        {
          name: "nama_lengkap_ot_calon_istri_ibu",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_ot_calon_istri_ibu,
          type: "text",
          required: true,
        },
        {
          name: "nik_ot_calon_istri_ibu",
          title: "NIK",
          value: formDataUser.nik_ot_calon_istri_ibu,
          type: "numeric",
          required: true,
        },
        {
          name: "binti_ot_calon_istri_ibu",
          title: "Binti",
          value: formDataUser.binti_ot_calon_istri_ibu,
          type: "text",
          required: true,
        },
        {
          name: "tempat_lahir_ot_calon_istri_ibu",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_ot_calon_istri_ibu,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_ot_calon_istri_ibu",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_ot_calon_istri_ibu || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "kewarganegaraan_ot_calon_istri_ibu",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_ot_calon_istri_ibu,
          type: "options",
          placeholder: "Pilih Jenis Kewarganegaraan",
          options: [...optionKebangsaan],
          required: true,
        },
        {
          name: "agama_ot_calon_istri_ibu",
          title: "Agama",
          value: formDataUser.agama_ot_calon_istri_ibu,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_ot_calon_istri_ibu",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_ot_calon_istri_ibu,
          type: "text",
          required: true,
        },
        {
          name: "status_kehidupan_ot_calon_istri_ibu",
          title: "Status Kehidupan",
          value: formDataUser.status_kehidupan_ot_calon_istri_ibu,
          type: "options",
          placeholder: "Pilih Status Kehidupan",
          options: [
            {
              id: "1",
              label: "Hidup",
            },
            {
              id: "2",
              label: "Meninggal Dunia",
            },
          ],
          required: true,
        },
        {
          name: "alamat_ot_calon_istri_ibu",
          title: "Alamat",
          value: formDataUser.alamat_ot_calon_istri_ibu,
          type: "text",
          required: true,
        },
        {
          name: "rt_ot_calon_istri_ibu",
          title: "RT",
          value: formDataUser.rt_ot_calon_istri_ibu,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_ot_calon_istri_ibu",
          title: "RW",
          value: formDataUser.rw_ot_calon_istri_ibu,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_ot_calon_istri_ibu",
          title: "Dusun",
          value: formDataUser.dusun_ot_calon_istri_ibu,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "desa_ot_calon_istri_ibu",
          title: "Desa",
          value: formDataUser.desa_ot_calon_istri_ibu,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_ot_calon_istri_ibu",
          title: "Kecamatan",
          value: formDataUser.kecamatan_ot_calon_istri_ibu,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_ot_calon_istri_ibu",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_ot_calon_istri_ibu,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_ot_calon_istri_ibu",
          title: "Provinsi",
          value: formDataUser.provinsi_ot_calon_istri_ibu,
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
          <>
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
          </>
        );
      })}
    </>
  );
};
const RenderForm4 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Final",
      data: [
        {
          name: "foto_2x3_suami",
          title: "Foto 2x3 Suami",
          description: "Foto 2x3 Suami",
          value: formDataUser.foto_2x3_suami,
          type: "file",
          required: true,
        },
        {
          name: "foto_2x3_istri",
          title: "Foto 2x3 Istri",
          description: "Foto 2x3 Istri",
          value: formDataUser.foto_2x3_istri,
          type: "file",
          required: true,
        },
        {
          name: "kk_suami",
          title: "Kartu Keluarga Suami",
          description: "Kartu Keluarga Suami",
          value: formDataUser.kk_suami,
          type: "file",
          required: true,
        },
        {
          name: "kk_istri",
          title: "Kartu Keluarga Istri",
          description: "Kartu Keluarga Istri",
          value: formDataUser.kk_istri,
          type: "file",
          required: true,
        },
        {
          name: "ktp_suami",
          title: "KTP Suami",
          description: "KTP Suami",
          value: formDataUser.ktp_suami,
          type: "file",
          required: true,
        },
        {
          name: "ktp_istri",
          title: "KTP Istri",
          description: "KTP Istri",
          value: formDataUser.ktp_istri,
          type: "file",
          required: true,
        },
        {
          name: "pengantar_rt",
          title: "Surat Pengantar RT",
          description: "Foto Surat Pengantar RT",
          value: formDataUser.pengantar_rt,
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
export default function PermohonanPengantarNikahScreen() {
  const [formDataUser, setFormDataUser] = useState(initialState);
  const { accessToken, userInfo } = useSelector((state) => state.auth);
  const [slideIn, setSlideIn] = useState(0);
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  async function handleUpload() {
    dispatch(setLoading(true));
    let formData = new FormData();
    for (const [key, value] of Object.entries(initialState)) {
      formData.append(key, String(formDataUser[key]));
    }
    formData.append("type", 7);
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
  async function uploadImageDynamic(key, file) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.cancelled) {
      setFormDataUser({ ...formDataUser, [key]: result.uri });
      file(result);
    }
  }
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
            <RenderForm1 onChange={onChange} formDataUser={formDataUser} />
          )}
          {slideIn === 1 && (
            <RenderForm2 formDataUser={formDataUser} onChange={onChange} />
          )}
          {slideIn === 2 && (
            <RenderForm3 formDataUser={formDataUser} onChange={onChange} />
          )}
          {slideIn === 3 && (
            <RenderForm4 formDataUser={formDataUser} onChange={onChange} />
          )}
          <View style={[tw`h-10 w-full`]} />
        </ScrollView>
        <ButtonBottom
          slideIn={slideIn}
          setSlideIn={setSlideIn}
          formDataUser={formDataUser}
          onPress={() => {
            if (slideIn == 0) {
              let index = 0;
              for (const [key, value] of Object.entries(initialState)) {
                if (index >= 36) break;
                if (!formDataUser[key]) {
                  ToastAndroid.show(
                    "Form masing kosong : " + dataToString(key),
                    ToastAndroid.SHORT
                  );
                  return;
                }
                index++;
              }
              setSlideIn(slideIn + 1);
            } else if (slideIn == 1) {
              let index = 0;
              for (const [key, value] of Object.entries(initialState)) {
                if (index < 70 && index > 35) {
                  if (!formDataUser[key]) {
                    ToastAndroid.show(
                      "Form masing kosong : " + dataToString(key),
                      ToastAndroid.SHORT
                    );
                    return;
                  }
                }
                index++;
              }
              setSlideIn(slideIn + 1);
            } else if (slideIn == 2) {
              let index = 0;
              for (const [key, value] of Object.entries(initialState)) {
                if (index > 69) {
                  if (!formDataUser[key]) {
                    ToastAndroid.show(
                      "Form masing kosong : " + dataToString(key),
                      ToastAndroid.SHORT
                    );
                    return;
                  }
                }
                index++;
              }
              setSlideIn(slideIn + 1);
            } else {
              for (const [key, value] of Object.entries(initialStateFile)) {
                if (!formDataUser[value.name]) {
                  ToastAndroid.show(
                    "Form masing kosong : " + dataToString(value.name),
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
