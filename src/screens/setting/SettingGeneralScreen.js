import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import CustomHeader from "../../components/header/CustomHeader";
import GlobalCss from "../../styles/global";
import { useState } from "react";

const CheckButton = (props) => {
  const active = props.active;
  return (
    <TouchableOpacity
      style={[tw`flex-row items-center flex-1 px-2`]}
      onPress={() => {
        props.onPress();
      }}
    >
      <View
        style={[
          tw.style(
            `w-full h-3 bg-gray-400 rounded-lg`,
            active && "bg-secondary"
          ),
        ]}
      />
      <View
        style={[
          tw.style(
            `w-5 h-5 bg-gray-400 rounded-full absolute shadow-md`,
            active ? "bg-primary -right-1" : "-left-1 "
          ),
        ]}
      />
    </TouchableOpacity>
  );
};
const option = [
  {
    name: "Aktifkan Pembaruan Status Surat pada Notifikasi HP",
    child: [
      {
        name: "Beritahu Keberhasilan Pengajuan Surat",
      },
      {
        name: "Beritahu Status Disetujui/Ditolak Setiap Pengajuan Surat",
      },
      {
        name: "Beritahu Pembaruan Status Surat",
      },
    ],
  },
  {
    name: "Beritahu Pesan Admin",
  },
];
const initialState = [
  {
    active: true,
    child: [
      {
        active: true,
      },
      {
        active: true,
      },
      {
        active: true,
      },
    ],
  },
  {
    active: true,
  },
];
export default function SettingGeneralScreen() {
  const { width } = useWindowDimensions();
  const [active, setActive] = useState(initialState);
  return (
    <View style={[tw`flex-1 bg-primary pt-2 `, GlobalCss.containerPaddingX]}>
      <CustomHeader title="Pengaturan Umum" style={[tw`pb-2`]} />
      {option.map((item, index) => {
        return (
          <View
            style={[
              tw` bg-white my-2`,
              {
                borderRadius: width * 0.05,
                padding: width * 0.05,
              },
            ]}
            key={index}
          >
            <View style={[tw` flex-row`]}>
              <View style={[tw`w-10/12`]}>
                <Text
                  style={[
                    tw`text-primary`,
                    { fontFamily: "Poppins_500Medium" },
                  ]}
                >
                  {item.name}
                </Text>
              </View>
              <CheckButton
                active={active[index].active}
                onPress={() => {
                  console.log(active[index]);
                  setActive((prev) => {
                    return {
                      ...prev,
                      [index]: {
                        ...prev[index],
                        active: !prev[index].active,
                      },
                    };
                  });
                }}
              />
            </View>
            {active[index].active && active[index].child && (
              <View>
                {option[index].child.map((child, indexChild) => {
                  return (
                    <View style={[tw` flex-row`]} key={indexChild}>
                      <View style={[tw`w-10/12`]}>
                        <Text
                          style={[
                            tw`text-primary`,
                            { fontFamily: "Poppins_500Medium" },
                          ]}
                        >
                          {child.name}
                        </Text>
                      </View>
                      <CheckButton
                        active={active[index].child[indexChild].active}
                        onPress={() => {
                          setActive((prev) => {
                            return {
                              ...prev,
                              [index]: {
                                ...prev[index],
                                child: {
                                  ...prev[index].child,
                                  [indexChild]: {
                                    active:
                                      !prev[index].child[indexChild].active,
                                  },
                                },
                              },
                            };
                          });
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
