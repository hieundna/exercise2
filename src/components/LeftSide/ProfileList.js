import React, { useEffect, useRef } from 'react';
import '../../assets/css/tooltip.css';
import '../../assets/css/main.css';
import '../../assets/css/profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, setEdit, selectProfile, renameProfile } from '../../action/profile';

const ProfileList = () => {
    const profile = useSelector(state => state.profiles.profile);
    const selected = useSelector(state => state.profiles.selected);
    const isEdit = useSelector(state => state.profiles.isEdit);

    const dispatch = useDispatch();

    const profileList = useRef();
    const editButton = useRef();
    const prevProfile = useRef(profile);

    const showEdit = isEdit ? " show" : "";

    const handleChange = (e) => {
        let title = e.target.value;
        dispatch(setProfile(title));
    }
    const rename_Profile = () => {
        let index = profile.findIndex((x) => x === profile.filter((x) => x.actived === true)[0]);
        if (selected && selected.title.trim() === "") {
            dispatch(setProfile(profile[index].title));
            dispatch(setEdit(false));
            return;
        }
        dispatch(renameProfile(selected));
        dispatch(setEdit(false));
    }
    const onSubmit = (e) => {
        e.preventDefault();
        rename_Profile();
    }

    useEffect(() => {
        if (isEdit) {
            editButton.current.style.top = document.getElementById(selected.id).offsetTop + 'px';
            editButton.current.focus();
            editButton.current.select();
        }
    }, [isEdit])

    useEffect(() => {
        if (prevProfile.current.length < profile.length) {
            profileList.current.scrollTo(0, profileList.current.scrollHeight);
        }
        prevProfile.current = profile;
    }, [profile]);

    return (
        <div id="profileList" ref={profileList} className="scrollable">
            {profile ? profile.map((item, i) =>
                <div
                    key={i}
                    id={item.id}
                    className={"profile-item " + item.name + (item.name === "custom" ? "" : " no-edit") + (item.actived ? " active" : "")}
                    onClick={() => dispatch(selectProfile(i))}>
                    {item.title}
                </div>
            ) : ""}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    id="profileRename"
                    ref={editButton}
                    onChange={handleChange}
                    onBlur={rename_Profile}
                    value={selected ? selected.title : ""}
                    className={"profile-item" + showEdit}
                    placeholder="Enter Profile Name"
                    maxLength="25"
                /></form>
        </div>
    );
}

export default ProfileList;
