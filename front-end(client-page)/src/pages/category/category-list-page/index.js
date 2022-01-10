import React, { useEffect, useState } from "react";
import styles from "./styles";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import NewCategoryPopup from '../new-category-popup/index';
import { connect } from 'react-redux';
import { green, orange, red, blue } from "@material-ui/core/colors";
import {
  Grid,
  Typography,
  Divider,
  Paper as MuiPaper,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,  
  IconButton 
} from '@material-ui/core';

import { TreeItem, TreeView  } from '@material-ui/lab';

import {
  Add as AddIcon,  
  Delete as DeleteIcon 
} from "@material-ui/icons";

import {Edit} from "react-feather";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import axios from "axios";

const Paper = styled(MuiPaper)(spacing);

// //MAP STATES TO PROPS - REDUX
// function mapStateToProps(state) {
//   return {
//     testplan: state.testplan,
//     listTestplan: state.testplan.listTestplan,
//     project: state.project.currentSelectedProject,
//     role: state.project.currentRole,
//     insTestplanDelete: state.testplan.insTestplanDelete
//   };
// }

// //MAP DISPATCH ACTIONS TO PROPS - REDUX
// const mapDispatchToProps = dispatch => {
//   return {
//     // addNewTestplanReq: (payload) => dispatch({ type: ADD_NEW_TESTPLAN_REQ, payload }),
//     // getAllTestplanReq: (payload) => dispatch({ type: GET_ALL_TESTPLAN_REQ, payload}),
//     // displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
//     // deleteTestplanReq: (payload) => dispatch({ type: DELETE_TESTPLAN_REQ, payload }),
//     // resetDeleteRedux: () => dispatch({type: RESET_DELETE_TESTPLAN})
//   }
// }


const CategoryManagementPage = (props) => {

  const [openPopup, setOpenPopup] = React.useState(false);
  const [typePopup, setTypePopup] = React.useState(null);

  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [tree,setTree]=React.useState([]);

  //delete TP dialog
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const handleOpenAdd = (event) => {
    setTypePopup("Insert");
    setOpenPopup(true);
  }

  const handleOpenUpdate = (event) => {
    setTypePopup("Update");
    setOpenPopup(true);
  }
 
  useEffect(()=>{
    axios.get("http://localhost:8000/admin/categories")
    .then(function(res){
      setTree(res.data);
    }).catch(function (err){
      console.log(err);
    });
  },[!openPopup]);


  const renderTree = (nodes) => {    
    return (
    <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  )};

  const handleNodes = (nodes) => {    
    const tmp=[];
    for (var node of nodes){
      if (node.parent==null){
        tmp.push({
          id: node._id,
          name: node.name,
          children:[]
        });
      } else {
        tmp.forEach(function iter(a){
          if (a.name===node.parent)
            a.children.push({
              id: node._id,
              name: node.name,
              children:[]
            });
          Array.isArray(a.children) && a.children.forEach(iter);
        });
      }
    }
    return tmp;
  };

  const render = function (tree){
    //console.log("Tree:",tree);
    const tmp=handleNodes(tree);
    //console.log(tmp);
    const data=[];
    for (var td of tmp){
      data.push(
        ( <TreeView
            aria-label="controlled"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            multiSelect
          >
    
            {renderTree(td)}
          
        </TreeView>
        )
      )
    }
    return data;
  }

  return(
    <div>

      <Helmet title="Category Management" />
      <Grid
        justify="space-between"
        container 
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Category Management
          </Typography>

        </Grid>
        <Grid item>
          <div>
            <IconButton aria-label="add" onClick={handleOpenAdd}>
              <AddIcon />
            </IconButton>
            <IconButton aria-label="update" onClick={handleOpenUpdate}>
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" >
              <DeleteIcon  style={{color: red[500]}}/>
            </IconButton>
          </div>
          {/* Delete TP dialog */}
          <Grid item>
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure want to delete this testplan?</DialogContent>
                  <DialogActions>
                    <Button  color="primary">Yes</Button>
                    <Button  color="primary">No</Button>
                  </DialogActions>
                </Dialog>
          </Grid>
          <Grid item>
            <NewCategoryPopup isOpen={openPopup} setOpenPopup={setOpenPopup} type={typePopup}/>
          </Grid>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
        <Paper elevation={3}>

          {render(tree)}
        
      </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

//connect(mapStateToProps,mapDispatchToProps)
export default (withStyles(styles)(CategoryManagementPage));