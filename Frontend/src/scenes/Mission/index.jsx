import React from 'react';
import MissionMap from './components/MissionMap';
import './index.css';

class Mission extends React.Component {
  render() {
    return (
      <div className="Mission">
        <MissionMap
          isMarkerShown={true}
          onMarkerClick={() => {}}
        />
      </div>
    );
  }
}

export default Mission;
