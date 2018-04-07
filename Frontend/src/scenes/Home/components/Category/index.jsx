import React from 'react';
import PropTypes from 'prop-types';
import './index.css';



const propTypes = {
  name: PropTypes.string.isRequired,
  img_src: PropTypes.string.isRequired,
  alt_src: PropTypes.string.isRequired,
};

class Category extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div className="Category grow">
        <div className="Overlay" onclick="off()"></div>
        <img src={this.props.img_src} alt={this.props.img_alt} className="Gifs"/>
        <div className="Category-title">{name}</div>
      </div>
    );
  }
}

export default Category;
