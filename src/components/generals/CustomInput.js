import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import Images from "../../constants/Images";
import Icons from "../../constants/Icons";

const CustomInput = (props) => {
  return (
    <View
      style={[
        tw` h-15 bg-white border border-placeholder rounded-full my-5 overflow-hidden flex-row p-2`,
        props.style,
      ]}
    >
      {props.iconLeft && (
        <View style={[tw`w-2/12 justify-center items-center`]}>
          <Image
            source={props.iconLeft}
            resizeMode="contain"
            style={[tw`h-1/2 `, { aspectRatio: 1 }]}
          />
        </View>
      )}
      <TextInput
        style={[
          tw.style(
            `  text-base`,
            props.iconLeft ? `ml-0` : `ml-4`,
            props.iconRight ? `w-8/12` : `w-10/12`
          ),
        ]}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChange}
        textContentType={props.textContentType}
        value={props.value}
        ref={props.ref}
      />
      <TouchableOpacity
        style={[tw`w-2/12 justify-center items-center`]}
        onPress={() => props.onPress()}
      >
        <Image
          source={props.iconRight}
          resizeMode="contain"
          style={[tw`h-1/2 `, { aspectRatio: 1 }]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomInput;
