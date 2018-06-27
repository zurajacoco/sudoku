import React from 'react';
import Cell from '../components/Cell.jsx';

class RowContainer extends React.Component {
  render() {
    const cells = [];
    for (let i = 0; i < 9; i++) {
      cells.push(<Cell key={i} />);
    }

    return (
        <div>
          {cells}
        </div>
      );
  }
}

export default RowContainer;