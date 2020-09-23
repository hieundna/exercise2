import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import profiles from './profile';

const percistConfig = {
  key: 'root',
  storage: storage
}

const profilePercistConpig = {
  key: 'profile',
  storage: storage,
  blacklist: ['count']
}

const rootReducer = combineReducers({
  profiles: persistReducer(profilePercistConpig, profiles)
})

export default persistReducer(percistConfig, rootReducer)