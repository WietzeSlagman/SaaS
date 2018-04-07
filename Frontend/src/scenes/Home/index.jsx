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
            <Category name="Planetary Observation" img_src="https://media.giphy.com/media/7vAfO2V6hD4ZoYvvZ3/giphy.gif" img_alt=""/>
            <Category name="Building" img_src="https://media.giphy.com/media/OqFILVTtyMnsndIWh6/giphy.gif" img_alt=""/>
            <a href="/mission"><Category name="Search & Rescue" img_src="https://media.giphy.com/media/1Ago3fCisrbEz49fkS/giphy.gif" img_alt=""/></a>
            <Category name="Wildlife Protection" img_src="https://media.giphy.com/media/1j9lIbzgW1aT0TxoQW/giphy.gif" img_alt=""/>
        </CategorySelector>
      </div>
    );
  }
}

export default Home;
