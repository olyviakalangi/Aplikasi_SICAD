import { View, Text, Image } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import Icons from "../../constants/Icons";

const CustomProgressBarSurat = (props) => {
  const data = [
    {
      id: "1",
      name: "Berhasil Diajukan",
      icon: Icons.BerhasilDiajukan,
      active: props.active >= 0 ? true : false,
    },
    {
      id: "2",
      name: "Persetujuan Surat",
      icon: Icons.PersetujuanSurat,
      active: props.active >= 2 ? true : false,
      reject: props.active == 1 ? true : false,
    },
    {
      id: "3",
      name: "SuratJadi",
      icon: Icons.SudahJadi,
      active: props.active == 3 ? true : false,
    },
  ];
  const length = data.length;
  return (
    <View style={[tw`justify-center flex-row w-10/12 mx-auto`]}>
      {data.map((item, index) => {
        return (
          <View style={[tw`items-center flex-1 `]} key={index}>
            <View style={[tw`pb-2`]}>
              <Image
                source={item.icon}
                style={[
                  tw.style(
                    `w-8 h-8 `,
                    item.active
                      ? `tint-secondary`
                      : item.reject
                      ? `tint-danger`
                      : `tint-gray-400`
                  ),
                ]}
                resizeMode="cover"
              />
            </View>
            <View style={[tw`relative justify-center items-center`]}>
              <View
                style={[
                  tw.style(
                    `h-1  absolute border-t border-t-white  top-[50%]`,
                    index == 0 && "left-4 w-1/2",
                    index == length - 1 && "right-4 w-1/2",
                    index != length - 1 && index != 0 && " w-full",
                    item.active
                      ? `bg-secondary`
                      : item.reject
                      ? `bg-red-400`
                      : `bg-gray-400`
                  ),
                ]}
              />
              <View
                style={[
                  tw.style(
                    `w-7 h-7 items-center justify-center rounded-full bg-gray-400`,
                    item.active
                      ? `bg-secondary`
                      : item.reject
                      ? `bg-danger`
                      : `bg-gray-400`
                  ),
                ]}
              >
                {item.active ? (
                  <Image
                    source={Icons.Check}
                    style={[tw`w-5 h-5 tint-primary`]}
                  />
                ) : item.reject ? (
                  <Image
                    source={Icons.Alert}
                    style={[tw`w-5 h-5 tint-primary`]}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={[tw`text-primary font-bold`]}>{index + 1}</Text>
                )}
              </View>
            </View>
            <Text
              style={[
                tw.style(
                  `font-bold text-center text-gray-400`,
                  item.active
                    ? `text-secondary`
                    : item.reject
                    ? `text-danger`
                    : `text-gray-400`
                ),
              ]}
            >
              {item.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default CustomProgressBarSurat;
