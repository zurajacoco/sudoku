import React from 'react';
import NewGame from '../components/NewGame.jsx';
import Help from '../components/Help.jsx';

class HeaderContainer extends React.Component {
  render() {
    return (
      <div>
        <NewGame />
        <Help />
      </div>
      );
  }
}

export default HeaderContainer;