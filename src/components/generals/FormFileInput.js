import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import * as ImagePicker from "expo-image-picker";
const FormFileInput = (props) => {
  const { width } = useWindowDimensions();
  async function uploadImageDynamic(key, file) {
    Alert.alert("Unggah Foto", "Pilih ingin menggunakan yang mana?", [
      {
        text: "Tidak",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Kamera",
        onPress: async () => {
          const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();
          if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
          }

          const result = await ImagePicker.launchCameraAsync();

          // Explore the result
          console.log(result);

          if (!result.cancelled) {
            props.onChange(result);
            console.log(result.uri);
          }
        },
      },
      {
        text: "Galery",
        onPress: async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
          });
          if (!result.cancelled) {
            props.onChange(result);
          }
        },
      },
    ]);
  }
  return (
    <TouchableOpacity
      style={[tw`my-2`, props.styleTop, { elevation: 0 }]}
      onPress={() => uploadImageDynamic(props.name, props.file)}
    >
      <Text style={[tw`ml-3 font-semibold`]}>
        {props.title}{" "}
        <Text style={[tw`text-error`]}>
          {props.required && "*"} {props.required}
        </Text>
      </Text>
      <View
        style={[
          tw`bg-secondary rounded-2xl my-2 w-8/12 justify-center items-center mx-auto py-5`,
        ]}
      >
        <View style={[tw`w-11/12 justify-center items-center`]}>
          <Image
            source={props.icon}
            style={[tw``, { width: width * 0.15, height: width * 0.15 }]}
            resizeMode={"contain"}
          />
          <Text style={[tw`px-5 text-center mt-4 font-semibold`]}>
            {props.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FormFileInput;
