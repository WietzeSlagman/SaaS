import React from 'react';
import CircularProgressBar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './index.css';

class DroneInfo extends React.PureComponent {
  render() {
    const { id, action, currentBattery } = this.props;
    console.log(this.props);
    return (
      <div className="DroneInfo">
        <div className="DroneInfo-inner">
          <div className="DroneInfo-inner-left">
            <CircularProgressBar percentage={currentBattery} />
          </div>
          <div>
            <div className="DroneInfo-header">{action} Drone</div>
            <div className="DroneInfo-id">{id}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DroneInfo;
