import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {PulseLoader} from 'halogenium';


const styles = () => ({
	root: {
		width: '100%',
		marginTop: 0,
	},
	progress: {
		margin: 0,
	},
});

function PlayProgressPulse(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
      <PulseLoader loading={props.progOn} color={props.progCol} size={'18px'}/>
		</div>
	);
}

PlayProgressPulse.propTypes = {
	classes: PropTypes.object.isRequired,
  progOn: PropTypes.bool.isRequired,
  progCol: PropTypes.string.isRequired
};

export default withStyles(styles)(PlayProgressPulse);

