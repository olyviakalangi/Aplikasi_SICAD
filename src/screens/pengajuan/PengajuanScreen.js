import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalCss from "../../styles/global";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DropdownInput from "../../components/generals/DropdownInput";
import Icons from "../../constants/Icons";
import { useState } from "react";
import { apiGetAllSurat } from "../../lib/api";
import { useEffect } from "react";
import { AllSurat } from "../../constants/Dummy";
import { dateFormatId, DateMysql } from "../../constants/Helper";
import { useCallback } from "react";
import MenuTabDivider from "../../components/divider/MenuTabDivider";

const RenderHeader = () => {
  const { user } = useAuthentication();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const RenderAvatar = () => {
    let avatar = userInfo.nama_lengkap.split(" ")[0].substring(0, 1);

    if (userInfo.nama_lengkap.split(" ")[1]) {
      avatar = avatar + userInfo.nama_lengkap.split(" ")[1].substring(0, 1);
    } else {
      avatar = avatar + userInfo.nama_lengkap.split(" ")[0].substring(1, 2);
    }
    return avatar;
  };
  return (
    <SafeAreaView style={[tw`py-5`, GlobalCss.containerPaddingX]}>
      <Text style={[tw`text-secondary `, { fontFamily: "Poppins_500Medium" }]}>
        Akun Profil
      </Text>
      <View style={[tw`flex-row items-center bg-white rounded-xl p-5`]}>
        {userInfo.picture != null ? (
          <Image
            source={{ uri: userInfo.picture }}
            style={[tw`w-15 h-15 rounded-full mr-5 border-4 border-primary`]}
          />
        ) : (
          <View
            style={[
              tw`w-15 h-15 mr-5 justify-center items-center bg-indigo-700 shadow-md rounded-full border-4 border-primary`,
            ]}
          >
            <Text style={[tw`text-white font-semibold uppercase  `]}>
              {userInfo.nama_lengkap ? <RenderAvatar /> : "KK"}
            </Text>
          </View>
        )}
        <View style={[tw`flex-1`]}>
          <Text
            style={[
              tw`text-primary  text-lg `,
              { fontFamily: "Poppins_700Bold" },
            ]}
          >
            {userInfo.nama_lengkap ? userInfo.nama_lengkap : userInfo.email}
          </Text>
          <Text
            style={[
              tw`text-primary  text-sm`,
              { fontFamily: "Poppins_500Medium" },
            ]}
          >
            {userInfo.phone ? userInfo.phone : "-"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const DropdownFilter = (props) => {
  const dataDropdown = [
    {
      value: 1,
      label: "Tahun ini",
    },
    {
      value: 2,
      label: "Bulan ini",
    },
    {
      value: 3,
      label: "Minggu ini",
    },
    {
      value: 4,
      label: "Tahun Sebelumnya",
    },
    {
      value: 5,
      label: "Seluruhnya",
    },
  ];
  const [openDD, setOpenDD] = useState(false);
  const [selected, setSelected] = useState(1);
  return (
    <View style={[tw`relative`]}>
      <TouchableOpacity
        style={[tw`px-5 bg-white  rounded-lg`]}
        onPress={() => setOpenDD(!openDD)}
      >
        <View style={[tw`justify-between flex-row items-center`]}>
          <Text style={[tw`text-primary px-5`]}>
            {dataDropdown[selected - 1].label}
          </Text>
          <Image source={Icons.Dropdown} style={[tw`w-3 h-3 tint-primary`]} />
        </View>
      </TouchableOpacity>
      {openDD && (
        <View
          style={[
            tw`bg-white my-1 rounded-lg items-center overflow-hidden absolute top-5 w-full shadow-lg z-10`,
          ]}
        >
          {dataDropdown.map((item, index) => (
            <TouchableOpacity
              style={[
                tw.style(
                  `px-2 w-full items-center`,
                  index % 2 == 1 ? "bg-secondary" : "bg-white "
                ),
              ]}
              key={index}
              onPress={() => {
                setSelected(item.value);
                setOpenDD(false);
                props.onChange(item.value);
              }}
            >
              <Text style={[tw`text-primary`]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
const PengajuanScreen = ({ route }) => {
  const params = route.params;
  const { user } = useAuthentication();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [pengajuanSurat, setPengajuanSurat] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [newPengajuanSurat, setNewPengajuanSurat] = useState([]);
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const Navigation = useNavigation();
  useEffect(() => {
    apiGetAllSurat(accessToken).then((res) => {
      setPengajuanSurat(res.data);
      setNewPengajuanSurat(res.data);
    });
  }, [params?.refresh]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    apiGetAllSurat(accessToken).then((res) => {
      setPengajuanSurat(res.data);
      setNewPengajuanSurat(res.data);
      setRefreshing(false);
      ToastAndroid.show("refresh surat selesai", ToastAndroid.SHORT);
    });
  }, []);
  const handleFilter = (props) => {
    const FilterPengajuanSurat = [...pengajuanSurat];
    const Final = FilterPengajuanSurat.filter((item) => {
      let result = false;
      const date = DateMysql(item.created_at);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDay = today.getDate();
      if (props == 1 && year == todayYear) {
        result = true;
      }
      if (props == 2 && month == todayMonth) {
        result = true;
      }
      const week = new Date(date.getTime() + 24 * 60 * 60 * 1000 * 7);
      if (
        props == 3 &&
        date.getTime() + 24 * 60 * 60 * 1000 * 7 > today.getTime()
      ) {
        result = true;
      }
      if (props == 4 && year == todayYear - 1) {
        result = true;
      }
      if (props == 5) {
        result = true;
      }

      return result;
    });
    setNewPengajuanSurat(Final);
  };
  return (
    <View style={[tw`bg-primary flex-1`]}>
      <RenderHeader />
      <View style={[tw`flex-row justify-between`, GlobalCss.containerPaddingX]}>
        <View>
          <Text
            style={[tw`text-secondary`, { fontFamily: "Poppins_500Medium" }]}
          >
            Lihat Timeline
          </Text>
        </View>
        <DropdownFilter onChange={(value) => handleFilter(value)} />
      </View>
      <ScrollView
        style={[tw`py-2`]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {newPengajuanSurat.map((item, index) => {
          let date = item.created_at.split(" ")[0];
          let isStart = index == 0;
          let isEnd = index == newPengajuanSurat.length - 1;
          let isMiddle = !isStart && !isEnd;
          return (
            <View
              key={index}
              style={[tw`flex-row   `, GlobalCss.containerMarginX]}
            >
              <View style={[tw`mx-2 items-center justify-center`]}>
                <View
                  style={[tw`w-4 h-4 bg-secondary rounded-full shadow-md`]}
                ></View>
                <View
                  style={[
                    tw.style(
                      `bg-secondary  w-[2px] absolute `,
                      isStart
                        ? "bottom-0 h-1/2"
                        : isEnd
                        ? "top-0 h-1/2"
                        : "top-0 h-full"
                    ),
                  ]}
                ></View>
              </View>
              <TouchableOpacity
                style={[
                  tw`bg-white w-full flex-1 flex-row rounded-xl p-2 px-3 my-1`,
                ]}
                onPress={() => {
                  Navigation.navigate("DetailPengajuanScreen", {
                    ...item,
                  });
                }}
              >
                <View style={[tw`w-1/2`]}>
                  <Text style={[tw`text-primary font-bold `]}>
                    {AllSurat[item.type - 1].name}
                  </Text>
                  <Text
                    style={[
                      tw`bg-secondary text-primary self-start p-1 rounded-md text-xs mt-1`,
                    ]}
                  >
                    {dateFormatId(date)}
                  </Text>
                </View>
                <View style={[tw`items-center justify-center w-full flex-1 `]}>
                  <View style={[tw` bg-primary px-4 py-1 rounded-xl `]}>
                    <Image
                      source={AllSurat[item.type - 1].icon}
                      style={[tw`w-12 h-12 `]}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
        <MenuTabDivider />
      </ScrollView>
    </View>
  );
};

export default PengajuanScreen;
