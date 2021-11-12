import React from 'react'
import helpDescriptions from '../../Resources/Static/helpDescriptions.json'



const ParseCommand = (command,allPackages) =>{
    let commandSelector = command.split(" ")
    let result = [];
    let numberOfCommands = commandSelector.length
    allPackages={
        ...allPackages,
        commandSelector:commandSelector,
    }
    
    let allCommands = getAllCommands(allPackages)
    let foundCommand = false;
    allCommands.map((commandObj)=>{
        if(commandObj.command === commandSelector[0]){
            foundCommand = true;
            if(numberOfCommands === commandObj.arguments){
                result = commandObj.runFunction();
                return result
            }
            else{
                result = rejectCommand(numberOfCommands,commandObj.arguments)
                return result;
            }
        }
    })

    if(!foundCommand){
        result = []
        result.push(<p>{command} is not a recognized command</p>);
        result.push(<p>Type "help" for list of commands<br/>⠀</p>);     
  
    }     
    
    return result
}

const getAllCommands = (allPackages)=>{
    const { os, path,commandSelector } = allPackages
    let commands = [
        {
            command:'clear',
            arguments:1,
            runFunction:()=>{return 'clear'}
        },
        {
            command:'help',
            arguments:1,
            runFunction:helpArray
        },
        {
            command:'ls',
            arguments:1,
            runFunction:()=>handleLS(os)
        },
        {
            command:'cd',
            arguments:2,
            runFunction:()=>handleCD(allPackages)
        },
        {
            command:'mkdir',
            arguments:2,
            runFunction:()=>os.mkdir(commandSelector[1],path)
        },
        {
            command:'rm',
            arguments:2,
            runFunction:()=>os.rm(commandSelector[1],path)
        },
        {
            command:'touch',
            arguments:2,
            runFunction:()=>os.touch(commandSelector[1],path)
        },
        {
            command:'open',
            arguments:2,
            runFunction:()=>handleOPEN(allPackages)
        },
        {
            command:'su',
            arguments:2,
            runFunction:()=>handleSU(allPackages)
        },
        {
            command:'reset',
            arguments:1,
            runFunction:()=>os.reset()
        }
    ]
    return commands;
}

const handleLS = (os) =>{
    let result = []
    let respond = os.ls();
    respond.map((item)=>{
        if(item.type === "folder")
            return result.push(<p  className="indented I">{item.name}/</p>)
        else
            return result.push(<p  className="indented">{item.name}</p>)
    })
    result.push(<br/>)
    return result;
}

const handleCD = (allPackages) =>{
    const { os,commandSelector,setPath,path }  = allPackages;
    let result = []
    let newPath = os.cd(commandSelector[1],path);
    if(newPath === "")
        result.push(<p>Can't open {commandSelector[1]}</p>)
    
    else
        setPath(newPath)
    
    return result;
}

const handleOPEN = (allPackages) =>{
    const { os, commandSelector, path } = allPackages;
    let result = [];
    let owners = os.open(commandSelector[1],path)
    if(!owners)
        result.push(<p>{commandSelector[1]} not found<br/>⠀</p>)
    else if(owners.length === 0 || owners.includes(os.user))
        result.push(<p>Opening {commandSelector[1]}<br/>⠀</p>)
    else
        result.push(<p>Permission denied owners: {owners.map((owner)=>owner)}<br/>⠀</p>)

    return result;
}

const handleSU = (allPackages) =>{
    const{ os, path, setPath, commandSelector} = allPackages
    let result = [];
    os.terminalString = path;
    os.su(commandSelector[1])
    
    result.push(<p><b className='I'>Password for {commandSelector[1]}:</b>*******</p>)
    result.push(<p className='I'>Logged in as {commandSelector[1]}!<br/>⠀</p>)
    setPath(os.terminalString)

    return result;
}

const helpArray = () =>{
    let result = helpDescriptions.map((commandObj)=>{
        return <p className="indented">
                    <b className='I'>[{commandObj.command}] </b>
                    : {commandObj.description}
                </p>
    })
    result.push(<br/>)
    return result;

}

const rejectCommand = (received,expected) =>{
    return <p>Incorrect Number of arguments. Received: {received}, expected: {expected}<br/>⠀</p>;  
}

export default ParseCommand