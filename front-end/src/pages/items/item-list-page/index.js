import React, {useState, useEffect} from "react";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EnhancedTable from '../../../components/Table/index';
import Helmet from 'react-helmet';
import {ITEMS_HEADERS} from '../../../components/Table/DefineHeader';
import {MEMBER_SEARCH} from '../../../components/Table/DefineSearch';
import {GET_ALL_ITEMS_REQ, RESET_ALL_ITEM_REDUX} from '../../../redux/items/constants';
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



const sampleItems = [
  {id: "0123456", item_name: "Devils Amulet", item_owner: "Zhou Yu", status: 0, create_date: "12/10/20201"},
  {id: "0123456", item_name: "Conqueror Sword", item_owner: "Zhou Yu", status: 0, create_date: "12/10/20201"},
];

function mapStateToProps(state) {
  return {
    listItem: state.item.listItems,
    success: state.item.success
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    getAllItemsReq: (payload) => dispatch({ type: GET_ALL_ITEMS_REQ, payload}),
    resetRedux: ()=>dispatch({type:RESET_ALL_ITEM_REDUX})
  }
}


const ItemListPage = (props) => {
  const {success, listItem, getAllItemsReq, resetRedux} = props;

  const history = useHistory();

  useEffect(()=>{
    resetRedux();
    getAllItemsReq();
  },[]);


  const handleDeleteItem = () => {

  }


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
           {success === true ? 
           <EnhancedTable
            rows={listItem}
            headerList = {ITEMS_HEADERS}
            // conditions={MEMBER_SEARCH}
            // setConditions={handleChangeConditions}
            // searchMethod={searchMember}
            handleDefaultDeleteAction={handleDeleteItem}
            type="items"
            load={success}
          />:
          <EnhancedTable
          rows={sampleItems}
          headerList = {ITEMS_HEADERS}
          //conditions={MEMBER_SEARCH}
          load={success}
        />}
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ItemListPage));
