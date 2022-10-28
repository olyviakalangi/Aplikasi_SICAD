import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { current } from "@reduxjs/toolkit";
import { getAuth, signOut } from "firebase/auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useDispatch, useSelector } from "react-redux";
import SyaratKtp from "../../components/alertsurat/syarat/SyaratKtp";
import MenuTabDivider from "../../components/divider/MenuTabDivider";
import CustomButton from "../../components/generals/CustomButton";
import CustomInput from "../../components/generals/CustomInput";
import Dummy, {
  AllSurat,
  AllSuratKeterangan,
  AllSuratPernyataanNikah,
  AllSuratPribadi,
  searchSurat,
} from "../../constants/Dummy";
import { dateFormatId } from "../../constants/Helper";
import Icons from "../../constants/Icons";
import { logout } from "../../features/auth/authSlice";
import { apiGetAllSurat, apitGetNotifCount } from "../../lib/api";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
const auth = getAuth();
const RenderSliderView = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[{ width: width, height: width * 0.5 }]}>
      <Swiper
        style={[tw`rounded-full bg-white rounded-lg`]}
        showsPagination={true}
        paginationStyle={[tw` justify-start mx-5  `]}
        autoplay={true}
        autoplayDirection={true}
        autoplayTimeout={3.5}
        dot={
          <View
            style={{
              backgroundColor: "#74DB6C",
              width: 28,
              height: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "#156035",
              width: 28,
              height: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 0,
            }}
          />
        }
      >
        {Dummy.slider.map((item, i) => (
          <View key={i}>
            <Image
              source={item.image}
              style={[{ width: width, height: width * 0.5 }]}
              resizeMode="cover"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};
const RenderUser = () => {
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
            signOut(auth)
              .then(() => {
                dispatch(logout());
                ToastAndroid.show("Logout successfull", ToastAndroid.SHORT);
              })
              .catch((error) => {
                ToastAndroid.show("Logout unsuccessfull", ToastAndroid.SHORT);
              });
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }
  if (user) {
    return (
      <View
        style={[
          tw`bg-primary shadow-md pb-2 pt-5  `,
          {
            borderBottomEndRadius: width * 0.1,
            borderBottomStartRadius: width * 0.1,
            zIndex: 100,
            elevation: 100,
          },
        ]}
      >
        <SafeAreaView
          style={[
            GlobalCss.containerPaddingX,
            tw`flex-row items-center justify-between`,
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={[tw`flex-row items-center`]}
          >
            {userInfo.picture != null ? (
              <Image
                source={{ uri: userInfo.picture }}
                style={[tw`w-10 h-10 rounded-full mr-5 border-2 border-white`]}
              />
            ) : (
              <View
                style={[
                  tw`w-10 h-10 mr-5 justify-center items-center bg-indigo-700 shadow-md rounded-full border-2 border-white`,
                ]}
              >
                <Text style={[tw`text-white font-semibold uppercase`]}>
                  {userInfo.nama_lengkap ? <RenderAvatar /> : "KK"}
                </Text>
              </View>
            )}
            <View>
              <Text
                style={[
                  tw`text-white font-semibold text-lg`,
                  { fontFamily: "Poppins_500Medium" },
                ]}
              >
                Hai,
              </Text>
              <Text
                style={[
                  tw`text-white font-semibold text-lg`,
                  { fontFamily: "Poppins_500Medium" },
                ]}
              >
                {userInfo.nama_lengkap ? userInfo.nama_lengkap : userInfo.email}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout()}>
            <Image
              source={Icons.Logout}
              style={[tw`w-7 h-7 `, { tintColor: tw`text-secondary`.color }]}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};
const RenderItemSurat = (props) => {
  const { width } = useWindowDimensions();
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[tw`py-2 flex-row items-center relative`]}
      onPress={() => {
        try {
          if (props.screen) {
            props.close();
          }
        } catch (error) {
          ToastAndroid.show(props.name, ToastAndroid.SHORT);
        }
      }}
    >
      <View
        style={[
          tw` bg-primary shadow-md items-center justify-center mr-4 rounded-xl `,
          { width: width * 0.11, height: width * 0.11 },
        ]}
      >
        <Image
          source={props.icon}
          style={[tw``, { width: width * 0.08, height: width * 0.08 }]}
          resizeMode="cover"
        />
      </View>
      <Text style={[tw`flex-1 font-semibold`]}>{props.name}</Text>
      <View
        style={[
          tw`h-[1px] w-[85%] bg-gray-200 bottom-2 right-0 absolute rounded-full`,
        ]}
      />
    </TouchableOpacity>
  );
};
const RenderFeatureView = (props) => {
  const { width, height } = useWindowDimensions();
  const Navigation = useNavigation();
  const refRBSheet = useRef();
  const alertSurat = useRef();
  const [search, setSearch] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);
  const [notifCount, setNotifCount] = useState(0);
  const refSearch = useRef();
  const [currentSurat, setCurrentSurat] = useState(null);
  const ResultSearch = () => {
    if (search) {
      let result = [];
      searchSurat(search).map((item) => {
        result.push(item);
      });
      return result;
    } else {
      return false;
    }
  };
  function getNotif() {
    apitGetNotifCount(accessToken).then((res) => {
      setNotifCount(res.data.count);
    });
  }
  useEffect(() => {
    getNotif();
  }, []);
  return (
    <View
      style={[
        GlobalCss.containerPaddingX,
        tw`pb-0 mb-0 -mt-10 pt-16  mb-2 relative elevation-10 z-10   `,
      ]}
    >
      <View style={[tw`flex-row justify-between`]}>
        <Text
          style={[tw`text-lg font-bold`, { fontFamily: "Poppins_500Medium" }]}
        >
          Silahkan Pilih Pengajuan Anda
        </Text>
        {/* <TouchableOpacity
        // onPress={() => Navigation.navigate("InstructionScreen")}
        >
          <Image
            source={Icons.Faq}
            style={[tw`w-6 h-6`]}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
      </View>
      <View style={[tw`flex-row items-center relative elevation-10 z-10  `]}>
        <View style={[tw`w-10/12 bg-white shadow-lg rounded-full  my-2   `]}>
          <View
            style={[
              tw.style(
                `absolute bg-white rounded-xl  top-0 py-2 pt-10 w-12/12 shadow-md`,
                ResultSearch().length > 0 ? "" : "hidden"
              ),
            ]}
          >
            {ResultSearch().length > 0 &&
              ResultSearch().map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[tw`flex-row px-4 items-center my-1`]}
                    onPress={() => {
                      try {
                        alertSurat.current.open();
                      } catch (error) {
                        console.log(error);
                        ToastAndroid.show(item.name, ToastAndroid.SHORT);
                      }
                    }}
                  >
                    <Image source={Icons.Search} style={[tw`h-5 w-5 mr-2`]} />
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          <CustomInput
            iconLeft={Icons.Search}
            style={[
              tw.style(
                `  h-10 py-0 px-0 bg-white my-0 relative   border-0  `,
                ResultSearch().length > 0
                  ? tw`  rounded-full`
                  : tw`rounded-full`
              ),
              {
                shadowColor: "#fff",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              },
            ]}
            placeholder="Cari Surat yang Ingin Dibuat"
            ref={refSearch}
            onChange={(text) => setSearch(text)}
          />
        </View>
        <TouchableOpacity
          style={[tw`ml-auto relative `]}
          onPress={() => Navigation.navigate("NotificationScreen")}
        >
          <View
            style={[
              tw`bg-secondary justify-center items-center absolute  rounded-full w-4 h-4 shadow-md -right-3 -top-2`,
            ]}
          >
            <Text style={[tw`text-black`, { fontFamily: "Poppins_500Medium" }]}>
              {notifCount}
            </Text>
          </View>
          <Image
            source={Icons.Notif}
            style={[
              {
                tintColor: "black",
                aspectRatio: 1,
                width: width * 0.05,
                height: width * 0.05,
              },
              ,
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={[tw`flex-row flex-wrap justify-between`]}>
        {Dummy.menu().map((item, index) => (
          <View key={index} style={[tw`w-1/3 px-[2px] h-24`]}>
            <TouchableOpacity
              style={[
                tw.style(
                  `items-center justify-center shadow-md rounded-2xl  p-1 border w-full border-primary my-1 bg-white h-20`
                ),
              ]}
              onPress={() => {
                if (item.id) {
                  setCurrentSurat(item.id);
                  return alertSurat.current.open();
                }
                if (Dummy.menu().length - 1 == index) {
                  refRBSheet.current.open();
                } else if (index == 1) {
                  alertSurat.current.open();
                } else {
                  try {
                    if (item.screen) {
                      Navigation.navigate(item.screen);
                    }
                  } catch (error) {
                    console.log(error);
                    ToastAndroid.show(item.name, ToastAndroid.SHORT);
                  }
                }
              }}
            >
              <Image
                source={item.icon}
                style={[
                  tw`w-8
                 h-8
                   `,
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  tw.style(
                    `text-center text-primary   `,
                    index == 2 ? "text-[10px]" : "text-[10px] "
                  ),
                  { fontFamily: "Poppins_500Medium" },
                ]}
                key={index}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <RBSheet
        ref={alertSurat}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            borderRadius: width * 0.1,
            elevation: 100,
            paddingHorizontal: width * 0.05,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        height={height * 0.8}
      >
        <Text style={[tw`text-xl font-bold text-center pt-10 text-primary `]}>
          Peringatan
        </Text>
        <ScrollView style={[tw`px-5`]} showsVerticalScrollIndicator={false}>
          <Text style={[tw`pt-5 pb-2 text-primary font-bold text-lg`]}>
            Syarat :
          </Text>
          {AllSurat[currentSurat - 1]?.syarat.map((item, index) => (
            <Text style={[tw`pl-2`]} key={index}>
              {item.id}. {item.name}.
            </Text>
          ))}

          {AllSurat[currentSurat - 1]?.ketentuan && (
            <>
              <Text style={[tw`pt-5 pb-2 text-primary font-bold text-lg`]}>
                Ketentuan Umum:
              </Text>
              {AllSurat[currentSurat - 1].ketentuan.map((item, index) => (
                <Text style={[tw`p-2 text-justify`]} key={index}>
                  {item.id && item.id + ". "}
                  {item.name}
                </Text>
              ))}
            </>
          )}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            alertSurat.current.close();
            Navigation.navigate(AllSurat[currentSurat - 1].screen);
          }}
        >
          <CustomButton text="Berikutnya" style={[tw`my-5`]} />
        </TouchableOpacity>
      </RBSheet>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            borderRadius: width * 0.1,
            elevation: 100,
            paddingHorizontal: width * 0.05,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        height={height * 0.8}
      >
        <Text style={[tw`text-lg font-bold`]}>Layanan Lainya</Text>
        <ScrollView style={[tw`px-5`]} showsVerticalScrollIndicator={false}>
          <Text style={[tw`pt-5 pb-2`]}>Surat Pribadi</Text>
          {AllSuratPribadi.map((item, index) => (
            <RenderItemSurat
              key={index}
              {...item}
              close={() => {
                setCurrentSurat(item.id);
                alertSurat.current.open();
                refRBSheet.current.close();
              }}
            />
          ))}
          <Text style={[tw`pt-5 pb-2`]}>Surat Pernyataan Hubungan Nikah</Text>
          {AllSuratPernyataanNikah.map((item, index) => (
            <RenderItemSurat
              key={index}
              {...item}
              close={() => {
                setCurrentSurat(item.id);
                alertSurat.current.open();
                refRBSheet.current.close();
              }}
            />
          ))}
          <Text style={[tw`pt-5 pb-2`]}>Surat Keterangan Lainnya</Text>
          {AllSuratKeterangan.map((item, index) => (
            <RenderItemSurat
              key={index}
              {...item}
              close={() => {
                setCurrentSurat(item.id);
                alertSurat.current.open();
                refRBSheet.current.close();
              }}
            />
          ))}
          <View style={[tw`h-10`]} />
        </ScrollView>
      </RBSheet>
    </View>
  );
};
const RenderPengajuan = () => {
  const { width, height } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const { accessToken, userInfo } = useSelector((state) => state.auth);
  const [pengajuanSurat, setPengajuanSurat] = useState([]);
  const [newPengajuanSurat, setNewPengajuanSurat] = useState([]);
  const Navigation = useNavigation();
  const [asc, setAsc] = useState(true);
  const [collectType, setCollectType] = useState({
    0: false,
    1: false,
    2: false,
  });
  const refRBSheet = useRef();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    apiGetAllSurat(accessToken).then((res) => {
      setPengajuanSurat(res.data);
      setNewPengajuanSurat(res.data);
      console.log(res.data);
      setRefreshing(false);
      ToastAndroid.show("refresh surat selesai", ToastAndroid.SHORT);
    });
  }, []);
  useEffect(() => {
    apiGetAllSurat(accessToken).then((res) => {
      setPengajuanSurat(res.data);
      setNewPengajuanSurat(res.data);
    });
  }, []);
  const handleFilter = async () => {
    const FilterPengajuanSurat = [...pengajuanSurat];
    FilterPengajuanSurat.sort(function (a, b) {
      if (asc) {
        return a.updated_at < b.updated_at;
      } else {
        return b.updated_at < a.updated_at;
      }
    });
    const Final = FilterPengajuanSurat.filter((item) => {
      let result = false;
      if (!collectType[0] && !collectType[1] && !collectType[2]) {
        return true;
      }
      if (collectType[0]) {
        result = item.status == 0;
        if (result) {
          return result;
        }
      }
      if (collectType[1]) {
        result = item.status == 2;
        if (result) {
          return result;
        }
      }
      if (collectType[2]) {
        result = item.status == 1;
        if (result) {
          return result;
        }
      }
      return result;
    });
    setNewPengajuanSurat(Final);
  };
  const ButtonFilter = (props) => {
    return (
      <TouchableOpacity
        style={[
          tw.style(
            `px-5 mr-1 py-2  rounded-lg   border`,
            props.active
              ? `bg-primary bg-opacity-20 border-white`
              : ` bg-white border-gray-400`
          ),
          props.style,
        ]}
        onPress={() => {
          props.onPress();
        }}
      >
        <Text
          style={[
            tw.style(`text-primary`),
            { fontFamily: "Poppins_500Medium" },
          ]}
        >
          {props.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[GlobalCss.container, tw`pt-5`]}>
      <View style={[tw`flex-row  mb-2 justify-between`]}>
        <Text
          style={[
            tw`text-base font-bold items-center self-start  w-10/12`,
            ,
            { fontFamily: "Poppins_500Medium" },
          ]}
        >
          Riwayat Pengajuan Surat Kamu Di Sini
        </Text>
        <View style={[tw`justify-center items-center`]}>
          <TouchableOpacity
            style={[
              tw`px-3 bg-primary rounded-lg py-1`,
              {
                shadowColor: tw`text-primary`.color,
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,

                elevation: 24,
              },
            ]}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            <Image
              source={Icons.Filter}
              style={[tw`w-5 h-5 `]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {pengajuanSurat.length > 0 && (
          <View style={[tw`flex-col`]}>
            {newPengajuanSurat.map((item, index) => {
              if (item.status == 3) {
                return false;
              }
              let date = item.created_at.split(" ")[0];
              return (
                <TouchableOpacity
                  style={[
                    tw`flex-row my-1 items-center flex-1 p-3 bg-primary w-11/12 rounded-3xl relative`,
                  ]}
                  key={index}
                  onPress={() => {
                    Navigation.navigate("DetailPengajuanScreen", {
                      ...item,
                      from_screen: "HomeScreen",
                    });
                  }}
                >
                  <View
                    style={[
                      tw`w-1/3 h-20 bg-secondary bg-opacity-70 items-center justify-center rounded-2xl mr-5 px-2`,
                    ]}
                  >
                    <Image
                      source={AllSurat[item.type - 1]?.icon}
                      style={[tw`w-10/12 h-10/12`]}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={[tw` w-2/3 pr-5 `]}>
                    <Text
                      style={[
                        tw`font-semibold text-white text-xs `,
                        { fontFamily: "Poppins_500Medium" },
                      ]}
                    >
                      {AllSurat[item.type - 1]?.name}
                    </Text>
                    <View style={[tw`flex-row `]}>
                      <Image
                        source={Icons.Calendar}
                        style={[tw`h-4 w-4 mr-2 tint-white`]}
                        resizeMode="contain"
                      />
                      <Text
                        style={[
                          tw`text-gray-400 text-white`,
                          { fontFamily: "Poppins_500Medium" },
                        ]}
                      >
                        {dateFormatId(date)}
                      </Text>
                    </View>
                  </View>
                  {item.status == 2 && (
                    <View
                      style={[
                        tw`bg-primary border border-secondary justify-center p-2 rounded-xl shadow-md mx-auto  absolute -right-5 top-[40%]`,
                      ]}
                    >
                      <Image
                        source={Icons.Check}
                        style={[tw`w-5 h-5`, { tintColor: "white" }]}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  {item.status == 0 && (
                    <View
                      style={[
                        tw`bg-gray-400 border border-white justify-center p-2 rounded-xl shadow-md mx-auto  absolute -right-5 top-[40%] border-dashed`,
                      ]}
                    >
                      <Image
                        source={Icons.Check}
                        style={[tw`w-5 h-5`, { tintColor: "white" }]}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  {item.status == 1 && (
                    <View
                      style={[
                        tw`bg-secondary  justify-center p-2 rounded-xl shadow-md mx-auto  absolute -right-5 top-[40%] `,
                      ]}
                    >
                      <Image
                        source={Icons.Alert}
                        style={[tw`w-5 h-5 tint-primary`]}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <MenuTabDivider />
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            borderRadius: width * 0.1,
            elevation: 100,
            paddingHorizontal: width * 0.05,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        height={height * 0.5}
      >
        <Text style={[tw`text-lg font-bold`]}>Filter</Text>
        <ScrollView style={[tw``]} showsVerticalScrollIndicator={false}>
          <Text style={[tw`text-base font-bold pt-4`]}>Urutkan</Text>
          <View style={[tw`flex-row py-1`]}>
            <ButtonFilter
              name="Terbaru"
              active={asc}
              onPress={() => setAsc(true)}
              style={[tw`py-5`]}
            />
            <ButtonFilter
              name="Terlama"
              active={!asc}
              onPress={() => setAsc(false)}
              style={[tw`py-5`]}
            />
          </View>
          <Text style={[tw`text-base font-bold pt-4`]}>Tindakan</Text>
          <View style={[tw`flex-row py-1`]}>
            <ButtonFilter
              name="Dalam Proses"
              active={collectType[0]}
              onPress={() =>
                setCollectType({ ...collectType, 0: !collectType[0] })
              }
            />
            <ButtonFilter
              name="Disetujui"
              active={collectType[1]}
              onPress={() =>
                setCollectType({ ...collectType, 1: !collectType[1] })
              }
            />
            <ButtonFilter
              name="Ditolak"
              active={collectType[2]}
              onPress={() =>
                setCollectType({ ...collectType, 2: !collectType[2] })
              }
            />
          </View>
          <View style={[tw`flex-row my-5`]}>
            <TouchableOpacity
              style={[
                tw`py-2 mr-3 px-5 bg-primary rounded-xl flex-row items-center shadow-md `,
              ]}
              onPress={() => {
                handleFilter();
                refRBSheet.current.close();
              }}
            >
              <Image
                source={Icons.Filter}
                style={[tw`w-3 h-3 mr-2 tint-white`]}
              />
              <Text
                style={[tw`text-white`, { fontFamily: "Poppins_500Medium" }]}
              >
                Filter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tw`py-2 mr-3 px-5 border border-primary rounded-xl flex-row items-center  `,
              ]}
              onPress={() => {
                setAsc(true);
                setCollectType({ 0: false, 1: false, 2: false });
              }}
            >
              <Text
                style={[tw`text-primary`, { fontFamily: "Poppins_500Medium" }]}
              >
                Bersihkan
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[tw`h-10`]} />
        </ScrollView>
      </RBSheet>
    </View>
  );
};
const HomeScreen = () => {
  const Navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Mau kemana?", "Yakin mau keluar aplikasi?", [
          {
            text: "Tidak",
            onPress: () => null,
          },
          { text: "Iya", onPress: () => BackHandler.exitApp() },
        ]);

        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [,])
  );
  return (
    <View style={[tw`flex-1 `]}>
      <RenderUser />
      <RenderFeatureView />
      <RenderPengajuan />
      {/* <RenderHelp /> */}
    </View>
  );
};

export default HomeScreen;
