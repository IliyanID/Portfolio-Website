import React from 'react';
import './Experience.css';
import '../../Containers/Terminal/Terminal.css'

const Experience = () =>{
    let experience = 
    [["Freelance",(
        <div className="individualExperience">
            <h3>Software Engineer @ Freelance</h3>
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
            <h3>Delivery Driver @ Empire Palace</h3>
            <p>August 2019 - January 2021</p>
        </div>
    )],
    ["Texas Roadhouse",(
        <div className="individualExperience">
                <h3>To-Go Host @ Texas Roadhouse</h3>
                <p>September 2016 - August 2020</p>
        </div>
    )],
    ["Colorado History Museum",(
        <div className="individualExperience">
                <h3>Barista @ Colorado History Museum</h3>
                <p>Feburary 2015 - September 2016</p>
        </div>
    )]];

    let jobSelector = experience.map((job) => {
        return <li>{job[0]}</li>
    })
    return(
    <div className = "main">
        <h1>This Experience Page is under development</h1>
        <div>
            <h2>Where I've Worked</h2>
            <ul className="jobSelector">
                {jobSelector}
            </ul>
            {experience[0][1]}
        </div>
    </div>
    );
}
export default Experience;