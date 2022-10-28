import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import Images from "../../constants/Images";
import Icons from "../../constants/Icons";

const FormInput = (props) => {
  return (
    <View style={[tw`my-2`, props.styleTop, { elevation: 0 }]}>
      <Text style={[tw`ml-3`]}>
        {props.title}{" "}
        <Text style={[tw`text-error`, { fontFamily: "Poppins_500Medium" }]}>
          {props.required && "*"}
        </Text>
      </Text>
      <TextInput
        style={[
          tw`w-full bg-white border border-placeholder rounded-full my-1 overflow-hidden flex-row py-1 px-2 w-full`,
          props.style,
        ]}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChange}
        textContentType={props.textContentType}
        value={props.value}
        editable={!props.disable}
        selectTextOnFocus={!props.disable}
        keyboardType={props.keyboardType}
      />
      <Text style={[tw`px-5`, { fontFamily: "Poppins_500Medium" }]}>
        {props.description}
      </Text>
    </View>
  );
};

export default FormInput;
