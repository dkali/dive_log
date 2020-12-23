import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import format from "date-fns/format";
import fromUnixTime from 'date-fns/fromUnixTime'
import { connect } from "react-redux";
import { getCurrentDiveData } from "../redux/selectors";
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
import DeleteConfirmationDialog from './DeleteConfirmationDialog.js';
import globe_icon from '../icons/globe-4-512.png';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HeightOutlinedIcon from '@material-ui/icons/HeightOutlined';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';

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
const globe_icon_style = {
  height: "170px",
  width: "170px",
  display: "block",
  paddingLeft: "1em",
  paddingBottom: "1em",
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
const separator_style = {
  paddingRight: "1em",
}

class DiveInfoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      del_confirmation_opened: false,
    }
  }

  clickMapBurron = () => {
    this.props.handleClickCloseDialog();
    this.props.handleTabChange(null, 1);
  }

  handleDeleteClick = () => {
    this.setState({ del_confirmation_opened: true })
  }

  handleClickCloseDelConfirmationDialog = () => {
    this.setState({ del_confirmation_opened: false })
    this.props.handleClickCloseDialog();
  }

  render() {
    var open = this.props.opened;

    return (
      <div>
        {open &&
          <Dialog open={open} onClose={this.props.handleClickCloseDialog}>
            <DialogTitle id="form-dialog-title" style={dialog_header_style}>
              <div style={flex_header_style}>
                {this.props.dive_data.location.name}
                <div style={jend}>
                  <NavLink to="/edit_dive">
                    <IconButton data-testid={"edit_icon"} size="small">
                      <EditIcon fontSize="large"
                        color="primary" />
                    </IconButton>
                  </NavLink>
                  <IconButton data-testid={"delete_icon"} onClick={this.handleDeleteClick} size="small">
                    <DeleteForeverIcon fontSize="large"
                      color="primary" />
                  </IconButton>
                </div>
              </div>
            </DialogTitle>
            <DialogContent style={dialog_body_style}>
              <div style={flex_column_style}>
                <div style={flex_row_style}>
                  <HeightOutlinedIcon />
                  <div data-testid="info_dialog_depth"
                    style={separator_style}>{this.props.dive_data.depth} m</div>
                  <TimerOutlinedIcon />
                  <div data-testid="info_dialog_duration"
                    style={separator_style}>{this.props.dive_data.duration} min</div>
                  <div data-testid="info_dialog_date" >{format(fromUnixTime(this.props.dive_data.date.seconds), "MMM dd, yyyy")}</div>
                </div>

                <div style={flex_row_style}>
                  <IconButton data-testid={"globe_icon"} onClick={this.clickMapBurron}>
                    <img style={globe_icon_style}
                      src={globe_icon}
                      alt="globe" />
                  </IconButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
        {this.state.del_confirmation_opened &&
          <DeleteConfirmationDialog data-testid={'delete_confirmation'}
            opened={this.state.del_confirmation_opened}
            handleClickCloseDelConfirmationDialog={this.handleClickCloseDelConfirmationDialog}
            dive_id={this.props.dive_data.dive_id} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  let dive_data = getCurrentDiveData(state)
  if (dive_data === undefined) {
    dive_data = {}
  }
  return { dive_data };
}

export default connect(
  mapStateToProps
)(DiveInfoDialog);