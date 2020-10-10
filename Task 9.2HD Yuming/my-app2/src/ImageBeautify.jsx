import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import './SectionContent.css'
import Grid from "@material-ui/core/Grid";

export default function ImageBeautify() {

    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });
    const classes = useStyles();

    function valuetext(value) {
        return value;
    }

    const handleFilter = (event,newValue) => {
        setFilter(newValue);
        console.log('Filter:' + filter);
        console.log(newValue)
    }

    const handleClick = (event) => {
        fetch('http://localhost:8080/filterImage',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                base64: ori,
                filter: filter
            })
        })
            .then(response => response.json())
            .then((body) => {
                setRes('data:image/jpeg;base64,'+body.image)
                console.log(body.image)
            });
    };

    const handleChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // base64 image
            console.log(reader.result)
            setOri(reader.result)

        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const [ori, setOri] = useState('');
    const [filter, setFilter] = useState(1);
    const [res, setRes] = useState('')

    return(
        <div className={'Section'}>
            <div style={{textAlign: 'center', marginBottom: '2%'}}>
                <input style={{display: 'none'}}
                       name = 'upload'
                       accept="*"
                       id="contained-button-file"
                       multiple
                       type="file"
                       onChange={handleChange}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        style={{marginBottom: '2%'}}
                        variant="contained"
                        component="span"
                        color="secondary"
                    >
                        <h3>Upload</h3>
                    </Button>
                </label>

                <Button
                    style={{marginBottom: '2%'}}
                    variant="contained"
                    component="span"
                    color="secondary"
                    onClick={handleClick}
                >
                    <h3>Beautify</h3>
                </Button>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography id="discrete-slider" gutterBottom>
                            Choose a Filter
                        </Typography>
                        <Slider
                            value={filter} onChange={handleFilter}
                                aria-labelledby="continuous-slider"
                                step={1}
                                marks
                                min={1}
                                max={15}
                                valueLabelDisplay="auto"
                        />
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
                <Grid container spacing={1} style={{marginTop:'2%'}}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={3}>
                        <img src={ori} width={'100%'} height={300}/>
                    </Grid>
                    <Grid item xs={3}>
                        <img src={res} width={'100%'} height={300}/>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}