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

class AddDiveDialog extends React.Component {
  state = {
    date: new Date()
  }

  handleDateChange = date => {
    this.setState({date: date})
  }

  render() {
    var open  = this.props.opened;
    return (
      <Dialog open={open} onClose={this.props.handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Dive location</DialogTitle>
        <DialogContent>
          <div style={flex_column_style}>
            <div style={flex_row_style}>
              <TextField
                autoFocus
                margin="dense"
                id="dive_site"
                label="Dive Site"
                fullWidth
                />
            </div>
            <div style={flex_row_style}>
              <Input
                id="depth"
                // onChange={handleChange('weight')}
                endAdornment={<InputAdornment position="end">meters</InputAdornment>}
              />
              <div style={offset_style}>
                <Input
                id="duration"
                // onChange={handleChange('weight')}
                endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
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
        <DialogActions>
          <Button onClick={this.props.handleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleClickClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddDiveDialog;