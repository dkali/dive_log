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
import { Check, Height, Timelapse } from '@material-ui/icons';

const styles = theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
  }
});

class DiveEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectDive(this.props.dive_num);
  }

  render() {
    const { entryData, dive_num } = this.props;
    const { classes } = this.props;

    return (
      <ListItem className={classes.root} onClick={this.handleClick}>
        <Paper className={classes.paper}>
          <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
            <Grid container>
              <Grid item xs container direction="column" spacing={2}>
                <Typography variant="subtitle1" gutterBottom>
                  {entryData.location.name}
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item xs={2} container direction="row" alignItems="center">
                    <Box p={1}>
                      <Check fontSize="small" />
                    </Box>
                    <Typography variant="body2" gutterBottom>
                      {dive_num}
                    </Typography>
                  </Grid>

                  <Grid item xs={2} container direction="row" alignItems="center">
                    <Box p={1}>
                      <Height fontSize="small" />
                    </Box>
                    <Typography variant="body2" gutterBottom>
                      {entryData.depth}
                    </Typography>
                  </Grid>

                  <Grid item xs={2} container direction="row" alignItems="center">
                    <Box p={1}>
                      <Timelapse fontSize="small" />
                    </Box>
                    <Typography variant="body2" gutterBottom>
                      {entryData.duration}
                    </Typography>
                  </Grid>

                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{format(fromUnixTime(entryData.date.seconds), "MMM dd, yyyy")}</Typography>
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