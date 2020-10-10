import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import './SectionContent.css'
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import Radio from "@material-ui/core/Radio/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import {Context} from "./Context";

export default function TaskRequirement(prop) {

    const [context, setContext] = useContext(Context);
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return(
        <div className={'Content'}>
            <RadioGroup name="masterWorker" value={value} onChange={handleChange}>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={4}>
                        <h2>{prop.textA}</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel value="Yes" control={<Radio />} label={<h2>{prop.textB}</h2>} onClick={() => setContext({...context, masterWorker: 'Yes'})} />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel value="No" control={<Radio />} label={<h2>{prop.textC}</h2>} onClick={() => setContext({...context, masterWorker: 'No'})} />
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </RadioGroup>

            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={4}>
                    <h2>{prop.textD}</h2>
                </Grid>
                <Grid item xs={6}>
                    <form autoComplete="off">
                        <TextField name="reward" value={prop.valueReward} label={prop.labelD} onChange={prop.onChange} variant="outlined" fullWidth />
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={4}>
                    <h2>{prop.textE}</h2>
                </Grid>
                <Grid item xs={6}>
                    <form autoComplete="off">
                        <TextField name="numberOfWorker" value={prop.valueNumber} label={prop.labelE} onChange={prop.onChange} variant="outlined" fullWidth />
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign: 'center', marginTop: '2%'}}>
                    <Button type={prop.buttonType} variant="contained" color="secondary" onClick={prop.onClick}>
                        <h1>Submit</h1>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}