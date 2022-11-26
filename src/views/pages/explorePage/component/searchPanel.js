import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import '../../../styles/explorePage.scss';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

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

export default function SearchPanel (props)
{
    const classes = useStyles();  
    const [age, setAge] = React.useState('');

    const [ url, setURL] = React.useState(false);
    const [ tag, setTag] = React.useState(false);    

    const searchBasedOn = "search based on : ";
    const topic = "topic : "

    return (    
        // <form className={classes.container}>            
        //     <FormControl className={classes.formControl}>
        //       <InputLabel id="demo-dialog-select-label">Mode</InputLabel>
        //       <Select
        //         labelId="demo-dialog-select-label"
        //         id="demo-dialog-select"
        //         value={age}
        //         onChange={handleChange}
        //         input={<Input />}
        //       >
        //         <MenuItem value="">
        //           <em>Both</em>
        //         </MenuItem>
        //         <MenuItem value={10}>URL</MenuItem>
        //         <MenuItem value={20}>title</MenuItem>                
        //       </Select>
        //     </FormControl>
        // </form>

        <>     
        <FormGroup column >           
          <FormGroup row>
            <Typography style={{marginTop: '2px' , marginRight : '20px' , marginLeft : '5px'}} variant="h6" component="h6">
              {searchBasedOn}
            </Typography>
            <FormControlLabel
            className  = "checkbox"
              control={<Checkbox checked={url} onChange={() => {
                setURL(!url);
                if(tag == true)
                  props.handleChange("both");                
                else 
                  props.handleChange("URL") ;
              }} name="url" />}
              label="url"
            />  

            <FormControlLabel
              className  = "checkbox"
              color = 'default'
              control={<Checkbox checked={tag} onChange={() => {
                setTag(!tag);
                if(url == true)
                  props.handleChange("both");                
                else
                  props.handleChange("title");                
              }} name="tag" />}
              label="tag"
            />  
          </FormGroup>
          
          <FormGroup row>
            <Typography style={{marginTop: '2px' , marginRight : '20px' , marginLeft : '5px'}} variant="h6" component="h6">
              {topic}
            </Typography>
            <FormControlLabel
            className  = "checkbox"
              control={<Checkbox checked={false} name="url" />}
              label="Sport"
            />  

            <FormControlLabel
              className  = "checkbox"
              control={<Checkbox checked={false}  name="tag" />}
              label="Politics"
            />  

            <FormControlLabel
              className  = "checkbox"
              control={<Checkbox checked={false} name="url" />}
              label="Art"
            />  

            <FormControlLabel
              className  = "checkbox"
              control={<Checkbox checked={false} name="url" />}
              label="Technology"
            />  
          </FormGroup>
          
        </FormGroup>
        </>
    )
}