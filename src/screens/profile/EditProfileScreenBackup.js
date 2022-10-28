import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ToastAndroid,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../components/header/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
import Dummy from "../../constants/Dummy";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../constants/Icons";
import { logout } from "../../features/auth/authSlice";
import MenuOptions from "../../components/menu/MenuOptions";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/generals/CustomInput";
import FormInput from "../../components/generals/FormInput";
import CustomButton from "../../components/generals/CustomButton";
import * as ImagePicker from "expo-image-picker";

const RenderUser = (props) => {
  const { accessToken, userInfo } = useSelector((state) => state.auth);
  const { width } = useWindowDimensions();
  return (
    <View style={[tw` `]}>
      <View style={[tw`bg-primary h-10/12 w-full absolute shadow-md`]}></View>
      <SafeAreaView style={[GlobalCss.containerPaddingX, { elevation: 10 }]}>
        <CustomHeader title="Informasi Profile" />
        <View style={[tw`mx-auto  self-start`]}>
          {props.uri ? (
            <Image
              source={{ uri: props.uri }}
              style={[tw`w-24 h-24 rounded-full mr-5 `]}
            />
          ) : (
            <View
              style={[
                tw`w-24 h-24    justify-center items-center bg-indigo-700 shadow-md rounded-full`,
              ]}
            >
              <Text style={[tw`text-white font-semibold text-xl`]}>
                {userInfo.fullname.split(" ")[0].substring(0, 1)}
                {userInfo.fullname.split(" ")[1].substring(0, 1)}
              </Text>
            </View>
          )}
          <View style={[tw`absolute right-0 bottom-0 `]}>
            <TouchableOpacity
              style={[
                tw`w-8 h-8  bg-primary rounded-full items-center justify-center shadow-md`,
              ]}
              onPress={() => props.changePhoto()}
            >
              <Image
                source={Icons.Camera}
                style={[tw`w-6 h-6 `]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const RenderDivider = (props) => {
  return (
    <View style={[tw`justify-center `]}>
      <Text style={[tw`text-center text-gray-500 text-lg`]}>{props.title}</Text>
      <View style={[tw`bg-gray-500 w-full h-1 rounded-full bg-opacity-20`]} />
    </View>
  );
};
const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const { accessToken, userInfo } = useSelector((state) => state.auth);
  const [useProfile, setUseProfile] = useState({
    fullname: userInfo.fullname,
    email: userInfo.email,
    phone: userInfo.phone,
    picture: userInfo.picture,
    password: null,
    confirmPassword: null,
  });
  const { width } = useWindowDimensions();
  const Navigation = useNavigation();
  function handleLogout() {
    Alert.alert(
      "Apakah anda yakin?",
      "Pilih OK untuk melanjutkan logout sistem",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(logout());
            ToastAndroid.show("Logout successfull", ToastAndroid.SHORT);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }
  function onChange(name, value) {
    setUseProfile({ ...useProfile, [name]: value });
  }
  async function changePhoto() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setUseProfile({ ...useProfile, picture: result.uri });
    }
  }
  return (
    <>
      <RenderUser
        changePhoto={() => {
          changePhoto();
        }}
        uri={useProfile.picture}
      />
      <ScrollView
        style={[GlobalCss.container, tw` py-0 flex-1 my-5 `]}
        showsVerticalScrollIndicator={false}
      >
        <RenderDivider required title="Profile Pengguna" />
        <FormInput
          required
          title="Nama lengkap"
          value={useProfile.fullname}
          onChange={(value) => {
            onChange("fullname", value);
          }}
        />
        <FormInput
          required
          title="Alamat email"
          value={useProfile.email}
          disable
        />
        <FormInput
          required
          title="Nomor HP"
          value={useProfile.phone}
          onChange={(value) => {
            onChange("phone", value);
          }}
        />
        <RenderDivider required title="Ubah Password" />
        <View style={[tw`py-2 my-2 bg-[#FFE7A3]`]}>
          <Text style={[tw`text-center`]}>
            Isi jika Anda ingin mengubah password
          </Text>
        </View>
        <FormInput
          required
          title="Password Baru"
          description="Gunakan minimal 8 karakter dengan kombinasi huruf dan angka."
        />
        <FormInput required title="Konfirmasi Password" />
        <TouchableOpacity onPress={() => console.log(useProfile)}>
          <CustomButton text="Simpan" style={[tw`w-10/12 mx-auto`]} />
        </TouchableOpacity>
        <View style={[tw`h-10`]} />
      </ScrollView>
    </>
  );
};

export default EditProfileScreen;
