import React from 'react';
import Grid from '@material-ui/core/Grid';
import './SectionContent.css'
import TextField from "@material-ui/core/TextField/TextField";

export default function SetupChoiceTask(prop) {
    return(
        <div className={'Content'}>

            <h3 style={{textAlign: 'center'}}>{prop.taskDescription}</h3>

            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={4}>
                    <h2>{prop.textA}</h2>
                </Grid>
                <Grid item xs={6}>
                    <form autoComplete="off">
                        <TextField name="optionA" label={prop.labelA} variant="outlined" onChange={prop.onChange} value={prop.valueA} fullWidth />
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={4}>
                    <h2>{prop.textB}</h2>
                </Grid>
                <Grid item xs={6}>
                    <form autoComplete="off">
                        <TextField name="optionB" label={prop.labelB} variant="outlined" onChange={prop.onChange} value={prop.valueB} fullWidth />
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={4}>
                    <h2>{prop.textC}</h2>
                </Grid>
                <Grid item xs={6}>
                    <form autoComplete="off">
                        <TextField name="optionC" label={prop.labelC} variant="outlined" onChange={prop.onChange} value={prop.valueC} fullWidth />
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    );
}