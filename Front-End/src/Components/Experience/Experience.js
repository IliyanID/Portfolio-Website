import React, {useState} from 'react';
import './Experience.css';
import '../../Containers/Terminal/Terminal.css'

let experience = 
[["Freelance",(
    <div className="individualExperience">
        <h3>Software Engineer <span className="yellow">@ Freelance</span></h3>
        <p>January 2018 - Present</p>
        <ul className="jobDescription">
            <li>Experience in creating simple automation and computational programs utilizing Java</li>
            <li>Utilized web scraping to create compolex website traversal programs</li>
            <li>Worked on creating full blown website with custom front and back ends</li>
        </ul>
    </div>

)],
["Empire Palace",(
    <div className="individualExperience">
        <h3>Delivery Driver <span className="yellow">@ Empire Palace</span></h3>
        <p>August 2019 - January 2021</p>
        <ul className="jobDescription">
            <li>Consistenly and reliably arrive on time for my shifts</li>
            <li>Perform any tasks that are assighned to me</li>
        </ul>
    </div>
)],
["Texas Roadhouse",(
    <div className="individualExperience">
        <h3>To-Go Host <span className="yellow">@ Texas Roadhouse</span></h3>
        <p>September 2016 - August 2020</p>
        <ul className="jobDescription">
            <li>Consistenly and reliably arrive on time for my shifts</li>
            <li>Perform any tasks that are assighned to me</li>
        </ul>
    </div>
)],
["Colorado History Museum",(
    <div className="individualExperience">
        <h3>Barista <span className="yellow">@ Colorado History Museum</span></h3>
        <p>Feburary 2015 - September 2016</p>
        <ul className="jobDescription">
            <li>Consistenly and reliably arrive on time for my shifts</li>
            <li>Perform any tasks that are assighned to me</li>
        </ul>
    </div>
)]];

const Experience = () =>{
    let [curJob, selectJob] = useState(0);
    let jobSelector = experience.map((job,key) => {
        let result = <li onClick={()=>{console.log(key);selectJob(key)}} key={key}>{job[0]}</li>;
        if(key === curJob)
            result =  <li onClick={()=>{selectJob(key)}} className = "jobSelected" key={key}>{job[0]}</li>
        return result
    })
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
                {experience[curJob][1]}
            </div>
        </div>
    </div>
    );
}
export default Experience;