import React from 'react';
import Logo from '../Logo';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <Logo />
      </div>
    );
  }
}

export default Header;