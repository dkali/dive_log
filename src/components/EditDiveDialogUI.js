import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
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

class EditDiveDialogUI extends React.Component {
  render() {
    return (
      <Dialog open={this.props.opened} onClose={this.props.handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={dialog_header_style}>{this.props.title}</DialogTitle>
        <DialogContent style={dialog_body_style}>
          <div style={flex_column_style}>
            <div style={flex_row_style}>
              <TextField
                autoFocus
                margin="dense"
                inputProps={{ 'data-testid': 'edit_dialog_site' }}
                label="Dive Site"
                fullWidth
                value={this.props.dive_data.site}
                onChange={this.props.handleSiteChange}
                />
            </div>
            <div style={flex_row_style}>
              <Input
                inputProps={{ 'data-testid': 'edit_dialog_depth' }}
                endAdornment={<InputAdornment position="end">meters</InputAdornment>}
                value={this.props.dive_data.depth}
                onChange={this.props.handleDepthChange}
              />
              <div style={offset_style}>
                <Input
                  inputProps={{ 'data-testid': 'edit_dialog_duration' }}
                  endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                  value={this.props.dive_data.duration}
                  onChange={this.props.handleDurationChange}
                />
              </div>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MMM dd, yyyy"
                margin="normal"
                inputProps={{ 'data-testid': 'edit_dialog_date-picker-inline' }}
                label="Date picker inline"
                value={this.props.dive_data.date}
                onChange={this.props.handleDateChange}
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
          <Button onClick={this.props.handleClickClose}
                  color="primary"
                  data-testid={'edit_dialog_close'} >
            Cancel
          </Button>
          <Button onClick={this.props.handleClickSave}
                  color="primary"
                  data-testid={'edit_dialog_save'}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default EditDiveDialogUI;