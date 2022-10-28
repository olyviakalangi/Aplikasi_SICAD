import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icons from "../constants/Icons";
import tw from "../lib/tailwind";
import HomeScreen from "../screens/home/HomeScreen";
import InformationAdminScreen from "../screens/information/InformationAdminScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingScreen from "../screens/setting/SettingScreen";
import PengajuanStack from "./PengajuanStack";

function NotifScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notif!</Text>
    </View>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  const MenuTab = [
    {
      name: "Home",
      icon: Icons.Home,
    },
    {
      name: "Notifikasi",
      icon: Icons.ChatOutline,
    },

    {
      name: "Proses Pengajuan",
      icon: Icons.Calendar,
    },
    {
      name: "Profile",
      icon: Icons.Profile,
    },

    {
      name: "Pengaturan",
      icon: Icons.Setting,
    },
  ];
  let home;
  return (
    <View
      style={[
        tw`flex-row  px-10 rounded-full mb-2 mx-1 py-2 -mt-5 shadow-2xl shadow-2xl justify-between bg-white mx-2  absolute bottom-0 left-0 right-0`,
      ]}
    >
      <View style={[tw`flex-row w-full justify-between `]}>
        {state.routes.map((route, index) => {
          if (index > 4) {
            return null;
          }
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <View key={index}>
              <TouchableOpacity
                style={[
                  tw.style(
                    ` rounded-xl  p-1 px-3 items-center  `,
                    isFocused ? `bg-primary bg-opacity-20 ` : "bg-transparent"
                  ),
                ]}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <Image
                  source={MenuTab[index].icon}
                  style={[
                    {
                      tintColor: isFocused ? "black" : "#264C63",
                      aspectRatio: 1,
                      width: 25,
                      height: 25,
                    },
                    tw.style(isFocused ? "tint-primary" : "tint-black"),
                  ]}
                  resizeMode="contain"
                />
                {index == 1 && (
                  <View
                    style={[
                      tw`absolute p-1 bg-error rounded-full right-0 shadow-md`,
                    ]}
                  >
                    <Image
                      source={Icons.Alert}
                      style={[
                        {
                          aspectRatio: 1,
                          width: 10,
                          height: 10,
                        },
                        tw.style(isFocused ? "tint-white" : "tint-white"),
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </TouchableOpacity>
              <View
                style={[
                  tw.style(
                    `h-[2px] w-full  mt-1 rounded-full`,
                    isFocused ? "bg-primary" : "bg-transparent"
                  ),
                ]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="InformationAdminScreen"
        component={InformationAdminScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="PengajuanStack"
        component={PengajuanStack}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
