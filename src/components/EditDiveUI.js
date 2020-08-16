import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { NavLink } from 'react-router-dom';

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

const add_dive_style = {
  marginLeft: "1em",
  marginRight: "1em",
}

class EditDiveUI extends React.Component {
  render() {
    return (
      <div>
        <div style={dialog_header_style}>
          <h1>{this.props.title}</h1>
        </div>

        <div style={add_dive_style}>
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
            <NavLink to="/select_location">
              <Fab variant="extended" color="primary" style={location_style}>
                <NavigationIcon/>
                Set Location
              </Fab>
            </NavLink>
          </div>

          <div>
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
          </div>
        </div>
      </div>
    )
  }
}

export default EditDiveUI;