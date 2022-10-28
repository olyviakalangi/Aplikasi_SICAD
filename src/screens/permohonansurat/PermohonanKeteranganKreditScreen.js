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
  optionJaminan,
  optionJenisKelamin,
  optionKawin,
  optionKebangsaan,
  optionPemberiKredit,
  optionPendidikan,
  optionRt,
  optionRw,
  programKredit,
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
      <CustomHeader title="Keterangan Kredit" />
    </SafeAreaView>
  );
};

const DataProgress = [
  {
    name: "Data pemohon",
  },
  {
    name: "Data jaminan",
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
  pekerjaan: "",
  id_dusun: "",
  rt: "",
  rw: "",
  alamat: "",
  nama_lengkap_istri_suami: "",
  tempat_lahir_istri_suami: "",
  program: "",
  nama_pemberi_kredit: "",
  peruntukan_surat: "",
  besaran_kredit: "",
  type_jaminan: "",
  nomor_objek_pajak: "",
  nama_wajib_pajak: "",
  alamat_wajib_pajak: "",
  nomor_induk_persil: "",
  kelas_persil: "",
  jenis_tanah: "",
  nomor_kepemilikan_tanah: "",
  luast_tanah: "",
  isi_tanah: "",
  perkiraan_harga_tanah: "",
  peruntukan_tanah: "",
  luas_bangunan: "",
  isi_bangunan: "",
  perkiraan_harga_bangunan: "",
  peruntukan_bangunan: "",
  batas_tanah_selatan: "",
  batas_tanah_utara: "",
  batas_tanah_timur: "",
  batas_tanah_barat: "",
  nomor_objek_pajak: "",
  nama_wajib_pajak: "",
  alamat_wajib_pajak: "",
  nomor_induk_persil: "",
  kelas_persil: "",
  nomor_kepemilikan_barang: "",
  perkiraan_harga_barang_saat_ini: "",
};
const initialStateFile = [
  {
    name: "foto_ktp",
  },
  {
    name: "bukti_kepemilikan_jaminan",
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
          name: "pekerjaan",
          title: "Pekerjaan",
          value: formDataUser.pekerjaan,
          type: "text",
          required: true,
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
          name: "alamat",
          title: "Alamat",
          value: formDataUser.alamat,
          type: "text",
          required: true,
        },
        {
          name: "nama_lengkap_istri_suami",
          title: "Nama Lengkap Istri/Suami",
          value: formDataUser.nama_lengkap_istri_suami,
          type: "text",
          required: true,
        },
        {
          name: "tempat_lahir_istri_suami",
          title: "Tempat Lahir Istri/Suami",
          value: formDataUser.tempat_lahir_istri_suami,
          type: "text",
          required: true,
        },
        {
          name: "program",
          title: "Nama Program",
          value: formDataUser.program,
          type: "options",
          placeholder: "Pilih nama program",
          required: true,
          options: [...programKredit],
        },
        {
          name: "nama_pemberi_kredit",
          title: "Nama Pemberi kredit",
          value: formDataUser.nama_pemberi_kredit,
          type: "options",
          placeholder: "Pilih nama pemberi kredit",
          required: true,
          options: [...optionPemberiKredit],
        },
        {
          name: "peruntukan_surat",
          title: "Peruntukan kredit",
          value: formDataUser.peruntukan_surat,
          type: "text",
          required: true,
        },
        {
          name: "besaran_kredit",
          title: "Besaran Kredit (Rp.)",
          value: formDataUser.besaran_kredit,
          type: "numeric",
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
    if (formDataUser.type_jaminan == 1) {
      const formInputNew = [
        {
          name: "nomor_objek_pajak",
          title: "Nomor Objek Pajak",
          value: formDataUser.nomor_objek_pajak,
          type: "numeric",
          required: true,
        },
        {
          name: "nama_wajib_pajak",
          title: "Nama Wajib Pajak",
          value: formDataUser.nama_wajib_pajak,
          type: "text",
          required: true,
        },
        {
          name: "alamat_wajib_pajak",
          title: "Alamat Wajib Pajak",
          value: formDataUser.alamat_wajib_pajak,
          type: "text",
          required: true,
        },
        {
          name: "nomor_induk_persil",
          title: "Nomor Objek Persil",
          value: formDataUser.nomor_induk_persil,
          type: "numeric",
          required: true,
        },
        {
          name: "kelas_persil",
          title: "Kelas Persil",
          value: formDataUser.kelas_persil,
          type: "text",
          required: true,
        },
        {
          name: "jenis_tanah",
          title: "Jenis Tanah",
          value: formDataUser.jenis_tanah,
          type: "numeric",
          required: true,
        },
        {
          name: "nomor_kepemilikan_tanah",
          title: "Nomor Bukti Kepemilikan Tanah",
          value: formDataUser.nomor_kepemilikan_tanah,
          type: "numeric",
          required: true,
        },
        {
          name: "luast_tanah",
          title: "Luas Tanah",
          value: formDataUser.luast_tanah,
          type: "numeric",
          required: true,
        },
        {
          name: "isi_tanah",
          title: "Isi Tanah",
          value: formDataUser.isi_tanah,
          type: "numeric",
          required: true,
        },
        {
          name: "perkiraan_harga_tanah",
          title: "Perkiraan Harga Tanah",
          value: formDataUser.perkiraan_harga_tanah,
          type: "numeric",
          required: true,
        },
        {
          name: "peruntukan_tanah",
          title: "Peruntukan Tanah",
          value: formDataUser.peruntukan_tanah,
          type: "text",
          required: true,
        },
        {
          name: "luas_bangunan",
          title: "Luas Bangunan",
          value: formDataUser.luas_bangunan,
          type: "numeric",
          required: true,
        },
        {
          name: "luas_bangunan",
          title: "Luas Bangunan",
          value: formDataUser.luas_bangunan,
          type: "numeric",
          required: true,
        },
        {
          name: "peruntukan_bangunan",
          title: "Peruntukan Bangunan",
          value: formDataUser.peruntukan_bangunan,
          type: "text",
          required: true,
        },
        {
          name: "batas_tanah_selatan",
          title: "Batas Tanah Selatan",
          value: formDataUser.batas_tanah_selatan,
          type: "numeric",
          required: true,
        },
        {
          name: "batas_tanah_utara",
          title: "Batas Tanah Utara",
          value: formDataUser.batas_tanah_utara,
          type: "numeric",
          required: true,
        },
        {
          name: "batas_tanah_timur",
          title: "Batas Tanah Timur",
          value: formDataUser.batas_tanah_timur,
          type: "numeric",
          required: true,
        },
        {
          name: "batas_tanah_barat",
          title: "Batas Tanah Barat",
          value: formDataUser.batas_tanah_barat,
          type: "numeric",
          required: true,
        },
      ];
      setFormInputPlus(formInputNew);
    } else if (formDataUser.type_jaminan == 2) {
      const formInputNew = [
        {
          name: "nomor_objek_pajak",
          title: "Nomor Objek Pajak",
          value: formDataUser.nomor_objek_pajak,
          type: "numeric",
          required: true,
        },
        {
          name: "nama_wajib_pajak",
          title: "Nama Wajib Pajak",
          value: formDataUser.nama_wajib_pajak,
          type: "text",
          required: true,
        },
        {
          name: "alamat_wajib_pajak",
          title: "Alamat Wajib Pajak",
          value: formDataUser.alamat_wajib_pajak,
          type: "text",
          required: true,
        },
        {
          name: "nomor_induk_persil",
          title: "Nomor Objek Persil",
          value: formDataUser.nomor_induk_persil,
          type: "numeric",
          required: true,
        },
        {
          name: "kelas_persil",
          title: "Kelas Persil",
          value: formDataUser.kelas_persil,
          type: "text",
          required: true,
        },
        {
          name: "nomor_kepemilikan_barang",
          title: "Nomor Bukti Kepemilikan Barang",
          value: formDataUser.nomor_kepemilikan_barang,
          type: "numeric",
          required: true,
        },
        {
          name: "perkiraan_harga_barang_saat_ini",
          title: "Perkiraan Harga Barang Saat Ini",
          value: formDataUser.perkiraan_harga_barang_saat_ini,
          type: "numeric",
          required: true,
        },
      ];
      setFormInputPlus(formInputNew);
    } else {
      const formInputNew = [];
      setFormInputPlus(formInputNew);
    }
  }, [formDataUser]);
  const allforminput = [
    {
      data: [
        {
          name: "type_jaminan",
          title: "Tipe Jaminan",
          value: formDataUser.type_jaminan,
          type: "options",
          placeholder: "Pilih jaminan",
          required: true,
          options: [...optionJaminan],
        },
        ...formInputPlus,
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
const RenderForm3 = (props) => {
  const formDataUser = props.formDataUser;
  const allforminput = [
    {
      data: [
        {
          name: "foto_ktp",
          title: "Foto KTP/KK",
          description: "Foto KTP/KK",
          value: formDataUser.foto_ktp,
          type: "file",
          required: true,
        },
        {
          name: "bukti_kepemilikan_jaminan",
          title: "Bukti Kepemilikan Jaminan",
          description: "Foto Bukti Kepemilikan Jaminan",
          value: formDataUser.bukti_kepemilikan_jaminan,
          type: "file",
          required: true,
        },
        {
          name: "pengantar_rt",
          title: "Surat Pengantar RT/RW",
          description: "Foto Surat Pengantar RT/RW",
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
export default function PermohonanKeteranganKreditScreen() {
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
    formData.append("type", 10);
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
    console.log(key, value, "once");
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
  console.log("once");
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
                if (index < 15) {
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
