import React from 'react';
import Grid from '@material-ui/core/Grid';
import './SectionContent.css'
import TextField from "@material-ui/core/TextField/TextField";

export default function SetupDMTask(prop) {
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
                        <TextField name="question" label={prop.labelA} variant="outlined" onChange={prop.onChange} value={prop.valueQuestionB} fullWidth multiline rows={6} />
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    );
}