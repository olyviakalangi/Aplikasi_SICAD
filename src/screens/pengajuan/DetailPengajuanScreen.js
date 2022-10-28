import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  Modal,
  Pressable,
  Alert,
  useWindowDimensions,
  TextInput,
  BackHandler,
} from "react-native";
import React from "react";
import CustomHeader from "../../components/header/CustomHeader";
import tw from "../../lib/tailwind";
import GlobalCss from "../../styles/global";
import { AllSurat } from "../../constants/Dummy";
import CustomProgressBarSurat from "../../components/progressbar/CustomProgressBarSurat";
import MenuTabDivider from "../../components/divider/MenuTabDivider";
import {
  dateFormatId,
  DateFormatPengajuan,
  JsonToArray,
} from "../../constants/Helper";
import { apiCancelSurat } from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Icons from "../../constants/Icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import CustomButton from "../../components/generals/CustomButton";
import { InterruptionModeIOS } from "expo-av";
const ModalTelahJadi = (props) => {
  const modalVisible = props.modalVisible;
  const setModalVisible = props.setModalVisible;
  const { width } = useWindowDimensions();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[tw`flex-1 justify-center items-center`]}>
        <View
          style={[
            tw`bg-secondary shadow-md w-3/4 rounded-md p-5 pt-2`,
            {
              borderRadius: width * 0.05,
            },
          ]}
        >
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={[tw`p-2 mb-2 bg-danger shadow-md self-end rounded-full`]}
          >
            <Image
              source={Icons.Close}
              resizeMode="cover"
              style={[tw`tint-white w-3 h-3`]}
            />
          </Pressable>
          <Image
            source={Icons.Warning}
            resizeMode="cover"
            style={[tw` w-18 h-18 mx-auto`]}
          />
          <Text
            style={[
              tw`text-center font-bold`,
              { fontFamily: "Poppins_500Medium" },
            ]}
          >
            Surat Telah Jadi. Pembatalan Tidak Dapat Dilakukan.
            {"\n\n"}Silakan Hubungi Pihak Desa Jika Terdapat Kendala
          </Text>
        </View>
      </View>
    </Modal>
  );
};
const ModalCancel = (props) => {
  const modalVisible = props.modalVisible;
  const setModalVisible = props.setModalVisible;
  const { width } = useWindowDimensions();
  const [step, setStep] = useState(1);
  useEffect(() => {
    setStep(1);
  }, []);
  const [message, setMessage] = useState("");
  const data = JSON.parse(props.params.data);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[tw`flex-1 justify-center items-center`]}>
        <Pressable
          style={[tw` h-full w-full absolute`]}
          onPress={() => setModalVisible(!modalVisible)}
        ></Pressable>
        {step === 1 && (
          <View
            style={[
              tw`bg-white shadow-md w-3/4 rounded-md p-5`,
              {
                borderRadius: width * 0.05,
              },
            ]}
          >
            <Image
              source={Icons.Warning}
              resizeMode="cover"
              style={[tw` w-18 h-18 mx-auto`]}
            />
            <Text
              style={[
                tw`text-center font-bold`,
                { fontFamily: "Poppins_500Medium" },
              ]}
            >
              Apakah Anda Yakin Ingin membatalkan Surat?
            </Text>
            <View style={[tw`flex-row justify-between mt-10 `]}>
              <Pressable
                onPress={() => {
                  setStep(2);
                }}
                style={[
                  tw`py-1 px-4 mx-2 items-center bg-info shadow-md  rounded-full flex-1`,
                ]}
              >
                <Text
                  style={[tw`text-white`, { fontFamily: "Poppins_500Medium" }]}
                >
                  Iya
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={[
                  tw`py-1 px-4 mx-2 items-center bg-danger shadow-md  rounded-full flex-1`,
                  ,
                  { fontFamily: "Poppins_500Medium" },
                ]}
              >
                <Text
                  style={[tw`text-white`, { fontFamily: "Poppins_500Medium" }]}
                >
                  Tidak
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        {step === 2 && (
          <View
            style={[
              tw`bg-secondary bg-opacity-80  w-3/4 rounded-md p-5`,
              {
                borderRadius: width * 0.05,
              },
            ]}
          >
            <Text
              style={[
                tw`text-center font-bold text-2xl text-primary mb-5 `,
                { fontFamily: "Poppins_500Medium" },
              ]}
            >
              Pembatalan
            </Text>
            <View
              style={[
                tw`bg-white rounded-full border-2 border-primary py-3 my-2`,
              ]}
            >
              <Text
                style={[tw`text-center`, { fontFamily: "Poppins_500Medium" }]}
              >
                {data.nama_lengkap}
              </Text>
            </View>
            <View
              style={[
                tw`bg-white rounded-full border-2 border-primary py-3 my-2`,
              ]}
            >
              <Text
                style={[tw`text-center`, { fontFamily: "Poppins_500Medium" }]}
              >
                {AllSurat[props.params.type - 1].name}
              </Text>
            </View>
            <View
              style={[
                tw`bg-white  border-2 border-primary py-3 my-2 px-5`,
                {
                  borderRadius: width * 0.05,
                },
              ]}
            >
              <TextInput
                multiline={true}
                numberOfLines={7}
                placeholder="Alasan Pembatalan Pengajuan Surat"
                style={[tw`text-center`, { fontFamily: "Poppins_500Medium" }]}
                onChangeText={(text) => setMessage(text)}
              />
            </View>
            <TouchableOpacity
              style={[tw`my-5`]}
              onPress={() => {
                props.onConfirm(message);
                setModalVisible(!modalVisible);
              }}
            >
              <CustomButton text="Kirim" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};
const ModalJamOperasi = (props) => {
  const modalVisible = props.modalVisible;
  const setModalVisible = props.setModalVisible;
  const { width } = useWindowDimensions();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[tw`flex-1 justify-center items-center`]}>
        <View
          style={[
            tw`bg-secondary shadow-md w-3/4 rounded-md p-5`,
            {
              borderRadius: width * 0.05,
            },
          ]}
        >
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={[tw`p-2 mb-2 bg-danger shadow-md self-end rounded-full`]}
          >
            <Image
              source={Icons.Close}
              resizeMode="cover"
              style={[tw`tint-white w-3 h-3`]}
            />
          </Pressable>
          <Image
            source={Icons.TimeCircle}
            resizeMode="cover"
            style={[tw` w-12 h-12 mx-auto`]}
          />
          <Text
            style={[
              tw`text-center font-bold  my-5 `,
              { fontFamily: "Poppins_700Bold" },
            ]}
          >
            Jam Operasional Desa {"\n\n"} Hari : Senin -Jumat {"\n"} Pukul :
            08.00-13.00 WIB
          </Text>
        </View>
      </View>
    </Modal>
  );
};
const DetailPengajuanScreen = ({ route }) => {
  const params = route.params;
  if (!params.id_surat) {
    return null;
  }
  //   json decode from params.data
  let data = JSON.parse(params.data);
  let feedback = JsonToArray(data.feedback);
  feedback = feedback.sort((a, b) => {
    return a.updated_at < b.updated_at;
  });
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalJamkerja, setModalJamkerja] = useState(false);
  const { width } = useWindowDimensions();
  const Navigation = useNavigation();
  const handleCancel = (message) => {
    apiCancelSurat(accessToken, { id: params.id_surat, message: message }).then(
      (res) => {
        Navigation.navigate("PengajuanScreen", { refresh: true });
        ToastAndroid.show(
          "Pengajuan berhasil dibatalkan",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    );
  };
  if (params.from_screen) {
    useFocusEffect(
      React.useCallback(() => {
        const onBackPress = () => {
          Navigation.navigate(params.from_screen, { refresh: true });
          return true;
        };
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }, [,])
    );
  }
  return (
    <View style={[tw`bg-primary flex-1`]}>
      <View style={[tw`pt-2`]}>
        <CustomHeader
          style={[tw`pb-5 `, GlobalCss.containerPaddingX]}
          title={AllSurat[params.type - 1].name}
          styleText={[tw`flex-1`]}
        />
      </View>
      <CustomProgressBarSurat active={params.status} />
      <View>
        <Text
          style={[
            tw`text-secondary pt-5 font-bold`,
            GlobalCss.containerPaddingX,
          ]}
        >
          Lihat Timeline
        </Text>
      </View>
      <ScrollView>
        {feedback.map((item, index) => {
          const isStart = index === 0;
          const isEnd = index === 9;
          console.log(item);
          return (
            <View
              key={index}
              style={[tw`flex-row   `, GlobalCss.containerMarginX]}
            >
              <View style={[tw`mx-2 items-center justify-center`]}>
                <View
                  style={[
                    tw.style(
                      `w-4 h-4 bg-gray-400 rounded-full shadow-md`,
                      params.status == 1 && "bg-danger",
                      item.status >= 2 && "bg-secondary"
                    ),
                  ]}
                ></View>
                <View
                  style={[
                    tw.style(
                      `bg-gray-400  w-[2px] absolute `,
                      isStart
                        ? "bottom-0 h-1/2"
                        : isEnd
                        ? "top-0 h-1/2"
                        : "top-0 h-full",
                      params.status == 1 && "bg-danger",
                      item.status >= 2 && "bg-secondary"
                    ),
                  ]}
                ></View>
              </View>
              <View
                style={[tw` w-full flex-1 flex-row rounded-xl p-2 px-3 my-1`]}
              >
                <View style={[tw`w-full `]}>
                  <View style={[tw`flex-row `]}>
                    <View style={[tw` flex-1 `]}>
                      <Text
                        style={[
                          tw.style(
                            `text-gray-400 font-bold`,
                            params.status == 1 && "text-danger",
                            item.status >= 2 && "text-secondary"
                          ),
                        ]}
                      >
                        {params.status == 1 &&
                          (item.update_by_user == 1
                            ? "Berhasil Dibatalkan"
                            : "Ditolak Pihak Desa")}
                        {item.status == 2 && "Disetujui Pihak Desa"}
                        {item.status == 3 && "Surat Telah Jadi"}-{" "}
                        {DateFormatPengajuan(item.updated_at)}{" "}
                      </Text>
                      <Text
                        style={[
                          tw.style(
                            `text-gray-400  `,
                            params.status == 1 && "text-danger",
                            item.status >= 2 && "text-secondary"
                          ),
                        ]}
                      >
                        {params.status == 1 &&
                          (item.update_by_user == 1
                            ? "Pengajuan surat Anda berhasil dibatalkan dengan alasan  sebagai berikut."
                            : "Pengajuan surat ditolak dengan alasan sebagai berikut.") +
                            "\n\nAlasan : \n" +
                            (item.message ? item.message : "<Kosong>") +
                            "\n\n"}
                        {item.status == 2 &&
                          "Surat dalam proses pembuatan, silakan tunggu konfirmasi pihak desa pada timeline ini."}
                        {item.status == 3 &&
                          "Surat yang Anda ajukan telah jadi, silakan ambil di Kantor Desa Ngadiluwih pada jam operasional.\n\nCatatan : \n" +
                            (item.message ? item.message : "<Kosong>") +
                            "\n\nLihat jam operasional kantor desa "}
                        {item.status == 3 && (
                          <Pressable
                            style={[tw` h-full`]}
                            onPress={() => setModalJamkerja(!modalJamkerja)}
                          >
                            <Text
                              style={[
                                tw`text-danger`,
                                {
                                  textDecorationLine: "underline",
                                  fontStyle: "italic",
                                },
                              ]}
                            >
                              {" "}
                              Di Sini
                            </Text>
                          </Pressable>
                        )}
                        {params.status == 1 && item.update_by_user == 0 && (
                          <>
                            <Text>
                              Silakan tinjau kembali surat pengajuan Anda{" "}
                              <Text
                                onPress={() =>
                                  ToastAndroid.show(
                                    "testing",
                                    ToastAndroid.SHORT
                                  )
                                }
                              >
                                Di Sini
                              </Text>
                            </Text>
                          </>
                        )}
                      </Text>
                    </View>
                    <Text
                      style={[
                        tw.style(
                          `text-gray-400 text-xs font-semibold ml-1  `,
                          params.status == 1 && "text-danger",
                          item.status >= 2 && "text-secondary"
                        ),
                      ]}
                    >
                      {item.updated_at.split(" ")[1].substr(0, 5)} WIB
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View style={[tw`flex-row   `, GlobalCss.containerMarginX]}>
          <View style={[tw`mx-2 items-center justify-center`]}>
            <View
              style={[
                tw.style(
                  `w-4 h-4 bg-gray-400 rounded-full shadow-md z-10`,
                  params.status == 0 && "bg-secondary"
                ),
              ]}
            ></View>
            <View
              style={[
                tw.style(
                  `bg-gray-400  w-[2px] absolute  `,
                  params.status == 1 && "bg-danger top-0 h-1/2",
                  (params.status == 0 || params.status > 1) &&
                    "bg-secondary top-0 h-1/2"
                ),
              ]}
            ></View>
          </View>
          <View style={[tw` w-full flex-1 flex-row rounded-xl p-2 px-3 my-1`]}>
            <View style={[tw`w-full `]}>
              <View style={[tw`flex-row `]}>
                <View style={[tw` flex-1 `]}>
                  <Text
                    style={[
                      tw.style(
                        `text-gray-400 font-bold`,
                        params.status + 1 == 1 && "text-secondary"
                      ),
                    ]}
                  >
                    Pengajuan Berhasil -{" "}
                    {DateFormatPengajuan(params.created_at)}{" "}
                  </Text>
                  <Text
                    style={[
                      tw.style(
                        `text-gray-400  `,
                        params.status + 1 == 1 && "text-secondary"
                      ),
                    ]}
                  >
                    Surat dalam proses validasi, silakan tunggu validasi pihak
                    desa pada timeline ini.
                  </Text>
                </View>
                <Text
                  style={[
                    tw.style(
                      `text-gray-400 text-xs font-semibold ml-1  `,
                      params.status + 1 == 1 && "text-secondary"
                    ),
                  ]}
                >
                  {params.created_at.split(" ")[1].substr(0, 5)} WIB
                </Text>
              </View>
            </View>
          </View>
        </View>
        {(params.status == 0 || params.status >= 2) && (
          <>
            {(params.status == 0 || params.status == 2) && (
              <ModalCancel
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onConfirm={handleCancel}
                params={params}
              />
            )}
            {params.status == 3 && (
              <>
                <ModalTelahJadi
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  onConfirm={handleCancel}
                  params={params}
                />
                <ModalJamOperasi
                  modalVisible={modalJamkerja}
                  setModalVisible={setModalJamkerja}
                  params={params}
                />
              </>
            )}
            <View style={[tw`px-5 mt-5`]}>
              <TouchableOpacity
                style={[
                  tw`border-gray-400 border-2`,
                  GlobalCss.containerMarginX,
                ]}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  style={[
                    tw`text-gray-400 text-center py-2`,
                    { fontFamily: "Poppins_500Medium" },
                  ]}
                >
                  Batalkan Surat Pengajuan
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <MenuTabDivider />
      </ScrollView>
    </View>
  );
};

export default DetailPengajuanScreen;
