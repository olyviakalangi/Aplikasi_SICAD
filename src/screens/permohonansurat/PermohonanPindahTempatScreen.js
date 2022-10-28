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
      <CustomHeader title="Permohonan Kuasa" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Data Pengaju",
  },
  {
    name: "Alamat Pengaju",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_lengkap_pindah: "",
  nomor_ktp_pindah: "",
  tempat_lahir_pindah: "",
  tanggal_lahir_pindah: "",
  jenis_kelamin_pindah: "",
  agama_pindah: "",
  kewarganegaraan_pindah: "",
  pekerjaan_pindah: "",
  status_perkawinan_pindah: "",
  pendidikan_pindah: "",
  provinsi_lama: "",
  kabupaten_kota_lama: "",
  kecamatan_lama: "",
  desa_lama: "",
  dusun_lama: "",
  rt_lama: "",
  rw_lama: "",
  provinsi_baru: "",
  kabupaten_kota_baru: "",
  kecamatan_baru: "",
  desa_baru: "",
  dusun_baru: "",
  rt_baru: "",
  rw_baru: "",
  provinsi_baru: "",
  kabupaten_kota_baru: "",
  kecamatan_baru: "",
  desa_baru: "",
  dusun_baru: "",
  rt_baru: "",
  rw_baru: "",
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
          name: "nama_lengkap_pindah",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_pindah,
          type: "text",
          required: true,
        },
        {
          name: "nomor_ktp_pindah",
          title: "NIK",
          value: formDataUser.nomor_ktp_pindah,
          type: "numeric",
          required: true,
        },
        {
          name: "tempat_lahir_pindah",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_pindah,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_pindah",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_pindah || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "jenis_kelamin_pindah",
          title: "Jenis Kelamin",
          value: formDataUser.jenis_kelamin_pindah,
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
          name: "agama_pindah",
          title: "Agama",
          value: formDataUser.agama_pindah,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "kewarganegaraan_pindah",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_pindah,
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
          name: "pekerjaan_pindah",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_pindah,
          type: "text",
          required: true,
        },
        {
          name: "status_perkawinan_pindah",
          title: "Status Perkawinan",
          value: formDataUser.status_perkawinan_pindah,
          type: "options",
          placeholder: "Pilih Status Perkawinan",
          options: [...optionKawin],
          required: true,
        },
        {
          name: "pendidikan_pindah",
          title: "Pendidikan Terakhir",
          value: formDataUser.pendidikan_pindah,
          type: "options",
          placeholder: "Pilih Pendidikan Terakhir",
          options: [...optionPendidikan],
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
      header: "Alamat Lama",
      data: [
        {
          name: "provinsi_lama",
          title: "Provinsi",
          value: formDataUser.provinsi_lama,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_lama",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_lama,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_lama",
          title: "Kecamatan",
          value: formDataUser.kecamatan_lama,
          type: "text",
          required: true,
        },
        {
          name: "desa_lama",
          title: "Desa",
          value: formDataUser.desa_lama,
          type: "text",
          required: true,
        },
        {
          name: "dusun_lama",
          title: "Dusun",
          value: formDataUser.dusun_lama,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "rt_lama",
          title: "RT",
          value: formDataUser.rt_lama,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_lama",
          title: "RW",
          value: formDataUser.rw_lama,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
      ],
    },
    {
      header: "Alamat Baru",
      data: [
        {
          name: "provinsi_baru",
          title: "Provinsi",
          value: formDataUser.provinsi_baru,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_baru",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_baru,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_baru",
          title: "Kecamatan",
          value: formDataUser.kecamatan_baru,
          type: "text",
          required: true,
        },
        {
          name: "desa_baru",
          title: "Desa",
          value: formDataUser.desa_baru,
          type: "text",
          required: true,
        },
        {
          name: "dusun_baru",
          title: "Dusun",
          value: formDataUser.dusun_baru,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "rt_baru",
          title: "RT",
          value: formDataUser.rt_baru,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_baru",
          title: "RW",
          value: formDataUser.rw_baru,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
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
          description: "Foto KTP Asli",
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
export default function PermohonanPindahTempatScreen() {
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
    formData.append("type", 4);
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
                if (index >= 10) break;
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
                if (index >= 25) break;
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
