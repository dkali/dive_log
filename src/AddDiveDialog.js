import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import 'date-fns';
import format from "date-fns/format";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

const flex_row_style = {
  display: "flex",
  flexDirection: "row",
  paddingTop: "1em",
}

const flex_column_style = {
  display: "flex",
  flexDirection: "column",
}

const offset_style = {
  paddingLeft: "4em",
}

const location_style = {
  width: "60%",
  marginTop: "1em",
}

const dialog_header_style = {
  backgroundColor: "#5A6478",
  color: "white",
}

const dialog_body_style = {
  backgroundColor: "#495361",
  color: "white",
}

class AddDiveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      site: "",
      depth: 0,
      duration: 0,
    };

    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDepthChange = this.handleDepthChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }

  handleDateChange = date => {
    this.setState({date: date})
  }

  handleSiteChange(event) {
    this.setState({site: event.target.value})
  }

  handleDepthChange(event) {
    this.setState({depth: event.target.value})
  }

  handleDurationChange(event) {
    this.setState({duration: event.target.value})
  }

  handleClickSave = () => {
    this.props.handleSaveClick({
                                  date: format(this.state.date, "MM.dd.yyyy"),
                                  site: this.state.site,
                                  depth: this.state.depth,
                                  duration: this.state.duration,
                                  lat: 56.340,
                                  lon: 43.977
                                })
    this.props.handleClickClose();
  }

  render() {
    var open  = this.props.opened;
    return (
      <Dialog open={open} onClose={this.props.handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={dialog_header_style}>Add Dive location</DialogTitle>
        <DialogContent style={dialog_body_style}>
          <div style={flex_column_style}>
            <div style={flex_row_style}>
              <TextField
                autoFocus
                margin="dense"
                id="dive_site"
                label="Dive Site"
                fullWidth
                value={this.state.site}
                onChange={this.handleSiteChange}
                />
            </div>
            <div style={flex_row_style}>
              <Input
                id="depth"
                endAdornment={<InputAdornment position="end">meters</InputAdornment>}
                value={this.state.depth}
                onChange={this.handleDepthChange}
              />
              <div style={offset_style}>
                <Input
                id="duration"
                endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                value={this.state.duration}
                onChange={this.handleDurationChange}
                />
              </div>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={this.state.date}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <Fab variant="extended" color="primary" style={location_style}>
              <NavigationIcon/>
              Set Location
            </Fab>
          </div>
        </DialogContent>
        <DialogActions style={dialog_body_style}>
          <Button onClick={this.props.handleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClickSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddDiveDialog;