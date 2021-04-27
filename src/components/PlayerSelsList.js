import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerSelDisplay from './PlayerSelDisplay'; // eslint-disable-line import/no-named-as-default
import { makeGetPlayerSels } from '../selectors/playerSelSelectors';

export class PlayerSelsList extends Component {

  componentWillMount() {
  }

  render() {
    const { playerSels } = this.props;
    return (
      <div>
        {playerSels.map((playerSel) => {
          return (<PlayerSelDisplay  key={playerSel.plyr_typ} {...playerSel} />);
        })}
      </div>
    );
  }
}


const makeMapStateToProps = () => {
  const getPlayerSels = makeGetPlayerSels();
  const mapStateToProps = (state) => {
    const playerSels = getPlayerSels(state); // PROBLEM!!!


    return {
      playerSels
    };
  };
  return mapStateToProps;
};

PlayerSelsList.propTypes = {
  playerSels: PropTypes.array.isRequired
};

export default connect(makeMapStateToProps )(PlayerSelsList);
