import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeaderBg from "../../components/header/CustomHeaderBg";
import MenuOptions from "../../components/menu/MenuOptions";
import Icons from "../../constants/Icons";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";

const RenderOption = (props) => {
  return (
    <TouchableOpacity>
      <View style={[tw` my-1 px-2 flex-row items-center px-10 py-5`]}>
        <Image
          source={props.icon}
          style={[tw`w-12 h-12 mr-5 `]}
          resizeMode="contain"
        />
        <View>
          <Text style={[tw`font-semibold text-lg`]}>{props.title}</Text>
          <Text style={[tw``]}>{props.description}</Text>
        </View>
      </View>
      <View style={[tw`bg-gray-500 h-1 w-full bg-opacity-50`]} />
    </TouchableOpacity>
  );
};
const SettingScreen = () => {
  const Navigation = useNavigation();
  const optionSettings = [
    {
      icon: Icons.Setting,
      title: "Pengaturan Umum",
      link: () => {
        Navigation.navigate("SettingGeneralScreen");
      },
    },
    // {
    //   icon: Icons.Admin,
    //   title: "Informasi Admin",
    //   link: () => {
    //     Navigation.navigate("InformationAdminScreen");
    //   },
    // },

    {
      icon: Icons.Faq,
      title: "Pertanyaan yang Sering Diajukan",
      link: () => {
        Navigation.navigate("FaqScreen");
      },
    },
    // {
    //   icon: Icons.Bug,
    //   title: "Pelaporan Error/Bug",
    //   link: undefined,
    // },
  ];
  return (
    <View style={[tw`  flex-1 bg-white`]}>
      <CustomHeaderBg title="Pengaturan" />
      <SafeAreaView style={[GlobalCss.containerPaddingX]}>
        <View style={[tw`justify-center mt-10`]}>
          <View style={[tw`bg-primary shadow-md h-10/12 rounded-3xl`]}>
            <View
              style={[
                tw`bg-white w-6 h-6 rounded-full shadow-md absolute top-5 left-5`,
              ]}
            />
            <View
              style={[
                tw`bg-white w-6 h-6 rounded-full shadow-md absolute bottom-5 left-5`,
              ]}
            />
            <View
              style={[
                tw`bg-white w-6 h-6 rounded-full shadow-md absolute top-5 right-5`,
              ]}
            />
            <View
              style={[
                tw`bg-white w-6 h-6 rounded-full shadow-md absolute bottom-5 right-5`,
              ]}
            />
            <View style={[tw` py-10 justify-center h-full`]}>
              {optionSettings.map((item, i) => (
                <MenuOptions key={i} {...item} />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SettingScreen;
