import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import Icons from "../../constants/Icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalCss from "../../styles/global";

const CustomHeaderBg = (props) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        tw`bg-primary shadow-md pt-5 `,
        {
          borderBottomEndRadius: width * 0.1,
          borderBottomStartRadius: width * 0.1,
        },
        props.styleTop,
      ]}
    >
      <SafeAreaView
        style={[
          tw` flex-row items-center pt-0 pb-8`,
          GlobalCss.containerPaddingX,
          props.style,
        ]}
      >
        <TouchableOpacity
          style={[
            tw`shadow-md bg-secondary w-5 h-5 rounded-full items-center justify-center mr-5`,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={Icons.Back}
            style={[tw`w-3 h-3`, { tintColor: "#fff" }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text
          style={[tw`font-semibold text-lg text-secondary`, props.styleText]}
        >
          {props.title}
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default CustomHeaderBg;
