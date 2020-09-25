import React from 'react';
import '../../assets/css/tooltip.css';
import '../../assets/css/main.css';
import '../../assets/css/profile.css';
import ProfileList from './ProfileList';
import Toolbar from './Toolbar';

const App = () => {
  return (
        <div className="thx-drawer flex">
          <div className="main-title">
            Profile List
          </div>
          <div id="profileWrapper" className="drawer-select flex">
            <ProfileList />
            <Toolbar />
          </div>
        </div>
  );
}

export default App;
