// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import stylesBrd from '../styles/scrabbleboard.css';
import Table, { TableBody, TableCell, TableRow } from '@material-ui/core/Table';

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
    padding: '1px 1px 1px 1px',
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

class GameBoardC2 extends React.Component {

  render() {
    const { gmBrd } = this.props;

    return (
      <Table id={'box-table-b'}>
        <TableBody>
        {(function() {
          const view = [];
          for (let i = 0; i < gmBrd.length; i++) { // wrds2
            view.push(
              <TableRow key={[i]}>
                {(function() {
                  const view2 = [];
                  // for (let j = 0; j < wrds2[i].length; j++) {
                  for (let j = 0; j < 15; j++) {
                    view2.push(
                      <TableCell key={[j]}>
                        <div className={`${(gmBrd[i]['l' + (j+1)] === '') ? 'ScrabbleBlockOff' : 'ScrabbleBlock3'}`}>
                          <span className={`${(gmBrd[i]['l' + (j+1)] === '') ? 'ScrabbleLetter2' : 'ScrabbleLetter'}`}>{gmBrd[i]['l' + (j+1)]}</span>
                          {/*<span className="ScrabblLetter">{wrds['wrd'+(i+1)][j]}</span>*/}
                          {/*/!*<span className="ScrabblLetter">{gmBrd[i][j]}</span>*!/ // {gmBrd[i].l1}*/}
                          <span className="ScrabbleNumber">{ltrPointa[gmBrd[i]['l' + (j+1)]]}</span>
                        </div>
                      </TableCell>
                    );
                  }
                  return view2;
                }())
                }
              </TableRow>
            );
          }
          return view;
        }())
        }
        </TableBody>
      </Table>
    );
  }
}

GameBoardC2.propTypes = {
  gmBrd: PropTypes.array.isRequired
};

export default withStyles(styles)(GameBoardC2);
