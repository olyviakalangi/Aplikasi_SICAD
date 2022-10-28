import { useNavigation } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { getApp } from "firebase/app";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
import { setUserInfo, setVerificationId } from "../../features/auth/authSlice";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
const initialState = {
  phone: "",
};
const auth = getAuth();
const app = getApp();
const LoginScreen = () => {
  const { verificationId } = useSelector((state) => state.auth);
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
  const recaptchaVerifier = useRef(null);
  function onChange(name, value) {
    setFormUserData({ ...formUserData, [name]: value, error: false });
  }
  async function handleLogin() {
    Keyboard.dismiss();
    if (formUserData.phone == "") {
      ToastAndroid.show("Mohon isi nomor telepon", ToastAndroid.SHORT);
      return;
    } else if (phoneInput?.current.isValidNumber(value) === false) {
      ToastAndroid.show("Nomor telepon tidak valid", ToastAndroid.SHORT);
      return;
    }
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verifId = await phoneProvider.verifyPhoneNumber(
        formUserData.phone,
        recaptchaVerifier.current
      );
      dispatch(setUserInfo({ phone: formUserData.phone }));
      dispatch(setVerificationId(verifId));
      ToastAndroid.show(
        "Kode verifikasi telah dikirim ke nomor telepon anda",
        ToastAndroid.SHORT
      );
      Navigation.navigate("VerifOtpScreen");
    } catch (error) {
      if (error.code === "auth/invalid-phone-number") {
        ToastAndroid.show("Nomor telepon tidak valid", ToastAndroid.SHORT);
      } else if (error.code === "auth/network-request-failed") {
        ToastAndroid.show("Tidak ada koneksi internet", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  }

  return (
    <SafeAreaView style={[GlobalCss.container, tw`justify-center`]}>
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
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
        />
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
            setFormUserData({ ...formUserData, phone: text });
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <Text style={[tw`text-error`]}>{res?.message?.phone}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleLogin()}>
          <CustomButton style={[tw`my-5`]} text="Masuk" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
