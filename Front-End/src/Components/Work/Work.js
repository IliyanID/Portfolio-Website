import React from 'react';
import './Work.css';
import '../../Containers/Terminal/Terminal.css'

import {ReactComponent as ExternalLink} from "../../Resources/external-link.svg";
import {ReactComponent as Folder} from "../../Resources/folder.svg";

const Work = (props) =>{
    return(
    <div className = "main">
        <div className="projects">
            <div className="workHeader">
                <h3>Some Things That I've Built</h3>
            </div>
            {content(props)}
            <button onClick={props.setLoad}className="load">{(props.getLoad) ? "Load Less" : "Load More"}</button>
        </div>
    </div>
    );
}

let content = (props) =>{
    <ul>
        {props.repos.map((obj,index) =>{
        if(!props.getLoad && index >= 6)
            return;
        return(
            <li key={index}>
                <div className="insideContainer">
                    <div className="logo">
                        <a href={obj.link} target="_blank" rel="noreferrer"><ExternalLink className="ext"/></a>
                        <Folder className="folder"/>
                    </div>
                    <div className="title">
                        {obj.name}
                    </div>
                    <div className="description">
                        {obj.description}
                    </div>
                    <footer>
                        {obj.languages}
                    </footer>
                </div>
            </li>)
        })}
    </ul>
}

export default Work;