import React, { useEffect, useRef, useState } from 'react';
import '../../assets/css/tooltip.css';
import '../../assets/css/main.css';
import '../../assets/css/profile.css';
import { addProfile, upProfile, downProfile, deleteProfile, setEdit } from '../../action/profile';
import { useSelector, useDispatch } from 'react-redux';

const Toolbar = () => {
    const profile = useSelector(state => state.profiles.profile);
    const selected = useSelector(state => state.profiles.selected);
    const isEdit = useSelector(state => state.profiles.isEdit);

    const dispatch = useDispatch();
    
    const [isDelete, setIsDelete] = useState(false);

    const delButton = useRef();

    const showButton = selected && selected.name === "custom" ? " show" : "";
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
        dispatch({ type: 'UPPROFILE'})
        dispatch(upProfile());
    }
    const profileDown = () => {
        let index = getIndexSelected();
        if (!profile[index + 1]) {
            return;
        }
        dispatch(downProfile());
    }

    const delProfile = () => {
        dispatch(deleteProfile());
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

    return (
        <>
            <div className="toolbar flex">
                <div className="icon add" id="profileAdd" onClick={() => {
                    dispatch(addProfile());
                }}></div>

                <div className={"icon edit" + showButton} id="profileEdit" onClick={() => dispatch(setEdit(!isEdit))}></div>
                <div className={"icon delete" + showButton} id="profileDelete" onClick={() => setIsDelete(!isDelete)}></div>

                <div className={"icon down" + isLastItem} id="profileDown" onClick={profileDown}></div>
                <div className={"icon up" + isFirstItem} id="profileUp" onClick={profileUp}></div>
            </div>
            <div id="profileDelCfm" className={"profile-del alert flex" + showDelete} ref={delButton}>
                <div className="title">delete eq</div>
                <div className="body-text t-center" id="delName">delete eq</div>
                <div className="thx-btn" id="cfmDelete" onClick={delProfile}>delete</div>
            </div>
        </>
    );
}

export default Toolbar;
