import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {DELETE_ITEM_REQ, RESET_DELETE_ITEM_REDUX} from '../../../redux/items/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent ,
  DialogContentText ,
  DialogTitle ,
  TextField,
  Divider,
  Button,
} from '@material-ui/core';

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
      success: state.item.delSuccess
  }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    deleteItemReq: (payload) => dispatch({ type: DELETE_ITEM_REQ, payload }),
    resetRedux: () => dispatch({type: RESET_DELETE_ITEM_REDUX}) 
  }
}


const RemoveItemPopup = (props) => {
  const {success, deleteItemReq, resetRedux} = props;

  const {isOpen, setOpenPopup, type, id} = props;

  const [open, setOpen] = React.useState(isOpen);

  const history = useHistory();

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleRemove = () => {
    deleteItemReq(id);
  }

  useEffect(()=>{
    setOpen(isOpen);
  },[isOpen])
    
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" 
      fullWidth={true}
      maxWidth='sm'>
      <DialogTitle id="form-dialog-title">Remove Auction Item</DialogTitle>
      <Divider/>
      <DialogContent>
        <DialogContentText>
            Please fill in reason why this item is removed. This will be sent to the customer
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Reason"
          type="text"
          variant="outlined"
          multiline
          rows={4}
          maxRows={4}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRemove} color="primary">
          SUBMIT
        </Button>
        <Button onClick={handleClose} color="red">
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
    );
  }
  

  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(RemoveItemPopup));
  