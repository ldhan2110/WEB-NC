import React, {useState, useEffect} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {ITEMS_HEADERS} from '../../../components/Table/DefineHeader';
import {MEMBER_SEARCH} from '../../../components/Table/DefineSearch';
// import {ADD_USERS_TO_PROJECT_REQ, GET_ALL_USERS_REQ, GET_ALL_USERS_OF_PROJECT_REQ, DELETE_USER_OF_PROJECT_REQ, RESET_DELETE_USER_OF_PROJECT} from '../../../redux/users/constants';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Divider,
  Button,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog
} from '@material-ui/core';

import {
  Add as AddIcon,
} from "@material-ui/icons";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";
// const NavLink = React.forwardRef((props, ref) => (
//   <RouterNavLink innerRef={ref} {...props} />
// ));


const sampleItems = [
  {id: "0123456", item_name: "Devils Amulet", item_owner: "Zhou Yu", status: 0, create_date: "12/10/20201"},
  {id: "0123456", item_name: "Conqueror Sword", item_owner: "Zhou Yu", status: 0, create_date: "12/10/20201"},
];

// function mapStateToProps(state) {
//   return {
//     user: state.user,
//     listUsers: state.user.listUsers,
//     listUsersOfProject: state.user.listUsersOfProject,
//     project: state.project.currentSelectedProject,
//     insDeleteMember: state.user.insDeleteMember,
//     role: state.project.currentRole,
//   };
// }

// //MAP DISPATCH ACTIONS TO PROPS - REDUX
// const mapDispatchToProps = dispatch => {
//   return {
//     addUserToProjectReq: (payload) => dispatch({ type: ADD_USERS_TO_PROJECT_REQ, payload }),
//     getAllUserReq: (payload) => dispatch({ type: GET_ALL_USERS_REQ, payload}),
//     getAllUserOfProjectReq: (payload) => dispatch({ type: GET_ALL_USERS_OF_PROJECT_REQ, payload}),
//     displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
//     deleteUserOfProject: (payload) => dispatch({ type: DELETE_USER_OF_PROJECT_REQ, payload }),
//     resetDelUserOfProjectRedux: () => dispatch({ type: RESET_DELETE_USER_OF_PROJECT})
//   }
// }


const ItemListPage = (props) => {
 
  const [products, setProducts]=useState([]);

  useEffect(()=>{
    axios.get("https://localhost:8000/bidder/products")
    .then(function (res){
      const listItems=[];
      for (var data of res.data){
        const item={};
        item.id=data._id;
        item.item_name=data.item_name;
        item.item_owner=data.item_owner;
        item.status=data.active ? 1:0;
        item.create_date=data.create_date;
        listItems.push(item);
      }
      setProducts(listItems);
    })
    .catch(function(err){
      console.log(err);
    });
  });

  // <-- delete member 
  return(
    <div>
      <Helmet title="Auction Item Management" />
      <Grid
        justify="space-between"
        container 
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h3" gutterBottom display="inline">
              Auction Item Management
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item>
          {/* {(role === 'Project Manager' || role === 'Test Lead') &&
                <Dialog open={open} >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>Are you sure you want to remove this user from project?</DialogContent>
                  <DialogActions>
            <Button onClick={handleDelMember} color="primary">Yes </Button>
                    <Button onClick={handleCloseDelMember} color="primary">No</Button>
                  </DialogActions>
                </Dialog>}

                {(role === 'Tester') &&
                <Dialog open={open} >
                  <DialogTitle>Remove member</DialogTitle>
                  <DialogContent>Do not allow Tester role !</DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDelMember} color="primary">OK</Button>
                  </DialogActions>
                </Dialog>}

                 */}
            </Grid>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
           {/* Load bar
           {user.success === true ? 
           <EnhancedTable
            rows={listMember}
            headerList = {MEMBERS_HEADERS}
            viewAction={handleOpenChangeRole}
            conditions={MEMBER_SEARCH}
            setConditions={handleChangeConditions}
            searchMethod={searchMember}
            handleDefaultDeleteAction={deleteMember}
            type='member'
            load={user.success}
          />: */}
          <EnhancedTable
          rows={products}
          headerList = {ITEMS_HEADERS}
          //conditions={MEMBER_SEARCH}
          load={true}
        />
        </Grid>
      </Grid>
    </div>
  );
}
// connect(mapStateToProps,mapDispatchToProps)
export default (withStyles(styles)(ItemListPage));
