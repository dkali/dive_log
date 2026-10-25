import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Grid } from '@mui/material';
import { firebaseDeleteDive } from '../helpers/FirebaseInterface';

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
        <Grid container sx={{ justifyContent: 'center' }}>
          <Grid>
            <Button onClick={props.handleClickClose}
              color="primary"
              data-testid={'del_confirm_dialog_cancel'} >
              Cancel
            </Button>
          </Grid>
          <Grid>
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