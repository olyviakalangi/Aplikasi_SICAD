import { View, Text } from "react-native";
import React from "react";
import FormInput from "./FormInput";
import tw from "../../lib/tailwind";
import CustomInputDate from "./CustomInputDate";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DropdownInput from "./DropdownInput";
import CustomInputTime from "./CustomInputTime";
import FormFileInput from "./FormFileInput";
import Icons from "../../constants/Icons";
export default function GenerateInputForm(props) {
  const itemData = props.itemData;
  if (itemData.type === "options") {
    let value = itemData.placeholder;
    if (itemData.value != "") {
      try {
        value = itemData.options[itemData.value - 1].label;
      } catch (error) {}
    } else {
      value = itemData.placeholder;
    }
    return (
      <DropdownInput
        placeholder={value}
        title={itemData.title}
        required={itemData.required}
        data={itemData.options}
        styleTop={[tw`my-0`]}
        onChange={(value) => {
          props.onChange(itemData.name, value);
        }}
        value={itemData.value}
      />
    );
  }
  if (itemData.type === "date") {
    return (
      <CustomInputDate
        title={itemData.title}
        required={itemData.required}
        styleTop={[tw` my-0 flex-1`]}
        onPress={() => {
          try {
            DateTimePickerAndroid.open({
              value: new Date(itemData.value),
              onChange: (event, selectedDate) => {
                const currentDate = selectedDate || new Date(itemData.value);
                console.log(currentDate, itemData.value);
                props.onChange(itemData.name, currentDate);
              },
              mode: "date",
            });
          } catch (error) {
            props.onChange(itemData.name, new Date(2001, 13, 10));
          }
        }}
        value={itemData.value}
      />
    );
  }
  if (itemData.type == "time") {
    return (
      <CustomInputTime
        title={itemData.title}
        required={itemData.required}
        styleTop={[tw` my-0 flex-1`]}
        onPress={() => {
          try {
            DateTimePickerAndroid.open({
              value: new Date(itemData.value),
              onChange: (event, selectedDate) => {
                const currentDate = selectedDate || new Date(itemData.value);
                props.onChange(itemData.name, currentDate);
              },
              mode: "time",
            });
          } catch (error) {
            props.onChange(itemData.name, new Date(2001, 13, 10));
          }
        }}
        value={itemData.value}
      />
    );
  }
  if (itemData.type == "header") {
    return (
      <Text style={[tw`font-bold text-gray-500 text-lg mb-5 text-center`]}>
        {item.title}
      </Text>
    );
  }
  if (itemData.type == "file") {
    return (
      <FormFileInput
        title={itemData.title}
        value={itemData.value}
        styleTop={[tw`my-0`]}
        onChange={(text) => {
          props.onChange(itemData.name, text);
        }}
        icon={itemData.value ? [{ uri: itemData.value.uri }] : Icons.PaperSolid}
        required={itemData.required}
        description={itemData.description}
      />
    );
  }
  return (
    <FormInput
      title={itemData.title}
      value={itemData.value}
      styleTop={[tw`my-0`]}
      onChange={(text) => {
        props.onChange(itemData.name, text);
      }}
      keyboardType={itemData.type}
      required={itemData.required}
    />
  );
}
