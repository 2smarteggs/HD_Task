import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LabeledImage from "./LabeledImage";
import './SectionContent.css'
import Button from "@material-ui/core/Button";




export default function ImageLabel() {

    const [image, setImage] = useState('');
    const [data, setData] = useState([]);
    const [spacing, setSpacing] = React.useState(9);
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    const handleClick = () => {
        fetch('http://localhost:8080/loadTask',{
            method: 'get',
        })
            .then(response => response.text())
            .then((body) => {
                setData(JSON.parse(body));
                console.log('Data retrieved.');
            });
    }

    return (
        <div className={'Section'}>
            <div style={{textAlign: 'center', width: '100%'}}>
                <Button variant="contained" color="secondary" onClick={handleClick} style={{marginBottom: '2%'}}>
                    <h3>Refresh</h3>
                </Button>
            </div>
            <Grid container className={classes.root} spacing={9}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                        {/*map function*/}
                        {data.filter(item => (item.taskType === 'D')).map((value) => (
                            <Grid key={value} item>
                                <LabeledImage
                                    logo = {parseImageData(value).logo}
                                    labels = {parseImageData(value).labels}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

function parseImageData(data) {

    fetch('http://node.wanxutao.space/api/download?HASH=036bcf58f0ba3269d9ad16ab172153e3&fileName=testPic.jpeg',{
        method: 'get',
    })
        .then(response => response.text())
        .then((body) => {
        });

    let image = 'http://node.wanxutao.space/api/download?HASH=' + data.imageHash + '&' + 'fileName=' + data.imageName;

    return {
        logo: image,
        labels: data.imageLabels
    }

}