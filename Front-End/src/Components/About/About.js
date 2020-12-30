import React from 'react';
import './About.css';
import '../../Containers/Terminal/Terminal.css'

const About = () =>{
    return(
    <div className = "main">
        <h1><b className="I">[1]</b> About Me<br/>⠀</h1>
        <p>Hello! I'm Iliyan, a third year student at Colorado State University studying Computer Science with a focus in Software Engineering<br/>⠀</p>
        <p>Here's some technologies that I've worked with:</p>
        <ol>
            <li>Java</li>
            <li>Python</li>
            <li>C++</li>
            <li>React</li>
            <li>Angular</li>
            <li>Vue</li>
            <li>Node.js</li>
            <li>REST Archetecture</li>
        </ol>
    </div>
    );
}
export default About;