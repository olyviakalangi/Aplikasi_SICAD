import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
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
import * as Google from "expo-auth-session/providers/google";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUserInfo } from "../../features/auth/authSlice";
import { apiLogin } from "../../lib/api";
const initialState = {
  email: "",
  password: "",
};
const LoginScreen = () => {
  const { width, height } = useWindowDimensions();
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [formUserData, setFormUserData] = useState(initialState);
  const [res, setRes] = useState([]);
  const [request, response, promtAsync] = Google.useAuthRequest({
    androidClientId:
      "1035164682219-d7uv7nll81u7iten54dq8rtp3a54tvf4.apps.googleusercontent.com",
    iosClientId:
      "1035164682219-tva5l3k8v9ooeon1vm8fd09ito8dl73h.apps.googleusercontent.com",
    expoClientId:
      "1035164682219-tva5l3k8v9ooeon1vm8fd09ito8dl73h.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      dispatch(setAccessToken(response.authentication.accessToken));
    }
  }, [response]);
  function onChange(name, value) {
    setFormUserData({ ...formUserData, [name]: value });
  }
  function handleLogin() {
    Keyboard.dismiss();
    apiLogin(formUserData).then((response) => {
      setRes(response.data);
      dispatch(setAccessToken(response.data.token));
    });
  }
  return (
    <SafeAreaView style={[GlobalCss.container, tw`justify-between`]}>
      <View style={[tw`mt-5  `]}>
        <Text style={[tw`text-center text-primary font-bold text-3xl`]}>
          Masuk
        </Text>
        <Text style={[tw`text-center text-primaryFont  text-lg`]}>
          Mohon lengkapi form sesuai identitas Anda untuk masuk ke aplikasi{" "}
          <Text style={[tw`text-primary`]}>SMART Village</Text>
        </Text>
      </View>
      <View>
        {res.status == 400 && (
          <Text
            style={[
              tw`text-white w-full text-center bg-red-400 shadow-md py-2 text-lg rounded-full `,
            ]}
          >
            {res?.message}
          </Text>
        )}
        <CustomInput
          iconLeft={Icons.Email}
          placeholder="Email anda"
          onChange={(value) => onChange("email", value)}
          style={[tw`mb-2`]}
          textContentType="emailAddress"
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
          textContentType="password"
        />
        <Text style={[tw`text-error`]}>{res?.message?.password}</Text>
        <TouchableOpacity
          onPress={() => Navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={[tw`text-right text-primaryFont`]}>
            Lupa kata sandi?
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleLogin()}>
          <CustomButton style={[tw`my-5`]} text="Masuk" />
        </TouchableOpacity>
        <Text style={[tw`text-center shadow-sm`]}>Atau</Text>
        <TouchableOpacity
          onPress={() => {
            promtAsync({ useProxy: true, showInRecents: true });
          }}
        >
          <CustomButton
            style={[tw`my-5 bg-white text-primaryFont`]}
            text="Google"
            styleText={[tw`text-primaryFont`]}
            icon={Icons.Google}
          />
        </TouchableOpacity>
      </View>
      <View style={[tw`items-center justify-center flex-row`]}>
        <Text style={[tw`text-center text-primaryFont  text-lg `]}>
          Belum mempunyai akun?{" "}
        </Text>
        <TouchableOpacity
          style={[tw` `]}
          onPress={() => Navigation.navigate("RegisterScreen")}
        >
          <Text style={[tw`text-primary text-center    text-lg`]}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
