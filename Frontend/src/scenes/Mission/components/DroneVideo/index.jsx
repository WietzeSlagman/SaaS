import React from 'react';
import './index.css';

class DroneVideo extends React.PureComponent {
  render() {
    const { streamUrl } = this.props;
    return (
      <div className="DroneVideo">
        <video src={streamUrl} />
      </div>
    );
  }
}

export default DroneVideo;
