import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';


// import { DragDropContextProvider } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import GameBoard from '../components/GameBoard';
import GameLetters from '../components/GameLetters';

class DragDropCntnr extends Component {
  render() {
    const { mode, sels, currPlyr, currPlyrClr, gmBrd} = this.props;
    return (
      <Grid item xs={9} id={'gm-brd'}>
        <GameBoard
          gmBrd={gmBrd}
          mode={mode}
          sels={sels}
          //wrds={wrds}
          //wrds2={wrds2}
          currPlyr={currPlyr}
          currPlyrClr={(this.props.currPlyr===0) ? '#e0e0e0' : currPlyrClr}/>
        <GameLetters/>
      </Grid>
    );
  }
}

DragDropCntnr.propTypes = {
  mode: PropTypes.string.isRequired,
  sels: PropTypes.array.isRequired,
  currPlyr: PropTypes.number.isRequired,
  currPlyrClr: PropTypes.string.isRequired,
  gmBrd: PropTypes.array.isRequired,
};

export default DragDropCntnr;
