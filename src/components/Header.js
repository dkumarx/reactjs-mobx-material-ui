import React from 'react';
import { appName, isAuthenticated } from "../stores/commonStore";

class Header extends React.Component {
  render() {
    return (
      <nav>
        <h1>
          {appName.get()}
        </h1>
      </nav>
    );
  }
}

export default Header;