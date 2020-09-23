import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import './assets/css/tooltip.css';
import './assets/css/main.css';
import './assets/css/profile.css';
import { connect } from 'react-redux';
import { getProfile, selectProfile, upProfile, downProfile, addProfile, deleteProfile, renameProfile } from './action/profile';
import profiles from './reducers/profile';


const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
  selected: state.profiles.selected,
  count: state.profiles.count
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getProfile: () => dispatch(getProfile()),
  selectProfile: (index) => dispatch(selectProfile(index)),
  upProfile: () => dispatch(upProfile()),
  downProfile: () => dispatch(downProfile()),
  addProfile: () => dispatch(addProfile()),
  renameProfile: (selected) => dispatch(renameProfile(selected)),
  deleteProfile: () => dispatch(deleteProfile()),
})

const App = (props) => {

  const { profile, count } = props;

  const [selected, setSelected] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const profileList = useRef();
  const delButton = useRef();
  const editButton = useRef();

  const showButton = selected && selected.name === "custom" ? " show" : "";
  const showEdit = isEdit ? " show" : "";
  const showDelete = isDelete ? " show" : "";
  const isFirstItem = selected && selected === profile[0] ? " disabled" : "";
  const isLastItem = selected && selected === profile[profile.length - 1] ? " disabled" : "";

  const getIndexSelected = () => {
    return profile.findIndex((x) => x === profile.filter((x) => x.actived === true)[0])
  }

  const profileUp = () => {
    let index = getIndexSelected();
    if (!profile[index - 1]) {
      return;
    }
    props.upProfile();
  }
  const profileDown = () => {
    let index = getIndexSelected();
    if (!profile[index + 1]) {
      return;
    }
    props.downProfile();
  }

  const handleChange = (e) => {
    let name = e.target.value;
    setSelected({ ...selected, title: name });
  }
  const renameProfile = () => {
    let index = profile.findIndex((x) => x === profile.filter((x) => x.actived === true)[0]);
    if (selected && selected.title.trim() === "") {
      setSelected(profile[index]);
      setIsEdit(false);
      return;
    }
    props.renameProfile(selected);
    setIsEdit(false);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    renameProfile();
  }

  const deleteProfile = () => {
    props.deleteProfile();
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
    props.getProfile();
    document.addEventListener('click', clickOutSide);
    return () => document.removeEventListener('click', clickOutSide);
  }, [])

  useEffect(() => {
    if (count > 0) {
      console.log(profileList.current.scrollHeight);
      profileList.current.scrollTo(0, profileList.current.scrollHeight);
    }
    if (isEdit) {
      editButton.current.style.top = document.getElementById(selected.id).offsetTop + 'px';
      editButton.current.focus();
      editButton.current.select();
    }
  }, [count, isEdit])

  useEffect(() => {
    setSelected(profile.filter((x) => x.actived === true)[0]);
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
              {profile ? profile.map((item, i) =>
                <div
                  key={i}
                  id={item.id}
                  className={"profile-item "
                    + item.name
                    + (item.name === "custom" ? "" : " no-edit")
                    + (item.actived ? " active" : "")
                  }
                  onClick={() => props.selectProfile(i)}>
                  {item.title}
                </div>
              ) : ""}
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
              <div className="icon add" id="profileAdd" onClick={() => {
                props.addProfile();
                console.log(profileList.current.scrollHeight + 30);
              }}></div>

              <div className={"icon edit" + showButton} id="profileEdit" onClick={() => setIsEdit(!isEdit)}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
