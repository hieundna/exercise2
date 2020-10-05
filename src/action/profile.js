import { SET_PROFILE, SET_EDIT, ADD_PROFILE, SELECT_PROFILE, UP_PROFILE, DOWN_PROFILE, DELETE_PROFILE, RENAME_PROFILE } from "./type";

export const setProfile = (data) => ({
    type: SET_PROFILE,
    data
});
export const setEdit = (data) => ({
    type: SET_EDIT,
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