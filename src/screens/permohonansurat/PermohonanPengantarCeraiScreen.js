import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
      <CustomHeader title="Pengantar Cerai" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Data suami",
  },
  {
    name: "Data istri",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_lengkap_suami: "",
  nomor_ktp_suami: "",
  tempat_lahir_suami: "",
  tanggal_lahir_suami: "",
  pekerjaan: "",
  agama_suami: "",
  id_dusun_suami: "",
  rt_suami: "",
  rw_suami: "",
  alamat_suami: "",
  nama_lengkap_istri: "",
  nomor_ktp_istri: "",
  tempat_lahir_istri: "",
  tanggal_lahir_istri: "",
  pekerjaan: "",
  agama_istri: "",
  id_dusun_istri: "",
  rt_istri: "",
  rw_istri: "",
  alamat_istri: "",
};
const initialStateFile = [
  {
    name: "foto_kk",
  },
  {
    name: "foto_ktp_suami",
  },
  {
    name: "foto_ktp_istri",
  },
  {
    name: "foto_buku_nikah_suami",
  },
  {
    name: "foto_buku_nikah_istri",
  },
  {
    name: "pengantar_rt",
  },
];
const RenderForm1 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data suami",
      data: [
        {
          name: "nama_lengkap_suami",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_suami,
          type: "text",
          required: true,
        },
        {
          name: "nomor_ktp_suami",
          title: "NIK",
          value: formDataUser.nomor_ktp_suami,
          type: "numeric",
          required: true,
        },
        {
          name: "tempat_lahir_suami",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_suami,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_suami",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_suami || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "pekerjaan_suami",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_suami,
          type: "text",
          required: true,
        },
        {
          name: "agama_suami",
          title: "Agama",
          value: formDataUser.agama_suami,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "id_dusun_suami",
          title: "Dusun",
          value: formDataUser.id_dusun_suami,
          type: "options",
          placeholder: "Pilih Dusun",
          required: true,
          options: [...optionDusun],
        },
        {
          name: "rt_suami",
          title: "RT",
          value: formDataUser.rt_suami,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_suami",
          title: "RW",
          value: formDataUser.rw_suami,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "alamat_suami",
          title: "Alamat",
          value: formDataUser.alamat_suami,
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
      header: "Data istri",
      data: [
        {
          name: "nama_lengkap_istri",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_istri,
          type: "text",
          required: true,
        },
        {
          name: "nomor_ktp_istri",
          title: "NIK",
          value: formDataUser.nomor_ktp_istri,
          type: "numeric",
          required: true,
        },
        {
          name: "tempat_lahir_istri",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_istri,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_istri",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_istri || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "pekerjaan_istri",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_istri,
          type: "text",
          required: true,
        },
        {
          name: "agama_istri",
          title: "Agama",
          value: formDataUser.agama_istri,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "id_dusun_istri",
          title: "Dusun",
          value: formDataUser.id_dusun_istri,
          type: "options",
          placeholder: "Pilih Dusun",
          required: true,
          options: [...optionDusun],
        },
        {
          name: "rt_istri",
          title: "RT",
          value: formDataUser.rt_istri,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_istri",
          title: "RW",
          value: formDataUser.rw_istri,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "alamat_istri",
          title: "Alamat",
          value: formDataUser.alamat_istri,
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
          name: "foto_kk",
          title: "Foto KK",
          description: "Foto KK",
          value: formDataUser.foto_kk,
          type: "file",
          required: true,
        },
        {
          name: "foto_ktp_suami",
          title: "Foto ktp suami",
          description: "Foto ktp suami",
          value: formDataUser.foto_ktp_suami,
          type: "file",
          required: true,
        },
        {
          name: "foto_ktp_istri",
          title: "Foto ktp istri",
          description: "Foto ktp istri",
          value: formDataUser.foto_ktp_istri,
          type: "file",
          required: true,
        },
        {
          name: "foto_buku_nikah_suami",
          title: "Foto buku nikah suami",
          description: "Foto buku nikah suami",
          value: formDataUser.foto_buku_nikah_suami,
          type: "file",
          required: true,
        },
        {
          name: "foto_buku_nikah_istri",
          title: "Foto buku nikah istri",
          description: "Foto buku nikah istri",
          value: formDataUser.foto_buku_nikah_istri,
          type: "file",
          required: true,
        },
        {
          name: "pengantar_rt",
          title: "Foto pengantar RT",
          description: "Foto  pengantar RT",
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
export default function PermohonanPengantarCeraiScreen() {
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
    formData.append("type", 8);
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
                if (index <= 10) {
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
