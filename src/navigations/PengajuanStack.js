import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailPengajuanScreen from "../screens/pengajuan/DetailPengajuanScreen";
import PengajuanScreen from "../screens/pengajuan/PengajuanScreen";

const Stack = createNativeStackNavigator();

export default function PengajuanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PengajuanScreen"
        component={PengajuanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailPengajuanScreen"
        component={DetailPengajuanScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
