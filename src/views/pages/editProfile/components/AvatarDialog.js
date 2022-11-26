import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import '../../../styles/edit_profile.scss' ;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AvatarDialog(props) {
  
  return (
    <div>      
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth = '480px'
        className = "AvatarDialog"
        onClose={props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"        
      >
        <DialogTitle  id="alert-dialog-slide-title">{"Profile photo "}</DialogTitle>
        <DialogContent style={{
            paddingTop : '0px'
        }}>
            <img                     
                // width={450}
                // height={450}                                    
                src= {props.src}
                className = "AvatarDialog"
            />
        </DialogContent>
        <DialogActions>          
        </DialogActions>
      </Dialog>
    </div>
  );
}
