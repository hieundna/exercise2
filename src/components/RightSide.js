import React from 'react';
import '../assets/css/main.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    selected: state.profiles.selected,
  })

const RightSide = (props) => {
    
  return (
        <div className="thx-window">
          <div className="sub-title flex">
            <h1 id="eqTitle">{props.selected ? props.selected.title : ""}</h1>
          </div>
        </div>
  );
}

export default connect(mapStateToProps)(RightSide);
