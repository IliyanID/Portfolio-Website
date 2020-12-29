import React, {useState, Fragment, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Terminal.css'
const Terminal = forwardRef((props, ref) => {
    const [getTerLine,setTerLine] = useState({Value:"iliyan@dimitrov:~$ ▮",blink:true});


    useImperativeHandle(
        ref,
        () => ({
            sendCommand(command) {
                clearTimeout(timeoutID);
                getTerLine.Value = "iliyan@dimitrov:~$ " + command;
                updateContent();
            }
         }),
     )


    const N = () =>{return (<Fragment><br/>⠀</Fragment>);}


    const starterArr = [
        (<h2>Iliyan Dimitrov</h2>),
        (<h3>This is a Fully Interactive Portfolio Page with a Linux Insprired Terminal{N()}</h3>),

        (<p>To Use the Portfolio Either <u className="attention">Use the Navigation</u></p>),
        (<p>Or <u className="attention">Explore the Terminal</u>{N()}</p>),

        (<p>To Begin, Type:</p>),
        (<p className="indented"><b className="I">[1]</b> or <b className="I">[open aboutMe]</b>: Opens about me</p>),
        (<p className="indented"><b className="I">[2]</b> or <b className="I">[open experience]</b>: Opens my previous work experience</p>),
        (<p className="indented"><b className="I">[3]</b> or <b className="I">[open work]</b>: Opens previous projects on GitHub</p>),
        (<p className="indented"><b className="I">[4]</b> or <b className="I">[run contactMe]</b>: Runs contact me program in terminal</p>),
        (<p className="indented"><b className="I">[5]</b> or <b className="I">[run snakeGame]</b>: Runs the terminal snake game{N()}</p>)
    ]
    let[content,setContent] = useState({
        arr:starterArr
    });
    useEffect(()=>{
        let element = document.getElementById("command-line")
        if(element !== null){
            element.scrollIntoView();
        }
    },[content.arr])


    const updateTerminalLine = (e) =>{
        clearTimeout(timeoutID);
        setTerLine({Value:("iliyan@dimitrov:~$ "  + parseString(e.target.value)),blink:true});
    }


    const updateContent =(e) =>{
        if(e !== undefined)
            e.preventDefault();

        clearTimeout(timeoutID);
        
        parseCommand(parseString());

        setTerLine({Value:"iliyan@dimitrov:~$ ",blink:true});
    }


    const parseString = (input)=>{
        
        let bufferIndex = 19;
        if(input !== undefined)
            return input.substring(bufferIndex).replaceAll("▮","");
        else
            return getTerLine.Value.substring(bufferIndex).replaceAll("▮","");
    }


    let timeoutID = setTimeout(() =>{
        if(getTerLine.blink)
            setTerLine({Value:(getTerLine.Value + "").replaceAll("▮",""),blink:!getTerLine.blink});
        
        else
            setTerLine({Value: getTerLine.Value + ("▮"),blink:!getTerLine.blink});
        
    },800);
    props.setTimeoutId(timeoutID);


    let key = 0;
    const allTerminalText = (       
        <div className={"css-typing "}>           
            {content.arr.map((item)=>{
                return <Fragment key={key++}>{item}</Fragment>;
            })}
        </div>
    )


    let element = document.getElementById("command-line")
    if(element !== null){
        if(element !== document.activeElement)
            element.focus();
    }

 
    const parseCommand = (command) =>{
        clearTimeout(timeoutID);

        let commandSelector = command.split(" ")

        let tempArr = [...content.arr];
        tempArr.push(<p>iliyan@dimitrov:~$ {parseString()}</p>);

        switch(commandSelector[0]){
            case "":{
                tempArr.push(<p>iliyan@dimitrov:~$ {parseString()}</p>);
                break;
            }

            case "clear":{
                if(commandSelector.length <= 1){
                    setContent({arr:starterArr});
                    return null;
                }
                else{
                    tempArr.push(<p>iliyan@dimitrov:~$ {parseString()}</p>);
                    tempArr.push(<p>Unknown Argument: {commandSelector[1]}<br/>⠀</p>);
                }
                break;
            }

            case "help":{
                if(commandSelector.length <= 1){
                    tempArr.push(<p  className="indented"><b className="I">[clear]</b>: clears command window</p>);
                    tempArr.push(<p  className="indented"><b className="I">[ls]</b>: list all files</p>);
                    tempArr.push(<p  className="indented"><b className="I">[run argument]</b>: run a specific program</p>);
                    tempArr.push(<p  className="indented"><b className="I">[close argument]</b>: close a specific  program or file</p>);
                    tempArr.push(<p  className="indented"><b className="I">[open argument]</b>: open a specific document<br/>⠀</p>);
                }
                else{ 
                    tempArr.push(<p>Unknown Argument: {commandSelector[1]}<br/>⠀</p>);                   
                }
                
                break;
            }

            case "ls":{
                if(commandSelector.length <= 1){
                    tempArr.push(<p  className="indented">File: aboutMe</p>);
                    tempArr.push(<p  className="indented">File: experience</p>);
                    tempArr.push(<p  className="indented">File: work</p>);
                    tempArr.push(<p  className="indented">Program: snakeGame<br/>⠀</p>);
                }
                else{ 
                    tempArr.push(<p>Unknown Argument: {commandSelector[1]}<br/>⠀</p>);                   
                }
                break;
            }

            case "1":{
                getTerLine.Value = "iliyan@dimitrov:~$ open aboutMe";
                return parseCommand("open aboutMe")
            }

            case "2":{
                getTerLine.Value = "iliyan@dimitrov:~$ open experience";
                return parseCommand("open experience")
             }

             case "3":{
                getTerLine.Value = "iliyan@dimitrov:~$ open work";
                return parseCommand("open work")
             }

             case "4":{
                getTerLine.Value = "iliyan@dimitrov:~$ run contactMe";
                return parseCommand("run contactMe")
             }

             case "5":{
                getTerLine.Value = "iliyan@dimitrov:~$ run snakeGame";
                return parseCommand("run snakeGame")
             }
            case "run":{
                if(commandSelector.length <= 1)
                    tempArr.push(<p>Error Expected Argument run [argument]<br/>⠀</p>);

                else{ 
                    tempArr.push(<p>Running Program: {commandSelector[1]} ...<br/>⠀</p>);                   
                }
                break;
            }

            case "open":{

                if(commandSelector.length <= 1)
                    tempArr.push(<p>Error Expected Argument open [argument]<br/>⠀</p>);

                else{ 
                    switch(commandSelector[1]){
                        case "aboutMe":{
                            if(props.addTab("About"))
                                tempArr.push(<p>Opening File: {commandSelector[1]} ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open<br/>⠀</p>);
                            
                            break;
                        }

                        case "experience":{
                            if(props.addTab("Experience"))
                                tempArr.push(<p>Opening File: {commandSelector[1]} ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open<br/>⠀</p>);
                            
                            break;
                        }

                        case "work":{
                            if(props.addTab("Work"))
                                tempArr.push(<p>Opening File: {commandSelector[1]} ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open<br/>⠀</p>);
                            
                            break;
                        }

                        case "contactMe":{
                            if(props.addTab("Terminal"))
                                tempArr.push(<p>Opening File: {commandSelector[1]} ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open<br/>⠀</p>);
                            
                            break;
                        }

                        case "terminal":{
                            if(props.addTab("Terminal"))
                                tempArr.push(<p>Opening new {commandSelector[1]} tab ...<br/>⠀</p>);
                            else
                                tempArr.push(<p>File {commandSelector[1]} is already open<br/>⠀</p>);
                            
                            break;
                        }

                        default:{
                            tempArr.push(<p>Couldn't Find file: {commandSelector[1]}<br/>⠀</p>);
                            break;
                        }
                    }

                                       
                }
                break;
            }

            case "close":{
                let argument = commandSelector[1];

                if(commandSelector.length <= 1)
                    tempArr.push(<p>Error Expected Argument close [argument]<br/>⠀</p>);

                else{ 

                    switch(argument){
                        case "aboutMe":{
                            if(props.removeTab("About"))
                                tempArr.push(<p>aboutMe has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>aboutMe is not open<br/>⠀</p>);
                            break;
                        }

                        case "experience":{
                            if(props.removeTab("Experience"))
                                tempArr.push(<p>experience has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>experence is not open<br/>⠀</p>);
                            break;
                        }

                        case "work":{
                            if(props.removeTab("Work"))
                                tempArr.push(<p>work has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>work is not open<br/>⠀</p>);
                            break;
                        }

                        case "contactMe":{
                            if(props.removeTab("Terminal"))
                                tempArr.push(<p>contactMe has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>contactMe is not open<br/>⠀</p>);
                            break;
                        }

                        case "snakeGame":{
                            if(props.removeTab("Terminal"))
                                tempArr.push(<p>snakeGame has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>snakeGame is not open<br/>⠀</p>);
                            break;
                        }

                        case "terminal":{
                            if(props.removeTab("Terminal"))
                                tempArr.push(<p>Terminal has been closed<br/>⠀</p>);
                            else
                                tempArr.push(<p>New Terminal Tab is not open<br/>⠀</p>);
                            break;
                        }

                        default:{
                            tempArr.push(<p>{argument} does not exist<br/>⠀</p>);
                        }
                    }
                    
                }
                break;
            }

            default:
                tempArr.push(<p>{parseString()} is not a recognized command</p>);
                tempArr.push(<p>Type "help" for list of commands<br/>⠀</p>);                
                break;
        }

        setContent({arr:tempArr});
    }


   


    return (
        <div className={props.display + " main"}>
            {allTerminalText}
            <form onSubmit={updateContent}>
                <input id="command-line" type="text" autoFocus spellCheck="false" autoComplete="off" value={getTerLine.Value} onChange={updateTerminalLine}/>     
                <p>⠀</p>  
            </form>
        </div>       
    );
})
export default Terminal;