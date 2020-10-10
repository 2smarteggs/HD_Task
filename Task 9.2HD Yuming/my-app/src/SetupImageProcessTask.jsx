import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Context} from "./Context";


export default function SetupImageProcessTask(prop) {

    const [context, setContext] = useContext(Context);

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
                    <input style={{display: 'none'}}
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        name = 'image'
                        onChange={prop.onChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="secondary" component="span">
                            <h3>Upload</h3>
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <div style={{textAlign: 'center', width: '100%', marginTop: '2%'}}>
                    <img src={prop.image} width="500" height="300"/>
                </div>
            </Grid>
        </div>
    )

}