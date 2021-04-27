import React from 'react';
import PropTypes from 'prop-types';
import ReactCountdownClock from 'react-countdown-clock';
// import {withStyles} from "material-ui/styles/index";

class GameClock extends React.Component {

	render () {
		const { paused, seconds, complete } = this.props;
		return (
			<ReactCountdownClock
				seconds={seconds}
				color="#4b5b7e"
				alpha={0.9}
				size={200}
				onComplete={complete}
				paused={paused}

			/>
		);
	}
}

GameClock.propTypes = {
/*
	classes: PropTypes.object.isRequired,
*/
  seconds: PropTypes.number.isRequired,
  paused: PropTypes.bool.isRequired,
  complete: PropTypes.func.isRequired
};

export default (GameClock); //withStyles(styles)
