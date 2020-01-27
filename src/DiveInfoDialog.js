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
    height: "70px",
    width: "70px",
    display: "block",
    paddingLeft: "1em",
    paddingBottom: "1em",
}

class DiveInfoDialog extends React.Component {
  render() {
    var open  = this.props.opened;
    return (
      <Dialog open={open} onClose={this.props.handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dive Info</DialogTitle>
        <DialogContent>
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