import React from 'react';
import { connect } from "react-redux";
import { selectDive } from "../redux/actions";
import 'date-fns';
import format from "date-fns/format";
import fromUnixTime from 'date-fns/fromUnixTime'

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

    const entry_style = {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "50px",
      background: "#495361",
      borderRadius: "12px",
      marginBottom: "10px",
    }

    const dive_num_style = {
      width: "20%",
      fontSize: "x-large",
      color: "white",
      marginTop: "auto",
      marginBottom: "auto",
      marginLeft: "1em",
    }

    const dive_date_style = {
      width: "30%",
      color: "white",
      marginTop: "auto",
      marginBottom: "auto",
    }

    const dive_site_style = {
      width: "50%",
      color: "white",
      marginTop: "auto",
      marginBottom: "auto",
    }

    return (
      <div data-testid={"dive_entry"} style={entry_style} onClick={this.handleClick}>
        <div data-testid={"dive_entry_number"} style={dive_num_style}>
          {dive_num}
        </div>
        <div data-testid={"dive_entry_date"} style={dive_date_style}>
          {format(fromUnixTime(entryData.date.seconds), "MMM dd, yyyy")}
        </div>
        <div data-testid={"dive_entry_site"} style={dive_site_style}>
          {entryData.location.name}
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { selectDive }
)(DiveEntry);