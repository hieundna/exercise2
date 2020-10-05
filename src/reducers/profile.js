import { SET_PROFILE, SET_EDIT, ADD_PROFILE, SELECT_PROFILE, UP_PROFILE, DOWN_PROFILE, DELETE_PROFILE, RENAME_PROFILE } from "../action/type";

const initialState = {
  profile: [
    { id: "profile1", name: "default", title: "Default", actived: true },
    { id: "profile2", name: "game", title: "Game", actived: false },
    { id: "profile3", name: "movie", title: "Movie", actived: false },
    { id: "profile4", name: "music", title: "Music", actived: false },
  ],
  selected: { id: "profile1", name: "default", title: "Default", actived: true },
  isEdit: false
}

const profiles = (state = initialState, action) => {
  const getIndexSelected = () => {
    return state.profile.findIndex((x) => x === state.profile.filter((x) => x.actived === true)[0])
  }

  let newProfile = [...state.profile];
  let index = getIndexSelected();
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        selected: { ...state.selected, title: action.data }
      }
    case SET_EDIT:
      return {
        ...state,
        isEdit: action.data
      }
    case SELECT_PROFILE:
      newProfile[index].actived = false;
      newProfile[action.index].actived = true;
      return {
        ...state,
        profile: newProfile,
        selected: newProfile[action.index]
      }
    case UP_PROFILE:
      let temp = newProfile[index];
      newProfile[index] = newProfile[index - 1];
      newProfile[index - 1] = temp;
      return {
        ...state,
        profile: newProfile
      }
    case DOWN_PROFILE:
      let temp1 = newProfile[index];
      newProfile[index] = newProfile[index + 1];
      newProfile[index + 1] = temp1;
      return {
        ...state,
        profile: newProfile
      }
    case ADD_PROFILE:
      let id = new Date().getTime();
      newProfile.push({ id, name: "custom", title: "New Profile", actived: true });
      newProfile[index].actived = false;
      return {
        ...state,
        profile: newProfile,
        selected: newProfile[newProfile.length - 1]
      }
    case DELETE_PROFILE:
      let idx = index;
      newProfile.splice(idx, 1);
      if (newProfile[index - 1]) {
        idx -= 1;
        newProfile[idx].actived = true;
      } else {
        newProfile[idx].actived = true;
      }
      return {
        ...state,
        profile: newProfile,
        selected: newProfile[idx]
      }
    case RENAME_PROFILE:
      let selected = action.selectedProfile;
      let name = selected.title;
      if (name) {
        name = name.replace(/\s{2,}/g, ' ').trim().split(" ");
        for (let i = 0; i < name.length; i++) {
          name[i] = name[i][0].toUpperCase() + name[i].slice(1);
        }
        name = name.join(" ");
      }
      newProfile[index].title = name;
      return {
        ...state,
        profile: newProfile,
      }
    default:
      return state

  }
}
export default profiles
