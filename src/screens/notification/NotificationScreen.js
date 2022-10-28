import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeaderBg from "../../components/header/CustomHeaderBg";
import GlobalCss from "../../styles/global";
import tw from "../../lib/tailwind";
import Icons from "../../constants/Icons";
import Dummy, { AllSurat } from "../../constants/Dummy";
import { ScrollView } from "react-native-gesture-handler";
import MenuTabDivider from "../../components/divider/MenuTabDivider";
import { apiGetAllSurat, apiSetNotif } from "../../lib/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
const RenderNewsItem = (props) => {
  const { height, width } = useWindowDimensions();
  return (
    <TouchableOpacity
      style={[
        tw.style(
          `rounded-2xl py-5 px-2 flex-row items-center my-2`,
          props.status == 0 && "bg-secondary",
          props.status == 1 && "bg-primary",
          props.status == 2 && "bg-primary",
          props.status == 3 && "bg-primaryLight"
        ),
      ]}
      onPress={() => props.onPress(props.id_surat)}
    >
      <Image
        source={Icons.Paper}
        resizeMode="cover"
        style={[tw``, { width: width * 0.12, height: width * 0.12 }]}
      />
      {props.status == 2 && (
        <View
          style={[tw`bg-success p-2  absolute -left-2 -top-2 rounded-full `]}
        >
          <Image
            source={Icons.Check}
            style={[
              tw`w-3 h-3 tint-primary`,
              { transform: [{ rotate: "-30  deg" }] },
            ]}
            resizeMode="contain"
          />
        </View>
      )}
      {props.status == 1 && (
        <View style={[tw`bg-error p-2  absolute -left-2 -top-2 rounded-full `]}>
          <Image
            source={Icons.Alert}
            style={[
              tw`w-3 h-3 tint-white`,
              { transform: [{ rotate: "-30  deg" }] },
            ]}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={[tw`flex-1 px-2`]}>
        <Text style={[tw`font-bold text-white`]}>
          {AllSurat[props.type - 1].name}
        </Text>
        {props.status == 0 && (
          <>
            <Text style={[tw`text-sm text-white`]}>
              Surat berhasil diajukan
            </Text>
            <Text style={[tw`text-sm text-white`]}>
              Lihat proses pengajuan surat Anda
            </Text>
          </>
        )}
        {props.status == 1 && (
          <>
            <Text style={[tw`text-sm text-white`]}>Surat Anda ditolak</Text>
            <Text style={[tw`text-sm text-white`]}>
              Silakan ikuti langkah selanjutnya
            </Text>
          </>
        )}
        {props.status == 2 && (
          <>
            <Text style={[tw`text-sm text-white`]}>Surat Anda disetujui</Text>
            <Text style={[tw`text-sm text-white`]}>
              Silakan ikuti langkah selanjutnya
            </Text>
          </>
        )}
        {props.status == 3 && (
          <>
            <Text style={[tw`text-sm text-white`]}>Surat Anda telah jadi</Text>
            <Text style={[tw`text-sm text-white`]}>
              Silakan ambil surat Anda ke Kantor Desa
            </Text>
          </>
        )}
      </View>
      <View
        style={[
          tw`bg-white p-2 rounded-full shadow-md`,
          { transform: [{ rotate: "180deg" }] },
        ]}
      >
        <Image
          source={Icons.Back}
          style={[tw``, { width: width * 0.03, height: width * 0.03 }]}
        />
      </View>
    </TouchableOpacity>
  );
};
const RenderLatesItem = (props) => {
  const { height, width } = useWindowDimensions();
  return (
    <View style={[tw.style(`rounded-2xl py-2   flex-row items-start my-1`)]}>
      <View style={[tw`bg-primary p-1  rounded-md `]}>
        <Image
          source={Icons.Alert}
          style={[tw`w-2 h-2 tint-white`]}
          resizeMode="contain"
        />
      </View>
      <View style={[tw`flex-1 px-2`]}>
        <Text style={[tw`font-bold`]}> {AllSurat[props.type - 1].name}</Text>
        {props.status == 0 && (
          <Text style={[tw`text-xs`]}>Surat berhasil diajukan</Text>
        )}
        {props.status == 1 && (
          <Text style={[tw`text-xs`]}>Surat Anda ditolak</Text>
        )}
        {props.status == 2 && (
          <Text style={[tw`text-xs`]}>Surat Anda disetujui</Text>
        )}
        {props.status == 3 && (
          <Text style={[tw`text-xs`]}>Surat Anda telah jadi</Text>
        )}
        <Text style={[tw`text-xs`]}>
          Silakan lihat proses pengajuan di timeline
        </Text>
      </View>
      <Text style={[tw`text-xs`]}>2 hari lalu</Text>
    </View>
  );
};
const RenderNews = (props) => {
  const { height, width } = useWindowDimensions();
  const data = props.item;
  const [pengajuanNews, setPengajuanNews] = useState([]);
  useEffect(() => {
    setPengajuanNews(
      data.filter((item) => {
        if (item.notif_in == 1) {
          return item;
        }
      })
    );
  }, [props]);
  return (
    <View style={[tw`bg-secondary py-2 px-4 bg-opacity-40 rounded-xl`]}>
      {pengajuanNews.map((item, index) => (
        <RenderNewsItem key={index} {...item} onPress={props.onPress} />
      ))}
    </View>
  );
};
const RenderLates = (props) => {
  const { height, width } = useWindowDimensions();
  const data = props.item;
  const [pengajuanLatest, setPengajuanLatest] = useState([]);
  useEffect(() => {
    setPengajuanLatest(
      data.filter((item) => {
        if (!item.notif_in || item.notif_in == 0) {
          return item;
        }
      })
    );
  }, [props]);
  return (
    <View style={[tw`bg-white py-2 px-4 bg-opacity-40 rounded-xl`]}>
      {pengajuanLatest.map((item, index) => (
        <RenderLatesItem key={index} {...item} />
      ))}
    </View>
  );
};
const NotificationScreen = () => {
  const { width, height } = useWindowDimensions();
  const [pengajuanItem, setPengajuanItem] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  function handleGetSurat() {
    apiGetAllSurat(accessToken).then((res) => {
      setPengajuanItem(res.data);
    });
  }
  function handleSetNotif(item) {
    apiSetNotif(accessToken, { id: item })
      .then((res) => {
        console.log(res.data);
        handleGetSurat();
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  }
  useEffect(() => {
    apiGetAllSurat(accessToken).then((res) => {
      setPengajuanItem(res.data);
    });
    return () => {};
  }, []);
  return (
    <View style={[tw`flex-1`]}>
      <CustomHeaderBg title="Notifikasi" />
      <SafeAreaView style={[GlobalCss.containerPaddingX, tw``]}>
        <Text style={[tw`font-bold text-lg pb-2`]}>Terbaru</Text>
        <ScrollView
          style={[tw``, { height: height * 0.6 }]}
          showsVerticalScrollIndicator={false}
        >
          <RenderNews item={pengajuanItem} onPress={handleSetNotif} />
        </ScrollView>
        <Text style={[tw`font-bold text-lg pb-2`]}>Sebelumnya</Text>
        <ScrollView
          style={([tw``], { height: height * 0.3 })}
          showsVerticalScrollIndicator={false}
        >
          <RenderLates item={pengajuanItem} />
          <MenuTabDivider />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default NotificationScreen;
