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
    name: "Data Pemberi",
  },
  {
    name: "Data Penerima",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_lengkap_pemberi: "",
  nomor_ktp_pemberi: "",
  tempat_lahir_pemberi: "",
  tanggal_lahir_pemberi: "",
  umur_pemberi: "",
  agama_pemberi: "",
  pekerjaan_pemberi: "",
  id_dusun_pemberi: "",
  rt_pemberi: "",
  rw_pemberi: "",
  alamat_pemberi: "",
  nama_lengkap_penerima: "",
  nomor_ktp_penerima: "",
  tempat_lahir_penerima: "",
  tanggal_lahir_penerima: "",
  umur_penerima: "",
  agama_penerima: "",
  pekerjaan_penerima: "",
  id_dusun_penerima: "",
  rt_penerima: "",
  rw_penerima: "",
  alamat_penerima: "",
};
const initialStateFile = [
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
      header: "Data Pemberi",
      data: [
        {
          name: "nama_lengkap_pemberi",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_pemberi,
          type: "text",
          required: true,
        },
        {
          name: "nomor_ktp_pemberi",
          title: "NIK",
          value: formDataUser.nomor_ktp_pemberi,
          type: "numeric",
          required: true,
        },
        {
          name: "tempat_lahir_pemberi",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_pemberi,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_pemberi",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_pemberi || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "umur_pemberi",
          title: "Umur",
          value: formDataUser.umur_pemberi,
          type: "text",
          required: true,
        },
        {
          name: "agama_pemberi",
          title: "Agama",
          value: formDataUser.agama_pemberi,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_pemberi",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_pemberi,
          type: "text",
          required: true,
        },
        {
          name: "id_dusun_pemberi",
          title: "Dusun",
          value: formDataUser.id_dusun_pemberi,
          type: "options",
          placeholder: "Pilih Dusun",
          required: true,
          options: [...optionDusun],
        },
        {
          name: "rt_pemberi",
          title: "RT",
          value: formDataUser.rt_pemberi,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_pemberi",
          title: "RW",
          value: formDataUser.rw_pemberi,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "alamat_pemberi",
          title: "Alamat",
          value: formDataUser.alamat_pemberi,
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
      header: "Data Penerima",
      data: [
        {
          name: "nama_lengkap_penerima",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_penerima,
          type: "text",
          required: true,
        },
        {
          name: "nomor_ktp_penerima",
          title: "NIK",
          value: formDataUser.nomor_ktp_penerima,
          type: "numeric",
          required: true,
        },
        {
          name: "tempat_lahir_penerima",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_penerima,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_penerima",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_penerima || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "umur_penerima",
          title: "Umur",
          value: formDataUser.umur_penerima,
          type: "text",
          required: true,
        },
        {
          name: "agama_penerima",
          title: "Agama",
          value: formDataUser.agama_penerima,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_penerima",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_penerima,
          type: "text",
          required: true,
        },
        {
          name: "id_dusun_penerima",
          title: "Dusun",
          value: formDataUser.id_dusun_penerima,
          type: "options",
          placeholder: "Pilih Dusun",
          required: true,
          options: [...optionDusun],
        },
        {
          name: "rt_penerima",
          title: "RT",
          value: formDataUser.rt_penerima,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_penerima",
          title: "RW",
          value: formDataUser.rw_penerima,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "alamat_penerima",
          title: "Alamat",
          value: formDataUser.alamat_penerima,
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
          name: "barang",
          title: "Barang yang diberikan kuasa",
          value: formDataUser.barang,
          type: "text",
          required: true,
        },
        {
          name: "foto_barang",
          title: "Foto Barang ",
          description: "Barang yang diberikan kuasa",
          value: formDataUser.foto_barang,
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
export default function PermohonanSuratKuasaScreen() {
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
    formData.append("type", 2);
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
                if (index >= 11) break;
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
