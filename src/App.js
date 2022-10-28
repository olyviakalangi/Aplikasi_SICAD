import * as React from "react";
import "./config/firebase";
import { Provider } from "react-redux";
import Store from "./Store";
import RootNavigation from "./navigations";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { ActivityIndicator, Text, View } from "react-native";
import tw from "./lib/tailwind";
import { useSelector } from "react-redux";

export function App() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });
  const MyTheme = {
    colors: {
      background: "white",
    },
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  );
}
