import React, {useState} from 'react';
import experience_data from '../../Resources/constants/experience_data.json';
import './Experience.css';
import '../../Containers/Terminal/Terminal.css'

const Experience = () =>{
    const { jobSelector, curJob } = JobSelector();

    return(
    <div className = "experience main">
        <div>
            <div className="container">
                <span className="title">
                    <h1>Where I've Worked</h1>
                </span>
                <ul className="jobSelector">
                    {jobSelector}
                </ul>
                    <div className="individualExperience">
                        <h3>{experience_data[curJob].title} <span className="yellow">@ {experience_data[curJob].company}</span></h3>
                        <p>{experience_data[curJob].duration}</p>
                        <ul className="jobDescription">
                            {experience_data[curJob].description.map((item,index)=>{
                                return <li key={`job-description-${index}`}>{item}</li>
                            })}
                        </ul>
                    </div>
            </div>
        </div>
    </div>
    );
}

const JobSelector = () =>{
    let [curJob, selectJob] = useState(0);
    let jobSelector = experience_data.map((job,index)=>{
        let result = <li onClick={()=>{selectJob(index)}} key={index}>{job.company}</li>;
        if(index === curJob)
            result =  <li onClick={()=>{selectJob(index)}} className = "jobSelected" key={index}>{job.company}</li>
        return result
    })
    return {jobSelector,curJob};
}

export default Experience;