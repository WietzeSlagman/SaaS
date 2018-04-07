import React from 'react';
import Logo from 'components/Logo';
import './index.css';

var showName=false
var showSlogan=false

class Header extends React.Component {

    componentWillMount(){
        if(window.location.pathname !== "/"){
            showName=false
            showSlogan=false
            console.log("path",window.location.pathname)
        } else {
            showName=true
            showSlogan=true
            console.log("path",window.location.pathname)
        }

    }

  render() {
    return (
      <div className="Header"  >
        <Logo showName={showName} showSlogan={showSlogan} />
      </div>
    );
  }
}

export default Header;
