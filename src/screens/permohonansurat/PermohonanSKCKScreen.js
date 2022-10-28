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
      <CustomHeader title="Permohonan SKCK Polisi" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Data pemohon",
  },
  {
    name: "Data pendukung",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_lengkap: "",
  nomor_ktp: "",
  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  kwarganegaraan: "",
  agama: "",
  status_perkawinan: "",
  pekerjaan: "",
  pendidikan_terakhir: "",
  id_dusun: "",
  rt: "",
  rw: "",
  peruntukan_surat: "",
  // ===========================
  nama_lengkap_ortu_laki_laki: "",
  umur_ortu_laki_laki: "",
  agama_ortu_laki_laki: "",
  pekerjaan_ortu_laki_laki: "",
  id_dusun_ortu_laki_laki: "",
  rt_ortu_laki_laki: "",
  rw_ortu_laki_laki: "",
  alamat_ortu_laki_laki: "",
  nama_lengkap_ortu_perempuan: "",
  umur_ortu_perempuan: "",
  agama_ortu_perempuan: "",
  pekerjaan_ortu_perempuan: "",
  id_dusun_ortu_perempuan: "",
  rt_ortu_perempuan: "",
  rw_ortu_perempuan: "",
  alamat_ortu_perempuan: "",
};
const initialStateFile = [
  {
    name: "foto_ktp",
  },
  {
    name: "foto_4x6",
  },
  {
    name: "pengantar_rt",
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
          name: "jenis_kelamin",
          title: "Jenis Kelamin",
          value: formDataUser.jenis_kelamin,
          type: "options",
          placeholder: "Pilih Jenis Kelamin",
          required: true,
          options: [...optionJenisKelamin],
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
          name: "kewarganegaraan",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan,
          type: "options",
          placeholder: "Pilih Kewarganegaraan",
          required: true,
          options: [...optionKebangsaan],
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
          name: "status_perkawinan",
          title: "Status Perkawinan",
          value: formDataUser.status_perkawinan,
          type: "options",
          placeholder: "Pilih Status Perkawinan",
          required: true,
          options: [...optionKawin],
        },
        {
          name: "pekerjaan",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan,
          type: "text",
          required: true,
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
          name: "peruntukan_surat",
          title: "Peruntukan Surat",
          value: formDataUser.peruntukan_surat,
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
      header: "Data orang tua laki-laki",
      data: [
        {
          name: "nama_lengkap_ortu_laki_laki",
          title: "Nama Lengkap",
          value: formDataUser.nama_lengkap_ortu_laki_laki,
          type: "text",
          required: true,
        },
        {
          name: "umur_ortu_laki_laki",
          title: "Umur",
          value: formDataUser.umur_ortu_laki_laki,
          type: "numeric",
          required: true,
        },
        {
          name: "agama_ortu_laki_laki",
          title: "Agama",
          value: formDataUser.agama_ortu_laki_laki,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_ortu_laki_laki",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_ortu_laki_laki,
          type: "text",
          required: true,
        },
        {
          name: "id_dusun_ortu_laki_laki",
          title: "Dusun",
          value: formDataUser.id_dusun_ortu_laki_laki,
          type: "options",
          placeholder: "Pilih Dusun",
          required: true,
          options: [...optionDusun],
        },
        {
          name: "rt_ortu_laki_laki",
          title: "RT",
          value: formDataUser.rt_ortu_laki_laki,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_ortu_laki_laki",
          title: "RW",
          value: formDataUser.rw_ortu_laki_laki,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "alamat_ortu_laki_laki",
          title: "Alamat",
          value: formDataUser.alamat_ortu_laki_laki,
          type: "text",
          required: true,
        },
      ],
    },
    {
      header: "Data orang tua Perempuan",
      data: [
        {
          name: "nama_lengkap_ortu_perempuan",
          title: "Nama Lengkap",
          value: formDataUser.nama_lengkap_ortu_perempuan,
          type: "text",
          required: true,
        },
        {
          name: "umur_ortu_perempuan",
          title: "Umur",
          value: formDataUser.umur_ortu_perempuan,
          type: "numeric",
          required: true,
        },
        {
          name: "agama_ortu_perempuan",
          title: "Agama",
          value: formDataUser.agama_ortu_perempuan,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_ortu_perempuan",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_ortu_perempuan,
          type: "text",
          required: true,
        },
        {
          name: "id_dusun_ortu_perempuan",
          title: "Dusun",
          value: formDataUser.id_dusun_ortu_perempuan,
          type: "options",
          placeholder: "Pilih Dusun",
          required: true,
          options: [...optionDusun],
        },
        {
          name: "rt_ortu_perempuan",
          title: "RT",
          value: formDataUser.rt_ortu_perempuan,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_ortu_perempuan",
          title: "RW",
          value: formDataUser.rw_ortu_perempuan,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "alamat_ortu_perempuan",
          title: "Alamat",
          value: formDataUser.alamat_ortu_perempuan,
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
      data: [
        {
          name: "foto_ktp",
          title: "Foto KTP/KK",
          description: "Foto KTP Atau KK",
          value: formDataUser.foto_ktp,
          type: "file",
          required: true,
        },
        {
          name: "foto_4x6",
          title: "Foto 4x6",
          description: "Foto 4x6 dengan background merah",
          value: formDataUser.foto_4x6,
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

export default function PermohonanSKCKScreen() {
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
    formData.append("type", 1);
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
    console.log(key, value);
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
            <RenderForm2 onChange={onChange} formDataUser={formDataUser} />
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
              // for (const [key, value] of Object.entries(initialState)) {
              //   if (index == 14) break;
              //   if (!formDataUser[key]) {
              //     ToastAndroid.show(
              //       "Form masing kosong : " + dataToString(key),
              //       ToastAndroid.SHORT
              //     );
              //     return;
              //   }
              //   index++;
              // }
              setSlideIn(slideIn + 1);
            } else if (slideIn == 1) {
              let index = 0;
              // for (const [key, value] of Object.entries(initialState)) {
              //   if (index < 14) continue;
              //   if (!formDataUser[key]) {
              //     ToastAndroid.show(
              //       "Form masing kosong : " + dataToString(key),
              //       ToastAndroid.SHORT
              //     );
              //     return;
              //   }
              //   index++;
              // }
              setSlideIn(slideIn + 1);
            } else if (slideIn == 2) {
              // for (const [key, value] of Object.entries(initialStateFile)) {
              //   if (!formDataUser[value.name]) {
              //     ToastAndroid.show(
              //       "Form masing kosong : " + dataToString(value.name),
              //       ToastAndroid.SHORT
              //     );
              //     return;
              //   }
              // }
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
