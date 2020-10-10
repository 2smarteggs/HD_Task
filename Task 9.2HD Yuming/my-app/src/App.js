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
        console.log('Submitting...AI Processing now...');

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

                console.log('Uploading Image...')
                fetch(url,{
                    method: 'post',
                    body: formData,
                })
                    .then(response => response.text())
                    .then((body) => {
                        setInfo({...info, imageJSON: body});
                    });
                console.log('Image uploaded.')
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
