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
import { logout, setUserInfo } from "../../features/auth/authSlice";
import MenuOptions from "../../components/menu/MenuOptions";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/generals/CustomInput";
import FormInput from "../../components/generals/FormInput";
import CustomButton from "../../components/generals/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { apiUpdateUserDetailWithPicture } from "../../lib/api";

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
                {userInfo.nama_lengkap.split(" ")[0].substring(0, 1)}
                {userInfo.nama_lengkap.split(" ")[1].substring(0, 1)}
              </Text>
            </View>
          )}
          <View style={[tw`absolute right-4 bottom-0 `]}>
            <TouchableOpacity
              style={[
                tw`w-8 h-8  bg-secondary rounded-full items-center justify-center shadow-md`,
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
    <View style={[tw`justify-center py-6 `]}>
      <Text
        style={[
          tw`text-center text-gray-500 text-lg`,
          ,
          { fontFamily: "Poppins_500Medium" },
        ]}
      >
        {props.title}
      </Text>
    </View>
  );
};
const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const { accessToken, userInfo } = useSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState(null);
  const [useProfile, setUseProfile] = useState({
    nama_lengkap: userInfo.nama_lengkap,
    phone: userInfo.phone,
    picture: userInfo.picture,
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
      setImageFile(result);
    }
  }
  function handleSubmit() {
    let formData = new FormData();
    formData.append("nama_lengkap", useProfile.nama_lengkap);
    if (imageFile) {
      formData.append("picture", {
        uri: imageFile.uri,
        type: "image/jpeg",
        name: "imagename.jpg",
      });
    } else {
      formData.append("picture", null);
    }
    apiUpdateUserDetailWithPicture(accessToken, formData)
      .then((res) => {
        dispatch(setUserInfo(res.data.data));
        ToastAndroid.show("Update successfull", ToastAndroid.SHORT);
        Navigation.navigate("ProfileScreen");
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.show("Update failed", ToastAndroid.SHORT);
      });
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
          value={useProfile.nama_lengkap}
          onChange={(value) => {
            onChange("nama_lengkap", value);
          }}
        />
        <FormInput
          required
          title="Nomor HP"
          value={useProfile.phone}
          onChange={(value) => {
            onChange("phone", value);
          }}
          disable
        />
        <TouchableOpacity onPress={() => handleSubmit()}>
          <CustomButton text="Simpan" style={[tw`w-10/12 mx-auto`]} />
        </TouchableOpacity>
        <View style={[tw`h-10`]} />
      </ScrollView>
    </>
  );
};

export default EditProfileScreen;
