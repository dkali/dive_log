import React from 'react';
import EditDiveUI from './EditDiveUI.js';
import 'date-fns';
import format from "date-fns/format";
import { connect } from "react-redux";
import { addDive } from "../redux/actions";
import { Redirect } from 'react-router';

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

  handleClickSave = () => {
    this.props.addDive(this.state);
    this.handleClickClose();
    // TODO reject empty input
  }

  handleClickClose = () => {
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <EditDiveUI title = "Add new dive"
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