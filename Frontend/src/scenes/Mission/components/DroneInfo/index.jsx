import React from 'react';
import CircularProgressBar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './index.css';
import DroneVideo from '../DroneVideo';

class DroneInfo extends React.PureComponent {
  render() {
    const { id, type, percentage } = this.props;
    return (
      <div className="DroneInfo">
        <div className="DroneInfo-inner">
          <div className="DroneInfo-inner-left">
            <CircularProgressBar percentage={percentage} />
          </div>
          <div>
            <div className="DroneInfo-header">{type} Drone</div>
            <div className="DroneInfo-id">{id}</div>
            <DroneVideo />
          </div>
        </div>
      </div>
    );
  }
}

export default DroneInfo;
