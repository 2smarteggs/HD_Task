import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './SectionContent.css'

export default function TaskDescription(prop) {

    return(
        <div className={'Content'}>
            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={4}>
                    <h2>{prop.textA}</h2>
                </Grid>
                <Grid item xs={6}>
                    <form autoComplete="off">
                        <TextField name="taskTitle" label={prop.labelA} variant="outlined" fullWidth onChange={prop.onChange} value={prop.valueTitle} InputLabelProps={{shrink: true,}} />
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
                        <TextField name="taskDescription" label={prop.labelB} variant="outlined" fullWidth onChange={prop.onChange} value={prop.valueDescription} InputLabelProps={{shrink: true,}} />
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
                        <TextField
                            name="date"
                            label={prop.labelC}
                            type="date"
                            defaultValue="2020-10-01"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChange={prop.onChange}
                            value={prop.valueDate}
                        />
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    );
}