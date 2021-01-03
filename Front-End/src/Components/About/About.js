import React from 'react';
import './About.css';
import '../../Containers/Terminal/Terminal.css'
import avatar from '../../Resources/avatar.jpg'
const About = () =>{
    return(
    <section className = "main section">
        <div className="about">
            <div className="text">
                <div  className="header">
                    <h1>About Me</h1>
                </div>
                <p>Hello! I'm Iliyan, an aspiring software engineer based in Fort Collins, CO<br/>⠀</p>
                <p>Currently I'm a third year student at <a href="https://compsci.colostate.edu/" target="_blank" rel="noreferrer">Colorado State University</a>. 
                    When I'm not coding or studying you'll find me running or snowboarding.
                <br/>⠀
                </p>
                <p>Here are a few technologies I've worked with recently:<br/>⠀</p>
                <ol className="technologies">
                    <li>HTML & (S)CSS</li>
                    <li>JavaScript (ES10+)</li>
                    <li>React</li>
                    <li>Vue</li>
                    <li>Angular</li>
                    <li>Wordpress</li>
                </ol>
            </div>
            <div className="avatar"></div>
        </div>
    </section>
    );
}
export default About;