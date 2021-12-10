import React, {useState, useEffect} from "react";
import Helmet from 'react-helmet';
import Carousel from '../../../components/Carousel';
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles";
import {
    Grid,
    Typography,
    Divider,
    Paper,
    Chip
  } from '@material-ui/core';

const imgData = [
    {id:"01", url: "test"},
    {id:"02", url: "test"},
    {id:"03", url: "test"}
];

const ItemListPage = (props) => {
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
                    <p><strong>Item Name:</strong> Devil Amulet</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Owner:</strong> Zhou Yu</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Current Price:</strong> 15.000 VND</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Highest Bidder:</strong> Lu Bu</p>
                </Grid>
                <Grid item xs={12}>
                    <p><strong>Auction Duration:</strong> 12/10/2021 - 20/10/2022</p>
                </Grid>
                <Grid item xs={12}>
                    <p><strong>Status:</strong> <Chip size="small" mr={1} mb={1} label="In Auction"  /></p>
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