import React from 'react';
import './index.css';

class DroneInfo extends React.PureComponent {
  render() {
    const { id, type } = this.props;
    return (
      <div className="DroneInfo">
        <div>
          <div className="DroneInfo-header">{type} Drone</div>
          <div className="DroneInfo-id">{id}</div>
        </div>
      </div>
    );
  }
}

export default DroneInfo;
