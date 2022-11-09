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
import { setLoading } from "../../features/loading/loadingSlice";
import { apiUploadSuratWithPicture } from "../../lib/api";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
const RenderHeader = () => {
  return (
    <SafeAreaView style={[GlobalCss.containerPaddingX]}>
      <CustomHeader title="Pengajuan Beasiswa" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Data pemohon",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_lengkap: "",
  nomor_ktp: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  jenis_kelamin: "",
  agama: "",
  kwarganegaraan: "",
  pekerjaan: "",
  status_perkawinan: "",
  pendidikan_terakhir: "",
  id_dusun: "",
  rt: "",
  rw: "",
  asal_sekolah: "",
  kelas_jurusan: "",
  tujuan_sekolah: "",
  nama_wali_murid: "",
  alamat_domisili: "",
};
const initialStateFile = [
  {
    name: "foto_ktp",
    file: "foto_ktp_file",
  },
  {
    name: "foto_kk",
    file: "foto_kk_file",
  },
  {
    name: "pengantar_rt",
    file: "pengantar_rt_file",
  },
];
const RenderForm1 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Pemohon",
      data: [
        {
          name: "nama_lengkap",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap,
          type: "text",
          required: true,
        },
        {
          name: "nomor_ktp",
          title: "NIK",
          value: formDataUser.nomor_ktp,
          type: "text",
          required: true,
        },
        {
          name: "tempat_lahir",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir,
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
          name: "jenis_kelamin",
          title: "Jenis Kelamin",
          value: formDataUser.jenis_kelamin,
          type: "options",
          placeholder: "Pilih Jenis Kelamin",
          required: true,
          options: [...optionJenisKelamin],
        },
        {
          name: "agama",
          title: "Agama",
          value: formDataUser.agama,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "kwarganegaraan",
          title: "Kewarganegaraan",
          value: formDataUser.kwarganegaraan,
          type: "options",
          placeholder: "Pilih Kewarganegaraan",
          required: true,
          options: [...optionKebangsaan],
        },
        {
          name: "pekerjaan",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan,
          type: "text",
          required: true,
        },
        {
          name: "status_perkawinan",
          title: "Status Perkawinan",
          value: formDataUser.status_perkawinan,
          type: "options",
          placeholder: "Pilih Status Perkawinan",
          required: true,
          options: [...optionKawin],
        },
        {
          name: "pendidikan_terakhir",
          title: "Pendidikan Terakhir",
          value: formDataUser.pendidikan_terakhir,
          type: "options",
          placeholder: "Pilih Pendidikan Terakhir",
          required: true,
          options: [...optionPendidikan],
        },
        {
          name: "id_dusun",
          title: "Dusun",
          value: formDataUser.id_dusun,
          type: "options",
          placeholder: "Pilih Dusun",
          required: true,
          options: [...optionDusun],
        },
        {
          name: "rt",
          title: "RT",
          value: formDataUser.rt,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw",
          title: "RW",
          value: formDataUser.rw,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "asal_sekolah",
          title: "Asal Sekolah",
          value: formDataUser.asal_sekolah,
          type: "text",
          required: true,
        },
        {
          name: "kelas_jurusan",
          title: "Kelas/Jurusan",
          value: formDataUser.kelas_jurusan,
          type: "text",
          required: true,
        },
        {
          name: "tujuan_sekolah",
          title: "Tujuan Sekolah",
          value: formDataUser.tujuan_sekolah,
          type: "text",
          required: true,
        },
        {
          name: "nama_wali_murid",
          title: "Nama Wali Murid",
          value: formDataUser.nama_wali_murid,
          type: "text",
          required: true,
        },
        {
          name: "alamat_domisili",
          title: "Alamat Domisili",
          value: formDataUser.alamat_domisili,
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
      data: [
        {
          name: "foto_ktp",
          title: "Foto KTP",
          description: "Foto Foto KTP",
          value: formDataUser.foto_ktp,
          type: "file",
          required: true,
        },
        {
          name: "foto_kk",
          title: "Foto KK",
          description: "Foto Foto KK",
          value: formDataUser.foto_kk,
          type: "file",
          required: true,
        },
        {
          name: "pengantar_rt",
          title: "Foto pengantar RT",
          description: "Foto Foto pengantar RT",
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
export default function PengajuanBeasiswaScreen() {
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
    formData.append("type", 18);
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
            <RenderForm2
              formDataUser={formDataUser}
              onChange={onChange}
              uploadKTP={() => uploadImageDynamic("foto_ktp", setFileKTP)}
              uploadKK={() => uploadImageDynamic("foto_kk", setFileKK)}
              uploadPengantarRT={() =>
                uploadImageDynamic("pengantar_rt", setFilePengantarRT)
              }
            />
          )}
          <View style={[tw`h-10 w-full`]} />
        </ScrollView>
        <ButtonBottom
          slideIn={slideIn}
          setSlideIn={setSlideIn}
          formDataUser={formDataUser}
          onPress={() => {
            if (slideIn == 0) {
              for (const [key, value] of Object.entries(initialState)) {
                if (!formDataUser[key]) {
                  ToastAndroid.show(
                    "Form masing kosong : " + dataToString(key),
                    ToastAndroid.SHORT
                  );
                  return;
                }
              }
              setSlideIn(slideIn + 1);
            } else if (slideIn == 1) {
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
