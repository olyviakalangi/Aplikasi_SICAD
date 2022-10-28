import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import CustomButton from "../generals/CustomButton";

export default function ButtonBottom(props) {
  const slideIn = props.slideIn;
  const formDataUser = props.formDataUser;

  return (
    <View style={[tw`flex-row`]}>
      {slideIn > 0 && (
        <TouchableOpacity
          onPress={() => {
            props.setSlideIn(slideIn - 1);
          }}
        >
          <CustomButton
            text="Kembali"
            style={[tw`bg-white w-9/12 mx-auto my-5 bg-secondary`]}
            styleText={[tw`text-white`]}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[tw`flex-1`]} onPress={() => props.onPress()}>
        <CustomButton
          text="Berikutnya"
          style={[tw`bg-white w-9/12 mx-auto my-5`]}
          styleText={[tw`text-primary`]}
        />
      </TouchableOpacity>
    </View>
  );
}
