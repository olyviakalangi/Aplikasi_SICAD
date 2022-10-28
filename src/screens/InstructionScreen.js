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
import tw from "../lib/tailwind";
import GlobalCss from "../styles/global";
import Dummy from "../constants/Dummy";
import CustomHeaderBg from "../components/header/CustomHeaderBg";
import MenuOptions from "../components/menu/MenuOptions";
import Icons from "../constants/Icons";
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
    <View
      style={[
        tw`bg-primary my-2 rounded-3xl shadow-md p-2`,
        GlobalCss.containerMarginX,
      ]}
    >
      <TouchableOpacity
        style={[tw` my-1 px-2 flex-row items-center`]}
        onPress={() => {
          setOpen(!open);
          let widthc = fadeAnim.current;
        }}
      >
        <Image
          source={Icons.Play}
          style={[
            tw`w-10 h-10 mr-5 tint-secondary `,
            { transform: [{ rotate: !open ? "0deg" : "90deg" }] },
          ]}
          resizeMode="contain"
        />
        <View style={[tw`flex-row items-center flex-1 pr-2`]}>
          <Text
            style={[
              tw`font-semibold mr-2  text-secondary`,
              { fontFamily: "Poppins_500Medium" },
            ]}
          >
            {props.index + 1}.
          </Text>
          <Text
            style={[
              tw`font-semibold text-secondary`,
              { fontFamily: "Poppins_500Medium" },
            ]}
          >
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
      {open && (
        <View style={[tw`pt-5`]}>
          <Video
            ref={video}
            style={[
              tw` mx-auto rounded-md shadow-md`,
              { width: width * 0.7, height: width * 0.7 * (9 / 16) },
            ]}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode="cover"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>
      )}
    </View>
  );
};
const InstructionScreen = () => {
  return (
    <View style={[tw`  flex-1 bg-bgLightGreen`]}>
      <CustomHeaderBg title="Petunjuk Penggunaan" />
      <SafeAreaView style={[GlobalCss.containerPaddingX, tw`flex-1`]}>
        <ScrollView style={[tw` `]} showsVerticalScrollIndicator={false}>
          {Dummy.InstructionItem.map((item, i) => (
            <RenderOption key={i} index={i} {...item} />
          ))}
        </ScrollView>
        <Text
          style={[
            tw`py-5 text-center font-semibold text-primary`,
            ,
            { fontFamily: "Poppins_500Medium" },
          ]}
        >
          Hak Cipta © 2022 Smart Village
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default InstructionScreen;
