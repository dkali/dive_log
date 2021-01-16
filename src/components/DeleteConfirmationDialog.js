import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { firebaseDeleteDive } from '../helpers/FirebaseInterface'

const flex_row_style = {
}

const flex_header_style = {
}

const dialog_header_style = {
}

const dialog_body_style = {
}

class DeleteConfirmationDialog extends React.Component {
  handleClickDelete = () => {
    firebaseDeleteDive(this.props.dive_id);
    this.props.handleClickClose();
    this.props.confirmDeletion();
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
            <Button onClick={this.props.handleClickClose}
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

export default DeleteConfirmationDialog;