import { useState } from "react";
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icons from "../../constants/Icons";
import tw from "../../lib/tailwind";

export default function DropdownInput(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <View style={[tw`my-2 shadow-md`, props.styleTop]}>
      <Text style={[tw`ml-3`]}>
        {props.title}{" "}
        <Text style={[tw`text-error`]}>{props.required && "*"}</Text>
      </Text>
      <TouchableOpacity
        style={[
          tw`w-full bg-white border border-placeholder rounded-full my-1 overflow-hidden flex-row py-2 px-2 w-full justify-between items-center`,
          props.style,
        ]}
        onPress={() => setOpen(!open)}
      >
        <Text>{props.placeholder}</Text>
        <Image
          source={Icons.Dropdown}
          style={[
            tw`w-3 h-3 tint-primary`,
            { transform: [{ rotate: open ? "180deg" : "0deg" }] },
          ]}
          resizeMode="cover"
        />
      </TouchableOpacity>
      {open && (
        <View
          style={[
            tw`w-full bg-white border border-placeholder rounded-xl overflow-hidden w-full   `,
            ,
          ]}
        >
          {props.data &&
            props?.data.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setValue(item.id);
                  setOpen(false);
                  props.onChange(item.id);
                }}
              >
                <Text
                  style={[
                    tw.style(
                      `py-1 px-2`,
                      index % 2 == 0 ? "bg-bgLightGreen" : "bg-white"
                    ),
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
      <Text style={[tw`px-5`]}>{props.description}</Text>
    </View>
  );
}
