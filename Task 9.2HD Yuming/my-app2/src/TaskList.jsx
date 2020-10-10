import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TaskCard from "./TaskCard";
import './SectionContent.css'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


export default function () {

    const [spacing, setSpacing] = React.useState(9);

    let [data, setData] = React.useState([]);


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

    let dataUrl = 'http://localhost:8080/loadTask';
    let imageUrl = 'http://node.wanxutao.space/api/upload';
    let imageData = '';

    const handleClick = () => {
        fetch(dataUrl,{
            method: 'get',
        })
            .then(response => response.text())
            .then((body) => {
                setData(JSON.parse(body));
                console.log(data.length);
                console.log();
            });
    };

    let [filter, setFilter] = React.useState({
        expiryDate: '',
        title: '',
        delete: '',
        showDetail: true
    });
    const handleChange = (event) => {

        const value = event.target.value;
        const name = event.target.name;

        switch (name) {
            case 'filter1':
                setFilter({...filter, expiryDate: value});
                break;
            case 'filter2':
                setFilter({...filter, title: value});
                break;
            case 'filter3':
                setFilter({...filter, delete: value});
                break;
        }
    };

    const handleDelete = () => {

        for (let i in data) {
            if (data[i].title === filter.delete) {
                data[i]._id = '-1';
                break;
            }
        }
        setFilter({...filter, delete: 'Deleted'});
    };

    const handleExpand = () => {
        setFilter({...filter, showDetail: false});
    };


    return (
        <div className={'Section'}>
            <div style={{textAlign: 'center', marginBottom: '2%'}}>
                <Button variant="contained" color="secondary" onClick={handleClick} style={{marginBottom: '2%'}}>
                    <h3>find all tasks</h3>
                </Button>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={3}>
                        <form autoComplete="off">
                            <TextField name="filter1" label='Filter by expiry, Eg: 2020-10-01' variant="outlined" fullWidth onChange={handleChange} />
                        </form>
                    </Grid>
                    <Grid item xs={3}>
                        <form autoComplete="off">
                            <TextField name="filter2" label='Filter by task title, Eg: DMT1' variant="outlined" fullWidth onChange={handleChange} />
                        </form>
                    </Grid>
                    <Grid item xs={3}>
                        <form autoComplete="off">
                            <TextField name="filter3" label='Enter a task to delete, Eg: DMT1' variant="outlined" fullWidth onChange={handleChange} />
                        </form>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" color="secondary" onClick={handleDelete} style={{marginTop: '10%'}}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </div>
            <Grid container className={classes.root} spacing={9}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                        {/*map function*/}
                        {(data.filter(item => (item._id !== '-1' && item.title !== filter.title && item.expiryDate !== filter.expiryDate))).map((value) => (
                            <Grid key={value} item>
                                <h1>{value.title}</h1>
                                <TaskCard
                                    logo = {parseTaskData(value).logo}
                                    name = {parseTaskData(value).taskType}
                                    expiryDate = {parseTaskData(value).expiryDate}
                                    detail = {parseTaskData(value).detail}
                                    onClick = {handleExpand}
                                    showDetail = {filter.showDetail}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

function parseTaskData(data) {

    let taskType, title, description, expiryData, masterWorker, reward, numberOfWorker;

    switch (data.taskType) {
        case 'A':
            return {
                taskType: 'Choice Task',
                title: data.title,
                expiryDate: data.expiryDate,
                detail: {
                    description: data.description,
                    optionA: 'Option A: ' + data.optionA,
                    optionB: 'Option B: ' + data.optionB,
                    optionC: 'Option C: ' + data.optionC,
                    reward: data.reward,
                    masterWorker: data.masterWorker,
                    numberOfWorker: data.numberOfWorker
                },
            };
        case 'B':
            return {
                taskType: 'Decision-Making Task',
                title: data.title,
                expiryDate: data.expiryDate,
                detail: {
                    description: data.description,
                    question: 'Question: ' + data.question,
                    reward: data.reward,
                    masterWorker: data.masterWorker,
                    numberOfWorker: data.numberOfWorker
                },
            };
        case "C":
            return {
                taskType: 'Sentence-Level Task',
                title: data.title,
                expiryDate: data.expiryDate,
                detail: {
                    description: data.description,
                    question: 'Question: ' + data.question,
                    reward: data.reward,
                    masterWorker: data.masterWorker,
                    numberOfWorker: data.numberOfWorker
                },
            };
        case "D":

            let image = 'http://node.wanxutao.space/api/download?HASH=' + data.imageHash + '&' + 'fileName=' + data.imageName;

            return {
                logo: image,
                taskType: 'Image-Process Task',
                title: data.title,
                expiryDate: data.expiryDate,
                detail: {
                    description: data.description,
                    reward: data.reward,
                    masterWorker: data.masterWorker,
                    numberOfWorker: data.numberOfWorker
                },
            };

    }
}