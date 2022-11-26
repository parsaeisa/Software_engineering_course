import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function  CountUp (props)
{
    return (
        <>
            <Grid countainer direction="row" >
                <Grid item xs={6}>
                    <Typography variant = "h5" > {props.title} </Typography>  
                </Grid>       
                <Grid item xs={6}>
                    {props.number}
                </Grid>       
            </Grid>
        </>
    )
}