import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ToastAndroid,
  Modal,
  Alert,
} from "react-native";
import React from "react";
import CustomHeader from "../../components/header/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
import Dummy from "../../constants/Dummy";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../../constants/Icons";
import { logout } from "../../features/auth/authSlice";
import MenuOptions from "../../components/menu/MenuOptions";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();
const RenderUser = () => {
  const { accessToken, userInfo } = useSelector((state) => state.auth);
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        tw`bg-primary pb-5 shadow-md`,
        {
          borderBottomEndRadius: width * 0.1,
          borderBottomStartRadius: width * 0.1,
          zIndex: 100,
          elevation: 100,
        },
      ]}
    >
      <SafeAreaView style={[GlobalCss.containerPaddingX]}>
        <CustomHeader title="Profil" />
        <View style={[tw`flex-row items-center mx-5`]}>
          {userInfo.picture ? (
            <Image
              source={{ uri: userInfo?.picture }}
              style={[tw`w-15 h-15 rounded-full mr-5 border-white border-4`]}
            />
          ) : (
            <View
              style={[
                tw`w-15 h-15  mr-5 border-white border-4 justify-center items-center bg-indigo-700 shadow-md rounded-full`,
              ]}
            >
              <Text
                style={[
                  tw`text-white font-semibold`,
                  { fontFamily: "Poppins_500Medium" },
                ]}
              >
                {userInfo.nama_lengkap.split(" ")[0].substring(0, 1)}
                {userInfo.nama_lengkap.split(" ")[1].substring(0, 1)}
              </Text>
            </View>
          )}
          <View>
            <Text
              style={[
                tw`text-white font-bold text-lg`,
                { fontFamily: "Poppins_500Medium" },
              ]}
            >
              {userInfo?.nama_lengkap}
            </Text>
            <Text
              style={[
                tw`text-white font-semibold `,
                { fontFamily: "Poppins_500Medium" },
              ]}
            >
              {userInfo?.phone ? userInfo?.phone : "-"}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const RenderOption = (props) => {
  return (
    <TouchableOpacity onPress={() => props.link()}>
      <View style={[tw` my-1 px-2 flex-row items-center px-10 py-5`]}>
        <Image
          source={props.icon}
          style={[tw`w-12 h-12 mr-5 `]}
          resizeMode="contain"
        />
        <View>
          <Text
            style={[
              tw`font-semibold text-lg text-primary`,
              { fontFamily: "Poppins_500Medium" },
            ]}
          >
            {props.title}
          </Text>
        </View>
      </View>
      <View style={[tw`bg-gray-500 h-1 w-full bg-opacity-10`]} />
    </TouchableOpacity>
  );
};
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const Navigation = useNavigation();
  function handleLogout() {
    Alert.alert(
      "Apakah anda yakin?",
      "Pilih OK untuk melanjutkan logout sistem",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            signOut(auth);
            dispatch(logout());
            ToastAndroid.show("Logout successfull", ToastAndroid.SHORT);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }
  const optionProfiles = [
    {
      icon: Icons.ProfileOption,
      title: "Informasi Profil",
      link: () => {
        Navigation.navigate("EditProfileScreen");
      },
    },
    {
      icon: Icons.DataOption,
      title: "Data Pribadi",
      link: () => {
        Navigation.navigate("DataPribadiScreen");
      },
    },
    {
      icon: Icons.LogoutOption,
      title: "Keluar Akun",
      link: handleLogout,
    },
  ];
  return (
    <>
      <RenderUser />
      <SafeAreaView style={[GlobalCss.container, tw` py-0 flex-1 `]}>
        <View style={[tw`justify-center mt-10`]}>
          <View style={[tw`bg-primary shadow-md h-11/12 rounded-3xl`]}>
            <View
              style={[
                tw`bg-white w-6 h-6 rounded-full shadow-md absolute top-5 left-5`,
              ]}
            />
            <View
              style={[
                tw`bg-white w-6 h-6 rounded-full shadow-md absolute bottom-5 left-5`,
              ]}
            />
            <View
              style={[
                tw`bg-white w-6 h-6 rounded-full shadow-md absolute top-5 right-5`,
              ]}
            />
            <View
              style={[
                tw`bg-white w-6 h-6 rounded-full shadow-md absolute bottom-5 right-5`,
              ]}
            />
            <View style={[tw` py-10 h-full justify-center `]}>
              <View style={[tw`bg-secondary h-[2px] w-full `]} />
              {optionProfiles.map((item, i) => (
                <MenuOptions key={i} {...item} />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;
