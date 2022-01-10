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
  //const {insCategory, addCategory, displayMsg, getAllCategories, resetAddRedux} = props;

  const [open, setOpen] = React.useState(false);

  const [values,setValues]= React.useState({
    name: "",
    parent: ""
  });

  const [categories,setCategories]=React.useState([]);

  const [error,setError]=React.useState({
    name:"ss",
    parent:"ss"
  });

  const [checkError,setCheckError]=React.useState(false);

  const handleChange = (prop) => (event) => {
    
    setValues({ ...values, [prop]: event.target.value });

    if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleAdd = function() {
    console.log(values);
    setCheckError(true);
    if (values.name==="")
      setError({...values, name:""});

    if (values.name!==""){
      if (values.parent!=="") {
        console.log(categories);
        const found=categories.find(category => category.name===values.parent);
        console.log("Found is",found);
        if (found!==undefined){
          setError({});
          addCategory(values);
          setValues({name: "",parent:""});
          setOpenPopup(false);
        } else {
          console.log("What");
        }
      } else {
        values.parent=null;
        setError({});
        addCategory(values);
        setValues({name:""});
        setOpenPopup(false);
      }
    }

  };

  function addCategory(data){
    console.log("ADDING");
    axios.post("http://localhost:8000/admin/category/add",data)
    .then(function (res){
      console.log(res);
    })
    .catch(function (err){
      console.log(err);
    });
  }

  useEffect(()=>{
    setOpen(isOpen);

    axios.get("http://localhost:8000/admin/categories")
    .then(function (res){
      setCategories(res.data);
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
          value={values.name}
          onChange={handleChange("name")}
          fullWidth
          
        />
         <TextField
          
          margin="dense"
          id="name"
          label="Category Parent"
          type="text"
          variant="outlined"
          value={values.parent}
          onChange={handleChange("parent")}
          fullWidth
          
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
    );
  }
  
  // connect(mapStateToProps,mapDispatchToProps)
  export default (withStyles(styles)(NewCategoryPopup));
  