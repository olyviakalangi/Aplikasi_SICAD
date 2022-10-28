import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import tw from "../../lib/tailwind";
import Images from "../../constants/Images";
import GlobalCss from "../../styles/global";
import CustomButton from "../../components/generals/CustomButton";
import { useNavigation } from "@react-navigation/native";

const GreetingScreen = () => {
  const { width, height } = useWindowDimensions();
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={[GlobalCss.container, tw`justify-between`]}>
      <View style={[tw`mt-5 h-1/2  `]}>
        <Text style={[tw`text-center text-primary font-bold text-3xl`]}>
          Selamat Datang
        </Text>
        <View style={[tw` w-8/12 py-5 mx-auto `]}>
          <Image
            source={Images.Greeting}
            style={[tw`w-full h-full`, { resizeMode: "contain" }]}
          />
        </View>
      </View>
      <View>
        <Text style={[tw`text-center text-primaryFont  text-lg`]}>
          Mari membangun layanan yang cerdas dan modern dengan{" "}
          <Text style={[tw`text-primary`]}>SICAD Ngadiluwih</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => Navigation.navigate("LoginScreen")}>
        <CustomButton style={[tw`my-10`]} text="Mulai" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GreetingScreen;
