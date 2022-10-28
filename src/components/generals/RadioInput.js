import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import tw from "../../lib/tailwind";

export default function RadioInput(props) {
  const radioButtonsData = [
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Laki-laki",
      value: 0,
      selected: props.value == 0,
      onPress: () => {
        props.onChange(0);
      },
    },
    {
      id: "2",
      label: "Perempuan",
      value: 1,
      selected: props.value == 1,
      onPress: () => {
        props.onChange(1);
      },
    },
  ];

  return (
    <View style={[tw`my-2`, props.styleTop]}>
      <Text style={[tw`ml-3`]}>
        {props.title}{" "}
        <Text style={[tw`text-error`]}>{props.required && "*"}</Text>
      </Text>
      <View style={[tw`flex-row justify-between px-5`]}>
        {radioButtonsData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[tw`flex-row `]}
            onPress={item.onPress}
          >
            <View
              style={[
                tw.style(
                  "w-5 h-5 rounded-full mr-2 shadow-md",
                  item.selected
                    ? `bg-primary`
                    : ` bg-white border border-gray-300`
                ),
              ]}
            ></View>
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[tw`px-5`]}>{props.description}</Text>
    </View>
  );
}
