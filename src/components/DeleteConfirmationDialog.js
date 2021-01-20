import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { firebaseDeleteDive } from '../helpers/FirebaseInterface'
import Grid from '@material-ui/core/Grid';

function DeleteConfirmationDialog(props) {
  const handleClickDelete = () => {
    firebaseDeleteDive(props.dive_id);
    props.handleClickClose();
    props.confirmDeletion();
  }

  return (
    <Dialog open={props.opened} onClose={props.handleClickClose}>
      <DialogTitle id="form-dialog-title">
        Are you sure you want to delete Dive entry?
      </DialogTitle>
      <DialogContent>
        <Grid container justify="center">
          <Grid item>
            <Button onClick={props.handleClickClose}
              color="primary"
              data-testid={'del_confirm_dialog_cancel'} >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleClickDelete}
              color="primary"
              data-testid={'del_confirm_dialog_delete'}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmationDialog;