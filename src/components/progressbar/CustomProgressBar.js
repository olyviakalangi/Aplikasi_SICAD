import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import Icons from "../../constants/Icons";

const CustomProgressBar = (props) => {
  const length = props.data.length;
  return (
    <View style={[tw`justify-between flex-row w-10/12 mx-auto flex-wrap`]}>
      {props.data.map((item, index) => {
        return (
          <View style={[tw`items-center flex-1`]} key={index}>
            <View
              style={[
                tw.style(
                  `h-1  absolute bg-secondary border-t border-t-white  top-[30%]`,
                  index == 0 && "right-0 w-6/12",
                  index == length - 1 && " left-0 w-6/12",
                  index != length - 1 && index != 0 && " left-0 w-12/12"
                ),
              ]}
            />
            <TouchableOpacity
              style={[
                tw.style(
                  `w-10 h-10 items-center justify-center rounded-full bg-white`,
                  props.active > index + 1 && `bg-secondary`
                ),
              ]}
              onPress={() => {
                try {
                  props.onPress();
                } catch (error) {}
              }}
            >
              {props.active > index + 1 ? (
                <Image
                  source={Icons.Check}
                  style={[tw`w-5 h-5 tint-primary`]}
                />
              ) : (
                <Text style={[tw`text-primary font-bold`]}>{index + 1}</Text>
              )}
            </TouchableOpacity>
            <Text style={[tw`text-secondary font-bold text-center`]}>
              {item.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default CustomProgressBar;
