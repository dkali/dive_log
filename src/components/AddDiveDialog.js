import React from 'react';
import EditDiveDialogUI from './EditDiveDialogUI.js';
import 'date-fns';
import format from "date-fns/format";
import { connect } from "react-redux";
import { addDive } from "../redux/actions";

class AddDiveDialog extends React.Component {
  constructor(props) {
    super(props);
    const d = new Date(Date.now());
    
    this.state = {
      date: format(d, "MMM dd, yyyy"),
      site: '',
      depth: 0,
      duration: 0,
    };

    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDepthChange = this.handleDepthChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }

  handleDateChange = date => {
    // TDOD: handle users manual input, when date is invalid
    this.setState({date: format(date, "MMM dd, yyyy")})
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

  clear_state_values = () => {
    const d = new Date(Date.now());
    this.setState({
      date: format(d, "MMM dd, yyyy"),
      site: "",
      depth: 0,
      duration: 0,
    });
  }

  handleClickSave = () => {
    this.props.addDive(this.state);
    this.handleClickClose();
    // TODO reject empty input
  }

  handleClickClose = () => {
    this.clear_state_values();
    this.props.handleClickClose();
  }

  render() {
    return (
      <EditDiveDialogUI opened = {this.props.opened}
                        onClose = {this.props.handleClickClose}
                        title = "Add new dive"
                        dive_data = {this.state}
                        handleSiteChange = {this.handleSiteChange}
                        handleDateChange = {this.handleDateChange}
                        handleDepthChange = {this.handleDepthChange}
                        handleDurationChange = {this.handleDurationChange}
                        handleClickSave = {this.handleClickSave}
                        handleClickClose = {this.handleClickClose}
                        />
    )
  }
}

export default connect(
  null,
  { addDive }
)(AddDiveDialog);