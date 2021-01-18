import React, { useEffect, useState }  from 'react';
import './Work.css';
import '../../Containers/Terminal/Terminal.css'

const Work = (props) =>{
    let [repos,setRepos] = useState({})
    useEffect(() =>{
        console.log(props.repos);
    },[]);

    

    return(
    <div className = "main">
        <h1>This Work Page is under development</h1>
    </div>
    );
}
export default Work;