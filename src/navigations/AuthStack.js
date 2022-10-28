import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GreetingScreen from "../screens/auth/GreetingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import VerifOtpScreen from "../screens/auth/VerifOtpScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const MyTheme = {
    colors: {
      background: "white",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="GreetingScreen"
          component={GreetingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="VerifOtpScreen"
          component={VerifOtpScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
