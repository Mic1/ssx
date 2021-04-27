// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
//import GameIcon from 'material-ui-icons/Subtitles';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		backgroundColor: '#2196f3',
		// color: 'white',
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	btnDsbld: {
		backgroundColor: '#eee',
	},
});



class GameBtnPnl extends React.Component {

	ocButton() {
		return;
		//this.setState({dummy: 100}); // debug
		//this.props.btnClick(id);
	}

	render() {
		const { classes } = this.props;

		return (
			<Paper>
				<Button
					fab id={"newgame"}
					disabled={this.props.gmSt != 'ready'}
					color="primary" className={classes.button}
					onClick={(e) => this.ocButton(e.currentTarget.id, e)}>
					New Game
				</Button>

				<Button
					fab id={"play"}
					disabled={this.props.gmSt != 'newgame'}
					color="primary" className={classes.button}
					onClick={(e) => this.ocButton(e.currentTarget.id, e)}>
					Play
				</Button>
				<Button
					fab id={"stopgame"}
					disabled={this.props.gmSt != 'play'}
					color="primary" className={classes.button}
					onClick={(e) => this.ocButton(e.currentTarget.id, e)}>
					Stop Game
				</Button>
			</Paper>
		);
	}
}

GameBtnPnl.propTypes = {
	classes: PropTypes.object.isRequired,
	clr: PropTypes.string.isRequired,
	dsbld: PropTypes.bool.isRequired,
	Icn: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	onClickFunction: PropTypes.func.isRequired,
	gmSt: PropTypes.string.isRequired,
};

export default withStyles(styles)(GameBtnPnl);
