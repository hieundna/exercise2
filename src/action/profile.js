import { GET_PROFILE, SET_PROFILE, ADD_PROFILE, SELECT_PROFILE, UP_PROFILE, DOWN_PROFILE, DELETE_PROFILE, RENAME_PROFILE } from "./type";

export const getProfile = () => ({
    type: GET_PROFILE
});
export const setProfile = (data) => ({
    type: SET_PROFILE,
    data
});
export const addProfile = () => ({
    type: ADD_PROFILE
});
export const deleteProfile = () => ({
    type: DELETE_PROFILE
});
export const renameProfile = (selectedProfile) => ({
    type: RENAME_PROFILE,
    selectedProfile
});
export const selectProfile = (index) => ({
    type: SELECT_PROFILE,
    index
});
export const upProfile = () => ({
    type: UP_PROFILE
});
export const downProfile = () => ({
    type: DOWN_PROFILE
});