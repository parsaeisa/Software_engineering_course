import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux' ;
import * as UserAction from "../../../core/edit_profile/action/UserAction" ;
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import callapi_analytics_get_blockedDomains from './callapi_editprofile.js/callapi_analytics_blockdomains';
import store from "../../../core/store/index"
import { makeStyles } from '@material-ui/core/styles';
import callapi_editprofile_update from './callapi_editprofile.js/callapi_editprofile_udpate' ;
import callapi_editprofile_get from './callapi_editprofile.js/callapi_editprofile_get' ;
import DeleteAccountModal from './components/Deactivate' ;
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import BackgroundFromBGjar from './components/BackgroundFromBGjar';
import ProfileBackground from '../../../assests/ProfileBackground.svg'
import BlockedTable from './components/blocked_links_table';

import '../../styles/edit_profile.scss' ;
import Avatar from './components/Avatar';

class Edit_profile extends React.Component {        
                
  
    constructor(props){
      super(props);

      callapi_editprofile_get()    

      this.state = {
        blocked_domains : [] ,
        visible : false ,
        showSuccessAlert : false ,
        SuccesAlertText : "Profile has been changed success fully " ,
        showFailureAlert : false ,
        FailAlertText : "" ,
        deleteAccountModalOpen : false ,
        loading : false ,
        last_state : null ,
        values : {
          amount: '',
          password: '',
          confirmPassword : '' ,
          weight: '',
          weightRange: '',
          showPassword: false,      
          showConfirmPassword: false,      
        }
      }
    }

    async componentWillMount(){
      let blocked_domains = await  callapi_analytics_get_blockedDomains() ;   

      this.setState({        
        blocked_domains : blocked_domains
      })
    }

    render()
    {
      const classes = makeStyles((theme) => ({                  
          
        closeButton: {
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500],
          
        },  
      }));
    
    function callback(key) {      
    }  
    // const {Panel} = Collapse ;

    const handleChange = (prop) => (event) => {
      this.setState({values : { ...this.state.values, [prop]: event.target.value }});
    };
    
    const handleClickShowPassword = () => {
      this.setState({values : { ...this.state.values, showPassword: !this.state.values.showPassword }});
    };

    const handleClickShowConfirmPassword = () => {
      this.setState({values :{ ...this.state.values, showConfirmPassword: !this.state.values.showConfirmPassword }});
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleClose = () => {
      // setVisible(false);
      this.setState({visible : false });
    };      

    return (     
      <>      
      <div className={this.props.darkmode}>         
            <Paper elevation={5} className="paper">
                <Grid container>
                  <Grid item xs={12} style= {{backgroundColor : 'blue'}}>
                    {/* <Typography variant="h6">Edit Profile</Typography>        */}
                    <img style={{width : '100%', height : '250px'}} src={ProfileBackground} />
                    {/* <BackgroundFromBGjar />  */}
                  </Grid>                  
                </Grid>
                                
            <Container maxWidth="lg"  className="container">              

              <Snackbar
                open={this.state.showSuccessAlert}
                onClose={() => {
                  this.setState({
                    ...this.state,
                    showSuccessAlert: false,
                  });
                }}
                TransitionComponent={Fade}
                message={this.state.SuccesAlertText}                
              />              
              <Snackbar
                open={this.state.showFailureAlert}
                onClose={() => {
                  this.setState({
                    ...this.state,
                    showFailureAlert: false,
                  });
                }}
                TransitionComponent={Fade}
                message={this.state.FailAlertText}
                // key={state.Transition.name}
              />
                
              
                 
                 {this.props.avatar != "undefined" ? <> <Avatar /> </> : <CircularProgress
                  style={{marginBottom : "15px"}}
                 color="primary"
                  /> }              
                   <Accordion className = "Accordion">
                     <AccordionSummary 
                     expandIcon={<ExpandMoreIcon />}>
                      {this.state.last_state ? this.state.last_state.firstname : "Name :" }
                     </AccordionSummary >
                     <AccordionDetails>
                      <TextField className ="TextField" onChange={(e) => {this.props.SET_FIRSTNAME(e.target.value)}} value={this.props.firstname} label="FirstName" variant="outlined" role="FirstnameTextField" />
                      <TextField className ="TextField" onChange={(e) => {this.props.SET_LASTNAME(e.target.value)}} value={this.props.lastname} id="outlined-basic" label="LastName" variant="outlined" role="LastnameTextField" />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className ="Accordion" elevation={4}>
                     <AccordionSummary  expandIcon={<ExpandMoreIcon />}> 
                     Username :                
                  </AccordionSummary >
                  <AccordionDetails >
                  <TextField disabled className ="TextField" id="outlined-basic" value={this.props.username} onChange={(e) => {this.props.SET_USERNAME(e.target.value)}} label="Username" variant="outlined" role="UsernameTextField"/>
                {/* </Panel> */}
                {/* <Panel style={{textAlign: "left"}} header="Email : " key="3"> */}
                </AccordionDetails>
                  </Accordion>
                  <Accordion className ="Accordion" elevation={4}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />} > Email :  </AccordionSummary >
                     <AccordionDetails >
                       <Grid container>
                    <Grid item xs={12} md={12} lg={6} >
                      <TextField disabled className ="TextField" value={this.props.email} onChange={(e) => {this.props.SET_EMAIL(e.target.value)}} id="outlined-basic" label="Email" variant="outlined" role="EmailTextField" />
                    </Grid>
                    <Grid item xs={12} lg={6} md={12} >
                    {/* <ul style={{width : '50%'}}><li> */}
                      <Typography variant="subtitle1" style={{marginTop : '5px'}}>                  
                        Your email would be used to communicate with you . 
                      </Typography>
                    </Grid>
                    </Grid>
                  {/* </li>
                  </ul> */}
                  </AccordionDetails>
                 </Accordion> 
                 <Accordion className ="Accordion" elevation={4}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />} >Password :  </AccordionSummary >
                     <AccordionDetails >
                  
              <Grid container>
                <Grid item xs={12} md={12} lg={6} >
                  <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={this.state.values.showPassword ? 'text' : 'password'}
                      value={this.state.values.password}
                      onChange={handleChange('password')}
                      endAdornment={                      
                          <IconButton
                          color = "primary"
                          aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {this.state.values.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>                       
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} lg={6} >
                  <FormControl className={clsx(classes.margin, classes.textField)} style={{marginleft : "5px"}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm</InputLabel>
                    <OutlinedInput 
                      className = "TextField"
                      id="outlined-adornment-password"
                      type={this.state.values.showConfirmPassword ? 'text' : 'password'}
                      value={this.state.values.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      endAdornment={                                              
                          <IconButton
                            // color = "#023047"
                            color = "primary"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >                        
                          {this.state.values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>                                               
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                  </Grid>
                </Grid>
                </AccordionDetails>
                </Accordion>
                <Accordion className ="Accordion" elevation={4}>
                     <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                      > Deactivate </AccordionSummary >
                     <AccordionDetails >
                {/* </Panel>
                <Panel style={{textAlign: "left"}} header="deactivate" key="5">                     */}
                    <Button onClick= {() => {
                      this.setState({
                        deleteAccountModalOpen : true
                      })
                    }} size="medium" className="Button" variant="contained" color="secondary">                      
                      Delete Account                      
                    </Button>                  
                    <DeleteAccountModal 
                    open = {this.state.deleteAccountModalOpen}
                    handleClose = {() => {
                      this.setState({
                        deleteAccountModalOpen : false
                      })
                    }} />
                 </AccordionDetails >   
                 </Accordion >
                {/* </Panel>
              </Collapse>                       */}
                        
            <div className="wrapper">
                <Button disabled={this.state.loading}  size="large" className="Button" variant="contained" color="primary"
                  onClick = {() => {
                    if(this.state.values.password == this.state.values.confirmPassword)
                    {
                      this.setState({
                          showFailureAlert : false ,
                          loading : true 
                           });
                      this.props.SET_PASSWORD(this.state.values.password) ;                      
                    }
                    else
                    {
                      this.setState({showFailureAlert : true , FailAlertText : "Passwords dont match " });
                    }
                    if(this.state.showFailureAlert == false)
                      callapi_editprofile_update(store.getState().UserReducer , () => {
                        this.setState({
                          showSuccessAlert : true ,
                          loading : false 
                        })
                      }, (text) => {
                        this.setState({
                          FailAlertText : text ,
                          showFailureAlert : true ,
                          loading : false
                        })
                      });
                  }}
                >
                  Save 
                  {this.state.loading && <CircularProgress style={{color : 'green'}} size={24} className="buttonProgress" />}
                </Button > 
            </div>  
          </Container >
            </Paper>        

            <Paper
            style={{marginBottom : '30px'}}
            className="paper" elevation={5} >
              < BlockedTable 
                darkmode = {this.props.darkmode}
                date = {this.state.blocked_domains}
                  />
            </Paper>
        </div>
      </>
    )  }  
}

const mapStateToProps = (state) => {
  return {
    ...state,
    firstname : state.UserReducer.firstname ,
    lastname : state.UserReducer.lastname ,
    username : state.UserReducer.username ,
    email : state.UserReducer.email ,
    password : state.UserReducer.password ,
    avatar : state.UserReducer.avatar ,
    darkmode: state.dark_mode.darkmode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SET_STATE : (t) => dispatch (UserAction.setState(t)),       
    SET_FIRSTNAME : (t) => dispatch (UserAction.setFirstname(t)), 
    SET_LASTNAME : (t) => dispatch (UserAction.setLastname(t)), 
    SET_USERNAME : (t) => dispatch (UserAction.setUsername(t)), 
    SET_EMAIL : (t) => dispatch (UserAction.setEmail(t)), 
    SET_PASSWORD : (t) => dispatch (UserAction.setPassword(t)) , 
    SET_AVATAR : (t) => dispatch (UserAction.setFirstname(t)) , 
  }
}

export default connect (mapStateToProps , mapDispatchToProps) (Edit_profile); 