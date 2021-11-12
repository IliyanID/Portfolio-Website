import React from 'react'
const ParseCommand = (command,allPackages) =>{
    const { os,path,setPath } = allPackages;
    let commandSelector = command.split(" ")

    let tempArr = [];


    switch(commandSelector[0]){


        case "clear":{
            if(commandSelector.length <= 1){
                return null;
            }
            else{
                tempArr.push(<p>Unknown Argument: {commandSelector[1]}<br/>⠀</p>);
            }
            break;
        }

        case "help":{
            if(commandSelector.length <= 1){
                tempArr.push(<p  className="indented"><b className="I">[clear]</b>: clears command window</p>);
                tempArr.push(<p  className="indented"><b className="I">[ls]</b>: list all files</p>);
                tempArr.push(<p  className="indented"><b className="I">[cd directory_name]</b>: navigate directory</p>);
                tempArr.push(<p  className="indented"><b className="I">[mkdir directory_name]</b>: create directory</p>);
                tempArr.push(<p  className="indented"><b className="I">[touch file_name]</b>: create file</p>);
                tempArr.push(<p  className="indented"><b className="I">[open file_name]</b>: open a file</p>);
                tempArr.push(<p  className="indented"><b className="I">[reset]</b>: reset all files</p>);
                tempArr.push(<p  className="indented"><b className="I">[su user_name]</b>: switch users</p>);
                tempArr.push(<br/>)
            }
            else{ 
                tempArr.push(<p>Unknown Argument: {commandSelector[1]}<br/>⠀</p>);                   
            }
            
            break;
        }

        case "ls":{
            if(commandSelector.length <= 1){
                let respond = os.ls();
                respond.map((item)=>{
                    if(item.type === "folder")
                        return tempArr.push(<p  className="indented I">{item.name}/</p>)
                    else
                        return tempArr.push(<p  className="indented">{item.name}</p>)
                })
                tempArr.push(<br/>)

            }
            else{ 
                tempArr.push(<p>Incorrect Number of arguments<br/>⠀</p>);                   
            }
            break;
        }

        case "cd":{
            if(commandSelector.length === 2){
                let newPath = os.cd(commandSelector[1],path);
                if(newPath === "")
                    tempArr.push(<p>Can't open {commandSelector[1]}</p>)
                
                else
                    setPath(newPath)
                
            }
            else
                tempArr.push(<p>Incorrect Number of arguments<br/>⠀</p>);                   
            
            break;
        }

        case "mkdir":{
            if(commandSelector.length === 2){
                os.mkdir(commandSelector[1],path)
            }
            else{ 
                tempArr.push(<p>Incorrect Number of arguments<br/>⠀</p>);                   
            }
            break;
        }
        case "rm":{
            if(commandSelector.length === 2){
                os.rm(commandSelector[1],path)
            }
            else{ 
                tempArr.push(<p>Incorrect Number of arguments<br/>⠀</p>);                   
            }
            break;
        }
        case "touch":{
            if(commandSelector.length === 2){
                os.touch(commandSelector[1],path)
            }
            else{ 
                tempArr.push(<p>Incorrect Number of arguments<br/>⠀</p>);                   
            }
            break;
        }

        case "open":{
            if(commandSelector.length === 2){
                let owners = os.open(commandSelector[1],path)
                if(!owners)
                    tempArr.push(<p>{commandSelector[1]} not found<br/>⠀</p>)
                else if(owners.length === 0 || owners.includes(os.user))
                    tempArr.push(<p>Opening {commandSelector[1]}<br/>⠀</p>)
                else
                    tempArr.push(<p>Permission denied owners: {owners.map((owner)=>owner)}<br/>⠀</p>)

                
            }
            else{ 
                tempArr.push(<p>Incorrect Number of arguments<br/>⠀</p>);                   
            }
            break;
        }

        case "su":{
            if(commandSelector.length === 2){
                os.terminalString = path;
                os.su(commandSelector[1])
                
                tempArr.push(<p><b className='I'>Password for {commandSelector[1]}:</b>*******</p>)
                tempArr.push(<p className='I'>Logged in as {commandSelector[1]}!<br/>⠀</p>)
                setPath(os.terminalString)

                
            }
            else{ 
                tempArr.push(<p>Incorrect Number of arguments<br/>⠀</p>);                   
            }
            break;
        }

        case "reset":{
            if(commandSelector.length === 1){
                os.reset()
            }
            else{ 
                tempArr.push(<p>Incorrect Number of arguments<br/>⠀</p>);                   
            }
            break;
        }
        default:
            tempArr.push(<p>{command} is not a recognized command</p>);
            tempArr.push(<p>Type "help" for list of commands<br/>⠀</p>);                
            break;
    }

    return tempArr
}

export default ParseCommand