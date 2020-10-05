import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import profiles from './profile';

const percistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['profiles']
}

const profilePercistConpig = {
  key: 'profiles',
  storage: storage,
  blacklist: ['isEdit']
}

const rootReducer = combineReducers({
  profiles: persistReducer(profilePercistConpig, profiles)
})

export default persistReducer(percistConfig, rootReducer)