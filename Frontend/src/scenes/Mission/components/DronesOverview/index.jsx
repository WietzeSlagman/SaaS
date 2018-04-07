import React from 'react';
import './index.css';

class DronesOverview extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <div className="DronesOverview">
        <div className="DronesOverview-header">Drones</div>
        {items.map((item) => (
          <div
            key={item.id}
            className="DroneItem"
          >
            <span className="DroneItem-battery">{item.battery}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default DronesOverview;
