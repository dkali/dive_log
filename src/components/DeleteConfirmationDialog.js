import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { deleteDive } from "../redux/actions";
import firebase from 'firebase';

const flex_row_style = {
  display: "flex",
  flexDirection: "row",
  paddingTop: "1em",
}

const flex_header_style = {
  display: "flex",
  flexDirection: "row",
}

const dialog_header_style = {
  backgroundColor: "#5A6478",
  color: "white",
}

const dialog_body_style = {
  backgroundColor: "#495361",
  color: "white",
}

class DeleteConfirmationDialog extends React.Component {
  handleClickDelete = () => {
    var db = firebase.firestore();

    let vld = this;
    db.collection("dives").doc(this.props.dive_id).delete().then(function() {
      console.log("Dive successfully deleted!");
      vld.props.handleClickCloseDelConfirmationDialog();
      vld.props.deleteDive();
    }).catch(function(error) {
      console.error("Error removing dive: ", error);
    });    
  }

  render() {
    var open = this.props.opened;

    return (
      <Dialog open={open} onClose={this.props.handleClickClose}>
        <DialogTitle id="form-dialog-title" style={dialog_header_style}>
          <div style={flex_header_style}>
            Are you sure you want to delete Dive data?
          </div>
        </DialogTitle>
        <DialogContent style={dialog_body_style}>
          <div style={flex_row_style}>
            <Button onClick={this.props.handleClickCloseDelConfirmationDialog}
                color="primary"
                data-testid={'del_confirm_dialog_cancel'} >
              Cancel
            </Button>
            <Button onClick={this.handleClickDelete}
                    color="primary"
                    data-testid={'del_confirm_dialog_delete'}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default connect(
  null,
  { deleteDive }
)(DeleteConfirmationDialog);