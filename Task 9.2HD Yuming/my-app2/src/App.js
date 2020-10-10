import React from 'react';

import './App.css';
import SectionHeader from "./SectionHeader";
import TaskList from "./TaskList";
import ImageLabel from "./ImageLabel";
import ImageBeautify from "./ImageBeautify";

function App() {
  return (
    <div>
      <SectionHeader
          text = 'Worker Task'
      />
      <TaskList/>
      <SectionHeader
          text = 'Image Labeled by AI'
      />
      <ImageLabel/>
        <SectionHeader
            text = 'Beautify Your Picture'
        />
        <ImageBeautify/>
    </div>
  );
}

export default App;
