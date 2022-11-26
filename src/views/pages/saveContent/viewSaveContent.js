import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputBase from '@material-ui/core/InputBase';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useState, useEffect } from "react";
import '../../styles/explorePage.scss';
import serverURL from '../../../utils/serverURL';
import ShowMoreText from 'react-show-more-text';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, withRouter } from 'react-router-dom';
import Edit_profile from '../editProfile/editprofile';
import Block from "../likeContent/block";
import SaveContent from "./saveContent";
import Like from "../likeContent/like";
import Badge from 'react-bootstrap/Badge';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Image from 'react-bootstrap/Image';

import { Row, Col ,Container} from "react-bootstrap";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },


  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },


  search: {
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function ViewSaveContent() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, SetNextPage] = useState(0);
  const [next, SetNext] = useState(serverURL() + "user/savedContents?skip=0&limit=10");
  const [value, setValue] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  useEffect(()=>{
		fetchData();
	},[]);
    

  const fetchData = () => {

    fetch(next, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then((result) => {
        if (result.status === 200) {
          return result.json()
        }

        if (result.status === 401) {
          window.location.replace("/login")
        }
      }
      )
      .then(function (response) {
        if(nextPage > 0){
					let arr = [...content, ...response.items];
					
					setContent(arr);
				}
				else{
					setContent(response.items);
				}
      });
    }
    const firstEvent = (e) => {
      var bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
      if(bottom){
        let pg = nextPage + 1;
      SetNextPage(pg);
      SetNext(serverURL() + "user/savedContents?skip="+pg+"&limit=10")
      fetchData();
      }
    }
	
	
 
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        
          <div className="explore">
         
          <div onScroll={firstEvent} className='ImageAPI'>
            {content.length === 0 ? <div></div> :
              content.map((item,index) => {
                if (item) return (
                  <div style={{ spacing: "50%" }}>
                    <div class="card mb-3 " >
                      <div class="row no-gutters">
                        <div class="col-md-4" >
                        <Container>
  <Row>
    <Col xs={6} md={4}>
                            <Image
                            style={{
  width:"250px",
  height:"250px"
                            
                               }}
                              variant="top"
                              src={
                                item.image != null
                                  ? item.image
                                  : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"
                              }
                              rounded
                              class="card-img"
                              alt="..."
                            ></Image>
                            </Col>
                            </Row>
                            </Container>
                          <div class="card-footer w-100 text-muted" className=" horizontal-card-footer">
                          <div style={{ display: "flex", content: "center", paddingLeft: "20px", marginTop: "" }}  >
                          <SaveContent url={item.url} />
                          <Like url={item.url} />
                          </div>

                        </div>
                        </div>
                        <div class="col-md-8">
                        <div className="reportwrapper" style={{ float: "right", display: "inline-block", marginTop: "13px", color: "black" }} >
                            <Block url={item.url} />
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>                 
                            <p class="card-text" style={{ display: "inline", whiteSpace: "pre-line" }}>

<ShowMoreText
  lines={2}
  more='Show more'
  less='Show less'
  className='content-css'
  anchorClass='my-anchor-css-class'
  expanded={false}
  keepNewLines={true}
  width={500}
>
  {item.des}
</ShowMoreText>
</p>
                             <div   style={{paddingTop:"10px"}}>
                                        <Link to= {"//" + item.url} target="_blank" > <Button
                                        variant="contained"
                                        color="primary"
                                       //  className={classes.button}
                                        endIcon={<ArrowForwardIcon/>}
                                      >
                                        visit
                                      </Button>{' '} </Link>
                                         </div>
           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
</div>
          </div>    
          </div>
          </div>
          
  );

}

export default withRouter(ViewSaveContent);
