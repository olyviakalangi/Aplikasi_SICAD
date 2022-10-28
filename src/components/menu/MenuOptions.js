import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";

const MenuOptions = (props) => {
  return (
    <TouchableOpacity onPress={() => props.link()}>
      <View style={[tw` my-1 flex-row items-center px-15 py-5`]}>
        <Image
          source={props.icon}
          style={[tw`w-10 h-10 mr-5 tint-white `]}
          resizeMode="contain"
        />
        <View>
          <Text
            style={[
              tw`font-semibold text-lg text-white mr-1 `,
              { fontFamily: "Poppins_500Medium" },
            ]}
          >
            {props.title}
          </Text>
          {props.description && <Text style={[tw``]}>{props.description}</Text>}
        </View>
      </View>
      <View style={[tw`bg-white h-[2px] w-full   pr-5`]} />
    </TouchableOpacity>
  );
};

export default MenuOptions;
