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
  optionJaminan,
  optionJenisKayu,
  optionJenisKelamin,
  optionKebangsaan,
  optionPemberiKredit,
  optionPendidikan,
  optionRt,
  optionRw,
  programKredit,
} from "../../constants/Dummy";
import { dataToString } from "../../constants/Helper";
import { setLoading } from "../../features/loading/loadingSlice";
import { apiUploadSuratWithPicture } from "../../lib/api";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
const RenderHeader = () => {
  return (
    <SafeAreaView style={[GlobalCss.containerPaddingX]}>
      <CustomHeader title="Keterangan Boro Kerja" />
    </SafeAreaView>
  );
};
const DataProgress = [
  {
    name: "Data Pemohon & Pengangkut",
  },
  {
    name: "Kayu",
  },
  {
    name: "Final",
  },
];
const initialState = {
  nama_lengkap_kayudesa: "",
  nik_ktp_kayudesa: "",
  umur_kayudesa: "",
  jenis_kelamin_kayudesa: "",
  pekerjaan_kayudesa: "",
  alamat_kayudesa: "",
  rt_kayudesa: "",
  rw_kayudesa: "",
  dusun_kayudesa: "",
  // ---------------------------
  namawajibpajak_kayudesa: "",
  nop_kayudesa: "",
  alamatobjekpajak_kayudesa: "",
  noinduk_kayudesa: "",
  // ---------------------------
  pengangkut_kayudesa: "",
  nopol_kayudesa: "",
  tujuan_kayudesa: "",
  // ---------------------------
  jumlah_kayu: "",
};
const initialStateFile = [
  {
    name: "foto_ktp_pemohon",
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
          name: "nama_lengkap_kayudesa",
          title: "Nama  Lengkap",
          value: formDataUser.nama_lengkap_kayudesa,
          type: "text",
          required: true,
        },
        {
          name: "nik_ktp_kayudesa",
          title: "NIK",
          value: formDataUser.nik_ktp_kayudesa,
          type: "numeric",
          required: true,
        },
        {
          name: "umur_kayudesa",
          title: "Umur",
          value: formDataUser.umur_kayudesa,
          type: "numeric",
          required: true,
        },
        {
          name: "jenis_kelamin_kayudesa",
          title: "Jenis Kelamin",
          value: formDataUser.jenis_kelamin_kayudesa,
          type: "options",
          required: true,
          options: [...optionJenisKelamin],
        },
        {
          name: "pekerjaan_kayudesa",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan_kayudesa,
          type: "options",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "alamat_kayudesa",
          title: "Alamat",
          value: formDataUser.alamat_kayudesa,
          type: "text",
          required: true,
        },
        {
          name: "rt_kayudesa",
          title: "RT",
          value: formDataUser.rt_kayudesa,
          type: "options",
          placeholder: "Pilih RT",
          required: true,
          options: [...optionRt],
        },
        {
          name: "rw_kayudesa",
          title: "RW",
          value: formDataUser.rw_kayudesa,
          type: "options",
          placeholder: "Pilih RW",
          required: true,
          options: [...optionRw],
        },
        {
          name: "dusun_kayudesa",
          title: "Dusun",
          value: formDataUser.dusun_kayudesa,
          type: "options",
          placeholder: "Pilih Dusun",
          options: [...optionDusun],
          required: true,
        },
      ],
    },
    {
      header: "Data Pajak",
      data: [
        {
          name: "namawajibpajak_kayudesa",
          title: "Nama Wajib Pajak",
          value: formDataUser.namawajibpajak_kayudesa,
          type: "text",
          required: true,
        },
        {
          name: "nop_kayudesa",
          title: "Nomor Objek Pajak (NOP)",
          value: formDataUser.nop_kayudesa,
          type: "numeric",
          required: true,
        },
        {
          name: "alamatobjekpajak_kayudesa",
          title: "Alamat Objek Pajak",
          value: formDataUser.alamatobjekpajak_kayudesa,
          type: "text",
          required: true,
        },
        {
          name: "noinduk_kayudesa",
          title: "No. Induk (Persil)",
          value: formDataUser.noinduk_kayudesa,
          type: "numeric",
          required: true,
        },
      ],
    },
    {
      header: "Data Pengangkut",
      data: [
        {
          name: "pengangkut_kayudesa",
          title: "Pengangkut",
          value: formDataUser.pengangkut_kayudesa,
          type: "options",
          placeholder: "Pilih Pengangkut",
          options: [
            {
              id: "1",
              label: "Dump Truck",
            },
            {
              id: "2",
              label: "Roda 4",
            },
            {
              id: "3",
              label: "Roda 6",
            },
            {
              id: "4",
              label: "Truck",
            },
            {
              id: "5",
              label: "Pick Up",
            },
          ],
          required: true,
        },
        {
          name: "nopol_kayudesa",
          title: "Nomor Polisi",
          value: formDataUser.nopol_kayudesa,
          type: "numeric",
          required: true,
        },
        {
          name: "tujuan_kayudesa",
          title: "Tujuan",
          value: formDataUser.tujuan_kayudesa,
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
  const [formInputPlus, setFormInputPlus] = useState([]);
  useEffect(() => {
    let formInputNew = [];
    for (let i_kayu = 1; i_kayu <= formDataUser.jumlah_kayu; i_kayu++) {
      formInputNew.push({
        header: "Data Kayu " + i_kayu,
        data: [
          {
            name: "ukuran_kayu" + i_kayu,
            title: "Ukuran kayu panjangxlebarxtinggi (5x5x4) " + i_kayu,
            value: formDataUser["ukuran_kayu" + i_kayu],
            type: "text",
            required: true,
          },
          {
            name: "jumlah_kayu" + i_kayu,
            title: "Jumlah Kayu " + i_kayu,
            value: formDataUser["jumlah_kayu" + i_kayu],
            type: "text",
            required: true,
          },
          {
            name: "satuan" + i_kayu,
            title: "Satuan " + i_kayu,
            value: formDataUser["satuan" + i_kayu],
            type: "options",
            required: true,

            options: [...optionJenisKayu],
            required: true,
          },
        ],
      });
    }
    setFormInputPlus(formInputNew);
  }, [formDataUser]);
  const allforminput = [
    {
      header: "Data kayu",
      data: [
        {
          name: "jumlah_kayu",
          title: "Jumlah kayu",
          value: formDataUser.jumlah_kayu,
          type: "numeric",
          required: true,
        },
      ],
    },
    ...formInputPlus,
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
            {item.data?.map((itemData, index) => {
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
          name: "foto_ktp_pemohon",
          title: "Ktp pemohon",
          description: "Foto ktp pemohon",
          value: formDataUser.foto_ktp_pemohon,
          type: "file",
          required: true,
        },
        {
          name: "pengantar_rt",
          title: "Pengantar RT",
          description: "Foto foto ktp pemohon",
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
          <>
            <Text
              style={[tw`font-bold text-gray-500 text-lg mb-5 text-center`]}
            >
              {item.header}
            </Text>
            {item.data?.map((itemData, index) => {
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
export default function PermohonanKayuScreen() {
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
    for (
      let i_pengikut = 1;
      i_pengikut <= formDataUser.jumlah_kayu;
      i_pengikut++
    ) {
      formData.append(
        "ukuran_kayu" + i_pengikut,
        String(formDataUser["ukuran_kayu" + i_pengikut])
      );
      formData.append(
        "jumlah_kayu" + i_pengikut,
        String(formDataUser["jumlah_kayu" + i_pengikut])
      );
      formData.append(
        "satuan" + i_pengikut,
        String(formDataUser["satuan" + i_pengikut])
      );
    }
    formData.append("type", 12);
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
                if (index <= 15) {
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
            } else if (slideIn == 1) {
              let index = 0;
              for (const [key, value] of Object.entries(initialState)) {
                console.log(key, index);
                if (index > 15) {
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
