import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ToastAndroid,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
import CustomButton from "../../components/generals/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useState } from "react";
import { onStateChange, setUserInfo } from "../../features/auth/authSlice";
import { apitGetOnceUserDetail } from "../../lib/api";
const auth = getAuth();
const VerifOtpScreen = () => {
  const { verificationId, userInfo, tokenAccess } = useSelector(
    (state) => state.auth
  );
  const [verificationCode, setVerificationCode] = useState(null);
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  async function handleVerifOtp() {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      dispatch(onStateChange());
      ToastAndroid.show(
        "Phone authentication successful 👍",
        ToastAndroid.SHORT
      );
    } catch (err) {
      if (err.code === "auth/invalid-verification-code") {
        ToastAndroid.show("Kode verifikasi salah😢", ToastAndroid.SHORT);
      }
    }
  }
  return (
    <SafeAreaView style={[GlobalCss.container, tw`justify-start`]}>
      <View style={[tw`mt-5  `]}>
        <Text style={[tw`text-center text-primary font-bold text-3xl`]}>
          Verifikasi Akun
        </Text>
        <Text style={[tw`text-center text-primaryFont  text-lg`]}>
          Masukan kode verifikasi yang sudah di kirim ke nomer telepon{" "}
          <Text style={[tw`text-primary`]}>{userInfo?.phone}</Text>
        </Text>
      </View>
      <OTPInputView
        style={[
          tw`justify-center items-center mx-auto`,
          { width: "80%", height: 200 },
        ]}
        pinCount={6}
        codeInputFieldStyle={[
          tw`rounded-lg border-2 text-primaryFont text-lg  shadow-sm text-lg bg-white `,
          { width: width / 10, height: width / 10 },
        ]}
        codeInputHighlightStyle={[tw`border-primary`]}
        autoFocusOnLoad={false}
        onCodeChanged={(code) => setVerificationCode(code)}
      />
      <View>
        <TouchableOpacity onPress={() => handleVerifOtp()}>
          <CustomButton text="Verifikasi" style={[tw`my-5`]} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  box: {
    margin: 10,
    flex: 1,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 30,
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
export default VerifOtpScreen;
