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
      <CustomHeader title="Permohonan Hubungan Keluarga" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Data Pengaju",
  },
  {
    name: "Data Pemberi Keterangan",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_lengkap_pengajuhk: "",
  nomor_ktp_pengajuhk: "",
  tempat_lahir_pengajuhk: "",
  tanggal_lahir_pengajuhk: "",
  jenis_kelamin_pengajuhk: "",
  agama_pengajuhk: "",
  kewarganegaraan_pengajuhk: "",
  pekerjaan_pengajuhk: "",
  status_perkawinan_pengajuhk: "",
  alamat_pengajuhk: "",
  rt_pengajuhk: "",
  rw_pengajuhk: "",
  dusun_pengajuhk: "",
  desa_pengajuhk: "",
  kecamatan_pengajuhk: "",
  kabupaten_kota_pengajuhk: "",
  provinsi_pengajuhk: "",
  nama_lengkap_pk: "",
  nomor_ktp_pk: "",
  tempat_lahir_pk: "",
  tanggal_lahir_pk: "",
  jenis_kelamin_pk: "",
  agama_pk: "",
  kewarganegaraan_pk: "",
  pekerjaan_pk: "",
  status_perkawinan_pk: "",
  alamat_pk: "",
  rt_pk: "",
  rw_pk: "",
  dusun_pk: "",
  desa_pk: "",
  kecamatan_pk: "",
  kabupaten_kota_pk: "",
  provinsi_pk: "",
};
const initialStateFile = [
  {
    name: "foto_kk",
  },
  {
    name: "foto_ktp",
  },
  {
    name: "pengantar_rt",
  },
];
const RenderForm1 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Pengaju",
      data: [
        {
          name: "nama_lengkap_pengajuhk",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_pengajuhk,
          type: "text",
          required: true,
        },
        {
          name: "nomor_ktp_pengajuhk",
          title: "NIK",
          value: formDataUser.nomor_ktp_pengajuhk,
          type: "numeric",
          required: true,
        },
        {
          name: "tempat_lahir_pengajuhk",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_pengajuhk,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_pengajuhk",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_pengajuhk || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "jenis_kelamin_pengajuhk",
          title: "Jenis Kelamin",
          value: formDataUser.jenis_kelamin_pengajuhk,
          type: "options",
          placeholder: "Pilih Jenis Kelamin",
          options: [...optionJenisKelamin],
          required: true,
        },
        {
          name: "agama_pengajuhk",
          title: "Agama",
          value: formDataUser.agama_pengajuhk,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "kewarganegaraan_pengajuhk",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_pengajuhk,
          type: "options",
          placeholder: "Pilih Jenis Kewarganegaraan",
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
          name: "pekerjaan_pengajuhk",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_pengajuhk,
          type: "text",
          required: true,
        },
        {
          name: "status_perkawinan_pengajuhk",
          title: "Status Perkawinan",
          value: formDataUser.status_perkawinan_pengajuhk,
          type: "options",
          placeholder: "Pilih Status Perkawinan",
          options: [...optionKawin],
          required: true,
        },
        {
          name: "alamat_pengajuhk",
          title: "Alamat",
          value: formDataUser.alamat_pengajuhk,
          type: "text",
          required: true,
        },
        {
          name: "rt_pengajuhk",
          title: "RT",
          value: formDataUser.rt_pengajuhk,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_pengajuhk",
          title: "RW",
          value: formDataUser.rw_pengajuhk,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_pengajuhk",
          title: "Dusun",
          value: formDataUser.dusun_pengajuhk,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "desa_pengajuhk",
          title: "Desa",
          value: formDataUser.desa_pengajuhk,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_pengajuhk",
          title: "Kecamatan",
          value: formDataUser.kecamatan_pengajuhk,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_pengajuhk",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_pengajuhk,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_pengajuhk",
          title: "Provinsi",
          value: formDataUser.provinsi_pengajuhk,
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
      header: "Data Pemberi Keterangan",
      data: [
        {
          name: "nama_lengkap_pk",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_pk,
          type: "text",
          required: true,
        },
        {
          name: "nomor_ktp_pk",
          title: "NIK",
          value: formDataUser.nomor_ktp_pk,
          type: "numeric",
          required: true,
        },
        {
          name: "tempat_lahir_pk",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_pk,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_pk",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_pk || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "jenis_kelamin_pk",
          title: "Jenis Kelamin",
          value: formDataUser.jenis_kelamin_pk,
          type: "options",
          placeholder: "Pilih Jenis Kelamin",
          options: [...optionJenisKelamin],
          required: true,
        },
        {
          name: "agama_pk",
          title: "Agama",
          value: formDataUser.agama_pk,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "kewarganegaraan_pk",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_pk,
          type: "options",
          placeholder: "Pilih Jenis Kewarganegaraan",
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
          name: "pekerjaan_pk",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_pk,
          type: "text",
          required: true,
        },
        {
          name: "status_perkawinan_pk",
          title: "Status Perkawinan",
          value: formDataUser.status_perkawinan_pk,
          type: "options",
          placeholder: "Pilih Status Perkawinan",
          options: [...optionKawin],
          required: true,
        },
        {
          name: "alamat_pk",
          title: "Alamat",
          value: formDataUser.alamat_pk,
          type: "text",
          required: true,
        },
        {
          name: "rt_pk",
          title: "RT",
          value: formDataUser.rt_pk,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_pk",
          title: "RW",
          value: formDataUser.rw_pk,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_pk",
          title: "Dusun",
          value: formDataUser.dusun_pk,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "desa_pk",
          title: "Desa",
          value: formDataUser.desa_pk,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_pk",
          title: "Kecamatan",
          value: formDataUser.kecamatan_pk,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_pk",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_pk,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_pk",
          title: "Provinsi",
          value: formDataUser.provinsi_pk,
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
      header: "Final",
      data: [
        {
          name: "foto_kk",
          title: "Foto KK Asli",
          description: "Foto KK Asli",
          value: formDataUser.foto_kk,
          type: "file",
          required: true,
        },
        {
          name: "foto_ktp",
          title: "Foto KTP",
          description: "Foto KTP Asli",
          value: formDataUser.foto_ktp,
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
export default function PermohonanHubunganKeluargaScreen() {
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
    formData.append("type", 5);
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
                console.log(key, index);
                if (index >= 17) break;
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
                if (index < 11) break;
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
