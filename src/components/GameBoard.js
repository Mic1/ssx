// @flow weak
import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
//import { withStyles } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
// import stylesBrd from '../styles/scrabbleboard.css';
// import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

// import classes from './comp-css/gameboard.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  tablecell: {
    // padding: '1px 1px 1px 1px',
    borderBottom: '4px solid #ffff00',
  },
  tablecell2: {
    padding: '5px 5px 5px 5px',
    borderBottomColor: 'red',
  },
  tablerow: {

  },
  ScrabbleBlock3: {
    visibility: 'hidden',
    padding: '0px, 0px, 0px, 0px',
  },
});

const ltrPointa = {
  A: 1,
  B: 3,
  C: 3,
  D: 4,
  E: 1,
  F: 4,
  G: 3,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

class GameBoard extends React.Component {

  constructor(props) {
    super(props);
    //this.colorLtr = this.colorLtr.bind(this);
    this.cellRef = React.createRef();
    this.state = {
      hovRow: -1,
    };
  }


  componentWillMount() {

  }

  handleClick = (event, plyrStatCd) => {
    if(this.props.currPlyrTyp === 'P'){
      if(plyrStatCd==='C'){
        return;
      }

      event.target.parentElement.parentElement.children.className="ScrabbleBlockSel";
      const gm_row_id = this.state.hovRow + 1;
      this.setState({ hovRow: -1 });
      // event.target.offsetParent.ref = this.cellRef;
      this.props.ltrDropped(gm_row_id, event.target.offsetParent);
        // event.target.parentElement.parentElement.rowIndex,
        // event.target.offsetParent.cellIndex);
      // if(this.state.ltrSel !== null) {
      //   this.state.ltrSel.className="ScrabbleBlock2";
      // }
    }
  };

  handleLtr = (ltr) => {
    return ltr;
  };

  handleHover = (event) => {
    if(this.props.currPlyrTyp === 'P'){
      if(event.target.nodeName==='DIV') {
        this.setState({ hovRow: event.target.parentNode.parentElement.rowIndex});
      }
      // if(this.state.ltrSel !== null) {
      //   this.state.ltrSel.className="ScrabbleBlock2";onMouseOver={event => this.handleHover(event)}
      // } onClick={event => console.log('click: ', event.target.nodeName)}
      // className={classes.table}
    }
  };

  render() {
    const { classes, gmBrd } = this.props;
    return (
      <Table className={classes.gameboard}  id={'box-table-b'} >
        <TableBody>
          {(() => {
            const view = [];
            let psc = '';
            for (let i = 0; i < gmBrd.length; i++) { // gmBrd[i].ltr_json[j][3] wrds2  sels[(gmBrd[i].ltr_json[j][1])-1].plyrCol
              psc = gmBrd[i].plyr_stat_cd;
              view.push(
                <TableRow key={[i]} onClick={event => this.handleClick(event, gmBrd[i].plyr_stat_cd)}
                          onMouseOver={event => this.handleHover(event)} ref={this.cellRef}>
                  {((() => {
                    const view2 = [];
                    const rwWrdLen = gmBrd[i].row_wrd.length;
                    const swCol = gmBrd[i].sub_wrd_clr;
                    for (let j = 0; j < 15; j++) {
                      const cellLtr  = (rwWrdLen > j) ? gmBrd[i].ltr_json[j][0] : '';
                      // if(i===0){
                      //   // rwWrdLen = 0, j = 0, (rwWrdLen > j) NOT TRUE!!!
                      // }
                      // (psc==='i')?this.handleLtr(cellLtr):cellLtr
                      const cellLtrCol = (rwWrdLen > j) ? gmBrd[i].ltr_json[j][3] : 'blue';
                      view2.push(
                        <TableCell key={[j]} style={{borderBottomColor:(this.state.hovRow===i&&gmBrd[i].is_lst_wrd !== 1)?'#FC5185':'#d8d8d8'}}>
                          {/*<div className={`${(cellLtr === 'A') ? 'ScrabbleBlockOff' : 'ScrabbleBlock3'}`}>*/}
                          <div
                            className={`${(gmBrd[i].is_lst_wrd === 1) ? 'ScrabbleBlockOff' : 'ScrabbleBlock3'}`}
                            // style={{borderBottom:(psc=== 'S' && j < rwWrdLen )?'4px solid ' + currPlyrClr:'1px solid #d8d8d8'}}
                            style={{borderBottom:(psc=== 'S' && j < rwWrdLen )?'4px solid ' + swCol:'1px solid #d8d8d8'}}
                          >
                            <span className={`${(cellLtr === '9') ? 'ScrabbleLetter2' : 'ScrabbleLetter'}`} style={{color:cellLtrCol}} >{(psc==='I'&&cellLtr!='')?this.handleLtr(cellLtr):cellLtr}</span>
                            <span className="ScrabbleNumber" style={{color:cellLtrCol}}>{ltrPointa[cellLtr]}</span>

                          </div>
                        </TableCell>
                      );
                    }
                    return view2;
                  })())
                  }
                </TableRow>
              );
            }
            return view;
          })()}

        </TableBody>
      </Table>
    );
  }
}

GameBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  gmBrd: PropTypes.array.isRequired,
  sels: PropTypes.array.isRequired,
  currPlyrTyp: PropTypes.string. isRequired,
  currPlyrClr: PropTypes.string.isRequired,
  // ltrDropped: PropTypes.function.isRequired,
  ltrDropped: PropTypes.func.isRequired,


};

export default withStyles(styles)(GameBoard);
