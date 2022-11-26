import { useState , React} from 'react';
import clsx from "clsx";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import callapi_explore_search from '../callapi_explore/callapi_search' ;
import '../../../styles/explorePage.scss';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux' ;
import SearchPanel from './searchPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
    inputBase : {
        width: '63vw' ,    
    },
    inputBaseShift : {
        width: '53vw' 
    }
  }));

function Search(props) {

    const classes= useStyles ();

    const [searched , setSearched] = useState("");
    const [openAdvancedSearch , setOpenAdvancedSearch]   = useState(false);
    const [searchMode , setSearchMode] = useState("") ;
    const [isSearched , setIsSearched ] = useState(false);
    const [search , setSearch] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>        
      <div className = "accordeonRoot" >
        <Accordion
        className = "accordion"
        // style={{marginLeft : '30px'}} 
        expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={4}>
            <AccordionSummary            
            expandIcon={<ExpandMoreIcon />}            
            >
                {/* <Paper  component="form" className='searchFormPaper'  >                             */}
                <IconButton onClick = {async () => {
                        props.setSearching(true);
                        const search_respoonse = await callapi_explore_search(searched  , searchMode);
                        props.setSearching(false);
                        setSearch(true);
                        props.setContent((prevState) => ({                                  
                            items: search_respoonse.items,
                            total: search_respoonse.total
                        }));
                    }}  
                        >
                        <SearchIcon />                        
                    </IconButton>
                    <InputBase    
                    className = {clsx(classes.inputBase, props.drawerOpen && classes.inputBaseShift)}        
                    // className = "inputBase"                                                           
                    style={{
                        color: props.darkmode == 'night' && 'white'
                    }}
                        placeholder="Search Content"                              
                        onChange = {(e) => {
                        setSearched(e.target.value);
                        }}
                    />                    
                    {/* <Divider orientation="vertical" /> */}
                {/* </Paper>  */}

                {search &&
                <Button className="Button" variant="contained" onClick={() => {
                props.fetchData();
                setSearch(false);                            
                }} color="secondary" autoFocus>
                cancel
                </Button> }
            </AccordionSummary>
            <AccordionDetails>
                <SearchPanel handleChange = {(mode) => {
                  setSearchMode(mode)
                }} />                        
            </AccordionDetails>
        </Accordion>
    </div>

        </>        
    )

}const mapStateToProps = (state) => {
    return {
      ...state,      
      darkmode: state.dark_mode.darkmode,
    }
  }
  
export default connect (mapStateToProps) (Search);   