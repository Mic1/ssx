import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

export class GameButtons extends Component {

  handleGameButtons(e) {
    e.preventDefault();
    const btnMode = e.currentTarget.id;
    this.props.hndlGmBtns(btnMode);
  }

  render() {
    const { mode } = this.props;
    return (
      <div className="card">
        <div className="card-action">
          <Button id={"new"} disabled={mode!="idle"}  onClick={e => this.handleGameButtons(e)}>Init Game</Button>
          <Button id={"play"} disabled={mode!="new"} onClick={(e) => this.handleGameButtons(e)}>Start Game</Button>
          <Button id={"stop"} disabled={mode!="new"} onClick={(e) =>  this.handleGameButtons(e)}>Stop Game</Button>
        </div>
      </div>
    );

  }
}

GameButtons.propTypes = {
  hndlGmBtns: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired

};

export default GameButtons;
