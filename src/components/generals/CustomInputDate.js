import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import Images from "../../constants/Images";
import Icons from "../../constants/Icons";

const CustomInputDate = (props) => {
  const date = new Date(props.value);
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

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
        {date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}/
        {monthNames[date.getUTCMonth()]}/{date.getUTCFullYear()}
      </Text>
      <Text style={[tw`px-5`]}>{props.description}</Text>
    </TouchableOpacity>
  );
};

export default CustomInputDate;
