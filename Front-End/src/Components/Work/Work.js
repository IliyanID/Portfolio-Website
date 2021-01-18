import React from 'react';
import './Work.css';
import '../../Containers/Terminal/Terminal.css'

import {ReactComponent as ExternalLink} from "../../Resources/external-link.svg";
import {ReactComponent as Folder} from "../../Resources/folder.svg";

const Work = (props) =>{
    let content = (
        <ul>
            {props.repos.map((obj,index) =>{
            return(
                <li key={index}>
                    <div className="insideContainer">
                        <div className="logo">
                            <ExternalLink className="ext"/>
                            <Folder className="folder"/>
                        </div>
                        <a href={obj.link} target="_blank" rel="noreferrer">
                            {obj.name}
                        </a>
                        <div className="description">
                            {obj.description}
                        </div>
                        <footer>
                            {obj.languages}
                        </footer>
                    </div>
                </li>)
            })}
        </ul>);

    return(
    <div className = "main">
        <h1>This Work Page is under development</h1>
        <div className="projects">
            <h3>My Projects</h3>
            {content}
        </div>
    </div>
    );
}
export default Work;