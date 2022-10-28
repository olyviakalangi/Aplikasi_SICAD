import React, { useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUserInfo } from "../../features/auth/authSlice";
import { apiRegisteredUser, apitGetOnceUserDetail } from "../../lib/api";
const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState();
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = user.stsTokenManager.accessToken;
        dispatch(setAccessToken(token));
        console.log(token);
        apiRegisteredUser(token)
          .then((res) => {
            console.log(res.data);
            setUser(user);
          })
          .catch((err) => {
            console.log(err);
            setUser(undefined);
          });
        apitGetOnceUserDetail(token)
          .then((res) => {
            console.log(res.data);
            dispatch(setUserInfo({ ...res.data, phone: user.phoneNumber }));
          })
          .catch((err) => {
            console.log(err);
            setUser(undefined);
          });
      } else {
        setUser(undefined);
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, [stateChange]);

  return {
    user,
  };
}
