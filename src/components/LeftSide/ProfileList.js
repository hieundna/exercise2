import React, { useEffect, useRef } from 'react';
import '../../assets/css/tooltip.css';
import '../../assets/css/main.css';
import '../../assets/css/profile.css';
import { connect } from 'react-redux';
import { getProfile, setProfile, setEdit, selectProfile, renameProfile } from '../../action/profile';

const mapStateToProps = (state) => ({
    profile: state.profiles.profile,
    selected: state.profiles.selected,
    count: state.profiles.count,
    isEdit: state.profiles.isEdit
})

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    getProfile: () => dispatch(getProfile()),
    setProfile: (data) => dispatch(setProfile(data)),
    setEdit: (data) => dispatch(setEdit(data)),
    selectProfile: (index) => dispatch(selectProfile(index)),
    renameProfile: (selected) => dispatch(renameProfile(selected)),
})

const App = (props) => {

    const { profile, count, selected, isEdit } = props;

    const profileList = useRef();
    const editButton = useRef();

    const showEdit = isEdit ? " show" : "";

    const handleChange = (e) => {
        let title = e.target.value;
        props.setProfile(title);
    }
    const renameProfile = () => {
        let index = profile.findIndex((x) => x === profile.filter((x) => x.actived === true)[0]);
        if (selected && selected.title.trim() === "") {
            props.setProfile(profile[index].title);
            props.setEdit(false);
            return;
        }
        props.renameProfile(selected);
        props.setEdit(false);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        renameProfile();
    }

    useEffect(() => {
        if (count > 0) {
            profileList.current.scrollTo(0, profileList.current.scrollHeight);
        }
    }, [count])

    useEffect(() => {
        if (isEdit) {
            editButton.current.style.top = document.getElementById(selected.id).offsetTop + 'px';
            editButton.current.focus();
            editButton.current.select();
        }
    }, [isEdit])

    useEffect(() => {
        props.getProfile();
    }, [profile]);

    return (
        <div id="profileList" ref={profileList} className="scrollable">
            {profile ? profile.map((item, i) =>
                <div
                    key={i}
                    id={item.id}
                    className={"profile-item " + item.name + (item.name === "custom" ? "" : " no-edit") + (item.actived ? " active" : "")}
                    onClick={() => props.selectProfile(i)}>
                    {item.title}
                </div>
            ) : ""}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
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
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
