import React from 'react';
import '../../assets/css/main.css';
import { useSelector } from 'react-redux';

const RightSide = () => {
  const selected = useSelector(state => state.profiles.selected);
    
  return (
        <div className="thx-window">
          <div className="sub-title flex">
            <h1 id="eqTitle">{selected ? selected.title : ""}</h1>
          </div>
        </div>
  );
}

export default RightSide;
