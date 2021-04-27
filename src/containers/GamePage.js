//     <Route path="/game" component={GamePage}/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import {getOpenMdl} from '../selectors/gameSelectors';

// import PlayerSelsList from '../components/PlayerSelsList'; // eslint-disable-line import/no-named-as-default
import * as gameActions from '../actions/gameActions';
import GameContainer from '../containers/GameContainer';
import Modal from '../components/UI/Modal/Modal';
import Aux from '../hoc/_Aux';
// import DragDropCntnr2 from '../components/DragDropCntnr2'; // eslint-disable-line import/no-named-as-default


export class GamePage extends Component {

  componentWillMount() {
    const { getPlayerSels  } = this.props;
    getPlayerSels();
    //getRndmLtr();
  }

  render() {
    return (
      <Aux id={'debug1'}>
        <Modal show={false} zval={500} modalClosed={() => {console.log('modalClosed')}}>THE MODAL123</Modal>
        <div className="container" style={{padding:'0px'}}>
          <GameContainer/>
          {/*<Button bsStyle="success">Start Game</Button>*/}
          {/*<Button bsStyle="primary">End Game</Button>*/}

          {/*<PlayerSelsList />*/}

        </div>
      </Aux>
    );
  }
}

GamePage.propTypes = {
  getPlayerSels: PropTypes.func.isRequired,
  getCmptrMv: PropTypes.func.isRequired
};

export default connect(null, { ...gameActions })(GamePage);
