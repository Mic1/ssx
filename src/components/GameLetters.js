// @flow weak
import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

//import Letter from '../components/Letter';

//import dtoVctn from '../js/dtoVctn';


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
    height: 43,
    width: 51,
    padding: 4
  },
  test9: {
    borderTopColor: 'red',
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

class GameLetters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    ltrSel: null,
    };

  }

  componentWillMount() {
  }

  handleClick = (event) => {
    if(this.props.currPlyrTyp === 'P'){
      if(this.state.ltrSel !== null) {
        this.state.ltrSel.className="ScrabbleBlock2hl";
      }
      event.target.offsetParent.className="ScrabbleBlockSel";
      this.setState({ ltrSel: event.target.offsetParent });
      this.props.ltrSlctd(event.target.offsetParent,
        event.target.offsetParent.childNodes[0].childNodes[0].innerText);
    }
  };



  render() {
    const { classes, currPlyrTyp } = this.props;
    // const test1 = 1;
    return (
      <Table id={'box-table-ltrs'}  onClick={event => this.handleClick(event)} >
        <TableBody>
          {(function() {
            const view = [];
            for (let i = 0; i < 2; i++) {
              view.push(
                <TableRow key={[i]}>
                  {(function() {
                    const view2 = [];
                    for (let j = 0; j < 13; j++) {
                      let a = String.fromCharCode(65 + (i * 13) + j);
                      view2.push(
                        <TableCell key={[j]} className={classes.tablecell} >
                          <div className={(currPlyrTyp==='P')?"ScrabbleBlock2on":"ScrabbleBlock2"}>
                            <span className="ScrabbleLetter">{a}</span>
                            <span className="ScrabbleNumber">{ltrPointa[a]}</span>
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

GameLetters.propTypes = {
  classes: PropTypes.object.isRequired,
  currPlyrTyp: PropTypes.string.isRequired,
  ltrSlctd: PropTypes.func.isRequired,
};

export default withStyles(styles)(GameLetters);

