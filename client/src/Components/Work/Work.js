import React, { Fragment } from 'react';
import { useToggle } from '../../Resources/util/useToggle'
import './Work.css';
import '../../Containers/Terminal/Terminal.css'

import {ReactComponent as ExternalLink} from "../../Resources/icons/external-link.svg";
import {ReactComponent as Folder} from "../../Resources/icons/folder.svg";

const all_projects= (props,showAllRepos)=>{
    let result = <ul>
    {props.repos.map((obj,index) =>{
        if(showAllRepos || index < 6)
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
    const [showAllRepos,toggleShowAllRepos] = useToggle(false);
    return(
    <div className = "main">
        <div className="projects">
            <div className="workHeader">
                <h3>Some Things That I've Built</h3>
            </div>
            {all_projects(props,showAllRepos)}
            <button onClick={toggleShowAllRepos}className="load">{(showAllRepos) ? "Load Less" : "Load More"}</button>
        </div>
    </div>
    );
}



export default Work;