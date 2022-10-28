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
    name: "Data pemohon",
  },
  {
    name: "Data tujuan",
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
  kewarganegaraan: "",
  pekerjaan: "",
  pendidikan_terakhir: "",
  alamat: "",
  id_dusun: "",
  rt: "",
  rw: "",
  provinsi_tujuan: "",
  kabupaten_tujuan: "",
  kecamatan_tujuan: "",
  desa_tujuan: "",
  alamat_tujuan: "",
  alasan_pergi: "",
  jumlah_pengikut: "",
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
          type: "numeric",
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
          required: true,
          options: [...optionJenisKelamin],
        },
        {
          name: "agama",
          title: "Agama",
          value: formDataUser.agama,
          type: "options",
          required: true,
          options: [...optionAgama],
        },
        {
          name: "kewarganegaraan",
          title: "Kewarganegaraan",
          value: formDataUser.kewarganegaraan,
          type: "options",
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
          name: "pendidikan_terakhir",
          title: "Pendidikan",
          value: formDataUser.pendidikan_terakhir,
          type: "options",
          required: true,
          options: [...optionPendidikan],
        },
        {
          name: "alamat",
          title: "Alamat",
          value: formDataUser.alamat,
          type: "text",
          required: true,
        },
        {
          name: "id_dusun",
          title: "Dusun ",
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
    for (
      let i_pengikut = 1;
      i_pengikut <= formDataUser.jumlah_pengikut;
      i_pengikut++
    ) {
      formInputNew.push({
        header: "Data Pengikut " + i_pengikut,
        data: [
          {
            name: "nama_pengikut" + i_pengikut,
            title: "Nama Lengkap Pengikut " + i_pengikut,
            value: formDataUser["nama_pengikut" + i_pengikut],
            type: "text",
            required: true,
          },
          {
            name: "umur_pengikut" + i_pengikut,
            title: "Umur Pengikut " + i_pengikut,
            value: formDataUser["umur_pengikut" + i_pengikut],
            type: "text",
            required: true,
          },
          {
            name: "hubungan_keluarga_pengikut" + i_pengikut,
            title: "Hubungan Keluarga Pengikut " + i_pengikut,
            value: formDataUser["hubungan_keluarga_pengikut" + i_pengikut],
            type: "text",
            required: true,
          },
          {
            name: "lk_pengikut" + i_pengikut,
            title: "Lk Pengikut " + i_pengikut,
            value: formDataUser["lk_pengikut" + i_pengikut],
            type: "text",
          },
          {
            name: "pr_pengikut" + i_pengikut,
            title: "Pr Pengikut " + i_pengikut,
            value: formDataUser["pr_pengikut" + i_pengikut],
            type: "text",
          },
          {
            name: "keterangan_pengikut" + i_pengikut,
            title: "Keterangan Pengikut " + i_pengikut,
            value: formDataUser["keterangan_pengikut" + i_pengikut],
            type: "text",
          },
        ],
      });
    }
    setFormInputPlus(formInputNew);
  }, [formDataUser]);
  const allforminput = [
    {
      header: "Data tujuan",
      data: [
        {
          name: "provinsi_tujuan",
          title: "Provinsi Tujuan",
          value: formDataUser.provinsi_tujuan,
          type: "text",
          required: true,
        },
        {
          name: "kabupaten_tujuan",
          title: "Kabupaten/Kota Tujuan",
          value: formDataUser.kabupaten_tujuan,
          type: "text",
          required: true,
        },
        {
          name: "kecamatan_tujuan",
          title: "Kecamatan Tujuan",
          value: formDataUser.kecamatan_tujuan,
          type: "text",
          required: true,
        },
        {
          name: "desa_tujuan",
          title: "Desa Tujuan",
          value: formDataUser.desa_tujuan,
          type: "text",
          required: true,
        },
        {
          name: "alamat_tujuan",
          title: "Alamat Tujuan",
          value: formDataUser.alamat_tujuan,
          type: "text",
          required: true,
        },
        {
          name: "alasan_pergi",
          title: "Alasan Pergi",
          value: formDataUser.alasan_pergi,
          type: "text",
          required: true,
        },
        {
          name: "jumlah_pengikut",
          title: "Jumlah Pengikut",
          value: formDataUser.jumlah_pengikut,
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
  const [formInputPlus, setFormInputPlus] = useState([]);
  useEffect(() => {
    let formInputNew = [];
    for (
      let i_pengikut = 1;
      i_pengikut <= formDataUser.jumlah_pengikut;
      i_pengikut++
    ) {
      formInputNew.push({
        header: "Data Pengikut " + i_pengikut,
        data: [
          {
            name: "foto_ktp_pemohon" + i_pengikut,
            title: "ktp pemohon " + i_pengikut,
            description: "Foto ktp pemohon " + i_pengikut,
            value: formDataUser["foto_ktp_pemohon" + i_pengikut],
            type: "file",
            required: true,
          },
        ],
      });
    }
    setFormInputPlus(formInputNew);
  }, [formDataUser]);
  const allforminput = [
    {
      header: "Final",
      data: [
        {
          name: "foto_ktp_pemohon",
          title: "ktp pemohon",
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
export default function PermohonanBoroScreen() {
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
      i_pengikut <= formDataUser.jumlah_pengikut;
      i_pengikut++
    ) {
      formData.append(
        "nama_pengikut" + i_pengikut,
        String(formDataUser["nama_pengikut" + i_pengikut])
      );
      formData.append(
        "umur_pengikut" + i_pengikut,
        String(formDataUser["umur_pengikut" + i_pengikut])
      );
      formData.append(
        "hubungan_keluarga_pengikut" + i_pengikut,
        String(formDataUser["hubungan_keluarga_pengikut" + i_pengikut])
      );
      formData.append(
        "lk_pengikut" + i_pengikut,
        String(formDataUser["lk_pengikut" + i_pengikut])
      );
      formData.append(
        "pr_pengikut" + i_pengikut,
        String(formDataUser["pr_pengikut" + i_pengikut])
      );
      formData.append(
        "keterangan_pengikut" + i_pengikut,
        String(formDataUser["keterangan_pengikut" + i_pengikut])
      );
      if (formDataUser["foto_ktp_pemohon" + i_pengikut]) {
        formData.append("foto_ktp_pemohon" + i_pengikut, {
          uri: formDataUser["foto_ktp_pemohon" + i_pengikut].uri,
          type: "image/jpeg",
          name: formDataUser["foto_ktp_pemohon" + i_pengikut].uri.split("/")[
            formDataUser["foto_ktp_pemohon" + i_pengikut].uri.split("/")
              .length - 1
          ],
        });
      } else {
        formData.append("foto_ktp_pemohon" + i_pengikut, null);
      }
    }
    formData.append("type", 11);
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
                if (index <= 12) {
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
                if (index > 12) {
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
