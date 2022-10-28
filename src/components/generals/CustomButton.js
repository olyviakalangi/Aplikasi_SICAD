import { View, Text, Image } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";

const CustomButton = (props) => {
  return (
    <View
      style={[
        tw`justify-center items-center flex-row w-full bg-primary rounded-full py-4 shadow-sm`,
        props.style,
      ]}
    >
      {props.icon && (
        <View style={[tw` overflow-hidden mr-3`]}>
          <Image source={props.icon} resizeMode="cover" style={[tw`h-5 w-5`]} />
        </View>
      )}
      <Text
        style={[
          tw`text-white font-bold text-lg `,
          props.styleText,
          { fontFamily: "Poppins_500Medium" },
        ]}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default CustomButton;
