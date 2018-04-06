import React from 'react';
import PropTypes from 'prop-types';
import Intro from './components/Intro';
import CategorySelector from './components/CategorySelector';
import Category from './components/Category';

class Home extends React.Component {
  render() {
    return (
      <div>
        {/*<Intro />*/}
        <CategorySelector>
          <Category name="Wildlife Protection" />
          <Category name="Building" />
          <Category name="Search & Rescue" />
          <Category name="Planetary Observation " />
        </CategorySelector>
      </div>
    );
  }
}

export default Home;
