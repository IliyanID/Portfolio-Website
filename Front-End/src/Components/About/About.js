import React from 'react';
import './About.css';
import '../../Containers/Terminal/Terminal.css'
import avatar from '../../Resources/avatar.jpg'
const About = () =>{
    return(
    <div className = "main">
        <div  className="header">
            <h1><b className="I">[1]</b> About Me</h1>
        </div>
        <p>Hello! I'm Iliyan, a third year student at Colorado State University studying Computer Science with a focus in Software Engineering<br/>⠀</p>
        <img className="avatar" src={avatar} alt="avatar"/>
        <p>Here's some technologies that I've worked with:</p>
        <ol>
            <li>HTML & (S)CSS</li>
            <li>Javascript (ES6+)</li>
            <li>React.js</li>
            <li>Vue</li>
            <li>Angular</li>
            <li>Workpress</li>
        </ol>
    </div>
    );
}
export default About;