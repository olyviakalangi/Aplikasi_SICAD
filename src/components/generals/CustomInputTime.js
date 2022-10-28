import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "../../lib/tailwind";

const CustomInputTime = (props) => {
  const date = new Date(props.value);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return (
    <TouchableOpacity
      style={[tw`my-2`, props.styleTop, { elevation: 0 }]}
      onPress={() => props.onPress()}
    >
      <Text style={[tw`ml-3`]}>
        {props.title}{" "}
        <Text style={[tw`text-error`]}>{props.required && "*"}</Text>
      </Text>
      <Text
        style={[
          tw`w-full bg-white border border-placeholder rounded-full my-1 overflow-hidden flex-row py-2 px-2 w-full`,
          props.style,
        ]}
      >
        {hour > 9 ? hour : "0" + hour}:{minute > 9 ? minute : "0" + minute}
      </Text>
      <Text style={[tw`px-5`]}>{props.description}</Text>
    </TouchableOpacity>
  );
};

export default CustomInputTime;
