import React from "react";
import styles from './styles';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import CloudinaryImg from '../../../components/CloudinaryImg';
import {
    Chip, Paper,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    CardActionArea,
    CardMedia
  } from "@material-ui/core";
import { SELECT_PROJECT } from "../../../redux/projects/constants";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

  const MAX_LENGTH = 200;

  const IDEAL_LENGTH = 80;

  const MIN_LENGTH = 10;

  const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      selectProject: (value) => dispatch({ type: SELECT_PROJECT, value }),
    }
  }

 
const AuctionItem = (props) => {

  const history = useHistory();

  const {classes} = props;

  const {info} = props;

  const handleOpenViewDetail = () => {
    history.push("/auction-items/"+info._id);
  }
  

  const renderStatus = (status) => {
    switch(status){
      case "Finished":
        return (<Chip label={status} className={classes.statusFin}/>);

      case "In Auction":
        return (<Chip label={status} className={classes.statusInProgress}/>);
    
      case "Closed":
        return (<Chip label={status} className={classes.statusPending}/>);

      default:
        break;
    }
  }

  return (
      <Card className={classes.item} variant="outlined">
       <CardMedia
          component={CloudinaryImg}
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
      <CardActionArea>
        <CardContent>
          <div className = {classes.itemTitle}>
            <div className={classes.typoTitle}>
            {info.item_name}
            </div>
            <div style={{marginLeft: 10}}>        
            {renderStatus(info.status)}
            </div>     
          </div>
          <div style={{overflow: "hidden", textOverflow: "ellipsis", width: "100%", marginTop: "5px"}}> 
          <Paper style={{maxHeight: 75, overflowY: 'auto'}}>
            <p>Price: {info.price}</p>
            <p>Auction End: {info.auction_end}</p>
          </Paper>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions style={{position: "absolute", zIndex: 1000, top: 400}}>
        <Button size="small" color="primary" onClick={handleOpenViewDetail}>
          View Detail
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect (null,mapDispatchToProps) (withStyles(styles)(AuctionItem));