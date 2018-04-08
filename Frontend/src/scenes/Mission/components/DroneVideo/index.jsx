import React from 'react';
import './index.css';
import Webcam from 'react-webcam'

class DroneVideo extends React.PureComponent {
  render() {
    const { streamUrl } = this.props;
    return (
      <div className="">
        <Webcam className="DroneVideo"/>
        {/*<video src={streamUrl} />*/}
      </div>
    );
  }
}

export default DroneVideo;
