import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux' ;
import DonatChart from './components/Donat_chart';
import LineChart from './components/Line_chart';
import BarChart from './components/Bar_chart';
import "../../styles/analytics.scss";
// import BlockedTable from './components/blocked_links_table';
import callapi_analytics_get from './callapi_analytics/callapi_analytics' ;
import callapi_analytics_get_blockedDomains from '../editProfile/callapi_editprofile.js/callapi_analytics_blockdomains';
import CountUp from './components/CountUp' ;
const drawerWidth = 240;


class Analytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blocked_domains : [] ,
      user_history : []
    }
  }

  async componentWillMount()
  {      
      let userHistory = await callapi_analytics_get() ;
      let blocked_domains = await  callapi_analytics_get_blockedDomains() ;   

      this.setState({
        user_history : userHistory ,
        blocked_domains : blocked_domains
      })
  }

  render() {

    const data = {
      "userHistory": [
        {
          "domain": "example.com",
          "tag": "animal",
          "eventType": "CLICK",
          "createdAt": "2021-05-01T20:04:23.291Z"
        },
        {
          "domain": "example.com",
          "tag": "animal",
          "eventType": "CLICK",
          "createdAt": "2021-05-01T20:04:23.291Z"
        },
        {
          "domain": "example.com",
          "tag": "animal",
          "eventType": "CLICK",
          "createdAt": "2021-05-01T20:04:23.291Z"
        },
        {
          "domain": "google .com",
          "tag": "politics",
          "eventType": "ENTER",
          "createdAt": "2021-05-06T20:04:23.291Z"
        },
        {
          "domain": "google.com",
          "tag": "politics",
          "eventType": "EXIT",
          "createdAt": "2021-05-03T20:04:23.291Z"
        },
        {
          "domain": "google.com",
          "tag": "string",
          "eventType": "ENTER",
          "createdAt": "2021-05-03T20:04:23.291Z"
        },
        {
          "domain": "varzesh3.com",
          "tag": "string",
          "eventType": "EXIT",
          "createdAt": "2021-05-03T20:04:23.291Z"
        },
        {
          "domain": "varzesh3.com",
          "tag": "string",
          "eventType": "ENTER",
          "createdAt": "2021-09-03T20:04:23.291Z"
        },
        {
          "domain": "twitter.com",
          "tag": "string",
          "eventType": "ENTER",
          "createdAt": "2021-09-03T20:04:23.291Z"
        },        
      ]
    }    

    const mapToProp = (data, prop) => {
      return data
        .reduce((res, item) => Object
          .assign(res, {
            [item[prop]]: 1 + (res[item[prop]] || 0)
          }), Object.create(null))
      ;      

    }        

    const aggByWeek = (data, prop) => {
      return data.filter(  ({eventType}) => eventType == 'ENTER' || eventType == 'EXIT' )
        .reduce((res, item) => Object.assign(res, 
          {
              [new Date(item[prop]).getDay()]: 1 + (res[new Date(item[prop]).getDay()] || 0)              
          } ), Object.create(null))
      ;      

    }        

    const classes = makeStyles((theme) => ({
      root: {
        display: 'flex',
      },      
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        
      },      
    }));

    const fixedHeightPaper = clsx( classes.paper, "fixedHeight");
    const fixedHeightNumberPaper = clsx(classes.paper , "fixedHeightNumber")
    var a = new Date() ;
    console.log(a);

    return (
      <div className={classes.root}>
        <CssBaseline />

        <main className="content" >          
          <Container  className="container">            

            <Grid container spacing={3}>
              
              {/* <Grid item xs={4} md={4} lg={4}>
                <Paper elevation={4} className={fixedHeightNumberPaper}>
                  <CountUp 
                      title = "Visited Sites"
                      number = {112}
                  />                      
                </Paper>
              </Grid>

              <Grid item xs={4} md={4} lg={4}>
                <Paper elevation={4} className={fixedHeightNumberPaper}>
                  112
                </Paper>
              </Grid>

              <Grid item xs={4} md={4} lg={4}>
                <Paper elevation={4} className={fixedHeightNumberPaper}>
                  112
                </Paper>
              </Grid> */}

              <Grid item xs={12} md={8} lg={8}>
                <Paper elevation={4} className={fixedHeightPaper}>
                  <LineChart 
                    data = {aggByWeek(data.userHistory , "createdAt")}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper elevation={4} className={fixedHeightPaper}>
                  <DonatChart
                    data = {mapToProp(data.userHistory , "tag")}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={5}>
                <Paper className= "paper" style={{paddingLeft : "20px", paddingRight : "10px"}} elevation={4} >
                  <BarChart
                    data = {mapToProp(data.userHistory , "domain")}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={7}>
                <Paper  elevation={4} className="BlockedDomainsPaper">
                  {/* <BlockedTable
                    data ={this.state.blocked_domains}
                  /> */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
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

export default connect (mapStateToProps) (Analytics); 