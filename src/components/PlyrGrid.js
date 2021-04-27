// @flow weak
// creates Plyr units from this.state.sels
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PlyrPanel from '../components/PlyrPanel';

const styles = theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	plyr: {
		height: 140,
		width: 200,
	},
  dummy: {
    padding: theme.spacing.unit * 2,
  },
});

const plyrs = [
	{
		plyrId: 0,
	  value: "N",
		plyr: "none",
		dsbld: false,
		icon: "RemoveIcon",
		plyrIcon: "VisibilityIcon",
		color: "#000000",
	},
	{
    plyrId: 1,
    value: "c",
		plyr: "computer1",
		dsbld: false,
		icon: "ComputerIcon",
		plyrIcon: "VisibilityIcon",
		color: "#dd0022",
	},
  {
    plyrId: 2,
    value: "c1",
    plyr: "computer2",
    dsbld: false,
    icon: "ComputerIcon",
    plyrIcon: "VisibilityIcon",
    color: "#9edd1f",
  },
  {
    plyrId: 3,
    value: "c2",
    plyr: "computer3",
    dsbld: false,
    icon: "ComputerIcon",
    plyrIcon: "VisibilityIcon",
    color: "#dd8282",
  },
  {
    plyrId: 4,
    value: "c3",
    plyr: "computer4",
    dsbld: false,
    icon: "ComputerIcon",
    plyrIcon: "VisibilityIcon",
    color: "#83ddc7",
  },
  {
    plyrId: 5,
    value: "c4",
    plyr: "computer5",
    dsbld: false,
    icon: "ComputerIcon",
    plyrIcon: "VisibilityIcon",
    color: "#306fdd",
  },
	{
    plyrId: 6,
    value: "p1",
		plyr: "player1",
		dsbld: false,
		icon: "FaceIcon",
		plyrIcon: "VisibilityIcon",
		color: "#ffd91c",
	},
	{
    plyrId: 7,
    value: "p2",
		plyr: "player2",
		dsbld: true,
		icon: "FaceIcon",
		color: "#16c18c",
	},
	{
    plyrId: 8,
    value: "p3",
		plyr: "player3",
		dsbld: false,
		icon: "FaceIcon",
		plyrIcon: "VisibilityIcon",
		color: "#0055ff",
	},
	{
    plyrId: 9,
    value: "p4",
		plyr: "player4",
		dsbld: true,
		icon: "FaceIcon",
		plyrIcon: "VisibilityIcon",
		color: "#ff6512",
	},
	{
    plyrId: 10,
    value: "p5",
		plyr: "player5",
		dsbld: false,
		icon: "FaceIcon",
		plyrIcon: "VisibilityIcon",
		color: "#d011ff",
	}
];

class  PlyrGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sels: props.sels};
    this.updSel = this.updSel.bind(this);
    this.setDsbldByMap = this.setDsbldByMap.bind(this);

  }

  componentWillMount() {
    //const { classes } = this.props;
  }



  setDsbldByMap(plyrId) {
    // const obj = this.state.sels.find(function (obj) { return obj.val === plyr && plyr != 'n' && plyr != 'c'; });
    const obj = this.state.sels.find(function (obj) { return obj.plyrId === plyrId && plyrId !== 0; });
    return (obj===undefined) ? false : true;
    //return false;
  }

  updSel(val, id) {
    // child FormControls call this after their own update state on change
    // update parent sel list with child selected value
    const plyrCol = plyrs.find(function (obj) { return obj.plyrId === val;}).color;
    this.setState({sels: this.state.sels.map(
        (el) => el.id === id ? Object.assign({}, el,
          {
            plyrId: val,
            val: val,
            plyr: val,
            plyrCol: plyrCol,
          }) : el
      )
    });

    // send message " player selection change "
    this.props.sendSelChng(id, val, plyrCol);
    //sendSelChng(id, val, plyrCol);

  }

	// ocToggle = (event) => {
	// 	this.setState({ mode: (this.state.mode==='initgame')?'startgame':'initgame' });
    //
    //
	// };

	render() {
		const { classes, mode, currPlyr, currSlot, showPnts, showPlyrLst, plyrSlots } = this.props;
		//const shwPnts = "getset,play".includes(this.props.downState);
		return (
			<div>
				{/*<Button className={classes.button} onClick={this.ocToggle}>*/}
					{/*Toggle*/}
				{/*</Button>*/}
				<Grid container justify="center" alignContent={'stretch'}>
					{this.state.sels.map(value => (
						<Grid key={value.id} item>
							<div className={classes.plyr} id={'P' + (value.id)}>
								<PlyrPanel
									superGmSt = "new"
									id={value.id}
									plyrs={plyrs}
									plyrCol={value.plyrCol}
									setDsbld={this.setDsbldByMap}
									updSel={this.updSel}
									mode={mode}
									dsbld={this.props.dsbld}
									showPnts={showPnts}
									showPlyrLst={showPlyrLst}
                  currPlyr={currPlyr}
                  currSlot={currSlot}
                  plyrSlots={plyrSlots}
								/>
							</div>
						</Grid>
					))}
				</Grid>

			</div>

		);
	}
}

PlyrGrid.propTypes = {
	classes: PropTypes.object.isRequired,
	mode: PropTypes.string.isRequired,
  sels: PropTypes.array.isRequired,
  currPlyr:PropTypes.number.isRequired,
  currSlot:PropTypes.number.isRequired,
  sendSelChng: PropTypes.func.isRequired,
  dsbld: PropTypes.bool.isRequired,
  showPnts: PropTypes.bool.isRequired,
  showPlyrLst: PropTypes.bool.isRequired,
  plyrSlots: PropTypes.array.isRequired

};

export default withStyles(styles)(PlyrGrid);

