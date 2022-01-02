import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";
import {ADD_NEW_TESTPLAN_REQ, GET_ALL_TESTPLAN_REQ, RESET_ADD_NEW_TESTPLAN} from '../../../redux/test-plan/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {GET_ALL_BUILD_ACTIVE_REQ } from '../../../redux/build-release/constants';
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent ,
  DialogContentText ,
  DialogTitle ,
  TextField,
  Button
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


const NewCategoryPopup = (props) => {

  const {isOpen, setOpenPopup, type} = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpenPopup(false);
  };

  useEffect(()=>{
    setOpen(isOpen);

    axios.post("https://localhost:8000/admin/category/add",{})
    .then(function (res){

    })
    .catch(function(err){
      console.log(err);
    });

  },[isOpen])

    
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{type == "Insert" ? "Add New Category" : "Update Category"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Category Name"
          type="text"
          variant="outlined"
          fullWidth
        />
         <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Category Parent"
          type="text"
          variant="outlined"
          fullWidth
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
    );
  }
  
  // connect(mapStateToProps,mapDispatchToProps)
  export default (withStyles(styles)(NewCategoryPopup));
  