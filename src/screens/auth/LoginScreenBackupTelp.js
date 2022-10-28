import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/generals/CustomButton";
import CustomInput from "../../components/generals/CustomInput";
import Icons from "../../constants/Icons";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
const initialState = {
  email: "",
  password: "",
  phone: "",
};
const auth = getAuth();
const LoginScreen = () => {
  const { width, height } = useWindowDimensions();
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [formUserData, setFormUserData] = useState(initialState);
  const [res, setRes] = useState([]);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [userPicker, setUserPicker] = useState(0);
  const phoneInput = useRef(null);
  function onChange(name, value) {
    setFormUserData({ ...formUserData, [name]: value, error: false });
  }
  async function handleLogin() {
    Keyboard.dismiss();
    if (userPicker === 0) {
      if (formUserData.email === "" || formUserData.password === "") {
        ToastAndroid.show("Mohon isi semua form", ToastAndroid.SHORT);
        return;
      }
      try {
        await signInWithEmailAndPassword(
          auth,
          formUserData.email,
          formUserData.password
        );
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          ToastAndroid.show("Email tidak terdaftar", ToastAndroid.SHORT);
        } else if (error.code === "auth/invalid-email") {
          ToastAndroid.show("Email tidak valid", ToastAndroid.SHORT);
        } else {
          setFormUserData({
            ...formUserData,
            error: error.message,
          });
        }
      }
    } else {
      if (formUserData.phone === "" || formUserData.password === "") {
        setFormUserData({
          ...formUserData,
          error: "Nomor telephone dan password wajib diisi.",
        });
        return;
      }
      try {
        await signInWithEmailAndPassword(
          auth,
          formUserData.email,
          formUserData.password
        );
      } catch (error) {
        setFormUserData({
          ...formUserData,
          error: error.message,
        });
      }
    }
  }

  return (
    <SafeAreaView style={[GlobalCss.container, tw`justify-between`]}>
      <View style={[tw`mt-5  `]}>
        <Text style={[tw`text-center text-primary font-bold text-3xl`]}>
          Masuk
        </Text>
        <Text style={[tw`text-center text-primaryFont  text-lg`]}>
          Mohon lengkapi form sesuai identitas Anda untuk masuk ke aplikasi{" "}
          <Text style={[tw`text-primary`]}>SICAD Ngadiluwih</Text>
        </Text>
      </View>
      <View>
        <View style={[tw`flex-row items-center justify-center my-5`]}>
          <TouchableOpacity onPress={() => setUserPicker(0)}>
            <Text
              style={[
                tw.style(`px-5 py-1 font-bold text-white rounded-l-full`),
                userPicker === 0 ? tw`bg-primary` : tw`bg-gray-500`,
              ]}
            >
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserPicker(1)}>
            <Text
              style={[
                tw.style(`px-5 py-1 font-bold text-white rounded-r-full`),
                userPicker === 1 ? tw`bg-primary` : tw`bg-gray-500`,
              ]}
            >
              Telepon
            </Text>
          </TouchableOpacity>
        </View>
        {userPicker === 0 && (
          <>
            <CustomInput
              iconLeft={Icons.Email}
              placeholder="Email anda"
              onChange={(value) => onChange("email", value)}
              style={[tw`mb-2`]}
              textContentType="emailAddress"
              value={formUserData.email}
            />
            <Text style={[tw`text-error`]}>{res?.message?.email}</Text>
          </>
        )}
        {userPicker === 1 && (
          <>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="ID"
              containerStyle={[
                tw`border-placeholder rounded-full w-full overflow-hidden border mt-5  `,
              ]}
              layout="first"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
            <Text style={[tw`text-error`]}>{res?.message?.phone}</Text>
          </>
        )}
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
            handleLogin();
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
