import React from 'react';
import '../../styles/explorePage.scss';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig';
import axios from 'axios' ;
import Snackbar from "@material-ui/core/Snackbar";
import { withRouter } from 'react-router-dom';
import BlockIcon from '@material-ui/icons/Block';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span class="material-icons" style={{color:"black"}}>
  <MoreVertIcon></MoreVertIcon>
  </span>
    </a>
  ));
class Block extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            updated: false,
            openSnack:false,
            massage:"",
            domain:"",
            smShow:false
        }


        this.updateblock = this.updateblock.bind(this);
        // this.handleCloseSnack = this.handleCloseSnack.bind(this);

    }
    
    handleClose =() =>{ this.setState({openSnack:false})};

    updateblock() {

        if (!this.state.updated) {
            this.setState((prevState, props) => {
                return {
                    updated: true
                };

            });

        } else {

            this.setState((prevState, props) => {
                return {
                    updated: false

                };
            });

        }


        this.content();
        this.setState({smShow:false});

    }

    content() {
      
      
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        myHeaders.append("Content-Type","application/json")

        var UserCourse = {}
        UserCourse.domain = this.props.url;
   

        var raw = JSON.stringify(UserCourse);

        fetch(serverURL() + "user/blockedDomains", {

            method: 'POST',
            body: raw,
            headers: myHeaders
        }
        ).then((res) => {
            console.log(res.status);
            if (res.status === 200){
                this.setState({openSnack:true});

                this.setState({massage:"blocked"});

            return res.json();
            }

        }).then((res) => console.log(res));

       
    }



    render() {
        return (
            
            <div>

        {/* <i className="material-icons " onClick={() => { this.updateblock() }}> <BlockIcon></BlockIcon></i> */}
                <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={this.state.openSnack}
        autoHideDuration={2000}
        onClose={this.handleClose}
        message={<div style={{ fontSize: 17 }}>{this.state.massage}</div>}
      />

                                                               
 <Dropdown>
<Dropdown.Toggle  as={CustomToggle}></Dropdown.Toggle>
<Dropdown.Menu>
<Dropdown.Item  onClick={() =>   this.setState({smShow:true})}> block</Dropdown.Item>
</Dropdown.Menu>
</Dropdown> 

<div>

<Dialog
  open={this.state.smShow}
  onClose={() =>   this.setState({smShow:false})}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Are you sure you want to block this domain?"}</DialogTitle>
 
  <DialogActions>
    <Button onClick={() => this.setState({smShow:false})} color="primary">
      Disagree
    </Button>
    <Button   onClick={() => { this.updateblock() }} color="primary" autoFocus>
      Agree
    </Button>
  </DialogActions>
</Dialog>
</div>                                            
</div>
        );

    }
}

export default Block;
