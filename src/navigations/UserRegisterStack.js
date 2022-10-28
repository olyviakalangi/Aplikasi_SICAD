import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import DataPribadiScreen from "../screens/profile/DataPribadiScreen";

const Stack = createNativeStackNavigator();

export default function UserRegisterStack() {
  const MyTheme = {
    colors: {
      background: "white",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="DataPribadiScreen"
          component={DataPribadiScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
