export const GET_PROFILE = "GET_PROFILE";
export const SELECT_PROFILE = "SELECT_PROFILE";
export const ADD_PROFILE = "ADD_PROFILE";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const RENAME_PROFILE = "RENAME_PROFILE";
export const UP_PROFILE = "UP_PROFILE";
export const DOWN_PROFILE = "DOWN_PROFILE";

export const getProfile = () => ({
    type: GET_PROFILE
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