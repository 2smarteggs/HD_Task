import React from 'react';
import Grid from '@material-ui/core/Grid';
import './SectionHeader.css'

export default function SectionHeader(prop) {
    return(
        <div className={'Header'}>
            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={4}>
                    <h1>{prop.text}</h1>
                </Grid>
                <Grid item xs={7}>
                </Grid>
            </Grid>
        </div>
    );
}