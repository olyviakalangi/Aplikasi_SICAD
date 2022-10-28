import * as ImagePicker from "expo-image-picker";
export async function uploadImageDynamic(key, file, form, setForm) {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    quality: 1,
  });
  if (!result.cancelled) {
    setForm({ ...form, [key]: result.uri });
    file(result);
  }
}
