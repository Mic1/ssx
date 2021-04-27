import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as gameActions from '../actions/gameActions';
import GameButtons from '../components/GameButtons'; // eslint-disable-line import/no-named-as-default
import { withStyles } from '@material-ui/core/styles';
import GameStatus from '../components/GameStatus'; // eslint-disable-line import/no-named-as-default
import PlyrGrid from '../components/PlyrGrid'; // eslint-disable-line import/no-named-as-default
import GameBoard from '../components/GameBoard';
import GameClock from '../components/GameClock';
import GameLetters from '../components/GameLetters';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import DragDropContainer from '../containers/DragDropCntnr';

// import { DragDropContext } from 'react-dnd';

//import {timeUp} from "../actions/gameActions";
//import { Grid, Row, Col } from 'react-bootstrap';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  dummy: {
    margin: theme.spacing.unit,
  },
  Paper: {
    margin: '10%',
    width: '100%',
  },
  Grid: {
    alignContent: 'stretch',
    alignItems: 'stretch',
    justify: 'center'
  }
});

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sels: props.sels,
      currLtrRef: null,
      currLtr: '',
      ltrHtml: '',
      //paused: true
    };
    //this.setDsbldByMap = this.setDsbldByMap.bind(this);
    // this.updSel = this.updSel.bind(this);
    this.onComplete = this.onComplete.bind(this);
  }

  componentWillMount() {

  };

  ltrSlctd = (refObj, slctdLtr) => {
    this.setState({currLtrRef: refObj, currLtr: slctdLtr});
  };

  ltrDropped = (gm_row_id) => {
    this.state.currLtrRef.className="ScrabbleBlockDebug";
    const nxt_ltr = this.state.currLtr;
    //var element = document.getElementById('box-table-b').rows[rowNum].cells[cellNum].firstChild;
    //element.innerHTML = this.state.ltrHtml;
    this.setState({currLtrRef: null, currLtr: ''});
    this.props.ltrDrpd(nxt_ltr, gm_row_id);
  };

  onComplete()  {
    this.props.timeUp();
    return;

    // this.setState(function(prevState, props) {
    //   let p = prevState.currPlyr + 1;
    //   if (p > 5){p = 0;}
    //   return {currPlyr: p};
    // });
    // this.setState(function (prevState) {
    //   return {paused: (prevState.currPlyr === 0)};
    // });
    // this.setState(function(prevState) {
    //   return {seconds: (prevState.currPlyr > 0) ? prevState.seconds + 0.0000001 : 0 }
    // });
  }

  render() {

    const { classes, mode, getInitNewGm, hndlNewGm, hndlPlayGm, hndlStopGm, hndlOpenMdl, sendSelChng,
      gmStatus1, gmStatus2, sels, currPlyr, currSlot, currPlyrTyp, currPlyrClr, seconds, paused, gmBrd, plyrSlots} = this.props;

    return (
      <Grid  className={classes.root} container spacing={16}>
        <Grid item xs={5}>
          <GameButtons mode={mode}
             getInitNewGm={getInitNewGm} hndlNewGm={hndlNewGm} hndlPlayGm={hndlPlayGm} hndlStopGm={hndlStopGm} hndlOpenMdl={hndlOpenMdl}/>
        </Grid>
        <Grid item xs={7}>
          <GameStatus gmStatus1={gmStatus1} gmStatus2={gmStatus2}/>
        </Grid>
        <Grid item xs={12}>
          <PlyrGrid mode={mode} sels={sels} currPlyr={currPlyr}  currSlot={currSlot}
            hndlNewGm={hndlNewGm}
            hndlPlayGm={hndlPlayGm}
            hndlStopGm={hndlStopGm}
            hndlOpenMdl={hndlOpenMdl}
            sendSelChng={sendSelChng}
            dsbld={mode != 'new'}
            showPnts={"play,plyover".includes(mode)}
            showPlyrLst={"idle,new".includes(mode)}
            plyrSlots={plyrSlots}
          />
        </Grid>
        <Grid item xs={9} id={'gm-brd'}>
          <GameBoard
            ltrDropped={this.ltrDropped}
            gmBrd={gmBrd}
            mode={mode}
            sels={sels}
            //wrds={wrds}
            //wrds2={wrds2} selLtr={this.sel} sels[currPlyr-1].plyrCol
            currPlyr={currPlyr}
            currPlyrTyp={currPlyrTyp}
            currPlyrClr={(currPlyr===0) ? '#e0e0e0' : currPlyrClr}/>

          <GameLetters  ltrSlctd={this.ltrSlctd} currPlyrTyp={currPlyrTyp}/>
          {/*</GameBoard>*/}
        </Grid>
        <Grid className={classes.root} item xs={3} id={'clock'}>
          <Paper className={classes.Paper}>
            <GameClock
              seconds={seconds}
              paused={paused}
              complete={this.onComplete}/>
            </Paper>
        </Grid>
        <Grid item xs={12} id={'crd-ltrs'}/>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.game.mode,
    gmStatus1: state.game.gmStatus1,
    gmStatus2: state.game.gmStatus2,
    sels: state.game.sels,
    currPlyr: state.game.currPlyr,
    currSlot: state.game.currSlot,
    plyrStatCd: state.game.plyrStatCd,
    currPlyrClr: state.game.currPlyrClr,
    currPlyrTyp: state.game.currPlyrTyp,
    seconds: state.game.gmClock.seconds,
    paused: state.game.gmClock.paused,
    gmBrd: state.game.gmBrd,
    plyrSlots: state.game.plyrSlots,
  };
}

GameContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  getInitNewGm: PropTypes.func.isRequired,
  hndlNewGm: PropTypes.func.isRequired,
  hndlPlayGm: PropTypes.func.isRequired,
  hndlStopGm: PropTypes.func.isRequired,
  hndlOpenMdl: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  gmStatus1: PropTypes.string.isRequired,
  gmStatus2: PropTypes.string.isRequired,
  sels: PropTypes.array.isRequired,
  currPlyr: PropTypes.number.isRequired,
  currSlot: PropTypes.number.isRequired,
  currPlyrClr: PropTypes.string.isRequired,
  currPlyrTyp: PropTypes.string.isRequired,
  seconds: PropTypes.number.isRequired,
  paused: PropTypes.bool.isRequired,
  timeUp: PropTypes.func.isRequired,
  ltrDrpd: PropTypes.func.isRequired,
  gmBrd: PropTypes.array.isRequired,
  plyrSlots: PropTypes.array.isRequired,
  sendSelChng: PropTypes.func.isRequired
};

//export default connect(mapStateToProps, { ...gameActions })(GameContainer);
//@DragDropContext(HTML5Backend)
export default withStyles(styles)(connect(mapStateToProps, { ...gameActions })(GameContainer));
