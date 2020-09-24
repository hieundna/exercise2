import React from 'react';
import './assets/css/tooltip.css';
import './assets/css/main.css';
import './assets/css/profile.css';
import { connect } from 'react-redux';
import RightSide from './components/RightSide';
import LeftSide from './components/LeftSide';

const App = () => {

  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}

export default connect()(App);
