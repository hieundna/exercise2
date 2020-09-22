import React, { createRef, useEffect, useRef, useState } from 'react';
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
    { id: "custom2", name: "custom", title: "Demo Long Text Demo Long Text Demo", actived: false },
  ])

  const [selected, setSelected] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [count, setCount] = useState(0);

  const profileList = useRef();
  const delButton = useRef();
  const editButton = useRef();

  const showButton = selected && selected.name === "custom" ? " show" : "";
  const showEdit = isEdit ? " show" : "";
  const showDelete = isDelete ? " show" : "";
  const isFirstItem = selected && selected === profile[0] ? " disabled" : "";
  const isLastItem = selected && selected === profile[profile.length - 1] ? " disabled" : "";

  const selectProfile = (i) => {
    let newProfile = [...profile];
    let index = getIndexSelected();
    newProfile[index].actived = false;
    newProfile[i].actived = true;
    setProfile(newProfile);
  }

  const getSelected = () => {
    return profile.filter((x) => x.actived === true)[0];
  }
  const getIndexSelected = () => {
    return profile.findIndex((x) => x === getSelected())
  }

  const profileUp = () => {
    let newProfile = [...profile];
    let index = getIndexSelected();
    let temp = newProfile[index];
    if (!newProfile[index - 1]) {
      return;
    } else {
      newProfile[index] = newProfile[index - 1];
      newProfile[index - 1] = temp;
      setProfile(newProfile);
    }
  }
  const profileDown = () => {
    let newProfile = [...profile];
    let index = getIndexSelected();
    let temp = newProfile[index];
    if (!newProfile[index + 1]) {
      return;
    } else {
      newProfile[index] = newProfile[index + 1];
      newProfile[index + 1] = temp;
      setProfile(newProfile);
    }
  }

  const addProfile = () => {
    let id = new Date().getTime();
    profile.push({ id: id, name: "custom", title: "New Profile", actived: false });
    selectProfile(profile.length - 1);
    setCount((x) => x + 1);
  }

  const editProfile = () => {
    setIsEdit(!isEdit);
  }

  const handleChange = (e) => {
    let name = e.target.value;
    setSelected({ ...selected, title: name });
  }
  const renameProfile = () => {
    let newProfile = [...profile];
    let index = getIndexSelected();
    if (selected && selected.title.trim() === "") {
      setSelected(newProfile[index]);
      setIsEdit(false);
      return;
    }
    let name = selected.title;
    if (name) {
      name = name.replace(/\s{2,}/g, ' ').trim().split(" ");
      for (let i = 0; i < name.length; i++) {

        name[i] = name[i][0].toUpperCase() + name[i].slice(1);
      }
      name = name.join(" ");
    }
    newProfile[index].title = name;
    setProfile(newProfile);
    setIsEdit(false);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    renameProfile();
  }

  const deleteProfile = () => {
    let index = getIndexSelected();
    profile.splice(index, 1);
    if (profile[index - 1]) {
      profile[index - 1].actived = true;
      setSelected(profile[index - 1]);
    } else {
      profile[index].actived = true;
      setSelected(profile[index]);
    }
    setIsDelete(false);
  }

  const clickOutSide = (event) => {
    if (!document.getElementById("profileDelete").contains(event.target)) {
      if (delButton && !delButton.current.contains(event.target)) {
        setIsDelete(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickOutSide);
    return () => document.removeEventListener('click', clickOutSide);
  }, [])

  useEffect(() => {
    if (count > 0) {
      profileList.current.scrollTo(0, profileList.current.scrollHeight);
    }
    if (isEdit) {
      editButton.current.style.top = document.getElementById(selected.id).offsetTop + 'px';
      editButton.current.focus();
      editButton.current.select();
    }
  }, [count, isEdit])

  useEffect(() => {
    setSelected(getSelected);
  }, [profile]);

  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <div className="thx-drawer flex">
          <div className="main-title">
            Profile List
          </div>
          <div id="profileWrapper" className="drawer-select flex">
            <div id="profileList" ref={profileList} className="scrollable">
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
              <form onSubmit={onSubmit}><input
                id="profileRename"
                ref={editButton}
                onChange={handleChange}
                onBlur={renameProfile}
                value={selected ? selected.title : ""}
                className={"profile-item" + showEdit}
                placeholder="Enter Profile Name"
                maxLength="25"
              /></form>
            </div>
            <div className="toolbar flex">
              <div className="icon add" id="profileAdd" onClick={addProfile}></div>
              <div className={"icon edit" + showButton} id="profileEdit" onClick={editProfile}></div>
              <div className={"icon delete" + showButton} id="profileDelete" onClick={() => setIsDelete(!isDelete)}></div>

              <div className={"icon down" + isLastItem} id="profileDown" onClick={profileDown}></div>
              <div className={"icon up" + isFirstItem} id="profileUp" onClick={profileUp}></div>
            </div>
            <div id="profileDelCfm" className={"profile-del alert flex" + showDelete} ref={delButton}>
              <div className="title">delete eq</div>
              <div className="body-text t-center" id="delName">delete eq</div>
              <div className="thx-btn" id="cfmDelete" onClick={deleteProfile}>delete</div>
            </div>
          </div>
        </div>

        <div className="thx-window">
          <div className="sub-title flex">
            <h1 id="eqTitle" className="eq-title">{selected ? selected.title : ""}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
