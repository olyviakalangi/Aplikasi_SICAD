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
      <CustomHeader title="Permohonan Surat Keterangan Usaha (SKU)" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Data Pemohon",
  },
  {
    name: "Data Usaha",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_lengkap_sku: "",
  nik_sku: "",
  tempat_lahir_sku: "",
  tanggal_lahir_sku: "",
  jenis_kelamin_sku: "",
  kewarganegaraan_sku: "",
  agama_sku: "",
  pekerjaan_sku: "",
  pendidikan_terakhir_sku: "",
  id_dusun_sku: "",
  rt_sku: "",
  rw_sku: "",
  // ===========================
  peruntukan_surat_sku: "",
  usaha_sku: "",
  nama_usaha_sku: "",
  alamat_usaha_sku: "",
  rt_usaha_sku: "",
  rw_usaha_sku: "",
  dusun_usaha_sku: "",
  desa_usaha_sku: "",
  kecamatan_usaha_sku: "",
  kabupaten_kota_usaha_sku: "",
  provinsi_usaha_sku: "",
};
const initialStateFile = [
  {
    name: "foto_ktp_sku",
  },
  {
    name: "kk_sku",
  },
  {
    name: "pengantar_rt_sku",
  },
  {
    name: "foto_bukti_sku",
  },
];
const RenderForm1 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Pemohon",
      data: [
        {
          name: "nama_lengkap_sku",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_sku,
          type: "text",
          required: true,
        },
        {
          name: "nik_sku",
          title: "NIK",
          value: formDataUser.nik_sku,
          type: "numeric",
          required: true,
        },
        {
          name: "tempat_lahir_sku",
          title: "Tempat Lahir",
          value: formDataUser.tempat_lahir_sku,
          type: "text",
          required: true,
        },
        {
          name: "tanggal_lahir_sku",
          title: "Tanggal Lahir",
          value: formDataUser.tanggal_lahir_sku || new Date(),
          type: "date",
          required: true,
        },
        {
          name: "jenis_kelamin_sku",
          title: "Jenis Kelamin",
          value: formDataUser.jenis_kelamin_sku,
          type: "options",
          placeholder: "Pilih Jenis Kelamin",
          required: true,
          options: [...optionJenisKelamin],
        },
        {
          name: "kewarganegaraan_sku",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan_sku,
          type: "options",
          placeholder: "Pilih Kewarganegaraan",
          required: true,
          options: [...optionKebangsaan],
        },
        {
          name: "agama_sku",
          title: "Agama",
          value: formDataUser.agama_sku,
          type: "options",
          placeholder: "Pilih Agama",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "pekerjaan_sku",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_sku,
          type: "text",
          required: true,
        },
        {
          name: "pendidikan_terakhir_sku",
          title: "Pendidikan Terakhir",
          value: formDataUser.pendidikan_terakhir_sku,
          type: "options",
          placeholder: "Pilih Pendidikan Terakhir",
          required: true,
          options: [...optionPendidikan],
        },
        {
          name: "id_dusun_sku",
          title: "Dusun",
          value: formDataUser.id_dusun_sku,
          type: "options",
          placeholder: "Pilih Dusun",
          required: true,
          options: [...optionDusun],
        },
        {
          name: "rt_sku",
          title: "RT",
          value: formDataUser.rt_sku,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_sku",
          title: "RW",
          value: formDataUser.rw_sku,
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
const RenderForm2 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      header: "Data Usaha",
      data: [
        {
          name: "peruntukan_surat_sku",
          title: "Peruntukan Surat",
          value: formDataUser.peruntukan_surat_sku,
          type: "text",
          required: true,
        },
        {
          name: "usaha_sku",
          title: "Usaha yang Dijalankan",
          value: formDataUser.usaha_sku,
          type: "text",
          required: true,
        },
        {
          name: "nama_usaha_sku",
          title: "Nama Usaha",
          value: formDataUser.nama_usaha_sku,
          type: "text",
          required: true,
        },
        {
          name: "alamat_usaha_sku",
          title: "Alamat Usaha",
          value: formDataUser.alamat_usaha_sku,
          type: "text",
          required: true,
        },
        {
          name: "rt_usaha_sku",
          title: "RT",
          value: formDataUser.rt_usaha_sku,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_usaha_sku",
          title: "RW",
          value: formDataUser.rw_usaha_sku,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_usaha_sku",
          title: "Dusun",
          value: formDataUser.dusun_usaha_sku,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
        {
          name: "desa_usaha_sku",
          title: "Desa",
          value: formDataUser.desa_usaha_sku,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_usaha_sku",
          title: "Kecamatan",
          value: formDataUser.kecamatan_usaha_sku,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_kota_usaha_sku",
          title: "Kabupaten/Kota",
          value: formDataUser.kabupaten_kota_usaha_sku,
          type: "text",
          required: true,
        },
        {
          name: "provinsi_usaha_sku",
          title: "Provinsi",
          value: formDataUser.provinsi_usaha_sku,
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
          name: "foto_ktp_sku",
          title: "Foto KTP",
          description: "Foto KTP Asli",
          value: formDataUser.foto_ktp_sku,
          type: "file",
          required: true,
        },
        {
          name: "kk_sku",
          title: "Foto KK Asli",
          description: "Foto KK Asli",
          value: formDataUser.kk_sku,
          type: "file",
          required: true,
        },
        {
          name: "pengantar_rt_sku",
          title: "Foto Pengantar RT",
          description: "Foto Pengantar RT",
          value: formDataUser.pengantar_rt_sku,
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
export default function PermohonanSKUScreen() {
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
    formData.append("type", 15);
    for (const [key, value] of Object.entries(initialStateFile)) {
      if (formDataUser[value.name]) {
        formData.append(value.name, {
          uri: formDataUser[value.file].uri,
          type: "image/jpeg",
          name: formDataUser[value.file].uri.split("/")[
            formDataUser[value.file].uri.split("/").length - 1
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
              for (const [key, value] of Object.entries(initialState)) {
                if (index == 11) break;
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
                if (index > 11) {
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
