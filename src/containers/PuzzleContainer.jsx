import React from 'react';
import Row from './RowContainer.jsx';

class PuzzleContainer extends React.Component {
  render() {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      rows.push(<Row key={i} />);
    }

    return (
        <div>
          {rows}
        </div>
      );
  }
}

export default PuzzleContainer;