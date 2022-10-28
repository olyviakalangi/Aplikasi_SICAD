import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../components/header/CustomHeader";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/generals/CustomButton";
import FormInput from "../../components/generals/FormInput";
import RadioInput from "../../components/generals/RadioInput";
import DropdownInput from "../../components/generals/DropdownInput";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import CustomInputDate from "../../components/generals/CustomInputDate";
import { getAuth, updateProfile } from "firebase/auth";
import {
  apitGetOnceUserDetail,
  apiUpdateUserDetail,
  userChange,
} from "../../lib/api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  change,
  onStateChange,
  setUserInfo,
} from "../../features/auth/authSlice";
const RenderHeader = () => {
  return (
    <SafeAreaView style={[GlobalCss.containerPaddingX]}>
      <CustomHeader title="Data Pribadi" />
    </SafeAreaView>
  );
};
const auth = getAuth();
// const initialState = {
//   nama_lengkap: "",
//   tempat_lahir: "",
//   tanggal_lahir: new Date(2001, 9, 13),
//   jenis_kelamin: 0,
//   pekerjaan: "",
//   nomor_ktp: "",
//   id_dusun: "",
//   rt: "",
//   rw: "",
// };
const dataDusun = [
  {
    id: 1,
    label: "Dusun Ngadiloyo",
  },
  { id: 2, label: "Dusun Ngadiluwih" },
];
const dataRT = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
];
const dataRW = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
  { id: 6, label: "6" },
];
const DataPribadiScreen = () => {
  const [formDataUser, setFormDataUser] = useState();
  const { accessToken, userInfo } = useSelector((state) => state.auth);
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const showMode = () => {
    try {
      DateTimePickerAndroid.open({
        value: new Date(formDataUser.tanggal_lahir),
        onChange: (event, selectedDate) => {
          const currentDate =
            selectedDate || new Date(formDataUser.tanggal_lahir);
          setFormDataUser({ ...formDataUser, tanggal_lahir: currentDate });
        },
        mode: "date",
      });
    } catch (error) {
      setFormDataUser({
        ...formDataUser,
        tanggal_lahir: new Date(2001, 13, 10),
      });
    }
  };
  function handleUpdateProfile() {
    if (
      formDataUser.nama_lengkap === "" ||
      formDataUser.tempat_lahir === "" ||
      formDataUser.tanggal_lahir === "" ||
      formDataUser.jenis_kelamin === "" ||
      formDataUser.pekerjaan === "" ||
      formDataUser.nomor_ktp === "" ||
      formDataUser.id_dusun === "" ||
      formDataUser.rt === "" ||
      formDataUser.rw === ""
    ) {
      alert("Data tidak boleh kosong");
    }
    apiUpdateUserDetail(accessToken, formDataUser)
      .then((res) => {
        dispatch(setUserInfo(res.data.data));
        try {
          Navigation.navigate("ProfileScreen");
        } catch (error) {}
        ToastAndroid.show("Data berhasil diubah", ToastAndroid.SHORT);
      })
      .catch((err) => {
        ToastAndroid.show("Data gagal diubah", ToastAndroid.SHORT);
      });
  }
  function onChange(key, value) {
    console.log(key, value);
    setFormDataUser({ ...formDataUser, [key]: value });
  }
  useEffect(() => {
    setFormDataUser(userInfo);
  }, [userInfo]);
  if (formDataUser) {
    return (
      <View style={[tw`bg-primary flex-1`]}>
        <RenderHeader />
        <ScrollView
          style={[
            tw`bg-white rounded-2xl shadow-md`,
            GlobalCss.containerMarginX,
            GlobalCss.container,
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[tw`text-center text-gray-500 font-bold`]}>
            Informasi Data Pribadi
          </Text>
          <View
            style={[
              tw`w-full bg-gray-500 rounded-full bg-opacity-10 mt-1 mb-5`,
              { height: 2 },
            ]}
          />
          <FormInput
            title="Nama Lengkap"
            required
            styleTop={[tw`my-0`]}
            onChange={(value) => onChange("nama_lengkap", value)}
            value={formDataUser.nama_lengkap}
          />
          <View style={[tw`flex-row justify-between`]}>
            <FormInput
              title="Tempat Lahir"
              required
              styleTop={[tw`mr-2 my-0 flex-1`]}
              onChange={(value) => onChange("tempat_lahir", value)}
              value={formDataUser.tempat_lahir}
            />
            <CustomInputDate
              title="Tanggal Lahir"
              required
              styleTop={[tw`ml-2 my-0 flex-1`]}
              onPress={() => showMode()}
              value={formDataUser.tanggal_lahir}
            />
          </View>
          <RadioInput
            title="Jenis Kelamin"
            required
            styleTop={[tw` my-0 flex-1`]}
            onChange={(value) => onChange("jenis_kelamin", value)}
            value={formDataUser.jenis_kelamin}
          />
          <FormInput
            title="Pekerjaan"
            required
            styleTop={[tw`my-0`]}
            onChange={(value) => onChange("pekerjaan", value)}
            value={formDataUser.pekerjaan}
          />
          <FormInput
            title="Nomor KTP/NIK"
            required
            styleTop={[tw`my-0`]}
            onChange={(value) => onChange("nomor_ktp", value)}
            keyboardType="numeric"
            value={formDataUser.nomor_ktp}
          />
          <DropdownInput
            placeholder={
              formDataUser.id_dusun
                ? dataDusun[formDataUser.id_dusun - 1].label
                : "Pilih Dusun"
            }
            title="Alamat Dusun"
            required
            data={dataDusun}
            styleTop={[tw`my-0`]}
            onChange={(value) => onChange("id_dusun", value)}
            value={formDataUser.id_dusun}
          />
          <View style={[tw`flex-row justify-between`]}>
            <DropdownInput
              title="RT"
              placeholder={
                formDataUser.rt ? dataRT[formDataUser.rt - 1].label : "Pilih RT"
              }
              required
              data={dataRT}
              styleTop={[tw`mr-2 my-0 flex-1`]}
              onChange={(value) => onChange("rt", value)}
              value={formDataUser.rt}
            />
            <DropdownInput
              title="RW"
              placeholder={
                formDataUser.rw ? dataRW[formDataUser.rw - 1].label : "Pilih RW"
              }
              required
              data={dataRW}
              styleTop={[tw`ml-2 my-0 flex-1`]}
              onChange={(value) => onChange("rw", value)}
              value={formDataUser.rw}
            />
          </View>
          <View style={[tw`h-10 w-full`]} />
        </ScrollView>
        <TouchableOpacity onPress={() => handleUpdateProfile()}>
          <CustomButton
            text="Simpan"
            style={[tw`bg-white w-9/12 mx-auto my-5`]}
            styleText={[tw`text-primary`]}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

export default DataPribadiScreen;
