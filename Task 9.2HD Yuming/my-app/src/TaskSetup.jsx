import React, {useContext} from 'react';
import './SectionContent.css'
import { Context } from "./Context";
import SetupChoiceTask from "./SetupChoiceTask";
import SetupDMTask from "./SetupDMTask";
import SetupSLTask from "./SetupSLTask";
import SetupImageProcessTask from "./SetupImageProcessTask";

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
        case 'D':
            return(
                <SetupImageProcessTask
                    taskDescription = 'The image processing task asks a worker to tag objects found in an image.'
                    textA = 'Upload the Image'
                    onChange = {prop.onChange}
                    image = {prop.image}
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