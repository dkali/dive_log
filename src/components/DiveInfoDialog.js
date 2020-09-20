import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import format from "date-fns/format";
import fromUnixTime from 'date-fns/fromUnixTime'
import { connect } from "react-redux";
import { getCurrentDiveData, getCurrentDiveID } from "../redux/selectors";
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';

const flex_row_style = {
  display: "flex",
  flexDirection: "row",
  paddingTop: "1em",
}

const flex_header_style = {
  display: "flex",
  flexDirection: "row",
}

const flex_column_style = {
  display: "flex",
  flexDirection: "column",
}

const offset_style = {
  paddingLeft: "4em",
}

const text_center_style = {
  marginLeft: "auto",
  marginRight: "auto",
}

const globe_icon = {
    height: "170px",
    width: "170px",
    display: "block",
    paddingLeft: "1em",
    paddingBottom: "1em",
}

const header_icon = {
  height: "2em",
  width: "2em",
  display: "block",
}

const dialog_header_style = {
  backgroundColor: "#5A6478",
  color: "white",
}

const dialog_body_style = {
  backgroundColor: "#495361",
  color: "white",
}

const jend = {
  display: "flex",
  flexDirection: "row",
  marginRight: "0px",
  marginLeft: "auto",
}

class DiveInfoDialog extends React.Component {
  clickMapBurron = () => {
    this.props.handleClickClose();
    this.props.handleTabChange(null, 1);
  }

  render() {
    var open = this.props.opened;

    return (
      <div>
        {open &&
          <Dialog open={open} onClose={this.props.handleClickClose}>
            <DialogTitle id="form-dialog-title" style={dialog_header_style}>
              <div style={flex_header_style}>
                Dive Info
                <div style={jend}>
                  <IconButton data-testid={"share_icon"} size="small">
                    <img style={header_icon}
                      src={require("../icons/sharethis-5-512.png")}
                      alt="share"/>
                  </IconButton>
                  <NavLink to="/edit_dive">
                    <IconButton data-testid={"edit_icon"} size="small">
                      <img style={header_icon}
                        src={require("../icons/edit-512.png")}
                        alt="edit"/>
                    </IconButton>
                  </NavLink>
                  <IconButton data-testid={"delete_icon"} onClick={this.props.handleDeleteClick} size="small">
                    <img style={header_icon}
                      src={require("../icons/delete-512.png")}
                      alt="delete"/>
                  </IconButton>
                </div>
              </div>
            </DialogTitle>
            <DialogContent style={dialog_body_style}>
              <div style={flex_column_style}>
                <div style={flex_row_style}>
                  <div data-testid="info_dialog_num">Dive #{this.props.dive_num}</div>
                  <div data-testid="info_dialog_date" style={offset_style}>{format(fromUnixTime(this.props.dive_data.date.seconds), "MMM dd, yyyy")}</div>
                </div>
                <div data-testid="info_dialog_site" style={{...flex_row_style, ...text_center_style}}>
                  <h3>{this.props.dive_data.location.name}</h3>
                </div>
                <div style={flex_row_style}>
                  <div style={flex_column_style}>
                    <div data-testid="info_dialog_depth">Depth: {this.props.dive_data.depth} meters</div>
                    <div data-testid="info_dialog_duration">Duration: {this.props.dive_data.duration} minutes</div>
                  </div>
                  <IconButton data-testid={"globe_icon"} onClick={this.clickMapBurron}>
                    <img style={globe_icon}
                      src={require("../icons/globe-4-512.png")}
                      alt="globe"/>
                  </IconButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  let dive_data = getCurrentDiveData(state)
  let dive_num = getCurrentDiveID(state);
  if (dive_data === undefined)
  {
    dive_data = {}
  }
  return { dive_data, dive_num };
}

export default connect(
  mapStateToProps
)(DiveInfoDialog);