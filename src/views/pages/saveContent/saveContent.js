import React from 'react';
import '../../styles/explorePage.scss';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import serverURL from '../../../utils/serverURL';
import tokenConfig from  '../../../utils/tokenConfig';
import Snackbar from "@material-ui/core/Snackbar";

import { withRouter } from 'react-router-dom';

class SaveContent extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            url:"",   
            updated:false,
            items:[], 
            total:"",
            massage:"",
            openSnack:false,

        }


        this.updatesave = this.updatesave.bind(this);

    }

    handleClose =() =>{ this.setState({openSnack:false})};
    updatesave() {

        if (!this.state.updated) {
            this.setState((prevState, props) => {
                return {
                    updated: true
                };

            });
            this.save();

        } else {

            this.setState((prevState, props) => {
                return {
                    updated: false

                };
                
            });
            this.deleteSave();

        }
      
        // this.setState((prevState, props) => {
        //     return {
        //         color: true

        //     };
        // });
      
        // if (!this.state.updated) {
        //     console.log("del "+this.state.updated)
        //     this.deleteSave();
        // }

    }
    save() {
       
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        myHeaders.append("Content-Type","application/json")
      
        var UserCourse = {}
        UserCourse.url = this.props.url;

        var raw = JSON.stringify(UserCourse);
    
        fetch(serverURL() + "user/savedContents",{

         method: 'POST',
         body: raw , 
        headers: myHeaders
    }
        ).then((res) => {
            console.log(res.status);
            if (res.status === 200){
                this.setState({openSnack:true});

                this.setState({massage:"saved"});
            }

        }).then((res) => console.log(res));
    }


    
    componentDidMount() {  
            this.getsave();
      
    }
    getsave() {
          
    fetch(serverURL() + "user/savedContents", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
        .then((result) => {
          console.log(result)
          if (result.status === 200) {
            return result.json()
          }
          if (result.status === 401) {
            window.location.replace("/login")
          }
        }
        )
        .then( (response)  => {
            this.setState({
            items: response.items,
            total: response.total
          })
         
          {this.state.items.map((l) =>
                 {  
               
                   if(l.url===this.props.url) {
                 this.setState({
                    updated:true
                  }) 
                } 
                 }
               )}

        });     
    
    }
    deleteSave (){
        console.log(serverURL()+"user​/savedContents?url="+this.props.url)
   
       var myHeaders = new Headers();
   
       myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
       myHeaders.append("Content-Type","application/json")
   
       fetch(serverURL()+ "user/savedContents?url=" + this.props.url , {
           method: 'DELETE',
           headers: myHeaders
       }).then((res) => {
           console.log(res.status);
           if ( res.status === 200) {
                this.setState({openSnack:true});

                this.setState({massage:"unsaved"});

           }
           console.log(res);
       }).then((res) => console.log(res));
   }
    
    
    render() {
        return (
            <div>

        <i className="material-icons "  onClick={() => { this.updatesave() }}>{ this.state.updated ? <TurnedInIcon></TurnedInIcon> :<TurnedInNotRoundedIcon></TurnedInNotRoundedIcon>}</i>
        <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={this.state.openSnack}
        autoHideDuration={2000}
        onClose={this.handleClose}
        message={<div style={{ fontSize: 17 }}>{this.state.massage}</div>}
      />
            </div>

        );

    }
}

export default SaveContent;
