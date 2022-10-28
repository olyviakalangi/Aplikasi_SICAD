import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
import CustomButton from "../../components/generals/CustomButton";
import CustomInput from "../../components/generals/CustomInput";
import Icons from "../../constants/Icons";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={[GlobalCss.container, tw`justify-start`]}>
      <View style={[tw`mt-5  `]}>
        <Text style={[tw`text-center text-primary font-bold text-3xl`]}>
          Lupa Kata Sandi
        </Text>
        <Text style={[tw`text-center text-primaryFont  text-lg`]}>
          Masukan alamat email Anda untuk reset kata sandi pada aplikasi{" "}
          <Text style={[tw`text-primary`]}>SICAD Ngadiluwih</Text>
        </Text>
      </View>
      <View style={[tw`mt-10`]}>
        <CustomInput iconLeft={Icons.Email} placeholder="Email anda" />
      </View>
      <View>
        <TouchableOpacity onPress={() => Navigation.navigate("VerifOtpScreen")}>
          <CustomButton text="Lupa Kata Sandi" style={[tw`my-5`]} />
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
export default ForgotPasswordScreen;
