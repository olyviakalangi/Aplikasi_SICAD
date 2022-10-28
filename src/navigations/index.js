import { getAuth } from "firebase/auth";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";
import "../config/firebase";
import tw from "../lib/tailwind";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import AuthStack from "./AuthStack";
import UserRegisterStack from "./UserRegisterStack";
import UserStack from "./UserStack";
const auth = getAuth();
const RenderRoute = () => {
  const { user } = useAuthentication();
  const { userInfo } = useSelector((state) => state.auth);

  if (user) {
    if (userInfo?.nama_lengkap == null) {
      return <UserRegisterStack />;
    }
  }
  return user ? <UserStack /> : <AuthStack />;
};
export default function RootNavigation() {
  const { loading } = useSelector((state) => state.loading);

  return (
    <>
      <RenderRoute />
      {loading && (
        <View
          style={[
            tw`flex-1 h-full w-full absolute z-10 elevation-10 justify-center items-center bg-white bg-opacity-80`,
          ]}
        >
          <ActivityIndicator size="large" color={tw`text-primary`.color} />
          <Text
            style={[
              tw` my-5 text-primary`,
              { fontFamily: "Poppins_500Medium" },
            ]}
          >
            Loading ...
          </Text>
        </View>
      )}
    </>
  );
}
