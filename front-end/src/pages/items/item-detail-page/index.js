import React, {useState, useEffect} from "react";
import Helmet from 'react-helmet';
import Carousel from '../../../components/Carousel';
import RemoveItemPopup from '../item-remove-popup/index.js';
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import {GET_ITEMS_BY_ID_REQ, RESET_ITEM_ID_REDUX} from '../../../redux/items/constants';
import { green, orange, red, blue } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import styles from "./styles";
import {
    Grid,
    Typography,
    Divider,
    Paper,
    Button,
    Chip as MuiChip
  } from '@material-ui/core';
import { connect } from 'react-redux';

const imgData = [
    {id:"01", url: "test"},
    {id:"02", url: "test"},
    {id:"03", url: "test"}
];

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.is_active && green[500]};
  background: ${props => props.pass && green[500]};
  background: ${props => props.fail && red[500]};
  background: ${props => props.block && orange[500]};
  background: ${props => props.sent && orange[700]};
  color: ${props => (props.is_active || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.pass || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.fail || props.sent) && props.theme.palette.common.white};
  color: ${props => (props.block || props.sent) && props.theme.palette.common.white};
`


function mapStateToProps(state) {
  return {
    itemInfo: state.item.itemInfo,
    success: state.item.byIDsuccess
  };
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    getItemById: (payload) => dispatch({ type: GET_ITEMS_BY_ID_REQ, payload}),
    resetRedux: () => dispatch({ type: RESET_ITEM_ID_REDUX}),
  }
}

const ItemDetailPage = (props) => {
    const [openPopup, setOpenPopup] = useState(false);

    const [itemId, setID] = useState("");
    const {itemInfo, getItemById, resetRedux} = props;

    // const [itemInfo, setItemInfo] = useState(itemData)

    const handleOpenRemovePopup = () => {
      setOpenPopup(true);
    }

    useEffect(()=>{
      let arr = window.location.href.split("/");
      setID(arr[arr.length-1]);
      getItemById(arr[arr.length-1]);
    },[])


    // <-- delete member 
    const {classes} = props;
    return(
      <div>
        <Helmet title="Auction Item Management" />
        <Grid
          justify="space-between"
          container 
        >
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              Item Detail - {itemInfo.item_nm  ? itemInfo.item_nm : ""}
            </Typography>         
          </Grid>
          <Grid item>
          <Button variant="contained" color="secondary" onClick={handleOpenRemovePopup}>Remove Item</Button>
          <RemoveItemPopup isOpen={openPopup} setOpenPopup={setOpenPopup} id={itemId}/>
          </Grid>
        </Grid>
  
        <Divider my={6} />
  
        <Grid container spacing={6}>
          <Grid item xs={5}>
            <Carousel imgList = {imgData}/>
          </Grid>
          <Grid item xs={6}>
            <Grid container className={classes.content}>
                <Grid item xs={6} spacing={2}>
                    <p><strong>Item Name:</strong> {itemInfo.item_nm  ? itemInfo.item_nm : ""}</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Owner:</strong> {itemInfo.owner_nm  ? itemInfo.owner_nm : ""}</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Current Price:</strong> {itemInfo.current_price ? itemInfo.current_price : ""} VND</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Highest Bidder:</strong> {itemInfo.current_bidder_nm ? itemInfo.current_bidder_nm : ""}</p>
                </Grid>
                <Grid item xs={12}>
                    <p><strong>Auction Duration:</strong> {itemInfo.auction_start ? itemInfo.auction_start : ""} - {itemInfo.auction_end ? itemInfo.auction_end : ""}</p>
                </Grid>
                <Grid item xs={12}>
                    <p><strong>Status:</strong> {itemInfo.status && itemInfo.status === "New" && <Chip size="small" mr={1} mb={1} label="New" />}
                    {itemInfo.status && itemInfo.status === "Finish" && <Chip size="small" mr={1} mb={1} label="Finish" pass={1}/>}                
                    {itemInfo.status && itemInfo.status === "In Auction" && <Chip size="small" mr={1} mb={1} label="In Auction" block={1}/>}  
                    {itemInfo.status && itemInfo.status === "Removed" && <Chip size="small" mr={1} mb={1} label="Removed" fail={1}/>}      
                    </p>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Paper variant="outlined" className={classes.description}>
            <Typography variant="h6" gutterBottom >Description</Typography>
            <p>{itemInfo.description ? itemInfo.description : ""}</p>
        </Paper>
      </div>
    );
  }

  export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ItemDetailPage));