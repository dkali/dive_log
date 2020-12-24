import React from 'react';
import { connect } from "react-redux";
import { selectDive } from "../redux/actions";
import 'date-fns';
import format from "date-fns/format";
import fromUnixTime from 'date-fns/fromUnixTime'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import { Check, Pool, Timelapse } from '@material-ui/icons';


const styles = theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
  },
  icons: {
    display: "flex",
    alignItems: "center"
  }
});

class DiveEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectDive(this.props.dive_num);
    this.props.handleEntryClick();
  }

  render() {
    const { entryData, dive_num } = this.props;
    const { classes } = this.props;

    return (
      <ListItem className={classes.root} onClick={this.handleClick}>
        <Paper className={classes.paper}>
          <Box p={1}>
            <Grid container>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs alignItems="center">
                    <Typography gutterBottom variant="subtitle1">
                      {entryData.location.name}
                    </Typography>
                    <Typography variant="body2" className={classes.icons} align="center">
                      <Box p={1}>
                        <Check fontSize="small" />
                      </Box>
                      <span>{dive_num}</span>
                      <Box p={1}>
                        <Pool fontSize="small" />
                      </Box>
                      <span>{entryData.depth}</span>
                      <Box p={1}>
                        <Timelapse fontSize="small" />
                      </Box>
                      <span>{entryData.duration}</span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{format(fromUnixTime(entryData.date.seconds), "MMM dd, yyyy")}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </ListItem>
    )
  }
}

export default connect(
  null,
  { selectDive }
)(withStyles(styles)(DiveEntry));