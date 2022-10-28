import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import Icons from "../../constants/Icons";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = (props) => {
  const navigation = useNavigation();
  return (
    <View style={[tw` flex-row items-center pt-5 pb-10`, props.style]}>
      <TouchableOpacity
        style={[
          tw`shadow-md bg-secondary w-5 h-5 rounded-full items-center justify-center mr-5`,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={Icons.Back}
          style={[tw`w-3 h-3`, { tintColor: "#fff" }]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text
        style={[
          tw`font-semibold text-lg text-secondary`,
          props.styleText,
          { fontFamily: "Poppins_500Medium" },
        ]}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default CustomHeader;
