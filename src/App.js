import React, { useState } from 'react';
import './App.css';
import './assets/css/tooltip.css';
import './assets/css/main.css';
import './assets/css/profile.css';

const App = () => {
  const [profile, setProfile] = useState([
    { id: "profile1", name: "default", title: "Default", actived: true },
    { id: "profile2", name: "game", title: "Game", actived: false },
    { id: "profile3", name: "movie", title: "Movie", actived: false },
    { id: "profile4", name: "music", title: "Music", actived: false },
    { id: "custom1", name: "custom", title: "Custom 1", actived: false },
    { id: "custom2", name: "custom", title: "demo long text demo long text demo", actived: false },
  ])
  const [selected, setSelected] = useState();

  const selectProfile = (i) => {
    let newProfile = [...profile];
    let index = newProfile.findIndex((x) => {
      return x === newProfile.filter((x) => {
        return x.actived === true;
      })[0];
    });
    newProfile[index].actived = false;
    newProfile[i].actived = true;
    console.log(newProfile);
    setProfile(newProfile);
  }

  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <div className="thx-drawer flex">
          <div className="main-title">
            Profile List
          </div>
          <div id="profileWrapper" className="drawer-select flex">
            <div id="profileList" className="scrollable">
              {profile.map((item, i) =>
                <div
                  key={i}
                  id={item.id}
                  className={"profile-item "
                    + item.name
                    + (item.name === "custom" ? "" : " no-edit")
                    + (item.actived ? " active" : "")
                  }
                  onClick={() => selectProfile(i)}>
                  {item.title}
                </div>
              )}
              <input
                id="profileRename"
                className="profile-item"
                placeholder="Enter Profile Name"
                maxlength="25"
              />
            </div>
            <div className="toolbar flex">
              <div className="icon add" id="profileAdd"></div>
              <div className="icon edit" id="profileEdit"></div>
              <div className="icon delete" id="profileDelete"></div>

              <div className="icon down" id="profileDown"></div>
              <div className="icon up disabled" id="profileUp"></div>
            </div>
            <div id="profileDelCfm" className="profile-del alert flex">
              <div className="title">delete eq</div>
              <div className="body-text t-center" id="delName">delete eq</div>
              <div className="thx-btn" id="cfmDelete">delete</div>
            </div>
          </div>
        </div>

        <div className="thx-window">
          <div className="sub-title flex">
            <h1 id="eqTitle" className="eq-title">Default</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
