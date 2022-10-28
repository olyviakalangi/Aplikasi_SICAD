import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Keyboard,
  ScrollView,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  PhoneAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
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
import PhoneInput from "react-native-phone-number-input";
import { getApp, FirebaseOptions } from "firebase/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
const initialState = {
  fullname: "",
  email: "",
  password: "",
  rePassword: "",
};
const auth = getAuth();
const app = getApp();
const RegisterScreen = () => {
  const { width, height } = useWindowDimensions();
  const Navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const [formDataUser, setFormDataUser] = useState(initialState);
  const [res, setRes] = useState([]);
  const [userPicker, setUserPicker] = useState(0);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();

  function onChange(name, value) {
    setFormDataUser({ ...formDataUser, [name]: value });
  }
  async function handleRegister() {
    Keyboard.dismiss();
    if (userPicker === 0) {
      if (
        formDataUser.email == "" ||
        formDataUser.password == "" ||
        formDataUser.rePassword == "" ||
        formDataUser.fullname == ""
      ) {
        ToastAndroid.show("Mohon isi semua form", ToastAndroid.SHORT);
        return;
      }
      if (formDataUser.password !== formDataUser.rePassword) {
        ToastAndroid.show("Password tidak sama", ToastAndroid.SHORT);
        return;
      }
      try {
        await createUserWithEmailAndPassword(
          auth,
          formDataUser.email,
          formDataUser.password
        );
        await updateProfile(user, {
          displayName: formDataUser.fullname,
        });
      } catch (error) {
        if (error.code === "auth/weak-password") {
          ToastAndroid.show(
            "Password terlalu lemah, minimal 6 karakter",
            ToastAndroid.SHORT
          );
        } else if (error.code === "auth/invalid-email") {
          ToastAndroid.show("Email tidak valid", ToastAndroid.SHORT);
        } else if (error.code === "auth/email-already-in-use") {
          ToastAndroid.show("Email sudah terdaftar", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
      }
    } else {
      if (
        formDataUser.phone == "" ||
        formDataUser.password == "" ||
        formDataUser.rePassword == "" ||
        formDataUser.fullname == ""
      ) {
        ToastAndroid.show("Mohon isi semua form", ToastAndroid.SHORT);
        return;
      }
      if (formDataUser.password !== formDataUser.rePassword) {
        ToastAndroid.show("Password tidak sama", ToastAndroid.SHORT);
        return;
      }
      try {
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          formattedValue,
          recaptchaVerifier.current
        );

        setVerificationId(verificationId);
        ToastAndroid.show(
          "Verification code has been sent to your phone.",
          ToastAndroid.SHORT
        );
      } catch (error) {
        if (error.code === "auth/weak-password") {
          ToastAndroid.show(
            "Password terlalu lemah, minimal 6 karakter",
            ToastAndroid.SHORT
          );
        } else if (error.code === "auth/invalid-email") {
          ToastAndroid.show("Email tidak valid", ToastAndroid.SHORT);
        } else if (error.code === "auth/email-already-in-use") {
          ToastAndroid.show("Email sudah terdaftar", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
      }
    }
  }
  return (
    <SafeAreaView style={[GlobalCss.container, tw`justify-between`]}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <CustomInput
            iconLeft={Icons.Profile}
            placeholder="Nama Lengkap"
            onChange={(value) => onChange("fullname", value)}
            style={[tw`mb-2`]}
            value={formDataUser.fullname}
          />
          <Text style={[tw`text-error`]}>{res?.message?.fullname}</Text>
          {userPicker === 0 && (
            <>
              <CustomInput
                iconLeft={Icons.Email}
                placeholder="Email anda"
                onChange={(value) => onChange("email", value)}
                style={[tw`mb-2`]}
                textContentType="emailAddress"
                value={formDataUser.email}
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
                onChangeText={(value) => onChange("phone", value)}
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
            }}
            onChange={(value) => onChange("password", value)}
            style={[tw`mb-2`]}
            value={formDataUser.password}
          />
          <Text style={[tw`text-error`]}>{res?.message?.password}</Text>
          <CustomInput
            iconLeft={Icons.Repw}
            placeholder="Re-Password"
            iconRight={showRePassword ? Icons.Show : Icons.UnShow}
            secureTextEntry={showRePassword}
            onPress={() => {
              setShowRePassword(!showRePassword);
            }}
            onChange={(value) => onChange("rePassword", value)}
            style={[tw`mb-2`]}
            value={formDataUser.rePassword}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
