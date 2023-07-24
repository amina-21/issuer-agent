import { SIGN_OUT_USER_START, SIGN_OUT_USER_SUCCESS } from "./const";

export const signOutUserStart = (payload) => ({
    type: SIGN_OUT_USER_START,
    payload
});

export const signOutUserSuccess = (payload) => ({
    type: SIGN_OUT_USER_SUCCESS,
    payload
});
