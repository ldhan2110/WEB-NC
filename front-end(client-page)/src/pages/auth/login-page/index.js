import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {LOGIN_REQ} from '../../../redux/account/constants';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import MessagePopup from '../../../components/MessageBox';
import {DISPLAY_MESSAGE} from '../../../redux/message/constants';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import LockIcon from '@material-ui/icons/Lock';
import axios from "axios";


//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return { 
    account: state.account,
    project: state.project.currentSelectedProject
 }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    loginReq: (payload) => dispatch({ type: LOGIN_REQ, payload }),
    displayMsg: (payload) => dispatch({type: DISPLAY_MESSAGE, payload }),
  }
}

const LoginPage = (props) => {

    const history = useHistory();

    const classes = useStyles();

    const {account, loginReq, displayMsg, project} = props;

    const {accountInfo} = account;

    const [values, setValues] = useState({
      username: "",
      password: "",
      isKeepedLogin: false,
      showPassword: false,
    });
    const [checkError, setCheckError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [enableCreateBtn, setEnableCreateBtn] = useState(true);
    const [error, setError] = useState({
      username: 'ss',
      password: 'ss',
    });
    //check if Login button is pressed since F5
    const [checkLogin, setCheckLogin] = useState(false);

    const [openMsg, setOpenMsg] = useState(false);

     useEffect(()=>{
      if(account.error === true && checkLogin)// && account.errorMsg.errMsg == "Password is not valid")
      {
        setError({error: "Wrong username or password"});
        setEnableCreateBtn(true);
        setLoading(false);
      }
      
      else if (account.success === true && checkLogin) {
        displayMsg({
          content: "Logged in successfully!",
          type: 'success'
        });
        setEnableCreateBtn(true);
        setLoading(false);
      }
    },[account]);

    // useEffect(()=>{
    //   if (localStorage.getItem("token") && project === ''){
    //     history.push("/projects");
    //   } else  if (localStorage.getItem("token"))  {
    //     history.push("/projects/"+project);
    //   }
    // }, [accountInfo, history])

    // useEffect(()=>{
      
    // }, [])

    //CHANGE CHECKBOX
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
      if(checkError === true)
    setError({ ...error, [prop]: event.target.value });
    };

/*     const showError= () =>{
      return (<FormHelperText error>Error</FormHelperText>);
    } */

    //CHANGE PASSWORD
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };



    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    //HANDLE LOGIN REQUEST BUTTON
    const handleClickLogin = (event) => {
      setCheckError(true);

      if(values.username.trim().length === 0)
        setError({ ...values, username: "" });

      if(values.password === "")
        setError({ ...values, password: "" }); 
      if(values.username.trim().length !== 0 && values.password !== ""  )
      { 
        setError({});
        setEnableCreateBtn(false);
        setLoading(true);
        loginReq({username: values.username, password: values.password});      
        setCheckLogin(true);

        axios.post("http://localhost:8000/user/auth/login",{
          "usr_nm":values.username,
          "usr_pw":values.password
        })
        .then(function(res){
          if (res.data.error)
            console.log("Can't login");
          else {
            localStorage.setItem("token",res.data.accessToken);
            history.push("/auction-items");
          }            
          
        }).catch(function(err){
          console.log(err);
        });
      }     
    };

    return(
    <div className={classes.root}>
    <MessagePopup open={openMsg} openMethod={setOpenMsg} type="E" content="Invalid Messaged"/>
        <Grid container>
        <Grid item xs={7} style={{backgroundColor: 'white', height: '100vh'}}>
          <img className={classes.banner} src = "/img/logo-banner.jpg" alt= "banner"/>
        </Grid>
        <Grid item xs={5}>
            <form className = {classes.formLogin}>
              <div>
                <img className={classes.logo} src="../img/logo.png" alt = "logo-banner"/>
              </div>  

                <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                <OutlinedInput 
                    id="outlined-adornment-username"
                    value={values.username}
                    onChange={handleChange('username')}
                    error={checkError && error.username == 0 && values.username == 0 ? true : false}
                    labelWidth={60}
                    required={true}                    
                />
                
                {checkError && error.username == 0 && values.username == 0 && <FormHelperText id="component-error-text" error={true}>Username is required</FormHelperText>}
              </FormControl> 

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            required={true}
            error={checkError && !error.password && !values.password ? true : false}
            
                   
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={60}
          />
           
          {checkError && !error.password && !values.password && <FormHelperText id="component-error-text" error={true}>Password is required</FormHelperText>}
        </FormControl>
        {error && error.error && <FormHelperText id="component-error-text" error={true}>{error.error}</FormHelperText>}

        <div className = {classes.btnGroup}>
          <Button variant="contained" color="primary" disabled={enableCreateBtn ? false : true } startIcon={<LockIcon />} onClick={handleClickLogin}>
            Sign In
            {loading && <CircularProgress size={24} style={{color: blue[500],position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
          </Button>          
        </div>
        <span>
          <a href="auth/forgot-password">Forgot your password?</a>
        </span>
          </form>
        </Grid>
      </Grid>
    </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);