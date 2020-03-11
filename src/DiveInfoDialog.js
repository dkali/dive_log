import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';

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
  height: "5vh",
  width: "5vh",
  display: "block",
  paddingLeft: "1em",
  paddingBottom: "1em",
}

const dialog_header_style = {
  backgroundColor: "#5A6478",
  color: "white",
  // borderRadius: "12px 12px 0px 0px",
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
  render() {
    var open  = this.props.opened;
    return (
      <Dialog open={open} onClose={this.props.handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={dialog_header_style}>
          <div style={flex_header_style}>
            Dive Info
            <div style={jend}>
              <img style={header_icon}
                src={require("./icons/sharethis-5-512.png")}
                alt="share"/>
              <img style={header_icon}
                src={require("./icons/edit-512.png")}
                alt="edit"/>
              <img style={header_icon}
                src={require("./icons/delete-512.png")}
                alt="delete"/>
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={dialog_body_style}>
          <div style={flex_column_style}>
            <div style={flex_row_style}>
              <div id="dive_num">Dive #{this.props.diveData.dive_num}</div>
              <div id="dive_date" style={offset_style}>{this.props.diveData.date}</div>
            </div>
            <div id="dive_site" style={{...flex_row_style, ...text_center_style}}>
              <h3>{this.props.diveData.site}</h3>
            </div>
            <div style={flex_row_style}>
              <div style={flex_column_style}>
                <div id="dive_depth">Depth: {this.props.diveData.depth} meters</div>
                <div id="dive_duration">Duration: {this.props.diveData.duration} minutes</div>
              </div>
              <img style={globe_icon}
                   src={require("./icons/globe-4-512.png")}
                   alt="globe"/>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default DiveInfoDialog;