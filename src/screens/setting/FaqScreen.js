import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Animated,
  ToastAndroid,
  Button,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
import Dummy from "../../constants/Dummy";
import CustomHeaderBg from "../../components/header/CustomHeaderBg";
import MenuOptions from "../../components/menu/MenuOptions";
import Icons from "../../constants/Icons";
import { Video } from "expo-av";

const RenderOption = (props) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const fadeAnim = useRef(new Animated.Value(0));
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
    }).start();
  };

  return (
    <View style={[GlobalCss.containerMarginX]}>
      <View
        style={[
          tw`bg-white border my-2 rounded-xl border-primary shadow-md py-2`,
        ]}
      >
        <TouchableOpacity
          style={[tw` my-1 px-2 flex-row items-center  justify-between`]}
          onPress={() => {
            setOpen(!open);
            let widthc = fadeAnim.current;
          }}
        >
          <Text style={[tw`font-semibold text-sm w-11/12 self-start`]}>
            {props.title}
          </Text>
          <Image
            source={Icons.Dropdown}
            style={[
              tw`w-3 h-3 tint-primary `,
              { transform: [{ rotate: !open ? "0deg" : "90deg" }] },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {open && (
        <View
          style={[
            tw`pt-5 bg-primary border my-2 rounded-xl border-primary shadow-md py-2 px-2`,
          ]}
        >
          <Text style={[tw`text-white font-semibold`]}>{props.desc}</Text>
        </View>
      )}
    </View>
  );
};
const FaqScreen = () => {
  return (
    <View style={[tw`  flex-1 bg-white`]}>
      <CustomHeaderBg title="Petunjuk Penggunaan" />
      <SafeAreaView style={[GlobalCss.containerPaddingX, tw`flex-1`]}>
        <ScrollView style={[tw` `]} showsVerticalScrollIndicator={false}>
          {Dummy.FaqItem.map((item, i) => (
            <RenderOption key={i} index={i} {...item} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FaqScreen;
