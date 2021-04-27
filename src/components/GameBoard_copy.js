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

class GameBoard_copy extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Table id={'box-table-b'}>
        <TableBody>
        {(function() {
          const view = [];
          for (let i = 0; i < 5; i++) {
            view.push(
              <TableRow key={[i]}>
                {(function() {
                  const view2 = [];
                  for (let j = 0; j < 15; j++) {
                    view2.push(
                      <TableCell key={[j]}>
                        <div className={classes.ScrabbleBlock3}>
                          <span className="ScrabblLetter" />
                          <span className="ScrabbleNumber" />
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

GameBoard_copy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameBoard_copy);
