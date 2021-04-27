import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Select from "@material-ui/core/Select";
import FaceIcon from '@material-ui/icons/Face';
import ComputerIcon from '@material-ui/icons/DesktopWindows';
import RemoveIcon from '@material-ui/icons/Remove';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PlayProgressPulse from '../components/PlayProgressPulse';

const styles = theme => ({
  textFieldFormLabel: {
    fontSize: 14,
    color: 'black',
    fontStyle: 'bold'
  },
  // inputLabel: {
  //   fontSize: 12,
  //   color: 'orange',
  //   fontStyle: 'bold'
  // },
  input: {
    fontSize: 16,
    color: 'blue',
    fontStyle: 'bold'
  },
  points: {
    fontSize: 16,
    color: 'black'
  },
  formHelperText: {
    fontSize: 16,
    color: 'black',
    fontStyle: 'bold'
  },
  formSelect: {
    fontSize: 14,
    color: 'black',
    fontStyle: 'bold'
  },
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		minHeight: 60,
		backgroundColor: '#FFFFFF'
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	},
	select: {
		height: 60,
	},
	inpt: {
		height: 40,
	},
	menuItem: {
		height: 40,
    fontSize: 16
	},
	selectMenu: {
		height: 45,
	},
	playProgress: {
		width: '100%',
		height: '30%',
	},
	paperBorder: {
		borderStyle: 'solid',
		borderColor: '#e0e0e0',
		borderWidth: 10,
	},
	inputLabel: {
    fontSize: 16
  },
  grid: {
    // background:'-webkit-gradient(linear, 100% 100%, 0% 5%, from(#000000), to(#ffffff))'
  },
});

class PlyrPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plyr: "",
      plyrId: 0,
      name: "",
      type: 'TestFormControl',
      id: this.props.id,
      hid: 0,
      mode: this.props.mode,
      plyrNm: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.itemClick = this.itemClick.bind(this);
  }

  componentWillMount() {

  }

	handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });
    this.setState({ plyrId: event.target.value });
		this.props.updSel(event.target.value, this.state.id );
		const debug1 = this.props.plyrs.find(function(el) {return el.plyrId === event.target.value;} ).plyr;
    console.log('DEBUG1: ', debug1);
    this.setState({ plyrNm: debug1 });

  }

  itemClick(event)  {
    console.log('itemClick: ', event);

  };

	setPlyrInfo() {
		return (
			function PlyrIcon() {
				return <VisibilityIcon/>;
			}
		);
	}

	PlyrIcon() {
		return <VisibilityIcon/>;
	}

	render() {
		const { classes, plyrSlots, currSlot } = this.props;
		const s1 = 'NS'; // 'I' and 'C' should turn slot off
// eslint-disable-next-line no-empty-pattern
		const MaterialIcon = ({ icon, icnColr}, {}) => {
			switch (icon) {
				case 'RemoveIcon': return <RemoveIcon style={{ fill: icnColr }} />;
				case 'ComputerIcon': return <ComputerIcon style={{ fill: icnColr }} />;
				//case 'FaceIcon': return <{${icon}} style={{ fill: icnColr }} className={classes.icon3} />
				case 'FaceIcon': return <FaceIcon style={{ fill: icnColr }} />;
				default: return null;
			}
		};

		// state.sels supplies data to config gui
		return (
			<Paper className={classes.paperBorder} style={{borderColor:this.props.plyrCol}}>
			<FormGroup>
				<Hidden smUp={this.props.showPlyrLst !== true}>
					<FormControl disabled={this.props.dsbld}
							className={classes.formControl}>
							<InputLabel className={classes.inputLabel} htmlFor="age-simple">Select Player</InputLabel>
							<Select className={classes.select}
											value={this.state.plyrId}
											onChange={this.handleChange}
											inputProps={{
												name: "plyr",
												id: "plyr-info",
											}}
							>
								{this.props.plyrs.map(option => (
									<MenuItem  onClick={this.itemClick} disabled={this.props.setDsbld(option.plyrId)} key={option.plyrId} value={option.plyrId}>
										{/*{option.age}*/}
										{<div className="Inpt"><span><MaterialIcon icon={option.icon} icnColr={option.color} /></span> ... <span style={{height:'35px', fontSize: '16px'}}>{option.plyr}</span></div>}
									</MenuItem>
								))}
							</Select>
					</FormControl>
				</Hidden>
				<Hidden smUp={this.props.showPnts !== true}>
					<Grid container className={`${(s1.includes(plyrSlots[this.props.id - 1].plyr_stat_cd)) ? 'slot-on' : 'slot-off'}`} spacing={8}>
						<Grid item xs={12} sm={12}>
              <PlayProgressPulse variant={'determinate'} progOn={(this.props.id === currSlot)} progCol={this.props.plyrCol}/>
						</Grid>
						<Grid item xs={8} sm={8}>
							<Paper className={classes.paper}>
								<TextField
									value={this.state.plyrNm}/>
							</Paper>
						</Grid>
						<Grid container item xs={4} sm={4} justify={'center'} alignItems={'center'}>
							<Paper className={classes.paper} >
									{this.PlyrIcon()}
							</Paper>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Paper className={classes.paper}/>
							<TextField
                label={"points"}
                className={classes.points}
								helperText={plyrSlots[this.props.id - 1].last_mv}
								value={plyrSlots[this.props.id - 1].points}
                InputLabelProps={{
                className: classes.points,
              }}
              FormHelperTextProps={{
                className: classes.formHelperText,
              }}
              SelectProps={{
                className: classes.formSelect,
              }}
              InputProps={{
              className: classes.input
              }}
              />
							{/*</TextField>*/}
						</Grid>
					</Grid>
				</Hidden>
			</FormGroup>
			</Paper>
		);
	}
}

PlyrPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  showPnts: PropTypes.bool,
  setDsbld: PropTypes.func,
  showPlyrLst: PropTypes.bool,
  dsbld: PropTypes.bool.isRequired,
  plyrs: PropTypes.array.isRequired,
  plyrCol: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  currPlyr: PropTypes.number.isRequired,
  currSlot: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  updSel: PropTypes.func.isRequired,
  plyrSlots: PropTypes.array.isRequired,

};

export default withStyles(styles)(PlyrPanel);

{/*<MenuItem key={option.value} value={option.value} disabled={this.setDisabled(option.value)}>*/}
	{/*<div className={classes.testH} ><span><MaterialIcon icon={option.icon} icnColr={option.color} /></span><span>{option.label}</span></div>*/}
{/*</MenuItem>*/}
