import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {ADD_NEW_TESTPLAN_REQ, GET_ALL_TESTPLAN_REQ, RESET_ADD_NEW_TESTPLAN} from '../../../redux/test-plan/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {GET_ALL_BUILD_ACTIVE_REQ } from '../../../redux/build-release/constants';
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

// //MAP STATES TO PROPS - REDUX
// const  mapStateToProps = (state) => {
//   return { insTestplan: state.testplan.insTestplan, 
//            project:state.project.currentSelectedProject,
//            listBuilds: state.build.listBuilds }
// }

// //MAP DISPATCH ACTIONS TO PROPS - REDUX
// const mapDispatchToProps = dispatch => {
//   return {
//     addNewTestplanReq: (payload) => dispatch({ type: ADD_NEW_TESTPLAN_REQ, payload }),
//     getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
//     displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
//     getAllBuildActiveReq: (payload) => dispatch({ type: GET_ALL_BUILD_ACTIVE_REQ, payload }),
//     resetAddRedux: () => dispatch({type: RESET_ADD_NEW_TESTPLAN}) 
//   }
// }


const RemoveItemPopup = (props) => {

  const {isOpen, setOpenPopup, type} = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpenPopup(false);
  };

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
        <Button onClick={handleClose} color="primary">
          SUBMIT
        </Button>
        <Button onClick={handleClose} color="red">
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
    );
  }
  
  // connect(mapStateToProps,mapDispatchToProps)
  export default (withStyles(styles)(RemoveItemPopup));
  