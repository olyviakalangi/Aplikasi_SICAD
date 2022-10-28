import React from "react";
import {
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import MenuTabDivider from "../../components/divider/MenuTabDivider";
import CustomHeaderBg from "../../components/header/CustomHeaderBg";
import Icons from "../../constants/Icons";
import Images from "../../constants/Images";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";

const InformationAdminScreen = () => {
  const Contact = [
    {
      Image: Icons.ContactAdmin1,
      name: "Admin 1 - Mas Pipit:",
      desc: "+6281249884216",
    },
    {
      Image: Icons.ContactAdmin2,
      name: "Admin 2 - Mba Oliv:",
      desc: "+6282132513532",
    },
    {
      Image: Icons.ContactEmail,
      name: "balaidesangadiluwih@gmail.com",
      desc: "",
    },
  ];
  const { width } = useWindowDimensions();
  return (
    <View style={[tw`justify-between h-full bg-white `]}>
      <CustomHeaderBg title="Informasi Admin" style={[tw` pb-5`]} />
      <ScrollView style={[tw`flex-1`]}>
        <View
          style={[
            tw`bg-secondary rounded-3xl  bg-opacity-60  my-10 `,
            GlobalCss.containerMarginX,
            GlobalCss.container,
            {
              flex: 0,
              borderRadius: width * 0.1,
            },
          ]}
        >
          <Image
            source={Images.Logo}
            style={[tw`w-50 h-50 mx-auto`]}
            resizeMode="cover"
          />
          <View
            style={[
              tw`w-full bg-black rounded-full bg-opacity-20 -mt-10 mb-10`,
              { height: 2 },
            ]}
          />
          <View style={[tw` justify-center`]}>
            {Contact.map((item, index) => (
              <View key={index} style={[tw`mt-3`]}>
                <Image
                  source={item.Image}
                  style={[tw`w-16 h-16 mx-auto`]}
                  resizeMode="contain"
                />
                <View style={[tw`items-center mt-1`]}>
                  <Text style={[tw`font-semibold text-white shadow-md`]}>
                    {item.name}
                  </Text>
                  <Text style={[tw`font-semibold text-white shadow-md`]}>
                    {item.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <MenuTabDivider />
      </ScrollView>
    </View>
  );
};

export default InformationAdminScreen;
