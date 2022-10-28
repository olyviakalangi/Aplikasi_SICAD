import axios from "axios";
// initialize URL Api
const url = "https://desangadiluwih.kedirikab.go.id/api/";
// API for Authentication
// Authorization: Bearer {token}
const AUTHORIZATION_HEADER = (token) => {
  return {
    Authorization: "Bearer " + token,
  };
};
//   handle getOnceDetail
export const apiRegisteredUser = (token) =>
  axios.get(url + "user", {
    headers: AUTHORIZATION_HEADER(token),
  });
//   handle getOnceDetail
export const apitGetOnceUserDetail = (token) =>
  axios.get(url + "userdetail", {
    headers: AUTHORIZATION_HEADER(token),
  });
export const apiUpdateUserDetail = (token, data) =>
  axios.post(url + "userdetail", data, {
    headers: AUTHORIZATION_HEADER(token),
  });
export const apiUpdateUserDetailWithPicture = (token, data) =>
  axios.post(url + "userdetail/picture", data, {
    headers: {
      ...AUTHORIZATION_HEADER(token),
      "Content-Type": "multipart/form-data",
    },
  });
export const apiUploadSuratKTP = (token, data) =>
  axios.post(url + "surat/ktp", data, {
    headers: {
      ...AUTHORIZATION_HEADER(token),
      "Content-Type": "multipart/form-data",
    },
  });
export const apiUploadSuratOnlyText = (token, data) =>
  axios.post(url + "surat/all", data, {
    headers: {
      ...AUTHORIZATION_HEADER(token),
    },
  });
export const apiUploadSuratWithPicture = (token, data) =>
  axios.post(url + "surat/allpicture", data, {
    headers: {
      ...AUTHORIZATION_HEADER(token),
      "Content-Type": "multipart/form-data",
    },
  });

export const apiGetAllSurat = (token, data) =>
  axios.post(url + "surat/getall", data, {
    headers: {
      ...AUTHORIZATION_HEADER(token),
    },
  });
export const apitGetNotifCount = (token) =>
  axios.get(url + "surat/getnotifcount", {
    headers: AUTHORIZATION_HEADER(token),
  });
export const apiSetNotif = (token, data) =>
  axios.post(url + "surat/setnotif", data, {
    headers: AUTHORIZATION_HEADER(token),
  });
export const apiCancelSurat = (token, data) =>
  axios.post(url + "surat/cancelsurat", data, {
    headers: AUTHORIZATION_HEADER(token),
  });
