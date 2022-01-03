import React, {useState, useEffect} from "react";
import Helmet from 'react-helmet';
import Carousel from '../../../components/Carousel';
import RemoveItemPopup from '../item-remove-popup/index.js';
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles";
import axios from "axios";
import {
    Grid,
    Typography,
    Divider,
    Paper,
    Button,
    Chip
  } from '@material-ui/core';

const imgData = [
    {id:"01", url: "test"},
    {id:"02", url: "test"},
    {id:"03", url: "test"}
];

const ItemListPage = (props) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [detail,setDetails]=useState({
      name:"",
      owner:"",
      current_price: 0,
      highest_bidder: "",
      auction_duration: "",
      status:""
    });

    const handleOpenRemovePopup = () => {
      setOpenPopup(true);
    }

    useEffect(()=>{
      axios.get("http://localhost:8000/products/")
      .then(function (res){
        const product={};
        product.name=res.data.item_nm;
        product.owner=res.data.owner_nm;
        product.current_price=res.data.current_price;
        product.highest_bidder=res.data.current_bidder_nm;
        product.auction_duration=res.data.auction_start+" - "+res.data.auction_end;
        product.status=res.data.active? "In Auction":"Sold";
        setDetails(detail);
      }).catch(function (err){
        console.log(err);
      });
    },[]);

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
              Item Detail - Devil Amulet
            </Typography>         
          </Grid>
          <Grid item>
          <Button variant="contained" color="secondary" onClick={handleOpenRemovePopup}>Remove Item</Button>
          <RemoveItemPopup isOpen={openPopup} setOpenPopup={setOpenPopup}/>
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
                    <p><strong>Item Name:</strong> {detail.name}</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Owner:</strong> {detail.owner}</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Current Price:</strong> {detail.current_price} VND</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Highest Bidder:</strong> {detail.highest_bidder}</p>
                </Grid>
                <Grid item xs={12}>
                    <p><strong>Auction Duration:</strong> {detail.auction_duration}</p>
                </Grid>
                <Grid item xs={12}>
                    <p><strong>Status:</strong> <Chip size="small" mr={1} mb={1} label={detail.status}  /></p>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Paper variant="outlined" className={classes.description}>
            <Typography variant="h6" gutterBottom >Description</Typography>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </Paper>
      </div>
    );
  }
  // connect(mapStateToProps,mapDispatchToProps)
  export default (withStyles(styles)(ItemListPage));