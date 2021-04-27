import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core/Progress';
// import {PulseLoader} from 'halogenium';


const styles = () => ({
	root: {
		width: '100%',
		marginTop: 0,
	},
	progress: {
		margin: 0,
	},
});

function PlayProgress(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
      {/*<PulseLoader loading={props.progOn} color={props.progCol} size={'18px'}/>*/}
      <LinearProgress className={classes.progress} color="secondary" mode="determinate"
			/>
		</div>
	);
}

PlayProgress.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayProgress);

