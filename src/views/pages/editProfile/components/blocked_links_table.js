import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten, makeStyles } from '@material-ui/core/styles';
import callapi_analytics_unblock from '../../Analytics/callapi_analytics/callapi_analytics_unblock';
import callapi_analytics_get_blockedDomains from '../callapi_editprofile.js/callapi_analytics_blockdomains';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';



export default class BlockedTable extends React.Component {    

    constructor (props)
    {
        super(props);
        this.state = {
            blocked_domains : [] ,
            blocked_topics : [] ,
            selected : [] ,
            unblocked : false ,
        } ;
    }
    
    async componentWillMount()
    {
        // request to back to get blocked links and topics 
        let blocked = await callapi_analytics_get_blockedDomains() ;
        this.setState({
            blocked_domains : blocked
        })        
    }
    
    render ()
    {

        
        const useToolbarStyles = makeStyles((theme) => ({
            root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
            },
            highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
            title: {
            flex: '1 1 100%',
            },
        }));
  
        const EnhancedTableToolbar = (props) => {
            const classes = useToolbarStyles();
            const { numSelected } = props;
          
            return (
              <Toolbar
                className={clsx(classes.root, {
                  [classes.highlight]: numSelected > 0,
                })}
              >
                {numSelected > 0 ? (
                  <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected to be unblocked
                  </Typography>
                ) : (
                  <Typography style = {{color : props.darkmode != 'night' ? "#757575" : 'white'}} className={classes.title} variant="h6" id="tableTitle" component="div">
                    Blocked
                  </Typography>
                )}
          
                {numSelected > 0 ? (
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick = { async () => {

                        await callapi_analytics_unblock(this.state.blocked_domains
                            .concat(this.state.selected)
                            .filter(item => !this.state.selected.includes(item) || !this.state.blocked_domains.includes(item) ))
                        this.setState({unblocked : true});                            
                        let blocked = await callapi_analytics_get_blockedDomains() ;
                        this.setState({
                            blocked_domains : blocked
                        })     

                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Toolbar>
            );
          };

        const handleSelectAllClick = (event) => {
            if (event.target.checked) {
              const newSelecteds = rows.map((n) => n.name);
              this.setState ({ selected : newSelecteds});
              return;
            }
            this.setState({selected : []});
          };

        const handleClick = (event, name) => {
            const selectedIndex = this.state.selected.indexOf(name);
            let newSelected = [];
        
            if (selectedIndex === -1) {
              newSelected = newSelected.concat(this.state.selected, name);
            } else if (selectedIndex === 0) {
              newSelected = newSelected.concat(this.state.selected.slice(1));
            } else if (selectedIndex === this.state.selected.length - 1) {
              newSelected = newSelected.concat(this.state.selected.slice(0, -1));
            } else if (selectedIndex > 0) {
              newSelected = newSelected.concat(
                this.state.select.slice(0, selectedIndex),
                this.state.select.slice(selectedIndex + 1),
              );
            }
        
            this.setState({ selected : newSelected});
          };

        
        const headCells = [
            { id: 'name', numeric: false, disablePadding: true, label: ' Address' },            
        ];
  

        const isSelected = (name) => this.state.selected.indexOf(name) !== -1;

        const createData = (name , selected) => {
            return { name , selected};
        }


        
        // const  createData = (name, calories, fat, carbs, protein) => {
        //     return { name, calories, fat, carbs, protein };
        // }
        
        const rows = this.state.blocked_domains.map( i => createData(i , false)) ;
        
        EnhancedTableHead.propTypes = {            
            numSelected: PropTypes.number.isRequired,            
            onSelectAllClick: PropTypes.func.isRequired,
            rowCount: PropTypes.number.isRequired,
        };

        
        function EnhancedTableHead(props) {
            const { onSelectAllClick, numSelected, rowCount } = props;            
        
            return (
            <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                    key={headCell.id}
                    style = {{color : props.darkmode != 'night' ? "#757575" : 'white'}}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    // sortDirection={orderBy === headCell.id ? order : false}
                    >                    
                        {headCell.label}                     
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            );
        }
  
          
        const classes =  makeStyles({
            table: {
              minWidth: 650,
            },
        });

        

        return (
            <>
            {this.state.blocked_domains.length != 0 ?
                <>
                    <EnhancedTableToolbar darkmode = {this.props.darkmode} numSelected={this.state.selected.length} />
                    <TableContainer component={Paper}>
                    <Table className="blockedTable" aria-label="simple table">
                        {/* <TableHead>
                        <TableRow>
                            <TableCell> <b>Blocked Links </b></TableCell>                    
                        </TableRow>
                        </TableHead> */}
                        
                        <EnhancedTableHead
                        classes={classes}
                        numSelected={this.state.selected.length}                    
                        onSelectAllClick={handleSelectAllClick}                    
                        rowCount={rows.length}
                        darkmode = {this.props.darkmode}
                        />
                        <TableBody>
                        {rows.map((row, index) => {

                            const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                            <TableRow 
                                key={row.name}
                                hover
                                onClick={(event) => handleClick(event, row.name)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.name}
                                selected={isItemSelected}
                        >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isItemSelected}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                </TableCell>            
                                <TableCell component="th" scope="row">
                                    <a target="_blank" rel="noreferrer nofollow" href = {row.name}>                                    
                                    {row.name}                                    
                                    </a>
                                </TableCell>                              
                            {/* <TableCell align="right">{row.fat}</TableCell> */}
                            </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Snackbar
                      open={this.state.unblocked}
                      onClose={() => {
                        this.setState({
                          ...this.state,
                          unblocked: false,
                        });
                      }}
                      TransitionComponent={Fade}
                      message="addresses unblocked"
                      // key={state.Transition.name}
                    />
                </>
            :
                    <div>
                         <Typography variant="h6" style = {{color : "#757575"}} >
                            You haven't blocked any domain . 
                        </Typography>
                    </div>
            }
            </>
        );
    }
}