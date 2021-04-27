import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import {Button} from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    width: '100%',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#2196f3',
    color: 'white',
    fontSize: 16
  },
  btnDsbld: {
    backgroundColor: '#eee',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  circularProgress: {
    opacity: 0.0,
  },
});

export class GameButtons extends Component {

  notUsedFunc(e) {
    e.preventDefault();
    return;
    // const btnMode = e.currentTarget.id;
    // this.props.hndlGmBtns(btnMode);
  }

  render() {
    const { mode, classes, getInitNewGm, hndlPlayGm, hndlStopGm, hndlOpenMdl } = this.props;
    return (
      <div className="card">
        <div>
          <Fab id={"new"} color="primary" className={classes.button} disabled={("idle,plyover".includes(mode))!==true} onClick={() => getInitNewGm()}>New Game</Fab>
          <Fab id={"play"} color="primary" className={classes.button} disabled={mode!="new"} onClick={() => hndlPlayGm()}>Start Game</Fab>
          <Fab id={"stop"} color="primary" className={classes.button} disabled={mode!="play"} onClick={() =>  hndlStopGm()}>Stop Game</Fab>
          <Fab id={"openmdl"} color="secondary" className={classes.button} disabled={false} onClick={() =>  hndlOpenMdl()}>OpenModal</Fab>
        </div>
      </div>
    );
//         <button onClick={() => handleRemoveFromCart(id)}>Remove from Cart</button>

  }
}

GameButtons.propTypes = {
  //hndlGmBtns: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  getInitNewGm: PropTypes.func.isRequired,
  // hndlNewGm: PropTypes.func.isRequired,
  hndlPlayGm: PropTypes.func.isRequired,
  hndlStopGm: PropTypes.func.isRequired,
  hndlOpenMdl: PropTypes.func.isRequired,


};

//export default GameButtons;
export default withStyles(styles)(GameButtons);
