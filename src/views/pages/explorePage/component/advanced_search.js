import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../../styles/explorePage.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width : '100px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth : 400
  },
}));

export default function AdvancedSearch(props) {
  const classes = useStyles();  
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
    if(event.target.value == 10)
      props.handleChange("URL") ;
    else
      props.handleChange("title");
  };

  return (
    <div>
      {/* <Button onClick={props.handleOpen}>Open select dialog</Button> */}
      <Dialog disableBackdropClick disableEscapeKeyDown open={props.open} onClose={props.handleClose}>
        <DialogTitle>URL or a title ??</DialogTitle>
        <DialogContent>
          <form className={classes.container}>            
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Mode</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={age}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>Both</em>
                </MenuItem>
                <MenuItem value={10}>URL</MenuItem>
                <MenuItem value={20}>title</MenuItem>                
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>          
          <Button onClick={props.handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
