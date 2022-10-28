import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalCss from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import tw from "../../lib/tailwind";
import Images from "../../constants/Images";
import CustomButton from "../../components/generals/CustomButton";
import CustomInput from "../../components/generals/CustomInput";
import Icons from "../../constants/Icons";
import LoginScreen from "./LoginScreen";
import { apiRegister } from "../../lib/api";
const initialState = {
  fullname: "",
  email: "",
  password: "",
  rePassword: "",
};
const RegisterScreen = () => {
  const { width, height } = useWindowDimensions();
  const Navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const [formDataUser, setFormDataUser] = useState(initialState);
  const [res, setRes] = useState([]);
  function onChange(name, value) {
    setFormDataUser({ ...formDataUser, [name]: value });
  }
  function handleRegister() {
    apiRegister(formDataUser).then((response) => {
      setRes(response.data);
      if (response.data.status === 200 || response.data.status === 201) {
        if (response.data.status === 200) {
          Navigation.navigate("LoginScreen");
        }
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Register Failed", ToastAndroid.SHORT);
      }
    });
  }
  return (
    <SafeAreaView style={[GlobalCss.container, tw`justify-between`]}>
      <View style={[tw`mt-5  `]}>
        <Text style={[tw`text-center text-primary font-bold text-3xl`]}>
          Daftar
        </Text>
        <Text style={[tw`text-center text-primaryFont  text-lg`]}>
          Lengkapi form sesuai dengan identitas Anda untuk daftar ke aplikasi{" "}
          <Text style={[tw`text-primary`]}>SICAD Ngadiluwih</Text>
        </Text>
      </View>
      <View>
        <CustomInput
          iconLeft={Icons.Profile}
          placeholder="Nama Lengkap"
          onChange={(value) => onChange("fullname", value)}
          style={[tw`mb-2`]}
        />
        <Text style={[tw`text-error`]}>{res?.message?.fullname}</Text>
        <CustomInput
          iconLeft={Icons.Email}
          placeholder="Email anda"
          onChange={(value) => onChange("email", value)}
          style={[tw`mb-2`]}
        />
        <Text style={[tw`text-error`]}>{res?.message?.email}</Text>
        <CustomInput
          iconLeft={Icons.Password}
          placeholder="Password"
          iconRight={showPassword ? Icons.Show : Icons.UnShow}
          secureTextEntry={showPassword}
          onPress={() => {
            setShowPassword(!showPassword);
            ToastAndroid.show(
              showPassword ? "Buka" : "tutup",
              ToastAndroid.SHORT
            );
          }}
          onChange={(value) => onChange("password", value)}
          style={[tw`mb-2`]}
        />
        <Text style={[tw`text-error`]}>{res?.message?.password}</Text>
        <CustomInput
          iconLeft={Icons.Repw}
          placeholder="Re-Password"
          iconRight={showRePassword ? Icons.Show : Icons.UnShow}
          secureTextEntry={showRePassword}
          onPress={() => {
            setShowRePassword(!showRePassword);
            ToastAndroid.show(
              showRePassword ? "Buka" : "tutup",
              ToastAndroid.SHORT
            );
          }}
          onChange={(value) => onChange("rePassword", value)}
          style={[tw`mb-2`]}
        />
        <Text style={[tw`text-error`]}>{res?.message?.rePassword}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleRegister()}>
          <CustomButton style={[tw`my-5`]} text="Daftar" />
        </TouchableOpacity>
      </View>
      <View style={[tw`items-center justify-center flex-row`]}>
        <Text style={[tw`text-center text-primaryFont  text-lg `]}>
          Sudah mempunyai akun?{" "}
        </Text>
        <TouchableOpacity
          style={[tw` `]}
          onPress={() => Navigation.navigate("LoginScreen")}
        >
          <Text style={[tw`text-primary text-center    text-lg`]}>Masuk</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
