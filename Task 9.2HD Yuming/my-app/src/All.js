// Worker Task Page
// TaskList
// ----------------------------------------------------------------
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

// ----------------------------------------------------------------

// TaskCard
// ----------------------------------------------------------------
import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function (props) {

    const [showDetail, toggleShowDetail] = useState(true);

    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
    });

    const handleClick = () => {
        if (showDetail) {
            toggleShowDetail(false);
        } else {
            toggleShowDetail(true);
        }
    };

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    className={classes.media}
                    image={props.logo}
                    title="logo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Expiry: {props.expiryDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" hidden={showDetail}>
                        Description: {props.detail.description}<br></br>
                        Require Master Worker: {props.detail.masterWorker}<br></br>
                        Reward Per Response: {props.detail.reward}<br></br>
                        Number Of Workers: {props.detail.numberOfWorker}<br></br>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" hidden={showDetail}>
                        {props.detail.question}<br></br>
                        {props.detail.optionA}<br></br>
                        {props.detail.optionB}<br></br>
                        {props.detail.optionC}<br></br>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}


// ----------------------------------------------------------------

// Router
// ----------------------------------------------------------------
let express=require('express');
let bodyParser=require("body-parser");
let https=require("https");
let User=require('./dataModel.js');  //User为model name
let mongoose=require('mongoose');
let validator=require('validator');
let url=require("url");
const cors = require('cors');
let fs=require('fs');
let multer=require('multer');


let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

// mongo
mongoose.connect("mongodb+srv://admin_Yuming:Aa56112756@cluster0.sobtl.mongodb.net/myDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req,res) => {
    res.send("8080");
});

app.get('/loadTask', (req,res) => {
    User.find({
    }, function (err, data) {
        if(err) throw err;
        if(data) {
            res.end(JSON.stringify(data));
        }else{
            const returnJSON = {"status": "false"};
            res.end(JSON.stringify(returnJSON));
        }
    });
});

app.post('/addTask', (req,res) => {

    let taskType=req.body.taskType;
    let title=req.body.title;
    let description=req.body.description;
    let expiryDate=req.body.expiryDate;
    let optionA=req.body.optionA;
    let optionB=req.body.optionB;
    let optionC=req.body.optionC;
    let question=req.body.question;
    let masterWorker=req.body.masterWorker;
    let reward=req.body.reward;
    let numberOfWorker = req.body.numberOfWorker;
    let imageJSON = req.body.imageJSON;
    let imageHash = '';
    if (req.body.taskType === 'D') {
        imageHash = JSON.parse(imageJSON).HASH;
    }
    let imageName = req.body.imageName;


    let user=new User({
            taskType: taskType,
            title: title,
            description: description,
            expiryDate: expiryDate,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            question: question,
            masterWorker: masterWorker,
            reward: reward,
            numberOfWorker: numberOfWorker,
            imageHash: imageHash,
            imageName: imageName
        }
    );
    user
        .save()
        .catch((err) => console.log(err));

    if (res.statusCode === 200) {
        const returnJSON = {"status": "true"};
        res.json(returnJSON);
    } else {
        const returnJSON = {"status": "false"};
        res.end(JSON.stringify(returnJSON));
    }

});


let server = app.listen(process.env.PORT || 8080, function () {
    console.log("Server is running successfully");
});
// ----------------------------------------------------------------

// New Task Page
// App
// ----------------------------------------------------------------
import React, {useState} from 'react';
import './App.css';
import SectionHeader from "./SectionHeader";
import TaskDescription from "./TaskDescription";
import TaskSelect from "./TaskSelect";
import TaskRequirement from "./TaskRequirement";
import { Context } from "./Context.js";
import TaskSetup from "./TaskSetup";



function App() {

    const [context, setContext] = useState({
        taskType: '',
        masterWorker: '',
        data: '',
        contentType: 'image',
        imageName: '',
    });

    const [imgName, setImgName] = useState({
        imageName: '',
    });

    const [info, setInfo] = useState({
        title: '',
        description: '',
        expiryDate: '',
        optionA: '',
        optionB: '',
        optionC: '',
        question: '',
        masterWorker: '',
        reward: '',
        numberOfWorker: '',
        imageJSON: '',
        imageName: '',
    });

    const handleClick = () => {
        fetch('http://localhost:8080/addTask', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                taskType: context.taskType,
                title: info.title,
                description: info.description,
                expiryDate: info.expiryDate,
                optionA: info.optionA,
                optionB: info.optionB,
                optionC: info.optionC,
                question: info.question,
                masterWorker: context.masterWorker,
                reward: info.reward,
                numberOfWorker: info.numberOfWorker,
                data: context.data,
                contentType: context.contentType,
                imageJSON: info.imageJSON,
                imageName: imgName.imageName
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log(err)
            })
    };

    const handleChange = (event) => {

        const value = event.target.value;
        const name = event.target.name;

        switch (name) {
            case 'taskTitle':
                setInfo({...info, title: value});
                break;
            case 'taskDescription':
                setInfo({...info, description: value});
                break;
            case 'date':
                setInfo({...info, expiryDate: value});
                break;
            case 'optionA':
                setInfo({...info, optionA: value});
                break;
            case 'optionB':
                setInfo({...info, optionB: value});
                break;
            case 'optionC':
                setInfo({...info, optionC: value});
                break;
            case 'question':
                setInfo({...info, question: value});
                break;
            case 'masterWorker':
                setInfo({...info, masterWorker: value});
                break;
            case 'reward':
                setInfo({...info, reward: value});
                break;
            case 'numberOfWorker':
                setInfo({...info, numberOfWorker: value});
                break;
            case 'image':

                let url = "http://node.wanxutao.space/api/upload";

                let formData = new FormData();
                formData.append('file',event.target.files[0]);

                fetch(url,{
                    method: 'post',
                    body: formData,
                })
                    .then(response => response.text())
                    .then((body) => {
                        setInfo({...info, imageJSON: body});
                    });
                setContext({...context, data: URL.createObjectURL(event.target.files[0])});
                setImgName({...imgName, imageName: event.target.files[0].name});
                break;
        }

    };

    return (
        <Context.Provider value={[context, setContext]}>
            <div>

                <SectionHeader
                    text = 'New Requester Task'
                />
                <TaskSelect
                    textA = 'Select Task Type:'
                    textB = 'Choice Task'
                    textC = 'Decision-Making Task'
                    textD = 'Sentence-Level Task'
                    textE = 'Image-Processing Task'
                />
                <SectionHeader
                    text = 'Describe Your Task To Workers'
                />
                <TaskDescription
                    textA = 'Title'
                    labelA = 'Enter Task Title'
                    textB = 'Description'
                    labelB = 'Enter Task Description'
                    textC = 'Expiry Date'
                    labelC = 'Enter Expiry Date'
                    onChange = {handleChange}
                    valueTitle = {info.title}
                    valueDescription = {info.description}
                    valueDate = {info.expiryDate}
                />
                <SectionHeader
                    text = 'Setting Up Your Work'
                />
                <TaskSetup
                    valueA = {info.optionA}
                    valueB = {info.optionB}
                    valueC = {info.optionC}
                    valueQuestionB = {info.question}
                    valueQuestionC = {info.question}
                    onChange = {handleChange}
                    image = {context.data}
                />
                <SectionHeader
                    text = 'Worker Requirement'
                />
                <TaskRequirement
                    textA = 'Require Master Workers'
                    textB = 'Yes'
                    textC = 'No'
                    textD = 'Reward Per Response'
                    labelD = ''
                    textE = 'Number Of Workers'
                    labelE = ''
                    buttonType = 'submit'
                    onClick = {handleClick}
                    onChange = {handleChange}
                    valueReward = {info.reward}
                    valueNumber = {info.numberOfWorker}
                />

            </div>
        </Context.Provider>
    );
}

export default App;



// .App {
//     text-align: center;
// }
//
// .App-logo {
//     height: 40vmin;
//     pointer-events: none;
// }
//
// @media (prefers-reduced-motion: no-preference) {
// .App-logo {
//         animation: App-logo-spin infinite 20s linear;
//     }
// }
//
// .App-header {
//     background-color: #282c34;
//     min-height: 100vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     font-size: calc(10px + 2vmin);
//     color: white;
// }
//
// .App-link {
//     color: #61dafb;
// }
//
// @keyframes App-logo-spin {
//     from {
//         transform: rotate(0deg);
//     }
//     to {
//         transform: rotate(360deg);
//     }
// }
// ----------------------------------------------------------------


// Context.js
// ----------------------------------------------------------------
import React from "react";

export const Context = React.createContext();
// ----------------------------------------------------------------


// SectionHeader
// ----------------------------------------------------------------
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

// .Header {
//     background-color: #4b4b4b;
//     color: white;
//     margin-bottom: 2%;
// }
// ----------------------------------------------------------------


// SectionContent.css
// ----------------------------------------------------------------
// .Content {
//     margin-bottom: 2%;
// }
// ----------------------------------------------------------------


// TaskSelect
// ----------------------------------------------------------------
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
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </RadioGroup>
        </div>
    );
}
// ----------------------------------------------------------------


// TaskDescription
// ----------------------------------------------------------------
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
// ----------------------------------------------------------------


// TaskSetup
// ----------------------------------------------------------------
import React, {useContext} from 'react';
import './SectionContent.css'
import { Context } from "./Context";
import SetupChoiceTask from "./SetupChoiceTask";
import SetupDMTask from "./SetupDMTask";
import SetupSLTask from "./SetupSLTask";

export default function TaskSetup(prop) {

    const [context, setContext] = useContext(Context);

    switch (context.taskType) {
        case 'A':
            return(
                <SetupChoiceTask
                    taskDescription = 'Choice task provides a worker options in the task and they need to select one or several options as their answer.'
                    textA = 'Option A:'
                    labelA = 'Enter Your Option'
                    textB = 'Option B'
                    labelB = 'Enter Your Option'
                    textC = 'Option C'
                    labelC = 'Enter Your Option'
                    valueA = {prop.valueA}
                    valueB = {prop.valueB}
                    valueC = {prop.valueC}
                    onChange = {prop.onChange}
                    valueQuestionB = {prop.valueQuestionB}
                    valueQuestionC = {prop.valueQuestionC}
                />
            );
        case 'B':
            return(
                <SetupDMTask
                    taskDescription = 'Decision-making task ask a worker to provide True/False as their answers.'
                    textA = 'Enter Your Question'
                    labelA = 'Your Question'
                    onChange = {prop.onChange}
                    valueQuestionB = {prop.valueQuestionB}
                />
            );
        case 'C':
            return(
                <SetupSLTask
                    taskDescription = 'Sentence-level task asks a worker to provide sentences as answers like translation.'
                    textA = 'Enter Your Question'
                    labelA = 'Your Question'
                    onChange = {prop.onChange}
                    valueQuestionC = {prop.valueQuestionC}
                />
            );
        default:
            return(
                <div style={{textAlign: 'center', marginBottom: '2%'}}>
                    <h2>This part will show up after selecting your task type.</h2>
                </div>
            );
    }


}
// ----------------------------------------------------------------



// SetupChoiceTask
// ----------------------------------------------------------------
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
// ----------------------------------------------------------------



// SetupDMTask
// ----------------------------------------------------------------
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
// ----------------------------------------------------------------



// SetupSLTask
// ----------------------------------------------------------------
import React from 'react';
import Grid from '@material-ui/core/Grid';
import './SectionContent.css'
import TextField from "@material-ui/core/TextField/TextField";

export default function SetupSLTask(prop) {
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
                        <TextField name="question" label={prop.labelA} variant="outlined" onChange={prop.onChange} value={prop.valueQuestionC} fullWidth multiline rows={6} />
                    </form>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    );
}
// ----------------------------------------------------------------


// SetupImageProcessTask
// ----------------------------------------------------------------
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

// ----------------------------------------------------------------


// TaskRequirement
// ----------------------------------------------------------------
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
// ----------------------------------------------------------------