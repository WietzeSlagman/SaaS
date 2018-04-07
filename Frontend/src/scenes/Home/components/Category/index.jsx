import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const propTypes = {
  name: PropTypes.string.isRequired,
};

class Category extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div className="Category grow">
        <div className="Category-title">{name}</div>
      </div>
    );
  }
}

export default Category;
