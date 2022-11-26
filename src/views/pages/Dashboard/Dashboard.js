import React from 'react';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux' ;
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import ExplorePage from '../explorePage/explorePage';
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig' ;
import axios from 'axios' ;
import Edit_profile from '../editProfile/editprofile' ;
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Analytics from '../Analytics/Analytics';
import "../../styles/Dashboard.scss" ;
import ViewSaveContent from '../saveContent/viewSaveContent';
import * as darkmode_actions from "../../../core/dark_mode/action/darkModeActions";
import PhoneTabular from './components/PhnoeTabular';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height : '20px' ,
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      // marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 16,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      // width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(1),
      margin : '0px' ,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

function Dashboard({darkmode,setDarkMode}) {    
        const classes = useStyles();
        const [open, setOpen] = React.useState(true);
        const handleDrawerOpen = () => {
            setOpen(true);
        };

        const [name , setName] = React.useState("");
        const [avatar , setAvatar] = React.useState("https://i.stack.imgur.com/l60Hf.png");

        axios.get(serverURL() + "user/"  , tokenConfig())
        .then((res) => {                            
            setName(res.data.firstname + " " + res.data.lastname);
            setAvatar(res.data.avatar);            
        })
        .catch((e) => {
            console.log(e);
        });    

        const handleDrawerClose = () => {
            setOpen(false);
        };
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        const setDarkStatus = () => {
          console.log(darkmode);
          if (darkmode === "day") {
            setDarkMode("night");
          } else {
            setDarkMode("day");
          }
        };
        return (
          <div className={darkmode}>
          
                <div className={classes.root}>
                    <CssBaseline />  
                    <div className = "PhoneTabular" >
                      <PhoneTabular  />                  
                    </div>
                    <Drawer 
                        className = "Drawer"
                        variant="permanent"
                        classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                        }}
                        open={open}
                    >
                        <div className={classes.toolbarIcon}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>                            
                        </Typography>       
                        {/* <Typography syle={{padding : "70px"}} variant="h6" noWrap>
                            𝓼𝓱𝓪𝓻𝓹
                        </Typography> */}
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>                            
                        </Typography>       
                        <IconButton onClick={() => {
                          setOpen(!open);
                        }}>
                            <ChevronLeftIcon />
                        </IconButton>
                        </div>                                            
                    <div className={classes.drawerContainer} >
                        <List style ={{ paddingTop: '0px'}}>
                        <li>
                          {/* <Grid container direction="row" >                             */}
                          <ListItem button >
                            <ListItemIcon>                               
                              <Avatar
                                  src={avatar != null && avatar != "https://i.stack.imgur.com/l60Hf.png" && atob(avatar) }                             
                                  className = "appBarOptions" />                                                        
                                  </ListItemIcon>    
                                <Typography variant="button" style={{ marginLeft:'2px' , color: "red" }}>  
                                    {name}
                                </Typography>                                                          
                          </ListItem>
                        </li>
                        <Divider  variant="inset" component="li" className ="Divider" />
                        <li>
                          <Link to ="/explore" onClick={() => {
                              setOpen(false);
                            }} >
                            <ListItem button key="Homme">
                                <ListItemIcon>
                                <HomeIcon> </HomeIcon>
                                </ListItemIcon>
                                <Typography variant="button" style={{ color: "white" }}>
                                    Home
                                </Typography >
                            </ListItem >
                          </Link>
                        </li>
                        <li>
                            <Link to ="/profile/edit" onClick={() => {
                              setOpen(false);
                            }} >
                                <ListItem button key="Profile">
                                <ListItemIcon>
                                    <AccountCircleIcon></AccountCircleIcon>
                                </ListItemIcon>                                                  
                                <Typography variant="button" style={{ color: "white" }}>
                                    Edit profile
                                </Typography >
                                </ListItem>
                            </Link>
                        </li>                      
                        <li>
                            <Link to ="/profile/analytics" onClick={() => {
                              setOpen(false);
                            }} >
                                <ListItem button key="Profile">
                                <ListItemIcon>
                                    <EqualizerIcon/>
                                </ListItemIcon>                                                  
                                <Typography variant="button" style={{ color: "white" }}>
                                    Analytics
                                </Typography >
                                </ListItem>
                            </Link>
                        </li>
                        <li>
                          <Link to ="/saved" onClick={() => {
                              setOpen(false);
                            }}>
                            <ListItem button key="Saved">
                                <ListItemIcon>
                                <TurnedInIcon></TurnedInIcon>
                                </ListItemIcon>
                                <Typography variant="button" style={{ color: "white" }}>
                                    Saved
                                </Typography >

                            </ListItem>
                          </Link>
                        </li>                        
                        <div className = "DrawerSpacer" />
                        <li>
                          {/* <Grid container direction="row" >                             */}
                          <ListItem button >
                            <ListItemIcon>
                              {/* <div className="darkmode-icon" onClick={setDarkStatus}> */}
                              {darkmode == "day" && (
                                  <img  className="darkmode" src="moon.svg" onClick={setDarkStatus}></img>
                                )}
                                {darkmode == "night" && (
                                <img  className="darkmode" src="sun.svg" onClick={setDarkStatus}></img>
                                )}
                              {/* </div>                                */}
                            </ListItemIcon>                                  
                          </ListItem>
                        </li>
                        <ListItem button key="Logout" >
                            <ListItemIcon>
                            <ExitToAppIcon></ExitToAppIcon>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                        </List>
                    </div>
                    </Drawer>                    
                        <main className={classes.content}>
                        {/* <div className="appBarSpacer" /> */}
                        <Container maxWidth="lg" className={classes.container}>
                            <Switch>

                                <Route path="/explore">
                                    <ExplorePage drawerOpen = {open} />
                                </Route>

                                <Route path="/profile/edit">
                                    <Edit_profile />
                                </Route>

                                <Route path="/profile/analytics" >
                                    <Analytics />
                                </Route>
                                
                                <Route path="/saved" >
                                    <ViewSaveContent />
                                </Route>

                                <Route path="/explore" >
                                    <ExplorePage />
                                </Route>

                            </Switch>
                        </Container>

                        </main>
                    </div>                                        

            </div> 
        )

}

const mapStateToProps = (state) => {
    return {
        ... state ,
        avatar : state.UserReducer.avatar ,
        name : state.UserReducer.firstname +" " +  state.UserReducer.lastname, 
        darkmode: state.dark_mode.darkmode         
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDarkMode: (av) => dispatch(darkmode_actions.setDarkMode(av)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);