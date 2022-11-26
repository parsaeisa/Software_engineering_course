import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { connect } from 'react-redux' ;
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import "../../../styles/Dashboard.scss" ;
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Edit_profile from '../../editProfile/editprofile' ;
import Analytics from '../../Analytics/Analytics';
import ViewSaveContent from '../../saveContent/viewSaveContent';
import ExplorePage from '../../explorePage/explorePage';
import * as darkmode_actions from "../../../../core/dark_mode/action/darkModeActions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className= "TabsBox">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function PhoneTabular({darkmode,setDarkMode}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setDarkStatus = () => {
    console.log(darkmode);
    if (darkmode === "day") {
      setDarkMode("night");
    } else {
      setDarkMode("day");
    }
  };

  return (
    <div className={darkmode} >
    <div className={classes.root}>
      <AppBar 
      className= "Tabs"
      style={{width : '100vw'}}
       position="static">
        <Tabs
          value={value}          
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >            
            <Tab icon={<HomeIcon />} aria-label="phone" {...a11yProps(0)} />                    
            <Tab icon={<AccountCircleIcon />} aria-label="favorite" {...a11yProps(1)} />                                        
            <Tab icon={<EqualizerIcon />} aria-label="person" {...a11yProps(2)} />                    
            <Tab icon={<TurnedInIcon />} aria-label="help" {...a11yProps(3)} />                 

            {darkmode == "day" && (
                <img  className="darkmode" src="moon.svg" onClick={setDarkStatus}></img>
            )}
            {darkmode == "night" && (
                <img  className="darkmode" src="sun.svg" onClick={setDarkStatus}></img>
            )}                                   
        </Tabs>
      </AppBar>      
        <TabPanel value={value} index={0}>            
                <ExplorePage                 
                />            
        </TabPanel>

        <TabPanel value={value} index={1}>            
                <Edit_profile />            
        </TabPanel>

        <TabPanel value={value} index={2}>            
                <Analytics />            
        </TabPanel>

        <TabPanel value={value} index={3}>            
                <ViewSaveContent />            
        </TabPanel>        
      
    </div>
    </div>
  );
}


const mapStateToProps = (state) => {
    return {
        ... state ,        
        darkmode: state.dark_mode.darkmode         
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDarkMode: (av) => dispatch(darkmode_actions.setDarkMode(av)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneTabular);