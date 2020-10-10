import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './SectionContent.css'
import { Context } from "./Context.js";


export default function TaskSelect(prop) {

    const [context, setContext] = useContext(Context);
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);

        event.preventDefault();
    };

    return(
        <div className={'Content'}>
            <RadioGroup name="taskType" value={value} onChange={handleChange}>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={2.5}>
                        <h2>{prop.textA}</h2>
                    </Grid>
                    <Grid item xs={2.5}>
                        <FormControlLabel value="A" control={<Radio />} label={<h2>{prop.textB}</h2>} onClick={() => setContext({...context, taskType: 'A'})} />
                    </Grid>
                    <Grid item xs={2.5}>
                        <FormControlLabel value="B" control={<Radio />} label={<h2>{prop.textC}</h2>} onClick={() => setContext({...context, taskType: 'B'})} />
                    </Grid>
                    <Grid item xs={2.5}>
                        <FormControlLabel value="C" control={<Radio />} label={<h2>{prop.textD}</h2>} onClick={() => setContext({...context, taskType: 'C'})} />
                    </Grid>
                    <Grid item xs={2.5}>
                        <FormControlLabel value="D" control={<Radio />} label={<h2>{prop.textE}</h2>} onClick={() => setContext({...context, taskType: 'D'})} />
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </RadioGroup>
        </div>
    );
}