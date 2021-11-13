import React, { Fragment } from 'react';
import './Work.css';
import '../../Containers/Terminal/Terminal.css'

import {ReactComponent as ExternalLink} from "../../Resources/icons/external-link.svg";
import {ReactComponent as Folder} from "../../Resources/icons/folder.svg";

const content = (props)=>{
    let result = <ul>
    {props.repos.map((obj,index) =>{
        if(props.getLoad || index < 6)
            return(<li key={`work-element-${index}`}>
                <div className="insideContainer">
                    <div className="logo">
                        <a href={obj.link} target="_blank" rel="noreferrer"><ExternalLink className="ext"/></a>
                        <Folder className="folder"/>
                    </div>
                    
                    <div className="title">{obj.name}</div>

                    <div className="description">{obj.description}</div>

                    <footer>{obj.languages}</footer>
                </div>
            </li>)
        else
            return <Fragment key={`work-element-${index}`}></Fragment>
    })}
    </ul>
    if (props.test)
        return <></>
    return result
}

const Work = (props) =>{
    let currentContent = content(props)
    return(
    <div className = "main">
        <div className="projects">
            <div className="workHeader">
                <h3>Some Things That I've Built</h3>
            </div>
            {currentContent}
            <button onClick={props.setLoad}className="load">{(props.getLoad) ? "Load Less" : "Load More"}</button>
        </div>
    </div>
    );
}



export default Work;