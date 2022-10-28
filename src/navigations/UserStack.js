import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import InstructionScreen from "../screens/InstructionScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";
import PermohonanBoroScreen from "../screens/permohonansurat/PermohonanBoroScreen";
import PermohonanDomisiliScreen from "../screens/permohonansurat/PermohonanDomisiliScreen";
import PermohonanHubunganKeluargaScreen from "../screens/permohonansurat/PermohonanHubunganKeluargaScreen";
import PermohonanKayuScreen from "../screens/permohonansurat/PermohonanKayuScreen";
import PermohonanKehilanganScreen from "../screens/permohonansurat/PermohonanKehilanganScreen";
import PermohonanKelahiranScreen from "../screens/permohonansurat/PermohonanKelahiranScreen";
import PermohonanKematianScreen from "../screens/permohonansurat/PermohonanKematianScreen";
import PermohonanKeteranganKreditScreen from "../screens/permohonansurat/PermohonanKeteranganKreditScreen";
import PermohonanKKScreen from "../screens/permohonansurat/PermohonanKKScreen";
import PermohonanKtpScreen from "../screens/permohonansurat/PermohonanKtpScreen";
import PermohonanPengantarCeraiScreen from "../screens/permohonansurat/PermohonanPengantarCeraiScreen";
import PermohonanPengantarNikahScreen from "../screens/permohonansurat/PermohonanPengantarNikahScreen";
import PermohonanPindahTempatScreen from "../screens/permohonansurat/PermohonanPindahTempatScreen";
import PermohonanSKCKScreen from "../screens/permohonansurat/PermohonanSKCKScreen";
import PermohonanSKUScreen from "../screens/permohonansurat/PermohonanSKUScreen";
import PermohonanSuratKuasaScreen from "../screens/permohonansurat/PermohonanSuratKuasaScreen";
import PermohonanTidakMampuScreen from "../screens/permohonansurat/PermohonanTidakMampuScreen";
import DataPribadiScreen from "../screens/profile/DataPribadiScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import FaqScreen from "../screens/setting/FaqScreen";
import SettingGeneralScreen from "../screens/setting/SettingGeneralScreen";
import TabNavigation from "./Tabnavigation";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  const MyTheme = {
    colors: {
      background: "white",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DataPribadiScreen"
          component={DataPribadiScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FaqScreen"
          component={FaqScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InstructionScreen"
          component={InstructionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanKtpScreen"
          component={PermohonanKtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanSKCKScreen"
          component={PermohonanSKCKScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanDomisiliScreen"
          component={PermohonanDomisiliScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanPengantarNikahScreen"
          component={PermohonanPengantarNikahScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanKehilanganScreen"
          component={PermohonanKehilanganScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanTidakMampuScreen"
          component={PermohonanTidakMampuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingGeneralScreen"
          component={SettingGeneralScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanKelahiranScreen"
          component={PermohonanKelahiranScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanSuratKuasaScreen"
          component={PermohonanSuratKuasaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanPindahTempatScreen"
          component={PermohonanPindahTempatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanHubunganKeluargaScreen"
          component={PermohonanHubunganKeluargaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanPengantarCeraiScreen"
          component={PermohonanPengantarCeraiScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanKKScreen"
          component={PermohonanKKScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanKeteranganKreditScreen"
          component={PermohonanKeteranganKreditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanBoroScreen"
          component={PermohonanBoroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanKayuScreen"
          component={PermohonanKayuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanSKUScreen"
          component={PermohonanSKUScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PermohonanKematianScreen"
          component={PermohonanKematianScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
