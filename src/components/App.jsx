import React from 'react';
import Header from '../containers/HeaderContainer.jsx';
import Puzzle from '../containers/PuzzleContainer.jsx';
import Controls from '../containers/ControlsContainer.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Puzzle />
        <Controls />
        <Footer />
      </div>
      );
  }
}

export default App;