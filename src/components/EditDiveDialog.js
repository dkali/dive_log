import React from 'react';
import EditDiveUI from './EditDiveUI.js';
import 'date-fns';
import format from "date-fns/format";
import { connect } from "react-redux";
import { editDive } from "../redux/actions";
import { getCurrentDiveData } from "../redux/selectors";
import { Redirect } from 'react-router';

class EditDiveDialog extends React.Component {
  constructor(props) {
    super(props);
    
    // local dive data is used to edit dive before commit is made
    this.state = {
      dive_data: props.initial_dialog_data,
    };

    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDepthChange = this.handleDepthChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }

  handleDateChange(date) {
    // TODO: handle users manual input, when date is invalid
    const updated_data = { ...this.state.dive_data, ...{date: format(date, "MMM dd, yyyy")} };
    this.setState({dive_data: updated_data })
  }

  handleSiteChange(event) {
    const updated_data = { ...this.state.dive_data, ...{site: event.target.value} };
    this.setState({dive_data: updated_data})
  }

  handleDepthChange(event) {
    const updated_data = { ...this.state.dive_data, ...{depth: event.target.value} };
    this.setState({dive_data: updated_data})
  }

  handleDurationChange(event) {
    const updated_data = { ...this.state.dive_data, ...{duration: event.target.value} };
    this.setState({dive_data: updated_data})
  }

  handleClickSave = () => {
    this.props.editDive(this.props.initial_dialog_data.dive_num, this.state.dive_data);
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
      <EditDiveUI title = "Edit dive"
                  dive_data = {this.state.dive_data}
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

function mapStateToProps(state, ownProps) {
  const initial_dialog_data = getCurrentDiveData(state);
  return { initial_dialog_data }
}

export default connect(
  mapStateToProps,
  { editDive }
)(EditDiveDialog);