import React from 'react';
import './index.css';

class DronesOverview extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <div className="DronesOverview">
        <div className="DronesOverview-header">Ecosystem</div>
        {items.map((item) => (
          <div
            key={item.action}
            className={`DronesItem DronesItem-${item.action.toLowerCase()}`}
          >
            <span className="DronesItem-count">{item.drones.length}</span>
            <span className="DronesItem-type">{item.action}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default DronesOverview;
