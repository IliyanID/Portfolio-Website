import React, {useState, Fragment} from 'react';
import './Terminal.css'
const Terminal = (props) => {
    const [getTerLine,setTerLine] = useState({Value:"iliyan@dimitrov:~$ ▮",blink:true});

    const N = () =>{return (<Fragment><br/>⠀</Fragment>);}
    const starterArr = [
        (<h2>Iliyan Dimitrov</h2>),
        (<h3>This is a Fully Interactive Portfolio Page with a Simulated Linux Terminal{N()}</h3>),

        (<p>To Explore the Portfolio Either <u>Use the Header Buttons</u></p>),
        (<p>Or <u>Type into the Command Promt</u>{N()}</p>),

        (<p>To Begin Type:</p>),
        (<p>⠀⠀⠀⠀⠀⠀⠀[1] or [open aboutMe]: Opens about me</p>),
        (<p>⠀⠀⠀⠀⠀⠀⠀[2] or [open experience]: Opens my previous work experience</p>),
        (<p>⠀⠀⠀⠀⠀⠀⠀[3] or [open work]: Opens previous projects on GitHub</p>),
        (<p>⠀⠀⠀⠀⠀⠀⠀[4] or [run contactMe]: Runs contact me program in terminal</p>),
        (<p>⠀⠀⠀⠀⠀⠀⠀[5] or [run snakeGame]: Runs the terminal snake game{N()}</p>)
    ]
    
    const[content,setContent] = useState({
        arr:starterArr
    });

    const updateTerminalLine = (e) =>{
        clearTimeout(timeoutID);
        setTerLine({Value:("iliyan@dimitrov:~$ "  + parseString(e.target.value)),blink:true});
      
    }

    const updateContent =(e) =>{
        e.preventDefault();
        clearTimeout(timeoutID);
        
        setTerLine({Value:"iliyan@dimitrov:~$ ",blink:true});
        
        parseCommand(parseString());
        document.getElementById("command-line").scrollIntoView();
    }

    const parseCommand = (command) =>{
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
                    tempArr.push(<p>⠀⠀⠀⠀⠀⠀⠀clear: clears command window</p>);
                    tempArr.push(<p>⠀⠀⠀⠀⠀⠀⠀ls: list all files</p>);
                    tempArr.push(<p>⠀⠀⠀⠀⠀⠀⠀run [argument]: run a specific program</p>);
                    tempArr.push(<p>⠀⠀⠀⠀⠀⠀⠀open [argument]: open a specific document<br/>⠀</p>);
                }
                else{ 
                    tempArr.push(<p>Unknown Argument: {commandSelector[1]}<br/>⠀</p>);                   
                }
                
                break;
            }

            case "ls":{
                if(commandSelector.length <= 1){
                    tempArr.push(<p>⠀⠀⠀⠀⠀⠀⠀File: aboutMe</p>);
                    tempArr.push(<p>⠀⠀⠀⠀⠀⠀⠀File: experience</p>);
                    tempArr.push(<p>⠀⠀⠀⠀⠀⠀⠀File: work</p>);
                    tempArr.push(<p>⠀⠀⠀⠀⠀⠀⠀Program: snakeGame<br/>⠀</p>);
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
                    tempArr.push(<p>Opening File: {commandSelector[1]} ...<br/>⠀</p>);                   
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

    const parseString = (input)=>{
        let bufferIndex = 19;
        if(input !== undefined)
            return input.substring(bufferIndex).replaceAll("▮","");
        else
            return getTerLine.Value.substring(bufferIndex).replaceAll("▮","");
    }

    let timeoutID = setTimeout(() =>{
        document.getElementById("command-line").scrollIntoView();
        document.getElementById("command-line").focus();
        if(getTerLine.blink)
            setTerLine({Value:(getTerLine.Value + "").replaceAll("▮",""),blink:!getTerLine.blink});
        
        else
            setTerLine({Value: getTerLine.Value + ("▮"),blink:!getTerLine.blink});
        
    },800);

    let num = 0;
    const allTerminalText = (       
        <Fragment>           
            {content.arr.map((item)=>{
                return <Fragment key={num++}>{item}</Fragment>;
            })}
        </Fragment>
    )

    return (
        <div id="main">
            {allTerminalText}
            <form onSubmit={updateContent}>
                <input id="command-line" type="text"  autoFocus spellCheck="false" autoComplete="off" value={getTerLine.Value} onChange={updateTerminalLine}/>     
                <p>⠀</p>  
            </form>
        </div>
        
    );

    
}
export default Terminal;