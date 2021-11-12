import React, {useState, Fragment, useEffect, useRef } from 'react';
import './Terminal.css'
import { OS } from './OS'
import CommandParser from './CommandParser'

const starterArr = [
    (<h2>Iliyan Dimitrov</h2>),
    (<h3>This is a Fully Interactive Portfolio Page with a Linux Insprired Terminal<br/></h3>),

    (<p>To Use the Portfolio Either <u className="attention">Use the Navigation</u></p>),
    (<p>Or <u className="attention">Explore the Terminal</u><br/></p>),

    (<p>To Begin, Type:</p>),
    (<p className="indented"><b className="I">[1]</b> or <b className="I">[open aboutMe]</b>: Opens about me</p>),
    (<p className="indented"><b className="I">[2]</b> or <b className="I">[open experience]</b>: Opens my previous work experience</p>),
    (<p className="indented"><b className="I">[3]</b> or <b className="I">[open work]</b>: Opens previous projects on GitHub</p>),
    (<p className="indented"><b className="I">[4]</b> or <b className="I">[open contactMe]</b>: Runs contact me program in terminal</p>),
    (<p className="indented"><b className="I">[5]</b> or <b className="I">[run snakeGame]</b>: Runs the terminal snake game<br/></p>),
    (<p>No User Input Detected Opening About Me Page in  Seconds ...<br/></p>)
]

const updateTerminalLine = (e,allPackages) =>{
    clearInterval(allPackages.interval.current.id)
    allPackages.interval.current.id = setInterval(allPackages.interval.current.function,1000)

    let input = e.target.value;
    input = input.replaceAll('▮','') 

    if(input.length >= allPackages.path.length){
        allPackages.setCommand(input.substring(allPackages.path.length));
    }
}

const terminalSubmit = (e,allPackages) =>{
    e.preventDefault();

    let tempArr = [...allPackages.content]
    tempArr.push(<p>{allPackages.path + allPackages.command}</p>);

    let commands = allPackages.command.split('&&')
   
    commands.map((indivCommand)=>{
        let addition = CommandParser(indivCommand.trim(),allPackages)

        if(addition === null)
            tempArr = starterArr 
        else
            tempArr = tempArr.concat(addition)
    }
    )
    allPackages.setContent(tempArr)
    allPackages.setCommand('')
}

const Terminal = (props) => {
    const [os] = useState(new OS())
    const [command,setCommand] = useState('');
    const [path,setPath] = useState(os.terminalString);
    const[content,setContent] = useState(starterArr);

    const inputRef = useRef(null);
    const blink = useRef(false)
    const interval = useRef({
        id:0,
        function:()=>{
            if(!props.inView && inputRef.current && blink.current !== null)
                return

            inputRef.current.focus();

            if(blink.current)
                inputRef.current.value = inputRef.current.value.replaceAll('▮','');          
            else
                inputRef.current.value = inputRef.current.value + '▮'
            
            blink.current = !blink.current
            
            
        }
    })
    let allPackages={
        os:os,
        command:command,setCommand:setCommand,
        path:path,setPath:setPath,
        content:content,setContent:setContent,
        inputRef:inputRef,blink:blink,interval:interval
    }

    useEffect(()=>{
        interval.current.id = setInterval(interval.current.function,1000);
    },[])
    useEffect(()=>{
        let element = document.getElementById("command-line")
        if(element !== null){
            element.scrollIntoView();
        }
    },[content])

    return (
        <div className={props.display + " main"}>
            <div className={"css-typing "}>           
                {
                    allPackages.content.map((item,key)=>{
                        return <Fragment key={key}>{item}</Fragment>;
                    })
                }
            </div>
            <form onSubmit={(e)=>terminalSubmit(e,allPackages)}>
                <input id="command-line" type="text" autoFocus spellCheck="false" autoComplete="off" value={allPackages.path + allPackages.command} onChange={(e)=>updateTerminalLine(e,allPackages)} ref={inputRef}/>     
                <p>⠀</p>  
            </form>
        </div>       
    );
}
export default Terminal;