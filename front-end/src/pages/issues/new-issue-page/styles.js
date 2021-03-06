import { blue } from '@material-ui/core/colors';
const styles = {
  appBar: {
    position: 'relative',
  },

  title: {
    marginLeft: 10,
    flex: 1,
  },

  content:{
      //margin: "2vh auto",
      marginLeft: "2vw",
      marginRight: "2vw",
      height: "100%",
      "& > *":{
        marginTop: 15
      }
  },

  titleContent:{
    fontSize: "15px"
  },

  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    "& > *": {
      marginRight: 5
    }
  },

  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
};

export default styles;